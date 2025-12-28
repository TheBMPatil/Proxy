import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import { ViewState, UserProfile } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleStart = () => {
    setView('onboarding');
  };

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setView('dashboard');
  };

  return (
    // Outer container: Centers the app on desktop, fills screen on mobile
    <div className="fixed inset-0 w-full h-[100dvh] bg-black flex justify-center overflow-hidden overscroll-none">
      {/* App Frame: Mobile width constrained, full height */}
      <div className="w-full max-w-md h-full bg-dark-900 shadow-2xl relative flex flex-col font-sans selection:bg-neon-green selection:text-black">
        {view === 'landing' && <LandingPage onStart={handleStart} />}
        {view === 'onboarding' && <Onboarding onComplete={handleOnboardingComplete} />}
        {view === 'dashboard' && userProfile && <Dashboard userProfile={userProfile} />}
      </div>
    </div>
  );
};

export default App;