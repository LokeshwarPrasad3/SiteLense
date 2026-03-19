// components/results/OpportunityCard.tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';

type OpportunityCardProps = {
  title: string;
  description: string;
  displayValue?: string;
};

const OpportunityCard: React.FC<OpportunityCardProps> = ({ title, description, displayValue }) => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 ease-in-out hover:border-indigo-200 hover:shadow-xl">
      <div className="mb-2 flex items-start justify-between">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        {displayValue && (
          <span className="text-sm font-semibold text-indigo-600">{displayValue}</span>
        )}
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default OpportunityCard;
