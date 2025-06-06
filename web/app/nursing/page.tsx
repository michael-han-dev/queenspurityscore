import Image from 'next/image'
import { NursingSuggestionForm } from './components/nursing-suggestion-form'
import Link from 'next/link'

export default function NursingPage() {
  return (
    <div className="page-container queens-background">
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
    </div>
  )
} 