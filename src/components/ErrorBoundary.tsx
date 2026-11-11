import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertTriangle, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private handleResetStorageAndReload = () => {
    if (window.confirm('আপনি কি নিশ্চিত যে স্থানীয় সাময়িক ডেটা রিসেট করতে চান? (আপনার সেভ করা সার্মন সুরক্ষিত থাকবে)')) {
      try {
        sessionStorage.clear();
        localStorage.removeItem('bsb_last_read_v1');
      } catch (e) {
        console.error('Failed to clear cache', e);
      }
      window.location.href = '/';
    }
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4 font-sans text-stone-800">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-stone-200 p-6 sm:p-8 text-center">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-amber-700" />
            </div>

            <h1 className="text-xl font-bold text-stone-900 mb-2">
              একটি অপ্রত্যাশিত ত্রুটি ঘটেছে
            </h1>
            <p className="text-sm text-stone-600 mb-6 leading-relaxed">
              অনুগ্রহ করে পৃষ্ঠাটি রিফ্রেশ করুন অথবা মূল স্ক্রিনে ফিরে যান। আপনার সংরক্ষিত ডেটা নিরাপদ রয়েছে।
            </p>

            <div className="flex flex-col gap-3 mb-6">
              <button
                onClick={this.handleReload}
                className="w-full py-3 px-4 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded-xl shadow-sm transition flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>পৃষ্ঠাটি পুনরায় লোড করুন</span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium rounded-xl transition flex items-center justify-center gap-2 text-sm"
              >
                <Home className="w-4 h-4" />
                <span>মূল স্ক্রিনে যান</span>
              </button>

              <button
                onClick={this.handleResetStorageAndReload}
                className="text-xs text-stone-400 hover:text-stone-600 underline mt-2"
              >
                ক্যাশে রিসেট করুন
              </button>
            </div>

            {this.state.error && (
              <details className="text-left bg-stone-50 p-3 rounded-lg border border-stone-200 text-xs text-stone-500 font-mono overflow-auto max-h-36">
                <summary className="cursor-pointer font-sans font-medium text-stone-600 hover:underline">
                  কারিগরি বিবরণ দেখুন
                </summary>
                <div className="mt-2 whitespace-pre-wrap break-all">
                  {this.state.error.toString()}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

interface DeepBoundaryProps {
  children: ReactNode;
  onNavigateToScripture?: (bookId: string, chapter: number, verse?: number) => void;
}

interface DeepBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * DeepAssistantErrorBoundary: Failure Isolation Boundary.
 * Ensures that if Deep AI assistant encounters an error, the core Scripture reader,
 * search, and offline storage remain 100% functional and undisturbed.
 */
export class DeepAssistantErrorBoundary extends Component<DeepBoundaryProps, DeepBoundaryState> {
  public state: DeepBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): DeepBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('DeepAssistantErrorBoundary isolated an error in Deep AI Assistant:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-2xl mx-auto p-6 my-8 bg-amber-50 border border-amber-200 rounded-2xl text-center shadow-sm">
          <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-3">
            <AlertTriangle className="w-6 h-6 text-amber-700" />
          </div>
          <h2 className="text-lg font-bold text-stone-900 mb-1 font-serif">
            দীপ সহকারী পুনর্গঠনাধীন — শাস্ত্র পাঠ সম্পূর্ণ অক্ষুণ্ণ
          </h2>
          <p className="text-sm text-stone-700 mb-4 leading-relaxed">
            দীপ এআই সহকারী মডিউলে একটি সাময়িক সমস্যা ঘটেছে। তবে পবিত্র বাইবেলের ৬৬টি পুস্তক পাঠ, অধ্যায় অনুসন্ধান এবং অফলাইন শাস্ত্র সম্পূর্ণ কার্যকর রয়েছে।
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {this.props.onNavigateToScripture && (
              <button
                onClick={() => this.props.onNavigateToScripture?.('GEN', 1)}
                className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white text-sm font-medium rounded-xl shadow-sm transition flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>বাইবেল পাঠে ফিরে যান</span>
              </button>
            )}
            <button
              onClick={this.handleRetry}
              className="px-4 py-2 bg-white hover:bg-stone-50 text-stone-700 text-sm font-medium rounded-xl border border-stone-300 transition flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>সহকারী পুনরায় চালু করুন</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

