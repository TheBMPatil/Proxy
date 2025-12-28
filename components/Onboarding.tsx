import React, { useState } from 'react';
import { UserProfile, Language } from '../types';
import { getTranslation } from '../translations';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
  selectedLanguage: Language;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, selectedLanguage }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    childAge: '',
    overwhelmScore: 5,
    isJointFamily: false,
    language: selectedLanguage
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(profile);
    }
  };

  const t = (key: string) => getTranslation(selectedLanguage, key);

  return (
    <div className="h-full bg-dark-900 text-white flex flex-col p-6 overflow-y-auto">
      <div className="w-full h-1 bg-gray-800 mb-8 shrink-0">
        <div 
          className="h-full bg-neon-blue transition-all duration-300"
          style={{ width: `${(step / 3) * 100}%` }}
        ></div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {step === 1 && (
          <div className="animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-6">{t('tinyHuman')}</h2>
            <div className="space-y-3">
              {['0-6 Months (Potato Phase)', '6-12 Months (Crawler)', '1-3 Years (Toddler Terror)', '3+ Years'].map((age) => (
                <button
                  key={age}
                  onClick={() => {
                    setProfile({ ...profile, childAge: age });
                    handleNext();
                  }}
                  className="w-full p-4 text-left bg-dark-800 border border-gray-700 rounded-xl hover:border-neon-blue hover:bg-dark-700 transition-all font-semibold"
                >
                  {age}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-2">{t('vibeCheck')}</h2>
            <p className="text-gray-400 mb-8">{t('vibeDesc')}</p>
            
            <div className="mb-8 text-center">
              <span className="text-6xl font-black text-neon-pink">{profile.overwhelmScore}</span>
              <p className="text-sm text-gray-500 mt-2">
                {profile.overwhelmScore < 4 ? t('justChillin') : profile.overwhelmScore < 8 ? t('holdingTogether') : t('sendHelp')}
              </p>
            </div>

            <input 
              type="range" 
              min="1" 
              max="10" 
              value={profile.overwhelmScore}
              onChange={(e) => setProfile({ ...profile, overwhelmScore: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-neon-pink"
            />

            <button 
              onClick={handleNext}
              className="w-full mt-10 bg-white text-black font-bold py-4 rounded-xl"
            >
              {t('continue')}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in-up">
             <h2 className="text-3xl font-bold mb-6">{t('livingSituation')}</h2>
             <p className="text-gray-400 mb-8">{t('livingDesc')}</p>
             
             <div className="grid grid-cols-2 gap-4">
               <button
                 onClick={() => {
                   setProfile({ ...profile, isJointFamily: true });
                   handleNext();
                 }}
                 className="p-6 bg-dark-800 border border-gray-700 rounded-xl hover:border-neon-purple flex flex-col items-center gap-2"
               >
                 <span className="text-4xl">👨👩👧👦</span>
                 <span className="font-bold">{t('jointFamily')}</span>
                 <span className="text-xs text-gray-500">{t('jointDesc')}</span>
               </button>

               <button
                 onClick={() => {
                   setProfile({ ...profile, isJointFamily: false });
                   handleNext();
                 }}
                 className="p-6 bg-dark-800 border border-gray-700 rounded-xl hover:border-neon-purple flex flex-col items-center gap-2"
               >
                 <span className="text-4xl">🧘♂️</span>
                 <span className="font-bold">{t('nuclear')}</span>
                 <span className="text-xs text-gray-500">{t('nuclearDesc')}</span>
               </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;