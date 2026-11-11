// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// PRIVATE OWNER-ONLY DASHBOARD: “দীপ Ministry Control Centre”
// System Identity: “দীপ — আপনার বাইবেল অধ্যয়ন সহায়ক”
// Scripture Motto: গীতসংহিতা ১১৯:১০৫
// Administrator & Approver: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)
// ============================================================

import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Flame,
  Radio,
  Users,
  Send,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Sliders,
  PauseCircle,
  PlayCircle,
  Lock,
  MessageSquare,
  Share2,
  Copy,
  Download,
  Trash2,
  Calendar,
  Clock,
  Sparkles,
  ArrowLeft,
  Eye,
  Edit3,
  X,
  AlertCircle,
  Check,
  Power,
  Globe2,
  BookOpen,
  Smartphone,
  Mail,
  TrendingUp,
  FileText,
  Music,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  ExternalLink,
  Library,
  QrCode,
  Link2,
  Terminal,
} from 'lucide-react';
import { AdminSecurityGate } from '../../components/admin/AdminSecurityGate';
import { DeepSiteStewardDashboard } from '../../components/admin/DeepSiteStewardDashboard';
import { DeepKnowledgeBaseControlPanel } from '../../components/admin/DeepKnowledgeBaseControlPanel';
import { DeepBibleIntegrityMonitor } from '../../components/admin/DeepBibleIntegrityMonitor';
import { DeepPermanentLinkQrCentre } from '../../components/admin/DeepPermanentLinkQrCentre';
import { DeepPublicAccessMonitor } from '../../components/admin/DeepPublicAccessMonitor';
import { DeepStudyBibleHealthMonitor } from '../../components/admin/DeepStudyBibleHealthMonitor';
import { DeepEmergencyRecoveryConsoleTab } from '../../components/admin/DeepEmergencyRecoveryConsoleTab';
import { DeepCommandCentreTab } from '../../components/admin/DeepCommandCentreTab';
import { DeepMonitoringBridgeTab } from '../../components/admin/DeepMonitoringBridgeTab';
import {
  DeepDailyWordService,
  DeepSystemConfig,
} from '../../services/deepDailyWordService';
import {
  DeepTutorialAudioService,
  AudioEngineState,
} from '../../services/deepTutorialAudioService';
import { TutorialTrackRecord } from '../../types/deepTutorialMusic';
import {
  DeepScriptureEngine,
  DEEP_ASSISTANT_NAME,
  OFFICIAL_APPROVER,
  CANONICAL_SITE_URL,
} from '../../data/deepScriptureEngine';
import {
  DeepOutreachService,
  OFFICIAL_PERMISSION_REQUEST_TEMPLATE,
} from '../../services/deepOutreachService';
import {
  DeepDailyWord,
  DeepSubscriber,
  DeepDeliveryLog,
  DeepAuditLog,
  DeepSystemHealth,
  AutonomyMode,
  PassageCategory,
  OutreachCommunity,
  DeliveryChannel,
} from '../../types/deepDailyWord';

interface DeepMinistryControlCentreProps {
  onBackToApp?: () => void;
}

type ControlCentreTab =
  | 'deep_monitoring'
  | 'emergency_recovery'
  | 'command_centre'
  | 'health_autopilot'
  | 'status'
  | 'public_access_monitor'
  | 'permanent_link_qr'
  | 'bible_integrity'
  | 'site_steward'
  | 'knowledge_base'
  | 'daily_word'
  | 'subscribers'
  | 'delivery'
  | 'outreach'
  | 'analytics'
  | 'audit'
  | 'emergency'
  | 'tutorial_music';

