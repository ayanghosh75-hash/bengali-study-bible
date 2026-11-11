// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// “দীপ — আপনার বাইবেল অধ্যয়ন সহায়ক”
// TUTORIAL THEME AUDIO & APPROVAL QUEUE SERVICE
// Administrator: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)
// ============================================================

import {
  TutorialTrackRecord,
  TutorialAudioPreference,
  TrackApprovalStatus,
} from '../types/deepTutorialMusic';
import {
  VERIFIED_TUTORIAL_TRACK_CANDIDATES,
  DEEP_OFFICIAL_SPOKEN_GREETING,
} from '../data/deepTutorialMusicData';

const TRACKS_STORAGE_KEY = 'bsb_deep_tutorial_tracks_v1';
const PREFERENCE_STORAGE_KEY = 'bsb_deep_tutorial_audio_preference_v1';
const MUSIC_DISABLED_KEY = 'bsb_deep_tutorial_music_disabled_v1';

export interface AudioEngineState {
  isPlaying: boolean;
  isPaused: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  track: TutorialTrackRecord | null;
  hasAudioError: boolean;
  isDucked: boolean;
}

type StateListener = (state: AudioEngineState) => void;

export class DeepTutorialAudioService {
  private static audioElement: HTMLAudioElement | null = null;
  private static audioContext: AudioContext | null = null;
  private static listeners: Set<StateListener> = new Set();
  private static isDucked: boolean = false;
  private static currentTrackId: string | null = null;
  private static progressInterval: any = null;

  // ============================================================
  // 1. TRACK REGISTRY & APPROVAL QUEUE (Admin Controls)
  // ============================================================

  /**
   * Load tracks from persistent storage, initialized with 3 verified candidates
   */
  public static getAllTracks(): TutorialTrackRecord[] {
    if (typeof window === 'undefined') {
      return VERIFIED_TUTORIAL_TRACK_CANDIDATES;
    }
    try {
      const raw = localStorage.getItem(TRACKS_STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error('Failed to load tutorial tracks from storage:', e);
    }
    return VERIFIED_TUTORIAL_TRACK_CANDIDATES;
  }

  /**
   * Save tracks to persistent storage
   */
  private static saveTracks(tracks: TutorialTrackRecord[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(TRACKS_STORAGE_KEY, JSON.stringify(tracks));
    } catch (e) {
      console.error('Failed to save tutorial tracks:', e);
    }
  }

  /**
   * Returns candidate tracks awaiting administrator review
   */
  public static getApprovalQueue(): TutorialTrackRecord[] {
    return this.getAllTracks().filter((t) => t.approvalStatus === 'PENDING_APPROVAL');
  }

  /**
   * Returns the currently active approved track, or null if unapproved or disabled
   */
  public static getApprovedTrack(): TutorialTrackRecord | null {
    if (this.isMusicGloballyDisabled()) return null;
    const tracks = this.getAllTracks();
    return tracks.find((t) => t.approvalStatus === 'APPROVED') || null;
  }

  /**
   * Administrator approves a specific track for public tutorial playback
   */
  public static approveTrack(
    trackId: string,
    approverName: string = 'Rev. Ayan Kumar Ghosh'
  ): TutorialTrackRecord | null {
    const tracks = this.getAllTracks();
    let approvedTrack: TutorialTrackRecord | null = null;

    const updated = tracks.map((track) => {
      if (track.id === trackId) {
        approvedTrack = {
          ...track,
          approvalStatus: 'APPROVED' as TrackApprovalStatus,
          approvedBy: approverName,
          approvalDate: new Date().toISOString(),
          adminNotes: `Approved by ${approverName} for tutorial introduction.`,
        };
        return approvedTrack;
      }
      // If another track was previously approved, return it to candidate standby
      if (track.approvalStatus === 'APPROVED') {
        return {
          ...track,
          approvalStatus: 'PENDING_APPROVAL' as TrackApprovalStatus,
        };
      }
      return track;
    });

    this.saveTracks(updated);
    this.notifyState();
    return approvedTrack;
  }

  /**
   * Administrator rejects a track
   */
  public static rejectTrack(trackId: string, reason: string): void {
    const tracks = this.getAllTracks();
    const updated = tracks.map((track) => {
      if (track.id === trackId) {
        return {
          ...track,
          approvalStatus: 'REJECTED' as TrackApprovalStatus,
          rejectionReason: reason,
        };
      }
      return track;
    });
    this.saveTracks(updated);
    this.notifyState();
  }

  /**
   * Global emergency disable toggle for tutorial music
   */
  public static isMusicGloballyDisabled(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(MUSIC_DISABLED_KEY) === 'true';
  }

  public static setMusicGloballyDisabled(disabled: boolean): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(MUSIC_DISABLED_KEY, disabled ? 'true' : 'false');
    if (disabled) {
      this.stop();
    }
    this.notifyState();
  }

