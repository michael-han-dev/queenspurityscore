"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { saveEngineeringScore } from '@/lib/firestoreService'

// List of Engineering Purity Test questions
const engineeringQuestions = [
  "Used CAD software for a non-academic project?",
  "Pulled an all-nighter to finish a project?",
  "Created something that actually worked on the first try?",
  "Had a professor who couldn't explain their own material?",
  "Drank more than 4 energy drinks in one day?",
  "Skipped lectures and still passed the exam?",
  "Written code that you don't understand but works?",
  "Debugged code for more than 3 hours straight?",
  "Blamed the compiler for your own mistake?",
  "Used Stack Overflow without understanding the solution?",
  "Reused code from a previous assignment?",
  "Accidentally deleted important work and had no backup?",
  "Explained technical concepts to non-technical people?",
  "Found a critical error minutes before a deadline?",
  "Used duct tape as an engineering solution?",
  "Overengineered a simple problem?",
  "Corrected a professor during a lecture?",
  "Made a project more complex than needed to show off?",
  "Used Excel when a proper database was needed?",
  "Broke expensive equipment while experimenting?",
  "Wore a calculator watch unironically?",
  "Created a 'temporary' solution that became permanent?",
  "Used Comic Sans in a technical presentation?",
  "Over-caffeinated to meet a deadline?",
  "Used technical jargon to impress someone?",
  "Hotfixed a production issue without testing?",
  "Said 'it works on my machine' to dismiss a bug?",
  "Built a robot or automated system for a mundane task?",
  "Written documentation that no one reads?",
  "Spent more on components/equipment than you initially budgeted?",
  "Created something that violated safety standards?",
  "Had a project idea rejected for being too ambitious?",
  "Used technical skills to solve a non-technical problem?",
  "Fixed a bug without understanding why the fix works?",
  "Used regex and actually got it right the first time?",
  "Abandoned a side project after losing interest?",
  "Memorized mathematical constants beyond π?",
  "Participated in a hackathon?",
  "Submitted work with // TODO comments still in it?",
  "Skipped the user manual and learned through trial and error?",
  "Corrected someone's technical terminology at a social event?",
  "Used a soldering iron after midnight?",
  "Spent more than $100 on a keyboard?",
  "Owned more than 3 different calculators simultaneously?",
  "Turned a hobby into a technical challenge?",
  "Deployed code to production on a Friday afternoon?",
  "Named a variable using an inside joke?",
  "Been the 'tech support' person for family and friends?",
  "Invented your own algorithm to solve a problem?",
  "Made an engineering decision based on aesthetics rather than functionality?",
  "Answered technical questions on forums?",
  "Built your own computer?",
  "Disassembled a device without being able to reassemble it?",
  "Used a breadboard for a non-academic project?",
  "Written more than 1000 lines of code in a day?",
  "Learned a new programming language for fun?",
  "Forked an open-source project?",
  "Contributed to an open-source project?",
  "Optimized code that was already fast enough?",
  "Used Linux as your primary OS?",
  "Configured a web server from scratch?",
  "Calculated something with pen and paper that could have been done with a calculator?",
  "Created a backup system after losing important data?",
  "Spent hours customizing your development environment?",
  "Applied an engineering solution to a household problem?",
  "Used version control for a personal project?",
  "Recreated an existing product just to see if you could?",
  "Competed in a technical competition?",
  "Created a portfolio website?",
  "Used an oscilloscope outside of required lab work?",
  "Voluntarily attended a technical conference?",
  "Overclocked your computer?",
  "Created a PCB design?",
  "Built a mechanical keyboard from scratch?",
  "Written pseudocode on a napkin?",
  "Automated a repetitive task you only needed to do once?",
  "Set up a home server?",
  "Built a network infrastructure for your home?",
  "Created a system that only you know how to maintain?",
  "Used a Raspberry Pi or Arduino for a project?",
  "Applied a design pattern unnecessarily?",
  "Ordered electronic components from overseas?",
  "Started a technical blog or YouTube channel?",
  "Designed your own logo or UI?",
  "Created a dependency that became a single point of failure?",
  "Fixed something using percussive maintenance (hitting it)?",
  "Used emoji in a variable name?",
  "Had strong opinions about spaces vs tabs?",
  "Switched to a new technology just because it was trending?",
  "Added excessive comments to your code?",
  "Intentionally added an Easter egg to your code?",
  "Created something that violates best practices but works well?",
  "Used an outdated technology because you were comfortable with it?",
  "Built something that no one else understood how to use?",
  "Became distracted optimizing a minor detail of a project?",
  "Spent more on tools than on the project itself?",
  "Refused to use software because of its user interface?",
  "Implemented a solution from a dream or while half-asleep?",
  "Created a complex workflow that could have been simpler?",
  "Chose technology based on what would look good on your resume?"
];

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
    <>
      <div className="text-sm text-center mb-6 text-[#302616]">
        <p className="mb-2">This test consists of {engineeringQuestions.length} engineering-specific statements.</p>
      </div>

      {/* Prompt list with checkboxes */}
      <div className="prompt-list">
        <ol className="list-decimal pl-8 space-y-0.5">
          {engineeringQuestions.map((question, index) => (
            <li key={index} className="prompt-item">
              <input
                type="checkbox"
                id={`prompt-${index}`}
                className="prompt-checkbox"
                checked={checkedPrompts[index]}
                onChange={() => handleCheckboxChange(index)}
              />
              <label htmlFor={`prompt-${index}`} className="prompt-text">
                <span className="font-medium mr-1">{index + 1}.</span> {question}
              </label>
            </li>
          ))}
        </ol>
      </div>
      
      {/* Buttons section */}
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
    </>
  );
} 