"use client"

import { useState } from 'react'
import { saveFacultySuggestion } from '@/lib/firestoreService'

export function HealthSuggestionForm() {
  const [suggestion, setSuggestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) return;

    setIsSubmitting(true);
    try {
      await saveFacultySuggestion(suggestion, 'health');
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
    <div className="p-4 border border-[#d4c9a8] rounded-md bg-[#f8f3e6]">
      <h3 className="text-lg font-medium mb-2 text-center">Suggest a Health Sciences Prompt</h3>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          placeholder="Enter your health sciences prompt suggestion..."
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