// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// “দীপ AI Safety Guardian & Prompt Injection Defense”
// System Identity: দীপ — আপনার বাইবেল অধ্যয়ন সহায়ক
// Sovereign Authority: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)
// Scripture Motto: গীতসংহিতা ১১৯:১০৫
// ============================================================

import { AUTHORITATIVE_BIBLE_MANIFEST, getManifestBook, getExpectedVerses } from '../data/authoritativeBibleManifest';
import { ImmutableAuditLogService } from './immutableAuditLogService';

export interface SafetyValidationResult {
  allowed: boolean;
  sanitizedQuery: string;
  reason?: string;
  violationType?: 'PROMPT_INJECTION' | 'AUTHORITY_ESCALATION' | 'SCRIPTURE_MODIFICATION' | 'SYSTEM_OVERRIDE' | 'UNTRUSTED_EXECUTION';
}

export interface CitationValidationResult {
  valid: boolean;
  bookId: string;
  chapter: number;
  verse?: number;
  expectedVerses?: number;
  error?: string;
}

export interface SafetyAuditRecord {
  id: string;
  timestamp: string;
  violationType: string;
  rawInput: string;
  mitigationAction: string;
  blocked: boolean;
}

export class AiSafetyGuardian {
  private static safetyLogs: SafetyAuditRecord[] = [];

  // Patterns designed to hijack AI context, override system prompts, or bypass restrictions
  private static readonly INJECTION_PATTERNS = [
    { pattern: /ignore\s+(all\s+)?previous\s+(instructions|prompts|rules)/i, type: 'PROMPT_INJECTION' as const, reason: 'Attempted system prompt disregard' },
    { pattern: /disregard\s+(the\s+)?system\s+(prompt|instructions)/i, type: 'PROMPT_INJECTION' as const, reason: 'System instruction override attempt' },
    { pattern: /you\s+are\s+now\s+(in\s+)?(developer\s+mode|dan|jailbreak|unrestricted)/i, type: 'PROMPT_INJECTION' as const, reason: 'Jailbreak persona modification attempt' },
    { pattern: /system\s+override|admin\s+override|sudo\s+mode/i, type: 'AUTHORITY_ESCALATION' as const, reason: 'Authority escalation attempt' },
    { pattern: /modify\s+(the\s+)?scripture|change\s+bible\s+text|alter\s+verse|বাইবেল\s+পরিবর্তন/i, type: 'SCRIPTURE_MODIFICATION' as const, reason: 'Prohibited Scripture alteration request' },
    { pattern: /delete\s+database|drop\s+database|wipe\s+data|ডাটাবেস\s+মুছে/i, type: 'SYSTEM_OVERRIDE' as const, reason: 'Prohibited data destruction request' },
    { pattern: /reveal\s+(internal\s+)?(system\s+)?(prompt|secrets|api\s*keys|credentials|passcode)/i, type: 'PROMPT_INJECTION' as const, reason: 'Sensitive credential or prompt extraction attempt' },
    { pattern: /bypass\s+(mfa|auth|security\s+gate|approval)/i, type: 'AUTHORITY_ESCALATION' as const, reason: 'Authentication bypass attempt' },
    { pattern: /exec\(|eval\(|curl\s+.*\||wget\s+.*\||\bsh\b|\bbash\b/i, type: 'UNTRUSTED_EXECUTION' as const, reason: 'Arbitrary command execution attempt' },
  ];

  /**
   * Validates and sanitizes untrusted incoming user input before RAG execution.
   */
  public static validateInput(rawQuery: string): SafetyValidationResult {
    if (!rawQuery || typeof rawQuery !== 'string') {
      return { allowed: false, sanitizedQuery: '', reason: 'Empty or invalid query format' };
    }

    const trimmed = rawQuery.trim();

    // Check against forbidden injection patterns
    for (const item of this.INJECTION_PATTERNS) {
      if (item.pattern.test(trimmed)) {
        this.recordSafetyViolation(item.type, trimmed, item.reason);
        return {
          allowed: false,
          sanitizedQuery: '',
          violationType: item.type,
          reason: `[AI_SAFETY_VIOLATION] ${item.reason}. এটি প্রামাণিক বাংলা স্টাডি বাইবেল নিয়মনীতি অনুযায়ী নিষিদ্ধ।`,
        };
      }
    }

    // Strip potential dangerous control characters while preserving authentic Bengali Unicode
    const sanitized = trimmed
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, '')
      .replace(/<[^>]*>/g, ''); // Strip raw HTML tags

    return {
      allowed: true,
      sanitizedQuery: sanitized,
    };
  }

  /**
   * Validates citations against the canonical Protestant 66-book manifest.
   * Prevents retrieval hallucinations, invalid chapter references, and non-canonical book citations.
   */
  public static validateCitation(bookId: string, chapter: number, verse?: number): CitationValidationResult {
    const manifest = getManifestBook(bookId);
    if (!manifest) {
      return {
        valid: false,
        bookId,
        chapter,
        verse,
        error: `অপ্রামাণিক বা অজানা পুস্তক: ${bookId}। কেবলমাত্র প্রটেস্ট্যান্ট ক্যাননের ৬৬টি পুস্তকের রেফারেন্স অনুমোদিত।`,
      };
    }

    if (chapter < 1 || chapter > manifest.chaptersCount) {
      return {
        valid: false,
        bookId,
        chapter,
        verse,
        error: `${manifest.nameBn} পুস্তকে মোট ${manifest.chaptersCount}টি অধ্যায় রয়েছে; অধ্যায় ${chapter} বাস্তব ক্যাননে অনুপস্থিত।`,
      };
    }

    const expectedVerses = getExpectedVerses(bookId, chapter);
    if (verse !== undefined && (verse < 1 || verse > expectedVerses)) {
      return {
        valid: false,
        bookId,
        chapter,
        verse,
        expectedVerses,
        error: `${manifest.nameBn} অধ্যায় ${chapter}-এ মোট ${expectedVerses}টি পদ রয়েছে; পদ ${verse} অনুপস্থিত।`,
      };
    }

    return {
      valid: true,
      bookId: manifest.id,
      chapter,
      verse,
      expectedVerses,
    };
  }

  /**
   * Logs safety violations to immutable audit trail.
   */
  private static recordSafetyViolation(violationType: string, rawInput: string, reason: string): void {
    const record: SafetyAuditRecord = {
      id: `safe_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      timestamp: new Date().toISOString(),
      violationType,
      rawInput: rawInput.slice(0, 150), // Truncate to avoid log bloating
      mitigationAction: 'BLOCKED_AND_ISOLATED',
      blocked: true,
    };

    this.safetyLogs.unshift(record);
    if (this.safetyLogs.length > 100) this.safetyLogs.pop();

    try {
      ImmutableAuditLogService.logAction(
        'PROMPT_INJECTION_BLOCKED',
        'ask-bible-safety',
        `Blocked ${violationType}: ${reason}. Input sample: "${rawInput.slice(0, 60)}..."`,
        false,
        undefined,
        'SYSTEM_AI_GUARDIAN',
        4
      );
    } catch {
      // Ignored in non-browser/test environments
    }
  }

  public static getSafetyLogs(): SafetyAuditRecord[] {
    return [...this.safetyLogs];
  }

  public static getBlockedCount(): number {
    return this.safetyLogs.length;
  }
}
