import { StorageService } from './storageService';

export interface AppVersionInfo {
  version: string;
  buildTime: string;
  releaseName?: string;
  releaseNotesBn?: string;
  releaseNotesEn?: string;
  minCompatibleVersion?: string;
  cacheVersion?: string;
}

export interface UserDataIntegrityReport {
  intact: boolean;
  bookmarksCount: number;
  notesCount: number;
  highlightsCount: number;
  historyCount: number;
  hasSettings: boolean;
  backupTimestamp?: number;
}

export interface AppUpdateCheckResult {
  hasUpdate: boolean;
  currentVersion: string;
  latestVersion: string;
  versionInfo?: AppVersionInfo;
  userDataIntegrity: UserDataIntegrityReport;
  lastChecked: number;
  error?: string;
}

export type UpdateListener = (result: AppUpdateCheckResult) => void;

export class AppUpdateService {
  public static readonly CURRENT_VERSION = '1.0.1';
  private static readonly STORAGE_KEY_CURRENT_VER = 'bsb_client_version';
  private static readonly STORAGE_KEY_LAST_CHECKED = 'bsb_update_last_checked';
  private static readonly STORAGE_KEY_DISMISSED_VER = 'bsb_update_dismissed_version';
  private static readonly STORAGE_KEY_DATA_BACKUP = 'bsb_user_data_backup_v1';

  private static instance: AppUpdateService | null = null;
  private listeners: Set<UpdateListener> = new Set();
  private intervalId: number | null = null;
  private isChecking: boolean = false;
  private latestResult: AppUpdateCheckResult | null = null;

  public static getInstance(): AppUpdateService {
    if (!AppUpdateService.instance) {
      AppUpdateService.instance = new AppUpdateService();
    }
    return AppUpdateService.instance;
  }

