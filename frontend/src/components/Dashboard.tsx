import React, { useState } from 'react';
import { ResiliencePoints } from './ResiliencePoints';
import { VoiceJournal } from './VoiceJournal';
import { PeerSupport } from './PeerSupport';
import { NarrativeTherapy } from './NarrativeTherapy';

interface DashboardProps {
  userId: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ userId }) => {
  const [activeTab, setActiveTab] = useState('journal');
  const [currentSentiment, setCurrentSentiment] = useState('');
  const [isDiscreetMode, setIsDiscreetMode] = useState(false);

  const handleJournalSubmit = (transcript: string, sentiment: string) => {
    setCurrentSentiment(sentiment);
    // Optionally switch to narrative therapy tab
    setActiveTab('narrative');
  };

  const handlePointsEarned = (points: number) => {
    // In a real app, this would update the user's points in the backend
    console.log(`Earned ${points} resilience points!`);
  };

  const tabs = [
    { id: 'journal', name: isDiscreetMode ? 'Voice Notes' : 'Voice Journal', icon: '🎤' },
    { id: 'narrative', name: isDiscreetMode ? 'Story Creator' : 'Narrative Therapy', icon: '📖' },
    { id: 'peer', name: isDiscreetMode ? 'Study Groups' : 'Peer Support', icon: '👥' },
    { id: 'wellness', name: isDiscreetMode ? 'Health Tips' : 'Wellness Hub', icon: '🧘' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-wellness-blue to-wellness-purple rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-800">
                {isDiscreetMode ? 'StudyMate Pro' : 'MindMate'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsDiscreetMode(!isDiscreetMode)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  isDiscreetMode 
                    ? 'bg-gray-200 text-gray-700' 
                    : 'bg-wellness-purple/10 text-wellness-purple'
                }`}
              >
                {isDiscreetMode ? '👁️ Discreet' : '🌟 Wellness'}
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
              <nav className="flex space-x-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-wellness-blue text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'journal' && (
                <VoiceJournal onJournalSubmit={handleJournalSubmit} />
              )}
              
              {activeTab === 'narrative' && (
                <NarrativeTherapy 
                  sentiment={currentSentiment} 
                  onPointsEarned={handlePointsEarned}
                />
              )}
              
              {activeTab === 'peer' && (
                <PeerSupport />
              )}
              
              {activeTab === 'wellness' && (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    {isDiscreetMode ? 'Health & Productivity Tips' : 'Wellness Hub'}
                  </h2>
                  <div className="grid gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-green-800">🌿 Mindfulness Moment</h3>
                      <p className="text-green-700 mt-2">Take 3 deep breaths. Inhale for 4 counts, hold for 4, exhale for 6.</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-800">💧 Hydration Reminder</h3>
                      <p className="text-blue-700 mt-2">Don't forget to drink water! Aim for 8 glasses throughout the day.</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-purple-800">🎯 Focus Technique</h3>
                      <p className="text-purple-700 mt-2">Try the Pomodoro Technique: 25 minutes focused work, 5-minute break.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ResiliencePoints userId={userId} />
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setActiveTab('journal')}
                  className="w-full bg-gradient-to-r from-wellness-green to-wellness-blue text-white p-3 rounded-lg text-left hover:shadow-md transition-all"
                >
                  🎤 Quick Voice Check-in
                </button>
                <button 
                  onClick={() => setActiveTab('peer')}
                  className="w-full bg-gradient-to-r from-wellness-purple to-wellness-blue text-white p-3 rounded-lg text-left hover:shadow-md transition-all"
                >
                  💬 Connect with Peers
                </button>
                <button className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg text-left hover:bg-gray-200 transition-colors">
                  📚 View Resources
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">🌟 Today's Motivation</h3>
              <p className="text-yellow-700 italic">
                "Every small step forward is progress. You're building resilience one moment at a time."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};