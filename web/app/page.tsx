import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="rice-purity-container">
        <header className="rice-header">
          <div className="title flex flex-col items-center">
            <Image 
              src="/images/purity test.png" 
              alt="Rice Purity Test Logo"
              width={300}
              height={300}
              className="mb-4"
            />
            <h1 className="rice-title">
              <span className="thresher-font">The</span> Rice Purity Test
            </h1>
            <h2 className="rice-subtitle">How pure are you?</h2>
          </div>
        </header>

        <div className="text-center mb-8">
          <p className="mb-4 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            The Rice Purity Test is a self-graded survey that assesses the participant&apos;s level of innocence in matters such as sex, drugs, deceit, and other activities that are considered contrary to the normal values of a person.
          </p>
          <p className="text-sm sm:text-base font-semibold">
            Check each box for which you have done the act described.
          </p>
        </div>

        <div className="text-center mb-12">
          <Link href="/prompts">
            <Button className="rice-button text-lg px-8 py-3">Begin The Test</Button>
          </Link>
        </div>
        
        <div className="text-center text-sm text-gray-700" id="ThresherBottomText">
          <p>
            This modernized version includes faculty selection and anonymous analytics for all Queen's students to see.
          </p>
          <p className="mt-4 text-xs">
            <a href="https://ricepuritytest.com" className="text-[#86412e] hover:underline" target="_blank" rel="noopener noreferrer">
              View the original Rice Purity Test
            </a>
          </p>
        </div>
      </div>
    </div>
  )
} 