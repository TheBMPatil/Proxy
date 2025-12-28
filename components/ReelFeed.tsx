import React, { useState, useRef } from 'react';
import { MOCK_TIPS } from '../constants';

const ReelFeed: React.FC = () => {
  const [viewedCount, setViewedCount] = useState(0);
  const [likedTips, setLikedTips] = useState<number[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Doom-scrolling prevention logic
  if (viewedCount >= 5) {
      return (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-black">
              <div className="text-6xl mb-6 animate-bounce">🛑</div>
              <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">System Locked</h2>
              <p className="text-gray-400 text-lg">Daily limit reached. <br/>Go apply what you learned.</p>
              <button className="mt-8 px-8 py-3 bg-gray-800 rounded-full text-gray-500 cursor-not-allowed font-bold">
                  Come back tomorrow
              </button>
          </div>
      );
  }

  const toggleLike = (id: number) => {
      setLikedTips(prev => 
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      );
  };

  const handleMarkLearned = (e: React.MouseEvent) => {
      e.stopPropagation();
      setViewedCount(prev => prev + 1);
      // Auto scroll to next
      if (scrollContainerRef.current) {
          const height = scrollContainerRef.current.clientHeight;
          scrollContainerRef.current.scrollBy({ top: height, behavior: 'smooth' });
      }
  };

  return (
    <div 
        ref={scrollContainerRef}
        className="h-full w-full bg-black overflow-y-scroll snap-y snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      {MOCK_TIPS.map((tip, index) => (
        <div key={tip.id} className="relative w-full h-full snap-start bg-dark-900 overflow-hidden flex flex-col">
            
            {/* Fake Video Background (Abstract Animation) */}
            <div className={`absolute inset-0 bg-gradient-to-br ${
                index % 3 === 0 ? 'from-purple-900 via-black to-blue-900' :
                index % 3 === 1 ? 'from-red-900 via-black to-orange-900' :
                'from-green-900 via-black to-teal-900'
            }`}>
                <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-pulse"></div>
                {/* Simulated moving elements to look like video */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-[bounce_5s_infinite]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-[bounce_7s_infinite]"></div>
            </div>

            {/* Dark Overlay for Text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90"></div>

            {/* Top Bar info */}
            <div className="absolute top-4 left-0 w-full px-4 flex justify-between items-center z-20">
                <span className="bg-black/40 backdrop-blur text-white/70 px-2 py-1 rounded text-[10px] font-mono border border-white/10">
                    Reel {index + 1}/5
                </span>
                <span className="text-white/50 text-xs font-bold uppercase tracking-widest">
                    {tip.duration}
                </span>
            </div>

            {/* Main Content (Bottom Left) */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 pb-24 z-10 pointer-events-none">
                {/* Category Pill */}
                <div className="self-start mb-3 pointer-events-auto">
                    <span className="bg-neon-blue/20 backdrop-blur-md text-neon-blue px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-neon-blue/30 shadow-[0_0_10px_rgba(0,255,255,0.2)]">
                        {tip.category}
                    </span>
                </div>

                {/* Main Text */}
                <h2 className="text-3xl font-black text-white mb-2 leading-tight drop-shadow-xl">
                    {tip.title}
                </h2>
                <p className="text-gray-100 text-lg leading-snug mb-4 drop-shadow-lg font-medium opacity-90">
                    {tip.content}
                </p>

                {/* Mock Music/Audio Track */}
                <div className="flex items-center gap-2 text-white/70 overflow-hidden">
                    <span className="animate-spin-slow">🎵</span>
                    <div className="text-xs font-mono marquee whitespace-nowrap">
                        Trending Audio • Parenting Survival Beats • Original Sound
                    </div>
                </div>
            </div>

            {/* Right Sidebar Actions (Interactive) */}
            <div className="absolute right-2 bottom-20 flex flex-col items-center gap-6 z-20 w-16">
                <button 
                    onClick={() => toggleLike(tip.id)}
                    className="flex flex-col items-center gap-1 group"
                >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${likedTips.includes(tip.id) ? 'bg-red-500/20 text-red-500' : 'bg-white/10 text-white'}`}>
                        <span className={`text-xl transform transition-transform group-active:scale-125 ${likedTips.includes(tip.id) ? 'scale-110' : ''}`}>
                            {likedTips.includes(tip.id) ? '❤️' : '🤍'}
                        </span>
                    </div>
                    <span className="text-[10px] font-bold shadow-black drop-shadow-md">Like</span>
                </button>

                <button className="flex flex-col items-center gap-1 group">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white transition-all active:scale-95 group-hover:bg-white/20">
                        <span className="text-xl">💬</span>
                    </div>
                    <span className="text-[10px] font-bold shadow-black drop-shadow-md">42</span>
                </button>

                <button className="flex flex-col items-center gap-1 group">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white transition-all active:scale-95 group-hover:bg-white/20">
                         <span className="text-xl">✈️</span>
                    </div>
                    <span className="text-[10px] font-bold shadow-black drop-shadow-md">Share</span>
                </button>

                <div className="w-8 h-px bg-white/20 my-1"></div>

                 <button 
                    onClick={handleMarkLearned}
                    className="flex flex-col items-center gap-1 group mt-2"
                >
                    <div className="w-12 h-12 rounded-full bg-neon-green text-black flex items-center justify-center shadow-[0_0_20px_rgba(57,255,20,0.6)] animate-pulse transition-transform hover:scale-110 active:scale-95 border-2 border-white">
                        <span className="text-2xl font-bold">✓</span>
                    </div>
                    <span className="text-[9px] font-black text-neon-green shadow-black drop-shadow-md uppercase text-center leading-tight mt-1 bg-black/50 px-1 rounded">
                        Done
                    </span>
                </button>
            </div>

            {/* Bottom Progress (Looping) */}
             <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
                <div className="h-full bg-white w-full origin-left animate-[grow_15s_linear]"></div>
            </div>
        </div>
      ))}
      
      {/* End of Feed Message */}
      <div className="h-full w-full snap-start flex items-center justify-center bg-black text-center p-8">
          <div className="opacity-50">
            <div className="text-6xl mb-4 grayscale">✅</div>
            <h3 className="text-2xl font-bold text-gray-500 uppercase tracking-widest">You're caught up</h3>
          </div>
      </div>
    </div>
  );
};

export default ReelFeed;
