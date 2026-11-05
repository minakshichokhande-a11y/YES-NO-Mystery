export type AnswerType = 'YES' | 'NO' | 'NOT_RELEVANT' | 'AMBIGUOUS';

export interface QuestionHistoryItem {
  id: string;
  question: string;
  answer: AnswerType;
  message?: string;
  timestamp: number;
}

export interface MysteryLevel {
  id: number;
  chapterId: number;
  chapterName: string;
  title: string;
  difficulty: 'Very Easy' | 'Easy' | 'Medium' | 'Hard' | 'Very Hard' | 'Expert';
  story: string;
  solution: string;
  hints: [string, string, string];
  // Deterministic question engine facts
  positiveFacts: string[];
  negativeFacts: string[];
  irrelevantFacts: string[];
  suggestedQuestions?: string[];
  // Key concept sets needed to validate final explanation
  solutionKeywords: string[][];
}

export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  levelStart: number;
  levelEnd: number;
  color: string;
  accentColor: string;
  description: string;
  iconName: string;
}

export type ScreenType =
  | 'SPLASH'
  | 'MAIN_MENU'
  | 'CHAPTER_SELECT'
  | 'LEVEL_SELECT'
  | 'GAMEPLAY'
  | 'VICTORY'
  | 'DAILY_MYSTERY'
  | 'GAME_MODES'
  | 'ACHIEVEMENTS'
  | 'STATISTICS'
  | 'SETTINGS'
  | 'FINAL_VICTORY';

export type GameMode = 'CLASSIC' | 'TIMED' | 'ENDLESS' | 'PASS_AND_PLAY' | 'EXPERT';

export interface PlayerProfile {
  name: string;
  coins: number;
  highestLevelUnlocked: number;
  completedLevels: number[]; // level IDs
  levelAttempts: Record<number, number>;
  levelQuestionsCount: Record<number, number>;
  unlockedHints: Record<number, number[]>; // levelId -> array of hint numbers [1, 2, 3]
  completedDailyDates: string[]; // YYYY-MM-DD
  dailyStreak: number;
  lastDailyDate: string | null;
  totalQuestionsAsked: number;
  totalTimePlayedSeconds: number;
  achievementsClaimed: string[];
  settings: {
    soundEffects: boolean;
    music: boolean;
    vibration: boolean;
    textSize: 'small' | 'medium' | 'large';
    theme: 'dark' | 'light';
    language: 'en' | 'hi';
  };
}

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  icon: string;
  rewardCoins: number;
  maxProgress: number;
  getProgress: (profile: PlayerProfile) => number;
}

export type DetectivePose =
  | 'idle'
  | 'thinking'
  | 'investigating'
  | 'happy'
  | 'confused'
  | 'sad'
  | 'victory';
