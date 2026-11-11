// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// PRIVATE USER, INSTALLATION & ENGAGEMENT ANALYTICS TYPES
// Founder, Owner & Developer: Rev. Ayan Kumar Ghosh
// Admin Email: ayanghosh75@gmail.com
// Tagline: পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
// ============================================================

export type AnalyticsEventType =
  // PWA & Installation Tracking
  | 'INSTALL_PAGE_VIEW'
  | 'INSTALL_BUTTON_CLICK'
  | 'INSTALL_PROMPT_SHOWN'
  | 'INSTALL_PROMPT_ACCEPTED'
  | 'APPINSTALLED_EVENT'
  | 'IOS_INSTALL_INSTRUCTIONS_VIEWED'
  | 'STANDALONE_PWA_LAUNCH'
  | 'WEB_BROWSER_LAUNCH'

  // Session & Engagement Tracking
  | 'SESSION_START'
  | 'SESSION_ENGAGED'
  | 'SESSION_HEARTBEAT'
  | 'SESSION_END'

  // Bible Engagement
  | 'BIBLE_OPEN'
  | 'CHAPTER_READ'
  | 'VERSE_INTERACT'
  | 'SEARCH_TO_BIBLE_OPEN'
  | 'BOOKMARK_CREATED'
  | 'HIGHLIGHT_CREATED'
  | 'NOTE_CREATED'

  // Search Engine
  | 'SEARCH_QUERY'

  // Study Tools
  | 'STUDY_PAGE_OPEN'
  | 'TOPIC_STUDY_OPEN'
  | 'CHARACTER_STUDY_OPEN'
  | 'CROSS_REF_CLICK'
  | 'WORD_STUDY_OPEN'

  // Sermon Builder
  | 'SERMON_BUILDER_OPEN'
  | 'SERMON_GENERATE_START'
  | 'SERMON_GENERATE_COMPLETE'
  | 'SERMON_SAVED'
  | 'SERMON_EXPORTED'

  // Ask Bible
  | 'ASK_BIBLE_OPEN'
  | 'ASK_BIBLE_QUESTION'
  | 'ASK_BIBLE_ANSWER_SUCCESS'
  | 'ASK_BIBLE_ANSWER_FAIL'

  // Devotion & Academy
  | 'DEVOTION_OPEN'
  | 'DEVOTION_COMPLETE'
  | 'TUTORIAL_START'
  | 'TUTORIAL_COMPLETE'
  | 'TUTORIAL_SKIP'
  | 'TUTORIAL_REPLAY'

  // Social, Sharing & Feedback
  | 'SHARE_CLICK'
  | 'SHARE_BUTTON_CLICK'
  | 'SHARE_INITIATED'
  | 'SHARE_COMPLETED'
  | 'SHARE_COPY_LINK'
  | 'SHARE_WHATSAPP'
  | 'SHARE_FACEBOOK'
  | 'SHARE_MESSENGER'
  | 'SHARE_EMAIL'
  | 'SHARE_OTHER'
  | 'SHARED_LINK_OPEN'
  | 'SHARED_LINK_ENGAGED'
  | 'SHARED_LINK_INSTALL_SIGNAL'
  | 'PUBLIC_LINK_OPEN'
  | 'FEEDBACK_SUBMIT'
  | 'QR_PAGE_VIEW'
  | 'CAMPAIGN_ATTRIBUTION'

  // System Health & Incident Tracking
  | 'SYSTEM_ERROR';

export type DeviceCategory = 'mobile' | 'tablet' | 'desktop';
export type PlatformCategory = 'Android' | 'iOS' | 'Windows' | 'macOS' | 'Other';
export type DisplayMode = 'standalone' | 'browser';
export type ReferrerCategory =
  | 'direct'
  | 'whatsapp'
  | 'facebook'
  | 'messenger'
  | 'email'
  | 'qr'
  | 'search_engine'
  | 'church_partner'
  | 'youtube'
  | 'ambassador'
  | 'other';

