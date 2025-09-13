import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ResiliencePointsProps {
  userId: string;
}

interface PointsData {
  points: number;
  level: string;
  nextLevel: number;
  achievements: string[];
}

interface Confetti {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

export const ResiliencePoints: React.FC<ResiliencePointsProps> = ({ userId }) => {
  const [pointsData, setPointsData] = useState<PointsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        // Simulate API call with mock data for demo
        setTimeout(() => {
          setPointsData({
            points: 1250,
            level: "Resilience Builder",
            nextLevel: 1500,
            achievements: ["First Journal", "Week Streak", "Peer Helper"]
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching resilience points:', error);
        setLoading(false);
      }
    };

    fetchPoints();
  }, [userId]);

  const triggerConfetti = () => {
    const newConfetti: Confetti[] = [];
    for (let i = 0; i < 20; i++) {
      newConfetti.push({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: Math.random() > 0.5 ? '#1DE9B6' : '#FF6EC7',
        size: Math.random() * 8 + 4,
      });
    }
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 3000);
  };

  if (loading) {
    return (
      <motion.div 
        className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="animate-pulse">
          <div className="h-6 bg-white/20 rounded mb-4"></div>
          <div className="h-16 bg-white/20 rounded mb-4"></div>
          <div className="h-4 bg-white/20 rounded"></div>
        </div>
      </motion.div>
    );
  }

  if (!pointsData) {
    return <div className="text-red-500">Failed to load resilience points</div>;
  }

  const progress = (pointsData.points / pointsData.nextLevel) * 100;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative bg-primary-gradient p-6 rounded-xl text-white shadow-lg hover-lift cursor-pointer overflow-hidden"
      onClick={triggerConfetti}
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-neon-teal/20 to-electric-pink/20"
        animate={{
          scale: isHovered ? 1.05 : 1,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Confetti Animation */}
      <AnimatePresence>
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute pointer-events-none"
            style={{
              left: `${piece.x}%`,
              top: `${piece.y}%`,
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.color,
            }}
            initial={{ opacity: 1, scale: 0, y: 0 }}
            animate={{
              opacity: 0,
              scale: 1,
              y: -100,
              rotate: 360,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <motion.h3 
            className="text-xl font-bold text-primary-gradient"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            Resilience Points
          </motion.h3>
          <motion.span 
            className="text-3xl font-bold"
            animate={{
              scale: inView ? 1 : 0,
            }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            {pointsData.points} RP
          </motion.span>
        </div>

        {/* Circular Progress Meter */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-32 h-32">
            {/* Background Circle */}
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="8"
                fill="transparent"
              />
              {/* Progress Circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#progressGradient)"
                strokeWidth="8"
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={inView ? { strokeDashoffset } : {}}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className={isHovered ? "glow-neon" : ""}
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1DE9B6" />
                  <stop offset="100%" stopColor="#FF6EC7" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                className="text-2xl font-bold"
                animate={{
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {Math.round(progress)}%
              </motion.div>
              <div className="text-sm opacity-75">{pointsData.level}</div>
            </div>

            {/* Floating Particles on Hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-neon-teal rounded-full"
                      style={{
                        left: `${50 + 30 * Math.cos((i * 60 * Math.PI) / 180)}%`,
                        top: `${50 + 30 * Math.sin((i * 60 * Math.PI) / 180)}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.1,
                        repeat: Infinity,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Progress Info */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2 opacity-90">
            <span>Current: {pointsData.level}</span>
            <span>Next: {pointsData.nextLevel} RP</span>
          </div>
          <div className="text-center text-xs opacity-75">
            {pointsData.nextLevel - pointsData.points} RP to next level
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h4 className="text-sm font-medium mb-3 opacity-90">Recent Achievements</h4>
          <div className="flex flex-wrap gap-2">
            {pointsData.achievements.map((achievement, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs border border-white/30 hover:bg-white/30 transition-all duration-200"
              >
                🏆 {achievement}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Level Up Hint */}
        <motion.div
          className="absolute top-2 right-2 text-xs opacity-60"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Click for celebration! ✨
        </motion.div>
      </div>
    </motion.div>
  );
};