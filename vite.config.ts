import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    allowedHosts: true,
  },
  preview: {
    allowedHosts: true,
  },
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
          if (id.includes('src/data/preloadedVerses')) {
            return 'data-preloaded-bible';
          }
          if (
            id.includes('src/data/verses') ||
            id.includes('src/data/bible-books') ||
            id.includes('src/data/books') ||
            id.includes('src/data/canonicalBibleInventory')
          ) {
            return 'data-bible';
          }
          if (id.includes('src/data/askBibleKnowledgeBase') || id.includes('src/services/askBibleService')) {
            return 'data-askbible';
          }
          if (id.includes('src/data/social/')) {
            return 'data-social';
          }
          if (id.includes('src/data/tutorial/')) {
            return 'data-tutorial';
          }
          if (id.includes('src/data/rights/')) {
            return 'data-rights';
          }
          if (id.includes('src/data/feedback/')) {
            return 'data-feedback';
          }
          if (
            id.includes('src/screens/admin/AdminAnalyticsScreen') ||
            id.includes('src/components/admin/AdminSecurityGate') ||
            id.includes('src/services/analyticsService')
          ) {
            return 'admin-analytics';
          }
          if (id.includes('src/screens/PartnerKitScreen')) {
            return 'dist-partners';
          }
          if (id.includes('src/screens/BetaInviteScreen')) {
            return 'dist-beta';
          }
          if (
            id.includes('src/screens/admin/AdminGlobalDistributionScreen') ||
            id.includes('src/services/campaignService')
          ) {
            return 'dist-campaign';
          }
          if (
            id.includes('src/data/') ||
            id.includes('src/services/researchEngineService')
          ) {
            return 'data-theology';
          }
        },
      },
    },
  },
})
