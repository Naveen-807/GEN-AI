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
      {/* Desktop Navigation */}
      <div className="desktop-nav bg-white rounded-xl shadow-sm border border-gray-200 p-1 relative">
        <nav ref={navRef} className="flex space-x-1 relative">
          {/* Animated Indicator */}
          <motion.div
            className="nav-indicator absolute bottom-0 h-1 rounded-full"
            animate={{
              width: indicatorProps.width,
              x: indicatorProps.left,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            style={{
              background: 'linear-gradient(90deg, var(--neon-teal), var(--electric-pink))',
            }}
          />

          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              onClick={() => onTabChange(tab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg 
                text-sm font-medium transition-all duration-300 relative z-10
                ${activeTab === tab.id
                  ? 'text-neon-teal font-semibold'
                  : 'text-gray-600 hover:text-gray-800'
                }
              `}
            >
              <motion.span
                animate={{
                  scale: activeTab === tab.id ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {tab.icon}
              </motion.span>
              <span>{tab.name}</span>
            </motion.button>
          ))}
        </nav>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="mobile-nav p-4">
        <nav className="flex justify-around items-center">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center space-y-1 py-2 px-3 relative"
            >
              {/* Active Tab Background */}
              <AnimatePresence>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="mobile-tab-indicator"
                    className="absolute inset-0 bg-primary-gradient rounded-lg opacity-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>

              {/* Icon */}
              <motion.div
                className={`text-2xl relative z-10 ${
                  activeTab === tab.id ? 'text-neon-teal' : 'text-gray-400'
                }`}
                animate={{
                  scale: activeTab === tab.id ? 1.1 : 1,
                  y: activeTab === tab.id ? -2 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                {tab.mobileIcon || tab.icon}
              </motion.div>

              {/* Label */}
              <motion.span
                className={`text-xs font-medium relative z-10 ${
                  activeTab === tab.id ? 'text-neon-teal' : 'text-gray-400'
                }`}
                animate={{
                  opacity: activeTab === tab.id ? 1 : 0.7,
                }}
                transition={{ duration: 0.2 }}
              >
                {tab.name.split(' ')[0]} {/* Show only first word on mobile */}
              </motion.span>

              {/* Active Indicator Dot */}
              <AnimatePresence>
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute -top-1 w-1 h-1 bg-neon-teal rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </nav>
      </div>
    </>
  );
};