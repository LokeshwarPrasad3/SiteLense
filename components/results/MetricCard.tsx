// components/results/MetricCard.tsx
import React from 'react';

type MetricCardProps = {
  label: string;
  value: string;
};

const MetricCard: React.FC<MetricCardProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col items-start justify-center rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 ease-in-out hover:border-indigo-200 hover:shadow-xl">
      <div className="mb-2 text-sm font-bold tracking-wider text-gray-500 uppercase">{label}</div>
      <div className="text-3xl font-black text-gray-900">{value}</div>
    </div>
  );
};

export default MetricCard;
