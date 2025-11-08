import React from 'react';
import { TrendingUp, MessageCircle, Twitter, Zap } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { SentimentPulse } from '../ui/SentimentPulse';

export function AlertsCard() {
  const { alerts } = useStore();

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    return `${Math.floor(diffMins / 60)}h ago`;
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-textPrimary">Live Signals</h3>
          <p className="text-sm text-textSecondary">{alerts.length} active alerts</p>
        </div>
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow"></div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="p-4 bg-surfaceElevated rounded-lg border border-border hover:border-primary/30 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-accent">
                    {alert.tokenSymbol.slice(0, 2)}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-textPrimary">{alert.tokenSymbol}</h4>
                  <p className="text-xs text-textSecondary">
                    {formatTimeAgo(alert.triggeredAt)}
                  </p>
                </div>
              </div>
              <SentimentPulse score={alert.sentimentScore} variant={alert.alertType} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div className="flex items-center gap-2 text-textSecondary">
                <Twitter className="w-3 h-3" />
                <span>{alert.twitterMentions24h.toLocaleString()} mentions</span>
              </div>
              <div className="flex items-center gap-2 text-textSecondary">
                <MessageCircle className="w-3 h-3" />
                <span>{alert.farcasterCasts24h} casts</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <TrendingUp className="w-3 h-3" />
                <span>+{alert.volumeSpike}% volume</span>
              </div>
              <div className="flex items-center gap-2 text-accent">
                <Zap className="w-3 h-3" />
                <span>Trending #1</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="frame-button-primary text-xs px-4 py-2 flex-1 group-hover:shadow-glow transition-all">
                Quick Buy 0.1 SOL
              </button>
              <button className="frame-button-secondary text-xs px-3 py-2">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full frame-button-secondary text-sm">
          View All Signals
        </button>
      </div>
    </div>
  );
}