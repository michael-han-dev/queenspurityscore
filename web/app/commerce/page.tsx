import Image from 'next/image'
import Link from 'next/link'
import { CommercePromptsForm } from './components/commerce-prompts-form'
import { CommerceSuggestionForm } from './components/commerce-suggestion-form'
import { AdSidebar } from '@/components/ui/ads/ad-sidebar'

export default function CommercePage() {
  return (
    <div className="page-container queens-background">
      {/* Left side ad */}
      <AdSidebar adSlot="4567890123" position="left" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="rice-purity-container relative">
          {/* Home Button inside the container */}
          <div className="absolute top-4 left-4 z-10">
            <Link 
              href="/" 
              className="flex items-center gap-1 bg-[#f8f3e6] border border-[#9e9176] px-3 py-2 rounded-md hover:bg-[#f0e9d6] transition-colors text-[#86412e]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              <span className="text-sm">Home</span>
            </Link>
          </div>
          
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
                <span className="thresher-font">The</span> Qcomm Purity Test
              </h1>
              <h2 className="rice-subtitle">
                Check the boxes for commerce acts that you have done
              </h2>
            </div>
          </header>

          <CommercePromptsForm />
          <CommerceSuggestionForm />
        </div>
      </div>
      
      {/* Right side ad */}
      <AdSidebar adSlot="5678901234" position="right" />
    </div>
  );
} 