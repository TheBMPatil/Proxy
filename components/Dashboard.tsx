import React, { useState } from 'react';
import { UserProfile, CookedLevel, Language } from '../types';
import { getTranslation } from '../translations';
import CookedMeter from './CookedMeter';
import SOSChat from './SOSChat';
import ReelFeed from './ReelFeed';
import VentRoom from './VentRoom';
import ProxyService from './ProxyService';

interface DashboardProps {
  userProfile: UserProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ userProfile }) => {
  const [cookedLevel, setCookedLevel] = useState<CookedLevel>(
    userProfile.overwhelmScore > 7 ? 'cooked' : 
    userProfile.overwhelmScore > 4 ? 'managing' : 'chilled'
  );
  
  const [activeTab, setActiveTab] = useState<'chat' | 'learn' | 'vent' | 'hire'>('chat');
  const t = (key: string) => getTranslation(userProfile.language, key);

  // SOS MODE: If cooked, override everything else
  if (cookedLevel === 'cooked') {
    return (
      <div className="h-full bg-black flex flex-col">
        <div className="border-4 border-red-600 animate-pulse opacity-50 absolute inset-0 pointer-events-none"></div>
        
        <div className="p-4 border-b border-red-900">
          <CookedMeter level={cookedLevel} setLevel={setCookedLevel} />
        </div>
        
        <div className="flex-1 p-4">
          <h1 className="text-2xl font-black text-white mb-2">{t('sosActive')}</h1>
          <p className="text-red-400 text-sm mb-4">{t('sosDesc')}</p>
          
          <div className="bg-dark-800 border border-neon-blue p-3 rounded-lg mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-sm">{t('needBreak')}</h3>
              <p className="text-xs text-gray-400">Riya S. (Nanny) is 1km away.</p>
            </div>
            <button 
              onClick={() => {
                setCookedLevel('managing');
                setActiveTab('hire');
              }}
              className="bg-neon-blue text-black font-bold px-3 py-1 rounded text-sm"
            >
              Book ₹300
            </button>
          </div>

          <div className="flex-1 bg-dark-900 rounded-lg border border-red-900 overflow-hidden">
            <SOSChat userProfile={userProfile} />
          </div>
        </div>
        
        <div className="p-4 text-center">
          <span className="text-white font-mono text-sm">{t('breathe')}</span>
        </div>
      </div>
    );
  }

  // Normal Mode
  return (
    <div className="h-full flex flex-col bg-dark-900">
      {/* Clean Header */}
      <div className="p-3 border-b border-gray-800">
        <CookedMeter level={cookedLevel} setLevel={setCookedLevel} />
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'chat' && <SOSChat userProfile={userProfile} />}
        {activeTab === 'learn' && <ReelFeed />}
        {activeTab === 'vent' && <VentRoom userProfile={userProfile} />}
        {activeTab === 'hire' && <ProxyService userProfile={userProfile} />}
      </div>

      {/* Clean Bottom Nav */}
      <div className="border-t border-gray-800 p-2">
        <div className="flex justify-around">
          {[
            { key: 'chat', icon: '🤖', label: t('sahara') },
            { key: 'learn', icon: '📱', label: t('reels') },
            { key: 'hire', icon: '👵', label: t('proxy') },
            { key: 'vent', icon: '🗣️', label: t('vent') }
          ].map(({ key, icon, label }) => (
            <button 
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                activeTab === key ? 'text-neon-green' : 'text-gray-500'
              }`}
            >
              <span className="text-lg">{icon}</span>
              <span className="text-[10px] font-bold uppercase">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;