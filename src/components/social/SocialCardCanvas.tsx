// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// SOCIAL CARD CANVAS COMPONENT
// Project Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Contact: ayanghosh75@gmail.com
// ============================================================

import React, { useRef, useEffect, useState } from 'react';
import { Download, Image as ImageIcon, Check } from 'lucide-react';
import { SocialPost } from '../../types/social';
import { SocialCardGenerator } from '../../services/social/socialCardGenerator';

interface SocialCardCanvasProps {
  post: SocialPost;
  className?: string;
  showDownloadButton?: boolean;
}

export const SocialCardCanvas: React.FC<SocialCardCanvasProps> = ({
  post,
  className = '',
  showDownloadButton = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRendered, setIsRendered] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const render = async () => {
      if (!canvasRef.current) return;
      try {
        await SocialCardGenerator.renderCardToCanvas(canvasRef.current, post, {
          width: 1080,
          height: 1080,
        });
        if (isMounted) {
          setIsRendered(true);
        }
      } catch (err) {
        console.error('Failed to render social card canvas:', err);
      }
    };

    render();

    return () => {
      isMounted = false;
    };
  }, [post]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const cleanDay = post.dayOfWeek.toLowerCase();
    const filename = `bsb-post-day${post.dayNumber}-${cleanDay}.png`;
    SocialCardGenerator.downloadCanvasImage(canvasRef.current, filename);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative w-full max-w-[360px] aspect-square rounded-2xl overflow-hidden shadow-xl border border-amber-500/30 bg-slate-950 group">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
        />

        {!isRendered && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-slate-400">
            <ImageIcon className="w-8 h-8 animate-pulse text-amber-500 mb-2" />
            <span className="text-xs">এইচডি কার্ড তৈরি হচ্ছে...</span>
          </div>
        )}
      </div>

      {showDownloadButton && (
        <button
          onClick={handleDownload}
          disabled={!isRendered}
          className="mt-3 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-amber-600 hover:bg-amber-700 text-white transition-all shadow-md active:scale-95 disabled:opacity-50"
        >
          {downloaded ? (
            <>
              <Check className="w-4 h-4 text-emerald-200" />
              <span>কার্ড সংরক্ষিত হয়েছে!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>১-ক্লিকে এইচডি কার্ড ডাউনলোড (১০৮০×১০৮০)</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};
