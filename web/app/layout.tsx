import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rice Purity Test',
  description: 'A modern implementation of the Rice Purity Test with enhanced features',
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