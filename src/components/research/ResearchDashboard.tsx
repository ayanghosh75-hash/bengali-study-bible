import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  GraduationCap,
  Users,
  History,
  Languages,
  GitFork,
  Library,
  Sparkles,
  ArrowRight,
  Check,
  Copy,
  Download,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Layers,
  Calendar,
  Compass,
} from 'lucide-react';
import { ResearchSectionId, ResearchQueryResult, TheologicalArticle } from '../../types/researchEngine';
import { ResearchEngineService } from '../../services/researchEngineService';
import { OriginalWordCard } from './OriginalWordCard';
import { KnowledgeGraphView } from './KnowledgeGraphView';
import { formatVerseRef } from '../../utils/bengaliNumerals';

interface ResearchDashboardProps {
  initialQuery?: string;
  onNavigateToVerse?: (bookId: string, chapter: number, verse?: number) => void;
  onSaveToMyStudySuccess?: (projectId: string) => void;
  useBengaliDigits?: boolean;
}

export const ResearchDashboard: React.FC<ResearchDashboardProps> = ({
  initialQuery = 'পরিত্রাণ',
  onNavigateToVerse,
  onSaveToMyStudySuccess,
  useBengaliDigits = true,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [data, setData] = useState<ResearchQueryResult>(() =>
    ResearchEngineService.executeResearch(initialQuery)
  );
  const [activeSection, setActiveSection] = useState<ResearchSectionId>('bible');

  // Modal / Drawer state for full theological article reading
  const [readingArticle, setReadingArticle] = useState<TheologicalArticle | null>(null);

  // Copilot custom question state
  const [copilotQuestion, setCopilotQuestion] = useState('');
  const [copiedStatus, setCopiedStatus] = useState(false);
  const [savedProjectId, setSavedProjectId] = useState<string | null>(null);

  // Accordion state for thematic collections in Section 1
  const [openThemeId, setOpenThemeId] = useState<string>('theme-grace');

  // Library academic level filter
  const [selectedLibraryLevel, setSelectedLibraryLevel] = useState<
    'all' | 'beginner' | 'intermediate' | 'advanced' | 'scholar'
  >('all');

  const [prevInitialQuery, setPrevInitialQuery] = useState(initialQuery);
  if (initialQuery !== prevInitialQuery) {
    setPrevInitialQuery(initialQuery);
    setQuery(initialQuery);
    setData(ResearchEngineService.executeResearch(initialQuery));
    setSavedProjectId(null);
  }

  const handleExecuteSearch = (searchQuery: string) => {
    const q = searchQuery.trim();
    if (!q) return;
    setQuery(q);
    const result = ResearchEngineService.executeResearch(q);
    setData(result);
    setSavedProjectId(null);
  };

  const handleSaveToWorkspace = () => {
    const id = ResearchEngineService.saveResearchDossierToWorkspace(data.copilotSection.brief);
    setSavedProjectId(id);
    onSaveToMyStudySuccess?.(id);
  };

  const handleCopyDossier = () => {
    const brief = data.copilotSection.brief;
    const text = `
=== ${brief.query} — বাইবেল গবেষণা ডসিয়ার ===

【কার্যনির্বাহী সারসংক্ষেপ】
${brief.executiveSummaryBn}

【মূল পদসমূহ ও ব্যাখ্যা】
${brief.keyVersesAnalysis.map((v) => `• ${v.referenceBn}: "${v.textBn}"\n  ${v.exegesisBn}`).join('\n\n')}

【পদ্ধতিগত ধর্মতত্ত্ব】
${brief.systematicTheologyBn.map((s) => `• ${s.locus}: ${s.expositionBn}`).join('\n')}

【মূল ভাষার বিশ্লেষণ】
${brief.originalLanguageExegesisBn.map((w) => `• ${w.word} (${w.language}): ${w.meaningBn}`).join('\n')}

【পালকীয় ও ব্যবহারিক প্রয়োগ】
• প্রচার রূপরেখা: ${brief.homileticalAndPastoralApplicationBn.preachingAngleBn}
• কাউন্সেলিং: ${brief.homileticalAndPastoralApplicationBn.counselingGuidanceBn}
• প্রাত্যহিক জীবন: ${brief.homileticalAndPastoralApplicationBn.personalLifeApplicationBn}
`;

    navigator.clipboard.writeText(text);
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2500);
  };

  const quickSearchPrompts = [
    'পরিত্রাণ',
    'ঈশ্বরের প্রেম',
    'বিশ্বাস ও অনুগ্রহ',
    'যীশু খ্রীষ্ট',
    'অনুতাপ ও ক্ষমা',
    'ধার্মিকতা',
    'পবিত্র আত্মা',
  ];

  const sections: { id: ResearchSectionId; labelBn: string; icon: React.FC<{ className?: string }>; count?: number }[] = [
    { id: 'bible', labelBn: 'বাইবেল পদ ও থিম', icon: BookOpen, count: data.bibleSection.rankedVerses.length },
    { id: 'study', labelBn: 'ধর্মতাত্ত্বিক অধ্যয়ন', icon: GraduationCap, count: data.studySection.articles.length },
    { id: 'people', labelBn: 'বাইবেলের চরিত্র', icon: Users, count: data.peopleSection.characters.length },
    { id: 'history', labelBn: 'ইতিহাস ও সময়রেখা', icon: History, count: data.historySection.timeline.length },
    { id: 'words', labelBn: 'মূল ভাষা (হিব্রু/গ্রিক)', icon: Languages, count: data.wordsSection.originalWords.length },
    { id: 'cross_refs', labelBn: 'আন্তঃপদীয় সংযোগ', icon: GitFork, count: data.crossRefSection.directReferences.length + data.crossRefSection.thematicReferences.length },
    { id: 'library', labelBn: 'রেফারেন্স লাইব্রেরি', icon: Library, count: data.librarySection.resources.length },
    { id: 'copilot', labelBn: 'এআই গবেষক', icon: Sparkles },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Search & Research Desk Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white border border-navy-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-semibold border border-gold-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>বাংলা বাইবেল রিসার্চ ইঞ্জিন • পূর্ণাঙ্গ ৮-মাত্রিক গবেষণা</span>
          </div>

          <div className="text-xs text-slate-400 font-sans">
            BSI প্রমিত বানান • স্ট্রংস কঙ্কর্ডেন্স • নলেজ গ্রাফ
          </div>
        </div>

        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            বাইবেলীয় গভীর গবেষণা ও তথ্য অনুসন্ধান
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans mt-1">
            একটি শব্দের অনুসন্ধান থেকে সমগ্র শাস্ত্রের শিক্ষা, মূল হিব্রু-গ্রিক ধাতু, ইতিহাস ও ধর্মতত্ত্ব আবিষ্কার করুন।
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center">
          <Search className="w-5 h-5 absolute left-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="গবেষণার বিষয় বা পদ লিখুন (যেমন: পরিত্রাণ, ঈশ্বরের কৃপা, বিশ্বাস, যীশু)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleExecuteSearch(query);
            }}
            className="w-full pl-11 pr-24 py-3 rounded-2xl bg-white dark:bg-navy-800 text-slate-900 dark:text-white placeholder:text-slate-400 border border-slate-200 dark:border-navy-700 focus:ring-2 focus:ring-gold-500/50 outline-none text-sm font-medium shadow-inner"
          />
          <button
            onClick={() => handleExecuteSearch(query)}
            className="absolute right-2 px-4 py-1.5 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 font-bold text-xs shadow hover:brightness-105 transition-all"
          >
            গবেষণা
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 no-scrollbar text-xs">
          <span className="text-slate-400 whitespace-nowrap">জনপ্রিয় বিষয়:</span>
          {quickSearchPrompts.map((sug) => (
            <button
              key={sug}
              onClick={() => handleExecuteSearch(sug)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                query.trim() === sug
                  ? 'bg-gold-500 text-navy-950 font-bold shadow-sm'
                  : 'bg-navy-800/80 hover:bg-navy-700 text-slate-300 border border-navy-700'
              }`}
            >
              {sug}
            </button>
          ))}
        </div>
      </div>

      {/* 8-Section Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-slate-200 dark:border-navy-800">
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-gold-500 text-navy-950 shadow-md font-bold'
                  : 'bg-white dark:bg-navy-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-navy-800 hover:bg-slate-50 dark:hover:bg-navy-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-navy-950 stroke-[2.5]' : 'text-gold-500'}`} />
              <span>{sec.labelBn}</span>
              {sec.count !== undefined && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? 'bg-navy-950/20 text-navy-950' : 'bg-slate-100 dark:bg-navy-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {sec.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* SECTION CONTENT VIEWS */}

      {/* ---------------- 1. BIBLE SECTION ---------------- */}
      {activeSection === 'bible' && (
        <div className="space-y-6">
          {/* Subheader summary */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 flex items-center justify-between gap-3 text-xs">
            <div>
              <strong>বাইবেলীয় প্রামাণ্য পদসমূহ:</strong> "{data.query}" সংক্রান্ত প্রাসঙ্গিকতার মানদণ্ডে নির্বাচিত পদ ও থিম।
            </div>
            <span className="font-bold text-amber-700 dark:text-amber-400 whitespace-nowrap">
              {data.bibleSection.rankedVerses.length}টি পদ সাজানো
            </span>
          </div>

          {/* Ranked Verses List */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-base text-navy-950 dark:text-gold-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gold-500" />
              <span>প্রাসঙ্গিকতা অনুযায়ী সাজানো মূল পদসমূহ (Ranked Verses)</span>
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {data.bibleSection.rankedVerses.map((verse, idx) => {
                const refStr = formatVerseRef(verse.bookNameBn, verse.chapter, verse.verse, useBengaliDigits);
                return (
                  <div
                    key={`${verse.bookId}_${verse.chapter}_${verse.verse}_${idx}`}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-900 hover:border-gold-400/80 transition-all shadow-sm space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-navy-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm text-gold-700 dark:text-gold-400">
                          {refStr}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-slate-500 dark:text-slate-400 font-sans">
                          {verse.testament === 'OT' ? 'পুরাতন নিয়ম' : 'নতুন নিয়ম'}
                        </span>
                        {verse.theologicalTag && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-gold-50 dark:bg-navy-800 text-gold-800 dark:text-gold-300 font-medium">
                            {verse.theologicalTag}
                          </span>
                        )}
                      </div>

                      {/* Relevance Score Badge */}
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                          {verse.relevanceScore}% প্রাসঙ্গিক
                        </span>
                        {onNavigateToVerse && (
                          <button
                            onClick={() => onNavigateToVerse(verse.bookId, verse.chapter, verse.verse)}
                            className="text-xs text-slate-500 hover:text-gold-600 dark:hover:text-gold-400 p-1 flex items-center gap-1"
                            title="বাইবেল পাঠকে পদটি খুলুন"
                          >
                            <span>পড়ুন</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="font-serif text-base text-slate-800 dark:text-slate-100 leading-relaxed">
                      "{verse.textBn}"
                    </p>

                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans italic">
                      প্রেক্ষাপট: {verse.contextPreviewBn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Thematic Scripture Collections */}
          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-navy-800">
            <h3 className="font-serif font-bold text-base text-navy-950 dark:text-gold-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-gold-500" />
              <span>বিষয়ভিত্তিক পদ সংকলন (Thematic Scripture Collections)</span>
            </h3>

            <div className="space-y-2.5">
              {data.bibleSection.thematicCollections.map((col) => {
                const isOpen = openThemeId === col.id;
                return (
                  <div
                    key={col.id}
                    className="rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-900 overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => setOpenThemeId(isOpen ? '' : col.id)}
                      className="w-full text-left p-4 flex items-center justify-between gap-3 hover:bg-slate-50/70 dark:hover:bg-navy-800/50 transition-colors"
                    >
                      <div>
                        <h4 className="font-serif font-bold text-sm text-navy-950 dark:text-slate-100">
                          {col.titleBn}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {col.descriptionBn}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300">
                          {col.verses.length} পদ
                        </span>
                        {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="p-4 pt-0 border-t border-slate-100 dark:border-navy-800/80 space-y-2">
                        {col.verses.map((v, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-100 dark:border-navy-800 text-xs space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-gold-600 dark:text-gold-400 font-serif">
                                {v.bookNameBn} {v.chapter}:{v.verse}
                              </span>
                              {onNavigateToVerse && (
                                <button
                                  onClick={() => onNavigateToVerse(v.bookId, v.chapter, v.verse)}
                                  className="text-[11px] text-slate-400 hover:text-gold-500 flex items-center gap-0.5"
                                >
                                  <span>খোলো</span>
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                            <p className="font-serif text-slate-700 dark:text-slate-200">"{v.textBn}"</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 2. STUDY SECTION ---------------- */}
      {activeSection === 'study' && (
        <div className="space-y-6">
          {/* Articles Grid */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-base text-navy-950 dark:text-gold-300 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-gold-500" />
              <span>নির্বাচিত ধর্মতাত্ত্বিক গবেষণা প্রবন্ধ (Theological Articles)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.studySection.articles.map((art) => (
                <div
                  key={art.id}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-900 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded bg-gold-100 dark:bg-gold-950/60 text-gold-900 dark:text-gold-300 font-semibold">
                        {art.categoryNameBn}
                      </span>
                      <span className="text-slate-400">{art.readingTimeMin} মিনিট পাঠ</span>
                    </div>

                    <h4 className="font-serif font-bold text-base text-navy-950 dark:text-slate-100 leading-snug">
                      {art.titleBn}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {art.summaryBn}
                    </p>
                  </div>

                  <button
                    onClick={() => setReadingArticle(art)}
                    className="w-full py-2 rounded-xl bg-slate-100 dark:bg-navy-800 hover:bg-gold-500 hover:text-navy-950 dark:hover:bg-gold-500 dark:hover:text-navy-950 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>সম্পূর্ণ প্রবন্ধ পড়ুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Topic Cluster Tree */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-900 space-y-4">
            <h3 className="font-serif font-bold text-base text-navy-950 dark:text-gold-300 flex items-center gap-2">
              <Compass className="w-4 h-4 text-gold-500" />
              <span>পদ্ধতিগত বিষয় ক্লাস্টার (Topic Clusters)</span>
            </h3>

            <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-navy-950/60 font-mono text-xs text-slate-700 dark:text-slate-300 leading-relaxed border border-slate-200 dark:border-navy-800">
              <div className="font-bold text-sm text-gold-600 dark:text-gold-400 mb-2 font-serif">
                {data.studySection.topicCluster.labelBn} ({data.studySection.topicCluster.strongsNumber})
              </div>
              <div className="pl-2 space-y-1.5">
                {data.studySection.topicCluster.children?.map((child) => (
                  <div key={child.id} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">├──</span>
                      <strong className="font-serif text-slate-800 dark:text-slate-200">{child.labelBn}</strong>
                      {child.strongsNumber && (
                        <span className="text-[10px] text-slate-400">[{child.strongsNumber}]</span>
                      )}
                    </div>
                    {child.children && (
                      <div className="pl-6 space-y-1 text-slate-500 dark:text-slate-400">
                        {child.children.map((sub) => (
                          <div key={sub.id} className="flex items-center gap-2">
                            <span>└──</span>
                            <span>{sub.labelBn}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Homiletical & Preaching Themes */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-900 space-y-4">
            <h3 className="font-serif font-bold text-base text-navy-950 dark:text-gold-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-500" />
              <span>প্রচার ও পরামর্শ রূপরেখা (Sermon Outlines & Counseling)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.studySection.homileticalThemes.sermonOutlines.map((outline, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/80 dark:border-navy-800 text-xs space-y-2"
                >
                  <h4 className="font-serif font-bold text-sm text-navy-950 dark:text-slate-100">
                    সার্মন: {outline.titleBn}
                  </h4>
                  <ul className="space-y-1 list-disc pl-4 text-slate-600 dark:text-slate-300">
                    {outline.points.map((p, pIdx) => (
                      <li key={pIdx}>{p}</li>
                    ))}
                  </ul>
                  <div className="pt-2 text-[11px] text-slate-400">
                    মূল পদসমূহ: {outline.passages.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 3. PEOPLE SECTION ---------------- */}
      {activeSection === 'people' && (
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-base text-navy-950 dark:text-gold-300 flex items-center gap-2">
              <Users className="w-4 h-4 text-gold-500" />
              <span>বিষয়সংলগ্ন বাইবেলের প্রধান ব্যক্তিত্ব (Biblical Characters)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.peopleSection.characters.map((char) => (
                <div
                  key={char.id}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-900 shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between gap-2 border-b border-slate-100 dark:border-navy-800 pb-2.5">
                    <div>
                      <h4 className="font-serif font-bold text-base text-navy-950 dark:text-gold-300">
                        {char.nameBn}
                      </h4>
                      <p className="text-xs text-slate-400 font-sans">
                        {char.nameEn} • {char.eraBn}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300">
                      {char.testament === 'OT' ? 'পুরাতন নিয়ম' : 'নতুন নিয়ম'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {char.biographySummaryBn}
                  </p>

                  <div className="bg-gold-50/70 dark:bg-navy-950/50 p-3 rounded-xl text-xs space-y-1 border border-gold-100 dark:border-navy-800">
                    <strong className="text-gold-800 dark:text-gold-300">বিষয়ের সহিত সংযোগ:</strong>
                    <p className="text-slate-700 dark:text-slate-200">{char.relationshipToTopicBn}</p>
                  </div>

                  {/* Lessons */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      আত্মিক শিক্ষা:
                    </span>
                    <ul className="text-xs space-y-1 list-disc pl-4 text-slate-600 dark:text-slate-300 mt-1">
                      {char.spiritualLessons.map((l, i) => (
                        <li key={i}>{l}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Relational Path */}
                  {char.relationalPath && char.relationalPath.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 dark:border-navy-800">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        সম্পর্ক ম্যাপিং (Person → Event → Doctrine → Passage):
                      </span>
                      {char.relationalPath.map((path, idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded bg-slate-50 dark:bg-navy-950/80 text-[11px] font-mono text-slate-600 dark:text-slate-300 flex flex-wrap items-center gap-1 leading-tight"
                        >
                          <span className="text-blue-600 dark:text-blue-400 font-bold">{path.person}</span>
                          <span>→</span>
                          <span>{path.event}</span>
                          <span>→</span>
                          <span className="text-purple-600 dark:text-purple-400 font-semibold">{path.doctrine}</span>
                          <span>→</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">[{path.passage}]</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 4. HISTORY SECTION ---------------- */}
      {activeSection === 'history' && (
        <div className="space-y-6">
          {/* Historical Background essays */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-900 space-y-4">
            <h3 className="font-serif font-bold text-base text-navy-950 dark:text-gold-300 flex items-center gap-2">
              <History className="w-4 h-4 text-gold-500" />
              <span>ঐতিহাসিক ও সাংস্কৃতিক প্রেক্ষাপট (Historical & Cultural Milieu)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/80 dark:border-navy-800 space-y-1.5">
                <strong className="text-sm font-serif text-navy-950 dark:text-slate-100">
                  ১. প্রাচীন যিহূদী উপলব্ধি (Jewish Understanding)
                </strong>
                <p>{data.historySection.jewishUnderstandingBn}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/80 dark:border-navy-800 space-y-1.5">
                <strong className="text-sm font-serif text-navy-950 dark:text-slate-100">
                  ২. দ্বিতীয় মন্দির যুগ (Second Temple Period)
                </strong>
                <p>{data.historySection.secondTempleBeliefsBn}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/80 dark:border-navy-800 space-y-1.5">
                <strong className="text-sm font-serif text-navy-950 dark:text-slate-100">
                  ৩. রোমান সাম্রাজ্যের প্রেক্ষাপট (Greco-Roman World)
                </strong>
                <p>{data.historySection.grecoRomanContextBn}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/80 dark:border-navy-800 space-y-1.5">
                <strong className="text-sm font-serif text-navy-950 dark:text-slate-100">
                  ৪. মশীহীয় প্রত্যাশা (Messianic Expectations)
                </strong>
                <p>{data.historySection.messianicExpectationsBn}</p>
              </div>
            </div>
          </div>

          {/* Interactive 5-Era Timeline */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-900 space-y-4">
            <h3 className="font-serif font-bold text-base text-navy-950 dark:text-gold-300 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gold-500" />
              <span>বাইবেলীয় ৫-যুগীয় সময়রেখা (Biblical Timeline)</span>
            </h3>

            <div className="relative pl-6 border-l-2 border-gold-500/40 space-y-6">
              {data.historySection.timeline.map((item) => (
                <div key={item.id} className="relative space-y-1.5">
                  {/* Dot */}
                  <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-gold-500 ring-4 ring-white dark:ring-navy-900" />

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-gold-100 dark:bg-gold-950/60 text-gold-900 dark:text-gold-300">
                      {item.eraNameBn}
                    </span>
                    <span className="text-xs text-slate-400">{item.approxDateBn}</span>
                  </div>

                  <h4 className="font-serif font-bold text-sm text-navy-950 dark:text-slate-100">
                    {item.titleBn}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.descriptionBn}
                  </p>
                  <p className="text-[11px] text-slate-400 font-sans italic">
                    মূল শাস্ত্রাংশ: {item.keyReferencesBn.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Archaeological Discoveries */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-900 space-y-4">
            <h3 className="font-serif font-bold text-base text-navy-950 dark:text-gold-300 flex items-center gap-2">
              <Compass className="w-4 h-4 text-gold-500" />
              <span>প্রত্নতাত্ত্বিক আবিষ্কার ও শিলালিপি (Archaeological Notes)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.historySection.archaeologicalNotes.map((arch) => (
                <div
                  key={arch.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/80 dark:border-navy-800 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-sm text-navy-950 dark:text-slate-100">
                      {arch.titleBn}
                    </h4>
                    <span className="text-[10px] text-slate-400">{arch.discoveryDateBn}</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400">স্থান: {arch.locationBn}</p>
                  <p className="text-slate-700 dark:text-slate-200">{arch.significanceBn}</p>
                  <div className="pt-1.5 border-t border-slate-200 dark:border-navy-800 text-gold-700 dark:text-gold-400 italic">
                    বাইবেলীয় সত্যতা: {arch.biblicalCorrelationBn}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 5. WORDS SECTION ---------------- */}
      {activeSection === 'words' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-900 dark:text-sky-200 text-xs space-y-1">
            <strong>মূল হিব্রু ও গ্রিক শব্দ বিশ্লেষণ (Original Language & Strong's Concordance):</strong>
            <p className="text-slate-600 dark:text-slate-300">
              বাইবেলের অনুবাদ পড়ার পাশাপাশি মূল শব্দের ধাতুগত অর্থ, ব্যবহারের পরিধি ও বৈচিত্র্য অনুধাবন করা শাস্ত্রীয় গবেষণার শ্রেষ্ঠ নিয়ম।
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {data.wordsSection.originalWords.map((word) => (
              <OriginalWordCard key={word.strongNumber} word={word} />
            ))}
          </div>
        </div>
      )}

      {/* ---------------- 6. CROSS REFERENCES SECTION ---------------- */}
      {activeSection === 'cross_refs' && (
        <div className="space-y-6">
          {/* Interactive Knowledge Graph */}
          <KnowledgeGraphView graph={data.crossRefSection.knowledgeGraph} />

          {/* Direct & Prophecy Fulfillments */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-900 space-y-4">
            <h3 className="font-serif font-bold text-base text-navy-950 dark:text-gold-300 flex items-center gap-2">
              <GitFork className="w-4 h-4 text-gold-500" />
              <span>আন্তঃপদীয় সংযোগ ও ভবিষ্যদ্বাণীর পূর্ণতা (Cross-References)</span>
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {[
                ...data.crossRefSection.directReferences,
                ...data.crossRefSection.thematicReferences,
                ...data.crossRefSection.prophecyFulfillments,
              ].map((cr, idx) => (
                <div
                  key={`${cr.id}_${idx}`}
                  className="p-4 rounded-xl border border-slate-200/80 dark:border-navy-800 bg-slate-50/70 dark:bg-navy-950/60 text-xs space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 font-serif font-bold text-sm">
                      <span className="text-slate-800 dark:text-slate-200">{cr.sourceReferenceBn}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold-500" />
                      <span className="text-gold-600 dark:text-gold-400">{cr.targetReferenceBn}</span>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gold-100 dark:bg-navy-800 text-gold-800 dark:text-gold-300">
                      {cr.relationTypeNameBn}
                    </span>
                  </div>

                  <p className="font-serif text-slate-800 dark:text-slate-100 text-sm">
                    "{cr.targetTextBn}"
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 font-sans italic">
                    ব্যাখ্যা: {cr.explanationBn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 7. LIBRARY SECTION ---------------- */}
      {activeSection === 'library' && (
        <div className="space-y-6">
          {/* Level Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 no-scrollbar">
            {[
              { id: 'all', label: 'সকল রিসোর্স' },
              { id: 'beginner', label: '১. প্রাথমিক (Beginner)' },
              { id: 'intermediate', label: '২. মধ্যম (Intermediate)' },
              { id: 'advanced', label: '৩. উন্নত (Advanced)' },
              { id: 'scholar', label: '৪. গবেষক (Scholar)' },
            ].map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setSelectedLibraryLevel(lvl.id as any)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors ${
                  selectedLibraryLevel === lvl.id
                    ? 'bg-gold-500 text-navy-950 font-bold shadow-sm'
                    : 'bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>

          {/* Resources List */}
          <div className="grid grid-cols-1 gap-4">
            {data.librarySection.resources
              .filter((r) => selectedLibraryLevel === 'all' || r.academicLevel === selectedLibraryLevel)
              .map((res) => (
                <div
                  key={res.id}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-900 shadow-sm space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-navy-800 pb-2.5">
                    <div>
                      <h4 className="font-serif font-bold text-base text-navy-950 dark:text-slate-100">
                        {res.titleBn}
                      </h4>
                      <p className="text-xs text-slate-400 font-sans">
                        লেখক/উৎস: {res.authorBn} {res.historicalEraBn ? `(${res.historicalEraBn})` : ''}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gold-100 dark:bg-gold-950/60 text-gold-900 dark:text-gold-300">
                        {res.academicLevelNameBn}
                      </span>
                      <span className="text-[11px] text-slate-400">{res.readingTimeMin} মিনিট পাঠ</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {res.summaryBn}
                  </p>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/80 dark:border-navy-800 text-xs italic font-serif text-slate-800 dark:text-slate-200">
                    "{res.excerptBn}"
                  </div>

                  <div className="text-[11px] text-slate-400">
                    মূল উদ্ধৃতি: {res.keyCitations.join(', ')}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ---------------- 8. AI RESEARCH COPILOT SECTION ---------------- */}
      {activeSection === 'copilot' && (
        <div className="space-y-6">
          {/* Header & Actions */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white border border-navy-800 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold-400" />
                <h3 className="font-serif font-bold text-lg text-white">
                  এআই ধর্মতাত্ত্বিক ও প্যাস্টোরাল গবেষণা সহায়ক (AI Copilot)
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyDossier}
                  className="px-3 py-1.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  {copiedStatus ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedStatus ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                </button>

                <button
                  onClick={handleSaveToWorkspace}
                  className="px-3 py-1.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-xs font-bold text-navy-950 shadow flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{savedProjectId ? 'সংরক্ষিত হয়েছে' : 'আমার স্টাডিতে সেভ'}</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-sans">
              শাস্ত্রের পূর্ণাঙ্গ সাক্ষ্যের ওপর ভিত্তি করে প্রণীত গবেষণাপত্র। কোনো কাল্পনিক বা অনুমানমূলক ব্যাখ্যা ব্যতিরেকে শুধুমাত্র বাইবেলীয় প্রমাণাদি ভিত্তিক রূপরেখা।
            </p>

            {/* Custom Question input */}
            <div className="relative flex items-center pt-2">
              <input
                type="text"
                placeholder="গবেষককে নির্দিষ্ট প্রশ্ন করুন (যেমন: পৌল কীভাবে পরিত্রাণ ব্যাখ্যা করেছেন?)..."
                value={copilotQuestion}
                onChange={(e) => setCopilotQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && copilotQuestion.trim()) {
                    handleExecuteSearch(copilotQuestion);
                    setCopilotQuestion('');
                  }
                }}
                className="w-full pl-4 pr-24 py-2.5 rounded-xl bg-navy-800/90 text-white placeholder:text-slate-400 text-xs border border-navy-700 outline-none focus:ring-2 focus:ring-gold-500/40"
              />
              <button
                onClick={() => {
                  if (copilotQuestion.trim()) {
                    handleExecuteSearch(copilotQuestion);
                    setCopilotQuestion('');
                  }
                }}
                className="absolute right-1.5 px-3 py-1 rounded-lg bg-gold-500 text-navy-950 font-bold text-xs hover:brightness-105"
              >
                বিশ্লেষণ
              </button>
            </div>
          </div>

          {/* Structured Dossier Output */}
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-900 shadow-sm space-y-6">
            {/* Title & Query */}
            <div className="border-b border-slate-100 dark:border-navy-800 pb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                গবেষণা ডসিয়ার (Research Dossier)
              </span>
              <h3 className="font-serif font-bold text-xl text-navy-950 dark:text-gold-300 mt-1">
                {data.copilotSection.brief.query}
              </h3>
            </div>

            {/* 1. Executive Summary */}
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-sm text-navy-950 dark:text-slate-100 uppercase tracking-wider text-gold-600 dark:text-gold-400">
                ১. কার্যনির্বাহী সারসংক্ষেপ (Executive Summary)
              </h4>
              <p className="font-serif text-sm text-slate-800 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-navy-950/50 p-4 rounded-2xl border border-slate-100 dark:border-navy-800">
                {data.copilotSection.brief.executiveSummaryBn}
              </p>
            </div>

            {/* 2. Key Verses Analysis */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-sm text-navy-950 dark:text-slate-100 uppercase tracking-wider text-gold-600 dark:text-gold-400">
                ২. মূল শাস্ত্রাংশ ও তাৎপর্য বিশ্লেষণ (Scripture Proofs)
              </h4>
              <div className="space-y-2">
                {data.copilotSection.brief.keyVersesAnalysis.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-navy-800 bg-slate-50/70 dark:bg-navy-950/60 text-xs space-y-1.5"
                  >
                    <div className="font-serif font-bold text-gold-700 dark:text-gold-400">
                      {item.referenceBn}
                    </div>
                    <p className="font-serif text-slate-800 dark:text-slate-200 font-medium">
                      "{item.textBn}"
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 font-sans italic">
                      তাৎপর্য: {item.exegesisBn}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Systematic Theology */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-sm text-navy-950 dark:text-slate-100 uppercase tracking-wider text-gold-600 dark:text-gold-400">
                ৩. পদ্ধতিগত ধর্মতাত্ত্বিক কাঠামো (Systematic Theology)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {data.copilotSection.brief.systematicTheologyBn.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 dark:border-navy-800 bg-slate-50 dark:bg-navy-950/60 text-xs space-y-1.5"
                  >
                    <h5 className="font-bold text-navy-950 dark:text-slate-100 font-serif">
                      {item.locus}
                    </h5>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                      {item.expositionBn}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Historical Context */}
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-sm text-navy-950 dark:text-slate-100 uppercase tracking-wider text-gold-600 dark:text-gold-400">
                ৪. ঐতিহাসিক ও সাংস্কৃতিক প্রেক্ষিত (Historical Milieu)
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-navy-950/50 p-3.5 rounded-xl border border-slate-100 dark:border-navy-800">
                {data.copilotSection.brief.historicalContextBn}
              </p>
            </div>

            {/* 5. Original Languages */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-sm text-navy-950 dark:text-slate-100 uppercase tracking-wider text-gold-600 dark:text-gold-400">
                ৫. মূল ভাষার গভীর বিশ্লেষণ (Original Language Exegesis)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.copilotSection.brief.originalLanguageExegesisBn.map((w, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-slate-200 dark:border-navy-800 bg-slate-50 dark:bg-navy-950/60 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="font-serif text-sm text-navy-950 dark:text-slate-100">
                        {w.word}
                      </strong>
                      <span className="text-[10px] uppercase font-bold text-slate-400">
                        {w.language}
                      </span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">{w.meaningBn}</p>
                    <p className="text-slate-500 dark:text-slate-400 italic text-[11px]">
                      {w.insightBn}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Homiletical & Pastoral Application */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-navy-800">
              <h4 className="font-serif font-bold text-sm text-navy-950 dark:text-slate-100 uppercase tracking-wider text-gold-600 dark:text-gold-400">
                ৬. পালকীয় ও ব্যবহারিক প্রয়োগ (Pastoral & Practical Application)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-navy-950/60 border border-amber-200/80 dark:border-navy-800 space-y-1">
                  <strong className="text-amber-900 dark:text-amber-300">প্রচার রূপরেখা:</strong>
                  <p className="text-slate-700 dark:text-slate-300">
                    {data.copilotSection.brief.homileticalAndPastoralApplicationBn.preachingAngleBn}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-sky-50/70 dark:bg-navy-950/60 border border-sky-200/80 dark:border-navy-800 space-y-1">
                  <strong className="text-sky-900 dark:text-sky-300">কাউন্সেলিং নির্দেশনা:</strong>
                  <p className="text-slate-700 dark:text-slate-300">
                    {data.copilotSection.brief.homileticalAndPastoralApplicationBn.counselingGuidanceBn}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-navy-950/60 border border-emerald-200/80 dark:border-navy-800 space-y-1">
                  <strong className="text-emerald-900 dark:text-emerald-300">প্রাত্যহিক জীবন:</strong>
                  <p className="text-slate-700 dark:text-slate-300">
                    {data.copilotSection.brief.homileticalAndPastoralApplicationBn.personalLifeApplicationBn}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Article Reader Modal */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-navy-900 w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl border border-slate-200 dark:border-navy-700 flex flex-col overflow-hidden text-slate-800 dark:text-slate-100">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 dark:border-navy-800 flex items-center justify-between bg-slate-50/70 dark:bg-navy-950/50">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gold-600 dark:text-gold-400">
                  {readingArticle.categoryNameBn}
                </span>
                <h3 className="font-serif font-bold text-lg text-navy-950 dark:text-slate-100 leading-snug mt-0.5">
                  {readingArticle.titleBn}
                </h3>
              </div>
              <button
                onClick={() => setReadingArticle(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 text-sm leading-relaxed">
              <div className="whitespace-pre-line font-serif text-slate-700 dark:text-slate-200 leading-relaxed text-base">
                {readingArticle.contentBn}
              </div>

              {/* Key theses */}
              <div className="pt-4 border-t border-slate-100 dark:border-navy-800 space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                  মূল প্রতিপাদ্য থিসিস (Key Theses):
                </h4>
                <ul className="space-y-1.5 list-disc pl-5 text-xs text-slate-600 dark:text-slate-300">
                  {readingArticle.keyTheses.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>

              {/* Scripture Proofs */}
              <div className="space-y-2 pt-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                  শাস্ত্রীয় প্রামাণ্য পদসমূহ:
                </h4>
                <div className="space-y-2">
                  {readingArticle.scriptureProofs.map((sp, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/80 dark:border-navy-800 text-xs space-y-1"
                    >
                      <strong className="font-serif text-gold-700 dark:text-gold-400">
                        {sp.referenceBn}
                      </strong>
                      <p className="font-serif text-slate-800 dark:text-slate-200">"{sp.textBn}"</p>
                      <p className="text-slate-500 dark:text-slate-400 italic">{sp.theologicalNoteBn}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-navy-800 bg-slate-50/70 dark:bg-navy-950/50 flex justify-end">
              <button
                onClick={() => setReadingArticle(null)}
                className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-navy-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-300"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
