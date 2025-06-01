import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { CustomAnalytics } from '@/components/analytics/CustomAnalytics'
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rice Purity Test',
  description: 'A modern implementation of the Rice Purity Test with enhanced features',
  metadataBase: new URL('https://queenspuritytest.com'),
  
  // Favicon and app icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/favicon.ico',
    apple: { url: '/purity-test.png', sizes: '180x180' },
  },
  
  // Open Graph metadata
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://queenspuritytest.com',
    title: 'Rice Purity Test | How Pure Are You?',
    description: 'Take the Rice Purity Test and compare your score with others from various faculties',
    siteName: 'Queen\'s University Purity Test',
    images: [{
      url: 'https://queenspuritytest.com/reddit.png',
      width: 1200,
      height: 630,
      alt: 'Queen\'s University Purity Test',
    }],
  },
  
  // Twitter card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Rice Purity Test | How Pure Are You?',
    description: 'Take the Rice Purity Test and compare your score with others from various faculties',
    images: ['https://queenspuritytest.com/reddit.png'],
  },
  
  alternates: {
    canonical: 'https://queenspuritytest.com',
  },
  
  // Other useful metadata
  keywords: ['Queens University','rice purity test', 'purity test', 'faculty comparison', 'engineering purity'],
  authors: [{ name: 'Anonymous' }],
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-5330176235227654" />
      </head>
      <body className={`${inter.className} queens-background`}>
        {/* Google AdSense Auto Ads */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5330176235227654"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        
        {/* Umami Analytics */}
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="59998ff5-63ab-48d5-98d5-4c0aa84357d1"
          strategy="afterInteractive"
        />
        
        <main className="min-h-screen">
          {children}
        </main>
        
        <CustomAnalytics />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
} 