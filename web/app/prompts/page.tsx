import { Button } from '@/components/ui/button'

export default function PromptsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Rice Purity Test</h1>
          <p className="text-gray-600">
            Check the boxes for items that apply to you, then select your faculty and calculate your score.
          </p>
        </div>

        {/* Placeholder for 100 prompts component */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-4">Prompts</h2>
            <p className="text-sm text-gray-500 italic mb-4">
              This is a placeholder for the 100 prompts component. Each prompt will have a checkbox.
            </p>
            
            {/* Sample prompts - will be replaced with actual component */}
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="flex items-start">
                  <input
                    type="checkbox"
                    id={`prompt-${num}`}
                    className="mt-1 mr-3"
                  />
                  <label htmlFor={`prompt-${num}`} className="text-gray-800">
                    Sample prompt #{num} - This is a placeholder for the actual prompt content.
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t pt-4 mt-6">
            {/* Faculty selection placeholder */}
            <div className="mb-4">
              <label htmlFor="faculty-select" className="block text-sm font-medium mb-2">Select Your Faculty/Category</label>
              <select 
                id="faculty-select" 
                name="faculty" 
                aria-label="Faculty or category selection"
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select a faculty...</option>
                <option value="engineering">Engineering</option>
                <option value="arts">Arts</option>
                <option value="science">Science</option>
                <option value="business">Business</option>
              </select>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <Button variant="outline">Clear Checkboxes</Button>
              <Button>Calculate My Score</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 