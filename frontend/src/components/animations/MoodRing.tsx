import React from 'react';
import { motion } from 'framer-motion';

interface MoodRingProps {
  mood: 'calm' | 'stressed' | 'excited' | 'neutral';
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

export const MoodRing: React.FC<MoodRingProps> = ({ 
  mood, 
  size = 'medium',
  showLabel = true 
}) => {
  const getMoodConfig = (mood: string) => {
    switch (mood) {
      case 'calm':
        return {
          colors: ['#A6C0FE', '#1DE9B6'],
          emoji: '😌',
          label: 'Calm',
          description: 'Peaceful and relaxed',
        };
      case 'stressed':
        return {
          colors: ['#FF6EC7', '#F68084'],
          emoji: '😰',
          label: 'Stressed',
          description: 'Feeling pressure',
        };
      case 'excited':
        return {
          colors: ['#FCCF31', '#FF6EC7'],
          emoji: '🤩',
          label: 'Excited',
          description: 'High energy and enthusiasm',
        };
      default:
        return {
          colors: ['#A6C0FE', '#F68084'],
          emoji: '😊',
          label: 'Neutral',
          description: 'Balanced and steady',
        };
    }
  };

  const getSizeConfig = (size: string) => {
    switch (size) {
      case 'small':
        return { size: 'w-12 h-12', emoji: 'text-lg' };
      case 'large':
        return { size: 'w-24 h-24', emoji: 'text-3xl' };
      default:
        return { size: 'w-16 h-16', emoji: 'text-xl' };
    }
  };

  const moodConfig = getMoodConfig(mood);
  const sizeConfig = getSizeConfig(size);

  return (
    <div className="flex flex-col items-center space-y-2">
      <motion.div
        className={`${sizeConfig.size} relative flex items-center justify-center rounded-full mood-ring`}
        style={{
          background: `linear-gradient(45deg, ${moodConfig.colors[0]}, ${moodConfig.colors[1]})`,
        }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Rotating border */}
        <motion.div
          className={`absolute inset-0 rounded-full`}
          style={{
            background: `conic-gradient(from 0deg, ${moodConfig.colors[0]}, ${moodConfig.colors[1]}, ${moodConfig.colors[0]})`,
            padding: '2px',
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div 
            className={`${sizeConfig.size} rounded-full flex items-center justify-center`}
            style={{
              background: `linear-gradient(45deg, ${moodConfig.colors[0]}, ${moodConfig.colors[1]})`,
            }}
          >
            <motion.span
              className={`${sizeConfig.emoji}`}
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {moodConfig.emoji}
            </motion.span>
          </div>
        </motion.div>
      </motion.div>

      {showLabel && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-sm font-semibold text-gray-700">
            {moodConfig.label}
          </div>
          <div className="text-xs text-gray-500">
            {moodConfig.description}
          </div>
        </motion.div>
      )}
    </div>
  );
};