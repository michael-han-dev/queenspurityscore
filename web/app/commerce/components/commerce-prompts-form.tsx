'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { saveCommerceScore } from '@/lib/firestoreService'

// List of Commerce Purity Test questions
const commerceQuestions = [
  "Made a slide deck outside of school or work to convince someone of something",
  "Described yourself as a 'go-getter' or 'self-starter' in a non-ironic way",
  "Pitched a business idea at a party",
  "Mentioned MECE in a casual conversation",
  "Coffee chatted someone because they're attractive",
  "Had more than 10 dollar beers in one sitting",
  "Spelled Goldman Sachs wrong",
  "ChatGPT'd an entire course",
  "Bought a hot tub for your house",
  "Shit in Goodes Hall bathroom",
  "Yacked on the floor at a social or initiation",
  "Used ChatGPT for your initiation",
  "More than 3 coffee chats in a day",
  "Did a presentation hungover",
  "3 or more interviews in a day",
  "Played for the Commerce basketball/hockey team",
  "Taken someone home from DBs",
  "Can calculate the slope of a line off the dome",
  "Gotten active in a breakout room",
  "Cheated on a proctored exam",
  "Attended a board meeting party",
  "Skipped COMM101",
  "Used the word 'Look' to start a presentation",
  "Wore a suit to a non-formal event just because",
  "Referred to someone as a 'connection' rather than a friend",
  "Scroll LinkedIn instead of TikTok or Instagram",
  "Calculated the ROI of a personal purchase",
  "Asked 'But what's the business model?' when someone shared an idea",
  "Added someone on LinkedIn immediately after meeting them",
  "Brought business cards to a casual event",
  "Created a personal budget spreadsheet with multiple tabs and formulas",
  "Sent a cal invite for a friendly hangout",
  "Avoided telling people you're in commerce",
  "Did a coffee chat on a run",
  "Used the phrase 'circle back' or 'touch base' unironically",
  "Conducted a SWOT analysis on a personal decision",
  "Added a project to your LinkedIn that lasted less than a month",
  "Invested in cryptocurrency",
  "Gambled in class",
  "In a fantasy league",
  "Bet on March Madness",
  "Won a case competition",
  "Done a stock pitch competition",
  "Had multiple Goodes branded items",
  "Bought a commerce jacket",
  "Described something as 'scalable' that didn't need to be",
  "Want to do a career in something not commerce related",
  "Memorized stock prices for casual conversation topics",
  "Own 5 or more quarter zips",
  "Have a multi-monitor setup",
  "Used the term 'leveraging my strengths' in everyday conversation",
  "Took detailed notes at a social gathering",
  "Tracked your friends' birthdays in a CRM-like system",
  "Cold emailed a CEO or executive just to 'get advice'",
  "Started a side hustle that only your friends and family supported",
  "Made a spreadsheet to decide which party to attend",
  "Counted networking events as 'going out'",
  "Organized your closet by business casual and business formal",
  "Talked about the market while at the bar",
  "Dressed up for an online class when no one had cameras on",
  "Practiced your elevator pitch in an actual elevator",
  "Referred to sleeping as 'offline hours'",
  "Categorized expenses by 'networking', 'personal development', and 'necessities'",
  "Described your morning routine as 'optimized for productivity'",
  "Decorated your room with startup motivational quotes",
  "Went to a coffee shop just to be seen working",
  "Used terms like 'pivot', 'disrupt', or 'synergy' in everyday conversation",
  "Wore a company branded item from a place you worked at as casual clothing",
  "Declined social invitations because they weren't 'value-adding'",
  "Used acronyms like 'EOD', 'COB', or 'WRT' in casual conversations",
  "Judged a business solely on its logo design",
  "Ended phone calls with 'talk soon' even if you had no plans to talk again",
  "Conducted a 'post-mortem' on a failed relationship",
  "Rehearsed casual conversations before having them",
  "Replied 'let me get back to you' when asked a simple question",
  "Used a CRM system to track job applications",
  "Dressed formally for a video interview from the waist up only",
  "Made a weekly spreadsheet of classes/events in first year instead of using a calendar",
  "Called yourself an entrepreneur without having a profitable business",
  "Researched the stock performance of a company before an interview",
  "Created elaborate email signature for your student email",
  "Listened to business podcasts during your workout",
  "Referred to mundane tasks as 'deliverables'",
  "Used a template for casual emails",
  "Had a 'professional' LinkedIn photo taken as a first year",
  "Used a weighted decision matrix for choosing courses",
  "Tracked your 'time spent' with a friend group",
  "Defined 'action items' after a hangout with friends",
  "Talked about 'disrupting' an industry you have no experience in",
  "Added 'proficient in Microsoft Office' to your resume",
  "Religiously study in Goodes",
  "Referred to partying as 'networking'",
  "Used a Gantt chart for a non-business project",
  "On or interviewed for ComSoc exec",
  "Went to networking events just for food",
  "Paid for COMMAdvantage",
  "Failed an exam after using COMMAdvantage",
  "Rejected by every club you applied for",
  "Started your own club because you got rejected by your dream club",
  "Resold tickets at a profit for a charity game"
];


