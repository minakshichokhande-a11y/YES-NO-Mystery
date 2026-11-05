import { MysteryLevel } from '../../types/game';
import { CHAPTER_1_LEVELS } from './chapter1';
import { CHAPTER_2_LEVELS } from './chapter2';
import { CHAPTER_3_LEVELS } from './chapter3';
import { CHAPTER_4_LEVELS } from './chapter4';
import { CHAPTER_5_LEVELS } from './chapter5';
import { CHAPTER_6_LEVELS } from './chapter6';
import { CHAPTER_7_LEVELS } from './chapter7';
import { CHAPTER_8_LEVELS } from './chapter8';
import { CHAPTER_9_LEVELS } from './chapter9';
import { CHAPTER_10_LEVELS } from './chapter10';

export const ALL_LEVELS: MysteryLevel[] = [
  ...CHAPTER_1_LEVELS,
  ...CHAPTER_2_LEVELS,
  ...CHAPTER_3_LEVELS,
  ...CHAPTER_4_LEVELS,
  ...CHAPTER_5_LEVELS,
  ...CHAPTER_6_LEVELS,
  ...CHAPTER_7_LEVELS,
  ...CHAPTER_8_LEVELS,
  ...CHAPTER_9_LEVELS,
  ...CHAPTER_10_LEVELS,
];

export function getLevelById(id: number): MysteryLevel | undefined {
  return ALL_LEVELS.find((lvl) => lvl.id === id);
}

export function getLevelsByChapter(chapterId: number): MysteryLevel[] {
  return ALL_LEVELS.filter((lvl) => lvl.chapterId === chapterId);
}

export function getLevelReward(levelId: number): number {
  if (levelId === 200) return 1000;
  if (levelId <= 20) return 20;
  if (levelId <= 40) return 25;
  if (levelId <= 60) return 30;
  if (levelId <= 80) return 35;
  if (levelId <= 100) return 40;
  if (levelId <= 120) return 45;
  if (levelId <= 140) return 50;
  if (levelId <= 160) return 55;
  if (levelId <= 180) return 60;
  return 75; // Levels 181-199
}

export const CHAPTER_BONUS_COINS = 200;

export const HINT_PRICES: Record<number, number> = {
  1: 10,
  2: 20,
  3: 30,
};
