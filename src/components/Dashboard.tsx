import React from 'react';
import { GuardrailCard } from './cards/GuardrailCard';
import { PositionsCard } from './cards/PositionsCard';
import { AlertsCard } from './cards/AlertsCard';
import { StatsCard } from './cards/StatsCard';

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total PnL"
          value="+0.34 SOL"
          subtitle="This week"
          trend="up"
          icon="📈"
        />
        <StatsCard
          title="Win Rate"
          value="68%"
          subtitle="Last 30 trades"
          trend="up"
          icon="🎯"
        />
        <StatsCard
          title="Saved from Rugs"
          value="12"
          subtitle="Scams blocked"
          trend="neutral"
          icon="🛡️"
        />
        <StatsCard
          title="Active Signals"
          value="3"
          subtitle="Bullish alerts"
          trend="up"
          icon="🚨"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <GuardrailCard />
          <PositionsCard />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <AlertsCard />
        </div>
      </div>
    </div>
  );
}