// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// SOCIAL CARD CANVAS GENERATOR (1080x1080 BRANDED GRAPHICS)
// Project Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Contact: ayanghosh75@gmail.com
// ============================================================

import { SocialPost, ContentType } from '../../types/social';
import { getTemplateByContentType } from '../../data/social/socialTemplatesData';

export interface RenderCardOptions {
  width?: number;
  height?: number;
  scale?: number;
}

export class SocialCardGenerator {
  public static readonly DEFAULT_WIDTH = 1080;
  public static readonly DEFAULT_HEIGHT = 1080;

  /**
   * Translates content type to Bengali display label for card header badge.
   */
  public static getContentTypeLabelBn(type: ContentType): string {
    switch (type) {
      case 'CHARACTER':
        return 'বাইবেলের চরিত্র';
      case 'QUIZ':
        return 'বাইবেল কুইজ';
      case 'VERSE_STUDY':
        return 'পদ অধ্যয়ন';
      case 'DEEP_STUDY':
        return 'গভীর বাইবেল অধ্যয়ন';
      case 'QUESTION':
        return 'বাইবেল প্রশ্ন';
      case 'DISCUSSION':
        return 'সম্প্রদায় আলোচনা';
      case 'SERMON':
        return 'রবিবাসরীয় সার্মন';
      default:
        return 'বাইবেল অধ্যয়ন';
    }
  }

  /**
   * Translates Day of Week to Bengali.
   */
  public static getDayOfWeekLabelBn(day: string): string {
    switch (day) {
      case 'MONDAY':
        return 'সোমবার';
      case 'TUESDAY':
        return 'মঙ্গলবার';
      case 'WEDNESDAY':
        return 'বুধবার';
      case 'THURSDAY':
        return 'বৃহস্পতিবার';
      case 'FRIDAY':
        return 'শুক্রবার';
      case 'SATURDAY':
        return 'শনিবার';
      case 'SUNDAY':
        return 'রবিবার';
      default:
        return day;
    }
  }

