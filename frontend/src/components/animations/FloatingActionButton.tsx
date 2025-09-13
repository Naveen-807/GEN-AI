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
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Quick Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed bottom-24 right-6 flex flex-col gap-3 z-50">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  transition: { delay: index * 0.1, type: "spring", stiffness: 300 }
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0, 
                  y: 20,
                  transition: { delay: (quickActions.length - index - 1) * 0.05 }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  action.action();
                  setIsOpen(false);
                }}
                className={`
                  group relative flex items-center justify-center w-14 h-14
                  bg-gradient-to-r ${action.gradient} rounded-full
                  shadow-lg hover:shadow-xl transition-all duration-300
                  glow-neon
                `}
              >
                <span className="text-2xl">{action.icon}</span>
                
                {/* Tooltip */}
                <div className="absolute right-16 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {action.label}
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          rotate: isOpen ? 45 : 0,
        }}
        className="fab"
      >
        <motion.div
          animate={{
            rotate: isOpen ? -45 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          )}
        </motion.div>
      </motion.button>

      {/* Pulse Ring Animation */}
      <motion.div
        className="absolute bottom-8 right-8 w-16 h-16 border-2 border-neon-teal rounded-full pointer-events-none"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
};