"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'
import { saveScore, saveSuggestion } from '@/lib/firestoreService'

// Full list of Rice Purity Test questions
const questions = [
  "Been on academic probation",
  "Failed a class",
  "Got a point from the dons in first year",
  "Skipped every lecture besides the first one in a semester for a class",
  "Pulled the fire alarm",
  "Grabbed a free item from the sidewalk sale",
  "Got fined during St. Patty's or HOCO",
  "Know what the Queen's mascot looks like",
  "Blacked out at the club",
  "Heckled a frosh during opening weekend",
  "Snuck alcohol into the dorms",
  "Played a drinking game",
  "Got drunk at a Queen's event (e.g., football game)",
  "Done a keg stand",
  "Got active in any library",
  "Got active in a dorm room",
  "Got active with someone with roommate in the room",
  "Kicked a roommate or got kicked by a roommate to get active",
  "Walked in on a roommate getting active",
  "Got active with a frosh as an upper year",
  "Got active with an orientation lead",
  "Got active with an upper year as a frosh",
  "Fling with a professor or TA",
  "Got active with multiple people in one night",
  "Kissed someone at a Queen's street party",
  "Done a walk of shame across Queen's campus",
  "Streaked on campus",
  "Went home with someone you met at a party or club",
  "Befriended an exchange student",
  "Tried a new drug for the first time",
  "Had less than $100 in your bank account",
  "Drunk make-out with the pigeon statue on Princess Street",
  "Been kicked out of a club",
  "Failed an exam",
  "Showed up hungover to class",
  "Got active with someone from 3 or more different faculties",
  "Drunkenly ate a Bubba's poutine at 3 a.m",
  "Stolen 3 different dining hall items",
  "Dropped a dish in the dining hall",
  "Stolen a big item from residence",
  "Pushed a blue light without actually needing it",
  "Got locked out of residence or your house",
  "Got campus security/police called on you",
  "Wrote an exam left handed",
  "Hooked up with a varsity athlete",
  "Hugged the lady in the ARC",
  "Stayed 24 hours in a non-residence building without leaving",
  "Missed a midterm",
  "Missed a final",
  "Gotten below 20% on a test",
  "Drank your height in beer",
  "Been to 5+ varsity games",
  "Hosted a house party",
  "Done anything sexual on campus (not including residence)",
  "Been on 3+ clubs/conference teams",
  "Spent a night in COR",
  "Jumped in the pier",
  "Done a polar ice dip in the pier",
  "Been with a guy shorter than 5'6, or a girl taller than 6'0",
  "Pissed outside another person's house",
  "Lived north of Princess Street (NOPS)",
  "Gotten a botched haircut in Kingston",
  "Got active in Vic",
  "Threw up anywhere but the bathroom",
  "Been an intramural champion",
  "Borrowed a book from the library",
  "Kept an unused condom in your wallet for more than 1 month",
  "Broke something in res (wall/door/etc)",
  "Waited in line for longer than 1 hour at any bar/club",
  "Been to Queen's for Canada Day weekend",
  "Transferred programs",
  "Been to Sakura or Mandarin 2+ times",
  "Bought contraceptives from the pharmacy on campus",
  "Spent more than $250 on Uber Eats in a semester",
  "Spent more than $500 on booze in a semester",
  "Spent $400+ at Costco in one trip",
  "Stolen someone's jacket from a bar/club",
  "Been drunk 3 nights in a row",
  "Been clubbing more than 15 times in 1 semester",
  "Gotten food poisoning from a dining hall or on-campus location",
  "Made a banner or sign for hoco",
  "Had more than 2 partners in a school year",
  "Been on 2 or more intramural teams",
  "Lost your student card",
  "Got above an 85 without showing up to class",
  "Done a bar crawl",
  "Took a shower in residence without flip flops",
  "Posted on r/queensuniversity",
  "Chose Queen's as a backup option",
  "Used a dating app",
  "Spent your summer in Kingston",
  "Cheated/Been cheated on",
  "Witnessed or participated in the ginger run on St. Pat's",
  "Had an academic consideration denied",
  "Been on a date in Kingston",
  "Attended the class of another major",
  "Watched the solar eclipse from Kingston",
  "Skipped class for the pier",
  "Ordered from the Mitchell Starbucks more than 20 times",
  "Body count 5 or more"
];