export function CommercePromptsForm() {
  const router = useRouter();
  const [checkedPrompts, setCheckedPrompts] = useState<boolean[]>(Array(commerceQuestions.length).fill(false));
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle checkbox changes
  const handleCheckboxChange = (index: number) => {
    const newCheckedPrompts = [...checkedPrompts];
    newCheckedPrompts[index] = !newCheckedPrompts[index];
    setCheckedPrompts(newCheckedPrompts);
  };

  // Clear all checkboxes
  const handleClear = () => {
    setCheckedPrompts(Array(commerceQuestions.length).fill(false));
  };

  // Calculate score and submit
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Calculate score: 100 minus the percentage of checked boxes
      const checkedCount = checkedPrompts.filter(checked => checked).length;
      const score = Math.round(100 - (checkedCount / commerceQuestions.length * 100));
      
      console.log('Submitting commerce score:', score);
      
      // Save score to Firebase
      const result = await saveCommerceScore(score);
      
      console.log('Commerce score saved successfully, ID:', result);
      
      // Navigate to results
      router.push(`/commerce/results?score=${score}`);
    } catch (error) {
      console.error("Error submitting score:", error);
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      alert("There was an error submitting your score. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add this test function
  const handleSubmitTest = () => {
    const checkedCount = checkedPrompts.filter(checked => checked).length;
    const score = Math.round(100 - (checkedCount / commerceQuestions.length * 100));
    console.log('Test score:', score);
    router.push(`/commerce/results?score=${score}`);
  };

  return (
    <>
      <p className="queens-caution">
        Caution: This is not a bucket list. You are a true commerce student if you complete all the items on this list.
      </p>

      <p className="queens-instruction">
        Your commerce purity score will be calculated at the end.
      </p>

      <div className="prompt-items">
        {commerceQuestions.map((prompt, index) => {
          const questionNumber = index + 1;
          
          return (
            <div key={index} className="prompt-item">
              <label>
                <span className="prompt-number">{questionNumber}.</span>
                <input
                  type="checkbox"
                  checked={checkedPrompts[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
                <span className="prompt-text">{prompt}</span>
              </label>
            </div>
          );
        })}
      </div>
      
      <div className="border-t border-[#d4c9a8] pt-6 mt-8">
        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between buttons">
          <Button 
            className="rice-button sm:order-1" 
            onClick={handleClear}
            disabled={isSubmitting}
          >
            Clear All Checkboxes
          </Button>
          <Button 
            className="rice-button sm:order-2" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Calculating..." : "Calculate My Score"}
          </Button>
        </div>
      </div>

      
      <div className="mt-8 text-center">
        <Link href="/" className="text-[#86412e] hover:underline">
          Return to Home
        </Link>
      </div>
    </>
  );
}