import React from 'react';
import { CookedLevel } from '../types';

interface CookedMeterProps {
  level: CookedLevel;
  setLevel: (level: CookedLevel) => void;
}

const CookedMeter: React.FC<CookedMeterProps> = ({ level, setLevel }) => {
  return (
    <div className="w-full bg-dark-800 p-4 rounded-b-2xl border-b border-gray-800 sticky top-0 z-50 shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase">Vibe Check</h2>
        <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${
          level === 'chilled' ? 'bg-green-900 text-neon-green' :
          level === 'managing' ? 'bg-yellow-900 text-yellow-400' :
          'bg-red-900 text-red-500 animate-pulse'
        }`}>
          {level === 'cooked' ? 'COOKED (SOS)' : level}
        </span>
      </div>
      
      <div className="relative h-2 bg-gray-700 rounded-full mb-4">
        <div className={`absolute top-0 left-0 h-full rounded-full transition-all duration-300 ${
           level === 'chilled' ? 'w-1/3 bg-neon-green' :
           level === 'managing' ? 'w-2/3 bg-yellow-400' :
           'w-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.7)]'
        }`}></div>
      </div>

      <div className="flex justify-between gap-2">
        <button 
          onClick={() => setLevel('chilled')}
          className={`flex-1 py-2 text-xl rounded-lg transition-colors ${level === 'chilled' ? 'bg-gray-700 grayscale-0' : 'bg-transparent grayscale opacity-50'}`}
        >
          🟢
        </button>
        <button 
          onClick={() => setLevel('managing')}
          className={`flex-1 py-2 text-xl rounded-lg transition-colors ${level === 'managing' ? 'bg-gray-700 grayscale-0' : 'bg-transparent grayscale opacity-50'}`}
        >
          🟡
        </button>
        <button 
          onClick={() => setLevel('cooked')}
          className={`flex-1 py-2 text-xl rounded-lg transition-colors ${level === 'cooked' ? 'bg-gray-700 grayscale-0' : 'bg-transparent grayscale opacity-50'}`}
        >
          🔴
        </button>
      </div>
    </div>
  );
};

export default CookedMeter;
