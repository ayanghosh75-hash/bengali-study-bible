import React from 'react';
import { Home, BookOpen, GraduationCap, Sparkles, BookmarkCheck } from 'lucide-react';

export type NavTab =
  | 'home'
  | 'bible'
  | 'sermon'
  | 'study'
  | 'mystudy'
  | 'ask-bible'
  | 'pastor-tools'
  | 'church-tools'
  | 'maps'
  | 'library'
  | 'admin'
  | 'about'
  | 'privacy'
  | 'terms'
  | 'contact'
  | 'updates'
  | 'copyright'
  | 'licenses'
  | 'sources'
  | 'copyright-concern'
  | 'academy'
  | 'install'
  | 'share'
  | 'feedback'
  | 'admin-analytics'
  | 'partners'
  | 'beta'
  | 'start'
  | 'daily-word'
  | 'deep-control-centre'
  | 'knowledge-base';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home' as NavTab, label: 'হোম', enLabel: 'Home', icon: Home },
    { id: 'bible' as NavTab, label: 'বাইবেল', enLabel: 'Bible', icon: BookOpen },
    { id: 'sermon' as NavTab, label: 'সার্মন', enLabel: 'Sermon', icon: Sparkles },
    { id: 'study' as NavTab, label: 'অধ্যয়ন', enLabel: 'Study', icon: GraduationCap },
    { id: 'mystudy' as NavTab, label: 'আমার স্টাডি', enLabel: 'My Study', icon: BookmarkCheck },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-navy-950/95 backdrop-blur-lg border-t border-navy-800/80 shadow-2xl pb-safe">
      <div className="max-w-lg mx-auto flex items-center justify-around h-16 px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={tab.id === 'mystudy' ? 'tour-my-study-tab' : undefined}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center h-full py-1 transition-all duration-200 relative group ${
                isActive ? 'text-gold-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {/* Active Pill Indicator */}
              {isActive && (
                <span className="absolute top-0 w-8 h-0.5 bg-gradient-to-r from-gold-400 to-gold-500 rounded-full shadow-sm shadow-gold-500/50" />
              )}
              <div
                className={`p-1 rounded-xl transition-transform duration-200 ${
                  isActive ? 'scale-110' : 'group-hover:scale-105'
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? 'stroke-[2.5] text-gold-400' : 'stroke-[1.8]'
                  }`}
                />
              </div>
              <span
                className={`text-[11px] font-medium tracking-tight mt-0.5 truncate max-w-[68px] ${
                  isActive ? 'font-semibold text-gold-400' : 'text-slate-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