export type ShareContentType =
  | 'entire_app'
  | 'bible_verse'
  | 'bible_chapter'
  | 'study_material'
  | 'sermon_outline'
  | 'devotional'
  | 'other';

export interface AnalyticsEvent {
  id: string;
  eventName: AnalyticsEventType;
  timestamp: string; // ISO 8601 string
  timestampMs: number;
  dateKey: string; // YYYY-MM-DD
  anonymousSessionId: string; // Ephemeral rotating privacy-safe hash
  userId?: string; // Only if authenticated user profile
  isRegistered: boolean;
  appVersion: string;
  route: string;
  module: 'bible' | 'study' | 'sermon' | 'pwa' | 'search' | 'tutorial' | 'feedback' | 'devotion' | 'ask_bible' | 'system';
  deviceCategory: DeviceCategory;
  platformCategory: PlatformCategory;
  displayMode: DisplayMode;
  referrerCategory: ReferrerCategory;
  campaign?: string; // from utm_campaign
  utmSource?: string;
  utmMedium?: string;
  referralCode?: string; // from ?ref= or ?ambassador=
  resourceType?: string; // e.g. 'book', 'chapter', 'verse', 'duration', 'audience', 'error_type'
  resourceId?: string; // e.g. 'JHN', 'JHN.3', '30', 'sunday_congregation'
  metadata?: Record<string, string | number | boolean>;
  isTest: boolean;
  environment: 'production' | 'development';
}

export type TimeFilterRange =
  | 'today'
  | 'yesterday'
  | '7days'
  | '30days'
  | '90days'
  | 'year'
  | 'all'
  | 'custom';

export interface DateRangeFilter {
  type: TimeFilterRange;
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  labelBn: string;
}

export interface PwaInstallFunnelMetrics {
  installPageViews: number;
  installButtonClicks: number; // Install Intent
  installPromptsShown: number;
  installPromptsAccepted: number; // Confirmed prompt accepts
  appinstalledEvents: number; // Confirmed OS installs
  iosInstructionsViews: number;
  standalonePwaLaunches: number; // Observed Standalone PWA users
  webBrowserLaunches: number; // Regular browser users
}

export interface BibleUsageMetrics {
  totalBibleOpens: number;
  chaptersReadCount: number;
  verseInteractionsCount: number;
  searchToBibleOpens: number;
  bookmarksCreated: number;
  highlightsCreated: number;
  notesCreated: number;
  mostReadBooks: Array<{ bookId: string; bookNameBn: string; reads: number }>;
  mostReadChapters: Array<{ refBn: string; bookId: string; chapter: number; reads: number }>;
  popularVerses: Array<{ refBn: string; count: number }>;
}

export interface BookPopularityItem {
  bookId: string;
  bookNumber: number;
  nameBn: string;
  nameEn: string;
  testament: 'OT' | 'NT';
  chaptersCount: number;
  opens: number;
  chapterReads: number;
  engagedSessions: number;
  rank: number;
}

export interface SermonAnalyticsMetrics {
  builderOpens: number;
  generationsStarted: number;
  generationsCompleted: number;
  sermonsSaved: number;
  sermonsExported: number;
  durationsBreakdown: Record<string, number>;
  audienceBreakdown: Record<string, number>;
  popularBooksForSermon: Array<{ bookId: string; bookNameBn: string; count: number }>;
}

export interface AskBibleMetrics {
  opens: number;
  questionsSubmitted: number;
  successfulAnswers: number;
  failedAnswers: number;
  sourceRetrievalFailures: number;
  avgResponseTimeMs: number;
  topCategories: Array<{ category: string; count: number }>;
}

export interface StudyAnalyticsMetrics {
  studyPagesOpened: number;
  topicStudiesOpened: number;
  characterStudiesOpened: number;
  crossRefsFollowed: number;
  wordStudiesOpened: number;
  popularTopics: Array<{ topicId: string; titleBn: string; count: number }>;
  popularCharacters: Array<{ characterId: string; nameBn: string; count: number }>;
}

