// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// GLOBAL DISTRIBUTION & CAMPAIGN ATTRIBUTION SERVICE
// Founder, Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Support Email: ayanghosh75@gmail.com
// Tagline: পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
// ============================================================

import { AnalyticsService } from './analyticsService';

export const CANONICAL_PRODUCTION_URL = 'https://bengalistudybible.com';

export type CampaignChannel =
  | 'whatsapp'
  | 'facebook'
  | 'church_bulletin'
  | 'conference'
  | 'seminary'
  | 'youth'
  | 'print_qr'
  | 'ambassador'
  | 'direct';

export type CampaignTarget =
  | 'home'
  | 'install'
  | 'bible'
  | 'sermon'
  | 'study'
  | 'partners'
  | 'beta'
  | 'academy';

export interface CampaignDefinition {
  id: string;
  nameBn: string;
  channel: CampaignChannel;
  target: CampaignTarget;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  refCode?: string;
  descriptionBn: string;
  suggestedMessageBn: string;
}

export interface InboundCampaignRecord {
  refCode?: string;
  source: string;
  medium?: string;
  campaign?: string;
  content?: string;
  timestamp: string;
  landingRoute: string;
}

export interface GlobalRegionInfo {
  regionId: 'india' | 'bangladesh' | 'north_america' | 'uk_europe' | 'middle_east' | 'asia_pacific' | 'other';
  labelBn: string;
  labelEn: string;
  flag: string;
  isDiaspora: boolean;
}

export class CampaignService {
  private static readonly INBOUND_STORAGE_KEY = 'bsb_inbound_utm_v1';
  private static readonly CAMPAIGN_ROLLUP_KEY = 'bsb_campaign_rollups_v1';

  /**
   * Safe dynamic base URL resolver:
   * Returns current origin in browser or fallback canonical URL.
   */
  public static getBaseUrl(): string {
    if (typeof window !== 'undefined' && window.location && window.location.origin) {
      const origin = window.location.origin;
      // Handle local or tunnel origins safely
      if (origin.startsWith('http://') || origin.startsWith('https://')) {
        return origin;
      }
    }
    return CANONICAL_PRODUCTION_URL;
  }

  /**
   * Target route mapper
   */
  public static getTargetRoute(target: CampaignTarget): string {
    switch (target) {
      case 'home':
        return '/';
      case 'install':
        return '/install';
      case 'bible':
        return '/bible';
      case 'sermon':
        return '/sermon';
      case 'study':
        return '/study';
      case 'partners':
        return '/partners';
      case 'beta':
        return '/beta';
      case 'academy':
        return '/academy';
      default:
        return '/';
    }
  }

  /**
   * Generates a verified, privacy-safe campaign URL
   */
  public static buildCampaignUrl(options: {
    target?: CampaignTarget;
    channel: CampaignChannel;
    campaignName: string;
    refCode?: string;
    content?: string;
    useCanonicalDomain?: boolean;
  }): string {
    const base = options.useCanonicalDomain ? CANONICAL_PRODUCTION_URL : this.getBaseUrl();
    const route = this.getTargetRoute(options.target || 'home');
    
    // Construct sanitized query params
    const params = new URLSearchParams();

    // Ambassador code
    if (options.refCode && options.refCode.trim()) {
      params.set('ref', options.refCode.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, ''));
    }

    // Standard UTMs
    params.set('utm_source', options.channel);
    params.set('utm_medium', this.channelToMedium(options.channel));
    params.set('utm_campaign', this.sanitizeSlug(options.campaignName));

    if (options.content) {
      params.set('utm_content', this.sanitizeSlug(options.content));
    }

