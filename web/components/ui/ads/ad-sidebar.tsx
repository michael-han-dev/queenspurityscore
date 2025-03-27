"use client"

import { useEffect, useRef, useState } from 'react'

interface AdSidebarProps {
  adSlot: string;
  position: 'left' | 'right';
  className?: string;
}

export function AdSidebar({ adSlot, position, className = "" }: AdSidebarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Only try to load the ad once
    if (containerRef.current && !adLoaded && typeof window !== 'undefined') {
      try {
        // Find the ins element inside the container
        const insElement = containerRef.current.querySelector('.adsbygoogle');
        
        // Check if this element already has an ad
        if (insElement && !insElement.querySelector('iframe')) {
          // Set a data attribute to track this specific ad slot
          insElement.setAttribute('data-ad-slot-loaded', adSlot);
          
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          
          setAdLoaded(true);
        }
      } catch (error) {
        console.error('Error loading AdSense ad:', error);
      }
    }
  }, [adSlot, adLoaded]);

  return (
    <div className={`ad-sidebar ad-sidebar-${position} ${className}`}>
      <p className="text-xs text-[#5d5345] mb-1 text-center">Advertisement</p>
      <div ref={containerRef} className="overflow-hidden">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-5330176235227654"
          data-ad-slot={adSlot}
          data-ad-format="vertical"
        />
      </div>
    </div>
  );
} 