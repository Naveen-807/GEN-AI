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
      {/* Enhanced Mood-based Particle Background */}
      <MoodParticles mood={currentMood} />

      {/* Multi-layered Animated Background */}
      <motion.div
        className={`fixed inset-0 ${isDark ? 'bg-dark-gradient' : 'bg-primary-gradient'} opacity-5`}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Secondary animated layer */}
      <motion.div
        className="fixed inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at 20% 50%, rgba(29, 233, 182, 0.3) 0%, transparent 50%), 
                       radial-gradient(circle at 80% 20%, rgba(255, 110, 199, 0.3) 0%, transparent 50%), 
                       radial-gradient(circle at 40% 80%, rgba(252, 207, 49, 0.3) 0%, transparent 50%)`,
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating geometric shapes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-4 h-4 rounded-full bg-gradient-to-r from-neon-teal/20 to-electric-pink/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-100, 100, -100],
            x: [-50, 50, -50],
            rotate: [0, 360],
            scale: [0.5, 1.5, 0.5],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Subtle grid pattern overlay */}
      <div 
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(29, 233, 182, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(29, 233, 182, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Enhanced Modern Header */}
      <motion.header 
        className="relative z-20 glass border-b border-white/10 shadow-2xl"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div 
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div 
                className="relative w-12 h-12 bg-gradient-to-br from-neon-teal via-electric-pink to-warm-yellow rounded-2xl flex items-center justify-center shadow-xl overflow-hidden"
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  rotate: [0, 360],
                  transition: { duration: 0.8 }
                }}
              >
                {/* Animated background sparkle */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: [-100, 100],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <span className="relative text-white font-bold text-2xl z-10">M</span>
              </motion.div>
              <div>
                <motion.h1 
                  className="text-2xl font-bold text-primary-gradient"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  {isDiscreetMode ? 'StudyMate Pro' : 'MindMate'}
                </motion.h1>
                <motion.p 
                  className="text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Your wellness companion
                </motion.p>
              </div>
            </motion.div>
            
            <div className="flex items-center space-x-3">
              {/* Enhanced Mood Ring Indicator */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="relative"
              >
                <MoodRing mood={currentMood} size="small" showLabel={false} />
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-neon-teal to-electric-pink rounded-full opacity-30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </motion.div>
              
              {/* Enhanced Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-3 rounded-2xl glass border border-white/20 group overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-neon-teal/20 to-electric-pink/20 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  animate={{ 
                    rotate: isDark ? 180 : 0,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 0.5 },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                  className="relative text-2xl z-10"
                >
                  {isDark ? '☀️' : '🌙'}
                </motion.span>
              </motion.button>

              {/* Enhanced Discreet Mode Toggle */}
              <motion.button
                onClick={() => setIsDiscreetMode(!isDiscreetMode)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-4 py-2 rounded-2xl font-medium transition-all overflow-hidden ${
                  isDiscreetMode 
                    ? 'bg-gray-200/80 text-gray-700 border border-gray-300/50' 
                    : 'glass border border-neon-teal/30 text-neon-teal'
                }`}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-neon-teal/10 to-electric-pink/10"
                  animate={{
                    x: isDiscreetMode ? -100 : [-100, 100],
                  }}
                  transition={{
                    duration: isDiscreetMode ? 0.3 : 2,
                    repeat: isDiscreetMode ? 0 : Infinity,
                  }}
                />
                <span className="relative z-10">
                  {isDiscreetMode ? '👁️ Discreet' : '🌟 Wellness'}
                </span>
              </motion.button>

              {/* Enhanced Profile Avatar */}
              <motion.div 
                className="relative w-10 h-10 bg-gradient-to-br from-electric-pink to-neon-teal rounded-2xl cursor-pointer overflow-hidden"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <div className="absolute inset-1 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">D</span>
                </div>
              </motion.div>
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
                  <div className="space-y-8">
                    {/* Enhanced Welcome Section */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="relative text-center py-12 overflow-hidden"
                    >
                      {/* Floating background elements */}
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-20 h-20 rounded-full opacity-10"
                          style={{
                            background: `linear-gradient(${Math.random() * 360}deg, #1DE9B6, #FF6EC7, #FCCF31)`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            y: [-20, 20, -20],
                            x: [-10, 10, -10],
                            rotate: [0, 360],
                            scale: [0.8, 1.2, 0.8],
                          }}
                          transition={{
                            duration: 6 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                          }}
                        />
                      ))}
                      
                      <motion.h2
                        className="text-4xl md:text-5xl font-bold text-primary-gradient mb-6 relative z-10"
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <motion.span
                          animate={{
                            rotateY: [0, 360],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                          className="inline-block"
                        >
                          Welcome back!
                        </motion.span>
                        <motion.span
                          animate={{
                            scale: [1, 1.3, 1],
                            rotate: [0, 20, -20, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                          }}
                          className="inline-block ml-3"
                        >
                          ✨
                        </motion.span>
                      </motion.h2>
                      <motion.p 
                        className="text-gray-600 text-xl mb-8 relative z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        Ready to continue your 
                        <motion.span
                          className="text-neon-gradient font-semibold mx-2"
                          animate={{
                            textShadow: [
                              "0 0 5px rgba(29, 233, 182, 0.5)",
                              "0 0 20px rgba(29, 233, 182, 0.8)",
                              "0 0 5px rgba(29, 233, 182, 0.5)",
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          wellness journey
                        </motion.span>
                        ?
                      </motion.p>
                      
                      {/* Quick stats cards */}
                      <motion.div
                        className="flex justify-center space-x-4 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        {[
                          { icon: '🎯', number: '7', label: 'Day Streak' },
                          { icon: '🏆', number: '1250', label: 'RP Earned' },
                          { icon: '💪', number: '83%', label: 'Progress' },
                        ].map((stat, index) => (
                          <motion.div
                            key={index}
                            className="glass rounded-2xl p-4 border border-white/20 min-w-[100px]"
                            whileHover={{ 
                              scale: 1.05, 
                              y: -5,
                              boxShadow: "0 20px 40px rgba(29, 233, 182, 0.2)"
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <motion.div
                              className="text-2xl mb-1"
                              animate={{
                                scale: [1, 1.2, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.5,
                              }}
                            >
                              {stat.icon}
                            </motion.div>
                            <div className="text-2xl font-bold text-neon-teal">{stat.number}</div>
                            <div className="text-xs text-gray-500">{stat.label}</div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>

                    {/* Enhanced Daily Challenge Carousel */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="relative"
                    >
                      <motion.div
                        className="flex items-center mb-6"
                        whileHover={{ x: 5 }}
                      >
                        <motion.span 
                          className="mr-4 text-3xl"
                          animate={{
                            rotate: [0, 15, -15, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                          }}
                        >
                          🎯
                        </motion.span>
                        <h3 className="text-2xl font-bold text-gray-800">
                          Daily Challenges
                        </h3>
                        <motion.div
                          className="ml-auto glass rounded-full px-4 py-2 border border-electric-pink/30"
                          animate={{
                            boxShadow: [
                              "0 0 20px rgba(255, 110, 199, 0.2)",
                              "0 0 40px rgba(255, 110, 199, 0.4)",
                              "0 0 20px rgba(255, 110, 199, 0.2)",
                            ],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <span className="text-electric-pink font-semibold">2/4 Completed</span>
                        </motion.div>
                      </motion.div>
                      <DailyChallengeCarousel challenges={dailyChallenges} />
                    </motion.div>

                    {/* Enhanced Interactive Timeline */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="relative"
                    >
                      <motion.div
                        className="flex items-center mb-6"
                        whileHover={{ x: 5 }}
                      >
                        <motion.span 
                          className="mr-4 text-3xl"
                          animate={{
                            y: [0, -10, 0],
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                          }}
                        >
                          📈
                        </motion.span>
                        <h3 className="text-2xl font-bold text-gray-800">
                          Your Journey
                        </h3>
                        <motion.div
                          className="ml-auto flex items-center space-x-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1 }}
                        >
                          <motion.button
                            className="glass rounded-full p-2 border border-neon-teal/30 hover:border-neon-teal/60 transition-colors"
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <span className="text-neon-teal">⚙️</span>
                          </motion.button>
                          <motion.button
                            className="glass rounded-full p-2 border border-electric-pink/30 hover:border-electric-pink/60 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <span className="text-electric-pink">📊</span>
                          </motion.button>
                        </motion.div>
                      </motion.div>
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

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Enhanced Resilience Points Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ResiliencePoints userId={userId} />
            </motion.div>
            
            {/* Enhanced Quick Actions */}
            <motion.div 
              className="relative glass p-6 rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-neon-teal/5 via-electric-pink/5 to-warm-yellow/5"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              
              <div className="relative z-10">
                <motion.div
                  className="flex items-center mb-6"
                  whileHover={{ x: 5 }}
                >
                  <motion.span
                    className="mr-3 text-2xl"
                    animate={{
                      rotate: [0, 15, -15, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                  >
                    ⚡
                  </motion.span>
                  <h3 className="text-xl font-bold text-gray-800">Quick Actions</h3>
                </motion.div>
                
                <div className="space-y-4">
                  <motion.button 
                    onClick={() => setActiveTab('journal')}
                    whileHover={{ scale: 1.03, x: 8, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="group w-full bg-gradient-to-r from-neon-teal to-electric-pink text-white p-4 rounded-2xl text-left shadow-lg button-modern relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                      animate={{
                        x: [-100, 300],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    />
                    <div className="relative z-10 flex items-center">
                      <motion.span
                        className="mr-3 text-2xl"
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      >
                        🎤
                      </motion.span>
                      <div>
                        <div className="font-semibold">Quick Voice Check-in</div>
                        <div className="text-sm opacity-90">Express your feelings</div>
                      </div>
                      <motion.div
                        className="ml-auto"
                        animate={{
                          x: [0, 5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      >
                        →
                      </motion.div>
                    </div>
                  </motion.button>
                  
                  <motion.button 
                    onClick={() => setActiveTab('peer')}
                    whileHover={{ scale: 1.03, x: 8, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="group w-full bg-gradient-to-r from-electric-pink to-warm-yellow text-white p-4 rounded-2xl text-left shadow-lg button-modern relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                      animate={{
                        x: [-100, 300],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 4,
                      }}
                    />
                    <div className="relative z-10 flex items-center">
                      <motion.span
                        className="mr-3 text-2xl"
                        animate={{
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                        }}
                      >
                        💬
                      </motion.span>
                      <div>
                        <div className="font-semibold">Connect with Peers</div>
                        <div className="text-sm opacity-90">Join support groups</div>
                      </div>
                      <motion.div
                        className="ml-auto"
                        animate={{
                          x: [0, 5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: 0.5,
                        }}
                      >
                        →
                      </motion.div>
                    </div>
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.03, x: 8, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="group w-full glass border border-white/30 text-gray-700 p-4 rounded-2xl text-left hover:border-neon-teal/50 transition-all relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-neon-teal/5 to-electric-pink/5 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    <div className="relative z-10 flex items-center">
                      <motion.span
                        className="mr-3 text-2xl"
                        animate={{
                          y: [0, -3, 0],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                        }}
                      >
                        📚
                      </motion.span>
                      <div>
                        <div className="font-semibold">View Resources</div>
                        <div className="text-sm opacity-70">Learning materials</div>
                      </div>
                      <motion.div
                        className="ml-auto opacity-50 group-hover:opacity-100"
                        animate={{
                          x: [0, 5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: 1,
                        }}
                      >
                        →
                      </motion.div>
                    </div>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Motivation Card */}
            <motion.div 
              className="relative glass p-6 rounded-3xl border border-white/30 overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              {/* Animated sparkles background */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-neon-teal to-electric-pink rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                />
              ))}
              
              <div className="relative z-10">
                <motion.div
                  className="flex items-center mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.span
                    className="mr-3 text-2xl"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                  >
                    🌟
                  </motion.span>
                  <h3 className="text-lg font-bold text-gray-800">Today's Motivation</h3>
                </motion.div>
                
                <motion.p 
                  className="text-gray-700 italic leading-relaxed"
                  animate={{
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity 
                  }}
                >
                  "Every small step forward is progress. You're building resilience one moment at a time."
                </motion.p>
                
                <motion.div
                  className="mt-4 flex justify-end"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  <motion.button
                    className="text-neon-teal text-sm font-medium hover:text-electric-pink transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get new quote ✨
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>

            {/* New: Weekly Goals Card */}
            <motion.div 
              className="relative glass p-6 rounded-3xl border border-white/20 overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="relative z-10">
                <motion.div
                  className="flex items-center mb-4"
                  whileHover={{ x: 5 }}
                >
                  <motion.span
                    className="mr-3 text-2xl"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  >
                    🎯
                  </motion.span>
                  <h3 className="text-lg font-bold text-gray-800">Weekly Goals</h3>
                </motion.div>
                
                <div className="space-y-3">
                  {[
                    { goal: "Meditation streak", progress: 85, color: "neon-teal" },
                    { goal: "Journal entries", progress: 60, color: "electric-pink" },
                    { goal: "Peer interactions", progress: 40, color: "warm-yellow" },
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="relative"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + index * 0.2 }}
                    >
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{item.goal}</span>
                        <span className="text-gray-800 font-medium">{item.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r from-${item.color} to-${item.color}/70 rounded-full`}
                          style={{ backgroundColor: item.color === 'neon-teal' ? '#1DE9B6' : item.color === 'electric-pink' ? '#FF6EC7' : '#FCCF31' }}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ duration: 1.5, delay: 1.5 + index * 0.3 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Floating Action Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        <FloatingActionButton
          onVoiceJournal={() => setActiveTab('journal')}
          onAIChat={() => setActiveTab('narrative')}
          onGameSimulation={() => setActiveTab('game')}
        />
        
        {/* Pulsing ring animation around FAB */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-neon-teal/30"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-electric-pink/30"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1,
          }}
        />
      </motion.div>

      {/* Achievement notification area */}
      <AnimatePresence>
        <motion.div
          className="fixed top-24 right-8 z-40 pointer-events-none"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
        >
          {/* This would show achievement notifications */}
        </motion.div>
      </AnimatePresence>
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