import React, { useState } from 'react';
import {
  X,
  Lock,
  Phone,
  Fingerprint,
  Eye,
  EyeOff,
  User,
  Check,
  Building,
  AlertCircle,
} from 'lucide-react';
import { AuthService } from '../services/authService';
import { UserProfile, UserRole, ROLE_LABELS_BN } from '../types/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
}

type AuthMethod = 'google' | 'phone' | 'biometric';
type FormMode = 'login' | 'register';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [method, setMethod] = useState<AuthMethod>('phone');
  const [formMode, setFormMode] = useState<FormMode>('login');

  // Phone Form fields
  const [countryCode, setCountryCode] = useState('+880');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState<UserRole>('believer');
  const [churchOrOrg, setChurchOrOrg] = useState('');

  // Google Form fields (simulation/SSO)
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleName, setGoogleName] = useState('');
  const [googleRole, setGoogleRole] = useState<UserRole>('believer');

  // Status & Feedback
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const passwordAnalysis = AuthService.analyzePassword(password);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsProcessing(true);

    const fullPhone = `${countryCode}${phone.trim()}`;

    try {
      if (formMode === 'register') {
        const res = AuthService.registerWithPhone(
          fullPhone,
          password,
          displayName,
          role,
          churchOrOrg
        );
        if (res.success && res.user) {
          setSuccessMessage('আপনার একাউন্ট সফলভাবে তৈরি হয়েছে!');
          setTimeout(() => {
            onSuccess(res.user!);
            onClose();
          }, 800);
        } else {
          setErrorMessage(res.error || 'নিবন্ধন ব্যর্থ হয়েছে');
        }
      } else {
        const res = AuthService.loginWithPhone(fullPhone, password);
        if (res.success && res.user) {
          setSuccessMessage('সফলভাবে লগইন হয়েছে!');
          setTimeout(() => {
            onSuccess(res.user!);
            onClose();
          }, 800);
        } else {
          setErrorMessage(res.error || 'লগইন ব্যর্থ হয়েছে');
        }
      }
    } catch {
      setErrorMessage('একটি অপ্রত্যাশিত ত্রুটি হয়েছে');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!googleEmail.trim() || !googleEmail.includes('@')) {
      setErrorMessage('একটি সঠিক গুগল ইমেইল ঠিকানা দিন');
      return;
    }

    setIsProcessing(true);
    try {
      const user = AuthService.loginWithGoogle({
        name: googleName.trim() || googleEmail.split('@')[0],
        email: googleEmail.trim(),
        role: googleRole,
      });

      setSuccessMessage('গুগল একাউন্টে সফলভাবে প্রবেশ করেছেন!');
      setTimeout(() => {
        onSuccess(user);
        onClose();
      }, 800);
    } catch {
      setErrorMessage('গুগল লগইন সম্পন্ন করা যায়নি');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBiometricLogin = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsProcessing(true);

    try {
      const res = await AuthService.loginWithBiometrics();
      if (res.success && res.user) {
        setSuccessMessage('বায়োমেট্রিক সফলভাবে যাচাই হয়েছে!');
        setTimeout(() => {
          onSuccess(res.user!);
          onClose();
        }, 800);
      } else {
        setErrorMessage(res.error || 'বায়োমেট্রিক আনলক ব্যর্থ হয়েছে');
      }
    } catch {
      setErrorMessage('বায়োমেট্রিক যাচাই করা যায়নি');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-navy-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-navy-700 flex flex-col max-h-[92vh] overflow-hidden text-slate-800 dark:text-slate-100">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-navy-800 flex items-center justify-between bg-slate-50/70 dark:bg-navy-950/60">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-navy-950 dark:text-white">
                ব্যবহারকারী একাউন্ট (User Account)
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                “আমার স্টাডি” ব্যক্তিগত সুরক্ষিত স্থান
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Method Tabs */}
        <div className="flex border-b border-slate-100 dark:border-navy-800 bg-slate-50/50 dark:bg-navy-950/40 p-1.5 gap-1 text-xs">
          <button
            onClick={() => {
              setMethod('phone');
              setErrorMessage('');
            }}
            className={`flex-1 py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition ${
              method === 'phone'
                ? 'bg-white dark:bg-navy-800 text-gold-600 dark:text-gold-400 shadow-sm border border-slate-200/80 dark:border-navy-700'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>মোবাইল নম্বর</span>
          </button>

          <button
            onClick={() => {
              setMethod('google');
              setErrorMessage('');
            }}
            className={`flex-1 py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition ${
              method === 'google'
                ? 'bg-white dark:bg-navy-800 text-gold-600 dark:text-gold-400 shadow-sm border border-slate-200/80 dark:border-navy-700'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>গুগল ID</span>
          </button>

          <button
            onClick={() => {
              setMethod('biometric');
              setErrorMessage('');
            }}
            className={`flex-1 py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition ${
              method === 'biometric'
                ? 'bg-white dark:bg-navy-800 text-gold-600 dark:text-gold-400 shadow-sm border border-slate-200/80 dark:border-navy-700'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            <Fingerprint className="w-3.5 h-3.5" />
            <span>বায়োমেট্রিক</span>
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {/* Error & Success Alerts */}
          {errorMessage && (
            <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* ================= 1. MOBILE NUMBER METHOD ================= */}
          {method === 'phone' && (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              {/* Form Mode Toggle */}
              <div className="flex bg-slate-100 dark:bg-navy-950 p-1 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setFormMode('login')}
                  className={`flex-1 py-1.5 rounded-lg transition ${
                    formMode === 'login'
                      ? 'bg-white dark:bg-navy-800 text-navy-950 dark:text-white shadow-xs font-bold'
                      : 'text-slate-500'
                  }`}
                >
                  লগইন করুন
                </button>
                <button
                  type="button"
                  onClick={() => setFormMode('register')}
                  className={`flex-1 py-1.5 rounded-lg transition ${
                    formMode === 'register'
                      ? 'bg-white dark:bg-navy-800 text-navy-950 dark:text-white shadow-xs font-bold'
                      : 'text-slate-500'
                  }`}
                >
                  নতুন নিবন্ধন
                </button>
              </div>

              {/* Name field for registration */}
              {formMode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    আপনার নাম / পরিচয়
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="যেমন: পাস্টর স্যামুয়েল বা জন হালদার"
                      required
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-950 text-xs focus:ring-2 focus:ring-gold-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Phone input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  মোবাইল নম্বর
                </label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="px-2.5 py-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs font-semibold focus:outline-none"
                  >
                    <option value="+880">🇧🇩 +880</option>
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+971">🇦🇪 +971</option>
                  </select>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01712345678"
                    required
                    className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-950 text-xs focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  পাসওয়ার্ড
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="কমপক্ষে ৮টি অক্ষর"
                    required
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-950 text-xs focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Meter for registration */}
                {formMode === 'register' && password.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <div className="flex gap-1 h-1.5 w-full bg-slate-100 dark:bg-navy-950 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          passwordAnalysis.strength === 'strong'
                            ? 'w-full bg-emerald-500'
                            : passwordAnalysis.strength === 'medium'
                            ? 'w-2/3 bg-amber-500'
                            : 'w-1/3 bg-rose-500'
                        }`}
                      />
                    </div>
                    <p
                      className={`text-[10px] font-semibold ${
                        passwordAnalysis.strength === 'strong'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : passwordAnalysis.strength === 'medium'
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {passwordAnalysis.feedbackBn}
                    </p>
                  </div>
                )}
              </div>

              {/* Extra registration details: Role & Church */}
              {formMode === 'register' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      আত্মিক ভূমিকা / পদবি
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="w-full p-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-950 text-xs focus:outline-none"
                    >
                      {Object.entries(ROLE_LABELS_BN).map(([k, label]) => (
                        <option key={k} value={k}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      মণ্ডলী / প্রতিষ্ঠান (ঐচ্ছিক)
                    </label>
                    <div className="relative">
                      <Building className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        value={churchOrOrg}
                        onChange={(e) => setChurchOrOrg(e.target.value)}
                        placeholder="যেমন: ঢাকা ব্যাপটিস্ট মণ্ডলী"
                        className="w-full pl-8 pr-2 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-950 text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-gold-500 to-amber-600 text-navy-950 font-bold text-xs shadow-md shadow-gold-500/20 hover:brightness-105 transition active:scale-98 disabled:opacity-50"
              >
                {isProcessing
                  ? 'প্রক্রিয়াধীন...'
                  : formMode === 'register'
                  ? 'নিবন্ধন সম্পন্ন করুন'
                  : 'একাউন্টে প্রবেশ করুন'}
              </button>
            </form>
          )}

          {/* ================= 2. GOOGLE ID METHOD ================= */}
          {method === 'google' && (
            <div className="space-y-4 text-center py-2">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 dark:bg-navy-800 flex items-center justify-center text-gold-500">
                <svg className="w-7 h-7" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>

              <div>
                <h4 className="font-serif font-bold text-base text-navy-950 dark:text-white">
                  গুগল একাউন্ট দিয়ে সরাসরি প্রবেশ
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                  আপনার গুগল একাউন্টের নাম ও ইমেইল যুক্ত করে নিরাপদে সমস্ত স্টাডি ডাটা সমন্বয় করুন।
                </p>
              </div>

              <form onSubmit={handleGoogleSubmit} className="space-y-3 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    গুগল ইমেইল (Gmail)
                  </label>
                  <input
                    type="email"
                    value={googleEmail}
                    onChange={(e) => setGoogleEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-950 text-xs focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    পূর্ণ নাম
                  </label>
                  <input
                    type="text"
                    value={googleName}
                    onChange={(e) => setGoogleName(e.target.value)}
                    placeholder="পাস্টর স্যামুয়েল বা আপনার নাম"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-950 text-xs focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    ভূমিকা
                  </label>
                  <select
                    value={googleRole}
                    onChange={(e) => setGoogleRole(e.target.value as UserRole)}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-950 text-xs focus:outline-none"
                  >
                    {Object.entries(ROLE_LABELS_BN).map(([k, label]) => (
                      <option key={k} value={k}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 rounded-2xl bg-white dark:bg-navy-800 text-slate-800 dark:text-white font-bold text-xs border border-slate-300 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-750 shadow-sm transition flex items-center justify-center gap-2"
                >
                  <span>গুগল দিয়ে সাইন-ইন করুন</span>
                </button>
              </form>
            </div>
          )}

          {/* ================= 3. BIOMETRICS METHOD ================= */}
          {method === 'biometric' && (
            <div className="text-center py-5 space-y-4">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-gold-500/20 to-amber-500/20 text-gold-500 flex items-center justify-center animate-pulse">
                <Fingerprint className="w-10 h-10" />
              </div>

              <div>
                <h4 className="font-serif font-bold text-base text-navy-950 dark:text-white">
                  মোবাইল বায়োমেট্রিক আনলক
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                  পাসওয়ার্ড টাইপ না করে ফোনের ফিঙ্গারপ্রিন্ট অথবা ফেস আইডি দিয়ে তাৎক্ষণিক আপনার স্টাডি টুল খুলুন।
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleBiometricLogin}
                  disabled={isProcessing}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 to-amber-600 text-navy-950 font-extrabold text-xs shadow-xl shadow-gold-500/20 hover:brightness-105 transition transform active:scale-95 inline-flex items-center gap-2"
                >
                  <Fingerprint className="w-5 h-5" />
                  <span>{isProcessing ? 'যাচাই করা হচ্ছে...' : 'ফিঙ্গারপ্রিন্ট দিয়ে আনলক করুন'}</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                * যদি বায়োমেট্রিক এখনো যুক্ত না করা থাকে, তবে প্রথমে মোবাইল নম্বর দিয়ে লগইন করে সেটিংসে চালু করুন।
              </p>
            </div>
          )}
        </div>

        {/* Footer: Guest mode shortcut */}
        <div className="p-3 sm:p-4 border-t border-slate-100 dark:border-navy-800 bg-slate-50 dark:bg-navy-950/60 flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400">একাউন্ট ছাড়াই পড়তে চান?</span>
          <button
            onClick={() => {
              AuthService.resetToGuest();
              onClose();
            }}
            className="font-bold text-gold-600 dark:text-gold-400 hover:underline"
          >
            অতিথি হিসেবে পাঠ চালিয়ে যান →
          </button>
        </div>
      </div>
    </div>
  );
};
