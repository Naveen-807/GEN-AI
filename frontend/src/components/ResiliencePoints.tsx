import React, { useState, useEffect } from 'react';

interface ResiliencePointsProps {
  userId: string;
}

interface PointsData {
  points: number;
  level: string;
  nextLevel: number;
  achievements: string[];
}

export const ResiliencePoints: React.FC<ResiliencePointsProps> = ({ userId }) => {
  const [pointsData, setPointsData] = useState<PointsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/resilience-points/${userId}`);
        const data = await response.json();
        setPointsData(data);
      } catch (error) {
        console.error('Error fetching resilience points:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, [userId]);

  if (loading) {
    return <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>;
  }

  if (!pointsData) {
    return <div className="text-red-500">Failed to load resilience points</div>;
  }

  const progress = (pointsData.points / pointsData.nextLevel) * 100;

  return (
    <div className="bg-gradient-to-r from-wellness-blue to-wellness-purple p-6 rounded-xl text-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Resilience Points</h3>
        <span className="text-3xl font-bold">{pointsData.points} RP</span>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span>{pointsData.level}</span>
          <span>Next: {pointsData.nextLevel} RP</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Recent Achievements</h4>
        <div className="flex flex-wrap gap-2">
          {pointsData.achievements.map((achievement, index) => (
            <span 
              key={index}
              className="bg-white/20 px-2 py-1 rounded-full text-xs"
            >
              🏆 {achievement}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};