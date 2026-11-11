// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// “দীপ — আপনার বাইবেল অধ্যয়ন সহায়ক”
// TUTORIAL INTRODUCTION & GENTLE THEME MUSIC COMPONENT
// ============================================================

import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Music,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import {
  DeepTutorialAudioService,
  AudioEngineState,
} from '../../services/deepTutorialAudioService';
import { DEEP_OFFICIAL_SPOKEN_GREETING } from '../../data/deepTutorialMusicData';
import { toBengaliDigits } from '../../utils/bengaliNumerals';

interface DeepTutorialIntroductionProps {
  onOpenLicenses?: () => void;
  compact?: boolean;
}

export const DeepTutorialIntroduction: React.FC<DeepTutorialIntroductionProps> = ({
  onOpenLicenses,
  compact = false,
}) => {
  const [preference, setPreference] = useState(() => DeepTutorialAudioService.getVisitorPreference());
  const [audioState, setAudioState] = useState<AudioEngineState>(() => DeepTutorialAudioService.getState());
  const [approvedTrack, setApprovedTrack] = useState(() => DeepTutorialAudioService.getApprovedTrack());

  // Subscribe to audio engine updates
  useEffect(() => {
    const unsubscribe = DeepTutorialAudioService.subscribe((state) => {
      setAudioState(state);
      setApprovedTrack(DeepTutorialAudioService.getApprovedTrack());
    });

    return () => {
      unsubscribe();
      // Halt music immediately when this component unmounts
      DeepTutorialAudioService.stop();
    };
  }, []);

  // Format mm:ss in Bengali digits
  const formatTimeBn = (seconds: number) => {
    const s = Math.floor(seconds || 0);
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    const str = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    return toBengaliDigits(str);
  };

  // Handler: Visitor clicks "সুরসহ দীপের পরিচিতি শুনুন"
  const handleAcceptSound = () => {
    const updated = DeepTutorialAudioService.setVisitorPreference({ enabled: true });
    setPreference(updated);

    // Play approved track
    DeepTutorialAudioService.playIntroMusic();

    // Voice ducking simulation for the spoken greeting
    DeepTutorialAudioService.setAudioDucking(true);
    setTimeout(() => {
      DeepTutorialAudioService.setAudioDucking(false);
    }, 5500);
  };

  // Handler: Visitor clicks "নিঃশব্দে দেখুন"
  const handleDeclineSound = () => {
    const updated = DeepTutorialAudioService.setVisitorPreference({ enabled: false, muted: true });
    setPreference(updated);
    DeepTutorialAudioService.stop();
  };

  // Playback control handlers
  const handleTogglePlayPause = () => {
    if (audioState.isPlaying) {
      DeepTutorialAudioService.pause();
    } else {
      if (audioState.currentTime > 0) {
        DeepTutorialAudioService.resume();
      } else {
        DeepTutorialAudioService.playIntroMusic();
      }
    }
  };

  const handleToggleMute = () => {
    DeepTutorialAudioService.toggleMute();
    setPreference(DeepTutorialAudioService.getVisitorPreference());
  };

  const handleReplay = () => {
    DeepTutorialAudioService.replay();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    DeepTutorialAudioService.setVolume(val);
    setPreference(DeepTutorialAudioService.getVisitorPreference());
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-amber-500/10 via-gold-500/5 to-slate-50/50 dark:from-navy-950 dark:via-navy-900 dark:to-navy-950 border border-gold-500/25 p-4 sm:p-5 shadow-sm transition-all">
      {/* 1. Deep Avatar & Official Greeting Caption */}
      <div className="flex items-start gap-3.5 mb-3.5">
        <div className="relative flex-shrink-0">
          <div
            className={`w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-gold-400 p-0.5 shadow-md flex items-center justify-center ${
              audioState.isPlaying ? 'ring-4 ring-gold-400/30 animate-pulse' : ''
            }`}
          >
            <div className="w-full h-full bg-navy-950 rounded-[14px] flex items-center justify-center text-gold-300 font-serif font-bold text-lg">
              দীপ
            </div>
          </div>
          {audioState.isPlaying && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-navy-900 animate-ping" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-gold-400 font-semibold mb-0.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>দীপ — আপনার বাইবেল অধ্যয়ন সহায়ক</span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
            “{DEEP_OFFICIAL_SPOKEN_GREETING.fullCaptionBn}”
          </p>
        </div>
      </div>

      {/* 2. Initial Choice if Visitor hasn't made a sound preference yet */}
      {!preference.hasChosen && (
        <div className="pt-2 border-t border-slate-200/70 dark:border-navy-800/80 mt-2">
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2.5">
            স্নিগ্ধ পরিচিতি অভিজ্ঞতা নির্বাচন করুন (আপনি যেকোনো সময় পরিবর্তন করতে পারবেন):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleAcceptSound}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-gold-500 hover:from-amber-600 hover:to-gold-600 text-navy-950 font-bold text-xs shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
            >
              <Music className="w-4 h-4" />
              <span>সুরসহ দীপের পরিচিতি শুনুন</span>
            </button>
            <button
              type="button"
              onClick={handleDeclineSound}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-navy-800 border border-slate-300 dark:border-navy-700 hover:bg-slate-100 dark:hover:bg-navy-700/60 text-slate-700 dark:text-slate-300 font-semibold text-xs transition active:scale-[0.98]"
            >
              <VolumeX className="w-4 h-4 text-slate-400" />
              <span>নিঃশব্দে দেখুন</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Audio Controls when Sound is Enabled */}
      {preference.hasChosen && preference.enabled && (
        <div className="pt-3 border-t border-slate-200/70 dark:border-navy-800/80 mt-2 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* Play/Pause & Replay Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleTogglePlayPause}
                className="p-2 rounded-xl bg-gold-500/15 hover:bg-gold-500/25 text-gold-700 dark:text-gold-300 border border-gold-500/30 transition"
                aria-label={audioState.isPlaying ? 'Pause audio' : 'Play audio'}
                title={audioState.isPlaying ? 'সাময়িক বন্ধ করুন' : 'চালু করুন'}
              >
                {audioState.isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </button>

              <button
                type="button"
                onClick={handleReplay}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800 transition"
                aria-label="Replay audio"
                title="পুনরায় শুনুন"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Time display */}
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 px-1">
                {formatTimeBn(audioState.currentTime)} / {formatTimeBn(audioState.duration)}
              </span>
            </div>

            {/* Volume Slider & Mute Toggle */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleMute}
                className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-800 transition"
                aria-label={preference.muted ? 'Unmute' : 'Mute'}
                title={preference.muted ? 'শব্দ আনমিউট করুন' : 'নিঃশব্দ করুন'}
              >
                {preference.muted ? (
                  <VolumeX className="w-4 h-4 text-rose-500" />
                ) : (
                  <Volume2 className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                )}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={preference.muted ? 0 : preference.volume}
                onChange={handleVolumeChange}
                aria-label="Volume slider"
                className="w-20 sm:w-24 h-1.5 bg-slate-200 dark:bg-navy-700 rounded-lg appearance-none cursor-pointer accent-gold-500"
              />

              <button
                type="button"
                onClick={handleDeclineSound}
                className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline ml-1"
              >
                নিঃশব্দ মোড
              </button>
            </div>
          </div>

          {/* Active Track Title & Licence Information */}
          <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-400 pt-1">
            <span className="truncate">
              সুর: {approvedTrack ? approvedTrack.titleBn : 'প্রভাতের অনুগ্রহ (Morning Grace - Soft Piano)'}
            </span>
            {onOpenLicenses && (
              <button
                type="button"
                onClick={onOpenLicenses}
                className="inline-flex items-center gap-1 text-gold-600 dark:text-gold-400 hover:underline flex-shrink-0"
              >
                <ShieldCheck className="w-3 h-3" />
                <span>লাইসেন্স ও কৃতজ্ঞতা</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* 4. Silent Mode Indicator when Visitor chose Silent */}
      {preference.hasChosen && !preference.enabled && (
        <div className="pt-2 border-t border-slate-200/70 dark:border-navy-800/80 mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1">
            <VolumeX className="w-3.5 h-3.5 text-slate-400" />
            <span>নিঃশব্দ মোড সক্রিয়</span>
          </span>
          <button
            type="button"
            onClick={handleAcceptSound}
            className="text-amber-600 dark:text-gold-400 hover:underline font-semibold"
          >
            সুরসহ শুনতে চান? এখানে স্পর্শ করুন
          </button>
        </div>
      )}

      {/* 5. Theological Boundary & Avatar Usage Notice */}
      <div className="pt-2 mt-2 border-t border-slate-200/50 dark:border-navy-800/50 text-[10px] text-slate-400 dark:text-slate-400 leading-tight">
        <span>⚠️ নির্দেশিকা দ্রষ্টব্য: অয়ন অবতার কেবল অ্যাপ ব্যবহারের পথপ্রদর্শক; এর কোনো ঐশ্বরিক বা শাস্ত্রীয় ব্যাখ্যাগত কর্তৃত্ব নেই। বাইবেলীয় গবেষণার জন্য সর্বদা 'Ask Bible' ও মূল শাস্ত্র পাঠ অনুসরণ করুন।</span>
      </div>
    </div>
  );
};
