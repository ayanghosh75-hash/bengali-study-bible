import React, { useState } from 'react';
import {
  Church,
  Users,
  BookOpen,
  Calendar,
  Megaphone,
  HeartHandshake,
  Shield,
  Plus,
  Lock,
  UserCheck,
} from 'lucide-react';
import { ChurchService } from '../services/churchService';
import { ChurchTenant, ChurchRole } from '../types/church';
import { toBengaliDigits } from '../utils/bengaliNumerals';

export const ChurchToolsScreen: React.FC = () => {
  const [activeChurch, setActiveChurch] = useState<ChurchTenant>(ChurchService.getActiveChurch());
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'sermons' | 'plans' | 'prayers' | 'audit'>('overview');
  const [isNewChurchModalOpen, setIsNewChurchModalOpen] = useState(false);
  const [newChurchName, setNewChurchName] = useState('');
  const [newDenomination, setNewDenomination] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newOwnerName, setNewOwnerName] = useState('');

  // Add Member Form State
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<ChurchRole>('member');
  const [newMemberContact, setNewMemberContact] = useState('');
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  // New Announcement Form State
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnContent, setNewAnnContent] = useState('');
  const [isAddAnnOpen, setIsAddAnnOpen] = useState(false);

  const handleCreateChurch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChurchName.trim() || !newOwnerName.trim()) return;
    const created = ChurchService.createChurch({
      nameBn: newChurchName,
      denominationBn: newDenomination,
      contactEmail: newEmail || 'pastor@example.org',
      ownerNameBn: newOwnerName,
    });
    setActiveChurch(created);
    setIsNewChurchModalOpen(false);
    setNewChurchName('');
    setNewDenomination('');
    setNewEmail('');
    setNewOwnerName('');
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    ChurchService.addMember(activeChurch.id, {
      nameBn: newMemberName,
      role: newMemberRole,
      emailOrPhone: newMemberContact || '—',
    });
    setActiveChurch(ChurchService.getActiveChurch());
    setIsAddMemberOpen(false);
    setNewMemberName('');
    setNewMemberContact('');
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle.trim() || !newAnnContent.trim()) return;
    ChurchService.addAnnouncement(
      activeChurch.id,
      newAnnTitle,
      newAnnContent,
      activeChurch.members[0]?.nameBn || 'পালক'
    );
    setActiveChurch(ChurchService.getActiveChurch());
    setIsAddAnnOpen(false);
    setNewAnnTitle('');
    setNewAnnContent('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Church className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-100">
                  {activeChurch.nameBn}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>সুরক্ষিত প্রাইভেট টেন্যান্ট</span>
                </span>
              </div>
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                {activeChurch.denominationBn} • যোগাযোগ: {activeChurch.contactEmail}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsNewChurchModalOpen(true)}
              className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-medium flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন মণ্ডলী স্পেস</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap border-b border-stone-200 dark:border-stone-800 mt-8 space-x-2 sm:space-x-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-3 font-medium text-sm transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-amber-600 text-amber-600 dark:text-amber-400 dark:border-amber-400'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <Church className="w-4 h-4" />
            <span>সারসংক্ষেপ</span>
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`pb-3 px-3 font-medium text-sm transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'members'
                ? 'border-amber-600 text-amber-600 dark:text-amber-400 dark:border-amber-400'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>সদস্য ও দায়িত্ব ({activeChurch.members.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('sermons')}
            className={`pb-3 px-3 font-medium text-sm transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'sermons'
                ? 'border-amber-600 text-amber-600 dark:text-amber-400 dark:border-amber-400'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>প্রচার আর্কাইভ ({activeChurch.sermons.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className={`pb-3 px-3 font-medium text-sm transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'plans'
                ? 'border-amber-600 text-amber-600 dark:text-amber-400 dark:border-amber-400'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>পাঠ পরিকল্পনা ({activeChurch.readingPlans.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('prayers')}
            className={`pb-3 px-3 font-medium text-sm transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'prayers'
                ? 'border-amber-600 text-amber-600 dark:text-amber-400 dark:border-amber-400'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>প্রার্থনার বিষয় ({activeChurch.prayerRequests.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`pb-3 px-3 font-medium text-sm transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'audit'
                ? 'border-amber-600 text-amber-600 dark:text-amber-400 dark:border-amber-400'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>নিরাপত্তা অডিট লগ</span>
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Announcements Banner */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-amber-600" />
                <span>মণ্ডলীর সাম্প্রতিক নোটিশ ও ঘোষণা</span>
              </h3>
              <button
                onClick={() => setIsAddAnnOpen(true)}
                className="text-xs px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 font-medium"
              >
                + নতুন ঘোষণা
              </button>
            </div>

            {activeChurch.announcements.length > 0 ? (
              <div className="space-y-3">
                {activeChurch.announcements.map((ann) => (
                  <div
                    key={ann.id}
                    className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/40"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                        {ann.titleBn}
                      </h4>
                      <span className="text-xs text-stone-400">
                        প্রকাশক: {ann.authorNameBn}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                      {ann.contentBn}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-stone-400 py-4 text-center">
                কোনো সাম্প্রতিক ঘোষণা নেই।
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: MEMBERS */}
      {activeTab === 'members' && (
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-amber-600" />
              <span>মণ্ডলীর দায়িত্বশীল ও সদস্যবৃন্দ</span>
            </h3>
            <button
              onClick={() => setIsAddMemberOpen(true)}
              className="text-xs px-3 py-1.5 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700"
            >
              + নতুন সদস্য যুক্ত করুন
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-stone-50 dark:bg-stone-800/60 text-xs font-semibold text-stone-500 border-b border-stone-200 dark:border-stone-800">
                <tr>
                  <th className="py-3 px-4">নাম</th>
                  <th className="py-3 px-4">দায়িত্ব / পদবি</th>
                  <th className="py-3 px-4">যোগাযোগ</th>
                  <th className="py-3 px-4">যোগদানের তারিখ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-stone-700 dark:text-stone-300 text-xs">
                {activeChurch.members.map((mem) => (
                  <tr key={mem.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                    <td className="py-3 px-4 font-semibold text-stone-900 dark:text-stone-100">
                      {mem.nameBn}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-300">
                        {mem.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono">{mem.emailOrPhone}</td>
                    <td className="py-3 px-4 text-stone-400">
                      {new Date(mem.joinedAt).toLocaleDateString('bn-BD')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SERMONS */}
      {activeTab === 'sermons' && (
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-600" />
              <span>মণ্ডলীর সংরক্ষিত প্রচার আর্কাইভ</span>
            </h3>
          </div>

          <div className="space-y-3">
            {activeChurch.sermons.map((sermon) => (
              <div
                key={sermon.id}
                className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/40"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                    {sermon.titleBn}
                  </h4>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 font-mono">
                    {sermon.passageRef}
                  </span>
                </div>
                <div className="text-xs text-stone-500 mb-2">
                  প্রচারক: {sermon.preacherBn} • তারিখ: {sermon.dateBn}
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  {sermon.summaryBn}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PLANS */}
      {activeTab === 'plans' && (
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm">
          <h3 className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-600" />
            <span>মণ্ডলীর যৌথ বাইবেল পাঠ পরিকল্পনা</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeChurch.readingPlans.map((p) => (
              <div key={p.id} className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">{p.titleBn}</h4>
                  <span className="text-xs font-semibold text-amber-600">{toBengaliDigits(p.durationDays)} দিন</span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400">{p.descriptionBn}</p>
                <div className="mt-3 text-xs text-stone-400 font-medium">
                  অংশগ্রহণকারী সদস্য: {toBengaliDigits(p.activeMembersCount)} জন
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: PRAYERS */}
      {activeTab === 'prayers' && (
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm">
          <h3 className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-amber-600" />
            <span>প্রার্থনার বিষয় ও মধ্যস্থতা</span>
          </h3>
          <div className="space-y-3">
            {activeChurch.prayerRequests.map((pr) => (
              <div key={pr.id} className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/40">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">{pr.titleBn}</h4>
                  <span className="text-xs text-stone-400">অনুরোধকারী: {pr.requesterNameBn}</span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400">{pr.detailsBn}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: AUDIT */}
      {activeTab === 'audit' && (
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm">
          <h3 className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-600" />
            <span>মাল্টি-টেন্যান্ট নিরাপত্তা ও অডিট হিস্টোরি</span>
          </h3>
          <div className="space-y-2">
            {activeChurch.auditLogs.map((log) => (
              <div key={log.id} className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/40 text-xs flex items-center justify-between border border-stone-100 dark:border-stone-800">
                <div>
                  <span className="font-medium text-stone-800 dark:text-stone-200">{log.actionBn}</span>
                  <span className="text-stone-400 ml-2">({log.performedByBn})</span>
                </div>
                <span className="text-stone-400 font-mono text-[11px]">
                  {new Date(log.timestamp).toLocaleTimeString('bn-BD')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: CREATE CHURCH */}
      {isNewChurchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 rounded-2xl max-w-md w-full p-6 border border-stone-200 dark:border-stone-800 shadow-xl space-y-4 animate-scale-in">
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-serif">
              নতুন মণ্ডলী ডিজিটাল স্পেস খুলুন
            </h3>
            <form onSubmit={handleCreateChurch} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">মণ্ডলীর পূর্ণ নাম *</label>
                <input
                  type="text"
                  required
                  value={newChurchName}
                  onChange={(e) => setNewChurchName(e.target.value)}
                  placeholder="উদা: বেথেল ব্যাপটিস্ট চার্চ"
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">ডিনোমিনেশন বা মণ্ডলীর ধারা</label>
                <input
                  type="text"
                  value={newDenomination}
                  onChange={(e) => setNewDenomination(e.target.value)}
                  placeholder="উদা: ফেলোশিপ ব্যাপটিস্ট / অ্যাসেম্বলিজ অব গড"
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">পালক / প্রধান দায়িত্বশীলের নাম *</label>
                <input
                  type="text"
                  required
                  value={newOwnerName}
                  onChange={(e) => setNewOwnerName(e.target.value)}
                  placeholder="উদা: পালক টিমোথি বাড়ৈ"
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">অফিসিয়াল ইমেইল</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="church@example.org"
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsNewChurchModalOpen(false)}
                  className="px-3 py-2 rounded-lg text-stone-600 hover:bg-stone-100 dark:hover:bg-stone-800 font-medium"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700"
                >
                  স্পেস তৈরি করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD MEMBER */}
      {isAddMemberOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 rounded-2xl max-w-md w-full p-6 border border-stone-200 dark:border-stone-800 shadow-xl space-y-4 animate-scale-in">
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-serif">
              মণ্ডলীর নতুন সদস্য যুক্ত করুন
            </h3>
            <form onSubmit={handleAddMember} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">সদস্যের নাম *</label>
                <input
                  type="text"
                  required
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="উদা: ডিকন পিতর মণ্ডল"
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">ভূমিকা / পদবি</label>
                <select
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value as ChurchRole)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                >
                  <option value="pastor">পালক (Pastor)</option>
                  <option value="admin">অ্যাডমিনিস্ট্রেটর (Admin)</option>
                  <option value="leader">পরিচর্যা নেতা (Leader)</option>
                  <option value="teacher">শিক্ষক / সানডে স্কুল (Teacher)</option>
                  <option value="member">নিয়মিত সদস্য (Member)</option>
                  <option value="viewer">দর্শক (Viewer)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">ইমেইল বা মোবাইল নম্বর</label>
                <input
                  type="text"
                  value={newMemberContact}
                  onChange={(e) => setNewMemberContact(e.target.value)}
                  placeholder="উদা: +880 1711 ... বা email@example.com"
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsAddMemberOpen(false)}
                  className="px-3 py-2 rounded-lg text-stone-600 hover:bg-stone-100 dark:hover:bg-stone-800 font-medium"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700"
                >
                  সদস্য যুক্ত করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD ANNOUNCEMENT */}
      {isAddAnnOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 rounded-2xl max-w-md w-full p-6 border border-stone-200 dark:border-stone-800 shadow-xl space-y-4 animate-scale-in">
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-serif">
              মণ্ডলীর নতুন ঘোষণা প্রকাশ করুন
            </h3>
            <form onSubmit={handleAddAnnouncement} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">ঘোষণার শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={newAnnTitle}
                  onChange={(e) => setNewAnnTitle(e.target.value)}
                  placeholder="উদা: বিশেষ যুব সমাবেশ ও বাইবেল অধ্যয়ন"
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">বিস্তারিত বিবরণ *</label>
                <textarea
                  required
                  rows={4}
                  value={newAnnContent}
                  onChange={(e) => setNewAnnContent(e.target.value)}
                  placeholder="তারিখ, সময়, স্থান ও প্রয়োজনীয় নির্দেশনাবলী..."
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsAddAnnOpen(false)}
                  className="px-3 py-2 rounded-lg text-stone-600 hover:bg-stone-100 dark:hover:bg-stone-800 font-medium"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700"
                >
                  ঘোষণা প্রকাশ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
