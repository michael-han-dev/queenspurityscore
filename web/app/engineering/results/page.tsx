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
        // Get score parameter from URL
        const scoreParam = searchParams.get('score');
        
        if (scoreParam) {
          setScore(parseInt(scoreParam, 10));
        }
        
        // Fetch actual average score from Firebase
        const avgScoreFromDB = await getEngineeringAvgScore();
        setAvgScore(avgScoreFromDB);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Use fallback value if Firebase fetch fails
        setAvgScore(65);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [searchParams]);

  // Get message based on score
  const getMessage = (score: number) => {
    if (score >= 90) return "Wow, you're practically a mechanical pencil! Almost untouched by engineering culture.";
    if (score >= 70) return "You're like a slightly used textbook - mostly clean with a few highlighted pages.";
    if (score >= 50) return "You're a proper engineer with a healthy balance of theory and practical experience.";
    if (score >= 30) return "Your keyboard has many worn-out keys. You've seen the depths of engineering culture.";
    return "You are the engineering equivalent of a battle-hardened server that hasn't been rebooted in years!";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="rice-purity-container">
        <header className="rice-header">
          <div className="flex flex-col items-center">
            <Image 
              src="/images/purity test.png" 
              alt="Rice Purity Test Logo"
              width={200}
              height={200}
              className="mb-3"
            />
            <h1 className="rice-title">
              <span className="thresher-font">Your</span> Engineering Purity Score
            </h1>
          </div>
        </header>

        {loading ? (
          <div className="text-center py-10">
            <p className="text-[#302616]">Calculating your engineering prowess...</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="score-circle mb-6">
                <div>
                  <span className="block text-4xl sm:text-6xl font-bold text-[#302616]">{score}</span>
                  <span className="text-sm text-[#5d5345]">out of 100</span>
                </div>
              </div>
              
              <p className="text-lg text-[#302616] mb-4 italic">
                {getMessage(score)}
              </p>
              
              <div className="bg-[#f8f3e6] border border-[#d4c9a8] p-4 rounded-md mb-6">
                <p className="text-sm text-[#5d5345]">
                  The average Engineering Purity Score is <span className="font-semibold">{avgScore}</span>
                </p>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <Link href="/engineering">
                <Button className="rice-button">
                  Take the Test Again
                </Button>
              </Link>
              
              <div>
                <Link href="/" className="block mt-4 text-sm text-[#86412e] hover:underline">
                  Return to Home Page
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 