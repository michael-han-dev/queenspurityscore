"use client"

import { useEffect, useRef } from 'react'

interface AdInArticleProps {
  adSlot: string;
  className?: string;
}

export function AdInArticle({ adSlot, className = "" }: AdInArticleProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adRef.current && typeof window !== 'undefined') {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('Error loading AdSense ad:', error);
      }
    }
  }, []);

  return (
    <div className={`ad-container-in-article ${className}`}>
      <p className="text-xs text-[#5d5345] mb-1 text-center">Advertisement</p>
      <div ref={adRef} className="overflow-hidden">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', textAlign: 'center' }}
          data-ad-client="ca-pub-5330176235227654"
          data-ad-slot={adSlot}
          data-ad-layout="in-article"
          data-ad-format="fluid"
        />
      </div>
    </div>
  );
} 