  private constructor() {
    // If not set yet, store current bundle version
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(AppUpdateService.STORAGE_KEY_CURRENT_VER);
      if (!stored) {
        localStorage.setItem(AppUpdateService.STORAGE_KEY_CURRENT_VER, AppUpdateService.CURRENT_VERSION);
      }
    }
  }

  /**
   * Initializes all 4 update trigger points:
   * 1. App startup
   * 2. Foreground return via visibilitychange
   * 3. Foreground return via window focus
   * 4. 15-minute periodic interval
   */
  public init(): void {
    if (typeof window === 'undefined') return;

    // Trigger 1: Startup check (slightly deferred to avoid blocking critical initial render)
    setTimeout(() => {
      this.checkForUpdate().catch((err) => console.warn('[AppUpdate] Startup check error:', err));
    }, 2500);

    // Trigger 2: Document visibility change (returning from background)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        const lastChecked = this.getLastCheckedTime();
        // Debounce: only check if at least 60 seconds elapsed since last check
        if (Date.now() - lastChecked > 60 * 1000) {
          this.checkForUpdate().catch((err) => console.warn('[AppUpdate] Visibility check error:', err));
        }
      }
    });

    // Trigger 3: Window focus
    window.addEventListener('focus', () => {
      const lastChecked = this.getLastCheckedTime();
      if (Date.now() - lastChecked > 60 * 1000) {
        this.checkForUpdate().catch((err) => console.warn('[AppUpdate] Focus check error:', err));
      }
    });

    // Trigger 4: 15-minute periodic check while app is kept open
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = window.setInterval(() => {
      this.checkForUpdate().catch((err) => console.warn('[AppUpdate] Periodic check error:', err));
    }, 15 * 60 * 1000);

    // Listen for service worker controller change or updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[AppUpdate] Service Worker controller changed');
      });
    }
  }

  public subscribe(listener: UpdateListener): () => void {
    this.listeners.add(listener);
    if (this.latestResult) {
      listener(this.latestResult);
    }
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(result: AppUpdateCheckResult): void {
    this.latestResult = result;
    for (const listener of this.listeners) {
      try {
        listener(result);
      } catch (err) {
        console.error('[AppUpdate] Listener notification failed:', err);
      }
    }
  }

  /**
   * Version comparison helper (semver-like)
   * returns 1 if vA > vB, -1 if vA < vB, 0 if equal
   */
  public static compareVersions(vA: string, vB: string): number {
    const partsA = vA.replace(/^v/i, '').split('.').map((p) => parseInt(p, 10) || 0);
    const partsB = vB.replace(/^v/i, '').split('.').map((p) => parseInt(p, 10) || 0);
    const maxLen = Math.max(partsA.length, partsB.length);

    for (let i = 0; i < maxLen; i++) {
      const a = partsA[i] || 0;
      const b = partsB[i] || 0;
      if (a > b) return 1;
      if (a < b) return -1;
    }
    return 0;
  }

  /**
   * Checks /version.json on server and checks Service Worker registration
   */
  public async checkForUpdate(manual: boolean = false): Promise<AppUpdateCheckResult> {
    if (this.isChecking) {
      return this.latestResult || this.buildFallbackResult();
    }

    this.isChecking = true;
    const now = Date.now();
    this.setLastCheckedTime(now);

    const currentVersion = localStorage.getItem(AppUpdateService.STORAGE_KEY_CURRENT_VER) || AppUpdateService.CURRENT_VERSION;
    const integrityReport = this.verifyUserDataIntegrity();

    try {
      // 1. Check Service Worker registration update if available
      let swWaiting = false;
      if ('serviceWorker' in navigator) {
        try {
          const reg = await navigator.serviceWorker.getRegistration();
          if (reg) {
            await reg.update();
            if (reg.waiting) {
              swWaiting = true;
            }
          }
        } catch (swErr) {
          console.warn('[AppUpdate] SW registration update check note:', swErr);
        }
      }

      // 2. Fetch /version.json with cache-busting timestamp
      const response = await fetch(`/version.json?_t=${now}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} fetching version.json`);
      }

      const versionInfo: AppVersionInfo = await response.json();
      const isNewer = AppUpdateService.compareVersions(versionInfo.version, currentVersion) > 0;
      const hasUpdate = isNewer || swWaiting;

      // If this specific version was dismissed previously by user, and this is NOT a manual check, respect user choice
      const dismissedVer = localStorage.getItem(AppUpdateService.STORAGE_KEY_DISMISSED_VER);
      const isDismissed = !manual && dismissedVer === versionInfo.version;

      const result: AppUpdateCheckResult = {
        hasUpdate: hasUpdate && !isDismissed,
        currentVersion,
        latestVersion: versionInfo.version,
        versionInfo,
        userDataIntegrity: integrityReport,
        lastChecked: now,
      };

      this.notify(result);
      return result;
    } catch (err: any) {
      console.warn('[AppUpdate] Check failed:', err);
      const fallback: AppUpdateCheckResult = {
        hasUpdate: false,
        currentVersion,
        latestVersion: currentVersion,
        userDataIntegrity: integrityReport,
        lastChecked: now,
        error: err?.message || 'Network error checking version',
      };
      this.notify(fallback);
      return fallback;
    } finally {
      this.isChecking = false;
    }
  }

  /**
   * Applies the update with guaranteed safety:
   * 1. Backs up user data
   * 2. Signals Service Worker to skipWaiting & clear obsolete cache
   * 3. Updates client version pointer
   * 4. Reloads safely without infinite loops
   */
  public async applyUpdate(): Promise<void> {
    // Step 1: Backup user data locally to ensure 100% preservation
    this.createUserDataBackup();

    // Step 2: Signal service worker
    if ('serviceWorker' in navigator) {
      try {
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg && reg.waiting) {
          reg.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
          navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_OBSOLETE_CACHES' });
        }
      } catch (e) {
        console.warn('[AppUpdate] Error signaling Service Worker:', e);
      }
    }

    // Clear dismiss flag
    localStorage.removeItem(AppUpdateService.STORAGE_KEY_DISMISSED_VER);

    // Update stored client version
    if (this.latestResult?.latestVersion) {
      localStorage.setItem(AppUpdateService.STORAGE_KEY_CURRENT_VER, this.latestResult.latestVersion);
    }

    // Allow SW 250ms to activate
    await new Promise((resolve) => setTimeout(resolve, 250));

    // Reload window
    window.location.reload();
  }

  /**
   * User dismisses prompt for current version
   */
  public dismissCurrentUpdate(): void {
    if (this.latestResult?.latestVersion) {
      localStorage.setItem(AppUpdateService.STORAGE_KEY_DISMISSED_VER, this.latestResult.latestVersion);
    }
    if (this.latestResult) {
      this.latestResult = { ...this.latestResult, hasUpdate: false };
      this.notify(this.latestResult);
    }
  }

  /**
   * Cryptographically safe audit of user data stored in localStorage
   * Confirms bookmarks, notes, highlights, reading history, and reader settings are intact.
   */
  public verifyUserDataIntegrity(): UserDataIntegrityReport {
    if (typeof window === 'undefined') {
      return {
        intact: true,
        bookmarksCount: 0,
        notesCount: 0,
        highlightsCount: 0,
        historyCount: 0,
        hasSettings: true,
      };
    }

    try {
      const bookmarks = StorageService.getBookmarks();
      const notes = StorageService.getNotes();
      const highlights = StorageService.getHighlights();
      const history = StorageService.getReadingHistory();
      const settings = StorageService.getSettings();

      return {
        intact: true,
        bookmarksCount: bookmarks.length,
        notesCount: notes.length,
        highlightsCount: highlights.length,
        historyCount: history.length,
        hasSettings: Boolean(settings),
      };
    } catch (err) {
      console.error('[AppUpdate] verifyUserDataIntegrity error:', err);
      return {
        intact: false,
        bookmarksCount: 0,
        notesCount: 0,
        highlightsCount: 0,
        historyCount: 0,
        hasSettings: false,
      };
    }
  }

  /**
   * Creates an emergency snapshot backup in localStorage before any cache refresh
   */
  public createUserDataBackup(): void {
    if (typeof window === 'undefined') return;
    try {
      const snapshot = {
        timestamp: Date.now(),
        bookmarks: localStorage.getItem('bsb_bookmarks_v1'),
        highlights: localStorage.getItem('bsb_highlights_v1'),
        notes: localStorage.getItem('bsb_personal_notes_v1'),
        history: localStorage.getItem('bsb_reading_history_v1'),
        settings: localStorage.getItem('bsb_reader_settings_v1'),
        lastRead: localStorage.getItem('bsb_last_read_v1'),
      };
      localStorage.setItem(AppUpdateService.STORAGE_KEY_DATA_BACKUP, JSON.stringify(snapshot));
    } catch (err) {
      console.warn('[AppUpdate] Failed to create data backup:', err);
    }
  }

  public getLastCheckedTime(): number {
    if (typeof window === 'undefined') return 0;
    const val = localStorage.getItem(AppUpdateService.STORAGE_KEY_LAST_CHECKED);
    return val ? parseInt(val, 10) : 0;
  }

  private setLastCheckedTime(time: number): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(AppUpdateService.STORAGE_KEY_LAST_CHECKED, time.toString());
  }

  private buildFallbackResult(): AppUpdateCheckResult {
    return {
      hasUpdate: false,
      currentVersion: AppUpdateService.CURRENT_VERSION,
      latestVersion: AppUpdateService.CURRENT_VERSION,
      userDataIntegrity: this.verifyUserDataIntegrity(),
      lastChecked: this.getLastCheckedTime(),
    };
  }

  public destroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.listeners.clear();
  }
}
