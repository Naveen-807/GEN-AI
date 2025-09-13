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
      <div className="relative h-80 overflow-hidden rounded-xl bg-white/80 backdrop-blur-md border border-white/20 shadow-lg">
        {/* Navigation Arrows */}
        <div className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2">
          <motion.button
            variants={slidersVariants}
            whileHover="hover"
            onClick={handlePrevious}
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-gray-600 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
        </div>

        <div className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2">
          <motion.button
            variants={slidersVariants}
            whileHover="hover"
            onClick={handleNext}
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-gray-600 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Challenge Card */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial={direction > 0 ? "hiddenRight" : "hiddenLeft"}
            animate="visible"
            exit="exit"
            className="absolute inset-0 p-6 flex flex-col justify-between"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${getTypeColor(currentChallenge.type)} flex items-center justify-center text-2xl shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  {currentChallenge.icon}
                </motion.div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyBadge.color}`}>
                    {difficultyBadge.label}
                  </span>
                  <span className="text-xs text-gray-500">{currentChallenge.duration}</span>
                </div>
              </div>

              <motion.h3
                className="text-xl font-bold text-gray-800 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {currentChallenge.title}
              </motion.h3>

              <motion.p
                className="text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {currentChallenge.description}
              </motion.p>
            </div>

            {/* Footer */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-neon-teal font-semibold">+{currentChallenge.reward} RP</span>
                  <span className="text-xs text-gray-500">reward</span>
                </div>
                <span className="text-xs text-gray-500 capitalize">{currentChallenge.type}</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-primary-gradient text-white py-3 rounded-lg font-medium shadow-lg button-modern"
              >
                Accept Challenge
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {challenges.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-neon-teal' : 'bg-gray-300'
            }`}
            variants={dotsVariants}
            initial="initial"
            animate={index === currentIndex ? "animate" : ""}
            whileHover="hover"
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-neon-teal to-electric-pink"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / challenges.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};