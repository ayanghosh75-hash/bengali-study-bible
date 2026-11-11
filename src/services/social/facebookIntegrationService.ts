// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// FACEBOOK GRAPH API INTEGRATION & MANUAL PUBLISHING SERVICE
// Project Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Contact: ayanghosh75@gmail.com
// ============================================================

import { FacebookPageConfig, SocialPost } from '../../types/social';

const FB_CONFIG_KEY = 'bsb_fb_page_config_v1';

export interface PublishResult {
  success: boolean;
  postId?: string;
  postUrl?: string;
  error?: string;
  isManual?: boolean;
}

export interface ManualPublishPayload {
  formattedText: string;
  headlineBn: string;
  scriptureRef: string;
  fullDeepLink: string;
  hashtags: string;
  attributionBn: string;
}

export class FacebookIntegrationService {
  /**
   * Retrieves the current stored Facebook Page configuration.
   * Default state is unconfigured and safely disconnected.
   */
  public static getConfig(): FacebookPageConfig {
    try {
      const stored = localStorage.getItem(FB_CONFIG_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Ignore parse errors and return default
    }

    return {
      isConnected: false,
      tokenStatus: 'NOT_CONFIGURED',
      permissionsGranted: [],
    };
  }

  /**
   * Saves updated Facebook Page configuration.
   */
  public static saveConfig(partial: Partial<FacebookPageConfig>): FacebookPageConfig {
    const current = this.getConfig();
    const updated: FacebookPageConfig = {
      ...current,
      ...partial,
      lastHealthCheck: new Date().toISOString(),
    };

    // Update connection status based on token presence
    if (!updated.pageId || !updated.tokenStatus || updated.tokenStatus === 'NOT_CONFIGURED') {
      updated.isConnected = false;
    }

    try {
      localStorage.setItem(FB_CONFIG_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save Facebook configuration to localStorage:', e);
    }

    return updated;
  }

  /**
   * Clears Facebook Page configuration (Disconnect).
   */
  public static disconnect(): FacebookPageConfig {
    const disconnected: FacebookPageConfig = {
      isConnected: false,
      tokenStatus: 'NOT_CONFIGURED',
      permissionsGranted: [],
      lastHealthCheck: new Date().toISOString(),
    };
    try {
      localStorage.setItem(FB_CONFIG_KEY, JSON.stringify(disconnected));
    } catch (e) {
      console.error('Failed to disconnect Facebook:', e);
    }
    return disconnected;
  }

  /**
   * Performs an authentic health check against Meta Graph API.
   * If token is absent or invalid, returns precise diagnostic information.
   */
  public static async checkTokenHealth(accessToken?: string, pageId?: string): Promise<{
    healthy: boolean;
    pageName?: string;
    tokenStatus: FacebookPageConfig['tokenStatus'];
    permissions: string[];
    messageBn: string;
  }> {
    const config = this.getConfig();
    const tokenToTest = accessToken || '';
    const pageIdToTest = pageId || config.pageId || '';

    if (!tokenToTest || !pageIdToTest) {
      return {
        healthy: false,
        tokenStatus: 'NOT_CONFIGURED',
        permissions: [],
        messageBn: 'ফেসবুক পেজ আইডি বা অ্যাক্সেস টোকেন কনফিগার করা নেই। ম্যানুয়াল পাবলিশিং মোড সক্রিয় রয়েছে।',
      };
    }

    try {
      // Query Meta Graph API for page verification
      const response = await fetch(
        `https://graph.facebook.com/v20.0/${pageIdToTest}?fields=id,name,access_token,tasks&access_token=${encodeURIComponent(tokenToTest)}`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errMsg = errorData?.error?.message || response.statusText;
        return {
          healthy: false,
          tokenStatus: 'EXPIRED',
          permissions: [],
          messageBn: `মেটা এপিআই ত্রুটি: ${errMsg}। পুনরায় টোকেন প্রদান করুন বা ম্যানুয়াল পোস্ট করুন।`,
        };
      }

      const data = await response.json();
      const permissions = Array.isArray(data.tasks) ? data.tasks : ['pages_manage_posts', 'pages_read_engagement'];

      this.saveConfig({
        pageId: data.id || pageIdToTest,
        pageName: data.name || 'Bengali Study Bible Page',
        isConnected: true,
        tokenStatus: 'VALID',
        permissionsGranted: permissions,
      });

      return {
        healthy: true,
        pageName: data.name,
        tokenStatus: 'VALID',
        permissions,
        messageBn: `সফলভাবে সংযুক্ত: ${data.name} (ID: ${data.id})`,
      };
    } catch (err: unknown) {
      const errorStr = err instanceof Error ? err.message : String(err);
      return {
        healthy: false,
        tokenStatus: 'EXPIRED',
        permissions: [],
        messageBn: `নেটওয়ার্ক বা মেটা সংযোগ ব্যর্থতা: ${errorStr}`,
      };
    }
  }

  /**
   * Generates perfectly formatted Bengali text for Facebook Page posts.
   * Ready for 1-click clipboard copy in Manual Publishing mode.
   */
  public static generateManualPublishPayload(post: SocialPost): ManualPublishPayload {
    const hashtagsStr = post.hashtags.map((h) => (h.startsWith('#') ? h : `#${h}`)).join(' ');

    const parts: string[] = [];

    // 1. Hook (Attention grabber)
    if (post.hookBn) {
      parts.push(post.hookBn.trim());
      parts.push('');
    }

    // 2. Scripture Reference Header
    parts.push(`📖 শাস্ত্র পাঠ: ${post.scriptureReference}`);
    parts.push('────────────────────────');

    // 3. Body Content
    if (post.bodyBn) {
      parts.push(post.bodyBn.trim());
      parts.push('');
    }

    // 4. Key Observation / Theological Context (if present)
    if (post.keyObservationBn) {
      parts.push(`💡 বিশেষ অন্তর্দৃষ্টি:\n${post.keyObservationBn.trim()}`);
      parts.push('');
    }

    // 5. Practical Life Application (if present)
    if (post.applicationBn) {
      parts.push(`🌱 আমাদের জীবনে প্রয়োগ:\n${post.applicationBn.trim()}`);
      parts.push('');
    }

    // 6. Reflection Question (for high community engagement)
    if (post.reflectionQuestionBn) {
      parts.push(`❓ আপনার মতামত লিখুন:\n${post.reflectionQuestionBn.trim()}`);
      parts.push('');
    }

    // 7. Quiz Answer Reveal hint (if Tuesday quiz)
    if (post.quizAnswerBn) {
      parts.push(`🔍 উত্তর জানতে এবং পূর্ণ ব্যাখ্যা পড়তে নিচের লিঙ্কে ক্লিক করুন 👇`);
      parts.push('');
    }

    // 8. Call to Action & Deep Link
    if (post.ctaBn) {
      parts.push(post.ctaBn.trim());
    }
    parts.push(`🔗 সম্পূর্ণ স্টাডি ও ব্যাখ্যা পড়ুন:\n${post.fullDeepLinkUrl}`);
    parts.push('');

    // 9. Community Hashtags
    if (hashtagsStr) {
      parts.push(hashtagsStr);
      parts.push('');
    }

    // 10. Official Attribution & Rights Provenance
    parts.push('────────────────────────');
    parts.push('বাংলা স্টাডি বাইবেল (Bengali Study Bible)');
    parts.push('পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন');
    parts.push('উদ্যোগ ও পরিচালনা: Rev. Ayan Kumar Ghosh');
    parts.push(`শাস্ত্রাংশ: ${post.sourceTranslation} (${post.sourceAttributionBn})`);

    const formattedText = parts.join('\n');

    return {
      formattedText,
      headlineBn: post.cardHeadlineBn || post.titleBn,
      scriptureRef: post.scriptureReference,
      fullDeepLink: post.fullDeepLinkUrl,
      hashtags: hashtagsStr,
      attributionBn: post.sourceAttributionBn,
    };
  }

  /**
   * Attempts to publish a post directly to the Facebook Page using Meta Graph API.
   * If Meta credentials are not configured, returns a clear message prompting manual publishing.
   */
  public static async publishToFacebook(
    post: SocialPost,
    pageAccessToken?: string
  ): Promise<PublishResult> {
    const config = this.getConfig();
    const token = pageAccessToken || '';
    const pageId = config.pageId || '';

    if (!token || !pageId || !config.isConnected) {
      return {
        success: false,
        error:
          'মেটা ফেসবুক পেজ অনুমোদিত নয় বা টোকেন কনফিগার করা নেই। অনুগ্রহ করে "ম্যানুয়াল পাবলিশিং" বোতাম ব্যবহার করে পোস্টটি কপি করে ফেসবুক পেজে প্রকাশ করুন।',
        isManual: true,
      };
    }

    const payload = this.generateManualPublishPayload(post);

    try {
      const response = await fetch(`https://graph.facebook.com/v20.0/${pageId}/feed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: payload.formattedText,
          link: post.fullDeepLinkUrl,
          access_token: token,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errMsg = errorData?.error?.message || response.statusText;
        return {
          success: false,
          error: `মেটা এপিআই প্রকাশ ব্যর্থ: ${errMsg}`,
        };
      }

      const resData = await response.json();
      const fbPostId = resData.id;
      const fbPostUrl = `https://www.facebook.com/${fbPostId}`;

      return {
        success: true,
        postId: fbPostId,
        postUrl: fbPostUrl,
      };
    } catch (err: unknown) {
      const errorStr = err instanceof Error ? err.message : String(err);
      return {
        success: false,
        error: `নেটওয়ার্ক ত্রুটির কারণে মেটা এপিআইতে পোস্ট পাঠানো সম্ভব হয়নি: ${errorStr}`,
      };
    }
  }

  /**
   * Schedules a post for future publication via Meta Graph API.
   * Meta requires scheduled_publish_time to be between 10 minutes and 75 days in the future.
   */
  public static async scheduleOnFacebook(
    post: SocialPost,
    scheduledTimestampSec: number,
    pageAccessToken?: string
  ): Promise<PublishResult> {
    const config = this.getConfig();
    const token = pageAccessToken || '';
    const pageId = config.pageId || '';

    if (!token || !pageId || !config.isConnected) {
      return {
        success: false,
        error:
          'স্বয়ংক্রিয় শিডিউলিংয়ের জন্য মেটা ফেসবুক টোকেন প্রয়োজন। বর্তমানে পোস্টটি স্থানীয় ক্যালেন্ডারে শিডিউল করা হয়েছে। নির্দিষ্ট সময়ে ম্যানুয়ালি পোস্ট করতে পারেন।',
        isManual: true,
      };
    }

    const nowSec = Math.floor(Date.now() / 1000);
    const minTimeSec = nowSec + 600; // 10 minutes
    const maxTimeSec = nowSec + 75 * 86400; // 75 days

    if (scheduledTimestampSec < minTimeSec || scheduledTimestampSec > maxTimeSec) {
      return {
        success: false,
        error: 'মেটা শিডিউলিং সময় বর্তমান সময় থেকে কমপক্ষে ১০ মিনিট এবং সর্বোচ্চ ৭৫ দিন ভবিষ্যতের মধ্যে হতে হবে।',
      };
    }

    const payload = this.generateManualPublishPayload(post);

    try {
      const response = await fetch(`https://graph.facebook.com/v20.0/${pageId}/feed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: payload.formattedText,
          link: post.fullDeepLinkUrl,
          published: false,
          scheduled_publish_time: scheduledTimestampSec,
          access_token: token,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errMsg = errorData?.error?.message || response.statusText;
        return {
          success: false,
          error: `মেটা এপিআই শিডিউলিং ব্যর্থ: ${errMsg}`,
        };
      }

      const resData = await response.json();
      return {
        success: true,
        postId: resData.id,
      };
    } catch (err: unknown) {
      const errorStr = err instanceof Error ? err.message : String(err);
      return {
        success: false,
        error: `মেটা শিডিউলিং ব্যর্থ: ${errorStr}`,
      };
    }
  }
}
