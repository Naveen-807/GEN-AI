import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimelineEntry {
  id: string;
  date: string;
  mood: 'calm' | 'stressed' | 'excited' | 'neutral';
  title: string;
  preview: string;
  fullContent: string;
  type: 'journal' | 'achievement' | 'milestone';
}

interface InteractiveTimelineProps {
  entries: TimelineEntry[];
}

export const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({ entries }) => {
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);

  const getEntryIcon = (type: string) => {
    switch (type) {
      case 'journal':
        return '📝';
      case 'achievement':
        return '🏆';
      case 'milestone':
        return '🎯';
      default:
        return '✨';
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'calm':
        return 'from-blue-400 to-teal-400';
      case 'stressed':
        return 'from-red-400 to-pink-400';
      case 'excited':
        return 'from-yellow-400 to-orange-400';
      default:
        return 'from-purple-400 to-blue-400';
    }
  };

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-teal to-electric-pink opacity-30" />

      <div className="space-y-6">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex items-start space-x-4"
          >
            {/* Timeline Node */}
            <motion.div
              className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${getMoodColor(entry.mood)} shadow-lg`}
              whileHover={{ scale: 1.1 }}
              animate={{
                boxShadow: expandedEntry === entry.id 
                  ? "0 0 30px rgba(29, 233, 182, 0.5)" 
                  : "0 0 0px rgba(29, 233, 182, 0)",
              }}
            >
              <span className="text-2xl">{getEntryIcon(entry.type)}</span>
              
              {/* Pulse animation for recent entries */}
              {index < 2 && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-neon-teal"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 0, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.div>

            {/* Entry Content */}
            <motion.div
              className="flex-1 bg-white/80 backdrop-blur-md rounded-xl p-4 border border-white/20 hover-lift cursor-pointer"
              onClick={() => setExpandedEntry(expandedEntry === entry.id ? null : entry.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800">{entry.title}</h3>
                <span className="text-xs text-gray-500">{entry.date}</span>
              </div>

              <p className="text-gray-600 text-sm mb-2">{entry.preview}</p>

              {/* Expand/Collapse Indicator */}
              <motion.div
                className="flex items-center space-x-2 text-neon-teal text-sm"
                animate={{
                  color: expandedEntry === entry.id ? '#FF6EC7' : '#1DE9B6',
                }}
              >
                <span>{expandedEntry === entry.id ? 'Collapse' : 'Read More'}</span>
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{
                    rotate: expandedEntry === entry.id ? 180 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.div>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedEntry === entry.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    <p className="text-gray-700 leading-relaxed">
                      {entry.fullContent}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 mt-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 bg-neon-teal/10 text-neon-teal rounded-full text-xs font-medium border border-neon-teal/20"
                      >
                        Reflect
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 bg-electric-pink/10 text-electric-pink rounded-full text-xs font-medium border border-electric-pink/20"
                      >
                        Share Insight
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Timeline Continuation Indicator */}
      <motion.div
        className="flex items-center justify-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: entries.length * 0.1 + 0.5 }}
      >
        <div className="flex items-center space-x-2 text-gray-400 text-sm">
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <span>Your journey continues...</span>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </motion.div>
    </div>
  );
};