  /**
   * Helper function to wrap text neatly on HTML5 Canvas.
   */
  private static wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
    maxLines: number = 8
  ): number {
    const words = text.split(' ');
    let line = '';
    let currentY = y;
    let linesDrawn = 0;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
        linesDrawn++;

        if (linesDrawn >= maxLines - 1 && n < words.length - 1) {
          // Truncate remaining
          line += '...';
          break;
        }
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
    return currentY + lineHeight;
  }

  /**
   * Renders the social post into the specified HTML5 Canvas (1080x1080 high-resolution).
   */
  public static async renderCardToCanvas(
    canvas: HTMLCanvasElement,
    post: SocialPost,
    options?: RenderCardOptions
  ): Promise<void> {
    const width = options?.width || this.DEFAULT_WIDTH;
    const height = options?.height || this.DEFAULT_HEIGHT;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const template = getTemplateByContentType(post.contentType);
    const bgColor = template?.backgroundColor || '#0b132b';
    const accentGold = template?.accentColor || '#f59e0b';
    const primaryNavy = template?.primaryColor || '#1e293b';

    // 1. Background Gradient
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, bgColor);
    bgGradient.addColorStop(0.5, '#0d1b2a');
    bgGradient.addColorStop(1, '#050a14');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle Radial Glow
    const radialGlow = ctx.createRadialGradient(
      width * 0.5,
      height * 0.35,
      50,
      width * 0.5,
      height * 0.35,
      width * 0.6
    );
    radialGlow.addColorStop(0, 'rgba(217, 119, 6, 0.12)');
    radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = radialGlow;
    ctx.fillRect(0, 0, width, height);

    // 3. Elegant Double Border & Corner Ornaments
    ctx.strokeStyle = 'rgba(217, 119, 6, 0.35)';
    ctx.lineWidth = 3;
    ctx.strokeRect(40, 40, width - 80, height - 80);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.strokeRect(52, 52, width - 104, height - 104);

    // Corner Accents
    const cornerSize = 24;
    ctx.strokeStyle = accentGold;
    ctx.lineWidth = 4;
    // Top-left
    ctx.beginPath();
    ctx.moveTo(40, 40 + cornerSize);
    ctx.lineTo(40, 40);
    ctx.lineTo(40 + cornerSize, 40);
    ctx.stroke();
    // Top-right
    ctx.beginPath();
    ctx.moveTo(width - 40 - cornerSize, 40);
    ctx.lineTo(width - 40, 40);
    ctx.lineTo(width - 40, 40 + cornerSize);
    ctx.stroke();
    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(40, height - 40 - cornerSize);
    ctx.lineTo(40, height - 40);
    ctx.lineTo(40 + cornerSize, height - 40);
    ctx.stroke();
    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(width - 40 - cornerSize, height - 40);
    ctx.lineTo(width - 40, height - 40);
    ctx.lineTo(width - 40, height - 40 - cornerSize);
    ctx.stroke();

    // 4. Header Bar: Day + Content Type Badge
    const dayLabel = this.getDayOfWeekLabelBn(post.dayOfWeek);
    const typeLabel = this.getContentTypeLabelBn(post.contentType);
    const badgeText = `${dayLabel} • ${typeLabel}`;

    ctx.font = '600 28px "Noto Sans Bengali", "Kalpurush", sans-serif';
    const badgeWidth = ctx.measureText(badgeText).width + 48;
    const badgeX = (width - badgeWidth) / 2;
    const badgeY = 90;

    // Badge pill background
    ctx.fillStyle = primaryNavy;
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeWidth, 52, 26);
    ctx.fill();

    ctx.strokeStyle = accentGold;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeWidth, 52, 26);
    ctx.stroke();

    ctx.fillStyle = '#fdfbf7';
    ctx.textAlign = 'center';
    ctx.fillText(badgeText, width / 2, badgeY + 36);

    // 5. Scripture Reference Pill
    if (post.scriptureReference) {
      const refText = `📖  ${post.scriptureReference}`;
      ctx.font = '700 32px "Noto Sans Bengali", "Kalpurush", sans-serif';
      const refWidth = ctx.measureText(refText).width + 50;
      const refX = (width - refWidth) / 2;
      const refY = 175;

      ctx.fillStyle = 'rgba(217, 119, 6, 0.2)';
      ctx.beginPath();
      ctx.roundRect(refX, refY, refWidth, 56, 16);
      ctx.fill();

      ctx.strokeStyle = 'rgba(245, 158, 11, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(refX, refY, refWidth, 56, 16);
      ctx.stroke();

      ctx.fillStyle = accentGold;
      ctx.textAlign = 'center';
      ctx.fillText(refText, width / 2, refY + 40);
    }

    // 6. Main Headline (Large & Bold Bengali text)
    const headline = post.cardHeadlineBn || post.titleBn;
    ctx.font = 'bold 54px "Noto Sans Bengali", "Kalpurush", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';

    const maxContentWidth = width - 200;
    let currentY = 320;
    currentY = this.wrapText(ctx, headline, width / 2, currentY, maxContentWidth, 72, 4);

    // Decorative divider
    currentY += 20;
    ctx.strokeStyle = 'rgba(217, 119, 6, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 120, currentY);
    ctx.lineTo(width / 2 + 120, currentY);
    ctx.stroke();

    // Central small diamond on divider
    ctx.fillStyle = accentGold;
    ctx.beginPath();
    ctx.arc(width / 2, currentY, 6, 0, Math.PI * 2);
    ctx.fill();

    // 7. Subtext / Core Thought / Insight
    currentY += 60;
    const subtext =
      post.cardSubtextBn ||
      post.keyObservationBn ||
      post.reflectionQuestionBn ||
      post.bodyBn.slice(0, 160) + '...';

    ctx.font = '400 32px "Noto Sans Bengali", "Kalpurush", sans-serif';
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'center';
    this.wrapText(ctx, subtext, width / 2, currentY, maxContentWidth, 48, 5);

    // 8. Footer Section (Brand, Tagline & Author)
    const footerY = height - 120;

    // Brand Name
    ctx.font = '700 36px "Noto Sans Bengali", "Kalpurush", sans-serif';
    ctx.fillStyle = accentGold;
    ctx.textAlign = 'center';
    ctx.fillText('বাংলা স্টাডি বাইবেল (Bengali Study Bible)', width / 2, footerY);

    // Tagline
    ctx.font = '400 24px "Noto Sans Bengali", "Kalpurush", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন', width / 2, footerY + 38);

    // Owner / Author & Web Domain
    ctx.font = '500 20px "Noto Sans Bengali", sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('উদ্যোগ ও পরিচালনা: Rev. Ayan Kumar Ghosh  |  bengalistudybible.com', width / 2, footerY + 70);
  }

  /**
   * Generates a Data URL (image/png) for a post.
   */
  public static async generateDataUrl(post: SocialPost): Promise<string> {
    const canvas = document.createElement('canvas');
    await this.renderCardToCanvas(canvas, post);
    return canvas.toDataURL('image/png');
  }

  /**
   * Triggers download of the generated card PNG to the user's computer.
   */
  public static downloadCanvasImage(
    canvas: HTMLCanvasElement,
    filename: string = 'bengali-study-bible-card.png'
  ): void {
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
