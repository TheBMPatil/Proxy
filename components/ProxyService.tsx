import React, { useState } from 'react';
import { MOCK_HELPERS } from '../constants';
import { HelperProfile } from '../types';

const ProxyService: React.FC = () => {
  const [activeType, setActiveType] = useState<'all' | 'nanny' | 'dadi'>('all');
  const [bookedHelper, setBookedHelper] = useState<string | null>(null);
  const [translatorText, setTranslatorText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  // Filter logic
  const filteredHelpers = MOCK_HELPERS.filter(h => 
    activeType === 'all' ? true : h.role === activeType
  );

  const handleBook = (id: string) => {
    setBookedHelper(id);
    // In a real app, this would open a payment gateway or booking confirmation
    setTimeout(() => {
        alert("Booking confirmed! Your Proxy is on the way. Live Link sent to WhatsApp.");
        setBookedHelper(null);
    }, 1500);
  };

  const handleTranslate = () => {
    // Mock translation for vernacular support
    if (!translatorText) return;
    setTranslatedText(`(Hindi Audio Playing): "${translatorText} karna mana hai."`);
  };

  return (
    <div className="h-full bg-dark-900 overflow-y-auto pb-20 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-black text-white">The Village 🏘️</h2>
          <p className="text-xs text-gray-400">Outsource the chaos. Instant help.</p>
        </div>
        <div className="bg-gray-800 p-2 rounded-lg border border-gray-700">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
             <span className="text-[10px] font-mono text-gray-300">LIVE CAM: OFF</span>
           </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-dark-800 p-1 rounded-xl mb-6 border border-gray-700">
        {(['all', 'nanny', 'dadi'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`flex-1 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
              activeType === type 
                ? 'bg-neon-blue text-black shadow-[0_0_10px_rgba(0,255,255,0.3)]' 
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {type === 'all' ? 'All' : type === 'nanny' ? 'Micro-Nanny' : 'Dadi-on-Demand'}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredHelpers.map((helper) => (
          <div key={helper.id} className="bg-dark-800 rounded-2xl p-4 border border-gray-700 relative overflow-hidden group">
            {/* Online Indicator */}
            <div className={`absolute top-4 right-4 flex items-center gap-1 ${helper.isOnline ? 'text-green-500' : 'text-gray-600'}`}>
               <div className={`w-2 h-2 rounded-full ${helper.isOnline ? 'bg-green-500' : 'bg-gray-600'}`}></div>
               <span className="text-xs font-mono">{helper.isOnline ? 'Active' : 'Offline'}</span>
            </div>

            <div className="flex gap-4">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-3xl border-2 border-gray-600">
                {helper.imageUrl}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  {helper.name}
                  {helper.badges.includes('Verified') && <span className="text-blue-400 text-xs">☑️</span>}
                </h3>
                <div className="flex flex-wrap gap-2 my-2">
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded text-neon-purple font-mono border border-neon-purple/20">
                     {helper.role === 'dadi' ? 'GRANDMOTHER' : 'PRO NANNY'}
                  </span>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300 font-mono">
                     ⭐ {helper.rating}
                  </span>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300 font-mono">
                     📍 {helper.distance}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                   {helper.badges.map(b => (
                       <span key={b} className="text-[10px] text-gray-500 border border-gray-700 px-1 rounded">{b}</span>
                   ))}
                </div>
                
                <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-bold text-white">₹{helper.rate}<span className="text-xs font-normal text-gray-500">/hr</span></span>
                    <button 
                        onClick={() => handleBook(helper.id)}
                        disabled={!helper.isOnline || bookedHelper === helper.id}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                            bookedHelper === helper.id 
                                ? 'bg-green-500 text-black'
                                : !helper.isOnline 
                                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                    : 'bg-white text-black hover:bg-neon-green'
                        }`}
                    >
                        {bookedHelper === helper.id ? 'Request Sent!' : 'Book Now'}
                    </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Vernacular Translator */}
      <div className="mt-8 bg-dark-800 p-4 rounded-xl border border-gray-700">
         <h3 className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Instruct Nanny (Translator)</h3>
         <div className="flex gap-2">
             <input 
                type="text" 
                value={translatorText}
                onChange={(e) => setTranslatorText(e.target.value)}
                placeholder="e.g. Don't give him sugar"
                className="flex-1 bg-dark-900 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-blue"
             />
             <button 
                onClick={handleTranslate}
                className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm hover:bg-neon-blue hover:text-black transition-colors"
             >
                🗣️
             </button>
         </div>
         {translatedText && (
             <div className="mt-2 p-2 bg-neon-blue/10 border border-neon-blue/30 rounded text-neon-blue text-sm">
                 {translatedText}
             </div>
         )}
      </div>
    </div>
  );
};

export default ProxyService;
