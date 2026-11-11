import React from 'react';
import { ShieldCheck, Lock, AlertCircle, FileCheck, BookOpen, Sparkles, Globe } from 'lucide-react';
import { RightsClassification } from '../../types/rights';

interface RightsBadgeProps {
  status: RightsClassification;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const RightsBadge: React.FC<RightsBadgeProps> = ({
  status,
  showIcon = true,
  size = 'md',
  className = '',
}) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'ORIGINAL':
        return {
          labelBn: 'মূল প্ল্যাটফর্ম সামগ্রী',
          labelEn: 'Original Platform Work',
          bgColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
          icon: Sparkles,
        };
      case 'OPEN_LICENSE':
      case 'CREATIVE_COMMONS':
        return {
          labelBn: 'উন্মুক্ত লাইসেন্সপ্রাপ্ত',
          labelEn: 'Open License (CC BY-SA)',
          bgColor: 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 border-teal-300 dark:border-teal-700',
          icon: Globe,
        };
      case 'PUBLIC_DOMAIN':
        return {
          labelBn: 'পাবলিক ডোমেইন (সর্বজনীন)',
          labelEn: 'Public Domain',
          bgColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300 dark:border-blue-700',
          icon: BookOpen,
        };
      case 'LICENSED':
      case 'PERMISSION_GRANTED':
        return {
          labelBn: 'অনুমোদিত / লাইসেন্সকৃত',
          labelEn: 'Licensed / Permission Granted',
          bgColor: 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border-sky-300 dark:border-sky-700',
          icon: FileCheck,
        };
      case 'COPYRIGHTED':
        return {
          labelBn: 'গ্রন্থস্বত্ব সংরক্ষিত (কপিরাইটযুক্ত)',
          labelEn: 'Copyrighted (All Rights Reserved)',
          bgColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-700',
          icon: Lock,
        };
      case 'PENDING_REVIEW':
        return {
          labelBn: 'পর্যালোচনাধীন',
          labelEn: 'Pending Review',
          bgColor: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700',
          icon: AlertCircle,
        };
      case 'RESTRICTED':
      case 'DO_NOT_PUBLISH':
        return {
          labelBn: 'সীমাবদ্ধ / প্রকাশ নিষিদ্ধ',
          labelEn: 'Restricted / Do Not Publish',
          bgColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300 dark:border-rose-700',
          icon: Lock,
        };
      default:
        return {
          labelBn: 'স্বত্বাধিকার নির্ধারিত নয়',
          labelEn: 'Unknown Status',
          bgColor: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700',
          icon: ShieldCheck,
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  }[size];

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border shadow-sm ${config.bgColor} ${sizeClasses} ${className}`}
      title={`${config.labelBn} (${config.labelEn})`}
    >
      {showIcon && <Icon className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />}
      <span>{config.labelBn}</span>
    </span>
  );
};
