import React, { useState } from 'react';
import { X, Download, Share2, QrCode, Check, Smartphone, Monitor, CreditCard, Image as ImageIcon } from 'lucide-react';
import { AnalyticsService } from '../services/analyticsService';

interface SharePosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInstall?: () => void;
  showInstallButton?: boolean;
}

type MediaFormat = 'poster' | 'slide' | 'social' | 'card' | 'print_qr';

interface MediaOption {
  id: MediaFormat;
  labelBn: string;
  subBn: string;
  filePath: string;
  downloadName: string;
  icon: React.ElementType;
}

export const SharePosterModal: React.FC<SharePosterModalProps> = ({
  isOpen,
  onClose,
  onOpenInstall,
  showInstallButton = false,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<MediaFormat>('poster');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const currentOrigin =
    typeof window !== 'undefined' &&
    window.location.origin.startsWith('https://') &&
    !window.location.origin.includes('localhost')
      ? window.location.origin
      : 'https://bengalistudybible.com';
  const permanentDomain = 'https://bengalistudybible.com';
  const installUrl = `${currentOrigin}/install`;

  const mediaOptions: MediaOption[] = [
    {
      id: 'poster',
      labelBn: 'চার্চ ও WhatsApp পোস্টার',
      subBn: 'A3/A4 দেয়াল পোস্টার ও স্ট্যাটাস (JPG)',
      filePath: '/bengali-study-bible-ad.jpg',
      downloadName: 'bengali-study-bible-poster.jpg',
      icon: ImageIcon,
    },
    {
      id: 'slide',
      labelBn: 'সার্মন প্রজেক্টর স্লাইড',
      subBn: 'উপাসনা ও ঘোষণার 16:9 Full HD স্লাইড (PNG)',
      filePath: '/qr-codes/bengali-study-bible-sermon-slide-16x9.png',
      downloadName: 'bengali-study-bible-sermon-slide-16x9.png',
      icon: Monitor,
    },
    {
      id: 'social',
      labelBn: 'সোশ্যাল মিডিয়া স্কয়ার',
      subBn: 'WhatsApp DP, Facebook ও ইনস্টাগ্রাম 1:1 (PNG)',
      filePath: '/qr-codes/bengali-study-bible-social-square.png',
      downloadName: 'bengali-study-bible-social-square.png',
      icon: QrCode,
    },
    {
      id: 'card',
      labelBn: 'পকেট ভিজিটিং কার্ড',
      subBn: '3.5" x 2" বিলি করার প্রচার কার্ড (PNG)',
      filePath: '/qr-codes/bengali-study-bible-visiting-card.png',
      downloadName: 'bengali-study-bible-visiting-card.png',
      icon: CreditCard,
    },
    {
      id: 'print_qr',
      labelBn: 'আল্ট্রা HD প্রেস QR কোড',
      subBn: '3000px 300 DPI ফ্লেক্স ও প্রকাশনা (PNG)',
      filePath: '/qr-codes/qr-bengalistudybible-3000px.png',
      downloadName: 'bengali-study-bible-qr-3000px.png',
      icon: QrCode,
    },
  ];

  const currentMedia = mediaOptions.find((m) => m.id === selectedFormat) || mediaOptions[0];

  const shareText = `✝️ বাংলা স্টাডি বাইবেল (Bengali Study Bible)\nপেশাদার ও শান্তিপূর্ণ বাংলা খ্রীষ্টিয়ান বাইবেল স্টাডি প্ল্যাটফর্ম!\n\n✨ ৬৬টি ক্যানোনিকাল পুস্তক ও বিশুদ্ধ পাঠ্য\n✨ ১০-৬০ মিনিট প্রচারের রূপরেখা ও আধুনিক সার্মন বিল্ডার\n✨ ৪টি রঙে পদ হাইলাইট ও ব্যক্তিগত স্টাডি নোট\n✨ শক্তিশালী অনুসন্ধান ও মূল ভাষার গ্রিক/হিব্রু বিশ্লেষণ\n✨ সম্পূর্ণ অফলাইন সুবিধা (PWA)\n\n📱 ফোনে সরাসরি অ্যাপ ইনস্টল করুন:\n${installUrl}`;

  const handleCopyLink = () => {
    const trackableUrl = AnalyticsService.buildTrackableShareUrl({
      targetRoute: '/install',
      channel: 'copy_link',
      contentType: 'entire_app',
    });
    navigator.clipboard.writeText(trackableUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
      AnalyticsService.trackShareAction({
        channel: 'copy_link',
        contentType: 'entire_app',
        isCompleted: true,
      });
    });
  };

  const handleShareWhatsApp = () => {
    const trackableUrl = AnalyticsService.buildTrackableShareUrl({
      targetRoute: '/install',
      channel: 'whatsapp',
      contentType: 'entire_app',
    });
    const waText = `✝️ বাংলা স্টাডি বাইবেল (Bengali Study Bible)\nপেশাদার ও শান্তিপূর্ণ বাংলা খ্রীষ্টিয়ান বাইবেল স্টাডি প্ল্যাটফর্ম!\n\n✨ ৬৬টি ক্যানোনিকাল পুস্তক ও বিশুদ্ধ পাঠ্য\n✨ ১০-৬০ মিনিট প্রচারের রূপরেখা ও আধুনিক সার্মন বিল্ডার\n✨ ৪টি রঙে পদ হাইলাইট ও ব্যক্তিগত স্টাডি নোট\n✨ শক্তিশালী অনুসন্ধান ও মূল ভাষার গ্রিক/হিব্রু বিশ্লেষণ\n✨ সম্পূর্ণ অফলাইন সুবিধা (PWA)\n\n📱 ফোনে সরাসরি অ্যাপ ইনস্টল করুন:\n${trackableUrl}`;
    AnalyticsService.trackShareAction({
      channel: 'whatsapp',
      contentType: 'entire_app',
    });
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-navy-900 w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 dark:border-navy-700 flex flex-col max-h-[92vh] overflow-hidden text-slate-800 dark:text-slate-100">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-navy-800 flex items-center justify-between bg-slate-50/70 dark:bg-navy-950/50">
          <div className="flex items-center space-x-2">
            <QrCode className="w-5 h-5 text-gold-500" />
            <h3 className="font-serif text-base sm:text-lg font-bold text-navy-950 dark:text-gold-300">
              মণ্ডলী ও প্রচার মিডিয়া কিট (QR Code &amp; Posters)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4 text-center">
          {/* Format Selector Pills */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {mediaOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = opt.id === selectedFormat;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedFormat(opt.id)}
                  className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap flex items-center gap-1.5 transition-all ${
                    isSelected
                      ? 'bg-gold-500 text-navy-950 font-bold shadow-sm'
                      : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{opt.labelBn}</span>
                </button>
              );
            })}
          </div>

          {/* Media Preview Box */}
          <div className="relative rounded-2xl overflow-hidden border border-gold-300/40 shadow-lg bg-navy-950 max-h-[300px] flex items-center justify-center p-2">
            <img
              src={currentMedia.filePath}
              alt={currentMedia.labelBn}
              className="w-full h-auto object-contain max-h-[280px] rounded-lg"
            />
          </div>

          <div className="space-y-1">
            <h4 className="font-serif font-bold text-base text-navy-950 dark:text-slate-100">
              {currentMedia.labelBn}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
              {currentMedia.subBn}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-1">
            <a
              href={currentMedia.filePath}
              download={currentMedia.downloadName}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 hover:brightness-105 text-navy-950 font-bold text-xs sm:text-sm shadow-md shadow-gold-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>ডাউনলোড করুন ({currentMedia.downloadName.split('.').pop()?.toUpperCase()})</span>
            </a>

            {showInstallButton && onOpenInstall && (
              <button
                onClick={onOpenInstall}
                className="w-full py-2.5 rounded-xl bg-navy-950 dark:bg-navy-800 border border-gold-500/50 hover:bg-gold-500/10 text-gold-400 font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-gold-400" />
                <span>📱 এই ডিভাইসে সরাসরি অ্যাপ ইনস্টল করুন</span>
              </button>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleShareWhatsApp}
                className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-4 h-4" />
                <span>WhatsApp শেয়ার</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="py-2.5 rounded-xl border border-slate-300 dark:border-navy-700 hover:bg-slate-100 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <QrCode className="w-4 h-4 text-gold-500" />}
                <span>{copiedLink ? 'ডোমেইন কপি হয়েছে!' : 'ডোমেইন লিংক কপি'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
