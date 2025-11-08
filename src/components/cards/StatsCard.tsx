import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
}

export function StatsCard({ title, value, subtitle, trend, icon }: StatsCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-primary" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-danger" />;
      default:
        return <Minus className="w-4 h-4 text-textSecondary" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-primary';
      case 'down':
        return 'text-danger';
      default:
        return 'text-textSecondary';
    }
  };

  return (
    <div className="card p-4 hover:shadow-elevated transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        {getTrendIcon()}
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-textSecondary mb-1">{title}</h3>
        <p className={`text-2xl font-bold mb-1 ${getTrendColor()}`}>{value}</p>
        <p className="text-xs text-textSecondary">{subtitle}</p>
      </div>
    </div>
  );
}