import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="h-full bg-dark-900 text-white flex flex-col p-6 relative overflow-hidden overflow-y-auto">
      {/* Background Accents */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-neon-purple opacity-20 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-neon-green opacity-10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Hero */}
      <div className="flex-1 flex flex-col justify-center items-center text-center mt-4">
        <div className="mb-6 relative">
           {/* Battery Animation Visual */}
           <div className="flex items-center gap-4">
             <div className="flex flex-col items-center">
               <div className="w-16 h-24 border-2 border-red-500 rounded-lg p-1 relative">
                 <div className="w-full bg-red-500 absolute bottom-1 left-1 right-1 rounded-sm animate-[pulse_2s_infinite]" style={{height: '10%'}}></div>
               </div>
               <span className="text-xs text-red-400 mt-2 font-mono">YOU: 10%</span>
             </div>
             <div className="text-2xl text-gray-600">→</div>
             <div className="flex flex-col items-center">
               <div className="w-12 h-20 border-2 border-neon-green rounded-lg p-1 relative">
                 <div className="w-full h-full bg-neon-green rounded-sm animate-[pulse_1s_infinite]"></div>
               </div>
               <span className="text-xs text-neon-green mt-2 font-mono">BABY: 100%</span>
             </div>
           </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight tracking-tight">
          Parenting on <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Autopilot</span>.
        </h1>
        
        <p className="text-gray-400 text-base md:text-lg mb-8 max-w-md">
          For the parents who didn't read the manual, are totally cooked, and just want to survive today.
        </p>

        <button 
          onClick={onStart}
          className="w-full max-w-xs bg-neon-green text-black font-bold text-lg py-4 rounded-full shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_30px_rgba(57,255,20,0.6)] transition-all active:scale-95"
        >
          GET MY SURVIVAL KIT
        </button>
      </div>

      {/* Pain Points */}
      <div className="mt-8 space-y-4 mb-6">
        <h3 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-2">Why you need this</h3>
        
        <div className="bg-dark-800 p-4 rounded-xl border border-gray-800 flex items-start gap-3">
          <span className="text-2xl">🛑</span>
          <div>
            <h4 className="font-bold text-white">Attention span &lt; 8s?</h4>
            <p className="text-sm text-gray-400">We got you. No long blogs.</p>
          </div>
        </div>

        <div className="bg-dark-800 p-4 rounded-xl border border-gray-800 flex items-start gap-3">
          <span className="text-2xl">🤯</span>
          <div>
            <h4 className="font-bold text-white">In-laws driving you crazy?</h4>
            <p className="text-sm text-gray-400">We have polite scripts for that.</p>
          </div>
        </div>

        <div className="bg-dark-800 p-4 rounded-xl border border-gray-800 flex items-start gap-3">
          <span className="text-2xl">😭</span>
          <div>
            <h4 className="font-bold text-white">Non-stop crying?</h4>
            <p className="text-sm text-gray-400">Press the Panic Button.</p>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-600 text-sm pb-4">
        Join 500+ other parents winging it 🚀
      </div>
    </div>
  );
};

export default LandingPage;