"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { getEngineeringAvgScore } from '@/lib/firestoreService'

export default function EngineeringResultsPage() {
  const searchParams = useSearchParams();
  const [score, setScore] = useState<number>(0);
  const [avgScore, setAvgScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scoreParam = searchParams.get('score');
        
        if (scoreParam) {
          setScore(parseInt(scoreParam, 10));
        }
        
        const avgScoreFromDB = await getEngineeringAvgScore();
        setAvgScore(avgScoreFromDB);
      } catch (error) {
        console.error("Error fetching data:", error);
        setAvgScore(63); // Default engineering average
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [searchParams]);
  
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
                src="/images/purity-test.png" 
                alt="Rice Purity Test Logo"
                width={360}
                height={360}
                className="mb-3"
              />
              <h1 className="rice-title">
                <span className="thresher-font">The</span> Engineering Purity Test
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
      <div className="container mx-auto px-4 py-8 sm:py-12">
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
                <span className="thresher-font">The</span> Engineering Purity Test
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
              <p>Faculty: <span className="font-medium">Engineering</span></p>
              <p>Average score for Engineering: <span className="font-medium">{avgScore}</span></p>
            </div>
            
            <p className="text-sm bg-[#f8f3e6] p-3 border border-[#9e9176] rounded max-w-md mx-auto mt-6">
              The Engineering Purity Test score ranges from 0 to 100, with 100 being the most pure. 
              Your score is based on the number of activities you have not experienced.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/engineering/prompts">
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
          
          <div className="mt-6 text-center text-xs text-gray-700" id="ThresherBottomText">
            <p>
              Your results have been anonymously recorded for faculty comparison statistics.
              No personally identifiable information was stored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 