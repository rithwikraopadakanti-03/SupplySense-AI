import React from 'react';

type RiskLevel = 'critical' | 'high' | 'medium' | 'low';

export function RiskBadge({ level }: { level: RiskLevel }) {
  const config = {
    critical: { color: 'text-red-400', bg: 'bg-red-400/10', dot: 'bg-red-400', border: 'border-red-400/20' },
    high: { color: 'text-orange-400', bg: 'bg-orange-400/10', dot: 'bg-orange-400', border: 'border-orange-400/20' },
    medium: { color: 'text-yellow-400', bg: 'bg-yellow-400/10', dot: 'bg-yellow-400', border: 'border-yellow-400/20' },
    low: { color: 'text-green-400', bg: 'bg-green-400/10', dot: 'bg-green-400', border: 'border-green-400/20' }
  };
  const { color, bg, dot, border } = config[level] || config.low;
  return (
    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${color} border ${border}`}>
      <span className="relative flex h-2 w-2 mr-1.5">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dot}`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 ${dot}`}></span>
      </span>
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </div>
  );
}
