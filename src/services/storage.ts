import { PlayerProfile } from '../types/game';

const STORAGE_KEY = 'yes_no_mystery_save_v1';

export const DEFAULT_PROFILE: PlayerProfile = {
  name: 'Detective',
  coins: 100, // 100 starting coins as specified
  highestLevelUnlocked: 1, // Level 1 starts unlocked
  completedLevels: [],
  levelAttempts: {},
  levelQuestionsCount: {},
  unlockedHints: {},
  completedDailyDates: [],
  dailyStreak: 0,
  lastDailyDate: null,
  totalQuestionsAsked: 0,
  totalTimePlayedSeconds: 0,
  achievementsClaimed: [],
  settings: {
    soundEffects: true,
    music: true,
    vibration: true,
    textSize: 'medium',
    theme: 'dark',
    language: 'en',
  },
};

export function loadProfile(): PlayerProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROFILE,
      ...parsed,
      settings: {
        ...DEFAULT_PROFILE.settings,
        ...(parsed.settings || {}),
      },
    };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile: PlayerProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save game state to local storage:', err);
  }
}

export function resetGameData(): PlayerProfile {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  return { ...DEFAULT_PROFILE };
}

export function exportSaveData(profile: PlayerProfile): string {
  return JSON.stringify(profile, null, 2);
}

export function importSaveData(jsonString: string): PlayerProfile | null {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed && typeof parsed.coins === 'number') {
      const merged = { ...DEFAULT_PROFILE, ...parsed };
      saveProfile(merged);
      return merged;
    }
    return null;
  } catch {
    return null;
  }
}
