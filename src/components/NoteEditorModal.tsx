import React, { useState } from 'react';
import { X, FileText, Save, Trash2 } from 'lucide-react';
import { BibleVerse, PersonalNote } from '../types/bible';
import { formatVerseRef } from '../utils/bengaliNumerals';

interface NoteEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  verse: BibleVerse | null;
  bookNameBn: string;
  existingNote?: PersonalNote;
  onSaveNote: (title: string, content: string) => void;
  onDeleteNote: (id: string) => void;
  useBengaliDigits?: boolean;
}

interface NoteEditorFormProps {
  onClose: () => void;
  verse: BibleVerse;
  bookNameBn: string;
  existingNote?: PersonalNote;
  onSaveNote: (title: string, content: string) => void;
  onDeleteNote: (id: string) => void;
  useBengaliDigits?: boolean;
}

const NoteEditorForm: React.FC<NoteEditorFormProps> = ({
  onClose,
  verse,
  bookNameBn,
  existingNote,
  onSaveNote,
  onDeleteNote,
  useBengaliDigits = true,
}) => {
  const [title, setTitle] = useState(existingNote?.title || '');
  const [content, setContent] = useState(existingNote?.content || '');

  const verseRefStr = formatVerseRef(bookNameBn, verse.chapter, verse.verse, useBengaliDigits);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSaveNote(title.trim(), content.trim());
    onClose();
  };

  const handleDelete = () => {
    if (existingNote) {
      onDeleteNote(existingNote.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-navy-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-navy-700 flex flex-col overflow-hidden text-slate-800 dark:text-slate-100">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-navy-800 flex items-center justify-between bg-slate-50/70 dark:bg-navy-950/50">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-gold-500" />
            <h3 className="font-serif text-lg font-bold text-navy-950 dark:text-gold-300">
              ব্যক্তিগত বাইবেল স্টাডি নোট
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Verse Reference Snippet */}
        <div className="px-5 py-3 bg-gold-50/40 dark:bg-navy-950/40 border-b border-gold-200/40 dark:border-navy-800">
          <span className="font-serif font-bold text-sm text-gold-700 dark:text-gold-400 block mb-0.5">
            {verseRefStr}
          </span>
          <p className="text-xs text-slate-600 dark:text-slate-400 italic font-serif">
            "{verse.textBn}"
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              নোটের শিরোনাম (Title - ঐচ্ছিক)
            </label>
            <input
              type="text"
              placeholder="যেমন: অনুধ্যান, প্রার্থনার বিষয়, ব্যক্তিগত প্রয়োগ..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-navy-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-gold-500/50 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              আপনার চিন্তাভাবনা ও শিক্ষণীয় নোট (Note Content)*
            </label>
            <textarea
              rows={5}
              placeholder="এই পদ থেকে আপনি কি শিখলেন? ঈশ্বর আপনার কাছে কি প্রকাশ করলেন?..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-navy-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-gold-500/50 outline-none resize-none font-serif"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-navy-800">
            {existingNote ? (
              <button
                type="button"
                onClick={handleDelete}
                className="px-3.5 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>মুছে ফেলুন</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-800 rounded-xl transition-colors"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 hover:brightness-105 shadow-md shadow-gold-500/20 flex items-center gap-1.5 transition-all"
              >
                <Save className="w-4 h-4 stroke-[2.5]" />
                <span>সংরক্ষণ করুন</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export const NoteEditorModal: React.FC<NoteEditorModalProps> = (props) => {
  if (!props.isOpen || !props.verse) return null;

  return (
    <NoteEditorForm
      key={props.existingNote?.id || `${props.verse.bookId}_${props.verse.chapter}_${props.verse.verse}`}
      onClose={props.onClose}
      verse={props.verse}
      bookNameBn={props.bookNameBn}
      existingNote={props.existingNote}
      onSaveNote={props.onSaveNote}
      onDeleteNote={props.onDeleteNote}
      useBengaliDigits={props.useBengaliDigits}
    />
  );
};
