import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Shield, Zap } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Header() {
  const { user } = useStore();

  return (
    <header className="border-b border-border bg-surface/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-xl">🦍</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-textPrimary">SafeApe</h1>
              <p className="text-xs text-textSecondary">AI Trading Guardian</p>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="hidden md:flex items-center gap-4">
            {/* SOL Balance */}
            <div className="flex items-center gap-2 px-3 py-2 bg-surfaceElevated rounded-lg">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm font-mono">2.45 SOL</span>
            </div>

            {/* Guard Status */}
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              user.isPaused 
                ? 'bg-danger/20 text-danger' 
                : 'bg-primary/20 text-primary'
            }`}>
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">
                {user.isPaused ? 'Paused' : 'Active'}
              </span>
            </div>

            {/* Credits */}
            <div className="flex items-center gap-2 px-3 py-2 bg-surfaceElevated rounded-lg">
              <span className="text-sm text-textSecondary">Credits:</span>
              <span className="text-sm font-medium">{user.creditsBalance}¢</span>
            </div>
          </div>

          {/* Wallet Connection */}
          <ConnectButton />
        </div>

        {/* Mobile Status Bar */}
        <div className="md:hidden mt-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="font-mono">2.45 SOL</span>
            <span className={user.isPaused ? 'text-danger' : 'text-primary'}>
              {user.isPaused ? '⏸️ Paused' : '🛡️ Active'}
            </span>
          </div>
          <span className="text-textSecondary">{user.creditsBalance}¢</span>
        </div>
      </div>
    </header>
  );
}