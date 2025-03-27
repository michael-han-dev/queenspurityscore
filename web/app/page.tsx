import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Rice Purity Test</h1>
          <p className="text-lg text-gray-600">
            See how pure you are by answering a series of prompts about your life experiences.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">How it works</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>You'll see a list of 100 prompts about various life experiences.</li>
              <li>Check any that apply to you (experiences you've had).</li>
              <li>Select your faculty/department from the dropdown.</li>
              <li>Click "Calculate My Score" to see your purity score.</li>
            </ol>
          </div>

          <div className="flex justify-center mt-8">
            <Link href="/prompts">
              <Button className="px-6 py-2 text-lg">Start The Test</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 