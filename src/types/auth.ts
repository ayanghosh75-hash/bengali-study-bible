export type UserRole = 'guest' | 'pastor' | 'teacher' | 'student' | 'researcher' | 'believer' | 'admin';

export type AuthProvider = 'google' | 'phone' | 'guest';

export interface UserProfile {
  id: string;
  displayName: string;
  role: UserRole;
  authProvider: AuthProvider;
  email?: string;
  phoneNumber?: string;
  churchOrOrg?: string;
  denomination?: string;
  avatarUrl?: string;
  avatarColor?: string;
  preferredLanguage: 'bn' | 'en';
  isGuest: boolean;
  hasBiometrics: boolean;
  biometricCredentialId?: string;
  createdAt: string;
  updatedAt: string;
  lastActiveAt?: string;
}

export interface AuthState {
  user: UserProfile;
  isAuthenticated: boolean;
}

export type PasswordStrength = 'weak' | 'medium' | 'strong';

export interface PasswordAnalysis {
  strength: PasswordStrength;
  score: number; // 0 to 4
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  feedbackBn: string;
}

export type BiometricStatus = 'unsupported' | 'available' | 'registered';

export const ROLE_LABELS_BN: Record<UserRole, string> = {
  guest: 'অতিথি পাঠক (Guest)',
  pastor: 'পালক / পাস্টর (Pastor)',
  teacher: 'বাইবেল শিক্ষক (Teacher)',
  student: 'থিওলজি শিক্ষার্থী (Student)',
  researcher: 'গবেষক (Researcher)',
  believer: 'সাধারণ বিশ্বাসী (Believer)',
  admin: 'প্রশাসক (Administrator)',
};
