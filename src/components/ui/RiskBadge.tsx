import React from 'react';
import { AlertTriangle, Shield, CheckCircle } from 'lucide-react';

interface RiskBadgeProps {
  score: number;
  variant?: 'safe' | 'caution' | 'danger';
}

export function RiskBadge({ score, variant }: RiskBadgeProps) {
  const getVariant = () => {
    if (variant) return variant;
    if (score <= 30) return 'safe';
    if (score <= 70) return 'caution';
    return 'danger';
  };

  const currentVariant = getVariant();

  const config = {
    safe: {
      icon: CheckCircle,
      label: 'Low Risk',
      className: 'bg-primary/20 text-primary border-primary/30',
    },
    caution: {
      icon: AlertTriangle,
      label: 'Medium Risk',
      className: 'bg-warning/20 text-warning border-warning/30',
    },
    danger: {
      icon: AlertTriangle,
      label: 'High Risk',
      className: 'bg-danger/20 text-danger border-danger/30',
    },
  };

  const { icon: Icon, label, className } = config[currentVariant];

  return (
    <div className={`flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-medium ${className}`}>
      <Icon className="w-3 h-3" />
      <span>{label}</span>
      <span className="opacity-70">({score})</span>
    </div>
  );
}