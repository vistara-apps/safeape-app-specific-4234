import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { SentimentFeed } from './components/SentimentFeed';
import { BacktestLab } from './components/BacktestLab';
import { SocialFeed } from './components/SocialFeed';
import { Settings } from './components/Settings';
import { useStore } from './store/useStore';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user } = useStore();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'sentiment':
        return <SentimentFeed />;
      case 'backtest':
        return <BacktestLab />;
      case 'social':
        return <SocialFeed />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-bg text-textPrimary">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6">
        {/* Navigation Tabs */}
        <nav className="flex space-x-1 mb-8 bg-surface rounded-lg p-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
            { id: 'sentiment', label: 'Signals', icon: '📊' },
            { id: 'backtest', label: 'Backtest', icon: '🧪' },
            { id: 'social', label: 'Social', icon: '👥' },
            { id: 'settings', label: 'Settings', icon: '⚙️' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-glow'
                  : 'text-textSecondary hover:text-textPrimary hover:bg-surfaceElevated'
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="animate-slide-in">
          {renderContent()}
        </div>
      </main>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'hsl(240, 5%, 14%)',
            color: 'hsl(0, 0%, 98%)',
            border: '1px solid hsl(240, 4%, 16%)',
          },
        }}
      />
    </div>
  );
}

export default App;