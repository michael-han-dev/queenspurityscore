import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { AdSidebar } from '@/components/ui/ads/ad-sidebar'

export default function Home() {
  return (
    <div className="page-container">
      {/* Left side ad */}
      <AdSidebar adSlot="1234567890" position="left" />
      
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="rice-purity-container">
          <header className="rice-header">
            <div className="title flex flex-col items-center">
              <Image 
                src="/images/purity-test.png" 
                alt="Rice Purity Test Logo"
                width={300}
                height={300}
                className="mb-4"
              />
              <h1 className="rice-title">
                <span className="thresher-font">The</span> Queen's Purity Test
              </h1>
              <h2 className="rice-subtitle">How pure are you?</h2>
            </div>
          </header>

          <div className="text-center mb-8">
            <p className="mb-4 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              The Rice Purity Test is a self-graded survey that assesses the participant&apos;s level of innocence.
            </p>
            <p className="text-sm sm:text-base font-semibold">
              Check each box for which you have done the act described.
            </p>
          </div>

          <div className="test-options grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto max-w-4xl">
            <Link href="/prompts" className="test-option bg-[#f8f3e6] border-2 border-[#9e9176] p-4 rounded-md text-center hover:bg-[#f0e9d6] transition-colors">
              <h3 className="font-medium text-lg text-[#86412e] mb-2">General Queen's Test</h3>
              <p className="text-sm text-[#5d5345]">The classic Rice Purity Test for all Queen's students</p>
            </Link>
            
            <Link href="/engineering" className="test-option bg-[#f8f3e6] border-2 border-[#9e9176] p-4 rounded-md text-center hover:bg-[#f0e9d6] transition-colors">
              <h3 className="font-medium text-lg text-[#86412e] mb-2">Engineering Test</h3>
              <p className="text-sm text-[#5d5345]">Engineering Specific Test</p>
            </Link>
            
            <Link href="/commerce" className="test-option bg-[#f8f3e6] border-2 border-[#9e9176] p-4 rounded-md text-center hover:bg-[#f0e9d6] transition-colors">
              <h3 className="font-medium text-lg text-[#86412e] mb-2">Commerce Test</h3>
              <p className="text-sm text-[#5d5345]">
                Commerce Specific Test
              </p>
            </Link>
            
            <Link href="/nursing" className="test-option bg-[#f8f3e6] border-2 border-[#9e9176] p-4 rounded-md text-center hover:bg-[#f0e9d6] transition-colors">
              <h3 className="font-medium text-lg text-[#86412e] mb-2">Nursing Test</h3>
              <p className="text-sm text-[#5d5345]">
                Nursing Specific Test
              </p>
            </Link>
            
            <Link href="/health" className="test-option bg-[#f8f3e6] border-2 border-[#9e9176] p-4 rounded-md text-center hover:bg-[#f0e9d6] transition-colors">
              <h3 className="font-medium text-lg text-[#86412e] mb-2">Health Sciences Test</h3>
              <p className="text-sm text-[#5d5345]">
                Health Sciences Specific Test
              </p>
            </Link>
          </div>
          
          <div className="text-center text-sm text-gray-700 mt-8" id="ThresherBottomText">
            <p>
              This modernized version includes faculty selection and anonymous analytics for all Queen's students to see. Note the averages may be skewed due to the small sample size.
            </p>
            <p className="mt-4 text-xs">
              <a href="https://ricepuritytest.com" className="text-[#86412e] hover:underline" target="_blank" rel="noopener noreferrer">
                View the original Rice Purity Test
              </a>
            </p>
          </div>
        </div>
      </div>
      
      {/* Right side ad */}
      <AdSidebar adSlot="6789012345" position="right" />
    </div>
  )
} 