// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// “দীপ — আপনার বাইবেল অধ্যয়ন সহায়ক”
// CHRISTIAN COMMUNITY DISCOVERY & OUTREACH QUEUE SERVICE
// Owner: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)
// Tagline: পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
// ============================================================

import { OutreachCommunity, OutreachPermissionStatus } from '../types/deepDailyWord';
import { CANONICAL_SITE_URL, OFFICIAL_APPROVER } from '../data/deepScriptureEngine';

export const OFFICIAL_PERMISSION_REQUEST_TEMPLATE = `
নমস্কার/খ্রিষ্টীয় শুভেচ্ছা।

আমি Rev. Ayan Kumar Ghosh-এর বাংলা Bible Study উদ্যোগের পক্ষ থেকে যোগাযোগ করছি। এই প্ল্যাটফর্মে বাংলা ভাষায় বিনামূল্যে বাইবেল পাঠ, অধ্যয়ন-সহায়িকা এবং প্রতিদিনের নির্বাচিত বাক্য প্রকাশ করা হয়।

আপনাদের গ্রুপের নিয়ম ও উদ্দেশ্যের প্রতি সম্মান রেখে জানতে চাই—আপনাদের অনুমতি নিয়ে কি মাঝে মাঝে একটি বাইবেল পদ ও সংশ্লিষ্ট অধ্যয়নের লিংক শেয়ার করা যাবে?

আপনার অনুমতি ছাড়া কোনো পোস্ট করা হবে না এবং কোনো সদস্যকে ব্যক্তিগতভাবে বার্তা পাঠানো হবে না।

Bible Study link:
${CANONICAL_SITE_URL}

ধন্যবাদ ও ঈশ্বরের আশীর্বাদ কামনা করি।

Rev. Ayan Kumar Ghosh
`.trim();

/**
 * Initial curated directory of verified public Bengali Christian communities
 */
export const INITIAL_OUTREACH_COMMUNITIES: OutreachCommunity[] = [
  {
    id: 'outreach-01',
    name: 'বাংলা খ্রিষ্টীয় ফেলোশিপ ও বাইবেল অধ্যয়ন ফোরাম',
    url: 'https://facebook.com/groups/bengali-christian-fellowship',
    platform: 'FACEBOOK_GROUP',
    language: 'Bengali',
    region: 'West Bengal & Global',
    purpose: 'বাংলা ভাষাভাষী খ্রিষ্টানদের আধ্যাত্মিক সংযোগ ও বাইবেল পাঠের আলোচনা',
    publicContactMethod: 'অ্যাডমিন মেসেজ / উন্মুক্ত পোস্ট গাইডলাইন',
    postingRules: 'শুধুমাত্র গঠনমূলক আত্মিক আলোচনা অনুমোদিত; রাজনৈতিক প্রচার নিষিদ্ধ। অ্যাডমিন অনুমোদন কাম্য।',
    permissionStatus: 'UNCHECKED',
    isExcluded: false,
    proposedMessage: OFFICIAL_PERMISSION_REQUEST_TEMPLATE,
  },
  {
    id: 'outreach-02',
    name: 'কলকাতা খ্রিষ্টীয় মণ্ডলী ও ফেলোশিপ সংযোগ',
    url: 'https://facebook.com/kolkata-christian-ministries',
    platform: 'FACEBOOK_PAGE',
    language: 'Bengali / English',
    region: 'Kolkata, India',
    purpose: 'মণ্ডলী ও আত্মিক সেবাকার্যের তথ্য ও প্রার্থনা সহায়তা',
    publicContactMethod: 'অফিসিয়াল পেজ ইনবক্স / ইমেইল',
    postingRules: 'প্রাসঙ্গিক শাস্ত্রীয় রিসোর্স শেয়ারিং অনুমোদিত।',
    permissionStatus: 'UNCHECKED',
    isExcluded: false,
    proposedMessage: OFFICIAL_PERMISSION_REQUEST_TEMPLATE,
  },
  {
    id: 'outreach-03',
    name: 'বাংলাদেশ খ্রিষ্টীয় যুব সমাজ ও ছাত্র আন্দোলন',
    url: 'https://facebook.com/groups/bangladesh-christian-youth',
    platform: 'FACEBOOK_GROUP',
    language: 'Bengali',
    region: 'Bangladesh',
    purpose: 'খ্রিষ্টীয় তরুণ সমাজের চরিত্র গঠন ও শাস্ত্রীয় শিক্ষা প্রচার',
    publicContactMethod: 'মডারেটর ইনবক্স',
    postingRules: 'অনুমতি ব্যতীত কোনো বহিরাগত প্রচার নিষিদ্ধ।',
    permissionStatus: 'UNCHECKED',
    isExcluded: false,
    proposedMessage: OFFICIAL_PERMISSION_REQUEST_TEMPLATE,
  },
  {
    id: 'outreach-04',
    name: 'বাংলা স্টাডি বাইবেল অফিসিয়াল WhatsApp চ্যানেল',
    url: 'https://whatsapp.com/channel/bengali-study-bible',
    platform: 'WHATSAPP_CHANNEL',
    language: 'Bengali',
    region: 'Global',
    purpose: 'রেভাঃ অয়ন কুমার ঘোষের পরিচালনায় একমুখী সরাসরি দৈনিক শাস্ত্রাংশ বিতরণ',
    publicContactMethod: 'অফিসিয়াল একমুখী চ্যানেল',
    postingRules: 'অফিসিয়াল অ্যাডমিন কনটেন্ট একমাত্র অনুমোদিত।',
    permissionStatus: 'PERMISSION_GRANTED',
    permissionGrantedAt: new Date().toISOString(),
    isExcluded: false,
  },
  {
    id: 'outreach-05',
    name: 'উত্তরবঙ্গ ও পাহাড়ী অঞ্চলের মণ্ডলী ডিরেক্টরি',
    url: 'https://bengalichristiandirectory.org/north-bengal',
    platform: 'CHURCH_DIRECTORY',
    language: 'Bengali',
    region: 'Siliguri & North Bengal',
    purpose: 'মণ্ডলীসমূহের যোগাযোগ ও আত্মিক রিসোর্স প্রাপ্তির উন্মুক্ত ডিরেক্টরি',
    publicContactMethod: 'ডিরেক্টরি পাবলিক ফর্ম',
    postingRules: 'পাবলিক ডোমেইন স্টাডি টুল লিংক প্রদর্শন অনুমোদিত।',
    permissionStatus: 'UNCHECKED',
    isExcluded: false,
    proposedMessage: OFFICIAL_PERMISSION_REQUEST_TEMPLATE,
  }
];

