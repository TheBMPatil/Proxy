import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { VENT_SYSTEM_INSTRUCTION } from '../constants';

const VentRoom: React.FC = () => {
  const [vent, setVent] = useState('');
  const [response, setResponse] = useState('');
  const [isVenting, setIsVenting] = useState(false);
  const [hasVented, setHasVented] = useState(false);

  const handleScream = async () => {
    if (!vent.trim()) return;
    setIsVenting(true);
    setResponse('');

    try {
        if (!process.env.API_KEY) {
            setResponse("I hear you. It's tough. You're doing okay.");
            return;
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const result = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: vent,
            config: {
                systemInstruction: VENT_SYSTEM_INSTRUCTION,
            }
        });

        if (result.text) {
            setResponse(result.text);
            setHasVented(true);
        }
    } catch (e) {
        setResponse("System overloaded. But your feelings are valid. Take a breath.");
    } finally {
        setIsVenting(false);
    }
  };

  const reset = () => {
    setVent('');
    setResponse('');
    setHasVented(false);
  };

  return (
    <div className="h-full flex flex-col p-6 bg-dark-900">
      <h2 className="text-xl font-bold text-white mb-6">The Void 🕳️</h2>
      
      {!hasVented ? (
        <div className="flex-1 flex flex-col">
            <p className="text-gray-400 text-sm mb-4">
                Type the things you can't say out loud. No judgment. No record kept.
            </p>
            <textarea
                value={vent}
                onChange={(e) => setVent(e.target.value)}
                placeholder="I regret everything today..."
                className="flex-1 bg-dark-800 border border-gray-700 rounded-2xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-neon-pink resize-none mb-4"
            />
            <button
                onClick={handleScream}
                disabled={isVenting || !vent.trim()}
                className="w-full bg-gray-800 text-white border border-gray-600 font-bold py-4 rounded-xl hover:bg-neon-pink hover:border-neon-pink hover:text-black transition-all active:scale-95"
            >
                {isVenting ? 'Absorbing...' : 'SCREAM INTO VOID'}
            </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center text-center animate-fade-in-up">
            <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center text-3xl mb-6 border border-gray-700">
                ❤️‍🩹
            </div>
            <p className="text-lg text-white font-medium mb-8 leading-relaxed">
                "{response}"
            </p>
            <button
                onClick={reset}
                className="text-gray-500 text-sm hover:text-white underline decoration-gray-700"
            >
                Vent again
            </button>
        </div>
      )}
    </div>
  );
};

export default VentRoom;
