import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';

interface FloatingLanguageToggleProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const FloatingLanguageToggle: React.FC<FloatingLanguageToggleProps> = ({ 
  currentLanguage, 
  onLanguageChange 
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 80, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);

  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setHasMoved(false);
    setDragStart({
      x: clientX - position.x,
      y: clientY - position.y
    });
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (isDragging) {
      setHasMoved(true);
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 60, clientX - dragStart.x)),
        y: Math.max(0, Math.min(window.innerHeight - 60, clientY - dragStart.y))
      });
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
    if (!hasMoved) {
      setShowMenu(!showMenu);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleEnd);
      };
    }
  }, [isDragging, dragStart]);

  const handleLanguageSelect = (language: Language) => {
    onLanguageChange(language);
    setShowMenu(false);
  };

  return (
    <div
      ref={bubbleRef}
      className="fixed z-50"
      style={{ 
        left: position.x, 
        top: position.y,
        transition: isDragging ? 'none' : 'all 0.2s ease-out'
      }}
    >
      {/* Main Bubble */}
      <div
        className={`w-12 h-12 bg-neon-green rounded-full flex items-center justify-center cursor-move shadow-lg hover:shadow-xl select-none ${
          isDragging ? 'scale-110 shadow-2xl' : 'hover:scale-105'
        }`}
        style={{ 
          transition: isDragging ? 'none' : 'all 0.2s ease-out',
          touchAction: 'none'
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={(e) => {
          const touch = e.touches[0];
          handleStart(touch.clientX, touch.clientY);
        }}
      >
        <span className="text-black font-bold text-sm pointer-events-none">
          {currentLanguage === 'eng' ? 'EN' : currentLanguage === 'hieng' ? 'HI' : 'MR'}
        </span>
      </div>

      {/* Language Menu */}
      {showMenu && (
        <div 
          className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-dark-800 border border-gray-700 rounded-lg overflow-hidden shadow-xl animate-fade-in"
          style={{ animation: 'fadeIn 0.2s ease-out' }}
        >
          {(['eng', 'hieng', 'marathi'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageSelect(lang)}
              className={`block w-full text-left px-4 py-2 text-xs transition-colors ${
                currentLanguage === lang 
                  ? 'bg-neon-green text-black font-bold' 
                  : 'text-gray-300 hover:bg-dark-700'
              }`}
            >
              {lang === 'eng' ? 'English' : lang === 'hieng' ? 'Hinglish' : 'मराठी'}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FloatingLanguageToggle;