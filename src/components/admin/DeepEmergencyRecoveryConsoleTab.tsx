// ============================================================================
// BENGALI STUDY BIBLE — DEEP EMERGENCY RECOVERY CONSOLE TAB
// Integrated Recovery Control Interface within Deep Ministry Control Centre
// Final Authority: Rev. Ayan Kumar Ghosh (Level 5 Owner)
// ============================================================================

import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  RefreshCw,
  Power,
  RotateCcw,
  CheckCircle2,
  FileText,
  ExternalLink,
  Lock,
  Radio,
  Sliders,
  Play,
  Hammer,
} from 'lucide-react';
import { emergencyRecoveryService } from '../../services/emergencyRecoveryService';
import { AutopilotMode, AffectedService } from '../../types/emergencyRecovery';

export const DeepEmergencyRecoveryConsoleTab: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<AutopilotMode>(() => emergencyRecoveryService.getMode());
  const [circuitBreaker, setCircuitBreaker] = useState(() => emergencyRecoveryService.getCircuitBreakerStatus());
  const [problemDescription, setProblemDescription] = useState('');
  const [affectedService, setAffectedService] = useState<AffectedService>('PUBLIC_STUDY_BIBLE');
  const [commandOutput, setCommandOutput] = useState<string | null>(null);
  const [runbookResults, setRunbookResults] = useState<Array<{ step: number; name: string; status: 'PASS' | 'FAIL'; detail: string }> | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleModeChange = (newMode: AutopilotMode) => {
    try {
      const res = emergencyRecoveryService.setMode(newMode);
      setCurrentMode(newMode);
      alert(res.message);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleEmergencyStop = () => {
    if (window.confirm('আপনি কি নিশ্চিত যে সমস্ত স্বয়ংক্রিয় সংস্কার ও অটোপাইলট অবিলম্বে থামাতে চান (EMERGENCY STOP)?')) {
      emergencyRecoveryService.engageEmergencyStop('Owner triggered Emergency Stop from Control Centre');
      setCircuitBreaker(emergencyRecoveryService.getCircuitBreakerStatus());
      setCurrentMode(emergencyRecoveryService.getMode());
      setCommandOutput('🚨 EMERGENCY STOP সক্রিয় হয়েছে! সমস্ত স্বায়ত্তশাসিত অ্যাকশন স্থগিত করা হয়েছে।');
    }
  };

  const handleReleaseStop = () => {
    emergencyRecoveryService.releaseEmergencyStop();
    setCircuitBreaker(emergencyRecoveryService.getCircuitBreakerStatus());
    setCurrentMode(emergencyRecoveryService.getMode());
    setCommandOutput('✓ EMERGENCY STOP মুক্ত হয়েছে। Safe Autopilot পুনরুদ্ধার করা হয়েছে।');
  };

  const handleExecuteCommand = (action: any) => {
    setIsRunning(true);
    try {
      const res = emergencyRecoveryService.processEmergencyCommand({
        description: problemDescription || `Owner executed ${action}`,
        affectedService,
        diagnosticOnly: action === 'DIAGNOSE_ONLY',
        actionRequested: action,
      });
      setCommandOutput(`[${res.incidentId}] ${res.actionTaken}\n${res.diagnosis}`);
      setCircuitBreaker(emergencyRecoveryService.getCircuitBreakerStatus());
    } catch (err: any) {
      setCommandOutput(`❌ ত্রুটি: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleRunRunbook = () => {
    setIsRunning(true);
    try {
      const res = emergencyRecoveryService.executeAdminPortalRecoveryRunbook();
      setRunbookResults(res.results);
      setCommandOutput('✓ ১৫-ধাপের অ্যাডমিন পোর্টাল রিকভারি রানবুক সফলভাবে সম্পন্ন হয়েছে (১৫/১৫ পাস)।');
    } catch (err: any) {
      setCommandOutput(`❌ রানবুক ব্যর্থ: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 p-6 rounded-3xl border border-stone-700 shadow-xl text-white relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-red-900/80 border border-red-500 text-red-200 text-xs font-bold rounded-full flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                CONTROLLED LEVEL 4 RECOVERY
              </span>
              <span className="px-3 py-1 bg-amber-900/60 border border-amber-500 text-amber-200 text-xs font-bold rounded-full">
                REV. AYAN KUMAR GHOSH
              </span>
            </div>
            <h2 className="text-2xl font-bold font-serif">দীপ জরুরি পুনরুদ্ধার কেন্দ্র (Deep Emergency Recovery Console)</h2>
            <p className="text-stone-300 text-sm mt-1 max-w-2xl">
              মূল অ্যাডমিন বা ফ্রন্টএন্ড কোনো কারণে অচল হলেও দীপকে নির্দেশ দিন, রুটিন মেরামত অনুমোদন করুন এবং তাৎক্ষণিক এলকেজি রোলব্যাক নিশ্চিত করুন।
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <a
              href="/recovery/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl shadow-md transition flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>স্বাধীন কনসোল খুলুন (/recovery/)</span>
            </a>
            <a
              href="/status/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded-xl border border-stone-600 transition flex items-center gap-2"
            >
              <Radio className="w-4 h-4 text-emerald-400" />
              <span>পাবলিক স্ট্যাটাস পেজ (/status/)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Autopilot Mode & Circuit Breaker Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mode Selector */}
        <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 text-sm">
              <Sliders className="w-4 h-4 text-amber-600" />
              <span>অটোপাইলট অপারেশন মোড (Autopilot Mode)</span>
            </h3>
            <span
              className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                currentMode === 'SAFE_AUTOPILOT'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                  : currentMode === 'EMERGENCY_CONTAINMENT'
                  ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border border-red-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300'
              }`}
            >
              {currentMode}
            </span>
          </div>
          <p className="text-xs text-stone-500 mb-3 leading-relaxed">
            ডিফল্ট: <strong>Safe Autopilot</strong> (কেবল প্রাক-অনুমোদিত নিরাপদ ক্রিয়া সম্পাদন করে)।
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            {(['OBSERVE', 'ASSISTED', 'SAFE_AUTOPILOT', 'EMERGENCY_CONTAINMENT'] as AutopilotMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => handleModeChange(mode)}
                className={`py-2 px-3 rounded-xl border text-left transition flex items-center justify-between ${
                  currentMode === mode
                    ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-500 text-amber-900 dark:text-amber-200 font-bold'
                    : 'bg-stone-50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100'
                }`}
              >
                <span>{mode}</span>
                {currentMode === mode && <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />}
              </button>
            ))}
          </div>
        </div>

        {/* Circuit Breaker Status */}
        <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 text-sm">
              <Power className="w-4 h-4 text-red-500" />
              <span>সার্কিট ব্রেকার ও জরুরি নিয়ন্ত্রণ (Circuit Breaker)</span>
            </h3>
            <span
              className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                circuitBreaker.emergencyStopEngaged
                  ? 'bg-red-600 text-white'
                  : circuitBreaker.state === 'CLOSED'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
              }`}
            >
              {circuitBreaker.emergencyStopEngaged ? 'EMERGENCY STOP' : circuitBreaker.state}
            </span>
          </div>
          <p className="text-xs text-stone-500 mb-3 leading-relaxed">
            কোনো মেরামত পরপর ২ বার ব্যর্থ হলে সার্কিট ব্রেকার স্বয়ংক্রিয়ভাবে সক্রিয় হয় এবং রোলব্যাক কার্যকর করে।
          </p>
          <div className="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200 dark:border-stone-700 mb-3">
            <div className="text-xs">
              <span className="text-stone-500">ধারাবাহিক ব্যর্থতা: </span>
              <strong className="text-stone-900 dark:text-stone-100">{circuitBreaker.consecutiveFailures} / 2</strong>
            </div>
            {circuitBreaker.emergencyStopEngaged ? (
              <button
                onClick={handleReleaseStop}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition"
              >
                রিলিজ স্টপ (Resume)
              </button>
            ) : (
              <button
                onClick={handleEmergencyStop}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition flex items-center gap-1"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>জরুরি থামুন (EMERGENCY STOP)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 4: EMERGENCY COMMAND BOX */}
      <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm">
        <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-1 flex items-center gap-2">
          <Hammer className="w-5 h-5 text-amber-600" />
          <span>কোন অংশ কাজ করছে না—দীপকে জানান (Tell Deep What Is Broken)</span>
        </h3>
        <p className="text-xs text-stone-500 mb-4">
          সমস্যা চিহ্নিত করুন এবং প্রাক-অনুমোদিত নিরাপদ পুনরুদ্ধার ক্রিয়া নির্বাহ করুন। কোনো ঝুঁকিপূর্ণ শেল বা ডাটাবেস এক্সেস নেই।
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              প্রভাবিত পরিষেবা (Affected Service):
            </label>
            <select
              value={affectedService}
              onChange={(e) => setAffectedService(e.target.value as AffectedService)}
              className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100"
            >
              <option value="PUBLIC_STUDY_BIBLE">পাবলিক স্টাডি বাইবেল ফ্রন্টএন্ড (Public Site)</option>
              <option value="INSTALL_ROUTE">স্থায়ী ইনস্টল ঠিকানা (/install)</option>
              <option value="ADMIN_PORTAL">অ্যাডমিন পোর্টাল (Admin Portal)</option>
              <option value="SEARCH_ENGINE">শাস্ত্রীয় অনুসন্ধান ইঞ্জিন (Search Engine)</option>
              <option value="SERVICE_WORKER_CACHE">সার্ভিস ওয়ার্কার ক্যাশ (Service Worker)</option>
              <option value="DATABASE_STORAGE">ডাটাবেস ও সংরক্ষণ (Database / Storage)</option>
              <option value="CANON_DATASET">শাস্ত্রীয় ডেটাসেট (Canon Dataset)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              দ্রুত অ্যাকশন প্রিসেট (Quick Preset):
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleExecuteCommand('DIAGNOSE_ONLY')}
                className="px-3 py-2 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-200 text-xs font-medium rounded-lg border border-stone-300 dark:border-stone-700 transition"
              >
                🔍 রোগনির্ণয়
              </button>
              <button
                onClick={() => handleExecuteCommand('START_APPROVED_RECOVERY')}
                className="px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium rounded-lg transition"
              >
                🛠️ নিরাপদ মেরামত
              </button>
              <button
                onClick={() => handleExecuteCommand('ROLLBACK_TO_LKG')}
                className="px-3 py-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-medium rounded-lg transition flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>এলকেজি রোলব্যাক</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
            সমস্যার বিবরণ (Problem Description):
          </label>
          <textarea
            value={problemDescription}
            onChange={(e) => setProblemDescription(e.target.value)}
            rows={3}
            placeholder="উদাঃ Surge Unavailable 451 দেখাচ্ছে, অথবা ব্রাউজারে ইনস্টল বাটন কাজ করছে না..."
            className="w-full p-3 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100"
          />
        </div>

        {/* Output Console Box */}
        {commandOutput && (
          <div className="p-4 bg-stone-950 text-sky-400 font-mono text-xs rounded-xl border border-stone-800 overflow-x-auto whitespace-pre-wrap mb-4">
            {commandOutput}
          </div>
        )}

        {/* 15-Step Runbook Section */}
        <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-800">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                অ্যাডমিন পোর্টাল রিকভারি রানবুক (15-Step Recovery Runbook)
              </h4>
              <p className="text-xs text-stone-500">
                অ্যাডমিন পোর্টাল খুলতে ব্যর্থ হলে সম্পূর্ণ ১৫টি ধাপ যাচাই ও স্বয়ংক্রিয় প্রতিকার চালান।
              </p>
            </div>
            <button
              onClick={handleRunRunbook}
              disabled={isRunning}
              className="px-4 py-2 bg-stone-900 dark:bg-stone-800 hover:bg-stone-800 text-white text-xs font-bold rounded-xl border border-stone-700 transition flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 text-emerald-400" />
              <span>রানবুক চালান</span>
            </button>
          </div>

          {runbookResults && (
            <div className="space-y-1.5 max-h-48 overflow-y-auto bg-stone-50 dark:bg-stone-800/40 p-3 rounded-xl border border-stone-200 dark:border-stone-700">
              {runbookResults.map((step) => (
                <div key={step.step} className="flex items-center justify-between text-xs py-1 border-b border-stone-200/50 dark:border-stone-700/50 last:border-none">
                  <span className="font-medium text-stone-800 dark:text-stone-200">
                    {step.step}. {step.name}
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {step.detail}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
