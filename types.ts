export type ViewState = 'landing' | 'onboarding' | 'dashboard';

export type CookedLevel = 'chilled' | 'managing' | 'cooked';

export interface UserProfile {
  childAge: string;
  overwhelmScore: number;
  isJointFamily: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface Tip {
  id: number;
  title: string;
  duration: string;
  category: string;
  content: string;
}

export interface HelperProfile {
  id: string;
  name: string;
  role: 'nanny' | 'dadi';
  rating: number;
  experience: string;
  rate: number; // in Rupees
  imageUrl: string;
  badges: string[];
  distance: string;
  isOnline: boolean;
  languages: string[];
}
