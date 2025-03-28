import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rice Purity Test',
  description: 'A modern implementation of the Rice Purity Test with enhanced features',
  metadataBase: new URL('https://queenspuritytest.com'),
  
  // Favicon and app icons
  icons: {
    icon: [
      { url: 'https://queenspuritytest.com/favicon.ico', sizes: 'any' },
      { url: 'https://queenspuritytest.com/favicon.ico', type: 'image/x-icon' },
    ],
    shortcut: 'https://queenspuritytest.com/favicon.ico',
    apple: { url: 'https://queenspuritytest.com/images/purity-test.png', sizes: '180x180' },
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
        {/* Add traditional favicon link as fallback */}
        <link rel="shortcut icon" href="/favicon.ico" />
        
        <meta name="google-adsense-account" content="ca-pub-5330176235227654" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (window.adsbygoogleInit === true) return;
                window.adsbygoogleInit = true;
                var script = document.createElement('script');
                script.async = true;
                script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5330176235227654';
                script.crossOrigin = 'anonymous';
                document.head.appendChild(script);
              })();
            `
          }}
        />
      </head>
      <body className={`${inter.className} queens-background`}>
        <main className="min-h-screen">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  )
} 