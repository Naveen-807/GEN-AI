import React from "react";

interface MoodParticlesProps {
  mood: 'calm' | 'stressed' | 'excited' | 'neutral';
}

export const MoodParticles: React.FC<MoodParticlesProps> = ({ mood }) => {
  const getParticleCount = () => {
    switch (mood) {
      case 'calm': return 15;
      case 'stressed': return 40;
      case 'excited': return 50;
      default: return 25;
    }
  };

  const getParticleColor = () => {
    switch (mood) {
      case 'calm': return '#A6C0FE';
      case 'stressed': return '#FF6EC7';
      case 'excited': return '#FCCF31';
      default: return '#1DE9B6';
    }
  };

  const getAnimationSpeed = () => {
    switch (mood) {
      case 'calm': return '20s';
      case 'stressed': return '3s';
      case 'excited': return '1s';
      default: return '10s';
    }
  };

  return (
    <div className="particles-container">
      {[...Array(getParticleCount())].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full opacity-30"
          style={{
            backgroundColor: getParticleColor(),
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${getAnimationSpeed()} infinite linear`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
      
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
            50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
            100% { transform: translateY(-40px) translateX(-5px); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};