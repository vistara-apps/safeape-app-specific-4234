import React, { useState } from 'react';
import { Shield, Settings, Play, Pause } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { motion } from 'framer-motion';

export function GuardrailCard() {
  const { user, setUser } = useStore();
  const [showSettings, setShowSettings] = useState(false);

  const dailyUsagePercent = (user.currentDailyLoss / user.dailyLossLimit) * 100;
  const weeklyUsagePercent = (user.currentWeeklyLoss / user.weeklyLossLimit) * 100;

  const togglePause = () => {
    setUser({ isPaused: !user.isPaused });
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            user.isPaused ? 'bg-danger/20' : 'bg-primary/20'
          }`}>
            <Shield className={`w-5 h-5 ${user.isPaused ? 'text-danger' : 'text-primary'}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-textPrimary">Loss Guardrails</h3>
            <p className="text-sm text-textSecondary">
              {user.isPaused ? 'Trading paused' : 'Actively monitoring'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-surfaceElevated rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4 text-textSecondary" />
          </button>
          <button
            onClick={togglePause}
            className={`frame-button ${user.isPaused ? 'frame-button-primary' : 'frame-button-secondary'}`}
          >
            {user.isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            <span className="ml-2">{user.isPaused ? 'Resume' : 'Pause'}</span>
          </button>
        </div>
      </div>

      {/* Loss Limit Bars */}
      <div className="space-y-4">
        {/* Daily Limit */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-textPrimary">Daily Limit</span>
            <span className="text-sm text-textSecondary">
              {user.currentDailyLoss.toFixed(3)} / {user.dailyLossLimit.toFixed(1)} SOL
            </span>
          </div>
          <div className="w-full bg-surface rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full transition-all duration-500 ${
                dailyUsagePercent > 90 ? 'bg-danger' : 
                dailyUsagePercent > 70 ? 'bg-warning' : 'bg-primary'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(dailyUsagePercent, 100)}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <p className="text-xs text-textSecondary mt-1">
            {dailyUsagePercent.toFixed(1)}% used • Resets in 14h 23m
          </p>
        </div>

        {/* Weekly Limit */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-textPrimary">Weekly Limit</span>
            <span className="text-sm text-textSecondary">
              {user.currentWeeklyLoss.toFixed(3)} / {user.weeklyLossLimit.toFixed(1)} SOL
            </span>
          </div>
          <div className="w-full bg-surface rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full transition-all duration-500 ${
                weeklyUsagePercent > 90 ? 'bg-danger' : 
                weeklyUsagePercent > 70 ? 'bg-warning' : 'bg-primary'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(weeklyUsagePercent, 100)}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            />
          </div>
          <p className="text-xs text-textSecondary mt-1">
            {weeklyUsagePercent.toFixed(1)}% used • Resets in 3d 14h
          </p>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-6 pt-6 border-t border-border"
        >
          <h4 className="text-sm font-medium text-textPrimary mb-4">Adjust Limits</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-textSecondary mb-2">
                Daily Loss Limit (SOL)
              </label>
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={user.dailyLossLimit}
                onChange={(e) => setUser({ dailyLossLimit: parseFloat(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-textSecondary mt-1">
                <span>0.1</span>
                <span>{user.dailyLossLimit.toFixed(1)} SOL</span>
                <span>5.0</span>
              </div>
            </div>
            
            <div>
              <label className="block text-xs text-textSecondary mb-2">
                Weekly Loss Limit (SOL)
              </label>
              <input
                type="range"
                min="0.5"
                max="20"
                step="0.5"
                value={user.weeklyLossLimit}
                onChange={(e) => setUser({ weeklyLossLimit: parseFloat(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-textSecondary mt-1">
                <span>0.5</span>
                <span>{user.weeklyLossLimit.toFixed(1)} SOL</span>
                <span>20.0</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}