export interface FeedbackAnalyticsMetrics {
  totalReceived: number;
  suggestions: number;
  corrections: number;
  technicalProblems: number;
  featureRequests: number;
  ministryRequests: number;
  userReviews: number;
  resolvedCount: number;
  pendingCount: number;
  topRequestedFeatures: Array<{ subject: string; count: number }>;
  topReportedProblems: Array<{ module: string; count: number }>;
}

export interface TrafficReferralMetrics {
  direct: number;
  whatsapp: number;
  facebook: number;
  qr: number;
  searchEngine: number;
  churchPartner: number;
  ambassador: number;
  otherReferral: number;
  campaigns: Array<{ campaign: string; source: string; visits: number }>;
}

export interface GlobalReachRegion {
  regionCode: string;
  regionNameBn: string;
  regionNameEn: string;
  activeUsers: number;
  newUsers: number;
  returningUsers: number;
  percentage: number;
}

export interface RetentionMetrics {
  nextDayReturnRate: number | null; // e.g. 35 = 35%
  day7ReturnRate: number | null;
  day30ReturnRate: number | null;
  hasSufficientData: boolean;
  explanationBn: string;
  cohorts?: Array<{
    firstSeenDate: string;
    cohortSize: number;
    day1Rate: number | null;
    day7Rate: number | null;
    day30Rate: number | null;
  }>;
}

export interface EngagementTimeMetrics {
  averageDurationSeconds: number;
  medianDurationSeconds: number;
  totalEngagementSeconds: number;
  averageEngagedPerActiveUserSeconds: number;
  timeBuckets: {
    under1Min: number;
    oneTo5Mins: number;
    fiveTo15Mins: number;
    fifteenTo30Mins: number;
    thirtyTo60Mins: number;
    sixtyPlusMins: number;
  };
}

export interface SessionFrequencyMetrics {
  totalSessions: number;
  sessionsToday: number;
  avgSessionsPerUser: number;
  avgSessionsPerReturningUser: number;
  distribution: {
    oneSession: number;
    twoToThree: number;
    fourToTen: number;
    tenPlus: number;
  };
}

export interface HourlyActivityMetrics {
  byHour: number[]; // 24 items (hour 0-23)
  peakHour: number;
  byDaypart: {
    morning: number; // 06:00 - 12:00
    afternoon: number; // 12:00 - 17:00
    evening: number; // 17:00 - 21:00
    night: number; // 21:00 - 06:00
  };
}

export interface UserJourneyFunnelMetrics {
  appOpen: number;
  bibleOrStudyOpen: number;
  meaningfulEngagement: number;
  returnVisit: number;
  installOrStandalone: number;
  shareOrFeedback: number;
  conversionRates: {
    openToContent: number;
    contentToEngaged: number;
    engagedToReturn: number;
    returnToInstall: number;
    installToShare: number;
  };
}

export interface SystemHealthMetrics {
  errorsToday: number;
  bibleReaderErrors: number;
  searchErrors: number;
  apiErrors: number;
  pwaErrors: number;
  emailFailures: number;
  openIncidents: number;
  resolvedIncidents: number;
}

export interface RealtimePulseMetrics {
  activeSessionsLast15m: number;
  activeSessionsLast30m: number;
  activeModules: {
    bibleReading: number;
    studyTools: number;
    sermonBuilder: number;
    searchEngine: number;
    other: number;
  };
}

export interface PeriodComparisonItem {
  users: number;
  sessions: number;
  engagedSeconds: number;
  bibleReads: number;
  searches: number;
  studySessions: number;
  sermonUsage: number;
  installs: number;
}

export interface ComparisonMetrics {
  period: 'todayVsYesterday' | 'weekVsLastWeek' | 'monthVsLastMonth';
  current: PeriodComparisonItem;
  previous: PeriodComparisonItem;
  percentChange: {
    users: number;
    sessions: number;
    engagedSeconds: number;
    bibleReads: number;
    searches: number;
    studySessions: number;
    sermonUsage: number;
    installs: number;
  };
}

