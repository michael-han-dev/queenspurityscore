import Image from 'next/image'
import { EngineeringPromptsForm } from './components/engineering-prompts-form'
import { AdSidebar } from '@/components/ui/ads/ad-sidebar'

export default function EngineeringPromptsPage() {
  return (
    <div className="page-container queens-background">
      {/* Left side ad */}
      <AdSidebar adSlot="2345678901" position="left" />
      
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
                <span className="thresher-font">The</span> Queen's Engineering Purity Test
              </h1>
              <h2 className="rice-subtitle">
                Check the boxes for engineering acts that you have done
              </h2>
            </div>
          </header>

          <EngineeringPromptsForm />
        </div>
      </div>
      
      {/* Right side ad */}
      <AdSidebar adSlot="3456789012" position="right" />
    </div>
  )
} 