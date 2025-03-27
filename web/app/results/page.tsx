"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { getFacultyAvgScore } from '@/lib/firestoreService'

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const [score, setScore] = useState<number>(0);
  const [faculty, setFaculty] = useState<string>("");
  const [avgScore, setAvgScore] = useState<number>(0);
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
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Use fallback values if Firebase fetch fails
        setAvgScore(getDefaultAvgScore(faculty.toLowerCase()));
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [searchParams]);
  
  // Fallback function for average scores if Firebase fails
  const getDefaultAvgScore = (faculty: string): number => {
    const mockAvgScores: Record<string, number> = {
      arts: 58,
      business: 45,
      engineering: 63,
      medicine: 72,
      science: 67,
      other: 52
    };
    
    return mockAvgScores[faculty] || 60;
  };
  
  // Function to get message based on score
  const getScoreMessage = (score: number) => {
    if (score >= 95) return "Nearly saint-like! Your innocence is admirable.";
    if (score >= 85) return "Very pure. You've maintained your innocence well.";
    if (score >= 70) return "Somewhat pure. You've had some experiences while keeping it mostly clean.";
    if (score >= 50) return "Middle of the road. You've lived a balanced life of experiences.";
    if (score >= 30) return "You've experienced quite a bit in your time.";
    if (score >= 15) return "Quite experienced. You've explored many aspects of life.";
    return "You've explored the vast majority of life's experiences.";
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
          
          <p className="text-sm bg-[#f8f3e6] p-3 border border-[#9e9176] rounded max-w-md mx-auto">
            The Rice Purity Test score ranges from 0 to 100, with 100 being the most pure. 
            Your score is based on the number of activities you have not experienced.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
        
        <div className="mt-8 text-center text-xs text-gray-700" id="ThresherBottomText">
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
  )
} 