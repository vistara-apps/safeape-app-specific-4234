import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SentimentPulseProps {
  score: number;
  variant?: 'bullish' | 'bearish' | 'neutral';
}

export function SentimentPulse({ score, variant }: SentimentPulseProps) {
  const getVariant = () => {
    if (variant) return variant;
    if (score >= 70) return 'bullish';
    if (score <= 30) return 'bearish';
    return 'neutral';
  };

  const currentVariant = getVariant();

  const config = {
    bullish: {
      icon: TrendingUp,
      className: 'bg-primary/20 text-primary border-primary/30 animate-pulse-glow',
      label: 'Bullish',
    },
    bearish: {
      icon: TrendingDown,
      className: 'bg-danger/20 text-danger border-danger/30',
      label: 'Bearish',
    },
    neutral: {
      icon: Minus,
      className: 'bg-textSecondary/20 text-textSecondary border-textSecondary/30',
      label: 'Neutral',
    },
  };

  const { icon: Icon, className, label } = config[currentVariant];

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${className}`}>
      <Icon className="w-4 h-4" />
      <div className="text-right">
        <div className="text-sm font-bold">{score}/100</div>
        <div className="text-xs opacity-80">{label}</div>
      </div>
    </div>
  );
}