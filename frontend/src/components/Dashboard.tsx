import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import { ResiliencePoints } from './ResiliencePoints';
import { VoiceJournal } from './VoiceJournal';
import { PeerSupport } from './PeerSupport';
import { NarrativeTherapy } from './NarrativeTherapy';
import { MoodParticles } from './animations/MoodParticles';
import { FloatingActionButton } from './animations/FloatingActionButton';
import { AnimatedNavigation } from './animations/AnimatedNavigation';
import { MoodRing } from './animations/MoodRing';
import { InteractiveTimeline } from './animations/InteractiveTimeline';
import { DailyChallengeCarousel } from './animations/DailyChallengeCarousel';

interface DashboardProps {
  userId: string;
}

const DashboardContent: React.FC<DashboardProps> = ({ userId }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [currentSentiment, setCurrentSentiment] = useState('');
  const [isDiscreetMode, setIsDiscreetMode] = useState(false);
  const { isDark, toggleTheme, currentMood, setMood } = useTheme();

  const handleJournalSubmit = (transcript: string, sentiment: string) => {
    setCurrentSentiment(sentiment);
    // Determine mood from sentiment for particles
    const moodMapping = {
      'positive': 'excited' as const,
      'negative': 'stressed' as const,
      'neutral': 'neutral' as const,
    };
    setMood(moodMapping[sentiment as keyof typeof moodMapping] || 'neutral');
    setActiveTab('narrative');
  };

  const handlePointsEarned = (points: number) => {
    console.log(`Earned ${points} resilience points!`);
  };

  const tabs = [
    { 
      id: 'home', 
      name: isDiscreetMode ? 'Dashboard' : 'Home', 
      icon: '🏠',
      mobileIcon: '🏠'
    },
    { 
      id: 'journal', 
      name: isDiscreetMode ? 'Voice Notes' : 'Journal', 
      icon: '🎤',
      mobileIcon: '🎤'
    },
    { 
      id: 'narrative', 
      name: isDiscreetMode ? 'Stories' : 'Therapy', 
      icon: '📖',
      mobileIcon: '📖'
    },
    { 
      id: 'peer', 
      name: isDiscreetMode ? 'Groups' : 'Peer', 
      icon: '👥',
      mobileIcon: '👥'
    },
    { 
      id: 'game', 
      name: isDiscreetMode ? 'Scenarios' : 'Game', 
      icon: '🎮',
      mobileIcon: '🎮'
    },
    { 
      id: 'profile', 
      name: 'Profile', 
      icon: '👤',
      mobileIcon: '👤'
    },
  ];

  // Mock data for demo
  const timelineEntries = [
    {
      id: '1',
      date: 'Today, 2:30 PM',
      mood: 'excited' as const,
      title: 'Breakthrough Moment',
      preview: 'Had an amazing realization about my stress patterns...',
      fullContent: 'Today I discovered that my stress usually peaks around deadlines because I tend to procrastinate. By recognizing this pattern, I can now plan better and break tasks into smaller chunks. This awareness is already helping me feel more in control.',
      type: 'journal' as const,
    },
    {
      id: '2',
      date: 'Yesterday, 10:15 AM',
      mood: 'calm' as const,
      title: 'Mindfulness Milestone',
      preview: 'Completed 7 days of meditation streak!',
      fullContent: 'I\'ve successfully maintained a daily meditation practice for a full week. Each session has become easier, and I\'m noticing improved focus throughout the day. The breathing exercises are particularly helpful during stressful moments.',
      type: 'achievement' as const,
    },
    {
      id: '3',
      date: '2 days ago',
      mood: 'neutral' as const,
      title: 'Peer Support Success',
      preview: 'Helped a fellow student with their anxiety...',
      fullContent: 'I was able to provide meaningful support to someone struggling with test anxiety. Sharing my own coping strategies felt empowering, and I realized how much I\'ve grown in managing my own stress.',
      type: 'milestone' as const,
    },
  ];

  const dailyChallenges = [
    {
      id: '1',
      title: 'Gratitude Reflection',
      description: 'Take 5 minutes to write down three things you\'re grateful for today and reflect on why they matter to you.',
      type: 'mindfulness' as const,
      duration: '5 mins',
      difficulty: 'easy' as const,
      icon: '🙏',
      reward: 50,
    },
    {
      id: '2',
      title: 'Movement Break',
      description: 'Take a 10-minute walk outdoors and pay attention to your surroundings. Notice the sounds, sights, and sensations.',
      type: 'physical' as const,
      duration: '10 mins',
      difficulty: 'easy' as const,
      icon: '🚶',
      reward: 75,
    },
    {
      id: '3',
      title: 'Connect & Care',
      description: 'Reach out to a friend or family member you haven\'t spoken to in a while. Ask about their day and truly listen.',
      type: 'social' as const,
      duration: '15 mins',
      difficulty: 'medium' as const,
      icon: '💬',
      reward: 100,
    },
    {
      id: '4',
      title: 'Creative Expression',
      description: 'Spend 20 minutes on any creative activity - drawing, writing, music, or crafts. Focus on the process, not the outcome.',
      type: 'creative' as const,
      duration: '20 mins',
      difficulty: 'medium' as const,
      icon: '🎨',
      reward: 125,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Mood-based Particle Background */}
      <MoodParticles mood={currentMood} />

      {/* Animated Background Gradient */}
      <motion.div
        className={`fixed inset-0 ${isDark ? 'bg-dark-gradient' : 'bg-primary-gradient'} opacity-10`}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Header */}
      <motion.header 
        className="relative z-20 bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="w-10 h-10 bg-primary-gradient rounded-xl flex items-center justify-center shadow-lg"
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-white font-bold text-xl">M</span>
              </motion.div>
              <h1 className="text-xl font-bold text-primary-gradient">
                {isDiscreetMode ? 'StudyMate Pro' : 'MindMate'}
              </h1>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              {/* Mood Ring Indicator */}
              <MoodRing mood={currentMood} size="small" showLabel={false} />
              
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors"
              >
                <motion.span
                  animate={{ rotate: isDark ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl"
                >
                  {isDark ? '☀️' : '🌙'}
                </motion.span>
              </motion.button>

              {/* Discreet Mode Toggle */}
              <motion.button
                onClick={() => setIsDiscreetMode(!isDiscreetMode)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  isDiscreetMode 
                    ? 'bg-gray-200 text-gray-700' 
                    : 'bg-neon-teal/10 text-neon-teal border border-neon-teal/20'
                }`}
              >
                {isDiscreetMode ? '👁️ Discreet' : '🌟 Wellness'}
              </motion.button>

              <motion.div 
                className="w-8 h-8 bg-primary-gradient rounded-full cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            </div>
          </div>
        </div>
      </motion.header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Animated Navigation */}
            <AnimatedNavigation
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              isDiscreetMode={isDiscreetMode}
            />

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {activeTab === 'home' && (
                  <div className="space-y-6">
                    {/* Welcome Section */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <motion.h2
                        className="text-3xl font-bold text-primary-gradient mb-4"
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        Welcome back! ✨
                      </motion.h2>
                      <p className="text-gray-600 text-lg">
                        Ready to continue your wellness journey?
                      </p>
                    </motion.div>

                    {/* Daily Challenge Carousel */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <span className="mr-2">🎯</span>
                        Daily Challenges
                      </h3>
                      <DailyChallengeCarousel challenges={dailyChallenges} />
                    </motion.div>

                    {/* Interactive Timeline */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <span className="mr-2">📈</span>
                        Your Journey
                      </h3>
                      <InteractiveTimeline entries={timelineEntries} />
                    </motion.div>
                  </div>
                )}
                
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
                
                {activeTab === 'game' && (
                  <motion.div 
                    className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h2 className="text-2xl font-bold text-primary-gradient mb-4">
                      Scenario Simulation
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Practice real-life situations in a safe, simulated environment.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-primary-gradient text-white px-6 py-3 rounded-lg font-medium shadow-lg button-modern"
                    >
                      🎮 Start Simulation
                    </motion.button>
                  </motion.div>
                )}

                {activeTab === 'profile' && (
                  <motion.div 
                    className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h2 className="text-2xl font-bold text-primary-gradient mb-4">
                      Profile & Settings
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span>Current Mood</span>
                        <MoodRing mood={currentMood} size="small" />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span>Theme</span>
                        <span>{isDark ? 'Dark' : 'Light'} Mode</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span>Privacy Mode</span>
                        <span>{isDiscreetMode ? 'Enabled' : 'Disabled'}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ResiliencePoints userId={userId} />
            
            <motion.div 
              className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <motion.button 
                  onClick={() => setActiveTab('journal')}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-neon-teal to-electric-pink text-white p-3 rounded-lg text-left hover:shadow-lg transition-all button-modern"
                >
                  🎤 Quick Voice Check-in
                </motion.button>
                <motion.button 
                  onClick={() => setActiveTab('peer')}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-electric-pink to-warm-yellow text-white p-3 rounded-lg text-left hover:shadow-lg transition-all button-modern"
                >
                  💬 Connect with Peers
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg text-left hover:bg-gray-200 transition-colors"
                >
                  📚 View Resources
                </motion.button>
              </div>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-r from-warm-yellow/20 to-electric-pink/20 backdrop-blur-md p-6 rounded-xl border border-white/30"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-bold text-gray-800 mb-2">🌟 Today's Motivation</h3>
              <motion.p 
                className="text-gray-700 italic"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                "Every small step forward is progress. You're building resilience one moment at a time."
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton
        onVoiceJournal={() => setActiveTab('journal')}
        onAIChat={() => setActiveTab('narrative')}
        onGameSimulation={() => setActiveTab('game')}
      />
    </div>
  );
};

export const Dashboard: React.FC<DashboardProps> = ({ userId }) => {
  return (
    <ThemeProvider>
      <DashboardContent userId={userId} />
    </ThemeProvider>
  );
};