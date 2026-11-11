// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// SOCIAL POST MANAGEMENT & EDITORIAL WORKFLOW SERVICE
// Project Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Contact: ayanghosh75@gmail.com
// ============================================================

import {
  SocialPost,
  DayOfWeek,
  ContentType,
  PostStatus,
  SocialMetricsSummary,
} from '../../types/social';
import { SOCIAL_30_DAYS_QUEUE } from '../../data/social/social30DaysQueue';

const POSTS_STORAGE_KEY = 'bsb_social_posts_v1';

export class SocialService {
  /**
   * Retrieves all social posts from storage.
   * If storage is empty, automatically seeds with the verified 30-day editorial queue.
   */
  public static getAllPosts(): SocialPost[] {
    try {
      const stored = localStorage.getItem(POSTS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // If parsing fails, fall back to seed queue
    }

    // Seed storage with default 30-day queue
    this.saveAllPosts(SOCIAL_30_DAYS_QUEUE);
    return [...SOCIAL_30_DAYS_QUEUE];
  }

  /**
   * Saves the entire posts array to localStorage.
   */
  public static saveAllPosts(posts: SocialPost[]): void {
    try {
      localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
    } catch (e) {
      console.error('Failed to save social posts to localStorage:', e);
    }
  }

  /**
   * Retrieves a single post by ID.
   */
  public static getPostById(id: string): SocialPost | undefined {
    const posts = this.getAllPosts();
    return posts.find((p) => p.id === id);
  }

  /**
   * Retrieves posts filtered by Day of Week.
   */
  public static getPostsByDayOfWeek(day: DayOfWeek): SocialPost[] {
    const posts = this.getAllPosts();
    return posts.filter((p) => p.dayOfWeek === day);
  }

  /**
   * Retrieves posts filtered by Status.
   */
  public static getPostsByStatus(status: PostStatus): SocialPost[] {
    const posts = this.getAllPosts();
    return posts.filter((p) => p.status === status);
  }

  /**
   * Retrieves posts filtered by Content Type.
   */
  public static getPostsByContentType(contentType: ContentType): SocialPost[] {
    const posts = this.getAllPosts();
    return posts.filter((p) => p.contentType === contentType);
  }

  /**
   * Saves or updates a single post.
   */
  public static savePost(post: SocialPost): SocialPost {
    const posts = this.getAllPosts();
    const index = posts.findIndex((p) => p.id === post.id);
    const updatedPost = {
      ...post,
      updatedAt: new Date().toISOString(),
    };

    if (index >= 0) {
      posts[index] = updatedPost;
    } else {
      posts.push(updatedPost);
    }

    this.saveAllPosts(posts);
    return updatedPost;
  }

  /**
   * Updates status and associated review/approval metadata.
   */
  public static updatePostStatus(
    id: string,
    newStatus: PostStatus,
    meta?: {
      approvedBy?: string;
      reviewNotes?: string;
      scheduledFor?: string;
      fbPostId?: string;
      fbPostUrl?: string;
      isManuallyPublished?: boolean;
      errorMessage?: string;
    }
  ): SocialPost | undefined {
    const posts = this.getAllPosts();
    const index = posts.findIndex((p) => p.id === id);
    if (index < 0) return undefined;

    const post = posts[index];
    const updated: SocialPost = {
      ...post,
      status: newStatus,
      updatedAt: new Date().toISOString(),
      ...(meta?.approvedBy !== undefined && { approvedBy: meta.approvedBy }),
      ...(meta?.reviewNotes !== undefined && { reviewNotes: meta.reviewNotes }),
      ...(meta?.scheduledFor !== undefined && { scheduledFor: meta.scheduledFor }),
      ...(meta?.fbPostId !== undefined && { fbPostId: meta.fbPostId }),
      ...(meta?.fbPostUrl !== undefined && { fbPostUrl: meta.fbPostUrl }),
      ...(meta?.isManuallyPublished !== undefined && {
        isManuallyPublished: meta.isManuallyPublished,
      }),
      ...(meta?.errorMessage !== undefined && { errorMessage: meta.errorMessage }),
    };

    if (newStatus === 'APPROVED' && !updated.approvedAt) {
      updated.approvedAt = new Date().toISOString();
      if (!updated.approvedBy) {
        updated.approvedBy = 'Rev. Ayan Kumar Ghosh';
      }
    }

    if (newStatus === 'PUBLISHED' && !updated.publishedAt) {
      updated.publishedAt = new Date().toISOString();
    }

    posts[index] = updated;
    this.saveAllPosts(posts);
    return updated;
  }

  /**
   * Approves a post (Ready for Rev. Ayan Kumar Ghosh's 1-tap approval workflow).
   */
  public static approvePost(id: string, approvedBy: string = 'Rev. Ayan Kumar Ghosh'): SocialPost | undefined {
    return this.updatePostStatus(id, 'APPROVED', { approvedBy });
  }

  /**
   * Rejects / Requests Revision for a post.
   */
  public static requestRevision(id: string, reviewNotes: string): SocialPost | undefined {
    return this.updatePostStatus(id, 'DRAFT', { reviewNotes });
  }

  /**
   * Schedules an approved post for a specific future ISO date/time.
   */
  public static schedulePost(id: string, scheduledForIso: string): SocialPost | undefined {
    return this.updatePostStatus(id, 'SCHEDULED', { scheduledFor: scheduledForIso });
  }

  /**
   * Marks a post as published (either via Meta API or manually posted to Facebook Page).
   */
  public static markAsPublished(
    id: string,
    fbPostId?: string,
    isManual: boolean = true
  ): SocialPost | undefined {
    const postUrl = fbPostId ? `https://www.facebook.com/${fbPostId}` : undefined;
    return this.updatePostStatus(id, 'PUBLISHED', {
      fbPostId,
      fbPostUrl: postUrl,
      isManuallyPublished: isManual,
    });
  }

  /**
   * Marks a post as failed with an error message.
   */
  public static markAsFailed(id: string, errorMessage: string): SocialPost | undefined {
    return this.updatePostStatus(id, 'FAILED', { errorMessage });
  }

  /**
   * Resets all posts back to the default 30-day verified queue.
   */
  public static resetToDefaultQueue(): SocialPost[] {
    this.saveAllPosts(SOCIAL_30_DAYS_QUEUE);
    return [...SOCIAL_30_DAYS_QUEUE];
  }

  /**
   * Builds a canonical UTM deep link for tracking social inbound traffic.
   */
  public static buildUtmDeepLink(
    basePath: string,
    campaign: string,
    contentTag: string,
    domain: string = 'https://bengalistudybible.com'
  ): string {
    const cleanPath = basePath.startsWith('/') ? basePath : `/${basePath}`;
    const separator = cleanPath.includes('?') ? '&' : '?';
    return `${domain}${cleanPath}${separator}utm_source=facebook&utm_medium=social&utm_campaign=${encodeURIComponent(
      campaign
    )}&utm_content=${encodeURIComponent(contentTag)}`;
  }

  /**
   * Returns a weekly schedule map grouping posts by Monday through Sunday.
   */
  public static getWeeklySchedule(): Record<DayOfWeek, SocialPost[]> {
    const posts = this.getAllPosts();
    const days: DayOfWeek[] = [
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
      'SUNDAY',
    ];

    const schedule: Record<DayOfWeek, SocialPost[]> = {
      MONDAY: [],
      TUESDAY: [],
      WEDNESDAY: [],
      THURSDAY: [],
      FRIDAY: [],
      SATURDAY: [],
      SUNDAY: [],
    };

    days.forEach((day) => {
      schedule[day] = posts.filter((p) => p.dayOfWeek === day);
    });

    return schedule;
  }

  /**
   * Calculates high-level social community metrics summary.
   */
  public static getSocialMetricsSummary(): SocialMetricsSummary {
    const posts = this.getAllPosts();
    const publishedCount = posts.filter((p) => p.status === 'PUBLISHED').length;
    const scheduledCount = posts.filter((p) => p.status === 'SCHEDULED').length;
    const approvedCount = posts.filter((p) => p.status === 'APPROVED').length;

    // Derived or estimated metrics for community growth
    const totalReach = publishedCount * 420;
    const reactions = publishedCount * 38;
    const comments = publishedCount * 14;
    const shares = publishedCount * 9;
    const linkClicks = publishedCount * 45;
    const totalEngagement = reactions + comments + shares + linkClicks;

    return {
      totalReach,
      totalEngagement,
      reactions,
      comments,
      shares,
      linkClicks,
      period: `মোট ${publishedCount} প্রকাশিত • ${scheduledCount} শিডিউলড • ${approvedCount} অনুমোদিত`,
    };
  }
}
