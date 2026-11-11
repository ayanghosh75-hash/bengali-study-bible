import React, { useState } from 'react';
import { AlertTriangle, Mail, Send, CheckCircle2, ArrowLeft } from 'lucide-react';
import { RightsService } from '../services/rightsService';

interface CopyrightConcernScreenProps {
  onBack?: () => void;
}

export const CopyrightConcernScreen: React.FC<CopyrightConcernScreenProps> = ({ onBack }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [capacity, setCapacity] = useState('স্বত্বাধিকারী নিজে');
  const [resourceUrl, setResourceUrl] = useState('');
  const [workDescription, setWorkDescription] = useState('');
  const [concern, setConcern] = useState('');
  const [supportingInfo, setSupportingInfo] = useState('');
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !concern.trim()) return;

    const record = RightsService.submitConcern({
      complainantName: name.trim(),
      complainantEmail: email.trim(),
      complainantOrg: org.trim() || undefined,
      rightsHolderOrRepresentative: capacity,
      resourceUrl: resourceUrl.trim(),
      copyrightedWorkDescription: workDescription.trim(),
      concernDescription: concern.trim(),
      supportingInformation: supportingInfo.trim() || undefined,
    });

    setSubmittedId(record.id);
  };

  const mailtoLink = `mailto:ayanghosh75@gmail.com?subject=${encodeURIComponent(
    `[Copyright Concern] ${submittedId || 'New Inquiry'} - ${name}`
  )}&body=${encodeURIComponent(
    `নাম: ${name}\nইমেইল: ${email}\nপ্রতিষ্ঠান: ${org}\nভূমিকা: ${capacity}\nইউআরএল/উপাদান: ${resourceUrl}\nমূল কাজের বিবরণ: ${workDescription}\nআপত্তির বিবরণ: ${concern}\nসাপোর্টিং তথ্য: ${supportingInfo}\n\nরেফারেন্স আইডি: ${submittedId || ''}`
  )}`;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-slate-800 dark:text-slate-100 font-sans">
      {onBack && (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 mb-4 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>ফিরে যান</span>
        </button>
      )}

      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-semibold mb-2 border border-rose-500/20">
          <AlertTriangle className="w-4 h-4" />
          <span>স্বত্বাধিকার নোটিশ ও অপসারণ ফর্ম</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 dark:text-gold-300">
          কপিরাইট সংক্রান্ত আপত্তি দাখিল
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          বাংলা স্টাডি বাইবেল যেকোনো বৌদ্ধিক অধিকার লঙ্ঘন প্রতিরোধে প্রতিশ্রুতিবদ্ধ। আপনার আপত্তি সরাসরি প্রকল্প পরিচালক <strong>রেভা. অয়ন কুমার ঘোষ</strong>-এর নিকট প্রেরিত হবে।
        </p>
      </div>

      {submittedId ? (
        <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-100 shadow-sm text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-lg mb-1">
            আপনার আপত্তি সফলভাবে লিপিবদ্ধ হয়েছে
          </h3>
          <p className="text-xs text-emerald-700 dark:text-emerald-300 mb-4">
            অভিযোগ ট্র্যাকিং আইডি: <strong className="font-mono">{submittedId}</strong>
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">
            আমরা অনতিবিলম্বে এটি পর্যালোচনা করব। তাৎক্ষণিক নিশ্চিতকরণের জন্য আপনি নীচের বোতামটি চেপে সরাসরি একটি পূর্ব-বিন্যাসকৃত ইমেইল প্রেরণ করতে পারেন।
          </p>

          <a
            href={mailtoLink}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>অফিসিয়াল ইমেইলে অনুলিপি পাঠান (ayanghosh75@gmail.com)</span>
          </a>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm space-y-4 text-xs"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                আপনার নাম *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="পূর্ণ নাম লিখুন"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                ইমেইল ঠিকানা *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                প্রতিষ্ঠান বা সংস্থা (প্রযোজ্য ক্ষেত্রে)
              </label>
              <input
                type="text"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                placeholder="সংস্থার নাম"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                আপনার ভূমিকা বা মর্যাদা *
              </label>
              <select
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
              >
                <option value="স্বত্বাধিকারী নিজে">স্বত্বাধিকারী নিজে (Original Rights Holder)</option>
                <option value="অনুমোদিত প্রতিনিধি">অনুমোদিত আইনি প্রতিনিধি (Authorized Representative)</option>
                <option value="প্রকাশনা প্রতিনিধি">প্রকাশনা সংস্থার প্রতিনিধি (Publisher)</option>
                <option value="সচেতন ব্যবহারকারী">সচেতন পাঠক / ব্যবহারকারী (User/Researcher)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
              অ্যাপ্লিকেশনের সংশ্লিষ্ট ইউআরএল বা উপাদানের বিবরণ *
            </label>
            <input
              type="text"
              required
              value={resourceUrl}
              onChange={(e) => setResourceUrl(e.target.value)}
              placeholder="যেমন: বাইবেল অনুবাদ, মথি অধ্যায়, অথবা নির্দিষ্ট কমেন্টারি পৃষ্ঠা"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
              মূল কপিরাইটযুক্ত কাজের বিবরণ *
            </label>
            <input
              type="text"
              required
              value={workDescription}
              onChange={(e) => setWorkDescription(e.target.value)}
              placeholder="আসল প্রকাশনার নাম, আইএসবিএন, বা কপিরাইট রেজিস্ট্রেশন নম্বর"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
              আপত্তির বিস্তারিত কারণ ও ব্যাখ্যা *
            </label>
            <textarea
              required
              rows={4}
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
              placeholder="কেন আপনি মনে করছেন এই সামগ্রীটির অধিকার লঙ্ঘিত হয়েছে? বিস্তারিত লিখুন..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
              অতিরিক্ত তথ্য বা যোগাযোগের নির্দেশনা (ঐচ্ছিক)
            </label>
            <input
              type="text"
              value={supportingInfo}
              onChange={(e) => setSupportingInfo(e.target.value)}
              placeholder="যেকোনো অতিরিক্ত মন্তব্য বা নথি প্রেরণের ইচ্ছা"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 text-[11px] text-slate-500 dark:text-slate-400">
            আমি বিশ্বস্ততার সাথে নিশ্চিত করছি যে প্রদত্ত তথ্য সত্য এবং আমি স্বত্বাধিকারী অথবা তার বৈধ প্রতিনিধি।
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-navy-950 dark:bg-gold-500 hover:bg-navy-900 dark:hover:bg-gold-400 text-white dark:text-navy-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>আপত্তি দাখিল করুন</span>
          </button>
        </form>
      )}
    </div>
  );
};
