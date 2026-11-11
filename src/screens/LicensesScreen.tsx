import React, { useState } from 'react';
import { ShieldCheck, Search, ExternalLink, Check, X } from 'lucide-react';
import { RightsService } from '../services/rightsService';

export const LicensesScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'open' | 'public_domain' | 'proprietary'>('all');

  const licenses = RightsService.getLicenses();

  const filteredLicenses = licenses.filter((lic) => {
    const matchesSearch =
      lic.licenseNameBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lic.licenseNameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lic.licenseCode.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterType === 'open') {
      return lic.licenseType.includes('Open') || lic.licenseType.includes('Creative') || lic.licenseCode.includes('MIT') || lic.licenseCode.includes('ISC');
    }
    if (filterType === 'public_domain') {
      return lic.licenseCode === 'Public Domain';
    }
    if (filterType === 'proprietary') {
      return lic.licenseCode === 'All Rights Reserved' || lic.licenseCode.includes('Quoting');
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-slate-800 dark:text-slate-100 font-sans">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-semibold mb-2 border border-teal-500/20">
          <ShieldCheck className="w-4 h-4" />
          <span>লাইসেন্স ও অনুমতি রেজিস্ট্রি</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 dark:text-gold-300">
          প্ল্যাটফর্ম লাইসেন্স নির্দেশিকা
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          বাংলা স্টাডি বাইবেলে ব্যবহৃত প্রতিটি শাস্ত্রীয় সংস্করণ, ফন্ট ও সফটওয়্যারের আইনি লাইসেন্স কোড ও অনুমোদনের পরিধি।
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="লাইসেন্সের নাম বা কোড দিয়ে খুঁজুন..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {(
            [
              { id: 'all', label: 'সকল লাইসেন্স' },
              { id: 'open', label: 'উন্মুক্ত লাইসেন্স' },
              { id: 'public_domain', label: 'পাবলিক ডোমেইন' },
              { id: 'proprietary', label: 'কপিরাইটযুক্ত / সীমাবদ্ধ' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              onClick={() => setFilterType(item.id)}
              className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                filterType === item.id
                  ? 'bg-navy-900 text-white dark:bg-gold-500 dark:text-navy-950 font-bold shadow-sm'
                  : 'bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* License Cards Grid */}
      <div className="space-y-4">
        {filteredLicenses.map((lic) => (
          <div
            key={lic.id}
            className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-navy-800">
              <div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-navy-700 mr-2">
                  {lic.licenseCode}
                </span>
                <span className="text-xs text-slate-400">{lic.licenseType}</span>
                <h3 className="font-serif font-bold text-base text-navy-950 dark:text-gold-300 mt-1">
                  {lic.licenseNameBn}
                </h3>
                <p className="text-xs text-slate-400">{lic.licenseNameEn}</p>
              </div>

              {lic.officialLicenseUrl && (
                <a
                  href={lic.officialLicenseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-sky-600 dark:text-sky-400 hover:underline shrink-0"
                >
                  <span>অফিসিয়াল লাইসেন্স টেক্সট</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Permissions Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4">
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-800 text-center">
                <span className="text-[10px] text-slate-400 block">বাণিজ্যিক ব্যবহার</span>
                <span className="text-xs font-semibold flex items-center justify-center gap-1 mt-0.5">
                  {lic.commercialUseAllowed ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <X className="w-3.5 h-3.5 text-rose-600" />
                  )}
                  {lic.commercialUseAllowed ? 'অনুমোদিত' : 'নিষিদ্ধ'}
                </span>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-800 text-center">
                <span className="text-[10px] text-slate-400 block">পুনঃবিতরণ</span>
                <span className="text-xs font-semibold flex items-center justify-center gap-1 mt-0.5">
                  {lic.redistributionAllowed ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <X className="w-3.5 h-3.5 text-rose-600" />
                  )}
                  {lic.redistributionAllowed ? 'অনুমোদিত' : 'নিষিদ্ধ'}
                </span>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-800 text-center">
                <span className="text-[10px] text-slate-400 block">ডাউনলোড / অফলাইন</span>
                <span className="text-xs font-semibold flex items-center justify-center gap-1 mt-0.5">
                  {lic.downloadAllowed ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <X className="w-3.5 h-3.5 text-rose-600" />
                  )}
                  {lic.downloadAllowed ? 'অনুমোদিত' : 'নিষিদ্ধ'}
                </span>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-800 text-center">
                <span className="text-[10px] text-slate-400 block">এআই ও আরএজি প্রসেসিং</span>
                <span className="text-xs font-semibold flex items-center justify-center gap-1 mt-0.5">
                  {lic.aiProcessingAllowed ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <X className="w-3.5 h-3.5 text-rose-600" />
                  )}
                  {lic.aiProcessingAllowed ? 'অনুমোদিত' : 'নিষিদ্ধ'}
                </span>
              </div>
            </div>

            {/* Notes & Verification */}
            {lic.notes && (
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50/70 dark:bg-navy-950/40 p-3 rounded-xl border border-slate-100 dark:border-navy-800 mb-2">
                {lic.notes}
              </p>
            )}

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2">
              <span>নিরীক্ষা উৎস: {lic.verificationSource || 'প্রাতিষ্ঠানিক রেকর্ড'}</span>
              <span>যাচাইকারী: {lic.verifiedBy || 'রেভা. অয়ন কুমার ঘোষ'}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tutorial Theme Music & Soundtrack Attribution Section */}
      <div className="mt-8 p-6 rounded-3xl bg-amber-500/10 dark:bg-navy-900 border border-amber-500/30 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-amber-500/20">
          <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-gold-400" />
          <h2 className="font-serif font-bold text-lg text-navy-950 dark:text-gold-300">
            দীপের টিউটোরিয়াল থিম মিউজিক ও অডিও কৃতজ্ঞতা স্বীকার
          </h2>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          “দীপ — আপনার বাইবেল অধ্যয়ন সহায়ক”-এর পরিচিতিমূলক টিউটোরিয়ালে ব্যবহৃত স্নিগ্ধ আবহ সঙ্গীতটি সম্পূর্ণ কপিরাইট-ঝুঁকিহীন উন্মুক্ত লাইসেন্সের অধীনে সংকলিত এবং রেভাঃ অয়ন কুমার ঘোষ কর্তৃক অনুমোদিত।
        </p>

        <div className="p-4 rounded-2xl bg-white dark:bg-navy-950 border border-amber-500/20 space-y-2 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="font-bold text-navy-950 dark:text-gold-300">
                ১. প্রভাতের অনুগ্রহ (Morning Grace - Soft Piano & Ambient Pad)
              </span>
              <span className="text-[11px] text-slate-400 block">
                সুরকার: Samuel Joseph / Peaceful Christian Meditations Project
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-semibold text-[11px] border border-emerald-500/30">
              Pixabay Content License (বিনামূল্যে উন্মুক্ত)
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-navy-900 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
            Music: "Morning Grace" by Samuel Joseph / Peaceful Christian Meditations, licensed under Pixabay Content License. Shortened to 10s with gentle fade-in and fade-out for Deep tutorial greeting.
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] pt-1">
            <a
              href="https://pixabay.com/service/license-summary/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:underline"
            >
              <span>লাইসেন্স নীতিমালার সারাংশ (Pixabay)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://pixabay.com/music/meditations-morning-grace-141209/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:underline"
            >
              <span>মূল অডিও পৃষ্ঠা</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Alternative Candidate Tracks */}
        <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1 pt-1">
          <p className="font-semibold text-slate-700 dark:text-slate-300">বিকল্প সংরক্ষিত সুর তালিকা:</p>
          <p>• "Peace on the Waters" by Jonathan Rivers, licensed under Mixkit Free License.</p>
          <p>• "Heavenly Dawn" (Arr. Traditional Sacred), dedicated to Public Domain under Creative Commons CC0 1.0 Universal.</p>
        </div>
      </div>
    </div>
  );
};
