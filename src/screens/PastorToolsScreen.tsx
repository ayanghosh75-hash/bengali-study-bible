import React, { useState } from 'react';
import {
  BookOpen,
  FileText,
  Heart,
  Users,
  Zap,
  Smile,
  HelpCircle,
  Flame,
  Shield,
  HeartHandshake,
  GraduationCap,
  Calendar,
  Download,
  Printer,
  Save,
  CheckCircle2,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import {
  PASTOR_TOOLS_REGISTRY,
  PastorToolsService,
} from '../services/pastorToolsService';
import { PastorToolType, MinistryDocument } from '../types/pastorTools';
import { toBengaliDigits } from '../utils/bengaliNumerals';

export const PastorToolsScreen: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<PastorToolType>('sermon');
  const [passageInput, setPassageInput] = useState('যোহন ৩:১৬');
  const [titleInput, setTitleInput] = useState('');
  const [audienceInput, setAudienceInput] = useState('রবিবারের সাধারণ মণ্ডলী');
  const [durationInput, setDurationInput] = useState(30);
  const [pointsCount, setPointsCount] = useState(3);
  const [activeDocument, setActiveDocument] = useState<MinistryDocument | null>(null);
  const [isSavedFeedback, setIsSavedFeedback] = useState(false);

  const toolMeta = PastorToolsService.getToolMeta(selectedTool);

  const getToolIcon = (type: PastorToolType) => {
    switch (type) {
      case 'sermon': return BookOpen;
      case 'bible_study': return FileText;
      case 'devotional': return Heart;
      case 'small_group': return Users;
      case 'youth': return Zap;
      case 'sunday_school': return Smile;
      case 'quiz': return HelpCircle;
      case 'prayer_meeting': return Flame;
      case 'funeral': return Shield;
      case 'wedding': return HeartHandshake;
      case 'teaching_outline': return GraduationCap;
      case 'reading_plan': return Calendar;
      default: return BookOpen;
    }
  };

  const handleGenerate = () => {
    if (!passageInput.trim()) return;
    const doc = PastorToolsService.generateDocument({
      toolType: selectedTool,
      passageRef: passageInput,
      titleBn: titleInput,
      targetAudienceBn: audienceInput,
      durationMinutes: durationInput,
      pointsCount,
    });
    setActiveDocument(doc);
  };

  const handleSave = () => {
    if (!activeDocument) return;
    PastorToolsService.saveDocument(activeDocument);
    setIsSavedFeedback(true);
    setTimeout(() => setIsSavedFeedback(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportText = () => {
    if (!activeDocument) return;
    let content = `${activeDocument.titleBn}\n`;
    content += `শাস্ত্রাংশ: ${activeDocument.passageRef}\n`;
    content += `শ্রোতাণ্ডলী: ${activeDocument.targetAudienceBn} | সময়: ${toBengaliDigits(activeDocument.durationMinutes)} মিনিট\n`;
    content += `কেন্দ্রীয় সত্য: ${activeDocument.centralTruthBn}\n\n`;
    content += `==============================================\n\n`;

    for (const sec of activeDocument.sections) {
      content += `${sec.sectionTitleBn}\n${sec.contentBn}\n`;
      if (sec.illustrationSuggestionBn) {
        content += `দৃষ্টান্ত: ${sec.illustrationSuggestionBn}\n`;
      }
      if (sec.practicalApplicationBn) {
        content += `প্রয়োগ: ${sec.practicalApplicationBn}\n`;
      }
      content += `\n`;
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeDocument.titleBn.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-100">
                👨‍牧 যাজকীয় পরিচর্যা কেন্দ্র (Pastor Tools)
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                ১২-ইন-১ পরিচর্যা স্যুট
              </span>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
              প্রচারক, বাইবেল শিক্ষক, যুব নেতা ও মণ্ডলীর পালকদের জন্য দায়িত্বশীল ও শাস্ত্রীয় পরিচর্যা প্রস্তুতি
            </p>
          </div>
        </div>

        {/* 12 Tools Grid Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 mt-8 pt-6 border-t border-stone-100 dark:border-stone-800">
          {PASTOR_TOOLS_REGISTRY.map((tool) => {
            const Icon = getToolIcon(tool.type);
            const isSelected = selectedTool === tool.type;
            return (
              <button
                key={tool.type}
                onClick={() => setSelectedTool(tool.type)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-amber-500 bg-amber-500/10 text-amber-900 dark:text-amber-200 shadow-sm font-semibold'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-stone-50/50 dark:bg-stone-800/40 text-stone-700 dark:text-stone-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-amber-600' : 'text-stone-400'}`} />
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />}
                </div>
                <div className="text-xs line-clamp-1">{tool.titleBn.split(' ')[0]}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Generator Workspace Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Input Parameters */}
        <div className="lg:col-span-1 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm space-y-4">
          <div className="border-b border-stone-100 dark:border-stone-800 pb-3">
            <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 font-serif flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>{toolMeta.titleBn}</span>
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              {toolMeta.descriptionBn}
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              বাইবেল পদ বা শাস্ত্রাংশ *
            </label>
            <input
              type="text"
              value={passageInput}
              onChange={(e) => setPassageInput(e.target.value)}
              placeholder="উদা: যোহন ৩:১৬, রোমীয় ৮"
              className="w-full px-3 py-2 text-sm rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-amber-500 text-stone-900 dark:text-stone-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              ঐচ্ছিক শিরোনাম
            </label>
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              placeholder="উদা: খ্রীষ্টের শাশ্বত প্রেম ও মুক্তির নিশ্চয়তা"
              className="w-full px-3 py-2 text-sm rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-amber-500 text-stone-900 dark:text-stone-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              লক্ষ্য শ্রোতাণ্ডলী
            </label>
            <select
              value={audienceInput}
              onChange={(e) => setAudienceInput(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-amber-500 text-stone-900 dark:text-stone-100"
            >
              <option value="রবিবারের সাধারণ মণ্ডলী">রবিবারের সাধারণ মণ্ডলী</option>
              <option value="মণ্ডলীর যুবসমাজ ও শিক্ষার্থী">মণ্ডলীর যুবসমাজ ও শিক্ষার্থী</option>
              <option value="সানডে স্কুলের শিশু-কিশোর">সানডে স্কুলের শিশু-কিশোর</option>
              <option value="ক্ষুদ্র দল বা গৃহমণ্ডলী">ক্ষুদ্র দল বা গৃহমণ্ডলী</option>
              <option value="নবীন বিশ্বাসী ও আগ্রহীগণ">নবীন বিশ্বাসী ও আগ্রহীগণ</option>
              <option value="নেতৃত্ব ও সেবাকারী সমাজ">নেতৃত্ব ও সেবাকারী সমাজ</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                সময়সীমা
              </label>
              <select
                value={durationInput}
                onChange={(e) => setDurationInput(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-amber-500 text-stone-900 dark:text-stone-100"
              >
                <option value={15}>১৫ মিনিট</option>
                <option value={30}>৩০ মিনিট</option>
                <option value={45}>৪৫ মিনিট</option>
                <option value={60}>৬০ মিনিট</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                মূল শিক্ষা সংখ্যা
              </label>
              <select
                value={pointsCount}
                onChange={(e) => setPointsCount(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-amber-500 text-stone-900 dark:text-stone-100"
              >
                <option value={2}>২টি মূল শিক্ষা</option>
                <option value={3}>৩টি মূল শিক্ষা</option>
                <option value={4}>৪টি মূল শিক্ষা</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors shadow-sm flex items-center justify-center gap-2 mt-4"
          >
            <Sparkles className="w-4 h-4" />
            <span>রূপরেখা প্রস্তুত করুন</span>
          </button>
        </div>

        {/* Output Workspace Area */}
        <div className="lg:col-span-2">
          {activeDocument ? (
            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-4">
                <div>
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                    {toolMeta.titleBn} • {toBengaliDigits(activeDocument.durationMinutes)} মিনিট
                  </span>
                  <h2 className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-1">
                    {activeDocument.titleBn}
                  </h2>
                  <div className="text-xs text-stone-400 mt-0.5">
                    শাস্ত্রাংশ: {activeDocument.passageRef} • শ্রোতা: {activeDocument.targetAudienceBn}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSave}
                    className="p-2 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs flex items-center gap-1.5"
                    title="সংরক্ষণ করুন"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSavedFeedback ? 'সংরক্ষিত!' : 'সংরক্ষণ'}</span>
                  </button>

                  <button
                    onClick={handleExportText}
                    className="p-2 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs flex items-center gap-1.5"
                    title="টেক্সট ফাইল ডাউনলোড"
                  >
                    <Download className="w-4 h-4" />
                    <span>ডাউনলোড</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="p-2 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs flex items-center gap-1.5"
                    title="প্রিন্ট / PDF"
                  >
                    <Printer className="w-4 h-4" />
                    <span>প্রিন্ট</span>
                  </button>
                </div>
              </div>

              {/* Central Truth */}
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-300">কেন্দ্রীয় সত্য:</span>
                <p className="text-sm font-serif text-stone-800 dark:text-stone-200 mt-1">
                  {activeDocument.centralTruthBn}
                </p>
              </div>

              {/* Sections List */}
              <div className="space-y-4">
                {activeDocument.sections.map((sec) => (
                  <div key={sec.id} className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/40 space-y-2">
                    <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100 font-serif">
                      {sec.sectionTitleBn}
                    </h4>
                    <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                      {sec.contentBn}
                    </p>

                    {sec.illustrationSuggestionBn && (
                      <div className="text-xs text-stone-600 dark:text-stone-400 bg-white dark:bg-stone-900 p-2.5 rounded-lg border border-stone-100 dark:border-stone-800">
                        <strong>দৃষ্টান্তের প্রস্তাবনা:</strong> {sec.illustrationSuggestionBn}
                      </div>
                    )}

                    {sec.practicalApplicationBn && (
                      <div className="text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-500/5 p-2.5 rounded-lg border border-emerald-500/20">
                        <strong>ব্যবহারিক প্রয়োগ:</strong> {sec.practicalApplicationBn}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Accuracy Checklist */}
              <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-800 dark:text-stone-200 mb-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <span>দায়িত্বশীল পরিচর্যার প্রাক-প্রচার চেকলিস্ট (Pre-Delivery Checklist)</span>
                </div>
                <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
                  {activeDocument.accuracyChecklist.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className={item.isVerified ? 'text-emerald-500 font-bold' : 'text-amber-500 font-bold'}>
                        {item.isVerified ? '✓' : '○'}
                      </span>
                      <span>{item.itemBn}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[380px] flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-stone-200 dark:border-stone-800 text-center">
              <BookOpen className="w-12 h-12 text-stone-300 dark:text-stone-700 mb-3" />
              <h3 className="text-base font-bold text-stone-700 dark:text-stone-300 font-serif">
                কোনো পরিচর্যা রূপরেখা এখনো খোলা হয়নি
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mt-1">
                বামপাশের ফর্ম থেকে শাস্ত্রাংশ ও শ্রোতাণ্ডলী নির্ধারণ করে ‘রূপরেখা প্রস্তুত করুন’ বাটনে চাপুন।
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
