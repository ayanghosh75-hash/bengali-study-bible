import React, { useState } from 'react';
import {
  Search,
  Sliders,
  BookOpen,
  Share2,
  Download,
  User,
  Menu,
  X,
  Compass,
  Church,
  Library,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  ExternalLink,
  GraduationCap,
  MessageSquare,
  BarChart3,
} from 'lucide-react';

import { UserProfile } from '../types/auth';
import { NavTab } from './BottomNav';
import { FacebookIcon } from './social/FacebookLogo';
import { BengaliStudyBibleLogo } from './brand/BengaliStudyBibleLogo';
import { AuthService } from '../services/authService';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  onOpenShare: () => void;
  onOpenInstall?: () => void;
  onOpenUserAccount?: () => void;
  onSelectTab: (tab: NavTab) => void;
  currentUser?: UserProfile;
  showInstallButton?: boolean;
  activeTab: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenSettings,
  onOpenShare,
  onOpenInstall,
  onOpenUserAccount,
  onSelectTab,
  currentUser,
  showInstallButton = false,
  activeTab,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 bg-navy-950/95 backdrop-blur-md text-white border-b border-navy-800 shadow-sm transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo & Title */}
        <div
          onClick={() => onSelectTab('home')}
          className="cursor-pointer transition-opacity hover:opacity-95"
          title="বাংলা স্টাডি বাইবেল হোম"
        >
          <BengaliStudyBibleLogo
            variant="horizontal"
            theme="dark"
            size="md"
            showTagline={true}
            showBadge={true}
          />
        </div>

        {/* Quick Action Icons */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* Install App Button if not installed */}
          {showInstallButton && onOpenInstall && (
            <button
              onClick={onOpenInstall}
              className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 font-bold text-xs shadow-md shadow-gold-500/20 hover:brightness-105 transition-all flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
              title="ফোনে অ্যাপটি ইনস্টল করুন"
              aria-label="Install App"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="text-[11px] sm:text-xs">ইনস্টল</span>
            </button>
          )}

          {/* Daily Word Button */}
          <button
            onClick={() => onSelectTab('daily-word')}
            className={`p-2 sm:px-3 sm:py-2 rounded-xl transition-all flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
              activeTab === 'daily-word'
                ? 'bg-amber-500 text-navy-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30'
            }`}
            title="আজকের বাক্য (Daily Word — দীপ)"
            aria-label="Daily Word"
          >
            <span className="text-sm">🌿</span>
            <span className="hidden sm:inline text-xs font-semibold">দৈনিক বাক্য</span>
          </button>

          {/* Knowledge Base Button */}
          <button
            onClick={() => onSelectTab('knowledge-base')}
            className={`p-2 sm:px-3 sm:py-2 rounded-xl transition-all flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
              activeTab === 'knowledge-base'
                ? 'bg-amber-500 text-navy-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-gold-300 hover:text-gold-200 bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30'
            }`}
            title="দীপ বাংলা খ্রিষ্টীয় জ্ঞানভাণ্ডার"
            aria-label="Knowledge Base"
          >
            <span className="text-sm">🏛️</span>
            <span className="hidden sm:inline text-xs font-semibold">জ্ঞানভাণ্ডার</span>
          </button>

          {/* Quick Search */}
          <button
            id="tour-quick-search-btn"
            onClick={onOpenSearch}
            className="p-2 sm:p-2.5 rounded-xl text-slate-300 hover:text-gold-400 hover:bg-navy-800/80 transition-all flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
            title="অনুসন্ধান করুন (Search)"
            aria-label="Search Bible"
          >
            <Search className="w-5 h-5" />
            <span className="hidden md:inline text-xs text-slate-300">অনুসন্ধান</span>
          </button>

          {/* WhatsApp / QR Share */}
          <button
            onClick={onOpenShare}
            className="p-2 sm:p-2.5 rounded-xl text-gold-400 hover:text-gold-300 bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30 transition-all flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
            title="শেয়ার ও QR পোস্টার (Share & QR Code)"
            aria-label="Share App"
          >
            <Share2 className="w-5 h-5" />
            <span className="hidden sm:inline text-xs font-semibold">শেয়ার</span>
          </button>

          {/* Official Facebook Page Link */}
          <a
            href="https://www.facebook.com/bengalistudybible"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-white bg-[#1877F2] hover:bg-[#166fe5] shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#1877F2]/50 active:scale-95"
            title="বাংলা স্টাডি বাইবেল অফিসিয়াল ফেসবুক পেজ (Facebook Page)"
            aria-label="Facebook Page"
          >
            <FacebookIcon className="w-4 h-4 fill-white" />
            <span className="hidden md:inline text-xs font-bold">ফেসবুক</span>
          </a>

          {/* Quick Admin Access Button if authorized */}
          {AuthService.isAdmin(currentUser) && (
            <button
              onClick={() => onSelectTab('deep-control-centre')}
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border flex items-center gap-1.5 transition-all text-xs font-bold ${
                activeTab === 'deep-control-centre'
                  ? 'border-amber-400 bg-amber-500/30 text-amber-300'
                  : 'border-amber-500/40 bg-amber-950/40 text-amber-300 hover:bg-amber-900/50'
              }`}
              title="দীপ মিনিস্ট্রি কন্ট্রোল সেন্টার (Deep Ministry Control Centre)"
              aria-label="Deep Control Centre"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="hidden lg:inline">দীপ কন্ট্রোল</span>
            </button>
          )}

          {/* Reader Settings */}
          <button
            onClick={onOpenSettings}
            className="p-2 sm:p-2.5 rounded-xl text-slate-300 hover:text-gold-400 hover:bg-navy-800/80 transition-all flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
            title="পাঠক সেটিংস (Reader Settings)"
            aria-label="Reader Settings"
          >
            <Sliders className="w-5 h-5" />
            <span className="hidden md:inline text-xs text-slate-300">সেটিংস</span>
          </button>

          {/* User Account / Profile */}
          {onOpenUserAccount && (
            <button
              onClick={onOpenUserAccount}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-white hover:bg-navy-800 transition-all flex items-center gap-2 border border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
              title="ব্যবহারকারী একাউন্ট ও স্টাডি স্পেস"
              aria-label="User Account"
            >
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-gold-400 to-amber-600 text-navy-950 font-bold text-xs flex items-center justify-center">
                {currentUser ? currentUser.displayName.charAt(0) : <User className="w-3.5 h-3.5" />}
              </div>
              <span className="hidden sm:inline text-xs font-semibold max-w-[80px] truncate text-slate-200">
                {currentUser && !currentUser.isGuest ? currentUser.displayName : 'একাউন্ট'}
              </span>
            </button>
          )}

          {/* All Sections Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 sm:p-2.5 rounded-xl text-slate-300 hover:text-gold-400 hover:bg-navy-800/80 transition-all flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
            title="সকল মডিউল ও মেনু"
            aria-label="All Modules Menu"
          >
            {isMenuOpen ? <X className="w-5 h-5 text-gold-400" /> : <Menu className="w-5 h-5" />}
            <span className="hidden md:inline text-xs text-slate-300">মেনু</span>
          </button>
        </div>
      </div>

      {/* Slide-down / Dropdown All Modules Navigation Drawer */}
      {isMenuOpen && (
        <div className="bg-navy-900 border-b border-navy-800 shadow-2xl p-4 sm:p-6 animate-fadeIn">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-4 border-b border-navy-800 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                সকল শাস্ত্রীয় মডিউল ও সেবা কেন্দ্র (All Platform Modules)
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                বন্ধ করুন ✕
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs">
              <button
                onClick={() => {
                  onSelectTab('bible');
                  setIsMenuOpen(false);
                }}
                className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                  activeTab === 'bible'
                    ? 'border-gold-500 bg-gold-500/20 text-gold-300 font-bold'
                    : 'border-navy-800 hover:border-navy-700 bg-navy-950/60 text-slate-300'
                }`}
              >
                <BookOpen className="w-4 h-4 text-gold-400 shrink-0" />
                <span>📖 বাইবেল রিডার</span>
              </button>

              <button
                onClick={() => {
                  onSelectTab('study');
                  setIsMenuOpen(false);
                }}
                className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                  activeTab === 'study'
                    ? 'border-gold-500 bg-gold-500/20 text-gold-300 font-bold'
                    : 'border-navy-800 hover:border-navy-700 bg-navy-950/60 text-slate-300'
                }`}
              >
                <BookOpen className="w-4 h-4 text-gold-400 shrink-0" />
                <span>🎓 শাস্ত্রীয় অধ্যয়ন</span>
              </button>

              <button
                onClick={() => {
                  onSelectTab('academy');
                  setIsMenuOpen(false);
                }}
                className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                  activeTab === 'academy'
                    ? 'border-gold-500 bg-gold-500/20 text-gold-300 font-bold'
                    : 'border-navy-800 hover:border-navy-700 bg-navy-950/60 text-slate-300'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-gold-400 shrink-0" />
                <span>🎓 একাডেমি ও সহায়িকা</span>
              </button>

              <button
                id="tour-ask-bible-tab"
                onClick={() => {
                  onSelectTab('ask-bible');
                  setIsMenuOpen(false);
                }}
                className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                  activeTab === 'ask-bible'
                    ? 'border-gold-500 bg-gold-500/20 text-gold-300 font-bold'
                    : 'border-navy-800 hover:border-navy-700 bg-navy-950/60 text-slate-300'
                }`}
              >
                <Sparkles className="w-4 h-4 text-gold-400 shrink-0" />
                <span>🤖 Ask Bible (RAG)</span>
              </button>

              <button
                onClick={() => {
                  onSelectTab('pastor-tools');
                  setIsMenuOpen(false);
                }}
                className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                  activeTab === 'pastor-tools'
                    ? 'border-gold-500 bg-gold-500/20 text-gold-300 font-bold'
                    : 'border-navy-800 hover:border-navy-700 bg-navy-950/60 text-slate-300'
                }`}
              >
                <BookOpen className="w-4 h-4 text-gold-400 shrink-0" />
                <span>👨‍牧 যাজকীয় টুলস</span>
              </button>

              <button
                onClick={() => {
                  onSelectTab('church-tools');
                  setIsMenuOpen(false);
                }}
                className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                  activeTab === 'church-tools'
                    ? 'border-gold-500 bg-gold-500/20 text-gold-300 font-bold'
                    : 'border-navy-800 hover:border-navy-700 bg-navy-950/60 text-slate-300'
                }`}
              >
                <Church className="w-4 h-4 text-gold-400 shrink-0" />
                <span>⛪ মণ্ডলী স্পেস</span>
              </button>

              <button
                id="tour-library-tab"
                onClick={() => {
                  onSelectTab('maps');
                  setIsMenuOpen(false);
                }}
                className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                  activeTab === 'maps'
                    ? 'border-gold-500 bg-gold-500/20 text-gold-300 font-bold'
                    : 'border-navy-800 hover:border-navy-700 bg-navy-950/60 text-slate-300'
                }`}
              >
                <Compass className="w-4 h-4 text-gold-400 shrink-0" />
                <span>🗺️ মানচিত্র ও ভূগোল</span>
              </button>

              <button
                onClick={() => {
                  onSelectTab('library');
                  setIsMenuOpen(false);
                }}
                className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                  activeTab === 'library'
                    ? 'border-gold-500 bg-gold-500/20 text-gold-300 font-bold'
                    : 'border-navy-800 hover:border-navy-700 bg-navy-950/60 text-slate-300'
                }`}
              >
                <Library className="w-4 h-4 text-gold-400 shrink-0" />
                <span>📚 উন্মুক্ত লাইব্রেরি</span>
              </button>

              <button
                onClick={() => {
                  onSelectTab('daily-word');
                  setIsMenuOpen(false);
                }}
                className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                  activeTab === 'daily-word'
                    ? 'border-gold-500 bg-gold-500/20 text-gold-300 font-bold'
                    : 'border-navy-800 hover:border-navy-700 bg-navy-950/60 text-slate-300'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>🌿 দৈনিক বাক্য (দীপ)</span>
              </button>

              <button
                onClick={() => {
                  onSelectTab('knowledge-base');
                  setIsMenuOpen(false);
                }}
                className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                  activeTab === 'knowledge-base'
                    ? 'border-gold-500 bg-gold-500/20 text-gold-300 font-bold'
                    : 'border-navy-800 hover:border-navy-700 bg-navy-950/60 text-slate-300'
                }`}
              >
                <Library className="w-4 h-4 text-gold-400 shrink-0" />
                <span>🏛️ দীপ জ্ঞানভাণ্ডার</span>
              </button>

              {AuthService.isAdmin(currentUser) && (
                <>
                  <button
                    onClick={() => {
                      onSelectTab('deep-control-centre');
                      setIsMenuOpen(false);
                    }}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      activeTab === 'deep-control-centre'
                        ? 'border-gold-500 bg-gold-500/20 text-gold-300 font-bold'
                        : 'border-navy-800 hover:border-navy-700 bg-navy-950/60 text-slate-300'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>🕊️ দীপ কন্ট্রোল সেন্টার</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectTab('admin-analytics');
                      setIsMenuOpen(false);
                    }}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      activeTab === 'admin-analytics'
                        ? 'border-gold-500 bg-gold-500/20 text-gold-300 font-bold'
                        : 'border-navy-800 hover:border-navy-700 bg-navy-950/60 text-slate-300'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>📊 Analytics Center</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectTab('admin');
                      setIsMenuOpen(false);
                    }}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      activeTab === 'admin'
                        ? 'border-gold-500 bg-gold-500/20 text-gold-300 font-bold'
                        : 'border-navy-800 hover:border-navy-700 bg-navy-950/60 text-slate-300'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
                    <span>🛡️ ক্যানন ও অডিট</span>
                  </button>
                </>
              )}


              <button
                onClick={() => {
                  onSelectTab('copyright');
                  setIsMenuOpen(false);
                }}
                className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                  activeTab === 'copyright'
                    ? 'border-gold-500 bg-gold-500/20 text-gold-300 font-bold'
                    : 'border-navy-800 hover:border-navy-700 bg-navy-950/60 text-slate-300'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                <span>📜 কপিরাইট নীতি</span>
              </button>

              <button
                onClick={() => {
                  onSelectTab('licenses');
                  setIsMenuOpen(false);
                }}
                className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                  activeTab === 'licenses'
                    ? 'border-gold-500 bg-gold-500/20 text-gold-300 font-bold'
                    : 'border-navy-800 hover:border-navy-700 bg-navy-950/60 text-slate-300'
                }`}
              >
                <BookOpen className="w-4 h-4 text-sky-400 shrink-0" />
                <span>⚖️ লাইসেন্স রেজিস্ট্রি</span>
              </button>

              <button
                onClick={() => {
                  onSelectTab('sources');
                  setIsMenuOpen(false);
                }}
                className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                  activeTab === 'sources'
                    ? 'border-gold-500 bg-gold-500/20 text-gold-300 font-bold'
                    : 'border-navy-800 hover:border-navy-700 bg-navy-950/60 text-slate-300'
                }`}
              >
                <Library className="w-4 h-4 text-amber-400 shrink-0" />
                <span>📚 উৎস ও সাইটেশন</span>
              </button>

              <button
                onClick={() => {
                  onSelectTab('about');
                  setIsMenuOpen(false);
                }}
                className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                  activeTab === 'about'
                    ? 'border-gold-500 bg-gold-500/20 text-gold-300 font-bold'
                    : 'border-navy-800 hover:border-navy-700 bg-navy-950/60 text-slate-300'
                }`}
              >
                <HelpCircle className="w-4 h-4 text-gold-400 shrink-0" />
                <span>ℹ️ পরিচিতি ও সাহায্য</span>
              </button>

              <button
                onClick={() => {
                  onSelectTab('feedback');
                  setIsMenuOpen(false);
                }}
                className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                  activeTab === 'feedback'
                    ? 'border-gold-500 bg-gold-500/20 text-gold-300 font-bold'
                    : 'border-navy-800 hover:border-navy-700 bg-navy-950/60 text-slate-300'
                }`}
              >
                <MessageSquare className="w-4 h-4 text-amber-400 shrink-0" />
                <span>💬 মতামত ও সংশোধন</span>
              </button>

              {/* Official Facebook Page Link in Mobile Menu */}
              <a
                href="https://www.facebook.com/bengalistudybible"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="p-3.5 rounded-2xl border border-[#1877F2]/40 bg-[#1877F2]/15 hover:bg-[#1877F2]/25 text-white flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#1877F2] flex items-center justify-center text-white shrink-0 shadow-sm">
                    <FacebookIcon className="w-4 h-4 fill-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">আমাদের ফেসবুক পেজ</div>
                    <div className="text-[10px] text-slate-300">প্রতিদিনের স্টাডি ও সম্প্রদায় সংযোগ</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
