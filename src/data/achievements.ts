import { AchievementDef, PlayerProfile } from '../types/game';

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: 'first_mystery',
    title: 'First Mystery',
    description: 'Complete Level 1: The Missing Cake',
    icon: 'Search',
    rewardCoins: 20,
    maxProgress: 1,
    getProgress: (p: PlayerProfile) => (p.completedLevels.includes(1) ? 1 : 0),
  },
  {
    id: 'beginner_detective',
    title: 'Beginner Detective',
    description: 'Complete 10 mystery cases',
    icon: 'Compass',
    rewardCoins: 50,
    maxProgress: 10,
    getProgress: (p: PlayerProfile) => Math.min(10, p.completedLevels.length),
  },
  {
    id: 'smart_investigator',
    title: 'Smart Investigator',
    description: 'Complete 25 mystery cases',
    icon: 'BookOpen',
    rewardCoins: 100,
    maxProgress: 25,
    getProgress: (p: PlayerProfile) => Math.min(25, p.completedLevels.length),
  },
  {
    id: 'mystery_hunter',
    title: 'Mystery Hunter',
    description: 'Complete 50 mystery cases',
    icon: 'Target',
    rewardCoins: 150,
    maxProgress: 50,
    getProgress: (p: PlayerProfile) => Math.min(50, p.completedLevels.length),
  },
  {
    id: 'expert_detective',
    title: 'Expert Detective',
    description: 'Complete 100 mystery cases',
    icon: 'Shield',
    rewardCoins: 250,
    maxProgress: 100,
    getProgress: (p: PlayerProfile) => Math.min(100, p.completedLevels.length),
  },
  {
    id: 'master_investigator',
    title: 'Master Investigator',
    description: 'Complete 150 mystery cases',
    icon: 'Award',
    rewardCoins: 350,
    maxProgress: 150,
    getProgress: (p: PlayerProfile) => Math.min(150, p.completedLevels.length),
  },
  {
    id: 'ultimate_detective',
    title: 'Ultimate Detective',
    description: 'Complete all 200 mystery cases',
    icon: 'Crown',
    rewardCoins: 1000,
    maxProgress: 200,
    getProgress: (p: PlayerProfile) => Math.min(200, p.completedLevels.length),
  },
  {
    id: 'perfect_thinker',
    title: 'Perfect Thinker',
    description: 'Complete 10 levels without using any hints',
    icon: 'Brain',
    rewardCoins: 100,
    maxProgress: 10,
    getProgress: (p: PlayerProfile) => {
      let count = 0;
      for (const lvlId of p.completedLevels) {
        if (!p.unlockedHints[lvlId] || p.unlockedHints[lvlId].length === 0) {
          count++;
        }
      }
      return Math.min(10, count);
    },
  },
  {
    id: 'hint_explorer',
    title: 'Hint Explorer',
    description: 'Unlock 10 helpful hints across your journey',
    icon: 'Lightbulb',
    rewardCoins: 50,
    maxProgress: 10,
    getProgress: (p: PlayerProfile) => {
      let hintsUsed = 0;
      Object.values(p.unlockedHints).forEach((arr) => {
        hintsUsed += arr.length;
      });
      return Math.min(10, hintsUsed);
    },
  },
  {
    id: 'daily_detective',
    title: 'Daily Detective',
    description: 'Complete 7 daily mysteries',
    icon: 'Calendar',
    rewardCoins: 150,
    maxProgress: 7,
    getProgress: (p: PlayerProfile) => Math.min(7, p.completedDailyDates.length),
  },
  {
    id: 'chapter_master',
    title: 'Chapter Master',
    description: 'Complete all 20 levels in any single chapter',
    icon: 'CheckCircle2',
    rewardCoins: 200,
    maxProgress: 1,
    getProgress: (p: PlayerProfile) => {
      // Check each chapter 1..10
      for (let ch = 1; ch <= 10; ch++) {
        const start = (ch - 1) * 20 + 1;
        const end = ch * 20;
        let complete = true;
        for (let l = start; l <= end; l++) {
          if (!p.completedLevels.includes(l)) {
            complete = false;
            break;
          }
        }
        if (complete) return 1;
      }
      return 0;
    },
  },
  {
    id: 'question_expert',
    title: 'Question Expert',
    description: 'Ask 500 questions in your detective career',
    icon: 'HelpCircle',
    rewardCoins: 200,
    maxProgress: 500,
    getProgress: (p: PlayerProfile) => Math.min(500, p.totalQuestionsAsked),
  },
];
