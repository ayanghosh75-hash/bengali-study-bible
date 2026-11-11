import React, { useState, useRef } from 'react';
import {
  X,
  User,
  Fingerprint,
  Download,
  Upload,
  LogOut,
  UserPlus,
  Building,
  Phone,
  Mail,
} from 'lucide-react';
import { AuthService } from '../services/authService';
import { WorkspaceService } from '../services/workspaceService';
import { UserProfile, ROLE_LABELS_BN } from '../types/auth';

interface UserAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth: () => void;
  onProfileUpdated: (user: UserProfile) => void;
}

export const UserAccountModal: React.FC<UserAccountModalProps> = ({
  isOpen,
  onClose,
  onOpenAuth,
  onProfileUpdated,
}) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => AuthService.getCurrentUser());
  const [accounts, setAccounts] = useState<UserProfile[]>(() => AuthService.getAllAccounts());
  const [biometricMessage, setBiometricMessage] = useState('');
  const [backupMessage, setBackupMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const stats = WorkspaceService.getWorkspaceStats();

  const handleToggleBiometrics = async () => {
    setBiometricMessage('');
    if (currentUser.hasBiometrics) {
      const updated = AuthService.updateProfile({ hasBiometrics: false });
      setCurrentUser(updated);
      onProfileUpdated(updated);
      setBiometricMessage('বায়োমেট্রিক আনলক নিষ্ক্রিয় করা হয়েছে');
    } else {
      const res = await AuthService.registerBiometrics();
      if (res.success) {
        const updated = AuthService.getCurrentUser();
        setCurrentUser(updated);
        onProfileUpdated(updated);
        setBiometricMessage('ফিঙ্গারপ্রিন্ট সফলভাবে সক্রিয় হয়েছে!');
      } else {
        setBiometricMessage(res.error || 'বায়োমেট্রিক সক্রিয় করা সম্ভব হয়নি');
      }
    }
  };

  const handleSwitchAccount = (userId: string) => {
    const switched = AuthService.switchAccount(userId);
    setCurrentUser(switched);
    setAccounts(AuthService.getAllAccounts());
    onProfileUpdated(switched);
  };

  const handleLogout = () => {
    const guest = AuthService.resetToGuest();
    setCurrentUser(guest);
    onProfileUpdated(guest);
    onClose();
  };

  const handleExportBackup = () => {
    const backupData = WorkspaceService.exportCompleteWorkspace();
    const dataStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bengali_study_bible_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setBackupMessage('সম্পূর্ণ স্টাডি ডেটা সফলভাবে ডাউনলোড হয়েছে!');
    setTimeout(() => setBackupMessage(''), 3000);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        const res = WorkspaceService.importCompleteWorkspace(json);
        if (res.success) {
          setBackupMessage('ডেটা সফলভাবে রিস্টোর হয়েছে! পৃষ্ঠাটি রিফ্রেশ হচ্ছে...');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          setBackupMessage(res.error || 'ডেটা রিস্টোর ব্যর্থ হয়েছে');
        }
      } catch {
        setBackupMessage('অবৈধ JSON ফাইল');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-navy-900 w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 dark:border-navy-700 flex flex-col max-h-[92vh] overflow-hidden text-slate-800 dark:text-slate-100">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-navy-800 flex items-center justify-between bg-slate-50/70 dark:bg-navy-950/60">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-navy-950 dark:text-white">
                ব্যবহারকারী প্রোফাইল ও নিরাপত্তা
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                ব্যক্তিগত স্টাডি একাউন্ট ও ডেটা ব্যাকআপ
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {/* User Profile Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-navy-950 dark:to-navy-850 border border-slate-200/80 dark:border-navy-700 flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-gold-400 to-amber-600 text-navy-950 font-bold text-xl flex items-center justify-center shadow-md shadow-gold-500/20 flex-shrink-0">
                {currentUser.displayName.charAt(0) || 'অ'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-serif font-bold text-base text-navy-950 dark:text-white">
                    {currentUser.displayName}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 border border-gold-500/30">
                    {ROLE_LABELS_BN[currentUser.role] || currentUser.role}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {currentUser.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {currentUser.email}
                    </span>
                  )}
                  {currentUser.phoneNumber && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {currentUser.phoneNumber}
                    </span>
                  )}
                  {currentUser.churchOrOrg && (
                    <span className="flex items-center gap-1">
                      <Building className="w-3 h-3" />
                      {currentUser.churchOrOrg}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {currentUser.isGuest ? (
              <button
                onClick={() => {
                  onClose();
                  onOpenAuth();
                }}
                className="px-3.5 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs transition shadow-sm"
              >
                লগইন / নিবন্ধন
              </button>
            ) : (
              <button
                onClick={handleLogout}
                title="প্রস্থান"
                className="p-2 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Biometrics Toggle (Fingerprint / Face ID) */}
          {!currentUser.isGuest && (
            <div className="p-4 rounded-2xl bg-white dark:bg-navy-800/80 border border-slate-200 dark:border-navy-700 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gold-500/10 text-gold-500 flex items-center justify-center">
                    <Fingerprint className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-navy-950 dark:text-white">
                      মোবাইল বায়োমেট্রিক আনলক (Fingerprint / Face)
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      পাসওয়ার্ড ছাড়া এক স্পর্শে ফোনে “আমার স্টাডি” খুলুন
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleToggleBiometrics}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                    currentUser.hasBiometrics
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : 'bg-gold-500 hover:bg-gold-600 text-navy-950 shadow-xs'
                  }`}
                >
                  {currentUser.hasBiometrics ? 'সক্রিয় ✓' : 'চালু করুন'}
                </button>
              </div>

              {biometricMessage && (
                <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 pt-1">
                  {biometricMessage}
                </p>
              )}
            </div>
          )}

          {/* Personal Workspace Stats Overview */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              “আমার স্টাডি” সংগ্রহশালা পরিসংখ্যান
            </h5>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200/60 dark:border-navy-800">
                <span className="block font-bold text-base text-gold-500">{stats.bookmarksCount}</span>
                <span className="text-[10px] text-slate-500">বুকমার্ক</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200/60 dark:border-navy-800">
                <span className="block font-bold text-base text-blue-500">{stats.notesCount}</span>
                <span className="text-[10px] text-slate-500">নোট</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200/60 dark:border-navy-800">
                <span className="block font-bold text-base text-emerald-500">{stats.sermonsCount}</span>
                <span className="text-[10px] text-slate-500">সার্মন</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200/60 dark:border-navy-800">
                <span className="block font-bold text-base text-purple-500">{stats.projectsCount}</span>
                <span className="text-[10px] text-slate-500">প্রজেক্ট</span>
              </div>
            </div>
          </div>

          {/* Backup & Restore Tools */}
          <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-navy-950/60 border border-amber-200/60 dark:border-navy-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-bold text-xs text-navy-950 dark:text-white">
                  সম্পূর্ণ স্টাডি ডেটা সংরক্ষণ ও ব্যাকআপ (Offline Vault)
                </h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  আপনার সকল নোট, সার্মন, প্রিয় বই ও রিসার্চ প্রজেক্ট এক ফাইলে সংরক্ষণ করুন
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleExportBackup}
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-gold-600 transition flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>সকল ডেটা ডাউনলোড (JSON)</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-gold-600 transition flex items-center gap-1.5 shadow-xs"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>ডেটা রিস্টোর (Import)</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImportBackup}
                accept=".json"
                className="hidden"
              />
            </div>

            {backupMessage && (
              <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                {backupMessage}
              </p>
            )}
          </div>

          {/* Account Switcher on this Device */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                এই ডিভাইসে সংরক্ষিত একাউন্টসমূহ
              </h5>
              <button
                onClick={() => {
                  onClose();
                  onOpenAuth();
                }}
                className="text-xs font-bold text-gold-600 dark:text-gold-400 hover:underline flex items-center gap-1"
              >
                <UserPlus className="w-3 h-3" />
                <span>নতুন একাউন্ট যোগ করুন</span>
              </button>
            </div>

            <div className="space-y-1.5">
              {accounts.map((acc) => {
                const isActive = acc.id === currentUser.id;
                return (
                  <div
                    key={acc.id}
                    onClick={() => !isActive && handleSwitchAccount(acc.id)}
                    className={`p-3 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-gold-500/10 border-gold-500/40 text-navy-950 dark:text-white'
                        : 'bg-white dark:bg-navy-800 border-slate-200 dark:border-navy-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="w-7 h-7 rounded-lg bg-gold-500/20 text-gold-600 flex items-center justify-center font-bold text-xs">
                        {acc.displayName.charAt(0)}
                      </div>
                      <div>
                        <span className="text-xs font-bold block">{acc.displayName}</span>
                        <span className="text-[10px] text-slate-400 block">
                          {ROLE_LABELS_BN[acc.role] || acc.role}
                        </span>
                      </div>
                    </div>

                    {isActive && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                        সক্রিয় একাউন্ট
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
