import { ChurchTenant, ChurchMember, ChurchAnnouncement, ChurchSermonArchiveItem, ChurchPrayerRequest } from '../types/church';

const CHURCH_STORAGE_KEY = 'bsb_church_tenants_v1';
const ACTIVE_CHURCH_KEY = 'bsb_active_church_tenant_id';

export class ChurchService {
  public static getAllChurches(): ChurchTenant[] {
    try {
      const data = localStorage.getItem(CHURCH_STORAGE_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load church workspaces:', e);
    }
    return this.getInitialSampleChurches();
  }

  public static getActiveChurch(): ChurchTenant {
    const list = this.getAllChurches();
    try {
      const savedId = localStorage.getItem(ACTIVE_CHURCH_KEY);
      if (savedId) {
        const found = list.find((c) => c.id === savedId);
        if (found) return found;
      }
    } catch {
      // Fallback
    }
    return list[0] || this.getInitialSampleChurches()[0];
  }

  public static setActiveChurch(tenantId: string): void {
    try {
      localStorage.setItem(ACTIVE_CHURCH_KEY, tenantId);
    } catch (e) {
      console.error('Failed to set active church:', e);
    }
  }

  public static createChurch(params: {
    nameBn: string;
    denominationBn: string;
    contactEmail: string;
    ownerNameBn: string;
  }): ChurchTenant {
    const list = this.getAllChurches();
    const now = new Date().toISOString();
    const newChurch: ChurchTenant = {
      id: 'church_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      nameBn: params.nameBn.trim(),
      denominationBn: params.denominationBn.trim() || 'সাধারণ মূলধারা মণ্ডলী',
      preferredTranslationId: 'bsi-ben',
      isPrivate: true,
      contactEmail: params.contactEmail.trim(),
      members: [
        {
          id: 'mem_owner_' + Date.now(),
          nameBn: params.ownerNameBn.trim(),
          role: 'owner',
          emailOrPhone: params.contactEmail.trim(),
          joinedAt: now,
        },
      ],
      announcements: [
        {
          id: 'ann_welcome',
          titleBn: 'মণ্ডলী ওয়ার্কস্পেসে স্বাগতম',
          contentBn: 'আমাদের মণ্ডলীর প্রচার আর্কাইভ, বাইবেল পাঠ পরিকল্পনা ও আত্মিক সহভাগিতার কেন্দ্রীয় প্ল্যাটফর্ম প্রস্তুত।',
          priority: 'normal',
          authorNameBn: params.ownerNameBn.trim(),
          createdAt: now,
        },
      ],
      sermons: [],
      readingPlans: [
        {
          id: 'plan_gospel',
          titleBn: 'মণ্ডলীর যৌথ যোহন সুসমাচার পাঠ (২১ দিন)',
          durationDays: 21,
          activeMembersCount: 1,
          descriptionBn: 'প্রতিদিন এক অধ্যায় পাঠ ও সম্মিলিত প্রার্থনার আহ্বান।',
        },
      ],
      prayerRequests: [],
      auditLogs: [
        {
          id: 'log_init',
          actionBn: `মণ্ডলী ওয়ার্কস্পেস "${params.nameBn}" তৈরি করা হয়েছে।`,
          performedByBn: params.ownerNameBn.trim(),
          timestamp: now,
        },
      ],
      createdAt: now,
    };

    list.unshift(newChurch);
    this.persist(list);
    this.setActiveChurch(newChurch.id);
    return newChurch;
  }

  public static addMember(tenantId: string, member: Omit<ChurchMember, 'id' | 'joinedAt'>): void {
    const list = this.getAllChurches();
    const church = list.find((c) => c.id === tenantId);
    if (!church) return;

    const newMember: ChurchMember = {
      id: 'mem_' + Date.now() + '_' + Math.random().toString(36).slice(2, 5),
      nameBn: member.nameBn,
      role: member.role,
      emailOrPhone: member.emailOrPhone,
      joinedAt: new Date().toISOString(),
    };

    church.members.unshift(newMember);
    this.addAuditLog(tenantId, `নতুন সদস্য "${member.nameBn}" (${member.role}) যুক্ত করা হয়েছে।`, 'অ্যাডমিনিস্ট্রেটর');
    this.persist(list);
  }

  public static addAnnouncement(tenantId: string, titleBn: string, contentBn: string, authorNameBn: string): void {
    const list = this.getAllChurches();
    const church = list.find((c) => c.id === tenantId);
    if (!church) return;

    const announcement: ChurchAnnouncement = {
      id: 'ann_' + Date.now(),
      titleBn,
      contentBn,
      priority: 'normal',
      authorNameBn,
      createdAt: new Date().toISOString(),
    };

    church.announcements.unshift(announcement);
    this.addAuditLog(tenantId, `ঘোষণা "${titleBn}" প্রকাশ করা হয়েছে।`, authorNameBn);
    this.persist(list);
  }

  public static addSermon(tenantId: string, sermon: Omit<ChurchSermonArchiveItem, 'id'>): void {
    const list = this.getAllChurches();
    const church = list.find((c) => c.id === tenantId);
    if (!church) return;

    const item: ChurchSermonArchiveItem = {
      id: 'serm_' + Date.now(),
      ...sermon,
    };

    church.sermons.unshift(item);
    this.addAuditLog(tenantId, `প্রচার আর্কাইভ "${sermon.titleBn}" যুক্ত করা হয়েছে।`, sermon.preacherBn);
    this.persist(list);
  }

  public static addPrayerRequest(tenantId: string, req: Omit<ChurchPrayerRequest, 'id' | 'createdAt' | 'isAnswered'>): void {
    const list = this.getAllChurches();
    const church = list.find((c) => c.id === tenantId);
    if (!church) return;

    const item: ChurchPrayerRequest = {
      id: 'pr_' + Date.now(),
      ...req,
      createdAt: new Date().toISOString(),
      isAnswered: false,
    };

    church.prayerRequests.unshift(item);
    this.persist(list);
  }

  public static addAuditLog(tenantId: string, actionBn: string, performedByBn: string): void {
    const list = this.getAllChurches();
    const church = list.find((c) => c.id === tenantId);
    if (!church) return;

    church.auditLogs.unshift({
      id: 'log_' + Date.now(),
      actionBn,
      performedByBn,
      timestamp: new Date().toISOString(),
    });
  }

  private static persist(list: ChurchTenant[]): void {
    try {
      localStorage.setItem(CHURCH_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to persist church workspaces:', e);
    }
  }

  private static getInitialSampleChurches(): ChurchTenant[] {
    const now = new Date().toISOString();
    return [
      {
        id: 'church_sample_grace',
        nameBn: 'গ্রেস ব্যাপটিস্ট চার্চ ঢাকা (Grace Baptist Church)',
        denominationBn: 'ব্যাপটিস্ট ফেলোশিপ অব বাংলাদেশ',
        preferredTranslationId: 'bsi-ben',
        isPrivate: true,
        contactEmail: 'gracebaptist.dhaka@example.org',
        members: [
          {
            id: 'mem_1',
            nameBn: 'পালক যাকোব হালদার',
            role: 'owner',
            emailOrPhone: 'pastor.jacob@example.org',
            joinedAt: now,
          },
          {
            id: 'mem_2',
            nameBn: 'ডিকন পৌল সরকার',
            role: 'admin',
            emailOrPhone: '+880 1711 000111',
            joinedAt: now,
          },
          {
            id: 'mem_3',
            nameBn: 'মারিয়া বিশ্বাস (সানডে স্কুল শিক্ষিকা)',
            role: 'teacher',
            emailOrPhone: '+880 1819 222333',
            joinedAt: now,
          },
        ],
        announcements: [
          {
            id: 'ann_1',
            titleBn: 'রবিবারের সম্মিলিত আরাধনা ও নিস্তারপর্বের ভোজ',
            contentBn: 'আগামী রবিবার সকাল ১০:০০ টায় মণ্ডলী ভবনে নিস্তারপর্বের বিশেষ পবিত্র সহভাগিতা অনুষ্ঠিত হবে। সকলে প্রার্থনায় প্রস্তুত থাকুন।',
            priority: 'urgent',
            authorNameBn: 'পালক যাকোব হালদার',
            createdAt: now,
          },
        ],
        sermons: [
          {
            id: 'serm_1',
            titleBn: 'খ্রীষ্টের রক্তে পুনর্জন্ম ও শাশ্বত আশা',
            preacherBn: 'পালক যাকোব হালদার',
            passageRef: '১ পিতর ১:৩-৫',
            dateBn: 'রবিবার, ১৫ সেপ্টেম্বর ২০২৬',
            summaryBn: 'মৃতদের মধ্য থেকে যীশু খ্রীষ্টের পুনরুত্থানের দ্বারা ঈশ্বর আমাদের জীবন্ত আশার পুনর্জন্ম দান করেছেন।',
            isPublished: true,
          },
        ],
        readingPlans: [
          {
            id: 'plan_1',
            titleBn: 'মণ্ডলীর সম্মিলিত রোমীয় পত্র পাঠ (১৬ দিন)',
            durationDays: 16,
            activeMembersCount: 42,
            descriptionBn: 'প্রতিদিন রোমীয় পত্রের একটি করে অধ্যায় পাঠ ও পারিবারিক প্রার্থনা।',
          },
        ],
        prayerRequests: [
          {
            id: 'pr_1',
            titleBn: 'গ্রামাঞ্চলের দুর্বল মণ্ডলী ও পালকদের সুরক্ষার জন্য',
            detailsBn: 'শীতকালীন প্রতিকূলতায় উত্তরবঙ্গের ছোট ছোট মণ্ডলীর বিশ্বাসীদের সুস্থতা ও নিরাপত্তার জন্য বিশেষ প্রার্থনা।',
            requesterNameBn: 'পালক কমিটি',
            isConfidential: false,
            createdAt: now,
            isAnswered: false,
          },
        ],
        auditLogs: [
          {
            id: 'log_1',
            actionBn: 'মণ্ডলী ডিজিটাল ওয়ার্কস্পেস সফলভাবে সক্রিয় করা হয়েছে।',
            performedByBn: 'সিস্টেম অ্যাডমিনিস্ট্রেশন',
            timestamp: now,
          },
        ],
        createdAt: now,
      },
    ];
  }
}
