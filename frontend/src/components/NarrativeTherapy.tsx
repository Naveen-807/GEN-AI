import React, { useState } from 'react';

interface NarrativeTherapyProps {
  sentiment: string;
  onPointsEarned: (points: number) => void;
}

export const NarrativeTherapy: React.FC<NarrativeTherapyProps> = ({ sentiment, onPointsEarned }) => {
  const [emotion, setEmotion] = useState('');
  const [situation, setSituation] = useState('');
  const [narrative, setNarrative] = useState('');
  const [alternativeEndings, setAlternativeEndings] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateNarrative = async () => {
    if (!emotion || !situation) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/narrative-therapy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emotion, situation }),
      });

      const data = await response.json();
      setNarrative(data.narrative);
      setAlternativeEndings(data.alternativeEndings);
      onPointsEarned(data.resiliencePoints);
    } catch (error) {
      console.error('Error generating narrative:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">AI Narrative Therapy</h2>
      <p className="text-gray-600 mb-6">Transform your experiences into empowering stories. AI helps you explore alternative perspectives and build resilience.</p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How are you feeling right now?
          </label>
          <select 
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wellness-blue"
          >
            <option value="">Select an emotion...</option>
            <option value="anxious">Anxious</option>
            <option value="stressed">Stressed</option>
            <option value="overwhelmed">Overwhelmed</option>
            <option value="sad">Sad</option>
            <option value="frustrated">Frustrated</option>
            <option value="confused">Confused</option>
            <option value="lonely">Lonely</option>
            <option value="hopeful">Hopeful</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe your situation briefly
          </label>
          <textarea
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder="What's happening in your life that's affecting you?"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wellness-blue h-24 resize-none"
          />
        </div>

        <button
          onClick={generateNarrative}
          disabled={!emotion || !situation || loading}
          className="w-full bg-gradient-to-r from-wellness-purple to-wellness-blue text-white py-3 rounded-lg font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Creating your narrative...</span>
            </div>
          ) : (
            '✨ Generate AI Narrative'
          )}
        </button>

        {narrative && (
          <div className="mt-6 space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Your Empowering Narrative</h3>
              <p className="text-gray-700 italic">{narrative}</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Alternative Perspectives to Explore</h3>
              <div className="space-y-2">
                {alternativeEndings.map((ending, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg border border-green-200">
                    <p className="text-gray-700">{ending}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">🎯 Reflection Questions</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Which alternative perspective resonates most with you?</li>
                <li>• What strengths do you see in yourself through this narrative?</li>
                <li>• How might your future self view this situation?</li>
                <li>• What would you tell a friend going through something similar?</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};