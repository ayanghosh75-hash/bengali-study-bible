import { SavedSermon } from '../types/sermon';

const SERMONS_STORAGE_KEY = 'bengali_study_bible_saved_sermons_v1';

export class SermonStorageService {
  public static getSavedSermons(): SavedSermon[] {
    try {
      const data = localStorage.getItem(SERMONS_STORAGE_KEY);
      if (!data) {
        return this.getInitialSampleSermons();
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load saved sermons from localStorage', e);
      return this.getInitialSampleSermons();
    }
  }

  public static getSermonById(id: string): SavedSermon | undefined {
    const list = this.getSavedSermons();
    return list.find((s) => s.id === id);
  }

  public static saveSermon(sermon: SavedSermon): SavedSermon[] {
    try {
      const list = this.getSavedSermons();
      const existingIndex = list.findIndex((s) => s.id === sermon.id);

      let updated: SavedSermon[];
      const now = new Date().toISOString();

      if (existingIndex >= 0) {
        updated = [...list];
        updated[existingIndex] = {
          ...sermon,
          updatedAt: now,
        };
      } else {
        updated = [{ ...sermon, createdAt: sermon.createdAt || now, updatedAt: now }, ...list];
      }

      localStorage.setItem(SERMONS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Failed to save sermon', e);
      return this.getSavedSermons();
    }
  }

  public static deleteSermon(id: string): SavedSermon[] {
    try {
      const list = this.getSavedSermons();
      const updated = list.filter((s) => s.id !== id);
      localStorage.setItem(SERMONS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Failed to delete sermon', e);
      return this.getSavedSermons();
    }
  }

  public static duplicateSermon(id: string): SavedSermon | undefined {
    try {
      const original = this.getSermonById(id);
      if (!original) return undefined;

      const duplicated: SavedSermon = {
        ...original,
        id: 'sermon_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        title: `${original.title} (কপি)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      this.saveSermon(duplicated);
      return duplicated;
    } catch (e) {
      console.error('Failed to duplicate sermon', e);
      return undefined;
    }
  }

  public static searchSermons(query: string): SavedSermon[] {
    const list = this.getSavedSermons();
    const clean = query.trim().toLowerCase();
    if (!clean) return list;

    return list.filter(
      (s) =>
        s.title.toLowerCase().includes(clean) ||
        s.passage.toLowerCase().includes(clean) ||
        s.audienceLabelBn.toLowerCase().includes(clean) ||
        s.content.bigIdeaBn.toLowerCase().includes(clean)
    );
  }

  private static getInitialSampleSermons(): SavedSermon[] {
    const sample: SavedSermon = {
      id: 'sample_sermon_john_3_16',
      title: 'ঈশ্বরের অসীম প্রেম ও অনন্ত জীবনের মহাদান',
      passage: 'যোহন ৩:১৬ (John 3:16)',
      audience: 'sunday_congregation',
      audienceLabelBn: 'রবিবার মণ্ডলীর উপাসনা',
      duration: '30',
      durationMinutes: 30,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      wordCount: 2150,
      content: {
        titleBn: 'ঈশ্বরের অসীম প্রেম ও অনন্ত জীবনের মহাদান',
        mainPassageBn: 'যোহন ৩:১৬',
        mainPassageEn: 'John 3:16',
        scriptureTextBn: 'কারণ ঈশ্বর জগৎকে এমন প্রেম করিলেন যে, আপনার একজাত পুত্রকে দান করিলেন, যেন যে কেহ তাঁহাতে বিশ্বাস করে, সে বিনষ্ট না হয়, কিন্তু অনন্ত জীবন পায়।',
        bigIdeaBn: 'ঈশ্বরের প্রেম শুধুমাত্র কোনো আবেগ নয়; এটি আত্মত্যাগী ক্রুশের দানের মাধ্যমে প্রকাশিত এক চিরন্তন পরিত্রাণের অঙ্গীকার।',
        introductionBn: 'প্রিয় বিশ্বাসী ভাই ও বোনেরা, মানব ইতিহাসের সবচেয়ে পরিচিত অথচ সবচেয়ে গভীর শাস্ত্রাংশ হলো যোহন ৩:১৬। এই একটি পদে সমগ্র সুসমাচারের কেন্দ্রবিন্দু নিহিত। মার্টিন লুথার এই পদটিকে "ক্ষুদ্রাকৃতির বাইবেল" (The Bible in Miniature) বলে অভিহিত করেছিলেন। আজ আমরা দেখব ঈশ্বরের ভালোবাসার মাত্রা কত গভীর এবং তা আমাদের জীবনকে কীভাবে চিরতরে রূপান্তর করতে পারে।',
        biblicalContextBn: 'যোহন ৩ অধ্যায়ে প্রভু যীশু এবং ফরীশী নীকদীমের মধ্যে গভীর এক নিশীথকালীন কথোপকথন সংঘটিত হয়। ব্যবস্থার শিক্ষক হওয়া সত্ত্বেও নীকদীম আত্মিক পুনর্জন্ম বুঝতে পারছিলেন না। যীশু মোশির তামার সাপের দৃষ্টান্ত (গণনা ২১:৮-৯) উল্লেখ করে ঘোষণা করলেন যে মনুষ্যপুত্রকেও ক্রুশে উত্তোলিত হতে হবে, যেন জগতের মানুষ পাপের বিষ থেকে রক্ষা পায়।',
        historicalLiteraryContextBn: 'প্রথম শতাব্দীর রোমীয় ও যিহূদী সমাজে ঈশ্বরের প্রেমকে সাধারণত কঠোর শর্তাধীন বা কেবল বিশেষ গোত্রের জন্য বিবেচনা করা হতো। কিন্তু প্রেরিত যোহন এখানে ঘোষণা করছেন ঈশ্বরের প্রেম কোনো ভৌগোলিক বা জাতিগত সীমানায় আবদ্ধ নয়—তিনি সমগ্র "জগৎকে" (গ্রীক: kosmos) ভালোবেসেছেন।',
        points: [
          {
            id: 'pt_1',
            pointNumber: 1,
            titleBn: 'ঈশ্বরের প্রেমের অতুলনীয় প্রকৃতি ও উৎস',
            scriptureReference: 'যোহন ৩:১৬ক; রোমীয় ৫:৮',
            explanationBn: 'ঈশ্বর প্রেমের সূচনা করেছেন যখন আমরা পাপী ও নিঃস্ব ছিলাম। ঈশ্বরের ভালোবাসা আমাদের যোগ্যতার ওপর নির্ভর করে না, বরং তাঁর নিজ পবিত্র স্বভাবের বহিঃপ্রকাশ।',
            supportingScriptureBn: 'রোমীয় ৫:৮ — "কিন্তু ঈশ্বর আমাদের প্রতি তাঁহার নিজের প্রেমের প্রমাণ দিতেছেন, কারণ আমরা যখন পাপী ছিলাম, তখনও খ্রীষ্ট আমাদের নিমিত্ত প্রাণ দিলেন।"',
            practicalApplicationBn: 'আপনি যখন নিজেকে অযোগ্য ও অপরাধী মনে করেন, স্মরণ রাখুন ঈশ্বরের প্রেম অপরিবর্তনীয়। মানুষের প্রত্যাখ্যানে ভেঙে না পড়ে ঈশ্বরের নিঃশর্ত প্রেমে আশ্রয় নিন।',
          },
          {
            id: 'pt_2',
            pointNumber: 2,
            titleBn: 'ঈশ্বরের প্রেমের পরম ত্যাগ — একমাত্র পুত্রের দান',
            scriptureReference: 'যোহন ৩:১৬খ; ১ যোহন ৪:৯-১০',
            explanationBn: 'খাঁটি প্রেম সর্বদা দান করে। পিতা ঈশ্বর স্বর্গের শ্রেষ্ঠ ধন, তাঁর একমাত্র প্রিয় পুত্রকে কালভারীর ক্রুশে বলিদান হতে সমর্পণ করলেন। এর চেয়ে মহান উপহার জগতে আর হতে পারে না।',
            supportingScriptureBn: '১ যোহন ৪:১০ — "আমরা যে ঈশ্বরকে প্রেম করিয়াছি, তাহা নয়, কিন্তু তিনিই আমাদিগকে প্রেম করিলেন, এবং আপন পুত্রকে আমাদের পাপের প্রায়শ্চিত্ত হইবার জন্য প্রেরণ করিলেন।"',
            practicalApplicationBn: 'আমরা কি ঈশ্বরের সেই আত্মত্যাগী দানের উপযুক্ত প্রতিক্রিয়া জানাচ্ছি? আমাদের সময়, মেধা ও হৃদয় কি খ্রীষ্টের সেবায় নিবেদিত?',
          },
          {
            id: 'pt_3',
            pointNumber: 3,
            titleBn: 'পরিত্রাণের সরল অথচ অনন্য শর্ত — বিশ্বাস ও অনন্ত জীবন',
            scriptureReference: 'যোহন ৩:১৬গ; ইফিষীয় ২:৮-৯',
            explanationBn: 'পরিত্রাণ কোনো মানুষের নিজস্ব কাজ বা যোগ্যতার দ্বারা অর্জিত হয় না। এটি কেবল খ্রীষ্টে ব্যক্তিগত বিশ্বাসের মাধ্যমে অনুগ্রহের উপহার হিসেবে গ্রহণ করতে হয়। এর ফল হলো চিরস্থায়ী বিনাশ থেকে উদ্ধার এবং অনন্ত জীবনের মহিমান্বিত উত্তরাধিকার।',
            supportingScriptureBn: 'ইফিষীয় ২:৮ — "কেননা অনুগ্রহেই বিশ্বাস দ্বারা তোমরা পরিত্রাণ পাইয়াছ; এবং ইহা তো তোমাদের হইতে হয় নাই, ঈশ্বরেরই দান।"',
            practicalApplicationBn: 'আজই আপনার জীবন খ্রীষ্টের চরণে সমর্পণ করুন। যারা ইতিমধ্যে বিশ্বাসী, আসুন আমরা বিনাশের পথে থাকা ভাইবোনদের কাছে সুসমাচারের এই আলো বহন করে নিয়ে যাই।',
          },
        ],
        illustrationSuggestionsBn: [
          '১. একটি উদ্ধারকারী জাহাজের রূপক: ডুবন্ত জাহাজে আটকে থাকা মানুষ নিজের শক্তিতে সাঁতরে কূলে পৌঁছাতে পারে না, কেবল লাইফবোটে বিশ্বাস রেখে আত্মসমর্পণ করলেই সে বাঁচে। খ্রীষ্ট হলেন আমাদের সেই পরম উদ্ধারকর্তা।',
          '২. পিতা ও পুত্রের ত্যাগের রূপক: সেতু চালকের হৃদয়বিদারক সিদ্ধান্ত—শত শত যাত্রীবাহী ট্রেনকে রক্ষা করতে নিজের প্রিয় সন্তানকে উৎসর্গ করার আত্মত্যাগী দৃষ্টান্ত, যা পিতার ক্রুশের আত্মত্যাগকে কিছুটা হলেও অনুভব করতে সাহায্য করে।',
        ],
        practicalApplicationBn: [
          '১. ব্যক্তিগত নিশ্চিতকরণ: আজ নিজের হৃদয়কে প্রশ্ন করুন—আমি কি কেবল ধর্ম পালন করছি, নাকি ব্যক্তিগতভাবে জীবন্ত খ্রীষ্টকে বিশ্বাস করেছি?',
          '২. ক্ষমার অনুশীলন: ঈশ্বর যেমন আমাদের সমস্ত পাপ ক্ষমা করেছেন, আমরাও যেন পরিবারের সদস্য ও প্রতিবেশীদের প্রতি ক্ষমা ও প্রেম প্রদর্শন করি।',
          '৩. সুসমাচার অংশীদারিত্ব: এই সপ্তাহে অন্তত একজন অবিশ্বাসী বা হতাশ ব্যক্তির সাথে যোহন ৩:১৬ এর আশার বার্তা ভাগ করে নিন।',
        ],
        reflectionQuestionsBn: [
          '১. ঈশ্বরের প্রেম সম্পর্কে আপনার ব্যক্তিগত ধারণা কী? আপনি কি সত্যিই বিশ্বাস করেন ঈশ্বর আপনাকে ব্যক্তিগতভাবে ভালোবাসেন?',
          '২. "বিনষ্ট না হয়, কিন্তু অনন্ত জীবন পায়" — এই বাক্যটি আপনার দৈনন্দিন জীবনের অগ্রাধিকারকে কীভাবে প্রভাবিত করে?',
          '৩. এই সপ্তাহে ঈশ্বরের প্রেমের বাস্তব প্রমাণ হিসেবে আপনি কার কাছে প্রেমের হাত বাড়িয়ে দিতে পারেন?',
        ],
        conclusionBn: 'মণ্ডলী, জগতের ভালোবাসা ক্ষণস্থায়ী এবং শর্তযুক্ত; কিন্তু কালভারীর ক্রুশে প্রসারিত ঈশ্বরের হাত দুটি আজও ডেকে বলছে: "যে কেহ তাঁহাতে বিশ্বাস করে, সে বিনষ্ট না হয়, কিন্তু অনন্ত জীবন পায়।" আসুন আমরা সেই মহান প্রেমে আমাদের হৃদয় সমর্পণ করি।',
        closingPrayerBn: 'হে আমাদের স্বর্গীয় পিতা, জগতের সৃষ্টি কর্তা এবং অনন্ত প্রেমের আধার, আমরা তোমাকে ধন্যবাদ জানাই তোমার একমাত্র পুত্র প্রভু যীশু খ্রীষ্টের বহুমূল্য দানের জন্য। ক্রুশের প্রেমের গভীরতা বোঝার জন্য আমাদের হৃদয় উন্মুক্ত করে দাও। আমাদের সমস্ত অবিশ্বাস ও দুর্বলতা দূর কর। আমরা যেন প্রতিদিন তোমার ভালোবাসায় বসবাস করি এবং অন্যদের মাঝে সেই প্রেমের আলো ছড়াতে পারি। আমাদের পরিত্রাতা প্রভু যীশুর নামে প্রার্থনা করি। আমেন।',
      },
      fullMarkdownText: '',
    };

    return [sample];
  }
}
