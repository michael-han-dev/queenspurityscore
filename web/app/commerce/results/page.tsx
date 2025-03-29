"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { AdSidebar } from '@/components/ui/ads/ad-sidebar'
import { getCommerceStats } from '@/lib/firestoreService'

interface CommerceStats {
  averageScore: number;
  responseCount: number;
}

export default function CommerceResultsPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [commerceStats, setCommerceStats] = useState<CommerceStats | null>(null);
  const [error, setError] = useState('');
  
  // Get the score from URL parameters
  const score = searchParams.get('score') ? parseInt(searchParams.get('score') as string) : null;
  const totalQuestions = searchParams.get('total') ? parseInt(searchParams.get('total') as string) : 100;

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch commerce stats from Firebase
        const stats = await getCommerceStats();
        setCommerceStats({
          averageScore: stats.average,
          responseCount: stats.count
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load statistics. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  // Function to get interpretation message based on score
  const getScoreInterpretation = (score: number): string => {
    if (score >= 90) return "You're a Commerce student in name only. Have you even been to Goodes Hall?";
    if (score >= 70) return "You've done the bare minimum to identify as a Commerce student.";
    if (score >= 50) return "You're a textbook Commerce student, complete with the networking and Excel skills.";
    if (score >= 30) return "Your LinkedIn is probably impeccable. Coffee chats are your love language.";
    return "You embody the Commerce stereotype. Your parents are probably very proud, or concerned.";
  };

  // Calculate percentage and comparison message
  const calculateComparison = (): string => {
    if (!score || !commerceStats?.averageScore) return "";
    
    const diff = score - commerceStats.averageScore;
    if (Math.abs(diff) < 5) return "Your score is about average for Commerce students.";
    if (diff > 0) return `You scored ${diff.toFixed(1)} points higher than the average Commerce student.`;
    return `You scored ${Math.abs(diff).toFixed(1)} points lower than the average Commerce student.`;
  };

  return (
    <div className="page-container">
      {/* Left side ad */}
      <AdSidebar adSlot="5678901234" position="left" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="rice-purity-container">
          <header className="rice-header">
            <div className="flex flex-col items-center">
              <Image 
                src="/images/purity-test.png" 
                alt="Rice Purity Test Logo"
                width={200}
                height={200}
                className="mb-3"
              />
              <h1 className="rice-title">
                <span className="thresher-font">Your</span> Commerce Purity Score
              </h1>
            </div>
          </header>

          {loading ? (
            <div className="text-center py-10">
              <p className="text-[#302616]">Calculating your business acumen...</p>
            </div>
          ) : 
          (
            <>
              {score !== null ? (
                <div className="score-display flex flex-col items-center mt-8">
                  <div className="score-circle bg-[#f0e9d6] border-4 border-[#9e9176] rounded-full w-40 h-40 flex items-center justify-center mb-6">
                    <span className="text-4xl font-bold text-[#86412e]">{score}</span>
                  </div>
                  
                  <p className="text-xl text-center mb-4">
                    {getScoreInterpretation(score)}
                  </p>
                  
                  <div className="stats bg-[#f8f3e6] border border-[#d4c9a8] p-4 rounded-md w-full max-w-md mb-8">
                    <h3 className="text-center text-lg font-medium mb-2">Commerce Statistics</h3>
                    
                    {commerceStats ? (
                      <>
                        <div className="stat-row flex justify-between py-1 border-b border-[#e5dcc3]">
                          <span>Average Score:</span>
                          <span className="font-medium">{commerceStats.averageScore.toFixed(1)}</span>
                        </div>
                        
                        <p className="text-center mt-4 text-sm italic">
                          {calculateComparison()}
                        </p>
                      </>
                    ) : (
                      <p className="text-center text-sm italic">Stats temporarily unavailable</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="error-message text-center py-10">
                  <p className="text-red-600">No score was provided. Please take the test first.</p>
                  <Link href="/commerce" className="block mt-4 text-[#86412e] hover:underline">
                    Take Commerce Purity Test
                  </Link>
                </div>
              )}
              
              <div className="text-center space-y-4">
                <Link href="/commerce">
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
      
      {/* Right side ad */}
      <AdSidebar adSlot="8901234567" position="right" />
    </div>
  );
}