export interface DailyActiveDataPoint {
  dateKey: string; // YYYY-MM-DD
  displayDateBn: string;
  dau: number;
  newUsers: number;
  returningUsers: number;
  bibleOpens: number;
  searches: number;
}

export interface AnalyticsSummaryReport {
  generatedAt: string;
  filterRange: TimeFilterRange;
  startDate: string;
  endDate: string;
  environment: 'production' | 'development' | 'all';

  // Top summary KPI cards ("TODAY AT A GLANCE")
  totalUsers: number; // Unique privacy-safe sessions
  activeUsers: number; // Meaningful action users
  newUsers: number; // First observed in range
  returningUsers: number; // Returning from earlier
  returningUserPercentage: number;
  todayUsers: number;
  last7DaysUsers: number;
  last30DaysUsers: number;
  usersRecentlyActive: number; // Last 15-30 mins

  // Standard DAU, WAU, MAU
  dauCurrent: number;
  wauCurrent: number;
  mauCurrent: number;

  // Engaged duration metrics
  engagementTime: EngagementTimeMetrics;

  // Session frequency & distribution
  sessionMetrics: SessionFrequencyMetrics;

  // Hourly distribution & dayparts
  hourlyActivity: HourlyActivityMetrics;

  // PWA & Installation
  pwaFunnel: PwaInstallFunnelMetrics;
  observedPwaInstalls: number; // appinstalled + prompt accepted
  standaloneUsersCount: number;
  webUsersCount: number;

  // Platform & Mode
  platformDistribution: {
    android: number;
    ios: number;
    windows: number;
    macOS: number;
    other: number;
  };
  modeDistribution: {
    standalone: number;
    mobileBrowser: number;
    desktopBrowser: number;
  };

  // Retention & Cohorts
  retention: RetentionMetrics;

  // User Journey Funnel
  journeyFunnel: UserJourneyFunnelMetrics;

  // Bible Usage & 66 Books
  bibleUsage: BibleUsageMetrics;
  bookPopularity: BookPopularityItem[];

  // Search Engine
  searchPopularTerms: Array<{ term: string; count: number }>;
  searchStats: {
    totalSearches: number;
    successfulSearches: number;
    noResultSearches: number;
    commonCategories: Array<{ category: string; count: number }>;
  };

  // Study Tools & Sermon Builder
  studyMetrics: StudyAnalyticsMetrics;
  sermonMetrics: SermonAnalyticsMetrics;
  askBibleMetrics: AskBibleMetrics;

  // Academy & Sharing
  devotionMetrics: { opens: number; completions: number };
  tutorialMetrics: { starts: number; completions: number; skips: number; replays: number };

  // Feedback & Health
  feedbackMetrics: FeedbackAnalyticsMetrics;
  healthMetrics: SystemHealthMetrics;

  // Traffic, Campaigns & Global Reach
  trafficMetrics: TrafficReferralMetrics;
  globalReach: {
    totalCountriesOrRegions: number;
    regions: GlobalReachRegion[];
  };

  // Real-time Pulse
  realtimePulse: RealtimePulseMetrics;

  // Period comparison
  comparison: ComparisonMetrics;

  // Activity trend (chart data)
  dailyActivityTrend: DailyActiveDataPoint[];

  // Installs, Links & Shares Master Section
  installLinkShare: InstallLinkShareMetrics;
}

export interface InstallLinkShareMetrics {
  // 11 Summary Cards
  observedMobileInstalls: number; // 1. Observed Mobile/PWA Installs
  probableInstalledUsers: number; // 2. Probable Installed Users
  activeInstalledUsers: number; // 3. Active Installed-App Users
  totalPublicLinkOpens: number; // 4. Total Public-Link Opens
  uniqueLinkVisitors: number; // 5. Privacy-Safe Unique Link Visitors
  returningLinkVisitors: number; // 6. Returning Link Visitors
  totalShareActions: number; // 7. Total Share Actions
  successfulSharesDetectable: number; // 8. Successful Shares Where Detectable
  sharedLinkOpens: number; // 9. Shared-Link Opens
  visitorsAcquiredThroughShares: number; // 10. Visitors Acquired Through Shares
  installSignalsFollowingSharedVisits: number; // 11. Install Signals Following Shared-Link Visits

