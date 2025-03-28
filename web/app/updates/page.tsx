import Link from 'next/link'
import { AdSidebar } from '@/components/ui/ads/ad-sidebar'

export default function UpdatesPage() {
  return (
    <div className="page-container queens-background">
      {/* Left side ad */}
      <AdSidebar adSlot="1234567890" position="left" />
      
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
          
          <header className="rice-header mb-8">
            <h1 className="text-3xl font-serif text-center">Site Updates</h1>
            <div className="w-24 h-1 bg-[#9e9176] mx-auto mt-2"></div>
          </header>

          <div className="updates-container space-y-8 max-w-3xl mx-auto">
            {/* Update Entry */}
            <div className="update-entry">
              <h2 className="text-xl font-medium text-[#86412e] border-b border-[#d4c9a8] pb-2 mb-4">Mar 28, 2025</h2>
              <div className="space-y-4 text-[#5d5345]">
                <p>
                  <strong>Site Launch:</strong> Queens Purity Test launched with 100 prompts for the general test and 
                  100 prompts for the engineering test.
                </p>
                <p>
                  <strong>Added:</strong> Faculty selection feature allowing students to identify their faculty.
                </p>
                <p>
                  <strong>Added:</strong> Anonymous statistics to show average scores by faculty.
                </p>
              </div>
            </div>


            {/* Template for future updates */}
            {/* 
            <div className="update-entry">
              <h2 className="text-xl font-medium text-[#86412e] border-b border-[#d4c9a8] pb-2 mb-4">[Date]</h2>
              <div className="space-y-4 text-[#5d5345]">
                <p>
                  <strong>Added:</strong> [Description of added features or prompts]
                </p>
                <p>
                  <strong>Removed:</strong> [Description of removed features or prompts]
                </p>
                <p>
                  <strong>Fixed/Updated:</strong> [Description of fixes or updates]
                </p>
              </div>
            </div>
            */}
          </div>

          <div className="text-center mt-12">
            <Link href="/" className="text-[#86412e] hover:underline">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
      
      {/* Right side ad */}
      <AdSidebar adSlot="2345678901" position="right" />
    </div>
  )
} 