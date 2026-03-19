// components/results/ScoreCard.tsx
import React from 'react';

type ScoreCardProps = {
  title: string;
  score: number;
};

const ScoreCard: React.FC<ScoreCardProps> = ({ title, score }) => {
  const getRingColor = (s: number) => {
    if (s >= 90) return 'text-emerald-500';
    if (s >= 70) return 'text-amber-500';
    return 'text-red-500';
  };

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * score) / 100;

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 ease-in-out hover:border-indigo-200 hover:shadow-xl">
      <div className="relative size-40">
        <svg className="size-full -rotate-90" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#e5e7eb" // Gray-200
            strokeWidth="12"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${getRingColor(score)} transition-all duration-500 ease-out`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-5xl font-black ${getRingColor(score)}`}>{score}</span>
          <span className="text-lg font-bold text-gray-700">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