  // ============================================================
  // 2. VISITOR AUDIO PREFERENCE (Local Device Etiquette)
  // ============================================================

  /**
   * Get visitor's saved audio preference (Default: silent on first visit)
   */
  public static getVisitorPreference(): TutorialAudioPreference {
    const defaultPref: TutorialAudioPreference = {
      enabled: false,
      hasChosen: false,
      muted: false,
      volume: 0.35, // Gentle background level
      lastUpdated: new Date().toISOString(),
    };

    if (typeof window === 'undefined') return defaultPref;

    try {
      const raw = localStorage.getItem(PREFERENCE_STORAGE_KEY);
      if (raw) {
        return { ...defaultPref, ...JSON.parse(raw) };
      }
    } catch (e) {
      console.error('Failed to read tutorial audio preference:', e);
    }
    return defaultPref;
  }

  /**
   * Save visitor choice ("সুরসহ শুনুন" or "নিঃশব্দে দেখুন")
   */
  public static setVisitorPreference(partial: Partial<TutorialAudioPreference>): TutorialAudioPreference {
    const current = this.getVisitorPreference();
    const updated: TutorialAudioPreference = {
      ...current,
      ...partial,
      hasChosen: true,
      lastUpdated: new Date().toISOString(),
    };

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(PREFERENCE_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save audio preference:', e);
      }
    }

    // Apply volume / mute to active element if playing
    if (this.audioElement) {
      this.audioElement.volume = updated.volume;
      this.audioElement.muted = updated.muted;
    }

