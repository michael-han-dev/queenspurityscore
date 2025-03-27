"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'

// Full list of Rice Purity Test questions
const questions = [
  "Held hands romantically?",
  "Been on a date?",
  "Been in a relationship?",
  "Danced without leaving room for Jesus?",
  "Kissed a non-family member?",
  "Kissed a non-family member on the lips?",
  "French kissed?",
  "French kissed in public?",
  "Kissed on the neck?",
  "Kissed horizontally?",
  "Given or received a hickey?",
  "Kissed or been kissed on the breast?",
  "Kissed someone below the belt?",
  "Kissed for more than two hours consecutively?",
  "Played a game involving stripping?",
  "Seen or been seen by another person in a sensual context?",
  "Masturbated?",
  "Masturbated to a picture or video?",
  "Masturbated while someone else was in the room?",
  "Been caught masturbating?",
  "Masturbated with an inanimate object?",
  "Seen or read pornographic material?",
  "Massaged or been massaged sensually?",
  "Gone through the motions of intercourse while fully dressed?",
  "Undressed or been undressed by a MPS (member of the preferred sex)?",
  "Showered with a MPS?",
  "Fondled or had your butt cheeks fondled?",
  "Fondled or had your breasts fondled?",
  "Fondled or had your genitals fondled?",
  "Had or given \"blue balls\"?",
  "Had an orgasm due to someone else's manipulation?",
  "Sent a sexually explicit text or instant message?",
  "Sent or received sexually explicit photographs?",
  "Engaged in sexually explicit activity over video chat?",
  "Cheated on a significant other during a relationship?",
  "Purchased contraceptives?",
  "Gave oral sex?",
  "Received oral sex?",
  "Ingested someone else's genital secretion?",
  "Used a sex toy with a partner?",
  "Spent the night with a MPS?",
  "Been walked in on while engaging in a sexual act?",
  "Kicked a roommate out to commit a sexual act?",
  "Ingested alcohol in a non-religious context?",
  "Played a drinking game?",
  "Been drunk?",
  "Faked sobriety to parents or teachers?",
  "Had severe memory loss due to alcohol?",
  "Used tobacco?",
  "Used marijuana?",
  "Used a drug stronger than marijuana?",
  "Used methamphetamine, crack cocaine, PCP, horse tranquilizers or heroin?",
  "Been sent to the office of a principal, dean or judicial affairs representative for a disciplinary infraction?",
  "Been put on disciplinary probation or suspended?",
  "Urinated in public?",
  "Gone skinny-dipping?",
  "Gone streaking?",
  "Seen a stripper?",
  "Had the police called on you?",
  "Run from the police?",
  "Had the police question you?",
  "Had the police handcuff you?",
  "Been arrested?",
  "Been convicted of a crime?",
  "Been convicted of a felony?",
  "Committed an act of vandalism?",
  "Had sexual intercourse?",
  "Had sexual intercourse three or more times in one night?",
  "?",
  "Had sexual intercourse 10 or more times?",
  "Had sexual intercourse in four or more positions?",
  "Had sexual intercourse with a stranger or person you met within 24 hours?",
  "Had sexual intercourse in a motor vehicle?",
  "Had sexual intercourse outdoors?",
  "Had sexual intercourse in public?",
  "Had sexual intercourse in a swimming pool or hot tub?",
  "Had sexual intercourse in a bed not belonging to you or your partner?",
  "Had sexual intercourse while you or your partner's parents were in the same home?",
  "Had sexual intercourse with non-participating third party in the same room?",
  "Joined the mile high club?",
  "Participated in a \"booty call\" with a partner whom you were not in a relationship with?",
  "Traveled 100 or more miles for the primary purpose of sexual intercourse?",
  "Had sexual intercourse with a partner with a 3 or more year age difference?",
  "Had sexual intercourse with a virgin?",
  "Had sexual intercourse without a condom?",
  "Had a STI test due to reasonable suspicion?",
  "Had a STI?",
  "Had a threesome?",
  "Attended an orgy?",
  "Had two or more distinct acts of sexual intercourse with two or more people within 24 hours?",
  "Had sexual intercourse with five or more partners?",
  "Been photographed or filmed during sexual intercourse by yourself or others?",
  "Had period sex?",
  "Had anal sex?",
  "Had a pregnancy scare?",
  "Impregnated someone or been impregnated?",
  "Paid or been paid for a sexual act?",
  "Committed an act of voyeurism?",
  "Committed an act of incest?",
  "Engaged in bestiality?"
];

export function PromptsForm() {
  const router = useRouter();
  const [faculty, setFaculty] = useState<string>("");
  const [checkedPrompts, setCheckedPrompts] = useState<boolean[]>(Array(questions.length).fill(false));
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle checkbox changes
  const handleCheckboxChange = (index: number) => {
    const newCheckedPrompts = [...checkedPrompts];
    newCheckedPrompts[index] = !newCheckedPrompts[index];
    setCheckedPrompts(newCheckedPrompts);
  };

  // Handle faculty selection
  const handleFacultyChange = (value: string) => {
    setFaculty(value);
  };

  // Clear all checkboxes
  const handleClear = () => {
    setCheckedPrompts(Array(questions.length).fill(false));
  };

  // Calculate score and submit
  const handleSubmit = async () => {
    if (!faculty) {
      alert("Please select your faculty before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate score: 100 minus the percentage of checked boxes
      const checkedCount = checkedPrompts.filter(checked => checked).length;
      const score = Math.round(100 - (checkedCount / questions.length * 100));

      // In a real app, this would be submitted to the backend
      console.log({ score, faculty, checkedCount });

      // For demo purposes, navigate to results without actual submission
      router.push(`/results?score=${score}&faculty=${faculty}`);
    } catch (error) {
      console.error("Error submitting score:", error);
      alert("There was an error submitting your score. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="text-sm text-center mb-6 text-[#302616]">
        <p className="mb-2">This test consists of {questions.length} statements. Check the ones which you have done.</p>
      </div>

      {/* Prompt list with checkboxes */}
      <div className="prompt-list">
        <ol className="list-decimal pl-8 space-y-0.5">
          {questions.map((question, index) => (
            <li key={index} className="prompt-item">
              <input
                type="checkbox"
                id={`prompt-${index}`}
                className="prompt-checkbox"
                checked={checkedPrompts[index]}
                onChange={() => handleCheckboxChange(index)}
              />
              <label htmlFor={`prompt-${index}`} className="prompt-text">
                {question}
              </label>
            </li>
          ))}
        </ol>
      </div>
      
      {/* Faculty selection & buttons section */}
      <div className="border-t border-[#d4c9a8] pt-6 mt-8">
        <div className="mb-6">
          <label htmlFor="faculty-select" className="block text-sm font-medium mb-2 text-[#302616]">
            Select Your Faculty/Department
          </label>
          <Select value={faculty} onValueChange={handleFacultyChange}>
            <SelectTrigger id="faculty-select" className="w-full border-[#9e9176] bg-[#f8f3e6] text-[#302616]">
              <SelectValue placeholder="Select a faculty..." />
            </SelectTrigger>
            <SelectContent className="bg-[#f8f3e6] border-[#9e9176]">
              <SelectItem value="arts">Arts</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="medicine">Medicine</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <p className="mt-2 text-xs text-[#5d5345]">
            This helps us generate anonymous statistics by faculty
          </p>
        </div>
        
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