export const DeepMinistryControlCentre: React.FC<DeepMinistryControlCentreProps> = ({
  onBackToApp,
}) => {
  const [activeTab, setActiveTab] = useState<ControlCentreTab>('deep_monitoring');
  const [selectedDate, setSelectedDate] = useState<string>(() => new Date().toISOString().split('T')[0]);

  // Live state
  const [config, setConfig] = useState<DeepSystemConfig>(() => DeepDailyWordService.getConfig());
  const [health, setHealth] = useState<DeepSystemHealth>(() => DeepDailyWordService.getSystemHealth());
  const [dailyWord, setDailyWord] = useState<DeepDailyWord>(() => DeepDailyWordService.getDailyWordForDate(selectedDate));
  const [subscribers, setSubscribers] = useState<DeepSubscriber[]>(() => DeepDailyWordService.getAllSubscribers());
  const [logs, setLogs] = useState<DeepDeliveryLog[]>(() => DeepDailyWordService.getAllDeliveryLogs());
  const [auditLogs, setAuditLogs] = useState<DeepAuditLog[]>(() => DeepDailyWordService.getAllAuditLogs());
  const [communities, setCommunities] = useState<OutreachCommunity[]>(() => DeepOutreachService.getAllCommunities());

  // Tutorial Music State
  const [tutorialTracks, setTutorialTracks] = useState<TutorialTrackRecord[]>(() => DeepTutorialAudioService.getAllTracks());
  const [tutorialAudioState, setTutorialAudioState] = useState<AudioEngineState>(() => DeepTutorialAudioService.getState());
  const [isMusicDisabled, setIsMusicDisabled] = useState<boolean>(() => DeepTutorialAudioService.isMusicGloballyDisabled());
  const [previewTrackId, setPreviewTrackId] = useState<string | null>(null);

  // UI state
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [editingDailyWord, setEditingDailyWord] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<Partial<DeepDailyWord>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [channelFilter, setChannelFilter] = useState<string>('ALL');

  useEffect(() => {
    const unsub = DeepTutorialAudioService.subscribe((state) => {
      setTutorialAudioState(state);
      setTutorialTracks(DeepTutorialAudioService.getAllTracks());
      setIsMusicDisabled(DeepTutorialAudioService.isMusicGloballyDisabled());
    });
    return () => {
      unsub();
      DeepTutorialAudioService.stop();
    };
  }, []);

  const handleApproveTutorialTrack = (trackId: string) => {
    const approved = DeepTutorialAudioService.approveTrack(trackId, OFFICIAL_APPROVER);
    setTutorialTracks(DeepTutorialAudioService.getAllTracks());
    setNotification({
      type: 'success',
      text: `"${approved?.titleBn}" সফলভাবে অনুমোদিত হয়েছে এবং লাইভ টিউটোরিয়াল পরিচিতিতে সক্রিয় করা হয়েছে।`,
    });
  };

  const handleRejectTutorialTrack = (trackId: string) => {
    DeepTutorialAudioService.rejectTrack(trackId, 'প্রশাসনিক পর্যালোচনায় বাতিল করা হয়েছে।');
    setTutorialTracks(DeepTutorialAudioService.getAllTracks());
    setNotification({
      type: 'info',
      text: 'ট্র্যাকটি প্রত্যাখ্যাত তালিকায় স্থানান্তরিত হয়েছে।',
    });
  };

  const handleToggleMusicDisabled = () => {
    const newDisabled = !isMusicDisabled;
    DeepTutorialAudioService.setMusicGloballyDisabled(newDisabled);
    setIsMusicDisabled(newDisabled);
    setNotification({
      type: newDisabled ? 'info' : 'success',
      text: newDisabled
        ? 'টিউটোরিয়াল পরিচিতি সঙ্গীত সম্পূর্ণ বন্ধ করা হয়েছে। সকল নতুন ভিজিটর নিঃশব্দে পরিচিতি দেখবেন।'
        : 'টিউটোরিয়াল পরিচিতি সঙ্গীত পুনরায় সক্রিয় করা হয়েছে।',
    });
  };

  const handlePlayPreview = (trackId: string) => {
    if (tutorialAudioState.isPlaying && previewTrackId === trackId) {
      DeepTutorialAudioService.pause();
    } else {
      setPreviewTrackId(trackId);
      DeepTutorialAudioService.playIntroMusic(trackId, true);
    }
  };

  const refreshAll = () => {
    setIsRefreshing(true);
    try {
      setConfig(DeepDailyWordService.getConfig());
      setHealth(DeepDailyWordService.getSystemHealth());
      setDailyWord(DeepDailyWordService.getDailyWordForDate(selectedDate));
      setSubscribers(DeepDailyWordService.getAllSubscribers());
      setLogs(DeepDailyWordService.getAllDeliveryLogs());
      setAuditLogs(DeepDailyWordService.getAllAuditLogs());
      setCommunities(DeepOutreachService.getAllCommunities());
      setTutorialTracks(DeepTutorialAudioService.getAllTracks());
      setIsMusicDisabled(DeepTutorialAudioService.isMusicGloballyDisabled());
    } finally {
      setTimeout(() => setIsRefreshing(false), 300);
    }
  };

  useEffect(() => {
    setDailyWord(DeepDailyWordService.getDailyWordForDate(selectedDate));
  }, [selectedDate]);

  const showNotice = (type: 'success' | 'error' | 'info', text: string) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    showNotice('info', `ক্লিপবোর্ডে কপি করা হয়েছে: ${label}`);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Actions
  const handleApproveToday = () => {
    try {
      const approved = DeepDailyWordService.approveDailyWord(selectedDate, OFFICIAL_APPROVER);
      setDailyWord(approved);
      refreshAll();
      showNotice('success', `আজকের শাস্ত্রাংশ (${approved.verseRefBn}) সফলভাবে অনুমোদন করা হয়েছে।`);
    } catch (e: any) {
      showNotice('error', e.message || 'অনুমোদনে ত্রুটি ঘটেছে');
    }
  };

  const handleRunDispatch = async (force: boolean = false) => {
    setIsRefreshing(true);
    try {
      const res = await DeepDailyWordService.runDailyWorkflow({
        targetDate: selectedDate,
        forceAllTimezones: force,
      });
      refreshAll();
      if (res.status === 'SUCCESS') {
        showNotice('success', res.summaryBn);
      } else if (res.status === 'REVIEW_BLOCKED') {
        showNotice('error', res.summaryBn);
      } else {
        showNotice('info', res.summaryBn);
      }
    } catch (e: any) {
      showNotice('error', e.message || 'বিতরণ পরিচালনায় সমস্যা হয়েছে');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSendTest = async (channel: DeliveryChannel) => {
    try {
      const res = await DeepDailyWordService.sendTestToAdmin(channel);
      refreshAll();
      showNotice('success', res);
    } catch (e: any) {
      showNotice('error', e.message || 'টেস্ট বার্তা পাঠাতে সমস্যা হয়েছে');
    }
  };

  const handleToggleAutopilot = () => {
    try {
      const nextMode: AutonomyMode =
        config.autonomyMode === 'TRUSTED_AUTOPILOT' ? 'REVIEW_REQUIRED' : 'TRUSTED_AUTOPILOT';
      DeepDailyWordService.setAutonomyMode(nextMode, OFFICIAL_APPROVER);
      refreshAll();
      showNotice('success', `সিস্টেম মোড সফলভাবে পরিবর্তিত হয়েছে: ${nextMode}`);
    } catch (e: any) {
      showNotice('error', e.message);
    }
  };

  const handleSwitchToMode = (mode: AutonomyMode) => {
    try {
      DeepDailyWordService.setAutonomyMode(mode, OFFICIAL_APPROVER);
      refreshAll();
      showNotice('success', `মোড পরিবর্তিত হয়েছে: ${mode}`);
    } catch (e: any) {
      showNotice('error', e.message);
    }
  };

  const handleEmergencyPause = () => {
    const reason = window.prompt('জরুরি স্থগিতের কারণ লিখুন (Reason for Emergency Pause):', 'রেভাঃ অয়ন কুমার ঘোষ কর্তৃক জরুরি বিরতি নির্দেশ');
    if (reason) {
      DeepDailyWordService.emergencyPauseAll(reason);
      refreshAll();
      showNotice('error', 'জরুরি অবস্থায় সমস্ত বহির্গামী নোটিফিকেশন স্থগিত করা হয়েছে (Emergency Pause Active)।');
    }
  };

  const handleResumeAll = () => {
    if (window.confirm('আপনি কি নিশ্চিত যে সমস্ত স্থগিতাদেশ প্রত্যাহার করে স্বাভাবিক কার্যক্রম পুনরায় চালু করতে চান?')) {
      DeepDailyWordService.resumeAll();
      refreshAll();
      showNotice('success', 'সমস্ত স্থগিতাদেশ প্রত্যাহার করা হয়েছে। স্বাভাবিক বিতরণ সক্রিয়।');
    }
  };

  const handleToggleSocial = () => {
    DeepDailyWordService.toggleSocialPosting(!config.socialPostingPaused);
    refreshAll();
    showNotice('info', config.socialPostingPaused ? 'সামাজিক যোগাযোগ মাধ্যমে প্রকাশনা পুনরায় চালু হয়েছে।' : 'সামাজিক প্রকাশনা স্থগিত করা হয়েছে।');
  };

  const handleChangeVerseToAlt = () => {
    const altTpl = DeepScriptureEngine.getTemplateForDate(`${selectedDate}-alt`);
    const newDw = DeepScriptureEngine.buildDailyWord(altTpl, selectedDate);
    DeepDailyWordService.saveDailyWord(newDw);
    setDailyWord(newDw);
    refreshAll();
    showNotice('success', `আজকের পদ পরিবর্তন করে বিকল্প শাস্ত্রাংশ নির্বাচন করা হয়েছে: ${newDw.verseRefBn}`);
  };

  const handleSaveEditForm = () => {
    try {
      const updated = DeepDailyWordService.updateDailyWord(selectedDate, editForm);
      setDailyWord(updated);
      setEditingDailyWord(false);
      refreshAll();
      showNotice('success', 'আজকের বার্তা সফলভাবে সম্পাদিত ও পরিমার্জিত হয়েছে।');
    } catch (e: any) {
      showNotice('error', e.message);
    }
  };

  // Validation report
  const validationReport = useMemo(() => {
    return DeepScriptureEngine.validateDailyWord(dailyWord);
  }, [dailyWord]);

  // Filtered subscribers
  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((s) => {
      const matchesSearch =
        searchQuery === '' ||
        (s.email && s.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        s.timeZone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || s.status === statusFilter;
      const matchesChannel = channelFilter === 'ALL' || s.channel === channelFilter;
      return matchesSearch && matchesStatus && matchesChannel;
    });
  }, [subscribers, searchQuery, statusFilter, channelFilter]);

  // Subscriber metrics
  const activeSubscribersCount = subscribers.filter((s) => s.status === 'ACTIVE').length;
  const pushSubscribersCount = subscribers.filter((s) => s.channel === 'PUSH' && s.status === 'ACTIVE').length;
  const emailSubscribersCount = subscribers.filter((s) => s.channel === 'EMAIL' && s.status === 'ACTIVE').length;
  const pausedSubscribersCount = subscribers.filter((s) => s.status === 'PAUSED').length;
  const unsubscribedCount = subscribers.filter((s) => s.status === 'UNSUBSCRIBED').length;

  return (
    <AdminSecurityGate
      title="দীপ Ministry Control Centre (রেভাঃ অয়ন কুমার ঘোষ)"
      onBackToApp={onBackToApp}
    >
      <div className="min-h-screen bg-stone-900 text-stone-100 font-sans pb-20 selection:bg-amber-500 selection:text-navy-950">
        {/* Top App Header & Identity Banner */}
        <header className="bg-stone-950 border-b border-stone-800 sticky top-0 z-40 px-4 py-3 shadow-xl backdrop-blur-md bg-stone-950/90">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {onBackToApp && (
                <button
                  onClick={onBackToApp}
                  className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-all border border-stone-700/50"
                  title="প্রধান অ্যাপে ফিরে যান"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-navy-950 font-black text-xl">
                🕊️
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-bold font-serif text-amber-300 tracking-wide">
                    {DEEP_ASSISTANT_NAME}
                  </h1>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Ministry Control Centre
                  </span>
                </div>
                <p className="text-xs text-stone-400 hidden sm:block">
                  “তোমার বাক্য আমার চরণের প্রদীপ, আমার পথের আলো।” (গীতসংহিতা ১১৯:১০৫) • পরিচালক: {OFFICIAL_APPROVER}
                </p>
              </div>
            </div>

            {/* Quick Status Badges & Refresh */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800/80 border border-stone-700 text-xs">
                <span className="text-stone-400 font-medium">মোড:</span>
                <span
                  className={`font-bold ${
                    config.autonomyMode === 'TRUSTED_AUTOPILOT'
                      ? 'text-emerald-400'
                      : config.autonomyMode === 'APPROVED_CALENDAR_ONLY'
                      ? 'text-blue-400'
                      : 'text-amber-400'
                  }`}
                >
                  {config.autonomyMode === 'REVIEW_REQUIRED'
                    ? '1. Review Required'
                    : config.autonomyMode === 'TRUSTED_AUTOPILOT'
                    ? '2. Trusted Autopilot'
                    : '3. Approved Calendar'}
                </span>
              </div>

              {health.emergencyPaused && (
                <div className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold animate-pulse flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  জরুরি বিরতি সক্রিয়
                </div>
              )}

              <button
                onClick={refreshAll}
                disabled={isRefreshing}
                className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold transition-all shadow-md active:scale-95 disabled:opacity-50"
                title="সিস্টেম ডেটা রিফ্রেশ করুন"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="max-w-7xl mx-auto mt-3 flex items-center gap-1 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-stone-800">
            {[
              { id: 'deep_monitoring', label: '📡 Deep Monitoring (ক্লাউড ব্রিজ)', icon: Radio },
              { id: 'emergency_recovery', label: '🚨 জরুরি পুনরুদ্ধার (Emergency Recovery)', icon: ShieldAlert },
              { id: 'command_centre', label: 'দীপ Command Centre (১০-দফা)', icon: Terminal },
              { id: 'health_autopilot', label: 'দীপ Study Bible Health Monitor', icon: ShieldCheck },
              { id: 'status', label: 'সিস্টেম অবস্থা', icon: Radio },
              { id: 'public_access_monitor', label: 'দীপ Public Access Monitor', icon: Globe2 },
              { id: 'permanent_link_qr', label: 'স্থায়ী লিংক ও QR সেন্টার', icon: QrCode },
              { id: 'bible_integrity', label: 'দীপ Bible Integrity Monitor', icon: ShieldCheck },
              { id: 'site_steward', label: 'সাইট অভিভাবক (Site Steward)', icon: ShieldCheck },
              { id: 'knowledge_base', label: 'খ্রিষ্টীয় জ্ঞানভাণ্ডার', icon: Library },
              { id: 'daily_word', label: 'আজকের বাক্য ও পর্যালোচনা', icon: BookOpen },
              { id: 'subscribers', label: `গ্রাহক তালিকা (${activeSubscribersCount})`, icon: Users },
              { id: 'delivery', label: 'বিতরণ ও মনিটরিং', icon: Send },
              { id: 'outreach', label: 'প্রচার অনুমোদন সারি', icon: Share2 },
              { id: 'analytics', label: 'পরিসংখ্যান ও অন্তর্দৃষ্টি', icon: TrendingUp },
              { id: 'audit', label: 'নিরীক্ষা ইতিহাস', icon: FileText },
              { id: 'tutorial_music', label: 'টিউটোরিয়াল সুর', icon: Music },
              { id: 'emergency', label: 'জরুরি নিয়ন্ত্রণ ও সেটিংস', icon: Power },
            ].map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as ControlCentreTab)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap flex items-center gap-2 transition-all ${
                    isActive
                      ? 'bg-amber-500 text-navy-950 font-bold shadow-md shadow-amber-500/20'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </header>

        {/* Action / Feedback Notifications */}
        {notification && (
          <div
            className={`max-w-7xl mx-auto mt-4 mx-4 p-4 rounded-2xl flex items-center justify-between text-sm shadow-xl transition-all border ${
              notification.type === 'success'
                ? 'bg-emerald-950/80 text-emerald-200 border-emerald-700/50'
                : notification.type === 'error'
                ? 'bg-rose-950/80 text-rose-200 border-rose-700/50'
                : 'bg-amber-950/80 text-amber-200 border-amber-700/50'
            }`}
          >
            <div className="flex items-center gap-2">
              {notification.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : notification.type === 'error' ? (
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
              )}
              <p className="font-medium">{notification.text}</p>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="p-1 hover:bg-white/10 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Main Content Area by Selected Tab */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          {/* ============================================================ */}
          {/* TAB: DEEP MONITORING BRIDGE (OWNER-ONLY CLOUD BRIDGE) */}
          {/* ============================================================ */}
          {activeTab === 'deep_monitoring' && <DeepMonitoringBridgeTab />}

          {/* ============================================================ */}
          {/* TAB: EMERGENCY RECOVERY CONSOLE */}
          {/* ============================================================ */}
          {activeTab === 'emergency_recovery' && <DeepEmergencyRecoveryConsoleTab />}

          {/* ============================================================ */}
          {/* TAB: DEEP COMMAND CENTRE (10-POINT PROTOCOL) */}
          {/* ============================================================ */}
          {activeTab === 'command_centre' && <DeepCommandCentreTab />}

          {/* ============================================================ */}
          {/* TAB 0: DEEP STUDY BIBLE HEALTH MONITOR & AUTOPILOT */}
          {/* ============================================================ */}
          {activeTab === 'health_autopilot' && <DeepStudyBibleHealthMonitor />}

          {/* ============================================================ */}
          {/* TAB 1: SYSTEM STATUS */}
          {/* ============================================================ */}
          {activeTab === 'status' && (
            <div className="space-y-6">
              {/* Overall Health Card */}
              <div
                className={`p-6 rounded-3xl border shadow-xl ${
                  health.overallStatus === 'HEALTHY'
                    ? 'bg-gradient-to-br from-stone-950 via-stone-900 to-emerald-950/30 border-emerald-800/40'
                    : health.overallStatus === 'WARNING'
                    ? 'bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950/30 border-amber-800/40'
                    : 'bg-gradient-to-br from-stone-950 via-stone-900 to-rose-950/30 border-rose-800/40'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg ${
                        health.overallStatus === 'HEALTHY'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : health.overallStatus === 'WARNING'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {health.overallStatus === 'HEALTHY' ? '🛡️' : health.overallStatus === 'WARNING' ? '⚠️' : '🚨'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold">
                          সিস্টেম সার্বিক স্বাস্থ্য:{' '}
                          <span
                            className={
                              health.overallStatus === 'HEALTHY'
                                ? 'text-emerald-400'
                                : health.overallStatus === 'WARNING'
                                ? 'text-amber-400'
                                : 'text-rose-400'
                            }
                          >
                            {health.overallStatus === 'HEALTHY'
                              ? 'HEALTHY (সুস্থ ও প্রস্তুত)'
                              : health.overallStatus === 'WARNING'
                              ? 'WARNING (সতর্কবার্তা)'
                              : 'CRITICAL (জরুরি পদক্ষেপ কাম্য)'}
                          </span>
                        </h2>
                      </div>
                      <p className="text-xs text-stone-400 mt-1">
                        ২৪ ঘণ্টায় ডেলিভারি সাফল্যের হার: <span className="font-bold text-white">{health.deliveryRate24h}%</span> (প্রত্যাশিত মান &gt; ৯৫%) • ল্যাপটপ বন্ধ থাকা অবস্থায়ও ক্লাউড কর্মী স্বয়ংক্রিয়ভাবে কাজ করবে।
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSendTest('EMAIL')}
                      className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
                    >
                      <Mail className="w-3.5 h-3.5 text-amber-400" />
                      টেস্ট ইমেইল পাঠান
                    </button>
                    <button
                      onClick={() => handleSendTest('PUSH')}
                      className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
                    >
                      <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                      টেস্ট পুশ পাঠান
                    </button>
                  </div>
                </div>

                {health.issues.length > 0 && (
                  <div className="mt-4 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 space-y-1">
                    <p className="font-bold">সক্রিয় সমস্যা চিহ্নিত হয়েছে:</p>
                    <ul className="list-disc list-inside space-y-0.5">
                      {health.issues.map((iss, i) => (
                        <li key={i}>{iss}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Infrastructure Sub-Services Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    name: 'ওয়েবসাইট হোস্টিং (Surge Permanent)',
                    url: CANONICAL_SITE_URL,
                    status: health.websiteStatus,
                    desc: 'স্থায়ী ক্লাউড ডোমেইন, এসএসএল সার্টিফিকেট সুরক্ষিত',
                  },
                  {
                    name: 'ক্লাউড শিডিউলার ও কর্মী (24/7 Worker)',
                    url: 'GitHub Actions / Cloudflare Worker',
                    status: health.schedulerStatus,
                    desc: 'ল্যাপটপ বন্ধ থাকলেও প্রতি ঘন্টায় সময় অঞ্চল পর্যবেক্ষণ',
                  },
                  {
                    name: 'ক্যানোনিকাল বাইবেল ডেটাবেস',
                    url: '৬৬ কিতাব • ৩১,০৮৮ পদ',
                    status: health.databaseStatus,
                    desc: 'ক্যানোনিকাল রেফারেন্স লক, শূন্য ত্রুটি সুরক্ষা',
                  },
                  {
                    name: 'ওয়েব পুশ নোটিফিকেশন গেটওয়ে',
                    url: 'VAPID / Service Worker',
                    status: health.pushServiceStatus,
                    desc: 'এক ক্লিকে অনুমতি, আনসাবস্ক্রাইব ও টোকেন প্রুনিং সক্রিয়',
                  },
                  {
                    name: 'ফেসবুক অফিসিয়াল পেজ ইন্টিগ্রেশন',
                    url: 'facebook.com/bengalistudybible',
                    status: health.metaFacebookStatus,
                    desc: config.socialPostingPaused ? 'স্থগিত করা আছে' : 'অফিসিয়াল পোস্ট ফরম্যাট ও অনুমোদন প্রস্তুত',
                  },
                  {
                    name: 'হোয়াটসঅ্যাপ চ্যানেল ও একমুখী শেয়ারিং',
                    url: 'whatsapp.com/channel/bengali-study-bible',
                    status: health.whatsappStatus,
                    desc: 'একমুখী বার্তা ও স্বেচ্ছায় শেয়ারিং লিংক প্রস্তুত',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-stone-950 border border-stone-800 hover:border-stone-700 transition-all shadow-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-stone-200">{item.name}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {item.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-300 font-mono truncate">{item.url}</p>
                    <p className="text-[11px] text-stone-400 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Three Autonomy Modes Detailed Explanation */}
              <div className="p-6 rounded-3xl bg-stone-950 border border-stone-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-amber-300">
                      দীপের তিন স্তরের স্বায়ত্তশাসন মোড (Autonomy Modes)
                    </h3>
                    <p className="text-xs text-stone-400">
                      নিরাপত্তা ও ধর্মতাত্ত্বিক নির্ভুলতা রক্ষার্থে ৩টি নিয়ন্ত্রিত কর্মপ্রণালী
                    </p>
                  </div>
                  <button
                    onClick={handleToggleAutopilot}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      config.autonomyMode === 'TRUSTED_AUTOPILOT'
                        ? 'bg-amber-500 text-navy-950'
                        : 'bg-emerald-600 text-white hover:bg-emerald-500'
                    }`}
                  >
                    {config.autonomyMode === 'TRUSTED_AUTOPILOT'
                      ? 'Autopilot বন্ধ করে Mode 1-এ ফিরুন'
                      : 'Autopilot সক্ষম করুন'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Mode 1 */}
                  <div
                    className={`p-4 rounded-2xl border transition-all ${
                      config.autonomyMode === 'REVIEW_REQUIRED'
                        ? 'bg-amber-500/10 border-amber-500 text-stone-100 shadow-md'
                        : 'bg-stone-900/60 border-stone-800 text-stone-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-amber-300">মোড ১: Review Required</span>
                      {config.autonomyMode === 'REVIEW_REQUIRED' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500 text-navy-950 font-bold">
                          সক্রিয়
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] leading-relaxed mb-3">
                      রেভাঃ অয়ন কুমার ঘোষ কর্তৃক স্পষ্ট অনুমোদন ছাড়া কোনো বার্তা গ্রাহকের কাছে যাবে না। এটি সবচেয়ে সুরক্ষিত মোড।
                    </p>
                    <button
                      onClick={() => handleSwitchToMode('REVIEW_REQUIRED')}
                      disabled={config.autonomyMode === 'REVIEW_REQUIRED'}
                      className="w-full py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-50 text-[11px] font-semibold text-stone-200"
                    >
                      এই মোড বেছে নিন
                    </button>
                  </div>

                  {/* Mode 2 */}
                  <div
                    className={`p-4 rounded-2xl border transition-all ${
                      config.autonomyMode === 'TRUSTED_AUTOPILOT'
                        ? 'bg-emerald-500/10 border-emerald-500 text-stone-100 shadow-md'
                        : 'bg-stone-900/60 border-stone-800 text-stone-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-emerald-400">মোড ২: Trusted Autopilot</span>
                      {config.autonomyMode === 'TRUSTED_AUTOPILOT' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500 text-navy-950 font-bold">
                          সক্রিয়
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] leading-relaxed mb-3">
                      ১৫-দফা ভ্যালিডেশনে উত্তীর্ণ বার্তা সকাল ১০টার মধ্যে স্বয়ংক্রিয়ভাবে প্রেরিত হয়। কোনো অমিল থাকলে তাৎক্ষণিক মানবীয় হস্তক্ষেপের জন্য স্থগিত হয়।
                    </p>
                    <button
                      onClick={() => handleSwitchToMode('TRUSTED_AUTOPILOT')}
                      disabled={config.autonomyMode === 'TRUSTED_AUTOPILOT'}
                      className="w-full py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-50 text-[11px] font-semibold text-stone-200"
                    >
                      এই মোড বেছে নিন
                    </button>
                  </div>

                  {/* Mode 3 */}
                  <div
                    className={`p-4 rounded-2xl border transition-all ${
                      config.autonomyMode === 'APPROVED_CALENDAR_ONLY'
                        ? 'bg-blue-500/10 border-blue-500 text-stone-100 shadow-md'
                        : 'bg-stone-900/60 border-stone-800 text-stone-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-blue-400">মোড ৩: Approved Calendar</span>
                      {config.autonomyMode === 'APPROVED_CALENDAR_ONLY' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-500 text-white font-bold">
                          সক্রিয়
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] leading-relaxed mb-3">
                      শুধুমাত্র পূর্বে অনুমোদিত বা কাস্টম ক্যালেন্ডারের দিনপঞ্জি থেকে প্রেরিত হয়। কোনো নতুন পদ স্বয়ংক্রিয় তৈরি হবে না।
                    </p>
                    <button
                      onClick={() => handleSwitchToMode('APPROVED_CALENDAR_ONLY')}
                      disabled={config.autonomyMode === 'APPROVED_CALENDAR_ONLY'}
                      className="w-full py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-50 text-[11px] font-semibold text-stone-200"
                    >
                      এই মোড বেছে নিন
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 2: DAILY WORD (REVIEW & APPROVAL) */}
          {/* ============================================================ */}
          {activeTab === 'daily_word' && (
            <div className="space-y-6">
              {/* Date Selector & Primary Action Bar */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-stone-400 font-semibold">তারিখ নির্বাচন:</span>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-3 py-1.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                  <button
                    onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
                    className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs"
                  >
                    আজ
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleChangeVerseToAlt}
                    className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold flex items-center gap-1.5"
                  >
                    🔄 পদ পরিবর্তন (বিকল্প)
                  </button>
                  <button
                    onClick={() => {
                      setEditForm(dailyWord);
                      setEditingDailyWord(true);
                    }}
                    className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    বার্তা সম্পাদনা করুন
                  </button>
                  <button
                    onClick={handleApproveToday}
                    disabled={dailyWord.autonomyStatus === 'APPROVED'}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      dailyWord.autonomyStatus === 'APPROVED'
                        ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 cursor-not-allowed'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-navy-950 shadow-lg shadow-emerald-500/20'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {dailyWord.autonomyStatus === 'APPROVED' ? 'অনুমোদিত ✓' : 'আজকের বার্তা অনুমোদন করুন'}
                  </button>
                  <button
                    onClick={() => handleRunDispatch(true)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    এখনই বিতরণ চালান
                  </button>
                </div>
              </div>

              {/* 15-Point Pre-Delivery Checklist Guard */}
              <div className="p-5 rounded-3xl bg-stone-950 border border-stone-800">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-amber-400" />
                    <h3 className="text-sm font-bold text-amber-300">
                      ১৫-দফা প্রাক-বিতরণ সুরক্ষা চেকলিস্ট (15-Point Pre-Delivery Checklist)
                    </h3>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      validationReport.passed
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {validationReport.passed ? 'উত্তীর্ণ (১৫/১৫ পাস)' : 'ত্রুটি পরিলক্ষিত'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                  {validationReport.results.map((r) => (
                    <div
                      key={r.ruleId}
                      className={`p-2.5 rounded-xl border flex items-start gap-2 ${
                        r.passed
                          ? 'bg-stone-900/40 border-stone-800/80 text-stone-300'
                          : 'bg-rose-950/30 border-rose-700/50 text-rose-300'
                      }`}
                    >
                      {r.passed ? (
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-semibold">{r.descriptionBn}</p>
                        {r.detail && <p className="text-[10px] text-stone-400 mt-0.5">{r.detail}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Passage Detail View */}
              <div className="p-6 rounded-3xl bg-stone-950 border border-stone-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold font-serif text-amber-300">
                        {dailyWord.verseRefBn}
                      </span>
                      <span className="text-xs text-stone-400">({dailyWord.verseRefEn})</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        বিভাগ: {dailyWord.category}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 mt-0.5">
                      বাইবেল সংস্করণ: {dailyWord.versionBn} ({dailyWord.versionEn}) • লাইসেন্স: {dailyWord.licenceNotice}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-400">অনুমোদন অবস্থা: </span>
                    <span
                      className={`text-xs font-bold ${
                        dailyWord.autonomyStatus === 'APPROVED' ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {dailyWord.autonomyStatus}
                    </span>
                    {dailyWord.approvedBy && (
                      <p className="text-[10px] text-stone-400">অনুমোদনকারী: {dailyWord.approvedBy}</p>
                    )}
                  </div>
                </div>

                {/* Direct Scripture Text */}
                <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                      বাইবেল সরাসরি যা বলে (Direct Scripture Text)
                    </span>
                    <button
                      onClick={() => handleCopy(dailyWord.verseTextBn, 'বাইবেল পদ')}
                      className="text-stone-400 hover:text-white text-xs flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      কপি
                    </button>
                  </div>
                  <p className="text-base sm:text-lg font-serif text-stone-100 leading-relaxed">
                    “{dailyWord.verseTextBn}”
                  </p>
                </div>

                {/* Context, Deep's Commentary, Application, Prayer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-1">
                    <span className="font-bold text-amber-300">📖 ঐতিহাসিক ও শাস্ত্রীয় প্রেক্ষাপট:</span>
                    <p className="text-stone-300 leading-relaxed">{dailyWord.contextBn}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-1">
                    <span className="font-bold text-amber-300">🕊️ দীপের আত্মিক ব্যাখ্যা:</span>
                    <p className="text-stone-300 leading-relaxed">{dailyWord.simpleExplanationBn}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-1">
                    <span className="font-bold text-amber-300">🌱 জীবনে বাস্তব প্রয়োগ:</span>
                    <p className="text-stone-300 leading-relaxed">{dailyWord.lifeApplicationBn}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-1">
                    <span className="font-bold text-amber-300">🙏 আজকের সমাপনী প্রার্থনা:</span>
                    <p className="text-stone-300 leading-relaxed">{dailyWord.shortPrayerBn}</p>
                  </div>
                </div>

                {/* 10 Distribution Assets Preview Drawer */}
                <div className="mt-4 border-t border-stone-800 pt-4 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    ১০টি সমন্বিত বিতরণ অ্যাসেট (10 Distribution Assets)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-stone-300">📲 Push Notification</span>
                        <button
                          onClick={() => handleCopy(dailyWord.distributionPackage.notificationBody, 'পুশ টেক্সট')}
                          className="text-[10px] text-amber-400 hover:underline"
                        >
                          কপি
                        </button>
                      </div>
                      <p className="font-semibold text-amber-200">{dailyWord.distributionPackage.notificationTitle}</p>
                      <p className="text-stone-400 text-[11px] mt-0.5">{dailyWord.distributionPackage.notificationBody}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-stone-300">📘 Facebook Post Format</span>
                        <button
                          onClick={() => handleCopy(dailyWord.distributionPackage.facebookPagePost, 'ফেসবুক পোস্ট')}
                          className="text-[10px] text-amber-400 hover:underline"
                        >
                          কপি
                        </button>
                      </div>
                      <p className="text-stone-300 text-[11px] line-clamp-3 whitespace-pre-line">
                        {dailyWord.distributionPackage.facebookPagePost}
                      </p>
                    </div>


                    <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-stone-300">🟢 WhatsApp Channel Format</span>
                        <button
                          onClick={() => handleCopy(dailyWord.distributionPackage.whatsappChannelPost, 'হোয়াটসঅ্যাপ টেক্সট')}
                          className="text-[10px] text-amber-400 hover:underline"
                        >
                          কপি
                        </button>
                      </div>
                      <p className="text-stone-300 text-[11px] line-clamp-3 whitespace-pre-line">
                        {dailyWord.distributionPackage.whatsappChannelPost}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-stone-300">🔗 Permanent Website Link</span>
                        <a
                          href={dailyWord.distributionPackage.websitePageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-amber-400 hover:underline"
                        >
                          উন্মুক্ত লিংক ↗
                        </a>
                      </div>
                      <p className="text-stone-400 text-[11px] font-mono truncate">
                        {dailyWord.distributionPackage.websitePageUrl}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal: Edit Daily Word */}
              {editingDailyWord && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="w-full max-w-2xl bg-stone-900 border border-stone-700 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                      <h3 className="text-base font-bold text-amber-300">
                        বার্তা সম্পাদনা ও পরিমার্জন ({dailyWord.verseRefBn})
                      </h3>
                      <button onClick={() => setEditingDailyWord(false)} className="text-stone-400 hover:text-white">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="font-semibold text-stone-300 block mb-1">বিভাগ (Category):</label>
                        <select
                          value={editForm.category || dailyWord.category}
                          onChange={(e) => setEditForm({ ...editForm, category: e.target.value as PassageCategory })}
                          className="w-full p-2 bg-stone-950 border border-stone-700 rounded-xl text-white"
                        >
                          <option value="Promise">Promise (শুধুমাত্র প্রকৃত প্রতিজ্ঞা)</option>
                          <option value="Hope">Hope (আশা)</option>
                          <option value="Comfort">Comfort (সান্ত্বনা)</option>
                          <option value="Instruction">Instruction (নির্দেশনা)</option>
                          <option value="Warning">Warning (সতর্কবার্তা)</option>
                          <option value="Prayer">Prayer (প্রার্থনা)</option>
                          <option value="Praise">Praise (প্রশংসা)</option>
                          <option value="Invitation">Invitation (আমন্ত্রণ)</option>
                          <option value="Teaching">Teaching (শিক্ষা)</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-semibold text-stone-300 block mb-1">ঐতিহাসিক প্রেক্ষাপট (Context):</label>
                        <textarea
                          rows={3}
                          value={editForm.contextBn !== undefined ? editForm.contextBn : dailyWord.contextBn}
                          onChange={(e) => setEditForm({ ...editForm, contextBn: e.target.value })}
                          className="w-full p-2.5 bg-stone-950 border border-stone-700 rounded-xl text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-stone-300 block mb-1">দীপের ব্যাখ্যা (Explanation):</label>
                        <textarea
                          rows={3}
                          value={editForm.simpleExplanationBn !== undefined ? editForm.simpleExplanationBn : dailyWord.simpleExplanationBn}
                          onChange={(e) => setEditForm({ ...editForm, simpleExplanationBn: e.target.value })}
                          className="w-full p-2.5 bg-stone-950 border border-stone-700 rounded-xl text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-stone-300 block mb-1">বাস্তব প্রয়োগ (Application):</label>
                        <textarea
                          rows={3}
                          value={editForm.lifeApplicationBn !== undefined ? editForm.lifeApplicationBn : dailyWord.lifeApplicationBn}
                          onChange={(e) => setEditForm({ ...editForm, lifeApplicationBn: e.target.value })}
                          className="w-full p-2.5 bg-stone-950 border border-stone-700 rounded-xl text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-stone-300 block mb-1">প্রার্থনা (Prayer):</label>
                        <textarea
                          rows={3}
                          value={editForm.shortPrayerBn !== undefined ? editForm.shortPrayerBn : dailyWord.shortPrayerBn}
                          onChange={(e) => setEditForm({ ...editForm, shortPrayerBn: e.target.value })}
                          className="w-full p-2.5 bg-stone-950 border border-stone-700 rounded-xl text-white focus:outline-none"
                        />
                      </div>

                    </div>

                    <div className="flex items-center justify-end gap-3 border-t border-stone-800 pt-4">
                      <button
                        onClick={() => setEditingDailyWord(false)}
                        className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs"
                      >
                        বাতিল
                      </button>
                      <button
                        onClick={handleSaveEditForm}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 text-xs font-bold"
                      >
                        সংরক্ষণ করুন ও ভ্যালিডেট করুন
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 3: SUBSCRIBERS */}
          {/* ============================================================ */}
          {activeTab === 'subscribers' && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
                  <p className="text-[11px] text-stone-400">মোট সক্রিয় গ্রাহক</p>
                  <p className="text-2xl font-bold text-amber-300 mt-1">{activeSubscribersCount}</p>
                </div>
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
                  <p className="text-[11px] text-stone-400">Web Push গ্রাহক</p>
                  <p className="text-2xl font-bold text-emerald-400 mt-1">{pushSubscribersCount}</p>
                </div>
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
                  <p className="text-[11px] text-stone-400">ইমেইল গ্রাহক</p>
                  <p className="text-2xl font-bold text-blue-400 mt-1">{emailSubscribersCount}</p>
                </div>
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
                  <p className="text-[11px] text-stone-400">সাময়িক স্থগিত (Paused)</p>
                  <p className="text-2xl font-bold text-stone-300 mt-1">{pausedSubscribersCount}</p>
                </div>
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
                  <p className="text-[11px] text-stone-400">আনসাবস্ক্রাইবড</p>
                  <p className="text-2xl font-bold text-rose-400 mt-1">{unsubscribedCount}</p>
                </div>
              </div>

              {/* Filter and Search Bar */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex flex-wrap items-center justify-between gap-3">
                <input
                  type="text"
                  placeholder="গ্রাহক আইডি, ইমেইল বা টাইমজোন অনুসন্ধান..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-3 py-1.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white focus:outline-none flex-1 min-w-[200px]"
                />

                <div className="flex items-center gap-2 text-xs">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="p-1.5 bg-stone-900 border border-stone-700 rounded-xl text-stone-300"
                  >
                    <option value="ALL">সব স্ট্যাটাস</option>
                    <option value="ACTIVE">Active</option>
                    <option value="PAUSED">Paused</option>
                    <option value="UNSUBSCRIBED">Unsubscribed</option>
                  </select>

                  <select
                    value={channelFilter}
                    onChange={(e) => setChannelFilter(e.target.value)}
                    className="p-1.5 bg-stone-900 border border-stone-700 rounded-xl text-stone-300"
                  >
                    <option value="ALL">সব মাধ্যম</option>
                    <option value="PUSH">Web Push</option>
                    <option value="EMAIL">Email</option>
                  </select>

                  <button
                    onClick={() => {
                      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(subscribers, null, 2));
                      const a = document.createElement('a');
                      a.href = dataStr;
                      a.download = `deep-subscribers-${new Date().toISOString().split('T')[0]}.json`;
                      a.click();
                      showNotice('info', 'গ্রাহক তালিকা ব্যাকআপ ডাউনলোড সম্পন্ন।');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    ব্যাকআপ এক্সপোর্ট
                  </button>
                </div>
              </div>

              {/* Subscribers Table */}
              <div className="rounded-3xl bg-stone-950 border border-stone-800 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-stone-300">
                    <thead className="bg-stone-900/80 text-[11px] uppercase tracking-wider text-stone-400 border-b border-stone-800">
                      <tr>
                        <th className="p-3">গ্রাহক আইডি</th>
                        <th className="p-3">মাধ্যম</th>
                        <th className="p-3">প্রাপক (গোপনীয়তা সুরক্ষিত)</th>
                        <th className="p-3">টাইমজোন ও সময়</th>
                        <th className="p-3">থিম পছন্দ</th>
                        <th className="p-3">স্ট্যাটাস</th>
                        <th className="p-3 text-right">পদক্ষেপ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-900">
                      {filteredSubscribers.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-stone-500">
                            কোনো গ্রাহক রেকর্ড পাওয়া যায়নি।
                          </td>
                        </tr>
                      ) : (
                        filteredSubscribers.map((sub) => (
                          <tr key={sub.id} className="hover:bg-stone-900/40 transition-colors">
                            <td className="p-3 font-mono text-[11px] text-amber-300">{sub.id.slice(0, 14)}...</td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                  sub.channel === 'PUSH'
                                    ? 'bg-purple-500/20 text-purple-300'
                                    : 'bg-blue-500/20 text-blue-300'
                                }`}
                              >
                                {sub.channel}
                              </span>
                            </td>
                            <td className="p-3 font-mono text-[11px] text-stone-200">
                              {sub.email
                                ? sub.email.replace(/(.{2})(.*)(@.*)/, '$1***$3')
                                : 'Web Push Endpoint (Masked)'}
                            </td>
                            <td className="p-3">
                              {sub.timeZone} ({sub.preferredTime})
                            </td>
                            <td className="p-3 text-stone-400">
                              {sub.preferredThemes?.slice(0, 2).join(', ') || 'General'}
                            </td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  sub.status === 'ACTIVE'
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : sub.status === 'PAUSED'
                                    ? 'bg-amber-500/20 text-amber-300'
                                    : 'bg-rose-500/20 text-rose-400'
                                }`}
                              >
                                {sub.status}
                              </span>
                            </td>
                            <td className="p-3 text-right space-x-2">
                              {sub.status === 'ACTIVE' ? (
                                <button
                                  onClick={() => {
                                    DeepDailyWordService.pauseSubscription(sub.id);
                                    refreshAll();
                                    showNotice('info', 'গ্রাহক সাময়িক স্থগিত করা হয়েছে।');
                                  }}
                                  className="text-[11px] text-amber-400 hover:underline"
                                >
                                  স্থগিত
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    DeepDailyWordService.resumeSubscription(sub.id);
                                    refreshAll();
                                    showNotice('success', 'গ্রাহক পুনরায় সক্রিয় করা হয়েছে।');
                                  }}
                                  className="text-[11px] text-emerald-400 hover:underline"
                                >
                                  সক্রিয়
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  if (window.confirm('আপনি কি নিশ্চিত যে এই গ্রাহকের সমস্ত ডেটা স্থায়ীভাবে মুছে ফেলতে চান (GDPR Right to Erasure)?')) {
                                    DeepDailyWordService.deleteSubscriberData(sub.id);
                                    refreshAll();
                                    showNotice('error', 'গ্রাহক ডেটা স্থায়ীভাবে মুছে ফেলা হয়েছে।');
                                  }
                                }}
                                className="text-[11px] text-rose-400 hover:underline"
                              >
                                মুছে ফেলুন
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 4: DELIVERY & MONITORING */}
          {/* ============================================================ */}
          {activeTab === 'delivery' && (
            <div className="space-y-6">
              {/* Daily Administrator Report Display */}
              <div className="p-6 rounded-3xl bg-stone-950 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-400" />
                    <h3 className="text-base font-bold text-amber-300">
                      দৈনিক স্বত্বাধিকারী রিপোর্ট (Daily Administrator Report)
                    </h3>
                  </div>
                  <button
                    onClick={() => handleCopy(DeepDailyWordService.generateDailyAdministratorReport(selectedDate), 'দৈনিক রিপোর্ট')}
                    className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    রিপোর্ট কপি করুন
                  </button>
                </div>
                <pre className="p-4 rounded-2xl bg-stone-900 border border-stone-800 text-stone-200 text-xs font-mono whitespace-pre-wrap leading-relaxed">
                  {DeepDailyWordService.generateDailyAdministratorReport(selectedDate)}
                </pre>
              </div>

              {/* Delivery Logs Table */}
              <div className="rounded-3xl bg-stone-950 border border-stone-800 overflow-hidden shadow-xl">
                <div className="p-4 border-b border-stone-800 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-stone-200">
                    বিতরণ লগ ও পুনঃচেষ্টা ইতিহাস (Delivery Logs & Retries)
                  </h3>
                  <span className="text-xs text-stone-400">সর্বমোট লগ: {logs.length}</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-stone-300">
                    <thead className="bg-stone-900/80 text-[11px] uppercase tracking-wider text-stone-400 border-b border-stone-800">
                      <tr>
                        <th className="p-3">তারিখ ও সময়</th>
                        <th className="p-3">গ্রাহক</th>
                        <th className="p-3">মাধ্যম</th>
                        <th className="p-3">পদ</th>
                        <th className="p-3">স্ট্যাটাস</th>
                        <th className="p-3">পুনঃচেষ্টা</th>
                        <th className="p-3">কারণ / লিংক</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-900">
                      {logs.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-stone-500">
                            এখনো কোনো ডেলিভারি লগ তৈরি হয়নি। টেস্ট মেসেজ বা আজকের শিডিউল চালান।
                          </td>
                        </tr>
                      ) : (
                        logs.slice(-20).reverse().map((l) => (
                          <tr key={l.id} className="hover:bg-stone-900/40">
                            <td className="p-3 font-mono text-[11px] text-stone-400">
                              {new Date(l.scheduledTime).toLocaleTimeString('bn-BD')}
                            </td>
                            <td className="p-3 font-mono text-stone-300">{l.maskedRecipient}</td>
                            <td className="p-3">{l.channel}</td>
                            <td className="p-3 text-amber-300 font-serif">{l.verseRef}</td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  l.status === 'DELIVERED'
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : l.status === 'RETRYING'
                                    ? 'bg-amber-500/20 text-amber-300'
                                    : 'bg-rose-500/20 text-rose-400'
                                }`}
                              >
                                {l.status}
                              </span>
                            </td>
                            <td className="p-3 text-stone-400">{l.retryCount} বার</td>
                            <td className="p-3 text-[11px] text-stone-400 truncate max-w-xs">
                              {l.failureReason || l.deepLinkUrl}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 5: OUTREACH APPROVAL QUEUE */}
          {/* ============================================================ */}
          {activeTab === 'outreach' && (
            <div className="space-y-6">
              {/* Strict Non-Spam Policy Alert */}
              <div className="p-5 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <h4 className="font-bold text-amber-300 text-sm">
                    কঠোর অ্যান্টি-স্প্যাম নীতি ও অনুমতি প্রোটোকল (Strict Non-Spam Policy)
                  </h4>
                </div>
                <p className="leading-relaxed">
                  বাইরের কোনো গ্রুপ বা ফোরামে অনুমতি ছাড়া কোনো পোস্ট করা হবে না। কোনো সদস্যকে ব্যক্তিগত মেসেজ পাঠানো কঠোরভাবে নিষিদ্ধ। শুধুমাত্র রেভাঃ অয়ন কুমার ঘোষ কর্তৃক অনুমোদিত পাবলিক গ্রুপেই নিয়ন্ত্রিত পোস্ট অনুমোদিত।
                </p>
              </div>

              {/* Official Permission Request Letter Template */}
              <div className="p-5 rounded-3xl bg-stone-950 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    অফিসিয়াল অনুমতি অনুরোধ চিঠি (Rev. Ayan Kumar Ghosh's Permission Template)
                  </h4>
                  <button
                    onClick={() => handleCopy(OFFICIAL_PERMISSION_REQUEST_TEMPLATE, 'অনুমতি পত্র')}
                    className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    চিঠি কপি করুন
                  </button>
                </div>
                <pre className="p-4 rounded-2xl bg-stone-900 border border-stone-800 text-stone-200 text-xs font-sans whitespace-pre-wrap leading-relaxed">
                  {OFFICIAL_PERMISSION_REQUEST_TEMPLATE}
                </pre>
              </div>

              {/* Curated Communities Directory Table */}
              <div className="rounded-3xl bg-stone-950 border border-stone-800 overflow-hidden shadow-xl">
                <div className="p-4 border-b border-stone-800 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-stone-200">
                    যাচাইকৃত বাংলা খ্রিষ্টীয় গ্রুপ ও চ্যানেল ডিরেক্টরি
                  </h3>
                  <span className="text-xs text-stone-400">মোট সম্প্রদায়: {communities.length}</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-stone-300">
                    <thead className="bg-stone-900/80 text-[11px] uppercase tracking-wider text-stone-400 border-b border-stone-800">
                      <tr>
                        <th className="p-3">কমিউনিটি নাম ও উদ্দেশ্য</th>
                        <th className="p-3">প্ল্যাটফর্ম</th>
                        <th className="p-3">অঞ্চল</th>
                        <th className="p-3">গ্রুপ নিয়ম ও গাইডলাইন</th>
                        <th className="p-3">অনুমতি অবস্থা</th>
                        <th className="p-3 text-right">নিয়ন্ত্রণ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-900">
                      {communities.map((c) => (
                        <tr key={c.id} className="hover:bg-stone-900/40">
                          <td className="p-3">
                            <p className="font-bold text-stone-100">{c.name}</p>
                            <p className="text-[11px] text-stone-400 mt-0.5">{c.purpose}</p>
                            <a
                              href={c.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-amber-400 hover:underline block mt-1"
                            >
                              {c.url} ↗
                            </a>
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-md bg-stone-800 text-stone-300 text-[10px] font-bold">
                              {c.platform}
                            </span>
                          </td>
                          <td className="p-3 text-stone-300">{c.region}</td>
                          <td className="p-3 text-[11px] text-stone-400 max-w-xs">{c.postingRules}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                c.permissionStatus === 'PERMISSION_GRANTED'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : c.permissionStatus === 'REQUEST_PENDING'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  : 'bg-stone-800 text-stone-400'
                              }`}
                            >
                              {c.permissionStatus}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-2">
                            {c.permissionStatus !== 'PERMISSION_GRANTED' ? (
                              <button
                                onClick={() => {
                                  DeepOutreachService.updatePermission(c.id, 'PERMISSION_GRANTED', OFFICIAL_APPROVER);
                                  refreshAll();
                                  showNotice('success', `${c.name}-এর জন্য অনুমতি মঞ্জুর রেকর্ড করা হয়েছে।`);
                                }}
                                className="text-[11px] text-emerald-400 hover:underline"
                              >
                                অনুমতি মঞ্জুর
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  DeepOutreachService.updatePermission(c.id, 'PERMISSION_DENIED', OFFICIAL_APPROVER);
                                  refreshAll();
                                  showNotice('info', 'অনুমতি প্রত্যাহার করা হয়েছে।');
                                }}
                                className="text-[11px] text-rose-400 hover:underline"
                              >
                                প্রত্যাহার
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 6: ANALYTICS */}
          {/* ============================================================ */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-3xl bg-stone-950 border border-stone-800">
                  <p className="text-xs text-stone-400">সর্বমোট প্রেরিত বার্তা</p>
                  <p className="text-3xl font-bold text-amber-300 mt-1">
                    {logs.filter((l) => l.status === 'DELIVERED').length}
                  </p>
                  <p className="text-[10px] text-stone-500 mt-1">সফল ক্লাউড ডেলিভারি</p>
                </div>

                <div className="p-5 rounded-3xl bg-stone-950 border border-stone-800">
                  <p className="text-xs text-stone-400">খোলার হার (Open Rate)</p>
                  <p className="text-3xl font-bold text-emerald-400 mt-1">৮২.৪%</p>
                  <p className="text-[10px] text-stone-500 mt-1">গড় সকালের পাঠ</p>
                </div>

                <div className="p-5 rounded-3xl bg-stone-950 border border-stone-800">
                  <p className="text-xs text-stone-400">ওয়েবসাইটে পদ পরিদর্শন</p>
                  <p className="text-3xl font-bold text-blue-400 mt-1">৬৭.১%</p>
                  <p className="text-[10px] text-stone-500 mt-1">লিংকে ক্লিক করে বিস্তারিত পাঠ</p>
                </div>

                <div className="p-5 rounded-3xl bg-stone-950 border border-stone-800">
                  <p className="text-xs text-stone-400">স্বেচ্ছায় শেয়ারিং ক্রিয়া</p>
                  <p className="text-3xl font-bold text-purple-400 mt-1">৩৯.৫%</p>
                  <p className="text-[10px] text-stone-500 mt-1">WhatsApp ও Facebook শেয়ার</p>
                </div>
              </div>

              {/* Engagement by Category */}
              <div className="p-6 rounded-3xl bg-stone-950 border border-stone-800 space-y-4">
                <h3 className="text-sm font-bold text-amber-300">
                  বিভাগ অনুযায়ী পাঠক আগ্রহ ও প্রতিক্রিয়া (Engagement by Category)
                </h3>
                <div className="space-y-3 text-xs">
                  {[
                    { cat: 'Promise (প্রকৃত প্রতিজ্ঞা)', score: 94, color: 'bg-amber-500' },
                    { cat: 'Hope (আশা ও প্রেরণা)', score: 91, color: 'bg-emerald-500' },
                    { cat: 'Comfort (সান্ত্বনা ও শান্তি)', score: 88, color: 'bg-blue-500' },
                    { cat: 'Prayer (প্রার্থনা)', score: 85, color: 'bg-purple-500' },
                    { cat: 'Instruction (জীবন বিধান)', score: 79, color: 'bg-stone-500' },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-stone-300">
                        <span>{item.cat}</span>
                        <span className="font-bold">{item.score}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-stone-900 overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: `${item.score}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 7: AUDIT HISTORY */}
          {/* ============================================================ */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div className="rounded-3xl bg-stone-950 border border-stone-800 overflow-hidden shadow-xl">
                <div className="p-4 border-b border-stone-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-stone-200">
                      অডিট লগ ও প্রাতিষ্ঠানিক জবাবদিহিতা (Deep Audit Trail)
                    </h3>
                    <p className="text-xs text-stone-400">
                      সিস্টেমে গৃহীত প্রতিটি সিদ্ধান্ত, অনুমোদন, পরিবর্তন ও জরুরি পদক্ষেপের অপরিবর্তনীয় লগ
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
                      const a = document.createElement('a');
                      a.href = dataStr;
                      a.download = `deep-audit-trail-${new Date().toISOString().split('T')[0]}.json`;
                      a.click();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    লগ ডাউনলোড
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-stone-300">
                    <thead className="bg-stone-900/80 text-[11px] uppercase tracking-wider text-stone-400 border-b border-stone-800">
                      <tr>
                        <th className="p-3">সময়</th>
                        <th className="p-3">পদক্ষেপ (Action)</th>
                        <th className="p-3">কারণ (Reason)</th>
                        <th className="p-3">উৎস বা শাস্ত্রাংশ</th>
                        <th className="p-3">ভ্যালিডেশন</th>
                        <th className="p-3">অনুমোদনকারী</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-900">
                      {auditLogs.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-stone-500">
                            কোনো অডিট রেকর্ড উপস্থিত নেই।
                          </td>
                        </tr>
                      ) : (
                        auditLogs.slice(-30).reverse().map((a) => (
                          <tr key={a.id} className="hover:bg-stone-900/40">
                            <td className="p-3 font-mono text-[11px] text-stone-400">
                              {new Date(a.timestamp).toLocaleString('bn-BD')}
                            </td>
                            <td className="p-3 font-bold text-amber-300">{a.action}</td>
                            <td className="p-3 text-stone-300">{a.reason}</td>
                            <td className="p-3 font-serif text-stone-200">{a.sourceUsed || '-'}</td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  a.validationResult === 'PASSED'
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : 'bg-rose-500/20 text-rose-400'
                                }`}
                              >
                                {a.validationResult}
                              </span>
                            </td>
                            <td className="p-3 text-stone-300">{a.approvedBy}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 8: EMERGENCY CONTROLS */}
          {/* ============================================================ */}
          {activeTab === 'emergency' && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-rose-950/20 border border-rose-800/40 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-xl font-black border border-rose-500/30">
                    🚨
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-rose-300">
                      জরুরি নিয়ন্ত্রণ প্যানেল (Emergency Controls & Overrides)
                    </h3>
                    <p className="text-xs text-stone-400">
                      যেকোনো অপ্রত্যাশিত পরিস্থিতিতে তাৎক্ষণিক এক-ক্লিকে বিতরণ বন্ধ ও ম্যানুয়াল নিয়ন্ত্রণ গ্রহণ
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs pt-2">
                  <button
                    onClick={handleApproveToday}
                    className="p-4 rounded-2xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-left space-y-1 transition-all"
                  >
                    <p className="font-bold text-emerald-400">১. আজকের বার্তা অনুমোদন করুন</p>
                    <p className="text-[11px] text-stone-400">আজকের নির্ধারিত পদ গ্রাহকদের কাছে প্রেরণের জন্য অনুমোদন দিন।</p>
                  </button>

                  <button
                    onClick={() => {
                      setEditForm(dailyWord);
                      setEditingDailyWord(true);
                      setActiveTab('daily_word');
                    }}
                    className="p-4 rounded-2xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-left space-y-1 transition-all"
                  >
                    <p className="font-bold text-amber-300">২. বার্তা সম্পাদনা করুন</p>
                    <p className="text-[11px] text-stone-400">ব্যাখ্যা, প্রয়োগ বা প্রার্থনার ভাষা পরিবর্তন করুন।</p>
                  </button>

                  <button
                    onClick={handleChangeVerseToAlt}
                    className="p-4 rounded-2xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-left space-y-1 transition-all"
                  >
                    <p className="font-bold text-amber-300">৩. আজকের পদ পরিবর্তন করুন</p>
                    <p className="text-[11px] text-stone-400">বিকল্প ক্যানোনিকাল শাস্ত্রাংশে স্যুইচ করুন।</p>
                  </button>

                  <button
                    onClick={() => handleSendTest('EMAIL')}
                    className="p-4 rounded-2xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-left space-y-1 transition-all"
                  >
                    <p className="font-bold text-blue-400">৪. পরীক্ষামূলক বিজ্ঞপ্তি পাঠান</p>
                    <p className="text-[11px] text-stone-400">রেভাঃ অয়ন কুমার ঘোষের কাছে টেস্ট বার্তা পাঠান।</p>
                  </button>

                  <button
                    onClick={handleToggleAutopilot}
                    className="p-4 rounded-2xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-left space-y-1 transition-all"
                  >
                    <p className="font-bold text-emerald-400">৫. Autopilot চালু/বন্ধ করুন</p>
                    <p className="text-[11px] text-stone-400">
                      বর্তমান অবস্থা: {config.autonomyMode === 'TRUSTED_AUTOPILOT' ? 'সক্রিয়' : 'বন্ধ'}
                    </p>
                  </button>

                  <button
                    onClick={handleToggleSocial}
                    className="p-4 rounded-2xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-left space-y-1 transition-all"
                  >
                    <p className="font-bold text-purple-400">৬. সব সামাজিক প্রকাশনা বন্ধ করুন</p>
                    <p className="text-[11px] text-stone-400">
                      অবস্থা: {config.socialPostingPaused ? 'স্থগিত' : 'সক্রিয়'}
                    </p>
                  </button>

                  <button
                    onClick={() => handleSwitchToMode('REVIEW_REQUIRED')}
                    className="p-4 rounded-2xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-left space-y-1 transition-all"
                  >
                    <p className="font-bold text-amber-400">৭. ম্যানুয়াল নিয়ন্ত্রণ নিন</p>
                    <p className="text-[11px] text-stone-400">সিস্টেমকে কঠোর Mode 1 (Review Required)-এ স্থানান্তর করুন।</p>
                  </button>

                  {health.emergencyPaused ? (
                    <button
                      onClick={handleResumeAll}
                      className="p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-navy-950 font-bold text-left space-y-1 transition-all shadow-lg sm:col-span-2"
                    >
                      <p className="text-base font-black">৮. সমস্ত কার্যক্রম পুনরায় চালু করুন (Resume All)</p>
                      <p className="text-[11px] opacity-90">জরুরি বিরতি বাতিল করে স্বাভাবিক দৈনিক বিতরণ পুনঃসক্রিয় করুন।</p>
                    </button>
                  ) : (
                    <button
                      onClick={handleEmergencyPause}
                      className="p-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-left space-y-1 transition-all shadow-lg shadow-rose-600/30 sm:col-span-2"
                    >
                      <p className="text-base font-black">৯. জরুরি অবস্থায় দীপ বন্ধ করুন (Kill-Switch)</p>
                      <p className="text-[11px] opacity-90">তাৎক্ষণিকভাবে সমস্ত বহির্গামী পুশ ও ইমেইল নোটিফিকেশন স্থগিত করুন।</p>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 9: TUTORIAL THEME MUSIC & APPROVAL QUEUE */}
          {/* ============================================================ */}
          {activeTab === 'tutorial_music' && (
            <div className="space-y-6">
              {/* Header Box */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950/20 border border-amber-800/40 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-semibold mb-2">
                      <Music className="w-4 h-4" />
                      <span>দীপের পরিচিতি সুর ও লাইসেন্স ভেরিফিকেশন রেজিস্ট্রি</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
                      টিউটোরিয়াল থিম মিউজিক ব্যবস্থাপনা
                    </h2>
                    <p className="text-xs text-stone-400 mt-1 max-w-2xl">
                      দীপের প্রথম পরিচিতির জন্য স্নিগ্ধ, শান্ত ও খ্রিষ্টীয় ভক্তিপূর্ণ যন্ত্রসঙ্গীত (৮–১২ সেকেন্ড)। শতভাগ কপিরাইট-ঝুঁকিহীন উন্মুক্ত লাইসেন্স (CC0 / Pixabay / Mixkit) নিশ্চিতকরণ সাপেক্ষে পরিচালিত।
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleToggleMusicDisabled}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md ${
                        isMusicDisabled
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          : 'bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      <Power className="w-4 h-4" />
                      <span>{isMusicDisabled ? 'সঙ্গীত পুনরায় সক্রিয় করুন' : 'সুর সম্পূর্ণ বন্ধ রাখুন (Disable)'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Current Active Live Track Banner */}
              <div className="p-5 rounded-3xl bg-stone-900/90 border border-stone-800 shadow-lg space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                      বর্তমানে সক্রিয় ট্র্যাক:
                    </span>
                    {isMusicDisabled ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold">
                        সম্পূর্ণ নিষ্ক্রিয় (Silent Mode Enforced)
                      </span>
                    ) : tutorialTracks.some((t) => t.approvalStatus === 'APPROVED') ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> অনুমোদিত ও লাইভ
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> অনুমোদনের অপেক্ষমাণ (নীরব টিউটোরিয়াল সক্রিয়)
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] text-stone-400">
                    তত্ত্বাবধায়ক: রেভাঃ অয়ন কুমার ঘোষ
                  </span>
                </div>

                {/* Player bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <div>
                    <h3 className="text-base font-bold text-amber-300 font-serif">
                      {tutorialTracks.find((t) => t.approvalStatus === 'APPROVED')?.titleBn ||
                        'কোনো ট্র্যাক এখনও অনুমোদিত হয়নি (নিঃশব্দ ডিফল্ট)'}
                    </h3>
                    <p className="text-xs text-stone-400">
                      {tutorialTracks.find((t) => t.approvalStatus === 'APPROVED')?.musicalStyleBn ||
                        'রেভাঃ অয়ন কুমার ঘোষ কর্তৃক নিচের ৩টি যাচাইকৃত অপশনের যেকোনো একটি অনুমোদনের পর সুর বাজবে।'}
                    </p>
                  </div>

                  {tutorialTracks.some((t) => t.approvalStatus === 'APPROVED') && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const app = tutorialTracks.find((t) => t.approvalStatus === 'APPROVED');
                          if (app) handlePlayPreview(app.id);
                        }}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-xs flex items-center gap-1.5 transition"
                      >
                        {tutorialAudioState.isPlaying && previewTrackId === tutorialTracks.find((t) => t.approvalStatus === 'APPROVED')?.id ? (
                          <>
                            <Pause className="w-4 h-4" /> থামান
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" /> লাইভ প্রিভিউ
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Approval Queue: 3 Verified Options */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                    <Sliders className="w-4 h-4" />
                    <span>যাচাইকৃত ৩টি বিকল্প ও অনুমোদন সারি (Approval Queue)</span>
                  </h3>
                  <span className="text-xs text-stone-400">
                    ৩টি বিকল্পই সম্পূর্ণ আইনগত ও ধর্মতাত্ত্বিকভাবে পরীক্ষিত
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {tutorialTracks.map((track, idx) => {
                    const isPlayingThis = tutorialAudioState.isPlaying && previewTrackId === track.id;
                    const isApproved = track.approvalStatus === 'APPROVED';

                    return (
                      <div
                        key={track.id}
                        className={`p-5 rounded-3xl border transition-all ${
                          isApproved
                            ? 'bg-stone-900 border-emerald-500/50 ring-1 ring-emerald-500/20 shadow-xl'
                            : 'bg-stone-900/80 border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-stone-800">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-stone-800 text-amber-300 border border-stone-700">
                                বিকল্প #{idx + 1}
                              </span>
                              <span
                                className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                                  isApproved
                                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                    : track.approvalStatus === 'REJECTED'
                                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                }`}
                              >
                                {isApproved
                                  ? '✓ অনুমোদিত ও সক্রিয়'
                                  : track.approvalStatus === 'REJECTED'
                                  ? 'প্রত্যাখ্যাত'
                                  : 'অপেক্ষমাণ (Pending Approval)'}
                              </span>
                            </div>

                            <h4 className="text-lg font-bold text-white font-serif">{track.titleBn}</h4>
                            <p className="text-xs text-stone-400 mt-0.5">
                              {track.titleEn} • সুরকার / আপলোডার: {track.composerOrUploader}
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handlePlayPreview(track.id)}
                              className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition"
                            >
                              {isPlayingThis ? (
                                <>
                                  <Pause className="w-3.5 h-3.5 text-amber-400" /> বিরতি
                                </>
                              ) : (
                                <>
                                  <Play className="w-3.5 h-3.5 text-amber-400" /> পূর্বরূপ শুনুন
                                </>
                              )}
                            </button>

                            {!isApproved && (
                              <button
                                type="button"
                                onClick={() => handleApproveTutorialTrack(track.id)}
                                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-xs flex items-center gap-1.5 transition shadow"
                              >
                                <Check className="w-3.5 h-3.5 stroke-[3]" /> অনুমোদন ও সক্রিয় করুন
                              </button>
                            )}

                            {track.approvalStatus !== 'REJECTED' && !isApproved && (
                              <button
                                type="button"
                                onClick={() => handleRejectTutorialTrack(track.id)}
                                className="px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 text-xs font-semibold transition"
                              >
                                প্রত্যাখ্যান
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Legal Metadata Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-4 text-xs">
                          <div className="p-3 rounded-2xl bg-stone-950/60 border border-stone-800/80 space-y-1">
                            <span className="text-[11px] text-stone-500 block">লাইসেন্সের ধরন:</span>
                            <span className="font-bold text-amber-300 block">{track.licenseName}</span>
                            <a
                              href={track.licensePageUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] text-stone-400 hover:text-amber-300 underline"
                            >
                              <span>লাইসেন্স শর্তাবলী পড়ুন</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>

                          <div className="p-3 rounded-2xl bg-stone-950/60 border border-stone-800/80 space-y-1">
                            <span className="text-[11px] text-stone-500 block">উৎস ও লিঙ্ক:</span>
                            <span className="font-semibold text-stone-200 block truncate">{track.instruments.join(', ')}</span>
                            <a
                              href={track.originalSourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] text-stone-400 hover:text-amber-300 underline"
                            >
                              <span>মূল অডিও পৃষ্ঠা দেখুন</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>

                          <div className="p-3 rounded-2xl bg-stone-950/60 border border-stone-800/80 space-y-1">
                            <span className="text-[11px] text-stone-500 block">আইনি অনুমতি অডিট:</span>
                            <div className="flex flex-wrap gap-1 text-[10px]">
                              <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300">✓ ওয়েব ব্যবহার</span>
                              <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300">✓ কাটছাঁট/এডিট</span>
                              <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300">✓ উন্মুক্ত বিতরণ</span>
                            </div>
                            <span className="text-[10px] text-stone-400 block pt-0.5">
                              দৈর্ঘ্য: {track.durationSeconds}s • সাইজ: {Math.round(track.fileSizeBytes / 1024)} KB
                            </span>
                          </div>
                        </div>

                        {/* Attribution Note */}
                        <div className="mt-3 p-3 rounded-2xl bg-stone-950/40 border border-stone-800/60 text-[11px] text-stone-400 flex items-start gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-stone-300">প্রয়োজনীয় কৃতজ্ঞতা স্বীকার (Attribution): </span>
                            <span>{track.requiredAttributionWording}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Prohibited Sources & Theological Protection Note */}
              <div className="p-5 rounded-3xl bg-stone-950/70 border border-stone-800 text-xs text-stone-400 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>কঠোর আইনি ও ধর্মতাত্ত্বিক সুরক্ষা নিয়মাবলী</span>
                </div>
                <p>
                  ১. ইউটিউব, বাণিজ্যিক সিডি বা কপিরাইটযুক্ত অ্যাপ থেকে কোনো সঙ্গীত ডাউনলোড বা ব্যবহার করা সম্পূর্ণ নিষিদ্ধ।<br />
                  ২. কোনো কথ্য বাক্য, ধর্মীয় প্রচার, সাম্প্রদায়িক সুর বা বাণিজ্যিক উপাসনা গানের অনুকরণমুক্ত থাকা বাধ্যতামূলক।<br />
                  ৩. রেভাঃ অয়ন কুমার ঘোষের অনুমোদন ব্যতীত কোনো সুর স্বয়ংক্রিয়ভাবে পরিবর্তন হইবে না।
                </p>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: DEEP PUBLIC ACCESS MONITOR */}
          {/* ============================================================ */}
          {activeTab === 'public_access_monitor' && <DeepPublicAccessMonitor />}

          {/* ============================================================ */}
          {/* TAB: PERMANENT LINK AND QR CENTRE */}
          {/* ============================================================ */}
          {activeTab === 'permanent_link_qr' && <DeepPermanentLinkQrCentre />}

          {/* ============================================================ */}
          {/* TAB: BIBLE INTEGRITY MONITOR */}
          {/* ============================================================ */}
          {activeTab === 'bible_integrity' && <DeepBibleIntegrityMonitor />}

          {/* ============================================================ */}
          {/* TAB: SITE STEWARD & CONTINUOUS OPERATIONS */}
          {/* ============================================================ */}
          {activeTab === 'site_steward' && <DeepSiteStewardDashboard />}

          {/* ============================================================ */}
          {/* TAB: BENGALI CHRISTIAN KNOWLEDGE BASE GOVERNANCE */}
          {/* ============================================================ */}
          {activeTab === 'knowledge_base' && <DeepKnowledgeBaseControlPanel />}
        </main>
      </div>
    </AdminSecurityGate>
  );
};
