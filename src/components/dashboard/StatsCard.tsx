import { ReactNode } from 'react';

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
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-200"></div>
      <div className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-3 hover:bg-white/10 transition duration-200">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="text-blue-400 text-sm">{icon}</div>
            <div className="text-gray-300 text-xs font-medium">{title}</div>
          </div>
          <div className="text-sm font-semibold text-white">{value}</div>
        </div>
        {trend && (
          <div className={`text-xs mt-1 ${trend.isPositive ? 'text-green-400' : 'text-red-400'} flex items-center gap-1`}>
            <span>{trend.isPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(trend.value)}%</span>
            <span className="text-gray-400">vs. semana</span>
          </div>
        )}
      </div>
    </div>
  );
} 