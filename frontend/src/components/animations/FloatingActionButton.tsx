import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingActionButtonProps {
  onVoiceJournal: () => void;
  onAIChat: () => void;
  onGameSimulation: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onVoiceJournal,
  onAIChat,
  onGameSimulation,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const quickActions = [
    {
      icon: '🎤',
      label: 'Voice Journal',
      action: onVoiceJournal,
      gradient: 'from-neon-teal to-electric-pink',
    },
    {
      icon: '💬',
      label: 'AI Chat',
      action: onAIChat,
      gradient: 'from-electric-pink to-warm-yellow',
    },
    {
      icon: '🎮',
      label: 'Simulation',
      action: onGameSimulation,
      gradient: 'from-warm-yellow to-neon-teal',
    },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Enhanced Backdrop with Gradient */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-gradient-to-br from-black/30 via-neon-teal/10 to-electric-pink/10 backdrop-blur-md"
            style={{ bottom: 0, right: 0, top: 0, left: 0, zIndex: -1 }}
          />
        )}
      </AnimatePresence>

      {/* Enhanced Quick Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-20 right-0 flex flex-col gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0, x: 50, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  x: 0,
                  y: 0,
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0, 
                  x: 50,
                  y: 20,
                }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
                className="flex items-center gap-3"
              >
                {/* Enhanced Tooltip */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (index * 0.1) + 0.2 }}
                  className="glass px-4 py-2 rounded-2xl border border-white/20 shadow-2xl"
                >
                  <span className="text-white font-medium text-sm whitespace-nowrap">
                    {action.label}
                  </span>
                </motion.div>

                {/* Enhanced Action Button */}
                <motion.button
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    action.action();
                    setIsOpen(false);
                  }}
                  className={`
                    relative w-16 h-16 bg-gradient-to-r ${action.gradient} 
                    rounded-2xl shadow-2xl overflow-hidden group
                  `}
                  style={{
                    boxShadow: '0 8px 32px rgba(29, 233, 182, 0.4)',
                  }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: [-100, 100],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />

                  {/* Icon with pulsing effect */}
                  <motion.span 
                    className="relative z-10 text-2xl"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  >
                    {action.icon}
                  </motion.span>

                  {/* Ripple effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100"
                    whileHover={{
                      scale: [1, 1.2],
                      opacity: [0, 0.3, 0],
                    }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Enhanced Main FAB */}
      <div className="relative">
        {/* Multiple pulsing rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border-2 border-neon-teal/30 rounded-2xl pointer-events-none"
            animate={{
              scale: [1, 2.5, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
            }}
          />
        ))}

        {/* Main button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            rotate: isOpen ? 135 : 0,
          }}
          transition={{ duration: 0.3, type: "spring" }}
          className="relative w-16 h-16 bg-gradient-to-br from-neon-teal via-electric-pink to-warm-yellow rounded-2xl shadow-2xl overflow-hidden group"
          style={{
            boxShadow: '0 8px 32px rgba(29, 233, 182, 0.5)',
          }}
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Icon container */}
          <motion.div
            animate={{
              rotate: isOpen ? -135 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="relative z-10 flex items-center justify-center h-full"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.svg 
                  key="close"
                  className="w-8 h-8 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </motion.svg>
              ) : (
                <motion.svg 
                  key="plus"
                  className="w-8 h-8 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Glowing border */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-white/50"
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.button>

        {/* Success feedback particles */}
        <AnimatePresence>
          {isOpen && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-electric-pink rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: [0, (Math.random() - 0.5) * 100],
                    y: [0, (Math.random() - 0.5) * 100],
                  }}
                  exit={{ scale: 0 }}
                  transition={{
                    duration: 1,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};