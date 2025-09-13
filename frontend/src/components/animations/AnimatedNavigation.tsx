import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedNavigationProps {
  tabs: Array<{
    id: string;
    name: string;
    icon: string;
    mobileIcon?: string;
  }>;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  isDiscreetMode: boolean;
}

export const AnimatedNavigation: React.FC<AnimatedNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  isDiscreetMode,
}) => {
  const [indicatorProps, setIndicatorProps] = useState({ width: 0, left: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    const activeTabElement = tabRefs.current[activeTab];
    if (activeTabElement && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const tabRect = activeTabElement.getBoundingClientRect();
      
      setIndicatorProps({
        width: tabRect.width - 8, // Account for padding
        left: tabRect.left - navRect.left + 4, // Center with padding
      });
    }
  }, [activeTab]);

  return (
    <>
      {/* Enhanced Desktop Navigation */}
      <div className="desktop-nav relative">
        <motion.div 
          className="glass rounded-2xl shadow-2xl border border-white/20 p-2 relative overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-neon-teal/5 via-electric-pink/5 to-warm-yellow/5 opacity-50"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <nav ref={navRef} className="flex space-x-2 relative z-10">
            {/* Enhanced Animated Indicator */}
            <motion.div
              className="absolute bottom-1 h-1 rounded-full"
              animate={{
                width: indicatorProps.width,
                x: indicatorProps.left,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
              style={{
                background: 'linear-gradient(90deg, var(--neon-teal), var(--electric-pink))',
                boxShadow: '0 0 20px rgba(29, 233, 182, 0.6)',
              }}
            />

            {/* Glowing background for active tab */}
            <motion.div
              className="absolute top-1 bottom-1 rounded-xl bg-gradient-to-r from-neon-teal/10 to-electric-pink/10"
              animate={{
                width: indicatorProps.width + 8,
                x: indicatorProps.left - 4,
                opacity: activeTab ? 1 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
            />

            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[tab.id] = el;
                }}
                onClick={() => onTabChange(tab.id)}
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                }}
                whileTap={{ scale: 0.95 }}
                className={`
                  flex-1 flex items-center justify-center space-x-3 py-4 px-6 rounded-xl 
                  text-sm font-medium transition-all duration-300 relative z-20 group
                  ${activeTab === tab.id
                    ? 'text-neon-teal font-semibold'
                    : 'text-gray-600 hover:text-gray-800'
                  }
                `}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-teal/5 to-electric-pink/5 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />

                <motion.span
                  className="relative z-10 text-xl"
                  animate={{
                    scale: activeTab === tab.id ? 1.2 : 1,
                    rotate: activeTab === tab.id ? [0, 10, -10, 0] : 0,
                  }}
                  transition={{ 
                    scale: { duration: 0.3 },
                    rotate: { duration: 2, repeat: activeTab === tab.id ? Infinity : 0 }
                  }}
                >
                  {tab.icon}
                </motion.span>
                <span className="relative z-10">{tab.name}</span>
                
                {/* Active tab sparkle effect */}
                <AnimatePresence>
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute top-2 right-2 w-2 h-2 bg-electric-pink rounded-full"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [0, 1.5, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </nav>
        </motion.div>
      </div>

      {/* Enhanced Mobile Bottom Navigation */}
      <motion.div 
        className="mobile-nav glass border-t border-white/20 shadow-2xl"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-neon-teal/5 via-electric-pink/5 to-warm-yellow/5"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <nav className="flex justify-around items-center p-4 relative z-10">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center space-y-2 py-3 px-4 relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Enhanced Active Tab Background */}
              <AnimatePresence>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="mobile-tab-indicator"
                    className="absolute inset-0 bg-gradient-to-r from-neon-teal/20 to-electric-pink/20 rounded-2xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>

              {/* Hover effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-neon-teal/10 to-electric-pink/10 rounded-2xl opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />

              {/* Enhanced Icon with pulsing ring */}
              <div className="relative">
                <motion.div
                  className={`text-2xl relative z-10 ${
                    activeTab === tab.id ? 'text-neon-teal' : 'text-gray-400'
                  }`}
                  animate={{
                    scale: activeTab === tab.id ? 1.15 : 1,
                    y: activeTab === tab.id ? -3 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {tab.mobileIcon || tab.icon}
                </motion.div>

                {/* Pulsing ring for active tab */}
                <AnimatePresence>
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute inset-0 border-2 border-neon-teal/30 rounded-full"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ 
                        scale: [0.8, 1.4, 0.8],
                        opacity: [0, 0.6, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Enhanced Label */}
              <motion.span
                className={`text-xs font-medium relative z-10 ${
                  activeTab === tab.id ? 'text-neon-teal font-semibold' : 'text-gray-400'
                }`}
                animate={{
                  opacity: activeTab === tab.id ? 1 : 0.7,
                  y: activeTab === tab.id ? -1 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                {tab.name.split(' ')[0]}
              </motion.span>

              {/* Enhanced Active Indicator */}
              <AnimatePresence>
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute -top-2 w-2 h-2 bg-gradient-to-r from-neon-teal to-electric-pink rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0, 1.2, 1],
                      opacity: [0, 1, 1],
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
              </AnimatePresence>

              {/* Notification badge (demo) */}
              {(tab.id === 'peer' || tab.id === 'journal') && (
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-electric-pink rounded-full flex items-center justify-center"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <div className="w-1 h-1 bg-white rounded-full" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </nav>
      </motion.div>
    </>
  );
};