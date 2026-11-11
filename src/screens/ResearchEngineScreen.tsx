import React from 'react';
import { ResearchDashboard } from '../components/research/ResearchDashboard';

interface ResearchEngineScreenProps {
  initialQuery?: string;
  onNavigateToVerse: (bookId: string, chapter: number, verse?: number) => void;
  onOpenMyStudy?: () => void;
  useBengaliDigits?: boolean;
}

export const ResearchEngineScreen: React.FC<ResearchEngineScreenProps> = ({
  initialQuery = 'পরিত্রাণ',
  onNavigateToVerse,
  onOpenMyStudy: _onOpenMyStudy,
  useBengaliDigits = true,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-28 space-y-6">
      <ResearchDashboard
        initialQuery={initialQuery}
        onNavigateToVerse={onNavigateToVerse}
        onSaveToMyStudySuccess={() => {
          // Optional notification or redirect
        }}
        useBengaliDigits={useBengaliDigits}
      />
    </div>
  );
};