export class DeepOutreachService {
  private static readonly STORAGE_KEY_COMMUNITIES = 'bsb_deep_outreach_communities_v1';

  public static getAllCommunities(): OutreachCommunity[] {
    try {
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem(this.STORAGE_KEY_COMMUNITIES);
        if (raw) {
          const list = JSON.parse(raw);
          if (Array.isArray(list) && list.length > 0) return list;
        }
      }
    } catch {}
    return INITIAL_OUTREACH_COMMUNITIES;
  }

  public static saveAllCommunities(list: OutreachCommunity[]): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY_COMMUNITIES, JSON.stringify(list));
      }
    } catch (e) {
      console.error('Failed to save outreach communities:', e);
    }
  }

  /**
   * Update permission status for a community (Approval Queue Controls)
   */
  public static updatePermission(
    id: string,
    status: OutreachPermissionStatus,
    notes?: string
  ): OutreachCommunity | null {
    return this.updatePermissionStatus(id, status, notes);
  }

  public static updatePermissionStatus(
    id: string,
    status: OutreachPermissionStatus,
    notes?: string
  ): OutreachCommunity | null {
    const list = this.getAllCommunities();
    const idx = list.findIndex((c) => c.id === id);
    if (idx >= 0) {
      list[idx].permissionStatus = status;
      if (status === 'PERMISSION_GRANTED') {
        list[idx].permissionGrantedAt = new Date().toISOString();
      } else if (status === 'REQUEST_PENDING') {
        list[idx].permissionRequestedAt = new Date().toISOString();
      }
      if (notes) list[idx].notes = notes;
      this.saveAllCommunities(list);
      return list[idx];
    }
    return null;
  }

  /**
   * Edit proposed outreach message for a community
   */
  public static editProposedMessage(id: string, newMessage: string): boolean {
    const list = this.getAllCommunities();
    const idx = list.findIndex((c) => c.id === id);
    if (idx >= 0) {
      list[idx].proposedMessage = newMessage;
      this.saveAllCommunities(list);
      return true;
    }
    return false;
  }

  /**
   * Exclude a community permanently from outreach
   */
  public static excludeCommunity(id: string, reason?: string): boolean {
    const list = this.getAllCommunities();
    const idx = list.findIndex((c) => c.id === id);
    if (idx >= 0) {
      list[idx].isExcluded = true;
      list[idx].permissionStatus = 'EXCLUDED';
      if (reason) list[idx].notes = `Excluded: ${reason}`;
      this.saveAllCommunities(list);
      return true;
    }
    return false;
  }

  /**
   * Add a newly discovered public community to the approval queue
   */
  public static addCommunity(community: Omit<OutreachCommunity, 'id'>): OutreachCommunity {
    const list = this.getAllCommunities();
    const newEntry: OutreachCommunity = {
      ...community,
      id: `comm_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      permissionStatus: 'UNCHECKED',
      proposedMessage: community.proposedMessage || OFFICIAL_PERMISSION_REQUEST_TEMPLATE,
    };
    list.push(newEntry);
    this.saveAllCommunities(list);
    return newEntry;
  }
}
