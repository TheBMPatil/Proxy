import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { UserProfile, ChatMessage } from '../types';
import { SOS_SYSTEM_INSTRUCTION } from '../constants';

interface SOSChatProps {
  userProfile: UserProfile;
}

// --- Text Formatting Helpers ---

const parseBold = (text: string) => {
  // Split by bold syntax **text**
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white font-black">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const FormattedMessage: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');
  
  return (
    <div className="space-y-1">
      {lines.map((line, index) => {
        const cleanLine = line.trim();
        if (!cleanLine) return <div key={index} className="h-2" />;

        // Headers (### or ##)
        if (cleanLine.startsWith('#')) {
          const headerText = cleanLine.replace(/^#+\s*/, '');
          return (
            <h3 key={index} className="text-neon-blue font-bold text-base mt-2 mb-1">
              {parseBold(headerText)}
            </h3>
          );
        }

        // Bullet Points (* or -)
        if (cleanLine.startsWith('* ') || cleanLine.startsWith('- ')) {
          const content = cleanLine.replace(/^[\*\-]\s*/, '');
          return (
            <div key={index} className="flex gap-2 pl-1">
              <span className="text-neon-green font-bold text-lg leading-none shrink-0">•</span>
              <span className="text-gray-200 leading-snug">{parseBold(content)}</span>
            </div>
          );
        }

        // Numbered Lists (1. )
        const numberedMatch = cleanLine.match(/^(\d+)\.\s+(.*)/);
        if (numberedMatch) {
          return (
            <div key={index} className="flex gap-2 pl-1">
              <span className="text-neon-pink font-mono font-bold shrink-0">{numberedMatch[1]}.</span>
              <span className="text-gray-200 leading-snug">{parseBold(numberedMatch[2])}</span>
            </div>
          );
        }

        // Standard Text
        return (
          <p key={index} className="text-gray-200 leading-snug">
            {parseBold(line)}
          </p>
        );
      })}
    </div>
  );
};

const SOSChat: React.FC<SOSChatProps> = ({ userProfile }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'Status report? I\'m ready. No fluff.', isThinking: false }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Ref to hold the model instance
  const modelRef = useRef<any>(null);

  useEffect(() => {
    // Initialize AI Client
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    console.log('API Key available:', !!apiKey); // Debug log
    if (apiKey && !modelRef.current) {
        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            modelRef.current = genAI.getGenerativeModel({ 
                model: import.meta.env.VITE_GEMINI_MODEL || "gemini-2.5-flash"
            });
            console.log('AI model initialized successfully');
        } catch (error) {
            console.error('Failed to initialize AI:', error);
        }
    }
  }, [userProfile]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim() || !modelRef.current) {
        if (!modelRef.current) {
            setMessages(prev => [...prev, { 
                id: Date.now().toString(), 
                role: 'model', 
                text: "AI not available. Check your API key in .env file.", 
                isThinking: false 
            }]);
        }
        return;
    }

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
        const prompt = SOS_SYSTEM_INSTRUCTION(userProfile) + "\n\nUser: " + text;
        const result = await modelRef.current.generateContent(prompt);
        const response = await result.response;
        const botText = response.text();
        
        console.log('AI Response received:', botText.substring(0, 50) + '...'); // Debug log
        
        setMessages(prev => [...prev, { 
            id: (Date.now() + 1).toString(), 
            role: 'model', 
            text: botText, 
            isThinking: false 
        }]);
    } catch (error) {
        console.error("AI Error Details:", error);
        setMessages(prev => [...prev, { 
            id: Date.now().toString(), 
            role: 'model', 
            text: "Connection cut. Try simplified steps: 1. Breathe. 2. Put baby in safe spot. 3. Walk away for 2 mins.", 
            isThinking: false 
        }]);
    } finally {
        setIsLoading(false);
    }
  };

  const quickPrompts = [
    "Baby won't stop crying",
    "I'm about to lose it",
    "Refusing to eat",
    "Dealing with unwanted advice"
  ];

  return (
    <div className="flex flex-col h-full bg-dark-900 rounded-t-2xl">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center gap-2 shrink-0">
        <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></div>
        <h3 className="font-bold text-neon-green tracking-wide">SAHARA AI <span className="text-gray-500 font-normal text-xs ml-2">ONLINE</span></h3>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
              msg.role === 'user' 
                ? 'bg-neon-purple text-white rounded-br-none' 
                : 'bg-dark-800 text-gray-200 border border-gray-700 rounded-bl-none'
            }`}>
              {msg.isThinking ? (
                <div className="flex items-center gap-2 text-neon-green">
                    <span className="w-2 h-2 bg-neon-green rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-neon-green rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-neon-green rounded-full animate-bounce delay-150"></span>
                </div>
              ) : (
                msg.role === 'user' 
                  ? <div className="whitespace-pre-line font-medium">{msg.text}</div>
                  : <FormattedMessage text={msg.text} />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts (Only show if few messages) */}
      {messages.length < 3 && (
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
            {quickPrompts.map(prompt => (
                <button 
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="whitespace-nowrap px-4 py-2 bg-dark-800 border border-gray-700 rounded-full text-xs hover:border-neon-blue transition-colors text-gray-300"
                >
                    {prompt}
                </button>
            ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-dark-900 border-t border-gray-800 shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Type crisis here..."
            className="flex-1 bg-dark-800 text-white rounded-full px-4 py-3 focus:outline-none focus:ring-1 focus:ring-neon-green placeholder-gray-600 text-sm"
            disabled={isLoading}
          />
          <button
            onClick={() => handleSend(input)}
            disabled={isLoading || !input.trim()}
            className="bg-neon-green text-black rounded-full p-3 font-bold disabled:opacity-50 transition-transform active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SOSChat;