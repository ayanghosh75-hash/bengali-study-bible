export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export class PwaService {
  private static STORAGE_KEY_INSTALLED = 'bsb_pwa_installed';
  private static STORAGE_KEY_BANNER_DISMISSED = 'bsb_pwa_banner_dismissed_until';

  /**
   * Checks if app is running in standalone (installed) mode
   */
  public static isStandalone(): boolean {
    if (typeof window === 'undefined') return false;
    
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
    const isIOSStandalone = (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    const isAndroidApp = document.referrer.includes('android-app://');
    
    return Boolean(isStandaloneMode || isIOSStandalone || isAndroidApp);
  }

  /**
   * Checks whether the user has previously installed or is running standalone
   */
  public static isInstalled(): boolean {
    if (this.isStandalone()) return true;
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(this.STORAGE_KEY_INSTALLED) === 'true';
  }

  /**
   * Mark as installed
   */
  public static markAsInstalled(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.STORAGE_KEY_INSTALLED, 'true');
  }

  /**
   * Check whether installation banner should be shown
   */
  public static shouldShowBanner(): boolean {
    if (this.isStandalone() || this.isInstalled()) {
      return false;
    }
    const dismissedUntil = localStorage.getItem(this.STORAGE_KEY_BANNER_DISMISSED);
    if (dismissedUntil) {
      const expiry = parseInt(dismissedUntil, 10);
      if (Date.now() < expiry) {
        return false;
      }
    }
    return true;
  }

  /**
   * Dismiss the installation banner for a specified number of days (default 7 days)
   */
  public static dismissBanner(days: number = 7): void {
    if (typeof window === 'undefined') return;
    const expiry = Date.now() + days * 24 * 60 * 60 * 1000;
    localStorage.setItem(this.STORAGE_KEY_BANNER_DISMISSED, expiry.toString());
  }

  /**
   * Detect if device is iOS (iPhone/iPad)
   */
  public static isIOS(): boolean {
    if (typeof window === 'undefined') return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream;
  }

  /**
   * Detect if device is Android
   */
  public static isAndroid(): boolean {
    if (typeof window === 'undefined') return false;
    return /Android/i.test(navigator.userAgent);
  }

  /**
   * Detect if device is Windows
   */
  public static isWindows(): boolean {
    if (typeof window === 'undefined') return false;
    return /Windows/i.test(navigator.userAgent);
  }

  /**
   * Detect if device is macOS/MacBook
   */
  public static isMac(): boolean {
    if (typeof window === 'undefined') return false;
    return /Macintosh|Mac OS X/i.test(navigator.userAgent) && !this.isIOS();
  }

  /**
   * Get device type
   */
  public static getDeviceType(): 'android' | 'ios' | 'windows' | 'mac' | 'other' {
    if (this.isAndroid()) return 'android';
    if (this.isIOS()) return 'ios';
    if (this.isWindows()) return 'windows';
    if (this.isMac()) return 'mac';
    return 'other';
  }

  /**
   * Checks whether the current browser supports PWA installation
   */
  public static isPwaInstallSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return 'serviceWorker' in navigator && !/FBAN|FBAV|Instagram|Twitter/i.test(navigator.userAgent);
  }

  /**
   * Clears obsolete caches and requests service worker cache purge without wiping user study data
   */
  public static async clearObsoleteCaches(): Promise<{ success: boolean; clearedCount: number }> {
    if (typeof window === 'undefined' || !('caches' in window)) {
      return { success: false, clearedCount: 0 };
    }
    try {
      const keys = await caches.keys();
      let cleared = 0;
      for (const key of keys) {
        if (!key.includes('-v6')) {
          await caches.delete(key);
          cleared++;
        }
      }
      // If service worker is active, send CLEAR_OBSOLETE_CACHES message
      if (navigator.serviceWorker && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_OBSOLETE_CACHES' });
      }
      return { success: true, clearedCount: cleared };
    } catch (e) {
      console.error('Failed to clear caches:', e);
      return { success: false, clearedCount: 0 };
    }
  }

  /**
   * Force update service worker to latest production release
   */
  public static async forceServiceWorkerUpdate(): Promise<boolean> {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return false;
    try {
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg) {
        await reg.update();
        if (reg.waiting) {
          reg.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
        return true;
      }
    } catch (e) {
      console.warn('Failed to force SW update:', e);
    }
    return false;
  }
}