    const queryString = params.toString();
    const separator = route.includes('?') ? '&' : '?';
    return `${base}${route}${queryString ? `${separator}${queryString}` : ''}`;
  }

  private static channelToMedium(channel: CampaignChannel): string {
    switch (channel) {
      case 'whatsapp':
        return 'chat';
      case 'facebook':
        return 'social';
      case 'church_bulletin':
      case 'conference':
      case 'seminary':
      case 'youth':
        return 'ministry_outreach';
      case 'print_qr':
        return 'offline_qr';
      case 'ambassador':
        return 'referral';
      default:
        return 'organic';
    }
  }

  private static sanitizeSlug(str: string): string {
    return str
      .trim()
      .toLowerCase()
      .replace(/[\s\t\n]+/g, '_')
      .replace(/[^a-z0-9_-]/g, '')
      .substring(0, 40) || 'organic';
  }

  /**
   * Privacy-preserving region detection based on browser timezone and locale
   * STRICT GUARANTEE: Never uses GPS, never profiles individual users.
   */
  public static detectClientRegion(): GlobalRegionInfo {
    try {
      if (typeof window !== 'undefined' && Intl && Intl.DateTimeFormat) {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        const tzLower = timeZone.toLowerCase();

        // 1. Bangladesh
        if (tzLower.includes('dhaka') || tzLower.includes('asia/dhaka')) {
          return {
            regionId: 'bangladesh',
            labelBn: 'বাংলাদেশ',
            labelEn: 'Bangladesh',
            flag: '🇧🇩',
            isDiaspora: false,
          };
        }

        // 2. India
        if (
          tzLower.includes('kolkata') ||
          tzLower.includes('calcutta') ||
          tzLower.includes('asia/kolkata') ||
          tzLower.includes('asia/calcutta')
        ) {
          return {
            regionId: 'india',
            labelBn: 'ভারত (পশ্চিমবঙ্গ ও অন্যান্য রাজ্য)',
            labelEn: 'India',
            flag: '🇮🇳',
            isDiaspora: false,
          };
        }

        // 3. Middle East / Gulf Diaspora
        if (
          tzLower.includes('dubai') ||
          tzLower.includes('riyadh') ||
          tzLower.includes('qatar') ||
          tzLower.includes('kuwait') ||
          tzLower.includes('muscat') ||
          tzLower.includes('bahrain')
        ) {
          return {
            regionId: 'middle_east',
            labelBn: 'মধ্যপ্রাচ্য ও উপসাগরীয় প্রবাসী অঞ্চল',
            labelEn: 'Middle East & Gulf',
            flag: '🇦🇪',
            isDiaspora: true,
          };
        }

        // 4. North America Diaspora
        if (
          tzLower.startsWith('america/') ||
          tzLower.startsWith('us/') ||
          tzLower.startsWith('canada/')
        ) {
          return {
            regionId: 'north_america',
            labelBn: 'উত্তর আমেরিকা (যুক্তরাষ্ট্র ও কানাডা প্রবাসী)',
            labelEn: 'North America (USA & Canada)',
            flag: '🇺🇸',
            isDiaspora: true,
          };
        }

        // 5. UK & Europe Diaspora
        if (tzLower.startsWith('europe/') || tzLower.startsWith('atlantic/')) {
          return {
            regionId: 'uk_europe',
            labelBn: 'যুক্তরাজ্য ও ইউরোপীয় প্রবাসী অঞ্চল',
            labelEn: 'UK & Europe',
            flag: '🇬🇧',
            isDiaspora: true,
          };
        }

        // 6. Asia-Pacific Diaspora
        if (
          tzLower.includes('singapore') ||
          tzLower.includes('kuala_lumpur') ||
          tzLower.includes('australia/') ||
          tzLower.includes('sydney') ||
          tzLower.includes('melbourne') ||
          tzLower.includes('pacific/')
        ) {
          return {
            regionId: 'asia_pacific',
            labelBn: 'এশিয়া-প্রশান্ত মহাসাগরীয় প্রবাসী অঞ্চল',
            labelEn: 'Asia-Pacific',
            flag: '🇦🇺',
            isDiaspora: true,
          };
        }
      }
    } catch {
      // Fallback
    }

    return {
      regionId: 'other',
      labelBn: 'বিশ্বের অন্যান্য অঞ্চল',
      labelEn: 'Global / Other',
      flag: '🌐',
      isDiaspora: true,
    };
  }

  /**
   * Process and record inbound campaign attribution on app launch
   */
  public static processInboundReferral(): InboundCampaignRecord | null {
    if (typeof window === 'undefined' || !window.location) return null;

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const ref = urlParams.get('ref') || urlParams.get('ambassador') || undefined;
      const source = urlParams.get('utm_source');
      const medium = urlParams.get('utm_medium') || undefined;
      const campaign = urlParams.get('utm_campaign') || undefined;
      const content = urlParams.get('utm_content') || undefined;

      // Only record if at least ref or utm_source is present
      if (!ref && !source) return null;

      const record: InboundCampaignRecord = {
        refCode: ref ? ref.trim().toUpperCase() : undefined,
        source: source || (ref ? 'ambassador' : 'organic'),
        medium,
        campaign,
        content,
        timestamp: new Date().toISOString(),
        landingRoute: window.location.pathname || '/',
      };

      // Store in inbound history
      const existing: InboundCampaignRecord[] = JSON.parse(
        localStorage.getItem(this.INBOUND_STORAGE_KEY) || '[]'
      );
      existing.unshift(record);
      localStorage.setItem(this.INBOUND_STORAGE_KEY, JSON.stringify(existing.slice(0, 50)));

      // Update aggregate rollups
      this.recordCampaignRollup(record);

      // Track in analytics service
      AnalyticsService.trackCampaignAttribution(
        record.campaign || 'direct',
        record.source,
        record.medium,
        record.refCode
      );

      return record;
    } catch (e) {
      console.warn('[CampaignService] Inbound referral capture error:', e);
      return null;
    }
  }

  private static recordCampaignRollup(record: InboundCampaignRecord): void {
    try {
      const current = JSON.parse(localStorage.getItem(this.CAMPAIGN_ROLLUP_KEY) || '{}');
      const key = record.refCode ? `ref_${record.refCode}` : `src_${record.source}`;
      current[key] = (current[key] || 0) + 1;
      localStorage.setItem(this.CAMPAIGN_ROLLUP_KEY, JSON.stringify(current));
    } catch {}
  }

  /**
   * Pre-configured ministry outreach templates
   */
  public static getOfficialPresets(): CampaignDefinition[] {
    const baseUrl = this.getBaseUrl();

    return [
      {
        id: 'wa-church-bulletin',
        nameBn: 'মণ্ডলীর উপাসনা ও হোয়াটসঅ্যাপ ঘোষণা',
        channel: 'whatsapp',
        target: 'partners',
        utmSource: 'whatsapp',
        utmMedium: 'chat',
        utmCampaign: 'church_announcement',
        descriptionBn: 'মণ্ডলীর উপাসনায় এবং হোয়াটসঅ্যাপ গ্রুপে আনুষ্ঠানিকভাবে বিশ্বাসীদের আমন্ত্রণ জানানোর বার্তা।',
        suggestedMessageBn: `প্রিয় বিশ্বাসী ভাই ও বোনেরা, জয়যীশু! 🕊️

বাংলা ভাষায় শাস্ত্রের গভীর পাঠ, গবেষণা ও শিক্ষাদানের জন্য প্রস্তুত করা হয়েছে "বাংলা স্টাডি বাইবেল" (Bengali Study Bible)। এটি সম্পূর্ণ বিনামূল্যে, বিশুদ্ধ ক্যানোনিকাল ও কোনো বিজ্ঞাপন নেই।

পবিত্র বাইবেল পাঠ, বিষয়ভিত্তিক স্টাডি ও ফোনে সহজে ব্যবহার করতে এখানে ক্লিক করুন:
${baseUrl}/partners?utm_source=whatsapp&utm_medium=chat&utm_campaign=church_announcement

প্রতিষ্ঠাতা ও প্রস্তুতকারক: রেভা. অয়ন কুমার ঘোষ
পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন`,
      },
      {
        id: 'fb-community-share',
        nameBn: 'ফেসবুক খ্রীষ্টিয়ান সম্প্রদায় পোস্ট',
        channel: 'facebook',
        target: 'home',
        utmSource: 'facebook',
        utmMedium: 'social',
        utmCampaign: 'fb_fellowship',
        descriptionBn: 'ফেসবুক টাইমলাইন, পেজ ও বিশ্বাসী বন্ধুদের সাথে শেয়ারের জন্য সুসংগঠিত পোস্ট।',
        suggestedMessageBn: `📖 বাংলা স্টাডি বাইবেল (Bengali Study Bible) — সম্পূর্ণ বিনামূল্যে ও বিজ্ঞাপনহীন!

বাংলাভাষী প্রতিটি খ্রীষ্টবিশ্বাসীর জন্য তৈরি এক আধুনিক ডিজিটাল শাস্ত্রীয় সংস্থান।
✓ ৬৬ পুস্তকের বিশুদ্ধ ক্যানন
✓ মূল গ্রিক/ইব্রীয় স্ট্রংস রেফারেন্স
✓ বিষয়ভিত্তিক গবেষণা ও চার্ট
✓ অফলাইন সহায়তা ও মোবাইল অ্যাপ মোড

আজই ব্যবহার শুরু করুন:
${baseUrl}/?utm_source=facebook&utm_medium=social&utm_campaign=fb_fellowship`,
      },
      {
        id: 'pastors-fraternal',
        nameBn: 'পালকীয় সম্মেলন ও ফেলোশিপ',
        channel: 'conference',
        target: 'sermon',
        utmSource: 'conference',
        utmMedium: 'ministry_outreach',
        utmCampaign: 'pastors_fellowship',
        descriptionBn: 'পালক ও সুসমাচার প্রচারকদের জন্য সার্মন বিল্ডার ও ধর্মতাত্ত্বিক গবেষণার আমন্ত্রণ।',
        suggestedMessageBn: `শ্রদ্ধেয় পালক ও প্রচারকবৃন্দ,
সাপ্তাহিক উপাসনা প্রচার ও শিক্ষার প্রস্তুতিতে বাংলা ভাষায় ধর্মতাত্ত্বিক রূপরেখা, মূল শব্দের অর্থ ও ঐতিহাসিক প্রেক্ষাপট পেতে ব্যবহার করুন "বাংলা স্টাডি বাইবেল সার্মন বিল্ডার"।

সরাসরি প্রবেশ করুন:
${baseUrl}/sermon?utm_source=conference&utm_medium=ministry_outreach&utm_campaign=pastors_fellowship`,
      },
      {
        id: 'theological-seminary',
        nameBn: 'বাইবেল কলেজ ও সেমিনারি শিক্ষার্থী কিট',
        channel: 'seminary',
        target: 'beta',
        utmSource: 'seminary',
        utmMedium: 'ministry_outreach',
        utmCampaign: 'seminary_students',
        descriptionBn: 'ধর্মতত্ত্বের ছাত্র ও অধ্যাপকদের জন্য ক্যানোনিকাল বিশুদ্ধ গবেষণা প্ল্যাটফর্ম।',
        suggestedMessageBn: `থিওলজি ও বাইবেল গবেষণার প্রিয় ছাত্র ও শিক্ষকবৃন্দ,
বাংলা বাইবেলের মূল পাণ্ডুলিপি ও ঐতিহাসিক তথ্যাদি সংবলিত "বাংলা স্টাডি বাইবেল পাবলিক বিটা" উন্মুক্ত করা হয়েছে। আপনাদের গঠনমূলক একাডেমিক প্রতিক্রিয়া সাদরে কাম্য।

পাবলিক বিটায় যোগ দিন:
${baseUrl}/beta?utm_source=seminary&utm_medium=ministry_outreach&utm_campaign=seminary_students`,
      },
      {
        id: 'diaspora-fellowship',
        nameBn: 'প্রবাসী বাংলাভাষী বিশ্বাসী ফেলোশিপ',
        channel: 'whatsapp',
        target: 'install',
        utmSource: 'whatsapp',
        utmMedium: 'chat',
        utmCampaign: 'diaspora_outreach',
        descriptionBn: 'ভারত ও বাংলাদেশের বাইরে (UK, USA, Canada, Middle East, Australia) বসবাসরত প্রবাসী ফেলোশিপ।',
        suggestedMessageBn: `বিশ্বের বিভিন্ন দেশে বসবাসরত সকল বাংলাভাষী বিশ্বাসীদের শুভেচ্ছা ও ভালোবাসা! 🌍
আপনার স্মার্টফোনে মাতৃভাষায় সহজে বাইবেল পাঠ ও গভীর গবেষণার জন্য বাংলা স্টাডি বাইবেল অ্যাপ হিসেবে যুক্ত করুন:

সহজ ইনস্টলেশন নির্দেশিকা:
${baseUrl}/install?utm_source=whatsapp&utm_medium=chat&utm_campaign=diaspora_outreach`,
      },
      {
        id: 'print-poster-church',
        nameBn: 'মুদ্রিত চার্চ নোটিশ ও এ৪ পোস্টার',
        channel: 'print_qr',
        target: 'install',
        utmSource: 'print_qr',
        utmMedium: 'offline_qr',
        utmCampaign: 'church_poster_a4',
        descriptionBn: 'গির্জার নোটিশ বোর্ডে মুদ্রিত কিউআর কোডের মাধ্যমে ফোনের ক্যামেরায় স্ক্যান করে ব্যবহারের লিংক।',
        suggestedMessageBn: `গির্জার নোটিশ বোর্ডে পোস্টার টানিয়ে দিন। মোবাইলের ক্যামেরা দিয়ে কিউআর কোড স্ক্যান করলেই সরাসরি অ্যাপ ইনস্টল হবে:
${baseUrl}/install?utm_source=print_qr&utm_medium=offline_qr&utm_campaign=church_poster_a4`,
      },
    ];
  }

  /**
   * Helper to copy text to clipboard safely
   */
  public static async copyToClipboard(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    } catch {
      return false;
    }
  }
}
