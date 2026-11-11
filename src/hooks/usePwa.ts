import { useState, useEffect, useCallback } from 'react';
import { BeforeInstallPromptEvent, PwaService } from '../services/pwaService';
import { AnalyticsService } from '../services/analyticsService';

export interface PwaState {
  isInstallable: boolean;
  isStandalone: boolean;
  isInstalled: boolean;
  isBannerVisible: boolean;
  isOffline: boolean;
  updateAvailable: boolean;
  installApp: () => Promise<boolean>;
  dismissBanner: (days?: number) => void;
  applyUpdate: () => void;
  isIOS: boolean;
  isAndroid: boolean;
}

export function usePwa(): PwaState {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState<boolean>(PwaService.isStandalone());
  const [isInstalled, setIsInstalled] = useState<boolean>(PwaService.isInstalled());
  const [isBannerVisible, setIsBannerVisible] = useState<boolean>(PwaService.shouldShowBanner());
  const [isOffline, setIsOffline] = useState<boolean>(typeof navigator !== 'undefined' ? !navigator.onLine : false);
  const [updateAvailable, setUpdateAvailable] = useState<boolean>(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  // Check standalone mode on mount and resize/display-mode change
  useEffect(() => {
    const checkStandalone = () => {
      const standalone = PwaService.isStandalone();
      setIsStandalone(standalone);
      if (standalone) {
        setIsInstalled(true);
        PwaService.markAsInstalled();
        setIsBannerVisible(false);
      }
    };

    checkStandalone();

    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsStandalone(true);
        setIsInstalled(true);
        PwaService.markAsInstalled();
        setIsBannerVisible(false);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleDisplayModeChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleDisplayModeChange);
      }
    };
  }, []);

  // Listen for beforeinstallprompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent standard mini-infobar from automatically showing
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      AnalyticsService.trackInstallPromptShown('browser_event');
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsInstalled(true);
      PwaService.markAsInstalled();
      setIsBannerVisible(false);
      AnalyticsService.trackAppInstalledEvent();
      console.log('[PWA] App installed successfully');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Listen for online / offline events
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Listen for Service Worker updates
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setWaitingWorker(newWorker);
                setUpdateAvailable(true);
              }
            });
          }
        });
      });
    }
  }, []);

  // Trigger app installation
  const installApp = useCallback(async (): Promise<boolean> => {
    if (deferredPrompt) {
      try {
        AnalyticsService.trackInstallPromptShown('manual_trigger');
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setIsInstalled(true);
          PwaService.markAsInstalled();
          setIsBannerVisible(false);
          setDeferredPrompt(null);
          AnalyticsService.trackInstallPromptAccepted();
          AnalyticsService.trackAppInstalledEvent();
          return true;
        } else {
          console.log('[PWA] User dismissed install prompt');
          return false;
        }
      } catch (err) {
        console.warn('[PWA] Error calling install prompt:', err);
        return false;
      }
    }
    // Return false if native prompt not available, so UI can open instructions modal
    return false;
  }, [deferredPrompt]);

  // Dismiss banner
  const dismissBanner = useCallback((days: number = 7) => {
    PwaService.dismissBanner(days);
    setIsBannerVisible(false);
  }, []);

  // Apply service worker update
  const applyUpdate = useCallback(() => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    }
    window.location.reload();
  }, [waitingWorker]);

  return {
    isInstallable: Boolean(deferredPrompt),
    isStandalone,
    isInstalled,
    isBannerVisible: isBannerVisible && !isStandalone && !isInstalled,
    isOffline,
    updateAvailable,
    installApp,
    dismissBanner,
    applyUpdate,
    isIOS: PwaService.isIOS(),
    isAndroid: PwaService.isAndroid(),
  };
}
