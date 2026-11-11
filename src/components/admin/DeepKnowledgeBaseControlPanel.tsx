// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// “দীপ জ্ঞানভাণ্ডার নিয়ন্ত্রণ কেন্দ্র” (Deep Knowledge Base Control Centre)
// OWNER-ONLY DASHBOARD COMPONENT (SECTION 16 COMPLIANT)
// Administrator: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)
// ============================================================

import React, { useState } from 'react';
import {
  Library,
  CheckCircle2,
  AlertTriangle,
  Link,
  Eye,
  EyeOff,
  Trash2,
  Edit3,
  RefreshCw,
  ShieldCheck,
  Search,
  Filter,
  ExternalLink,
  BookOpen,
  Lock,
  X,
  Plus,
} from 'lucide-react';
import { deepKnowledgeBase } from '../../services/deepKnowledgeBaseService';
import { DeepKnowledgeResource, ResourceStatus } from '../../types/deepKnowledgeBase';

export const DeepKnowledgeBaseControlPanel: React.FC = () => {
  const [resources, setResources] = useState<DeepKnowledgeResource[]>(() =>
    deepKnowledgeBase.getAllResources(true)
  );
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedResource, setSelectedResource] = useState<DeepKnowledgeResource | null>(null);
  const [notice, setNotice] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  const refreshList = () => {
    setResources(deepKnowledgeBase.getAllResources(true));
  };

  const showNotification = (type: 'success' | 'error' | 'info', text: string) => {
    setNotice({ type, text });
    setTimeout(() => setNotice(null), 5000);
  };

  // Status metrics
  const metrics = {
    total: resources.length,
    approved: resources.filter((r) => r.status === 'APPROVED').length,
    externalOnly: resources.filter((r) => r.status === 'EXTERNAL_LINK_ONLY').length,
    awaitingReview: resources.filter((r) => r.status === 'PENDING_REVIEW' || r.approvalLevel === 'LEVEL_3_ADMIN_APPROVAL_REQUIRED').length,
    rejected: resources.filter((r) => r.status === 'REJECTED').length,
    theologicalReview: resources.filter((r) => r.isDisputedInterpretation).length,
    licenceUncertain: resources.filter((r) => r.copyrightStatus === 'UNCERTAIN').length,
    hidden: resources.filter((r) => r.status === 'HIDDEN').length,
    userReports: resources.reduce((sum, r) => sum + r.userReportsCount, 0),
  };

  // Actions
  const handleApprove = (id: string) => {
    deepKnowledgeBase.updateResourceStatus(id, 'APPROVED');
    refreshList();
    showNotification('success', 'উপাদানটি সফলভাবে অনুমোদিত ও উন্মুক্ত করা হয়েছে।');
  };

  const handleSetExternalLinkOnly = (id: string) => {
    deepKnowledgeBase.updateResourceStatus(id, 'EXTERNAL_LINK_ONLY');
    refreshList();
    showNotification('info', 'উপাদানটিকে শুধু বহিরাগত লিংক হিসেবে নির্ধারণ করা হয়েছে।');
  };

  const handleReject = (id: string) => {
    const reason = window.prompt('প্রত্যাখ্যানের কারণ লিখুন:', 'কপিরাইট বা ধর্মতাত্ত্বিক অস্পষ্টতা');
    if (reason) {
      deepKnowledgeBase.updateResourceStatus(id, 'REJECTED', reason);
      refreshList();
      showNotification('error', 'উপাদানটি প্রত্যাখ্যান করা হয়েছে।');
    }
  };

  const handleToggleHide = (id: string, currentStatus: ResourceStatus) => {
    const nextStatus = currentStatus === 'HIDDEN' ? 'APPROVED' : 'HIDDEN';
    deepKnowledgeBase.updateResourceStatus(id, nextStatus);
    refreshList();
    showNotification('info', nextStatus === 'HIDDEN' ? 'উপাদানটি সাময়িকভাবে লুকানো হয়েছে।' : 'উপাদানটি পুনরায় প্রদর্শন করা হয়েছে।');
  };

  const handleReverify = (id: string) => {
    deepKnowledgeBase.editResource(id, { reviewDate: new Date().toISOString().slice(0, 10), lastCheckedDate: new Date().toISOString().slice(0, 10) });
    refreshList();
    showNotification('success', 'উপাদানটির লাইসেন্স ও নিরাপত্তা সফলভাবে পুনরায় যাচাই করা হয়েছে।');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('আপনি কি নিশ্চিত যে এই উপাদানটি সম্পূর্ণ অপসারণ করতে চান?')) {
      deepKnowledgeBase.deleteResource(id);
      refreshList();
      showNotification('error', 'উপাদানটি সম্পূর্ণ মুছে ফেলা হয়েছে।');
    }
  };

  // Filter items
  const filtered = resources.filter((r) => {
    const matchesSearch =
      r.bengaliTitle.toLowerCase().includes(searchFilter.toLowerCase()) ||
      r.author.toLowerCase().includes(searchFilter.toLowerCase()) ||
      r.categoryLabelBn.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Notifications */}
      {notice && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between text-sm shadow-xl border ${
            notice.type === 'success'
              ? 'bg-emerald-950/80 text-emerald-200 border-emerald-700/50'
              : notice.type === 'error'
              ? 'bg-rose-950/80 text-rose-200 border-rose-700/50'
              : 'bg-amber-950/80 text-amber-200 border-amber-700/50'
          }`}
        >
          <p className="font-medium">{notice.text}</p>
          <button onClick={() => setNotice(null)} className="p-1 hover:bg-white/10 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-stone-950 via-stone-900 to-blue-950/40 border border-blue-800/40 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-2xl shadow-lg">
              📚
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">দীপ জ্ঞানভাণ্ডার নিয়ন্ত্রণ কেন্দ্র</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/40">
                  অ্যাডমিন গভর্নেন্স
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1">
                খ্রিষ্টীয় জ্ঞানভাণ্ডারের প্রতিটি গ্রন্থ, প্রবন্ধ ও লিংকের আইনি স্বত্ব, ধর্মতাত্ত্বিক ভারসাম্য ও অনুমোদন পরিচালনা।
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                deepKnowledgeBase.resetToInitialCollection();
                refreshList();
                showNotification('info', 'প্রারম্ভিক সংকলনে রিসেট সম্পন্ন হয়েছে।');
              }}
              className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold flex items-center gap-1.5 border border-stone-700"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>রিসেট ডিফল্ট</span>
            </button>
          </div>
        </div>

        {/* 6 Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mt-6 pt-5 border-t border-stone-800 text-center">
          <div className="bg-stone-900/60 p-3 rounded-2xl border border-stone-800">
            <span className="text-[10px] text-stone-400 block">মোট উপাদান</span>
            <span className="text-lg font-bold text-white">{metrics.total}টি</span>
          </div>
          <div className="bg-stone-900/60 p-3 rounded-2xl border border-stone-800">
            <span className="text-[10px] text-emerald-400 block">অনুমোদিত ও উন্মুক্ত</span>
            <span className="text-lg font-bold text-emerald-400">{metrics.approved}টি</span>
          </div>
          <div className="bg-stone-900/60 p-3 rounded-2xl border border-stone-800">
            <span className="text-[10px] text-blue-400 block">শুধু লিংক</span>
            <span className="text-lg font-bold text-blue-400">{metrics.externalOnly}টি</span>
          </div>
          <div className="bg-stone-900/60 p-3 rounded-2xl border border-stone-800">
            <span className="text-[10px] text-amber-400 block">অনুমোদনের অপেক্ষায়</span>
            <span className="text-lg font-bold text-amber-400">{metrics.awaitingReview}টি</span>
          </div>
          <div className="bg-stone-900/60 p-3 rounded-2xl border border-stone-800">
            <span className="text-[10px] text-purple-400 block">বিকল্প মত বিদ্যমান</span>
            <span className="text-lg font-bold text-purple-400">{metrics.theologicalReview}টি</span>
          </div>
          <div className="bg-stone-900/60 p-3 rounded-2xl border border-stone-800">
            <span className="text-[10px] text-rose-400 block">প্রত্যাখ্যাত</span>
            <span className="text-lg font-bold text-rose-400">{metrics.rejected}টি</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-900/50 p-3.5 rounded-2xl border border-stone-800">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="উপাদানের শিরোনাম, লেখক বা বিষয় খুঁজুন..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="bg-transparent text-xs text-white placeholder-stone-500 focus:outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-400">স্ট্যাটাস:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-stone-800 text-xs text-stone-200 px-3 py-1.5 rounded-xl border border-stone-700 focus:outline-none"
          >
            <option value="ALL">সকল স্ট্যাটাস</option>
            <option value="APPROVED">APPROVED (অনুমোদিত)</option>
            <option value="EXTERNAL_LINK_ONLY">EXTERNAL_LINK_ONLY (শুধু লিংক)</option>
            <option value="PENDING_REVIEW">PENDING_REVIEW (পর্যালোচনাধীন)</option>
            <option value="REJECTED">REJECTED (প্রত্যাখ্যাত)</option>
            <option value="HIDDEN">HIDDEN (লুকায়িত)</option>
          </select>
        </div>
      </div>

      {/* Admin Table */}
      <div className="bg-stone-900/50 border border-stone-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-stone-950/80 text-stone-400 uppercase tracking-wider text-[10px] border-b border-stone-800">
              <tr>
                <th className="px-4 py-3">উপাদান ও লেখক</th>
                <th className="px-4 py-3">বিভাগ ও ধারা</th>
                <th className="px-4 py-3">স্কোর</th>
                <th className="px-4 py-3">লাইসেন্স</th>
                <th className="px-4 py-3">স্ট্যাটাস</th>
                <th className="px-4 py-3 text-right">কার্যক্রম (Actions)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-stone-800/30 transition-colors">
                  <td className="px-4 py-3 font-medium">
                    <div className="text-white font-bold">{r.bengaliTitle}</div>
                    <div className="text-[10px] text-stone-400">{r.author} • {r.publisherOrOrg}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-stone-200">{r.categoryLabelBn}</div>
                    <div className="text-[10px] text-purple-400">{r.theologicalTradition}</div>
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-amber-400">
                    {r.suitabilityScore.totalScore}/১০০
                  </td>
                  <td className="px-4 py-3 text-stone-400 max-w-xs truncate" title={r.licenceName}>
                    {r.copyrightStatus}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        r.status === 'APPROVED'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : r.status === 'EXTERNAL_LINK_ONLY'
                          ? 'bg-blue-500/20 text-blue-400'
                          : r.status === 'REJECTED'
                          ? 'bg-rose-500/20 text-rose-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-1">
                    {r.status !== 'APPROVED' && (
                      <button
                        onClick={() => handleApprove(r.id)}
                        className="p-1.5 text-emerald-400 hover:bg-emerald-950/40 rounded-lg"
                        title="অনুমোদন করুন"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}
                    {r.status !== 'EXTERNAL_LINK_ONLY' && (
                      <button
                        onClick={() => handleSetExternalLinkOnly(r.id)}
                        className="p-1.5 text-blue-400 hover:bg-blue-950/40 rounded-lg"
                        title="শুধু লিংক হিসেবে রাখুন"
                      >
                        <Link className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleReverify(r.id)}
                      className="p-1.5 text-stone-300 hover:bg-stone-800 rounded-lg"
                      title="পুনরায় যাচাই করুন"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleToggleHide(r.id, r.status)}
                      className="p-1.5 text-amber-400 hover:bg-amber-950/40 rounded-lg"
                      title={r.status === 'HIDDEN' ? 'দৃশ্যমান করুন' : 'সাময়িকভাবে লুকিয়ে রাখুন'}
                    >
                      {r.status === 'HIDDEN' ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleReject(r.id)}
                      className="p-1.5 text-rose-400 hover:bg-rose-950/40 rounded-lg"
                      title="প্রত্যাখ্যান করুন"
                    >
                      <AlertTriangle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="p-1.5 text-stone-500 hover:text-rose-500 hover:bg-stone-800 rounded-lg"
                      title="সম্পূর্ণ সরিয়ে দিন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
