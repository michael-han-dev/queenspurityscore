"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { getFacultyAvgScore, getAllFacultyStats } from '@/lib/firestoreService'
import { AdInArticle } from '@/components/ui/ads/ad-in-article'
import { AdBanner } from '@/components/ui/ads/ad-banner'
import { AdSidebar } from '@/components/ui/ads/ad-sidebar'

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const [score, setScore] = useState<number>(0);
  const [faculty, setFaculty] = useState<string>("");
  const [avgScore, setAvgScore] = useState<number>(0);
  const [allFacultyStats, setAllFacultyStats] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get parameters from URL
        const scoreParam = searchParams.get('score');
        const facultyParam = searchParams.get('faculty');
        
        if (scoreParam) {
          setScore(parseInt(scoreParam, 10));
        }
        
        if (facultyParam) {
          const formattedFaculty = facultyParam.charAt(0).toUpperCase() + facultyParam.slice(1);
          setFaculty(formattedFaculty);
          
          // Fetch actual average score from Firebase
          const avgScoreFromDB = await getFacultyAvgScore(facultyParam.toLowerCase());
          setAvgScore(avgScoreFromDB);
          
          // Fetch all faculty stats
          const allStats = await getAllFacultyStats();
          setAllFacultyStats(allStats);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Use fallback values if Firebase fetch fails
        setAvgScore(getDefaultAvgScore(faculty.toLowerCase()));
        setAllFacultyStats(getDefaultFacultyStats());
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [searchParams]);
  
  // Fallback function for average scores if Firebase fails
  const getDefaultAvgScore = (faculty: string): number => {
    const mockAvgScores: Record<string, number> = {
      asus: 58,
      business: 45,
      engineering: 63,
      other: 52
    };
    
    return mockAvgScores[faculty] || 60;
  };
  
  // Fallback function for all faculty stats if Firebase fails
  const getDefaultFacultyStats = (): Record<string, any> => {
    return {
      asus: { avgScore: 58, count: 12, displayName: "Arts and Science" },
      business: { avgScore: 45, count: 8, displayName: "Commerce" },
      engineering: { avgScore: 63, count: 15, displayName: "Engineering" },
      other: { avgScore: 52, count: 5, displayName: "Other" }
    };
  };
  
  // Get message based on score
  const getScoreMessage = (score: number): string => {
    if (score >= 90) return "Wow, you're practically an angel! Pure as the driven snow.";
    if (score >= 70) return "You're pretty innocent, but you've had some fun.";
    if (score >= 50) return "You're right in the middle - a good balance of innocence and experience.";
    if (score >= 30) return "You've lived quite an adventurous life!";
    return "You've really experienced everything life has to offer, haven't you?";
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="rice-purity-container">
          <header className="rice-header">
            <div className="title flex flex-col items-center">
              <Image 
                src="/images/purity test.png" 
                alt="Rice Purity Test Logo"
                width={360}
                height={360}
                className="mb-3"
              />
              <h1 className="rice-title">
                <span className="thresher-font">The</span> Rice Purity Test
              </h1>
            </div>
          </header>
          <div className="text-center py-8">
            <p className="text-lg">Calculating your results...</p>
            <p className="text-sm mt-2 text-gray-700">Please wait a moment</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Left side ad */}
      <AdSidebar adSlot="4567890123" position="left" />
      
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="rice-purity-container">
          <header className="rice-header">
            <div className="title flex flex-col items-center">
              <Image 
                src="/images/purity test.png" 
                alt="Rice Purity Test Logo"
                width={300}
                height={300}
                className="mb-3"
              />
              <h1 className="rice-title">
                <span className="thresher-font">The</span> Rice Purity Test
              </h1>
              <h2 className="rice-subtitle">Your Results</h2>
            </div>
          </header>

          <div className="text-center mb-10">
            <div className="score-circle mb-6">
              <span className="text-5xl sm:text-6xl font-bold text-[#86412e]">{score}</span>
            </div>
            
            <p className="text-xl font-medium mb-4 text-[#302616]">
              {getScoreMessage(score)}
            </p>
            
            <div className="text-sm text-[#302616] mb-6">
              <p>Faculty: <span className="font-medium">{faculty}</span></p>
              <p>Average score for {faculty}: <span className="font-medium">{avgScore}</span></p>
            </div>
            
            {/* Faculty Stats Comparison */}
            <div className="bg-[#f8f3e6] border border-[#d4c9a8] p-4 rounded-md mb-6">
              <h3 className="text-lg font-medium text-[#86412e] mb-2">Faculty Comparison</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {Object.keys(allFacultyStats).map(key => (
                  <div 
                    key={key} 
                    className={`p-3 border rounded-md ${key === faculty.toLowerCase() ? 'border-[#86412e] bg-[#f0e9d6]' : 'border-[#d4c9a8]'}`}
                  >
                    <p className="font-medium text-[#302616]">
                      {allFacultyStats[key].displayName}
                    </p>
                    <p className="text-sm text-[#5d5345]">
                      Average: <span className="font-semibold">{allFacultyStats[key].avgScore}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <AdInArticle adSlot="9012345678" />
            
            <p className="text-sm bg-[#f8f3e6] p-3 border border-[#9e9176] rounded max-w-md mx-auto mt-6">
              The Rice Purity Test score ranges from 0 to 100, with 100 being the most pure. 
              Your score is based on the number of activities you have not experienced.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/prompts">
              <Button className="rice-button">
                Take The Test Again
              </Button>
            </Link>
            
            <Link href="/">
              <Button className="rice-button">
                Return to Home
              </Button>
            </Link>
          </div>
          
          <AdBanner adSlot="3456789012" className="mt-8" />
          
          <div className="mt-6 text-center text-xs text-gray-700" id="ThresherBottomText">
            <p>
              Your results have been anonymously recorded for faculty comparison statistics.
              No personally identifiable information was stored.
            </p>
            <p className="mt-4">
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