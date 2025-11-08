import React from 'react';
import { TrendingUp, TrendingDown, Clock, AlertTriangle } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { RiskBadge } from '../ui/RiskBadge';

export function PositionsCard() {
  const { positions } = useStore();

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours}h ${diffMins}m ago`;
    }
    return `${diffMins}m ago`;
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-textPrimary">Active Positions</h3>
          <p className="text-sm text-textSecondary">{positions.length} open trades</p>
        </div>
        <button className="frame-button-secondary text-sm">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {positions.map((position) => (
          <div
            key={position.id}
            className="p-4 bg-surfaceElevated rounded-lg border border-border hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-accent">
                    {position.tokenSymbol.slice(0, 2)}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-textPrimary">{position.tokenSymbol}</h4>
                  <p className="text-xs text-textSecondary">
                    {position.positionSize} SOL • {formatTimeAgo(position.openedAt)}
                  </p>
                </div>
              </div>
              <RiskBadge score={position.riskScore} />
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-textSecondary text-xs">Entry</p>
                <p className="font-mono text-textPrimary">
                  ${position.entryPrice.toFixed(6)}
                </p>
              </div>
              <div>
                <p className="text-textSecondary text-xs">Current</p>
                <p className="font-mono text-textPrimary">
                  ${position.currentPrice.toFixed(6)}
                </p>
              </div>
              <div>
                <p className="text-textSecondary text-xs">PnL</p>
                <div className={`flex items-center gap-1 ${
                  position.pnl >= 0 ? 'text-primary' : 'text-danger'
                }`}>
                  {position.pnl >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span className="font-mono">
                    {position.pnl >= 0 ? '+' : ''}{position.pnl.toFixed(3)} SOL
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
              <div className="flex items-center gap-2 text-xs text-textSecondary">
                <Clock className="w-3 h-3" />
                <span>Auto-close at -10%</span>
              </div>
              <div className="flex gap-2">
                <button className="frame-button-secondary text-xs px-3 py-1">
                  Close
                </button>
                <button className="frame-button-primary text-xs px-3 py-1">
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}