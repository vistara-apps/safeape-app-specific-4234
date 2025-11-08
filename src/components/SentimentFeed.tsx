import React, { useState } from 'react';
import { Search, Filter, Zap, TrendingUp } from 'lucide-react';
import { SentimentPulse } from './ui/SentimentPulse';
import { RiskBadge } from './ui/RiskBadge';

export function SentimentFeed() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const mockSignals = [
    {
      id: '1',
      symbol: 'PEPE',
      score: 92,
      price: '$0.000012',
      change24h: '+340%',
      volume: '$2.4M',
      mentions: 1240,
      riskScore: 25,
      trending: true,
    },
    {
      id: '2',
      symbol: 'DOGE',
      score: 87,
      price: '$0.087',
      change24h: '+180%',
      volume: '$890K',
      mentions: 890,
      riskScore: 35,
      trending: true,
    },
    {
      id: '3',
      symbol: 'SHIB',
      score: 75,
      price: '$0.000008',
      change24h: '+95%',
      volume: '$1.2M',
      mentions: 567,
      riskScore: 45,
      trending: false,
    },
    {
      id: '4',
      symbol: 'BONK',
      score: 68,
      price: '$0.000015',
      change24h: '+45%',
      volume: '$650K',
      mentions: 234,
      riskScore: 30,
      trending: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-textPrimary">Sentiment Signals</h2>
          <p className="text-textSecondary">Real-time memecoin buzz tracking</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow"></div>
          <span className="text-sm text-primary font-medium">Live</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-textSecondary" />
          <input
            type="text"
            placeholder="Search tokens..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-lg text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 bg-surface border border-border rounded-lg text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Signals</option>
            <option value="bullish">Bullish Only</option>
            <option value="trending">Trending</option>
            <option value="low-risk">Low Risk</option>
          </select>
          
          <button className="frame-button-secondary">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Signals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockSignals.map((signal) => (
          <div
            key={signal.id}
            className="card-elevated p-6 hover:shadow-glow transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-accent">
                    {signal.symbol.slice(0, 2)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-textPrimary">{signal.symbol}</h3>
                  <p className="text-sm text-textSecondary">{signal.price}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {signal.trending && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-accent/20 text-accent rounded-md text-xs">
                    <Zap className="w-3 h-3" />
                    <span>Trending</span>
                  </div>
                )}
                <SentimentPulse score={signal.score} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-textSecondary">24h Change</p>
                <p className="text-sm font-semibold text-primary">{signal.change24h}</p>
              </div>
              <div>
                <p className="text-xs text-textSecondary">Volume</p>
                <p className="text-sm font-semibold text-textPrimary">{signal.volume}</p>
              </div>
              <div>
                <p className="text-xs text-textSecondary">Mentions</p>
                <p className="text-sm font-semibold text-textPrimary">{signal.mentions}</p>
              </div>
              <div>
                <p className="text-xs text-textSecondary">Risk</p>
                <RiskBadge score={signal.riskScore} />
              </div>
            </div>

            <div className="flex gap-2">
              <button className="frame-button-primary flex-1 group-hover:shadow-glow transition-all">
                <TrendingUp className="w-4 h-4 mr-2" />
                Quick Buy
              </button>
              <button className="frame-button-secondary px-4">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="frame-button-secondary">
          Load More Signals
        </button>
      </div>
    </div>
  );
}