import React, { useState } from 'react';
import { UserProfile, CookedLevel } from '../types';
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

  // SOS MODE: If cooked, override everything else
  if (cookedLevel === 'cooked') {
    return (
      <div className="absolute inset-0 bg-black flex flex-col z-50 overflow-hidden">
        {/* Red Alarm Overlay */}
        <div className="absolute inset-0 border-4 border-red-600 pointer-events-none z-50 animate-pulse opacity-50"></div>
        
        <CookedMeter level={cookedLevel} setLevel={setCookedLevel} />
        
        <div className="flex-1 flex flex-col p-4 z-40 overflow-hidden">
           <div className="flex-1 flex flex-col justify-end pb-4 overflow-y-auto">
              <h1 className="text-4xl font-black text-white mb-2">SOS MODE ACTIVE</h1>
              <p className="text-red-400 mb-4">Non-essentials disabled. Focus on survival.</p>
              
              {/* Emergency Hire Prompt */}
              <div className="bg-dark-800 border border-neon-blue p-4 rounded-xl mb-4 flex items-center justify-between shadow-[0_0_15px_rgba(0,255,255,0.2)] shrink-0">
                  <div>
                      <h3 className="font-bold text-white">Need a break?</h3>
                      <p className="text-xs text-gray-400">Riya S. (Nanny) is 1km away.</p>
                  </div>
                  <button 
                    onClick={() => {
                        setCookedLevel('managing'); // Reset panic so they can use the app
                        setActiveTab('hire');
                    }}
                    className="bg-neon-blue text-black font-bold px-4 py-2 rounded-lg text-sm animate-pulse"
                  >
                      Book ₹300
                  </button>
              </div>

              <div className="flex-1 bg-dark-900 rounded-2xl border border-red-900 overflow-hidden shadow-[0_0_30px_rgba(220,38,38,0.2)] min-h-0">
                <SOSChat userProfile={userProfile} />
              </div>
           </div>
           
           <div className="h-16 flex items-center justify-center bg-dark-800 rounded-xl animate-pulse shrink-0">
               <span className="text-white font-mono tracking-widest">BREATHE IN ... BREATHE OUT</span>
           </div>
        </div>
      </div>
    );
  }

  // Normal / Managing Mode
  return (
    <div className="h-full flex flex-col overflow-hidden bg-dark-900">
      <CookedMeter level={cookedLevel} setLevel={setCookedLevel} />

      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'chat' && <SOSChat userProfile={userProfile} />}
        {activeTab === 'learn' && <ReelFeed />}
        {activeTab === 'vent' && <VentRoom />}
        {activeTab === 'hire' && <ProxyService />}
      </div>

      {/* Bottom Nav */}
      <div className="bg-dark-900 border-t border-gray-800 p-2 pb-6 shrink-0 z-10">
        <div className="flex justify-around items-center">
            <button 
                onClick={() => setActiveTab('chat')}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${activeTab === 'chat' ? 'text-neon-green' : 'text-gray-500'}`}
            >
                <span className="text-xl">🤖</span>
                <span className="text-[10px] font-bold uppercase">Sahara</span>
            </button>
            <button 
                onClick={() => setActiveTab('learn')}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${activeTab === 'learn' ? 'text-neon-blue' : 'text-gray-500'}`}
            >
                <span className="text-xl">📱</span>
                <span className="text-[10px] font-bold uppercase">Reels</span>
            </button>
            <button 
                onClick={() => setActiveTab('hire')}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${activeTab === 'hire' ? 'text-yellow-400' : 'text-gray-500'}`}
            >
                <span className="text-xl">👵</span>
                <span className="text-[10px] font-bold uppercase">Proxy</span>
            </button>
            <button 
                onClick={() => setActiveTab('vent')}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${activeTab === 'vent' ? 'text-neon-pink' : 'text-gray-500'}`}
            >
                <span className="text-xl">🗣️</span>
                <span className="text-[10px] font-bold uppercase">Vent</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;