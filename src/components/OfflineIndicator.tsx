import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';

interface OfflineIndicatorProps {
  isOffline: boolean;
  updateAvailable: boolean;
  onApplyUpdate: () => void;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({
  isOffline,
  updateAvailable,
  onApplyUpdate,
}) => {
  if (!isOffline && !updateAvailable) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none animate-in slide-in-from-top duration-300">
      <div className="pointer-events-auto max-w-md w-full">
        {updateAvailable && (
          <div className="mb-2 p-3 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 rounded-2xl shadow-xl border border-gold-400 flex items-center justify-between gap-3">
            <div className="flex items-center space-x-2 text-xs font-bold">
              <RefreshCw className="w-4 h-4 animate-spin text-navy-950" />
              <span>বাংলা স্টাডি বাইবেলের নতুন সংস্করণ প্রস্তুত!</span>
            </div>
            <button
              onClick={onApplyUpdate}
              className="px-3 py-1 bg-navy-950 text-gold-300 hover:text-white rounded-xl text-xs font-bold shadow transition-all"
            >
              আপডেট করুন
            </button>
          </div>
        )}

        {isOffline && (
          <div className="p-2.5 bg-navy-900/95 backdrop-blur-md text-slate-200 rounded-2xl shadow-xl border border-gold-500/30 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center space-x-2">
              <WifiOff className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="font-sans">
                আপনি অফলাইনে আছেন • পূর্বে লোড করা শাস্ত্র ও নোটসমূহ প্রস্তুত আছে।
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
              অফলাইন
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
