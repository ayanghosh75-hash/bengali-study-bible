import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav, NavTab } from './components/BottomNav';
import { HomeScreen } from './screens/HomeScreen';
import { BibleReaderScreen } from './screens/BibleReaderScreen';
import { DeepAssistantErrorBoundary } from './components/ErrorBoundary';
const SermonBuilderScreen = React.lazy(() =>
  import('./screens/SermonBuilderScreen').then((m) => ({ default: m.SermonBuilderScreen }))
);
const SavedSermonsScreen = React.lazy(() =>
  import('./screens/SavedSermonsScreen').then((m) => ({ default: m.SavedSermonsScreen }))
);
const SermonEditor = React.lazy(() =>
  import('./components/SermonEditor').then((m) => ({ default: m.SermonEditor }))
);
const MyStudyScreen = React.lazy(() =>
  import('./screens/MyStudyScreen').then((m) => ({ default: m.MyStudyScreen }))
);
const StudyScreen = React.lazy(() =>
  import('./screens/StudyScreen').then((m) => ({ default: m.StudyScreen }))
);
const PastorToolsScreen = React.lazy(() =>
  import('./screens/PastorToolsScreen').then((m) => ({ default: m.PastorToolsScreen }))
);
const ChurchToolsScreen = React.lazy(() =>
  import('./screens/ChurchToolsScreen').then((m) => ({ default: m.ChurchToolsScreen }))
);
const MapsScreen = React.lazy(() =>
  import('./screens/MapsScreen').then((m) => ({ default: m.MapsScreen }))
);
const AdminDashboardScreen = React.lazy(() =>
  import('./screens/AdminDashboardScreen').then((m) => ({ default: m.AdminDashboardScreen }))
);
const AboutHelpScreen = React.lazy(() =>
  import('./screens/AboutHelpScreen').then((m) => ({ default: m.AboutHelpScreen }))
);
const AskBibleScreen = React.lazy(() =>
  import('./screens/AskBibleScreen').then((m) => ({ default: m.AskBibleScreen }))
);
const LibraryScreen = React.lazy(() =>
  import('./screens/LibraryScreen').then((m) => ({ default: m.LibraryScreen }))
);
const CopyrightScreen = React.lazy(() =>
  import('./screens/CopyrightScreen').then((m) => ({ default: m.CopyrightScreen }))
);
const LicensesScreen = React.lazy(() =>
  import('./screens/LicensesScreen').then((m) => ({ default: m.LicensesScreen }))
);
const SourcesDirectoryScreen = React.lazy(() =>
  import('./screens/SourcesDirectoryScreen').then((m) => ({ default: m.SourcesDirectoryScreen }))
);
const CopyrightConcernScreen = React.lazy(() =>
  import('./screens/CopyrightConcernScreen').then((m) => ({ default: m.CopyrightConcernScreen }))
);
const AcademyScreen = React.lazy(() =>
  import('./screens/AcademyScreen').then((m) => ({ default: m.AcademyScreen }))
);
const InstallScreen = React.lazy(() =>
  import('./screens/InstallScreen').then((m) => ({ default: m.InstallScreen }))
);
const UniversalShareScreen = React.lazy(() =>
  import('./screens/UniversalShareScreen').then((m) => ({ default: m.UniversalShareScreen }))
);
const FeedbackScreen = React.lazy(() =>
  import('./screens/FeedbackScreen').then((m) => ({ default: m.FeedbackScreen }))
);
const UpdatesScreen = React.lazy(() =>
  import('./screens/UpdatesScreen').then((m) => ({ default: m.UpdatesScreen }))
);
const AdminAnalyticsScreen = React.lazy(() =>
  import('./screens/admin/AdminAnalyticsScreen').then((m) => ({ default: m.AdminAnalyticsScreen }))
);
const PartnerKitScreen = React.lazy(() =>
  import('./screens/PartnerKitScreen').then((m) => ({ default: m.PartnerKitScreen }))
);
const BetaInviteScreen = React.lazy(() =>
  import('./screens/BetaInviteScreen').then((m) => ({ default: m.BetaInviteScreen }))
);
const NewcomerStartScreen = React.lazy(() =>
  import('./screens/NewcomerStartScreen').then((m) => ({ default: m.NewcomerStartScreen }))
);
const DailyWordPageScreen = React.lazy(() =>
  import('./screens/DailyWordPageScreen').then((m) => ({ default: m.DailyWordPageScreen }))
);
const DeepMinistryControlCentre = React.lazy(() =>
  import('./screens/admin/DeepMinistryControlCentre').then((m) => ({ default: m.DeepMinistryControlCentre }))
);
const DeepKnowledgeBaseScreen = React.lazy(() =>
  import('./screens/DeepKnowledgeBaseScreen').then((m) => ({ default: m.DeepKnowledgeBaseScreen }))
);
import { Footer } from './components/Footer';
import { BookPickerModal } from './components/BookPickerModal';
import { ReaderSettingsModal } from './components/ReaderSettingsModal';
import { SearchModal } from './components/SearchModal';
import { SharePosterModal } from './components/SharePosterModal';
import { InstallBanner } from './components/InstallBanner';
import { InstallModal } from './components/InstallModal';
import { AuthModal } from './components/AuthModal';
import { UserAccountModal } from './components/UserAccountModal';
import { WelcomeModal } from './components/tutorial/WelcomeModal';
import { SpotlightTourOverlay } from './components/tutorial/SpotlightTourOverlay';
import { DevotionChecklistModal } from './components/tutorial/DevotionChecklistModal';
import { DeepReportProblemModal } from './components/common/DeepReportProblemModal';
import { AppUpdatePromptModal } from './components/common/AppUpdatePromptModal';
import { AppUpdateService } from './services/appUpdateService';
import { OfflineIndicator } from './components/OfflineIndicator';
import { StorageService } from './services/storageService';
import { SermonStorageService } from './services/sermonStorageService';
import { AuthService } from './services/authService';
import { TutorialService } from './services/tutorialService';
import { AnalyticsService } from './services/analyticsService';
import { CampaignService } from './services/campaignService';
import { ReaderSettings } from './types/bible';
import { SavedSermon } from './types/sermon';
import { UserProfile } from './types/auth';
import { OnboardingState } from './types/tutorial';
import { usePwa } from './hooks/usePwa';
import { getBookByName, getBookById } from './data/books';