  // Mobile/PWA install tracking
  installButtonClicks: number;
  installPromptsShown: number;
  installPromptsAccepted: number;
  appinstalledEvents: number;
  standaloneLaunches: number;
  activeStandaloneUsers: number;
  returningStandaloneUsers: number;
  iosInstructionViews: number;
  probableIosInstalls: number;
  deviceBreakdown: {
    android: number;
    ios: number;
    windows: number;
    macOS: number;
    other: number;
  };

  // Public-link access tracking
  newLinkVisitors: number;
  totalSessions: number;
  engagedSessions: number;
  avgEngagedTimeSeconds: number;
  linkVisitorToInstallConversion: number; // Percentage
  sources: {
    direct: number;
    whatsapp: number;
    facebook: number;
    messenger: number;
    email: number;
    qrCode: number;
    googleSearch: number;
    churchPartner: number;
    youtube: number;
    otherReferral: number;
  };
  utmStats: {
    sources: Record<string, number>;
    mediums: Record<string, number>;
    campaigns: Record<string, number>;
    contents: Record<string, number>;
  };

  // Share tracking
  shareClicks: number;
  shareInitiated: number;
  nativeShareCompleted: number;
  copyLinkActions: number;
  whatsappShareClicks: number;
  facebookShareClicks: number;
  messengerShareClicks: number;
  emailShareClicks: number;
  otherShareClicks: number;

  sharingByContent: {
    entireApp: number;
    bibleVerse: number;
    bibleChapter: number;
    studyMaterial: number;
    sermonOutline: number;
    devotional: number;
    otherContent: number;
  };

  // Visits produced by sharing
  sharedLinkUniqueVisitors: number;
  newUsersAcquiredThroughShare: number;
  returningUsersThroughShare: number;
  meaningfulEngagementAfterShare: number;
  installSignalsAfterShare: number;

  // Sharing funnel
  funnel: {
    shareActions: number; // Stage 1
    trackableSharedLinks: number; // Stage 2
    sharedLinkVisitors: number; // Stage 3
    meaningfulEngagement: number; // Stage 4
    returnVisits: number; // Stage 5
    observedOrProbableInstalls: number; // Stage 6
    conversionRates: {
      actionToLinkRate: number | null; // Stage 1 -> 2
      linkToVisitorRate: number | null; // Stage 2 -> 3
      visitorToEngagedRate: number | null; // Stage 3 -> 4
      engagedToReturnRate: number | null; // Stage 4 -> 5
      visitorToInstallRate: number | null; // Stage 3 -> 6
    };
  };

  // Time Comparisons
  comparisons: {
    todayVsYesterday: {
      currentInstalls: number;
      prevInstalls: number;
      currentShares: number;
      prevShares: number;
      currentLinkOpens: number;
      prevLinkOpens: number;
    };
    weekVsLastWeek: {
      currentInstalls: number;
      prevInstalls: number;
      currentShares: number;
      prevShares: number;
      currentLinkOpens: number;
      prevLinkOpens: number;
    };
    monthVsLastMonth: {
      currentInstalls: number;
      prevInstalls: number;
      currentShares: number;
      prevShares: number;
      currentLinkOpens: number;
      prevLinkOpens: number;
    };
  };
}

export interface WeeklyEmailSummaryPayload {
  to: string;
  subject: string;
  reportDate: string;
  periodLabel: string;
  metrics: {
    totalUsers: number;
    activeUsers: number;
    newUsers: number;
    returningUsers: number;
    observedPwaInstalls: number;
    chaptersRead: number;
    searchesConducted: number;
    sermonsGenerated: number;
    feedbackCount: number;
    topBook: string;
    topSearchQuery: string;
  };
  htmlBody: string;
  textBody: string;
}
