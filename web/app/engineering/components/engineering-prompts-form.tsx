"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { saveEngineeringScore, saveFacultySuggestion } from '@/lib/firestoreService'

// List of Engineering Purity Test questions
const engineeringQuestions = [
  "Gotten a drinking related jacket bar",
  "Slept in the ILC",
  "Transferred to an Ableson class",
  "Used CAD software for a non-academic project",
  "Coded for something outside of school or a job",
  "Gotten a DFAI",
  "Done 3 shenanigan jacket bars",
  "Done 6 shenanigan jacket bars",
  "Ever pissed on Goodes",
  "Got active with a GPA on",
  "Participated in Isengard",
  "Been a FREC or Plant",
  "Been on OTIS/Water team or FC",
  "Worked for any engineering service",
  "Visited every engineering lounge",
  "Participated in the tunnels lecture",
  "Have 500+ linkedin connections",
  "Participated or went to (Up)dating",
  "Dating or got active with another Queen's engineer",
  "Played in any Eng-related hockey/basketball game",
  "Been on 3+ engineering-related clubs",
  "Purpled yourself as a frosh",
  "Got active in the ILC",
  "Gone 3 days without showering",
  "Taken a photo with the Dean",
  "Done the Ritual bar",
  "Gone to homecoming ritual",
  "Engineer and a Varsity athlete",
  "Travelled outside of Canada for any engineering related activity",
  "Done a midterm using ChatGPT",
  "Taken a Commerce course",
  "Have more than 3 bars on your jacket",
  "Golden jacket still",
  "Failed the English proficiency test",
  "Done J section",
  "Have a GPA higher than 4.0/4.3",
  "Wrote a final worth over 65% of your grade",
  "Been a part of the Grease Pole climb",
  "Been to the Grease Pole two or more times",
  "Accidentally deleted important work and had no backup",
  "Corrected a professor during a lecture",
  "Had 2 or more energy drinks in a day",
  "Can still do integration by parts off the dome",
  "Soldered before",
  "Built a circuit",
  "Used an Arduino/Raspberry Pi",
  "Written more than 500 lines of code in a day",
  "Used Linux before",
  "Use macOS",
  "Forgot a calculator for an exam",
  "Competed in the Queen's Engineering Competition",
  "Got top 3 in the Queen's Engineering Competition",
  "Written the EDII section for an engineering report",
  "Booked an ILC room and never went more than 3 times",
  "Ordered from the tea room more than 10 times",
  "Have used MATLAB",
  "Got an injury building something for a design team or school",
  "Had to redo a lab because of your data",
  "Write your notes using pen and paper still",
  "Slept through or missed a final/midterm",
  "Live with at least 2 other engineers",
  "Pay for an AI tool",
  "Been to stauffer at 8am to study",
  "Wrote an assignment or your notes in LaTeX",
  "Cried over an assignment/test/final",
  "Went out/partied before the night of any test/midterm/final worth more than 15% of your grade",
  "Going into a career related to your discipline after graduation",
  "Refer to Queen's Engineering as Smith Engineering",
  "Demo didn't work during a presentation",
  "Finished a midterm or final in under half the given time",
  "Had more than 2 overdue assignments at one point",
  "Deferred a required class",
  "Never attended a professor's office hours during a semester",
  "Done a case competition",
  "Saw one of your TAs in a party setting",
  "Been a TA",
  "Got active, wheeled, or kissed someone in the same discipline",
  "Done a hackathon",
  "Done the engineering dance outside of school/ritual setting or for fun",
  "Negotiated a grade change with a professor/TA",
  "Bought your year or discipline merch",
  "Submitted an assignment within the last hour it was due",
  "Worn your engineering jacket on any other campus or outside of Kingston",
  "Taken Vyvanse or Adderall",
  "Missed fewer than 3 lectures total in a semester",
  "Done any engineering initiative to help the broader community",
  "Spent more than 12 hours straight in any library",
  "Hosted a party for your discipline",
  "Have a friend in every discipline",
  "Participated in a euchre tournament",
  "Been a co-chair of any engineering-related club or director of EngSoc",
  "Broke your laptop",
  "Actively engage with more than 3 members of your frosh group still",
  "Faked an academic consideration",
  "Remember every professor you've ever had",
  "Spent money on a physical textbook after 1st year",
  "Remember your APSC 101 group members",
  "Skipped an entire week of school for vacation",
  "Did not study (0 minutes) for a test",
  "Submitted a meme to your year Instagram meme page"
];

function EngineeringSuggestionForm() {
  const [suggestion, setSuggestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) return;

    setIsSubmitting(true);
    try {
      await saveFacultySuggestion(suggestion, 'engineering');
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
      <h3 className="text-lg font-medium mb-2 text-center">Suggest a New Engineering Question</h3>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          placeholder="Enter your engineering prompt suggestion..."
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

export function EngineeringPromptsForm() {
  const router = useRouter();
  const [checkedPrompts, setCheckedPrompts] = useState<boolean[]>(Array(engineeringQuestions.length).fill(false));
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle checkbox changes
  const handleCheckboxChange = (index: number) => {
    const newCheckedPrompts = [...checkedPrompts];
    newCheckedPrompts[index] = !newCheckedPrompts[index];
    setCheckedPrompts(newCheckedPrompts);
  };

  // Clear all checkboxes
  const handleClear = () => {
    setCheckedPrompts(Array(engineeringQuestions.length).fill(false));
  };

  // Calculate score and submit
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Calculate score: 100 minus the percentage of checked boxes
      const checkedCount = checkedPrompts.filter(checked => checked).length;
      const score = Math.round(100 - (checkedCount / engineeringQuestions.length * 100));
      
      console.log('Submitting engineering score:', score);

      // Save score to Firebase
      const result = await saveEngineeringScore(score);
      
      console.log('Engineering score saved successfully, ID:', result);

      // Navigate to results
      router.push(`/engineering/results?score=${score}`);
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
      {/*<header className="queens-header">
        <h1 className="queens-title">
          <span>The Official</span> Queen's Engineering Purity Test
        </h1>
      </header>*/}


      <p className="queens-caution">
        Caution: This is not a bucket list. You are a true engineering student if you complete all the items on this list.
      </p>

      <p className="queens-instruction">
        Your engineering purity score will be calculated at the end.
      </p>

      <div className="prompt-items">
        {engineeringQuestions.map((prompt, index) => {
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
      
      <div className="text-center mt-8 text-sm text-[#5d5345]">
        <p>
          <Link href="/" className="text-[#86412e] hover:underline">
            Return to Home
          </Link>
        </p>
      </div>

      <EngineeringSuggestionForm />
    </div>
  );
} 