export function App() {
  const pwa = usePwa();
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => AuthService.getCurrentUser());
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [currentBookId, setCurrentBookId] = useState<string>(
    () => StorageService.getLastRead()?.bookId || 'JHN'
  );
  const [currentChapter, setCurrentChapter] = useState<number>(
    () => StorageService.getLastRead()?.chapter || 1
  );
  const [targetVerse, setTargetVerse] = useState<number | undefined>(undefined);

  // Onboarding & Guided Tour State
  const [onboardingState, setOnboardingState] = useState<OnboardingState>(() =>
    TutorialService.getOnboardingState()
  );
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState<boolean>(() => {
    const ob = TutorialService.getOnboardingState();
    return !ob.completed && !ob.tourDismissed;
  });
  const [isDevotionChecklistOpen, setIsDevotionChecklistOpen] = useState(false);

  // Sermon subview state ('builder' | 'saved' | 'editor')
  const [sermonSubView, setSermonSubView] = useState<'builder' | 'saved' | 'editor'>('builder');
  const [editingSermon, setEditingSermon] = useState<SavedSermon | null>(null);
  const [sermonInitialPassage, setSermonInitialPassage] = useState<string>('');

  // Modals state
  const [isBookPickerOpen, setIsBookPickerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // Reader Settings state
  const [settings, setSettings] = useState<ReaderSettings>(() => StorageService.getSettings());

  // Initialize PWA App Update Service (startup, background return, 15-min interval)
  useEffect(() => {
    const updateService = AppUpdateService.getInstance();
    updateService.init();
    return () => {
      updateService.destroy();
    };
  }, []);

  // Apply theme class to document element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'sepia');

    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else if (settings.theme === 'sepia') {
      root.classList.add('sepia');
    }
  }, [settings.theme]);

  // Track app launch once on startup
  useEffect(() => {
    const isStand = typeof window !== 'undefined' && (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    );
    AnalyticsService.trackAppLaunch(isStand ? 'standalone' : 'browser');
  }, []);

  // Track screen page views on navigation
  useEffect(() => {
    AnalyticsService.trackPageView(activeTab);
  }, [activeTab]);

  // Global shortcut (Ctrl+K or /) to open Search / Research Engine
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle URL deep links and UTM parameters from social media and community posts
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const pathname = window.location.pathname;

      // Capture Campaign and Ambassador Referral parameters
      CampaignService.processInboundReferral();

      // Auto-authenticate if master key or passcode provided in query string
      const authKey = urlParams.get('passcode') || urlParams.get('key') || urlParams.get('auth');
      if (authKey && AuthService.verifyAdminPasscode(authKey)) {
        AuthService.grantAdminSession();
        setCurrentUser(AuthService.getCurrentUser());
      }

      // Track public link open and viral share arrival
      AnalyticsService.trackPublicLinkOpen(window.location.pathname);
      const refParam = urlParams.get('ref');
      const utmSource = urlParams.get('utm_source');
      const utmMedium = urlParams.get('utm_medium');
      const contentType = urlParams.get('content_type') || undefined;
      const campaign = urlParams.get('utm_campaign') || undefined;
      if (refParam === 'share' || utmSource === 'share' || utmMedium === 'share' || utmMedium === 'social_share') {
        AnalyticsService.trackSharedLinkOpen({
          channel: utmMedium || 'social_share',
          contentType,
          campaign,
          refCode: refParam || undefined,
        });
      }

      // Check query parameters: book, chapter, verse
      const bookParam = urlParams.get('book');
      const chapterParam = urlParams.get('chapter');
      const verseParam = urlParams.get('verse');
      const tabParam = urlParams.get('tab') as NavTab | null;

      if (tabParam === ('owner-analytics' as any) || tabParam === 'admin-analytics' || tabParam === ('analytics' as any)) {
        setActiveTab('admin-analytics');
        return;
      }
      if (tabParam === 'daily-word' || tabParam === ('daily' as any) || tabParam === ('daily-verse' as any)) {
        setActiveTab('daily-word');
        return;
      }
      if (
        tabParam === 'deep-control-centre' ||
        tabParam === ('deep' as any) ||
        tabParam === ('deep-control' as any) ||
        tabParam === ('admin' as any) ||
        urlParams.has('admin') ||
        urlParams.has('control-centre')
      ) {
        setActiveTab('deep-control-centre');
        return;
      }

      if (bookParam) {
        const found = getBookByName(bookParam) || getBookById(bookParam);
        setCurrentBookId(found ? found.id : bookParam.toUpperCase());
        if (chapterParam) {
          setCurrentChapter(parseInt(chapterParam, 10) || 1);
        }
        if (verseParam) {
          setTargetVerse(parseInt(verseParam, 10));
        }
        setActiveTab('bible');
        return;
      }

      // Check path-based routing (e.g. /bible/JHN/3/16, /bible/matthew/26, /bible/john/3/16)
      const bibleMatch = pathname.match(/\/bible\/([^\/]+)(?:\/(\d+))?(?:\/(\d+))?/i);
      if (bibleMatch) {
        const rawBook = decodeURIComponent(bibleMatch[1]);
        const found = getBookByName(rawBook) || getBookById(rawBook);
        setCurrentBookId(found ? found.id : rawBook.toUpperCase());
        if (bibleMatch[2]) {
          setCurrentChapter(parseInt(bibleMatch[2], 10) || 1);
        }
        if (bibleMatch[3]) {
          setTargetVerse(parseInt(bibleMatch[3], 10));
        }
        setActiveTab('bible');
        return;
      }

      if (tabParam) {
        setActiveTab(tabParam);
      } else if (pathname.includes('/start') || pathname.includes('/begin')) {
        setActiveTab('start');
      } else if (pathname.includes('/partners')) {
        setActiveTab('partners');
      } else if (pathname.includes('/beta')) {
        setActiveTab('beta');
      } else if (pathname.includes('/feedback') || pathname.includes('/support')) {
        setActiveTab('feedback');
      } else if (pathname.includes('/contact')) {
        setActiveTab('contact');
      } else if (pathname.includes('/updates')) {
        setActiveTab('updates');
      } else if (pathname.includes('/privacy')) {
        setActiveTab('privacy');
      } else if (pathname.includes('/terms')) {
        setActiveTab('terms');
      } else if (pathname.includes('/about')) {
        setActiveTab('about');
      } else if (pathname.includes('/copyright-concern')) {
        setActiveTab('copyright-concern');
      } else if (pathname.includes('/copyright')) {
        setActiveTab('copyright');
      } else if (pathname.includes('/licenses')) {
        setActiveTab('licenses');
      } else if (pathname.includes('/sources')) {
        setActiveTab('sources');
      } else if (pathname.includes('/ask-bible')) {
        setActiveTab('ask-bible');
      } else if (pathname.includes('/maps')) {
        setActiveTab('maps');
      } else if (pathname.includes('/library') || pathname.includes('/mystudy')) {
        setActiveTab('mystudy');
      } else if (pathname.includes('/study')) {
        setActiveTab('study');
      } else if (pathname.includes('/sermon')) {
        setActiveTab('sermon');
      } else if (pathname.includes('/tutorial') || pathname.includes('/academy')) {
        setActiveTab('academy');
      } else if (pathname.includes('/install')) {
        setActiveTab('install');
      } else if (pathname.includes('/share')) {
        setActiveTab('share');
      } else if (
        pathname.includes('/daily-word') ||
        pathname.includes('/daily-verse') ||
        pathname.includes('/today')
      ) {
        setActiveTab('daily-word');
      } else if (
        pathname.includes('/admin/deep-control-centre') ||
        pathname.includes('/admin/deep') ||
        pathname.includes('/owner/deep')
      ) {
        setActiveTab('deep-control-centre');
      } else if (
        pathname.includes('/owner/analytics') ||
        pathname.includes('/owner') ||
        pathname.includes('/admin/analytics') ||
        pathname.includes('/analytics')
      ) {
        setActiveTab('admin-analytics');
      } else if (pathname.includes('/admin')) {
        setActiveTab('admin');
      }
    } catch (e) {
      console.error('Deep link navigation error:', e);
    }
  }, []);

  const handleUpdateSettings = (newPartial: Partial<ReaderSettings>) => {
    const updated = StorageService.saveSettings(newPartial);
    setSettings(updated);
  };

  const handleStartTour = () => {
    const updated = TutorialService.startTour();
    setOnboardingState(updated);
    setIsWelcomeModalOpen(false);
  };

  const handleNextTourStep = () => {
    const updated = TutorialService.nextTourStep();
    setOnboardingState(updated);
  };

  const handlePreviousTourStep = () => {
    const updated = TutorialService.previousTourStep();
    setOnboardingState(updated);
  };

  const handleSkipTour = () => {
    const updated = TutorialService.dismissTour();
    setOnboardingState(updated);
  };

  const handleFinishTour = () => {
    const updated = TutorialService.completeTour();
    setOnboardingState(updated);
  };

  const handleReplayTour = () => {
    const updated = TutorialService.resetTour();
    setOnboardingState(updated);
    setIsWelcomeModalOpen(false);
  };

  const handleNavigateToBible = (bookId: string, chapter: number, verse?: number) => {
    AnalyticsService.trackSharedLinkEngagement();
    setCurrentBookId(bookId);
    setCurrentChapter(chapter);
    setTargetVerse(verse);
    setActiveTab('bible');
  };

  const handleBookChapterSelect = (bookId: string, chapter: number) => {
    AnalyticsService.trackSharedLinkEngagement();
    setCurrentBookId(bookId);
    setCurrentChapter(chapter);
    setTargetVerse(undefined);
    setActiveTab('bible');
  };

  const handleTriggerInstall = async () => {
    AnalyticsService.trackSharedLinkInstallSignal();
    const installed = await pwa.installApp();
    if (!installed) {
      setIsInstallModalOpen(true);
    }
  };

  const showInstall = !pwa.isStandalone && !pwa.isInstalled;

  return (
    <div className="min-h-screen flex flex-col bg-parchment-100 text-slate-800 dark:bg-navy-950 dark:text-slate-100 transition-colors duration-200 font-sans">
      {/* Offline & Update Alerts */}
      <OfflineIndicator
        isOffline={pwa.isOffline}
        updateAvailable={pwa.updateAvailable}
        onApplyUpdate={pwa.applyUpdate}
      />

      {/* Top Navigation Bar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenShare={() => setIsShareModalOpen(true)}
        onOpenInstall={handleTriggerInstall}
        onOpenUserAccount={() => setIsAccountModalOpen(true)}
        onSelectTab={setActiveTab}
        currentUser={currentUser}
        showInstallButton={showInstall}
        activeTab={activeTab}
      />

      {/* Public Beta 1.0 Notification & Feedback Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-white text-xs px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-amber-600/40 shadow-sm font-sans">
        <div className="flex items-center gap-2">
          <span className="bg-amber-500/30 text-amber-200 border border-amber-400/40 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px]">
            Public Beta 1.0
          </span>
          <span className="text-amber-100/90 text-xs hidden sm:inline">
            বাংলা স্টাডি বাইবেল সক্রিয় পরিমার্জন ও ক্যানোনিকাল রূপরেখায় উন্মুক্ত।
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('updates')}
            className="text-[11px] text-amber-200 hover:text-white underline underline-offset-2 transition-colors"
          >
            রিলিজ নোটস
          </button>
          <span className="text-amber-400">•</span>
          <button
            onClick={() => setActiveTab('feedback')}
            className="text-[11px] font-semibold bg-white/15 hover:bg-white/25 text-white px-2.5 py-0.5 rounded-md transition-colors shadow-sm"
          >
            💬 মতামত / রিপোর্ট
          </button>
        </div>
      </div>

      {/* Tasteful Mobile Installation Banner */}
      {pwa.isBannerVisible && (
        <InstallBanner
          onInstall={handleTriggerInstall}
          onDismiss={() => pwa.dismissBanner(7)}
        />
      )}

      {/* Main Content View by Active Tab */}
      <main className="flex-1">
        <React.Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[50vh] text-amber-700 dark:text-amber-400">
              <div className="text-center space-y-2">
                <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-xs font-serif font-medium">লোড হচ্ছে...</p>
              </div>
            </div>
          }
        >
        {activeTab === 'home' && (
          <HomeScreen
            onNavigateToSermonBuilder={() => {
              setSermonInitialPassage('যোহন ৩:১৬');
              setSermonSubView('builder');
              setActiveTab('sermon');
            }}
            onNavigateToSavedSermons={() => {
              setSermonSubView('saved');
              setActiveTab('sermon');
            }}
            onNavigateToBible={handleNavigateToBible}
            onNavigateToStudy={() => setActiveTab('study')}
            onNavigateToLibrary={() => setActiveTab('mystudy')}
            onOpenNotes={() => setActiveTab('mystudy')}
            onOpenBookPicker={() => setIsBookPickerOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenInstall={handleTriggerInstall}
            onNavigateToAcademy={() => setActiveTab('academy')}
            onNavigateToPartners={() => setActiveTab('partners')}
            onNavigateToBeta={() => setActiveTab('beta')}
            onOpenDevotionChecklist={() => setIsDevotionChecklistOpen(true)}
            onNavigateToAdminAnalytics={() => setActiveTab('admin-analytics')}
            onNavigateToAdmin={() => setActiveTab('admin')}
            onNavigateToAskBible={() => setActiveTab('ask-bible')}
            onNavigateToStart={() => setActiveTab('start')}
            onNavigateToDailyWord={() => setActiveTab('daily-word')}
            showInstallCard={showInstall}
            useBengaliDigits={settings.bengaliNumerals}
          />
        )}

        {activeTab === 'sermon' && (
          <div>
            {sermonSubView === 'editor' && editingSermon ? (
              <SermonEditor
                initialSermon={editingSermon}
                onSave={(updated) => {
                  SermonStorageService.saveSermon(updated);
                  setEditingSermon(updated);
                }}
                onBack={() => setSermonSubView('saved')}
              />
            ) : sermonSubView === 'saved' ? (
              <SavedSermonsScreen
                onOpenSermon={(s) => {
                  setEditingSermon(s);
                  setSermonSubView('editor');
                }}
                onCreateNewSermon={() => setSermonSubView('builder')}
                onOpenAcademy={() => setActiveTab('academy')}
              />
            ) : (
              <SermonBuilderScreen
                initialPassage={sermonInitialPassage}
                onNavigateToBible={handleNavigateToBible}
                onOpenSavedSermons={() => setSermonSubView('saved')}
              />
            )}
          </div>
        )}

        {activeTab === 'bible' && (
          <BibleReaderScreen
            bookId={currentBookId}
            chapter={currentChapter}
            initialVerse={targetVerse}
            settings={settings}
            onNavigateChapter={(bId, ch, v) => {
              setCurrentBookId(bId);
              setCurrentChapter(ch);
              setTargetVerse(v);
            }}
            onOpenBookPicker={() => setIsBookPickerOpen(true)}
          />
        )}

        {activeTab === 'study' && (
          <StudyScreen
            onNavigateToTopic={handleNavigateToBible}
            useBengaliDigits={settings.bengaliNumerals}
          />
        )}

        {activeTab === 'mystudy' && (
          <MyStudyScreen
            onNavigateToVerse={handleNavigateToBible}
            onOpenSermon={(s) => {
              setEditingSermon(s);
              setSermonSubView('editor');
              setActiveTab('sermon');
            }}
            onCreateSermon={() => {
              setSermonSubView('builder');
              setActiveTab('sermon');
            }}
            onOpenAccountModal={() => setIsAccountModalOpen(true)}
            onOpenAcademy={() => setActiveTab('academy')}
            useBengaliDigits={settings.bengaliNumerals}
          />
        )}

        {activeTab === 'ask-bible' && (
          <DeepAssistantErrorBoundary onNavigateToScripture={handleNavigateToBible}>
            <AskBibleScreen
              onNavigateToScripture={handleNavigateToBible}
              useBengaliDigits={settings.bengaliNumerals}
            />
          </DeepAssistantErrorBoundary>
        )}

        {activeTab === 'pastor-tools' && (
          <PastorToolsScreen />
        )}

        {activeTab === 'church-tools' && (
          <ChurchToolsScreen />
        )}

        {activeTab === 'maps' && (
          <MapsScreen />
        )}

        {activeTab === 'library' && (
          <LibraryScreen
            onNavigateToVerse={handleNavigateToBible}
            useBengaliDigits={settings.bengaliNumerals}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboardScreen />
        )}

        {activeTab === 'admin-analytics' && (
          <AdminAnalyticsScreen onBackToApp={() => setActiveTab('home')} />
        )}

        {activeTab === 'academy' && (
          <AcademyScreen
            onNavigateTab={setActiveTab}
            onNavigateToBible={handleNavigateToBible}
            onOpenTour={handleReplayTour}
            onOpenDevotionChecklist={() => setIsDevotionChecklistOpen(true)}
          />
        )}

        {activeTab === 'about' && (
          <AboutHelpScreen
            initialSubTab="about"
            onNavigateToFeedback={() => setActiveTab('feedback')}
          />
        )}

        {activeTab === 'privacy' && (
          <AboutHelpScreen
            initialSubTab="privacy"
            onNavigateToFeedback={() => setActiveTab('feedback')}
          />
        )}

        {activeTab === 'terms' && (
          <AboutHelpScreen
            initialSubTab="terms"
            onNavigateToFeedback={() => setActiveTab('feedback')}
          />
        )}

        {activeTab === 'contact' && (
          <FeedbackScreen
            initialCategory="TECHNICAL_PROBLEM"
            onNavigate={(tab) => setActiveTab(tab as any)}
          />
        )}

        {activeTab === 'updates' && (
          <UpdatesScreen
            onNavigateToFeedback={() => setActiveTab('feedback')}
            onNavigateToBible={() => setActiveTab('bible')}
            onNavigateToInstall={() => setActiveTab('install')}
          />
        )}

        {activeTab === 'copyright' && (
          <CopyrightScreen
            onNavigateToLicenses={() => setActiveTab('licenses')}
            onNavigateToSources={() => setActiveTab('sources')}
            onNavigateToConcern={() => setActiveTab('copyright-concern')}
          />
        )}

        {activeTab === 'licenses' && (
          <LicensesScreen />
        )}

        {activeTab === 'sources' && (
          <SourcesDirectoryScreen />
        )}

        {activeTab === 'copyright-concern' && (
          <CopyrightConcernScreen onBack={() => setActiveTab('copyright')} />
        )}

        {activeTab === 'install' && (
          <InstallScreen
            onNavigateToBible={() => setActiveTab('bible')}
            onOpenShareModal={() => setIsShareModalOpen(true)}
          />
        )}

        {activeTab === 'share' && (
          <UniversalShareScreen
            onNavigateToInstall={() => setActiveTab('install')}
            onNavigateToBible={() => setActiveTab('bible')}
          />
        )}

        {activeTab === 'feedback' && (
          <FeedbackScreen
            onNavigate={(tab) => setActiveTab(tab as any)}
          />
        )}

        {activeTab === 'partners' && (
          <PartnerKitScreen
            onNavigateToBible={() => setActiveTab('bible')}
            onNavigateToInstall={() => setActiveTab('install')}
            onNavigateToFeedback={() => setActiveTab('feedback')}
          />
        )}

        {activeTab === 'beta' && (
          <BetaInviteScreen
            onNavigateToBible={() => setActiveTab('bible')}
            onNavigateToInstall={() => setActiveTab('install')}
            onNavigateToFeedback={() => setActiveTab('feedback')}
            onNavigateToPartners={() => setActiveTab('partners')}
          />
        )}

        {activeTab === 'start' && (
          <NewcomerStartScreen
            onNavigateToBible={handleNavigateToBible}
            onNavigateToStudy={() => setActiveTab('study')}
            onNavigateToSearch={() => setIsSearchOpen(true)}
            onNavigateToInstall={handleTriggerInstall}
          />
        )}

        {activeTab === 'daily-word' && (
          <DailyWordPageScreen
            onNavigateToBible={handleNavigateToBible}
          />
        )}

        {activeTab === 'deep-control-centre' && (
          <DeepMinistryControlCentre
            onBackToApp={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'knowledge-base' && (
          <DeepKnowledgeBaseScreen
            onNavigateToBible={handleNavigateToBible}
          />
        )}
        </React.Suspense>
      </main>

      {/* Global Brand, Rights & Attribution Footer */}
      <Footer onSelectTab={setActiveTab} />

      {/* Bottom Sticky Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Modals & Drawers */}
      <BookPickerModal
        isOpen={isBookPickerOpen}
        onClose={() => setIsBookPickerOpen(false)}
        selectedBookId={currentBookId}
        selectedChapter={currentChapter}
        onSelect={handleBookChapterSelect}
        useBengaliDigits={settings.bengaliNumerals}
      />

      <ReaderSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onReplayTour={handleReplayTour}
        onOpenAcademy={() => {
          setIsSettingsOpen(false);
          setActiveTab('academy');
        }}
        onOpenDevotionChecklist={() => {
          setIsSettingsOpen(false);
          setIsDevotionChecklistOpen(true);
        }}
        onOpenUpdatePrompt={() => setIsUpdateModalOpen(true)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={(bId, ch, v) => handleNavigateToBible(bId, ch, v)}
        useBengaliDigits={settings.bengaliNumerals}
      />

      {/* User Authentication & Account Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(u) => {
          setCurrentUser(u);
          setIsAuthModalOpen(false);
        }}
      />

      <UserAccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        onOpenAuth={() => {
          setIsAccountModalOpen(false);
          setIsAuthModalOpen(true);
        }}
        onProfileUpdated={(u) => setCurrentUser(u)}
      />

      {/* WhatsApp Poster & QR Code Modal */}
      <SharePosterModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onOpenInstall={handleTriggerInstall}
        showInstallButton={showInstall}
      />

      {/* Step-by-Step Install Guide Modal for Android & iOS */}
      <InstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        defaultTab={pwa.isIOS ? 'ios' : 'android'}
      />

      {/* 1. Welcome & Persona Selection Modal on First Visit */}
      <WelcomeModal
        isOpen={isWelcomeModalOpen}
        onClose={() => setIsWelcomeModalOpen(false)}
        onStartTour={handleStartTour}
        onOpenBible={handleNavigateToBible}
        onOpenAcademy={() => {
          setIsWelcomeModalOpen(false);
          setActiveTab('academy');
        }}
        onOpenLicenses={() => {
          setIsWelcomeModalOpen(false);
          setActiveTab('licenses' as any);
        }}
      />

      {/* 2. Interactive 12-Step Spotlight Guided Tour Overlay */}
      <SpotlightTourOverlay
        isOpen={onboardingState.isTourActive}
        currentStepIndex={onboardingState.currentTourStepIndex}
        onNext={handleNextTourStep}
        onPrevious={handlePreviousTourStep}
        onSkip={handleSkipTour}
        onFinish={handleFinishTour}
        onSwitchTab={setActiveTab}
        activeTab={activeTab}
      />

      {/* 3. 15-Minute Daily Devotion & 30-Minute Study Checklist */}
      <DevotionChecklistModal
        isOpen={isDevotionChecklistOpen}
        onClose={() => setIsDevotionChecklistOpen(false)}
        onOpenBible={handleNavigateToBible}
      />

      {/* 4. Deep Autonomous Steward Problem Reporting Button & Modal */}
      <DeepReportProblemModal showFloatingTrigger={true} />

      {/* 5. PWA Installed-User App Update Prompt Modal */}
      <AppUpdatePromptModal
        forceOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
      />
    </div>
  );
}

export default App;
