import Image from 'next/image'
import { NursingSuggestionForm } from './components/nursing-suggestion-form'
import { AdSidebar } from '@/components/ui/ads/ad-sidebar'
import Link from 'next/link'

export default function NursingPage() {
  return (
    <div className="page-container queens-background">
      {/* Left side ad */}
      <AdSidebar adSlot="6789012345" position="left" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="rice-purity-container">
          <header className="rice-header">
            <div className="title flex flex-col items-center">
              <Image 
                src="/images/purity-test.png" 
                alt="Rice Purity Test Logo"
                width={300}
                height={300}
                className="mb-3"
              />
              <h1 className="rice-title">
                <span className="thresher-font">The</span> Queen's Nursing Purity Test
              </h1>
              <h2 className="rice-subtitle">
                Nursing test coming soon!
              </h2>
            </div>
          </header>

          <div className="mt-8 text-center">
            <div className="bg-[#f0e9d6] border-2 border-[#9e9176] p-6 rounded-md inline-block">
              <h3 className="text-xl font-medium mb-4 text-[#86412e]">Coming Soon!</h3>
              <p className="mb-6">
                We're working on creating a Nursing-specific purity test. 
                Help us by suggesting questions that should be on the test!
              </p>
              
              <NursingSuggestionForm />
              
              <div className="mt-8">
                <Link href="/" className="text-[#86412e] hover:underline">
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side ad */}
      <AdSidebar adSlot="7890123456" position="right" />
    </div>
  )
} 