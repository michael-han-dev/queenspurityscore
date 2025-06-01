import Link from 'next/link'

export default function UpdatesPage() {
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
              <h1 className="rice-title">
                <span className="thresher-font">Site</span> Updates
              </h1>
              <h2 className="rice-subtitle">Latest changes and improvements</h2>
            </div>
          </header>

          <div className="mt-8 max-w-4xl mx-auto">
            <div className="bg-[#f8f3e6] border border-[#9e9176] rounded-md p-6 mb-6">
              <h3 className="text-lg font-medium text-[#86412e] mb-2">March 29, 2025</h3>
              <ul className="list-disc list-inside text-[#5d5345] space-y-1">
                <li>Added Queen's Commerce-specific purity test</li>
                <li>Updated homepage with Commerce test option</li>
                <li>Improved mobile responsiveness across all tests</li>
                <li>Enhanced analytics for better faculty comparison</li>
              </ul>
            </div>

            <div className="bg-[#f8f3e6] border border-[#9e9176] rounded-md p-6 mb-6">
              <h3 className="text-lg font-medium text-[#86412e] mb-2">March 15, 2025</h3>
              <ul className="list-disc list-inside text-[#5d5345] space-y-1">
                <li>Launched Engineering-specific purity test</li>
                <li>Added separate results tracking for Engineering students</li>
                <li>Improved question relevance for technical students</li>
              </ul>
            </div>

            <div className="bg-[#f8f3e6] border border-[#9e9176] rounded-md p-6 mb-6">
              <h3 className="text-lg font-medium text-[#86412e] mb-2">March 1, 2025</h3>
              <ul className="list-disc list-inside text-[#5d5345] space-y-1">
                <li>Initial launch of Queen's University Purity Test</li>
                <li>Faculty selection and comparison features</li>
                <li>Anonymous analytics and score tracking</li>
                <li>Mobile-optimized design</li>
              </ul>
            </div>

            <div className="bg-[#f0e9d6] border border-[#9e9176] rounded-md p-4 mb-6">
              <h4 className="text-md font-medium text-[#86412e] mb-2">Coming Soon</h4>
              <ul className="list-disc list-inside text-[#5d5345] text-sm space-y-1">
                <li>Health Sciences-specific test</li>
                <li>Nursing-specific test</li>
                <li>Enhanced social sharing features</li>
                <li>More detailed analytics and comparisons</li>
              </ul>
            </div>

            <div className="text-center">
              <p className="text-sm text-[#5d5345] mb-4">
                Have suggestions for improvements or new features?
              </p>
              <p className="text-xs text-[#86412e]">
                We're always looking to improve the Queen's Purity Test experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 