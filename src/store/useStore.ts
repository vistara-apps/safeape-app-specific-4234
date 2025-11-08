import { create } from 'zustand';

interface User {
  fid?: string;
  walletAddress?: string;
  dailyLossLimit: number;
  weeklyLossLimit: number;
  currentDailyLoss: number;
  currentWeeklyLoss: number;
  isPaused: boolean;
  subscriptionTier: 'free' | 'premium';
  creditsBalance: number;
}

interface TradePosition {
  id: string;
  tokenMint: string;
  tokenSymbol: string;
  entryPrice: number;
  currentPrice: number;
  positionSize: number;
  pnl: number;
  status: 'open' | 'closed' | 'paused';
  riskScore: number;
  openedAt: Date;
}

interface SentimentAlert {
  id: string;
  tokenMint: string;
  tokenSymbol: string;
  sentimentScore: number;
  twitterMentions24h: number;
  farcasterCasts24h: number;
  volumeSpike: number;
  alertType: 'bullish' | 'bearish' | 'neutral';
  triggeredAt: Date;
}

interface Store {
  user: User;
  positions: TradePosition[];
  alerts: SentimentAlert[];
  setUser: (user: Partial<User>) => void;
  addPosition: (position: TradePosition) => void;
  updatePosition: (id: string, updates: Partial<TradePosition>) => void;
  addAlert: (alert: SentimentAlert) => void;
  clearAlerts: () => void;
}

export const useStore = create<Store>((set) => ({
  user: {
    dailyLossLimit: 0.5,
    weeklyLossLimit: 2.0,
    currentDailyLoss: 0.12,
    currentWeeklyLoss: 0.34,
    isPaused: false,
    subscriptionTier: 'free',
    creditsBalance: 250,
  },
  positions: [
    {
      id: '1',
      tokenMint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
      tokenSymbol: 'BONK',
      entryPrice: 0.000012,
      currentPrice: 0.000015,
      positionSize: 0.1,
      pnl: 0.025,
      status: 'open',
      riskScore: 25,
      openedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: '2',
      tokenMint: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm',
      tokenSymbol: 'WIF',
      entryPrice: 2.45,
      currentPrice: 2.12,
      positionSize: 0.2,
      pnl: -0.027,
      status: 'open',
      riskScore: 45,
      openedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    },
  ],
  alerts: [
    {
      id: '1',
      tokenMint: 'So11111111111111111111111111111111111111112',
      tokenSymbol: 'PEPE',
      sentimentScore: 87,
      twitterMentions24h: 1240,
      farcasterCasts24h: 89,
      volumeSpike: 340,
      alertType: 'bullish',
      triggeredAt: new Date(Date.now() - 15 * 60 * 1000),
    },
    {
      id: '2',
      tokenMint: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So',
      tokenSymbol: 'DOGE',
      sentimentScore: 92,
      twitterMentions24h: 2100,
      farcasterCasts24h: 156,
      volumeSpike: 520,
      alertType: 'bullish',
      triggeredAt: new Date(Date.now() - 8 * 60 * 1000),
    },
  ],
  setUser: (userData) =>
    set((state) => ({
      user: { ...state.user, ...userData },
    })),
  addPosition: (position) =>
    set((state) => ({
      positions: [...state.positions, position],
    })),
  updatePosition: (id, updates) =>
    set((state) => ({
      positions: state.positions.map((pos) =>
        pos.id === id ? { ...pos, ...updates } : pos
      ),
    })),
  addAlert: (alert) =>
    set((state) => ({
      alerts: [alert, ...state.alerts],
    })),
  clearAlerts: () =>
    set(() => ({
      alerts: [],
    })),
}));