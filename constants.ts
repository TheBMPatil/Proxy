import { UserProfile, HelperProfile } from "./types";

export const SOS_SYSTEM_INSTRUCTION = (profile: UserProfile) => {
  const languageInstructions = {
    eng: "Respond in clear English.",
    hieng: "Respond in Hinglish (Hindi-English mix). Use Hindi words naturally mixed with English.",
    marathi: "Respond in Marathi language."
  };
  
  return `
You are "Sahara", a Gen-Z friendly, ultra-pragmatic digital nanny for an Indian parent.
User Context:
- Child Age: ${profile.childAge}
- Living in Joint Family: ${profile.isJointFamily ? "Yes (Navigating in-laws/relatives)" : "No (Nuclear family, doing it alone)"}
- Current State: Overwhelmed/Cooked.
- Language Preference: ${profile.language}

${languageInstructions[profile.language]}

Your Personality:
- ZERO FLUFF. Do not say "I hope you are well" or "Hang in there".
- Direct, numbered lists.
- 3 steps max usually.
- Use simple language.
- Indian Context: Suggest Khichdi, Dal water, Hing paste, Ajwain potli, etc., where appropriate. NOT Avocado toast or sleep training methods that don't work in Indian households.
- If the user is panicking, be the calm, authoritative voice.
- If the user mentions "Mausi" or "Mother-in-law" advice, give a polite script to deflect it.

Example Interaction:
User: "Baby won't stop crying."
You: 
1. Check diaper (wet/poop).
2. Check for gas (bicycle legs or hing paste on navel).
3. Rock vertically, not side-to-side.
4. If fed recently, check for burp.
`;
};

export const VENT_SYSTEM_INSTRUCTION = `
You are a validating void. The user is venting frustration. 
Your job is NOT to solve the problem. Your job is to VALIDATE the feeling.
- Acknowledge the difficulty.
- Normalize the feeling ("It's normal to regret this sometimes").
- Encourage them to survive the next hour.
- Keep it short. 
`;

export const MOCK_TIPS = [
  { id: 1, title: "Burp Hack in 10s", duration: "15s", category: "Newborn", content: "Sit them up, support jaw, rub back in circles. Don't pat hard." },
  { id: 2, title: "In-Law Deflection Script", duration: "20s", category: "Mental", content: "Say: 'Doctor ne ye specifically bola hai' (The doctor specifically said this). Works 100%." },
  { id: 3, title: "The 5-Min Power Nap", duration: "30s", category: "Self-Care", content: "Put baby in safe crib. Set alarm. Close eyes. Ignore the mess." },
  { id: 4, title: "Colic Relief (Desi Style)", duration: "25s", category: "Health", content: "Warm Hing paste around the navel. Works like magic for gas." },
  { id: 5, title: "Surviving the 3 AM Feed", duration: "15s", category: "Survival", content: "Don't look at your phone. Keep lights dim. Do not make eye contact with the baby." },
];

export const MOCK_HELPERS: HelperProfile[] = [
  {
    id: '1',
    name: 'Riya S.',
    role: 'nanny',
    rating: 4.8,
    experience: '3 Years',
    rate: 300,
    imageUrl: '👩‍💼',
    badges: ['CPR Trained', 'Verified'],
    distance: '1.2 km',
    isOnline: true,
    languages: ['Hindi', 'English']
  },
  {
    id: '2',
    name: 'Mrs. Kulkarni',
    role: 'dadi',
    rating: 5.0,
    experience: '30 Years (Raised 4 kids)',
    rate: 500,
    imageUrl: '👵',
    badges: ['Home Wisdom', 'Malish Expert', 'Storyteller'],
    distance: '0.5 km',
    isOnline: true,
    languages: ['Marathi', 'Hindi']
  },
  {
    id: '3',
    name: 'Sunita Ben',
    role: 'dadi',
    rating: 4.9,
    experience: '25 Years',
    rate: 450,
    imageUrl: '👵',
    badges: ['Cooking Pro', 'Sleep Magician'],
    distance: '3.0 km',
    isOnline: false,
    languages: ['Gujarati', 'Hindi']
  },
  {
    id: '4',
    name: 'Anjali M.',
    role: 'nanny',
    rating: 4.5,
    experience: '2 Years',
    rate: 250,
    imageUrl: '👩‍⚕️',
    badges: ['Night Shift', 'Verified'],
    distance: '5.0 km',
    isOnline: true,
    languages: ['Hindi']
  }
];