    return updated;
  }

  // ============================================================
  // 3. AUDIO PLAYBACK ENGINE & LIFECYCLE
  // ============================================================

  /**
   * Play introduction music (Only when user explicitly accepted or for admin preview)
   */
  public static async playIntroMusic(targetTrackId?: string, forceAdminPreview: boolean = false): Promise<boolean> {
    if (typeof window === 'undefined') return false;

    // Check global disable unless it is an explicit admin preview
    if (!forceAdminPreview && this.isMusicGloballyDisabled()) {
      return false;
    }

    const allTracks = this.getAllTracks();
    let trackToPlay: TutorialTrackRecord | null = null;

    if (targetTrackId) {
      trackToPlay = allTracks.find((t) => t.id === targetTrackId) || null;
    } else {
      trackToPlay = this.getApprovedTrack();
    }

    // If no track is approved and this is not an admin preview, keep silent
    if (!trackToPlay) {
      return false;
    }

    // Stop any existing playback before starting
    this.stop();

    this.currentTrackId = trackToPlay.id;
    const pref = this.getVisitorPreference();
    const baseVolume = pref.volume || 0.35;

    try {
      const audio = new Audio(trackToPlay.audioFilePath);
      this.audioElement = audio;
      audio.volume = pref.muted ? 0 : baseVolume;
      audio.muted = pref.muted;

      // Event Listeners
      audio.onended = () => {
        this.stop();
      };

      audio.onerror = () => {
        console.warn('HTML5 Audio loading failed; falling back to Web Audio procedural synthesis.');
        this.synthesizePeacefulFallback(trackToPlay!, baseVolume);
      };

      // Start playback
      await audio.play();

      this.startProgressTracking();
      this.notifyState();
      return true;
    } catch (err) {
      // Browser autoplay restriction or file access issue -> fallback gracefully
      console.warn('Audio playback could not start automatically (browser policy or error). Silent fallback active.', err);
      this.notifyState(true);
      return false;
    }
  }

  /**
   * Web Audio API procedural synthesis fallback (100% offline & zero network dependency)
   */
  public static synthesizePeacefulFallback(track: TutorialTrackRecord, targetVolume: number = 0.32): void {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      this.audioContext = ctx;

      const now = ctx.currentTime;
      const duration = track.durationSeconds || 10.0;
      const fadeIn = track.fadeSettings.fadeInSeconds || 1.5;
      const fadeOut = track.fadeSettings.fadeOutSeconds || 2.0;

      // Master gain node with smooth fade envelope
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.exponentialRampToValueAtTime(targetVolume, now + fadeIn);
      masterGain.gain.setValueAtTime(targetVolume, now + duration - fadeOut);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      masterGain.connect(ctx.destination);

      // 4 Peaceful Chords: C (261Hz) -> G (246Hz) -> Am (220Hz) -> F (174Hz)
      const chords = [
        { time: 0.0, freqs: [261.63, 329.63, 392.0, 523.25] },
        { time: 2.5, freqs: [246.94, 293.66, 392.0, 493.88] },
        { time: 5.0, freqs: [220.0, 261.63, 329.63, 440.0] },
        { time: 7.2, freqs: [174.61, 261.63, 349.23, 523.25] },
      ];

      chords.forEach((c) => {
        c.freqs.forEach((freq) => {
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + c.time);

          noteGain.gain.setValueAtTime(0.001, now + c.time);
          noteGain.gain.exponentialRampToValueAtTime(0.12, now + c.time + 0.05);
          noteGain.gain.exponentialRampToValueAtTime(0.001, now + c.time + 2.4);

          osc.connect(noteGain);
          noteGain.connect(masterGain);

          osc.start(now + c.time);
          osc.stop(now + c.time + 2.5);
        });
      });

      this.startProgressTracking();
      this.notifyState();
    } catch (e) {
      console.warn('Web Audio synthesis not supported in this environment.', e);
      this.notifyState(true);
    }
  }

  /**
   * Pause playback
   */
  public static pause(): void {
    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (this.audioContext && this.audioContext.state === 'running') {
      this.audioContext.suspend();
    }
    this.notifyState();
  }

  /**
   * Resume playback
   */
  public static resume(): void {
    if (this.audioElement) {
      this.audioElement.play().catch(() => {});
    }
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    this.notifyState();
  }

  /**
   * Replay from the beginning
   */
  public static replay(): void {
    if (this.audioElement) {
      this.audioElement.currentTime = 0;
      this.audioElement.play().catch(() => {});
    } else if (this.currentTrackId) {
      this.playIntroMusic(this.currentTrackId);
    }
    this.notifyState();
  }

  /**
   * Toggle Mute
   */
  public static toggleMute(): boolean {
    const pref = this.getVisitorPreference();
    const newMuted = !pref.muted;
    this.setVisitorPreference({ muted: newMuted });

    if (this.audioElement) {
      this.audioElement.muted = newMuted;
    }
    this.notifyState();
    return newMuted;
  }

  /**
   * Set volume (0.0 to 1.0)
   */
  public static setVolume(vol: number): void {
    const clamped = Math.max(0, Math.min(1, vol));
    this.setVisitorPreference({ volume: clamped, muted: clamped === 0 });

    if (this.audioElement) {
      this.audioElement.volume = clamped;
    }
    this.notifyState();
  }

  /**
   * Audio Ducking: Smoothly lower music volume when voiceover / spoken greeting is speaking
   */
  public static setAudioDucking(ducked: boolean): void {
    this.isDucked = ducked;
    if (!this.audioElement) return;

    const pref = this.getVisitorPreference();
    const normalVol = pref.volume || 0.35;
    const target = ducked ? normalVol * 0.45 : normalVol;

    this.audioElement.volume = Math.max(0.05, target);
    this.notifyState();
  }

  /**
   * Stop audio immediately and cleanup all listeners
   * Must be called whenever tutorial modal is dismissed or navigated away.
   */
  public static stop(): void {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
      this.audioElement.src = '';
      this.audioElement = null;
    }

    if (this.audioContext) {
      try {
        this.audioContext.close();
      } catch {}
      this.audioContext = null;
    }

    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }

    this.currentTrackId = null;
    this.isDucked = false;
    this.notifyState();
  }

  // ============================================================
  // 4. REACTIVE STATE & PROGRESS SUBSCRIPTION
  // ============================================================

  public static getState(): AudioEngineState {
    const pref = this.getVisitorPreference();
    const track = this.currentTrackId
      ? this.getAllTracks().find((t) => t.id === this.currentTrackId) || null
      : this.getApprovedTrack();

    const isPlaying = Boolean(this.audioElement && !this.audioElement.paused) ||
      Boolean(this.audioContext && this.audioContext.state === 'running');

    const isPaused = Boolean(this.audioElement && this.audioElement.paused && this.audioElement.currentTime > 0) ||
      Boolean(this.audioContext && this.audioContext.state === 'suspended');

    const currentTime = this.audioElement ? this.audioElement.currentTime : 0;
    const duration = this.audioElement && !isNaN(this.audioElement.duration)
      ? this.audioElement.duration
      : track ? track.durationSeconds : 10.0;

    return {
      isPlaying,
      isPaused,
      isMuted: pref.muted,
      volume: pref.volume,
      currentTime,
      duration,
      track,
      hasAudioError: false,
      isDucked: this.isDucked,
    };
  }

  public static subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private static notifyState(hasError: boolean = false): void {
    const state = { ...this.getState(), hasAudioError: hasError };
    this.listeners.forEach((l) => {
      try {
        l(state);
      } catch (err) {
        console.error('Error in audio state listener:', err);
      }
    });
  }

  private static startProgressTracking(): void {
    if (this.progressInterval) clearInterval(this.progressInterval);
    this.progressInterval = setInterval(() => {
      if (this.audioElement && !this.audioElement.paused) {
        this.notifyState();
      }
    }, 200);
  }
}
