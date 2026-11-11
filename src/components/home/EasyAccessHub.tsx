import React, { useState } from 'react';
import {
  BarChart3,
  BookOpen,
  Search,
  Sparkles,
  BookMarked,
  Smartphone,
  Church,
  ShieldCheck,
  ArrowRight,
  MessageSquare,
  Key,
  Compass,
  CheckCircle2,
  Lock,
  Layers,
  Zap,
} from 'lucide-react';
import { AuthService } from '../../services/authService';

interface EasyAccessHubProps {
  onNavigateToBible: (bookId: string, chapter: number, verse?: number) => void;
  onNavigateToSearch: () => void;
  onNavigateToSermonBuilder: () => void;
  onNavigateToAskBible?: () => void;
  onNavigateToStudy: () => void;
  onNavigateToLibrary: () => void;
  onNavigateToAdminAnalytics?: () => void;
  onNavigateToAdmin?: () => void;
  onNavigateToPartners?: () => void;
  onNavigateToInstall?: () => void;
  onNavigateToFeedback?: () => void;
}

export const EasyAccessHub: React.FC<EasyAccessHubProps> = ({
  onNavigateToBible,
  onNavigateToSearch,
  onNavigateToSermonBuilder,
  onNavigateToAskBible,
  onNavigateToStudy,
  onNavigateToLibrary: _onNavigateToLibrary,
  onNavigateToAdminAnalytics,
  onNavigateToAdmin,
  onNavigateToPartners,
  onNavigateToInstall,
  onNavigateToFeedback,
}) => {
  const [quickSearch, setQuickSearch] = useState('');
  const [ownerUnlocked, setOwnerUnlocked] = useState(() => AuthService.isAdmin());
  const [unlockMessage, setUnlockMessage] = useState<string | null>(null);

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = quickSearch.trim();
    if (!query) {
      onNavigateToSearch();
      return;
    }

    // Match Matthew / John / Psalms references
    if (/মথি|mat/i.test(query)) {
      const match = query.match(/\d+/);
      const ch = match ? parseInt(match[0], 10) : 1;
      onNavigateToBible('MAT', ch);
      return;
    }
    if (/যোহন|jhn|john/i.test(query)) {
      const match = query.match(/\d+/);
      const ch = match ? parseInt(match[0], 10) : 1;
      onNavigateToBible('JHN', ch);
      return;
    }
    if (/গীত|psa/i.test(query)) {
      const match = query.match(/\d+/);
      const ch = match ? parseInt(match[0], 10) : 23;
      onNavigateToBible('PSA', ch);
      return;
    }
    if (/আদি|gen/i.test(query)) {
      const match = query.match(/\d+/);
      const ch = match ? parseInt(match[0], 10) : 1;
      onNavigateToBible('GEN', ch);
      return;
    }
    if (/প্রকাশিত|rev/i.test(query)) {
      const match = query.match(/\d+/);
      const ch = match ? parseInt(match[0], 10) : 1;
      onNavigateToBible('REV', ch);
      return;
    }

    onNavigateToSearch();
  };

  const handleOwnerOneClickAccess = () => {
    AuthService.grantAdminSession();
    setOwnerUnlocked(true);
    setUnlockMessage('✓ স্বত্বাধিকারী অ্যাডমিন সেশন সক্রিয় হয়েছে!');
    setTimeout(() => {
      if (onNavigateToAdminAnalytics) {
        onNavigateToAdminAnalytics();
      }
    }, 300);
  };

  return (
    <div
      id="easy-access-box"
      className="bg-white dark:bg-stone-900 border-2 border-amber-500/40 dark:border-amber-500/30 rounded-3xl p-5 sm:p-7 shadow-xl shadow-amber-500/5 relative overflow-hidden transition-all"
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Box Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-stone-100 dark:border-stone-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
            <Zap className="w-6 h-6 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                সহজ একসেস বক্স (Easy Access Hub)
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                ALL-IN-ONE
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
              সব শাস্ত্রীয় মডিউল, অ্যানালিটিক্স ও ক্যানন অডিট সহজে এক ক্লিকে প্রবেশ করুন
            </p>
          </div>
        </div>

        {/* Live Integrity Indicators */}
        <div className="flex items-center gap-2 text-[11px] font-semibold">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>৬৬ পুস্তক সক্রিয়</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <Smartphone className="w-3.5 h-3.5 text-blue-600" />
            <span>অফলাইন PWA</span>
          </span>
        </div>
      </div>

      {/* Instant Scripture & Term Search Bar */}
      <form onSubmit={handleQuickSearchSubmit} className="mb-5">
        <div className="relative">
          <input
            type="text"
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
            placeholder="যেকোনো পুস্তক বা অধ্যায় লিখুন (যেমন: মথি ১, যোহন ৩:১৬, গীতসংহিতা ২৩, পরিত্রাণ)..."
            className="w-full pl-11 pr-24 py-3 bg-stone-50 dark:bg-stone-800/80 border border-stone-300 dark:border-stone-700 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900 dark:text-stone-100 shadow-inner"
          />
          <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-3.5" />
          <button
            type="submit"
            className="absolute right-2 top-2 px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm"
          >
            খুলুন ➔
          </button>
        </div>

        {/* Instant Jump Chips */}
        <div className="flex flex-wrap items-center gap-1.5 mt-2.5 text-xs">
          <span className="text-[11px] text-stone-400 font-medium">দ্রুত জাম্প:</span>
          {[
            { label: 'মথি ১ (Matthew)', bookId: 'MAT', ch: 1 },
            { label: 'যোহন ৩ (John)', bookId: 'JHN', ch: 3 },
            { label: 'গীতসংহিতা ২৩ (Psalms)', bookId: 'PSA', ch: 23 },
            { label: 'আদিপুস্তক ১ (Genesis)', bookId: 'GEN', ch: 1 },
            { label: 'প্রকাশিত বাক্য ২২ (Rev)', bookId: 'REV', ch: 22 },
          ].map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => onNavigateToBible(chip.bookId, chip.ch)}
              className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-amber-950/60 text-stone-700 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-300 transition-colors cursor-pointer font-medium text-[11px]"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </form>

      {/* Main 1-Click Access Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {/* 1. Owner Analytics Center */}
        {onNavigateToAdminAnalytics && (
          <button
            onClick={handleOwnerOneClickAccess}
            className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/20 hover:from-amber-500/20 hover:to-amber-600/30 border border-amber-500/40 text-left transition-all hover:scale-[1.02] cursor-pointer group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-2 shadow-sm">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div className="text-sm font-bold text-amber-900 dark:text-amber-300 group-hover:text-amber-800">
                📊 অ্যানালিটিক্স সেন্টার
              </div>
              <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                ব্যবহার ও পরিসংখ্যান (Owner)
              </div>
            </div>
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 mt-2 flex items-center gap-1">
              ১-ক্লিকে প্রবেশ ➔
            </span>
          </button>
        )}

        {/* 2. Holy Bible (66 Books) */}
        <button
          onClick={() => onNavigateToBible('MAT', 1)}
          className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700 text-left transition-all hover:scale-[1.02] cursor-pointer group shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-2 shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-stone-900 dark:text-stone-100">
              📖 সম্পূর্ণ বাইবেল
            </div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
              ৬৬টি পুস্তক • মথি ও যোহন
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1">
            পাঠ শুরু করুন ➔
          </span>
        </button>

        {/* 3. Sermon Builder */}
        <button
          onClick={onNavigateToSermonBuilder}
          className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700 text-left transition-all hover:scale-[1.02] cursor-pointer group shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-2 shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-stone-900 dark:text-stone-100">
              ✍️ সার্মন বিল্ডার
            </div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
              প্রচার রূপরেখা ও খসড়া তৈরি
            </div>
          </div>
          <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 mt-2 flex items-center gap-1">
            সার্মন তৈরি করুন ➔
          </span>
        </button>

        {/* 4. Ask Bible AI */}
        {onNavigateToAskBible && (
          <button
            onClick={onNavigateToAskBible}
            className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700 text-left transition-all hover:scale-[1.02] cursor-pointer group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-2 shadow-sm">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="text-sm font-bold text-stone-900 dark:text-stone-100">
                ✨ আস্ক বাইবেল AI
              </div>
              <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                শাস্ত্রীয় প্রশ্নোত্তর ও সমাধান
              </div>
            </div>
            <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 mt-2 flex items-center gap-1">
              প্রশ্ন করুন ➔
            </span>
          </button>
        )}

        {/* 5. Study Tools */}
        <button
          onClick={onNavigateToStudy}
          className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700 text-left transition-all hover:scale-[1.02] cursor-pointer group shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center mb-2 shadow-sm">
              <BookMarked className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-stone-900 dark:text-stone-100">
              📚 স্টাডি টুলস
            </div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
              বিষয় ও চরিত্র অধ্যয়ন
            </div>
          </div>
          <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 mt-2 flex items-center gap-1">
            অধ্যয়ন খুলুন ➔
          </span>
        </button>

        {/* 6. Canon & Integrity Audit */}
        {onNavigateToAdmin && (
          <button
            onClick={() => {
              AuthService.grantAdminSession();
              onNavigateToAdmin();
            }}
            className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700 text-left transition-all hover:scale-[1.02] cursor-pointer group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center mb-2 shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-sm font-bold text-stone-900 dark:text-stone-100">
                🛡️ ক্যানন ও অডিট
              </div>
              <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                ৬৬ পুস্তকের শুদ্ধতা যাচাই
              </div>
            </div>
            <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 mt-2 flex items-center gap-1">
              অডিট দেখুন ➔
            </span>
          </button>
        )}

        {/* 7. PWA Phone Install */}
        {onNavigateToInstall && (
          <button
            onClick={onNavigateToInstall}
            className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700 text-left transition-all hover:scale-[1.02] cursor-pointer group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center mb-2 shadow-sm">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="text-sm font-bold text-stone-900 dark:text-stone-100">
                📱 ফোনে ইনস্টল
              </div>
              <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                Android ও iPhone PWA গাইড
              </div>
            </div>
            <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 mt-2 flex items-center gap-1">
              ইনস্টল নির্দেশিকা ➔
            </span>
          </button>
        )}

        {/* 8. Church & Ministry Partner Kit */}
        {onNavigateToPartners && (
          <button
            onClick={onNavigateToPartners}
            className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700 text-left transition-all hover:scale-[1.02] cursor-pointer group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-amber-700 text-white flex items-center justify-center mb-2 shadow-sm">
                <Church className="w-5 h-5" />
              </div>
              <div className="text-sm font-bold text-stone-900 dark:text-stone-100">
                🤝 পার্টনার কিট
              </div>
              <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                ঘোষণা, স্লাইড ও QR কোড
              </div>
            </div>
            <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 mt-2 flex items-center gap-1">
              উপকরণ পান ➔
            </span>
          </button>
        )}
      </div>

      {/* Owner Instant Unlock Strip */}
      <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-stone-100 dark:to-stone-800/80 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <span>👑 স্বত্বাধিকারী কুইক অ্যাক্সেস (Rev. Ayan Kumar Ghosh)</span>
              {ownerUnlocked && (
                <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-500 text-white font-bold">
                  সক্রিয়
                </span>
              )}
            </div>
            <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">
              অফিসিয়াল ইমেল: <span className="font-mono text-amber-600 dark:text-amber-400">ayanghosh75@gmail.com</span> • ১-ক্লিকে পাসকোড ছাড়া সম্পূর্ণ অ্যানালিটিক্স ড্যাশবোর্ড দেখুন
            </p>
          </div>
        </div>

        <button
          onClick={handleOwnerOneClickAccess}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-amber-600/20 flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
        >
          <span>📊 সরাসরি অ্যানালিটিক্স খুলুন</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {unlockMessage && (
        <div className="mt-3 p-2 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs flex items-center gap-2 animate-fade-in font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{unlockMessage}</span>
        </div>
      )}
    </div>
  );
};
