import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rice Purity Test',
  description: 'A modern implementation of the Rice Purity Test with enhanced features',
  
  // Favicon and app icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/purity test.png', type: 'image/png' },
    ],
    apple: { url: '/purity test.png' },
  },
  
  // Open Graph metadata
  openGraph: {
    title: 'Rice Purity Test | How Pure Are You?',
    description: 'Take the Rice Purity Test and compare your score with others from various faculties',
    images: [{
      url: '/purity test.png',
      width: 300,
      height: 300,
      alt: 'Rice Purity Test',
    }],
    locale: 'en_US',
    type: 'website',
  },
  
  // Twitter card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Rice Purity Test | How Pure Are You?',
    description: 'Take the Rice Purity Test and compare your score with others from various faculties',
    images: ['/purity test.png'],
  },
  
  // Canonical URL (optional, but recommended)
  alternates: {
    canonical: 'https://yourwebsite.com',
  },
  
  // Other useful metadata
  keywords: ['rice purity test', 'purity test', 'faculty comparison', 'engineering purity'],
  authors: [{ name: 'Your Name' }],
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
      <body className={inter.className}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
} 