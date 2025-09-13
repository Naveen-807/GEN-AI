import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'mindfulness' | 'physical' | 'social' | 'creative';
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
  reward: number;
}

interface DailyChallengeCarouselProps {
  challenges: Challenge[];
}

export const DailyChallengeCarousel: React.FC<DailyChallengeCarouselProps> = ({ challenges }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    hiddenRight: {
      x: "100%",
      opacity: 0,
    },
    hiddenLeft: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    },
  };

  const slidersVariants = {
    hover: {
      scale: 1.2,
      backgroundColor: "#FF6EC7",
    },
  };

  const dotsVariants = {
    initial: {
      y: 0,
    },
    animate: {
      y: -10,
      scale: 1.2,
      transition: { type: "spring" as const, stiffness: 1000, damping: 10 },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === challenges.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? challenges.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'mindfulness':
        return 'from-blue-400 to-teal-400';
      case 'physical':
        return 'from-green-400 to-emerald-400';
      case 'social':
        return 'from-purple-400 to-pink-400';
      case 'creative':
        return 'from-yellow-400 to-orange-400';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return { color: 'bg-green-100 text-green-800', label: 'Easy' };
      case 'medium':
        return { color: 'bg-yellow-100 text-yellow-800', label: 'Medium' };
      case 'hard':
        return { color: 'bg-red-100 text-red-800', label: 'Hard' };
      default:
        return { color: 'bg-gray-100 text-gray-800', label: 'Unknown' };
    }
  };

  if (!challenges.length) return null;

  const currentChallenge = challenges[currentIndex];
  const difficultyBadge = getDifficultyBadge(currentChallenge.difficulty);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative h-96 overflow-hidden rounded-3xl glass border border-white/20 shadow-2xl">
        {/* Animated background effects */}
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

        {/* Floating sparkles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-neon-teal to-electric-pink rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              rotate: [0, 360],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}

        {/* Enhanced Navigation Arrows */}
        <div className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2">
          <motion.button
            variants={slidersVariants}
            whileHover="hover"
            onClick={handlePrevious}
            className="relative p-3 rounded-2xl glass border border-white/30 text-gray-600 hover:text-white transition-colors overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-neon-teal/20 to-electric-pink/20 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
        </div>

        <div className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2">
          <motion.button
            variants={slidersVariants}
            whileHover="hover"
            onClick={handleNext}
            className="relative p-3 rounded-2xl glass border border-white/30 text-gray-600 hover:text-white transition-colors overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-neon-teal/20 to-electric-pink/20 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Enhanced Challenge Card */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial={direction > 0 ? "hiddenRight" : "hiddenLeft"}
            animate="visible"
            exit="exit"
            className="absolute inset-0 p-8 flex flex-col justify-between"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <motion.div
                  className={`relative w-20 h-20 rounded-3xl bg-gradient-to-r ${getTypeColor(currentChallenge.type)} flex items-center justify-center text-3xl shadow-2xl overflow-hidden`}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  {/* Animated shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: [-100, 100],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  />
                  <span className="relative z-10">{currentChallenge.icon}</span>
                </motion.div>
                
                <div className="flex flex-col items-end space-y-2">
                  <motion.span 
                    className={`px-3 py-1 rounded-2xl text-sm font-medium ${difficultyBadge.color} shadow-lg`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {difficultyBadge.label}
                  </motion.span>
                  <motion.span 
                    className="text-sm text-gray-500 glass px-2 py-1 rounded-xl"
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {currentChallenge.duration}
                  </motion.span>
                </div>
              </div>

              <motion.h3
                className="text-2xl font-bold text-gray-800 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {currentChallenge.title}
              </motion.h3>

              <motion.p
                className="text-gray-600 leading-relaxed text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {currentChallenge.description}
              </motion.p>
            </div>

            {/* Footer */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <motion.div 
                  className="flex items-center space-x-3 glass rounded-2xl px-4 py-2 border border-neon-teal/30"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(29, 233, 182, 0.2)",
                      "0 0 40px rgba(29, 233, 182, 0.4)",
                      "0 0 20px rgba(29, 233, 182, 0.2)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="text-neon-teal font-bold text-lg">+{currentChallenge.reward} RP</span>
                  <span className="text-sm text-gray-500">reward</span>
                </motion.div>
                <motion.span 
                  className="text-sm text-gray-500 capitalize glass px-3 py-1 rounded-xl"
                  whileHover={{ scale: 1.05 }}
                >
                  {currentChallenge.type}
                </motion.span>
              </div>

              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: "0 20px 40px rgba(29, 233, 182, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-neon-teal to-electric-pink text-white py-4 rounded-2xl font-semibold shadow-2xl button-modern relative overflow-hidden group text-lg"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  animate={{
                    x: [-100, 300],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />
                <span className="relative z-10">Accept Challenge</span>
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Enhanced Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-3">
        {challenges.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`relative transition-colors ${
              index === currentIndex ? 'w-8 h-4' : 'w-4 h-4'
            }`}
            variants={dotsVariants}
            initial="initial"
            animate={index === currentIndex ? "animate" : ""}
            whileHover="hover"
          >
            <motion.div
              className={`w-full h-full rounded-full ${
                index === currentIndex 
                  ? 'bg-gradient-to-r from-neon-teal to-electric-pink' 
                  : 'bg-gray-300'
              }`}
              whileHover={{
                backgroundColor: index === currentIndex ? undefined : '#1DE9B6',
              }}
            />
            {index === currentIndex && (
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-teal to-electric-pink"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Enhanced Progress Bar */}
      <motion.div 
        className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner"
        whileHover={{ scale: 1.02 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-neon-teal via-electric-pink to-warm-yellow relative overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / challenges.length) * 100}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent"
            animate={{
              x: [-100, 100],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};