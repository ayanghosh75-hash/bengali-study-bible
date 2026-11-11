import React, { useState } from 'react';
import {
  FileText,
  Search,
  Plus,
  Trash2,
  Copy,
  Download,
  Share2,
  Printer,
  Calendar,
  Clock,
  Users,
  BookOpen,
  ArrowRight,
  GraduationCap,
} from 'lucide-react';
import { SavedSermon } from '../types/sermon';
import { SermonStorageService } from '../services/sermonStorageService';
import { SermonExportUtils } from '../utils/sermonExport';
import { toBengaliDigits } from '../utils/bengaliNumerals';

interface SavedSermonsScreenProps {
  onOpenSermon: (sermon: SavedSermon) => void;
  onCreateNewSermon: () => void;
  onOpenAcademy?: () => void;
}

export const SavedSermonsScreen: React.FC<SavedSermonsScreenProps> = ({
  onOpenSermon,
  onCreateNewSermon,
  onOpenAcademy,
}) => {
  const [sermons, setSermons] = useState<SavedSermon[]>(() =>
    SermonStorageService.getSavedSermons()
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    setSermons(SermonStorageService.searchSermons(q));
  };

  const handleDelete = (id: string) => {
    const updated = SermonStorageService.deleteSermon(id);
    setSermons(updated);
    setDeleteConfirmId(null);
  };

  const handleDuplicate = (id: string) => {
    const dup = SermonStorageService.duplicateSermon(id);
    if (dup) {
      setSermons(SermonStorageService.getSavedSermons());
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-950 dark:text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-gold-500" />
            আমার সার্মন (My Sermons)
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            আপনার প্রস্তুতকৃত ও সংরক্ষিত সমস্ত প্রচার রূপরেখা।
          </p>
        </div>

        <button
          onClick={onCreateNewSermon}
          className="px-4 py-2.5 rounded-xl font-bold text-xs bg-gold-500 hover:bg-gold-600 text-navy-950 flex items-center justify-center gap-1.5 shadow-md shadow-gold-500/20 transition transform active:scale-98"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          নতুন সার্মন তৈরি করুন
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="শিরোনাম, শাস্ত্রপদ বা বিষয় দিয়ে খুঁজুন..."
          className="w-full px-4 py-3 pl-10 rounded-xl text-sm bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 focus:outline-none focus:border-gold-500 text-slate-800 dark:text-slate-200 shadow-xs"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
      </div>

      {/* Sermons List */}
      {sermons.length === 0 ? (
        <div className="bg-white dark:bg-navy-900 rounded-3xl border border-dashed border-navy-200 dark:border-navy-800 p-12 text-center">
          <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-navy-950 dark:text-white">
            কোনো সংরক্ষিত সার্মন পাওয়া যায়নি
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            {searchQuery
              ? `"${searchQuery}" এর সাথে মিলে এমন কোনো সার্মন নেই।`
              : 'এখনো কোনো সার্মন তৈরি করা হয়নি। নতুন সার্মন তৈরি করে প্রচারের প্রস্তুতি নিন।'}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={onCreateNewSermon}
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gold-500 hover:bg-gold-600 text-navy-950 inline-flex items-center gap-1.5 shadow-sm transition"
            >
              <Plus className="w-4 h-4" />
              <span>প্রথম সার্মন তৈরি করুন</span>
            </button>
            {onOpenAcademy && (
              <button
                onClick={onOpenAcademy}
                className="px-4 py-2.5 rounded-xl border border-navy-200 dark:border-navy-700 hover:border-gold-500 text-xs font-semibold text-slate-700 dark:text-slate-300 inline-flex items-center gap-1.5 transition"
              >
                <GraduationCap className="w-3.5 h-3.5 text-gold-500" />
                <span>সার্মন প্রস্তুতি গাইড দেখুন</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {sermons.map((sermon) => (
            <div
              key={sermon.id}
              className="bg-white dark:bg-navy-900 rounded-2xl border border-navy-200 dark:border-navy-800 p-5 shadow-xs hover:border-gold-400/60 dark:hover:border-gold-600/50 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-gold-50 dark:bg-gold-950/40 text-gold-800 dark:text-gold-300 border border-gold-200 dark:border-gold-800/50 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {sermon.passage}
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-navy-50 dark:bg-navy-800 text-slate-600 dark:text-slate-300 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {toBengaliDigits(sermon.durationMinutes)} মিনিট
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-navy-50 dark:bg-navy-800 text-slate-600 dark:text-slate-300 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {sermon.audienceLabelBn}
                    </span>
                  </div>

                  <h3
                    onClick={() => onOpenSermon(sermon)}
                    className="text-base font-bold text-navy-950 dark:text-white hover:text-gold-600 dark:hover:text-gold-400 cursor-pointer transition"
                  >
                    {sermon.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 line-clamp-2 leading-relaxed">
                    <strong>মূল ভাব:</strong> {sermon.content.bigIdeaBn}
                  </p>

                  <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(sermon.createdAt).toLocaleDateString('bn-BD')}
                    </span>
                    {sermon.wordCount > 0 && (
                      <span>• প্রায় {toBengaliDigits(sermon.wordCount)} শব্দ</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 self-end sm:self-start shrink-0">
                  <button
                    onClick={() => handleDuplicate(sermon.id)}
                    title="ডুপ্লিকেট (কপি) করুন"
                    className="p-2 rounded-lg text-slate-500 hover:bg-navy-50 dark:hover:bg-navy-800 transition"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() =>
                      SermonExportUtils.printOrSavePdf({
                        title: sermon.title,
                        content: sermon.content,
                        passage: sermon.passage,
                      })
                    }
                    title="প্রিন্ট বা PDF"
                    className="p-2 rounded-lg text-slate-500 hover:bg-navy-50 dark:hover:bg-navy-800 transition"
                  >
                    <Printer className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() =>
                      SermonExportUtils.downloadDocx({
                        title: sermon.title,
                        content: sermon.content,
                        passage: sermon.passage,
                      })
                    }
                    title="Word (.doc) ডাউনলোড"
                    className="p-2 rounded-lg text-slate-500 hover:bg-navy-50 dark:hover:bg-navy-800 transition"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() =>
                      SermonExportUtils.shareSermon({
                        title: sermon.title,
                        content: sermon.content,
                        passage: sermon.passage,
                      })
                    }
                    title="শেয়ার করুন"
                    className="p-2 rounded-lg text-slate-500 hover:bg-navy-50 dark:hover:bg-navy-800 transition"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>

                  {deleteConfirmId === sermon.id ? (
                    <div className="flex items-center gap-1 bg-red-50 dark:bg-red-950/40 p-1 rounded-lg border border-red-200 dark:border-red-800">
                      <button
                        onClick={() => handleDelete(sermon.id)}
                        className="px-2 py-1 bg-red-600 text-white rounded text-[11px] font-bold"
                      >
                        মুছুন
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-2 py-1 text-slate-600 dark:text-slate-300 text-[11px]"
                      >
                        না
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(sermon.id)}
                      title="মুছে ফেলুন"
                      className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => onOpenSermon(sermon)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-navy-950 dark:bg-white text-white dark:text-navy-950 hover:bg-navy-800 dark:hover:bg-slate-100 flex items-center gap-1 transition"
                  >
                    খুলুন
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
