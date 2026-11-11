import { SavedSermon, SermonContent } from '../types/sermon';
import { SermonService } from '../services/sermonService';

function escapeHtml(text: string = ''): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatMultiLine(text: string = ''): string {
  return escapeHtml(text).replace(/\n/g, '<br>');
}

export class SermonExportUtils {
  /**
   * Download sermon as plain text (.txt)
   */
  public static downloadTxt(sermon: SavedSermon | { title: string; content: SermonContent }) {
    const markdown =
      'fullMarkdownText' in sermon && sermon.fullMarkdownText
        ? sermon.fullMarkdownText
        : SermonService.toMarkdown(sermon.content);

    const blob = new Blob([markdown], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const cleanFilename = sermon.title.replace(/[\\/?%*:|"<>]/g, '_').slice(0, 40);
    link.download = `${cleanFilename}_BengaliStudyBible.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Download sermon as Microsoft Word (.doc / .docx compatible)
   */
  public static downloadDocx(
    sermon: SavedSermon | { title: string; content: SermonContent; passage?: string }
  ) {
    const content = sermon.content;
    const passage = 'passage' in sermon ? sermon.passage : content.mainPassageBn;

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>${escapeHtml(content.titleBn)}</title>
        <style>
          body { font-family: 'Segoe UI', 'Noto Sans Bengali', Arial, sans-serif; font-size: 12pt; line-height: 1.6; color: #1e293b; }
          h1 { color: #0f172a; font-size: 20pt; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; }
          h2 { color: #1e3a8a; font-size: 15pt; margin-top: 18px; }
          h3 { color: #0369a1; font-size: 13pt; margin-top: 14px; }
          .meta { color: #64748b; font-size: 10pt; margin-bottom: 16px; }
          .scripture-box { background: #f8fafc; border-left: 4px solid #f59e0b; padding: 12px 16px; margin: 16px 0; font-style: italic; }
          .point { margin-bottom: 16px; }
          .footer { font-size: 9pt; color: #94a3b8; border-top: 1px solid #e2e8f0; margin-top: 30px; padding-top: 8px; }
        </style>
      </head>
      <body>
        <h1>${escapeHtml(content.titleBn)}</h1>
        <div class="meta">
          <strong>বাংলা স্টাডি বাইবেল — সার্মন প্রস্তুতকরণ রূপরেখা</strong><br>
          <strong>মূল শাস্ত্রাংশ:</strong> ${escapeHtml(passage)} | <strong>তারিখ:</strong> ${new Date().toLocaleDateString('bn-BD')}
        </div>

        <div class="scripture-box">
          <strong>শাস্ত্রপদ:</strong> "${escapeHtml(content.scriptureTextBn)}"
        </div>

        <h2>💡 কেন্দ্রীয় ভাব (Big Idea)</h2>
        <p>${escapeHtml(content.bigIdeaBn)}</p>

        <h2>📖 ভূমিকা</h2>
        <p>${formatMultiLine(content.introductionBn)}</p>

        <h2>🏛️ পটভূমি</h2>
        <p><strong>শাস্ত্রীয় পটভূমি:</strong> ${escapeHtml(content.biblicalContextBn)}</p>
        <p><strong>ঐতিহাসিক পটভূমি:</strong> ${escapeHtml(content.historicalLiteraryContextBn)}</p>

        <h2>🎯 মূল আলোচ্য বিষয়সমূহ</h2>
        ${content.points
          .map(
            (p) => `
          <div class="point">
            <h3>মূল বিষয় ${escapeHtml(String(p.pointNumber))}: ${escapeHtml(p.titleBn)}</h3>
            <p><strong>রেফারেন্স:</strong> ${escapeHtml(p.scriptureReference)}</p>
            <p><strong>ব্যাখ্যা:</strong> ${escapeHtml(p.explanationBn)}</p>
            <p><strong>সহায়ক শাস্ত্র:</strong> ${escapeHtml(p.supportingScriptureBn)}</p>
            <p><strong>বাস্তব প্রয়োগ:</strong> ${escapeHtml(p.practicalApplicationBn)}</p>
          </div>
        `
          )
          .join('')}

        <h2>🌟 বাস্তব দৃষ্টান্ত ও রূপক</h2>
        ${content.illustrationSuggestionsBn.map((ill) => `<p>${escapeHtml(ill)}</p>`).join('')}

        <h2>🛠️ ব্যবহারিক খ্রীষ্টিয় প্রয়োগ</h2>
        <ul>
          ${content.practicalApplicationBn.map((app) => `<li>${escapeHtml(app)}</li>`).join('')}
        </ul>

        <h2>❓ আত্ম-অনুসন্ধানের প্রশ্নমালা</h2>
        <ul>
          ${content.reflectionQuestionsBn.map((q) => `<li>${escapeHtml(q)}</li>`).join('')}
        </ul>

        <h2>🏁 উপসংহার</h2>
        <p>${formatMultiLine(content.conclusionBn)}</p>

        <h2>🙏 সমাপনী প্রার্থনা</h2>
        <p>${formatMultiLine(content.closingPrayerBn)}</p>

        <div class="footer">
          প্রস্তুতকৃত: বাংলা স্টাডি বাইবেল প্ল্যাটফর্ম (Bengali Study Bible)
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + htmlContent], {
      type: 'application/msword;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const cleanFilename = sermon.title.replace(/[\\/?%*:|"<>]/g, '_').slice(0, 40);
    link.download = `${cleanFilename}_BengaliStudyBible.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Print or Save as PDF via Browser Print Engine with popup-blocked fallback
   */
  public static printOrSavePdf(
    sermon: SavedSermon | { title: string; content: SermonContent; passage?: string }
  ) {
    const content = sermon.content;
    const passage = 'passage' in sermon ? sermon.passage : content.mainPassageBn;

    const html = `
      <!DOCTYPE html>
      <html lang="bn">
      <head>
        <meta charset="utf-8">
        <title>${escapeHtml(content.titleBn)} — বাংলা স্টাডি বাইবেল</title>
        <style>
          @page { size: A4; margin: 20mm; }
          body {
            font-family: 'Noto Sans Bengali', 'Segoe UI', Arial, sans-serif;
            font-size: 14px;
            line-height: 1.7;
            color: #1e293b;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
          }
          .header-bar {
            border-bottom: 2px solid #0f172a;
            padding-bottom: 10px;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          .brand-title {
            font-size: 16px;
            font-weight: bold;
            color: #0f172a;
          }
          .sermon-title {
            font-size: 24px;
            font-weight: 800;
            color: #0f172a;
            margin-top: 10px;
            line-height: 1.3;
          }
          .meta-info {
            font-size: 13px;
            color: #64748b;
            margin-top: 6px;
          }
          .scripture-highlight {
            background-color: #fffbeb;
            border-left: 4px solid #d97706;
            padding: 12px 16px;
            border-radius: 4px;
            margin: 16px 0;
            font-size: 15px;
          }
          .section-title {
            font-size: 16px;
            font-weight: 700;
            color: #1e3a8a;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 4px;
            margin-top: 24px;
            margin-bottom: 8px;
          }
          .point-card {
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 12px 16px;
            margin-bottom: 14px;
            background: #fafafa;
          }
          .point-heading {
            font-weight: 700;
            color: #0f172a;
            font-size: 15px;
            margin-bottom: 4px;
          }
          ul { padding-left: 20px; margin: 8px 0; }
          li { margin-bottom: 6px; }
          .footer-note {
            margin-top: 40px;
            border-top: 1px dashed #cbd5e1;
            padding-top: 12px;
            font-size: 11px;
            color: #94a3b8;
            text-align: center;
          }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header-bar">
          <div>
            <div class="brand-title">বাংলা স্টাডি বাইবেল • সার্মন রূপরেখা</div>
            <div class="sermon-title">${escapeHtml(content.titleBn)}</div>
            <div class="meta-info"><strong>শাস্ত্রাংশ:</strong> ${escapeHtml(passage)} | <strong>তারিখ:</strong> ${new Date().toLocaleDateString('bn-BD')}</div>
          </div>
        </div>

        <div class="scripture-highlight">
          <strong>মূল শাস্ত্রপদ:</strong> "${escapeHtml(content.scriptureTextBn)}"
        </div>

        <div class="section-title">💡 কেন্দ্রীয় ভাব (Big Idea)</div>
        <p>${escapeHtml(content.bigIdeaBn)}</p>

        <div class="section-title">📖 ভূমিকা</div>
        <p>${formatMultiLine(content.introductionBn)}</p>

        <div class="section-title">🏛️ শাস্ত্রীয় ও ঐতিহাসিক পটভূমি</div>
        <p><strong>শাস্ত্রীয় পটভূমি:</strong> ${escapeHtml(content.biblicalContextBn)}</p>
        <p><strong>ঐতিহাসিক ও সাহিত্যিক প্রেক্ষাপট:</strong> ${escapeHtml(content.historicalLiteraryContextBn)}</p>

        <div class="section-title">🎯 মূল আলোচ্য বিষয়সমূহ (Main Points)</div>
        ${content.points
          .map(
            (p) => `
          <div class="point-card">
            <div class="point-heading">মূল বিষয় ${escapeHtml(String(p.pointNumber))}: ${escapeHtml(p.titleBn)}</div>
            <div><strong>শাস্ত্র রেফারেন্স:</strong> ${escapeHtml(p.scriptureReference)}</div>
            <div><strong>ব্যাখ্যা:</strong> ${escapeHtml(p.explanationBn)}</div>
            <div><strong>সহায়ক শাস্ত্র:</strong> ${escapeHtml(p.supportingScriptureBn)}</div>
            <div><strong>ব্যবহারিক প্রয়োগ:</strong> ${escapeHtml(p.practicalApplicationBn)}</div>
          </div>
        `
          )
          .join('')}

        <div class="section-title">🌟 বাস্তব দৃষ্টান্ত ও রূপক</div>
        <ul>
          ${content.illustrationSuggestionsBn.map((ill) => `<li>${escapeHtml(ill)}</li>`).join('')}
        </ul>

        <div class="section-title">🛠️ ব্যবহারিক খ্রীষ্টিয় প্রয়োগ</div>
        <ul>
          ${content.practicalApplicationBn.map((app) => `<li>${escapeHtml(app)}</li>`).join('')}
        </ul>

        <div class="section-title">❓ আত্ম-অনুসন্ধানের প্রশ্নমালা</div>
        <ul>
          ${content.reflectionQuestionsBn.map((q) => `<li>${escapeHtml(q)}</li>`).join('')}
        </ul>

        <div class="section-title">🏁 উপসংহার</div>
        <p>${formatMultiLine(content.conclusionBn)}</p>

        <div class="section-title">🙏 সমাপনী প্রার্থনা</div>
        <p>${formatMultiLine(content.closingPrayerBn)}</p>

        <div class="footer-note">
          বাংলা স্টাডি বাইবেল প্ল্যাটফর্ম — পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন<br>
          (পালক বা প্রচারকের নিজস্ব প্রার্থনা ও অধ্যয়নের মাধ্যমে পরীক্ষা করা আবশ্যক)
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          }
        </script>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank', 'width=850,height=900');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(html);
      printWindow.document.close();
    } else {
      // Fallback for pop-up blocked or mobile webviews
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      document.body.appendChild(iframe);
      const targetDoc = iframe.contentWindow?.document;
      if (targetDoc) {
        targetDoc.open();
        targetDoc.write(html);
        targetDoc.close();
        setTimeout(() => {
          if (iframe.contentWindow) {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
          }
          setTimeout(() => {
            if (iframe.parentNode) {
              iframe.parentNode.removeChild(iframe);
            }
          }, 3000);
        }, 500);
      } else {
        alert('প্রিন্ট প্রিভিউ খোলা যায়নি। অনুগ্রহ করে ব্রাউজারের পপ-আপ অনুমোদন করুন।');
      }
    }
  }

  /**
   * Copy sermon text to clipboard
   */
  public static async copyToClipboard(
    sermon: SavedSermon | { title: string; content: SermonContent }
  ): Promise<boolean> {
    try {
      const markdown =
        'fullMarkdownText' in sermon && sermon.fullMarkdownText
          ? sermon.fullMarkdownText
          : SermonService.toMarkdown(sermon.content);
      await navigator.clipboard.writeText(markdown);
      return true;
    } catch (e) {
      console.error('Failed to copy sermon text', e);
      return false;
    }
  }

  /**
   * Share sermon via Web Share API or WhatsApp
   */
  public static async shareSermon(
    sermon: SavedSermon | { title: string; content: SermonContent; passage?: string }
  ): Promise<void> {
    const passage = 'passage' in sermon ? sermon.passage : sermon.content.mainPassageBn;
    const shareText = `${sermon.title}\nমূল শাস্ত্র: ${passage}\n\n${sermon.content.bigIdeaBn}\n\n— বাংলা স্টাডি বাইবেল প্ল্যাটফর্ম থেকে প্রস্তুতকৃত`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: sermon.title,
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to WhatsApp
      }
    }

    // WhatsApp Web / App share fallback
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank');
  }
}
