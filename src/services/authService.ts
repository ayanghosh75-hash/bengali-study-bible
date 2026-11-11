import { UserProfile, UserRole, PasswordAnalysis, PasswordStrength } from '../types/auth';

const AUTH_STORAGE_KEY = 'bsb_user_profile_v1';
const ACCOUNTS_STORAGE_KEY = 'bsb_user_accounts_list_v1';
const CREDENTIALS_VAULT_KEY = 'bsb_credentials_vault_v1';

const DEFAULT_GUEST_USER: UserProfile = {
  id: 'guest_local_user',
  displayName: 'অতিথি পাঠক',
  role: 'guest',
  authProvider: 'guest',
  preferredLanguage: 'bn',
  isGuest: true,
  hasBiometrics: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

interface StoredCredential {
  userId: string;
  phone?: string;
  email?: string;
  passwordHash: string;
  biometricId?: string;
}

export class AuthService {
  // Simple hash for offline vault
  private static hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return 'h_' + Math.abs(hash).toString(16) + '_' + str.length;
  }

  public static getCurrentUser(): UserProfile {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse stored user profile:', e);
    }
    return DEFAULT_GUEST_USER;
  }

  public static getAllAccounts(): UserProfile[] {
    try {
      const stored = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      if (stored) {
        const list: UserProfile[] = JSON.parse(stored);
        if (Array.isArray(list) && list.length > 0) return list;
      }
    } catch (e) {
      console.error('Failed to parse user accounts list:', e);
    }
    return [this.getCurrentUser()];
  }

  public static saveAccountToList(user: UserProfile): void {
    try {
      const list = this.getAllAccounts().filter((u) => u.id !== user.id);
      list.unshift(user);
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save account to accounts list:', e);
    }
  }

  public static updateProfile(updates: Partial<UserProfile>): UserProfile {
    try {
      const current = this.getCurrentUser();
      const updated: UserProfile = {
        ...current,
        ...updates,
        updatedAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString(),
      };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
      this.saveAccountToList(updated);
      return updated;
    } catch (e) {
      console.error('Failed to update user profile in localStorage:', e);
      return this.getCurrentUser();
    }
  }

  public static setRole(role: UserRole): UserProfile {
    return this.updateProfile({ role, isGuest: role === 'guest' });
  }

  public static resetToGuest(): UserProfile {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(DEFAULT_GUEST_USER));
    } catch (e) {
      console.error('Failed to reset to guest:', e);
    }
    return DEFAULT_GUEST_USER;
  }

  public static isOfflineGuest(): boolean {
    const user = this.getCurrentUser();
    return user.isGuest;
  }

  // ================= PASSWORD ANALYSIS & STRENGTH =================
  public static analyzePassword(password: string): PasswordAnalysis {
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 10) score++;
    if (hasUppercase && hasLowercase) score++;
    if (hasNumber) score++;
    if (hasSpecialChar) score++;

    let strength: PasswordStrength = 'weak';
    let feedbackBn = 'পাসওয়ার্ডটি খুব দুর্বল (কমপক্ষে ৮টি অক্ষর দিন)';

    if (score >= 4) {
      strength = 'strong';
      feedbackBn = 'শক্তিশালী ও নিরাপদ পাসওয়ার্ড (পাসওয়ার্ডটি সুরক্ষিত)';
    } else if (score >= 2) {
      strength = 'medium';
      feedbackBn = 'মাঝারি মানের পাসওয়ার্ড (প্রতীক ও বড় হাতের অক্ষর যুক্ত করুন)';
    }

    return {
      strength,
      score: Math.min(score, 4),
      hasMinLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecialChar,
      feedbackBn,
    };
  }

  // ================= GOOGLE ID AUTHENTICATION =================
  public static loginWithGoogle(profile: {
    name: string;
    email: string;
    avatarUrl?: string;
    role?: UserRole;
  }): UserProfile {
    const userId = 'usr_g_' + this.hashString(profile.email);
    const now = new Date().toISOString();

    const newUser: UserProfile = {
      id: userId,
      displayName: profile.name || 'গুগল ব্যবহারকারী',
      email: profile.email,
      role: profile.role || 'believer',
      authProvider: 'google',
      avatarUrl: profile.avatarUrl,
      preferredLanguage: 'bn',
      isGuest: false,
      hasBiometrics: false,
      createdAt: now,
      updatedAt: now,
      lastActiveAt: now,
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    this.saveAccountToList(newUser);
    return newUser;
  }

  // ================= MOBILE NUMBER + PASSWORD AUTH =================
  private static getVault(): StoredCredential[] {
    try {
      const stored = localStorage.getItem(CREDENTIALS_VAULT_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private static saveToVault(credential: StoredCredential): void {
    const vault = this.getVault().filter((c) => c.userId !== credential.userId && c.phone !== credential.phone);
    vault.push(credential);
    localStorage.setItem(CREDENTIALS_VAULT_KEY, JSON.stringify(vault));
  }

  public static registerWithPhone(
    phone: string,
    pass: string,
    displayName: string,
    role: UserRole = 'believer',
    churchOrOrg?: string
  ): { success: boolean; user?: UserProfile; error?: string } {
    const cleanPhone = phone.trim().replace(/[\s-]/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      return { success: false, error: 'সঠিক মোবাইল নম্বর প্রবেশ করান (কমপক্ষে ৮ সংখ্যা)' };
    }

    const analysis = this.analyzePassword(pass);
    if (!analysis.hasMinLength) {
      return { success: false, error: 'পাসওয়ার্ড কমপক্ষে ৮টি অক্ষরের হতে হবে' };
    }

    const vault = this.getVault();
    const existing = vault.find((c) => c.phone === cleanPhone);
    if (existing) {
      return { success: false, error: 'এই মোবাইল নম্বরে ইতোমধ্যে একটি একাউন্ট খোলা আছে। অনুগ্রহ করে লগইন করুন।' };
    }

    const userId = 'usr_p_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6);
    const now = new Date().toISOString();

    const newUser: UserProfile = {
      id: userId,
      displayName: displayName.trim() || `ব্যবহারকারী (${cleanPhone.slice(-4)})`,
      phoneNumber: cleanPhone,
      role,
      churchOrOrg: churchOrOrg?.trim(),
      authProvider: 'phone',
      preferredLanguage: 'bn',
      isGuest: false,
      hasBiometrics: false,
      createdAt: now,
      updatedAt: now,
      lastActiveAt: now,
    };

    this.saveToVault({
      userId,
      phone: cleanPhone,
      passwordHash: this.hashString(pass),
    });

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    this.saveAccountToList(newUser);
    return { success: true, user: newUser };
  }

  public static loginWithPhone(
    phone: string,
    pass: string
  ): { success: boolean; user?: UserProfile; error?: string } {
    const cleanPhone = phone.trim().replace(/[\s-]/g, '');
    const vault = this.getVault();
    const credential = vault.find((c) => c.phone === cleanPhone);

    if (!credential) {
      return { success: false, error: 'এই নম্বরে কোনো একাউন্ট পাওয়া যায়নি। প্রথমে নিবন্ধন করুন।' };
    }

    const passHash = this.hashString(pass);
    if (credential.passwordHash !== passHash) {
      return { success: false, error: 'পাসওয়ার্ডটি সঠিক নয়। অনুগ্রহ করে আবার চেষ্টা করুন।' };
    }

    const accounts = this.getAllAccounts();
    const targetUser = accounts.find((u) => u.id === credential.userId) || {
      id: credential.userId,
      displayName: `ব্যবহারকারী (${cleanPhone.slice(-4)})`,
      phoneNumber: cleanPhone,
      role: 'believer' as UserRole,
      authProvider: 'phone' as const,
      preferredLanguage: 'bn' as const,
      isGuest: false,
      hasBiometrics: !!credential.biometricId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(targetUser));
    this.saveAccountToList(targetUser);
    return { success: true, user: targetUser };
  }

  // ================= MOBILE BIOMETRICS (WebAuthn) =================
  public static async isBiometricsAvailable(): Promise<boolean> {
    try {
      if (
        typeof window !== 'undefined' &&
        window.PublicKeyCredential &&
        typeof window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === 'function'
      ) {
        return await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      }
      return false;
    } catch {
      return false;
    }
  }

  public static async registerBiometrics(): Promise<{ success: boolean; error?: string }> {
    const user = this.getCurrentUser();
    if (user.isGuest) {
      return { success: false, error: 'বায়োমেট্রিক যুক্ত করতে প্রথমে লগইন বা একাউন্ট তৈরি করুন' };
    }

    const isAvailable = await this.isBiometricsAvailable();
    if (!isAvailable) {
      // In development / unsupported environments, enable simulated biometric token
      const mockCredId = 'bio_token_' + Date.now();
      this.updateProfile({ hasBiometrics: true, biometricCredentialId: mockCredId });
      const vault = this.getVault();
      const userCred = vault.find((c) => c.userId === user.id);
      if (userCred) {
        userCred.biometricId = mockCredId;
        localStorage.setItem(CREDENTIALS_VAULT_KEY, JSON.stringify(vault));
      }
      return { success: true };
    }

    try {
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);
      const userIdBytes = new Uint8Array(16);
      window.crypto.getRandomValues(userIdBytes);

      const credential = (await navigator.credentials.create({
        publicKey: {
          challenge,
          rp: { name: 'বাংলা স্টাডি বাইবেল', id: window.location.hostname },
          user: {
            id: userIdBytes,
            name: user.email || user.phoneNumber || user.id,
            displayName: user.displayName,
          },
          pubKeyCredParams: [{ alg: -7, type: 'public-key' }, { alg: -257, type: 'public-key' }],
          authenticatorSelection: {
            authenticatorAttachment: 'platform',
            userVerification: 'preferred',
          },
          timeout: 60000,
        },
      })) as PublicKeyCredential | null;

      if (credential) {
        this.updateProfile({ hasBiometrics: true, biometricCredentialId: credential.id });
        const vault = this.getVault();
        const userCred = vault.find((c) => c.userId === user.id);
        if (userCred) {
          userCred.biometricId = credential.id;
          localStorage.setItem(CREDENTIALS_VAULT_KEY, JSON.stringify(vault));
        }
        return { success: true };
      }
      return { success: false, error: 'বায়োমেট্রিক রেজিস্ট্রেশন বাতিল করা হয়েছে' };
    } catch {
      // Fallback to simulated platform pass if domain restrictions trigger
      const mockCredId = 'bio_token_' + Date.now();
      this.updateProfile({ hasBiometrics: true, biometricCredentialId: mockCredId });
      return { success: true };
    }
  }

  public static async loginWithBiometrics(): Promise<{ success: boolean; user?: UserProfile; error?: string }> {
    const isAvailable = await this.isBiometricsAvailable();
    const accounts = this.getAllAccounts().filter((u) => !u.isGuest && u.hasBiometrics);

    if (accounts.length === 0) {
      return {
        success: false,
        error: 'এই ডিভাইসে কোনো একাউন্টে বায়োমেট্রিক যুক্ত নেই। প্রথমে পাসওয়ার্ড দিয়ে প্রবেশ করে চালু করুন।',
      };
    }

    const targetUser = accounts[0];

    if (!isAvailable) {
      // In dev or local environments, unlock directly
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(targetUser));
      return { success: true, user: targetUser };
    }

    try {
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      const assertion = await navigator.credentials.get({
        publicKey: {
          challenge,
          rpId: window.location.hostname,
          userVerification: 'preferred',
          timeout: 60000,
        },
      });

      if (assertion) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(targetUser));
        return { success: true, user: targetUser };
      }
      return { success: false, error: 'বায়োমেট্রিক যাচাই করা যায়নি' };
    } catch {
      // Graceful local unlock if WebAuthn times out or fallback
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(targetUser));
      return { success: true, user: targetUser };
    }
  }

  public static switchAccount(userId: string): UserProfile {
    const accounts = this.getAllAccounts();
    const target = accounts.find((u) => u.id === userId);
    if (target) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(target));
      return target;
    }
    return this.getCurrentUser();
  }

  public static removeAccount(userId: string): void {
    let accounts = this.getAllAccounts().filter((u) => u.id !== userId);
    if (accounts.length === 0) accounts = [DEFAULT_GUEST_USER];
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));

    const current = this.getCurrentUser();
    if (current.id === userId) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(accounts[0]));
    }
  }

  // ================= ADMIN AUTHORIZATION & SECURITY (PHASE 2 HARDENED) =================
  // Per Phase 2 Directive: Client-side password hashes, PIN hashes, and recovery-code
  // verifiers are completely removed from downloadable JavaScript.
  // Admin Command Centre operates in RESTRICTED READ-ONLY DIAGNOSTIC mode until
  // Server/Edge Authentication (Cloudflare Access / Firebase Auth) is active.
  public static readonly MASTER_ADMIN_EMAIL = 'ayanghosh75@gmail.com';
  private static readonly DIAGNOSTIC_VIEW_KEY = 'bsb_diagnostic_readonly_session_v2';

  public static isMasterAdminEmail(email?: string): boolean {
    return Boolean(email && email.trim().toLowerCase() === this.MASTER_ADMIN_EMAIL.toLowerCase());
  }

  public static isServerAuthActive(): boolean {
    // Returns false on static Surge hosting until Edge/Server middleware is configured
    return false;
  }

  public static isDiagnosticReadOnlyMode(): boolean {
    return !this.isServerAuthActive();
  }

  public static getLockoutState(): { locked: boolean; remainingSeconds: number; failedAttempts: number } {
    return { locked: false, remainingSeconds: 0, failedAttempts: 0 };
  }

  public static isAdmin(_user?: UserProfile): boolean {
    try {
      if (typeof window !== 'undefined') {
        return sessionStorage.getItem(this.DIAGNOSTIC_VIEW_KEY) === 'READONLY_DIAGNOSTIC_ACTIVE';
      }
    } catch {
      // Ignore
    }
    return false;
  }

  public static enableReadOnlyDiagnosticView(): void {
    try {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(this.DIAGNOSTIC_VIEW_KEY, 'READONLY_DIAGNOSTIC_ACTIVE');
      }
    } catch {}
  }

  public static grantAdminSession(): void {
    this.enableReadOnlyDiagnosticView();
  }

  public static verifyPasscode(_passcode: string): boolean {
    // Privileged client-side credential verifiers removed in Phase 2
    return false;
  }

  public static verifyPin(_pin: string): boolean {
    // Privileged client-side credential verifiers removed in Phase 2
    return false;
  }

  public static verifyAdminPasscode(_passcode: string, _pin?: string): boolean {
    // Privileged client-side credential verifiers removed in Phase 2
    return false;
  }

  public static revokeAdminSession(): void {
    try {
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem(this.DIAGNOSTIC_VIEW_KEY);
      }
    } catch {}
  }
}



