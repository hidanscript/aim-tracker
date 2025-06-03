import { ReactNode } from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatsCard({ title, value, icon, trend }: StatsCardProps) {
  return (
    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
      <div className="flex items-center justify-between mb-4">
        <div className="text-zinc-400 text-sm font-medium truncate max-w-[70%]">{title}</div>
        <div className="text-zinc-500 flex-shrink-0">{icon}</div>
      </div>
      
      <div className="flex items-baseline gap-2">
        <div className="text-2xl font-semibold text-zinc-100">{value}</div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${
            trend.isPositive ? 'text-zinc-400' : 'text-zinc-400'
          }`}>
            {trend.isPositive ? (
              <FiTrendingUp className="w-3 h-3" />
            ) : (
              <FiTrendingDown className="w-3 h-3" />
            )}
            <span>{trend.value.toFixed(1)}%</span>
          </div>
        )}
      </div>
    </div>
  );
} 