function SuggestionForm() {
  const [suggestion, setSuggestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) return;

    setIsSubmitting(true);
    try {
      await saveSuggestion(suggestion, 'regular');
      setMessage('Thanks for your suggestion!');
      setSuggestion('');
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error submitting suggestion:', error);
      setMessage('Failed to submit suggestion. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 p-4 border border-[#d4c9a8] rounded-md bg-[#f8f3e6]">
      <h3 className="text-lg font-medium mb-2 text-center">Suggest new prompts and prompts to remove</h3>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          placeholder="Enter your prompt suggestion..."
          className="w-full p-2 border border-[#d4c9a8] rounded"
          disabled={isSubmitting}
        />
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting || !suggestion.trim()}
            className="bg-[#86412e] text-white px-4 py-2 rounded hover:bg-[#6a3425] disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Suggestion'}
          </button>
        </div>
        {message && (
          <p className={`text-center text-sm ${message.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export function PromptsForm() {
  const router = useRouter();
  const [faculty, setFaculty] = useState<string>("");
  const [checkedPrompts, setCheckedPrompts] = useState<boolean[]>(Array(questions.length).fill(false));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  // Handle checkbox changes
  const handleCheckboxChange = (index: number) => {
    const newCheckedPrompts = [...checkedPrompts];
    newCheckedPrompts[index] = !newCheckedPrompts[index];
    setCheckedPrompts(newCheckedPrompts);
  };

  // Handle faculty selection
  const handleFacultyChange = (value: string) => {
    setFaculty(value);
    setError("");
  };

  // Clear all checkboxes
  const handleClear = () => {
    setCheckedPrompts(Array(questions.length).fill(false));
  };

  // Calculate score and submit
  const handleSubmit = async () => {
    if (!faculty) {
      setError("Don't be shy... please select your faculty before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate score: 100 minus the percentage of checked boxes
      const checkedCount = checkedPrompts.filter(checked => checked).length;
      const score = Math.round(100 - (checkedCount / questions.length * 100));
      
      console.log('Submitting score:', score, 'for faculty:', faculty);

      // Save score to Firebase
      const result = await saveScore({ 
        score, 
        faculty 
      });
      
      console.log('Score saved successfully, ID:', result);

      // Navigate to results
      router.push(`/results?score=${score}&faculty=${faculty}`);
    } catch (error) {
      // More detailed error information
      console.error("Error submitting score:", error);
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      alert("There was an error submitting your score. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="queens-purity-container">

      <p className="queens-caution">
        Caution: This is not a bucket list. You are beyond cooked if you complete all the items on this list.
      </p>

      <p className="queens-instruction">
        Your purity score will be calculated at the end.
      </p>

      <div className="prompt-items">
        {questions.map((question, index) => {
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
                <span className="prompt-text">{question}</span>
              </label>
            </div>
          );
        })}
      </div>
      
      {/* Faculty selection */}
      <div className="border-t border-[#d4c9a8] pt-6 mt-8">
        <div className="mb-6">
          <label className="block text-center mb-2">Please select your faculty:</label>
          <Select value={faculty} onValueChange={handleFacultyChange}>
            <SelectTrigger className="w-full max-w-xs mx-auto">
              <SelectValue placeholder="Select your faculty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="artsci">Arts & Science</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="commerce">Commerce</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {error && (
          <div className="bg-red-100 text-red-800 p-3 mb-4 rounded text-center">
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
          <Button 
            className="queens-submit-button sm:order-1" 
            onClick={handleClear}
            disabled={isSubmitting}
          >
            Clear All Checkboxes
          </Button>
          <Button 
            className="queens-submit-button sm:order-2" 
            onClick={handleSubmit}
            disabled={isSubmitting || !faculty}
          >
            {isSubmitting ? "Calculating..." : "Calculate My Score"}
          </Button>
        </div>
      </div>
      
      <div className="text-center mt-8 text-sm">
        <p>
          <Link href="/" className="text-[#B90E31] hover:underline">
            Return to Home
          </Link>
        </p>
      </div>

      <SuggestionForm />
    </div>
  );
} 