import React, { useState, useEffect } from 'react';
import {
  ScreenType,
  MysteryLevel,
  Chapter,
  PlayerProfile,
  GameMode,
} from './types/game';
import { CHAPTERS } from './data/chapters';
import { ALL_LEVELS, getLevelById, getLevelReward, CHAPTER_BONUS_COINS } from './data/levels';
import {
  loadProfile,
  saveProfile,
  resetGameData,
} from './services/storage';
import { sound } from './services/sound';

import { SplashScreen } from './components/SplashScreen';
import { TopHeader } from './components/TopHeader';
import { MainMenu } from './components/MainMenu';
import { ChapterSelect } from './components/ChapterSelect';
import { LevelSelect } from './components/LevelSelect';
import { MysteryGameplay } from './components/MysteryGameplay';
import { VictoryScreen } from './components/VictoryScreen';
import { DailyMystery } from './components/DailyMystery';
import { GameModes } from './components/GameModes';
import { SpecialGameModeScreen } from './components/SpecialGameModeScreen';
import { AchievementsModal } from './components/AchievementsModal';
import { StatisticsModal } from './components/StatisticsModal';
import { SettingsModal } from './components/SettingsModal';
import { PauseMenu } from './components/PauseMenu';
import { FinalTrophyScreen } from './components/FinalTrophyScreen';
import { BottomNav } from './components/BottomNav';

export default function App() {
  const [screen, setScreen] = useState<ScreenType>('SPLASH');
  const [profile, setProfile] = useState<PlayerProfile>(loadProfile);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [currentLevel, setCurrentLevel] = useState<MysteryLevel | null>(null);
  const [activeSpecialMode, setActiveSpecialMode] = useState<GameMode | null>(null);
  const [isPauseOpen, setIsPauseOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Victory screen state
  const [victoryStats, setVictoryStats] = useState<{
    earnedCoins: number;
    timeSeconds: number;
    questionsCount: number;
  }>({ earnedCoins: 0, timeSeconds: 0, questionsCount: 0 });

  // Save profile changes automatically
  const updateProfile = (updater: (prev: PlayerProfile) => PlayerProfile) => {
    setProfile((prev) => {
      const next = updater(prev);
      saveProfile(next);
      return next;
    });
  };

  // Sync initial sound settings
  useEffect(() => {
    sound.setMuted(!profile.settings.soundEffects);
    if (profile.settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Track play time in background
  useEffect(() => {
    const timer = setInterval(() => {
      updateProfile((p) => ({
        ...p,
        totalTimePlayedSeconds: p.totalTimePlayedSeconds + 1,
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle Android Back Navigation
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      handleBackNavigation();
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  });

  const handleBackNavigation = () => {
    if (isPauseOpen) {
      setIsPauseOpen(false);
      return;
    }
    if (isSettingsOpen) {
      setIsSettingsOpen(false);
      return;
    }
    if (screen === 'GAMEPLAY') {
      setIsPauseOpen(true);
      return;
    }
    if (screen === 'LEVEL_SELECT') {
      setScreen('CHAPTER_SELECT');
      return;
    }
    if (['CHAPTER_SELECT', 'DAILY_MYSTERY', 'GAME_MODES', 'ACHIEVEMENTS', 'STATISTICS', 'FINAL_VICTORY'].includes(screen)) {
      setScreen('MAIN_MENU');
      return;
    }
  };

  // Play next unfinished level (or current)
  const handlePlayNextLevel = () => {
    const nextId = Math.min(200, profile.highestLevelUnlocked);
    const targetLvl = getLevelById(nextId) || ALL_LEVELS[0];
    const ch = CHAPTERS.find((c) => c.id === targetLvl.chapterId) || CHAPTERS[0];

    setSelectedChapter(ch);
    setCurrentLevel(targetLvl);
    setScreen('GAMEPLAY');
  };

  const handleSelectChapter = (ch: Chapter) => {
    setSelectedChapter(ch);
    setScreen('LEVEL_SELECT');
  };

  const handleSelectLevel = (lvl: MysteryLevel) => {
    setCurrentLevel(lvl);
    setScreen('GAMEPLAY');
  };

  const handleLevelCompleted = (
    lvl: MysteryLevel,
    timeSeconds: number,
    questionsCount: number
  ) => {
    const isFirstTime = !profile.completedLevels.includes(lvl.id);
    let reward = 0;

    if (isFirstTime) {
      reward = getLevelReward(lvl.id);
      // Check if this level completes a chapter (levels 20, 40, 60... 200)
      if (lvl.id % 20 === 0) {
        reward += CHAPTER_BONUS_COINS;
      }
    }

    // Next level to unlock
    const nextUnlocked = Math.min(200, Math.max(profile.highestLevelUnlocked, lvl.id + 1));

    updateProfile((p) => {
      const completed = isFirstTime ? [...p.completedLevels, lvl.id] : p.completedLevels;
      return {
        ...p,
        coins: p.coins + reward,
        highestLevelUnlocked: nextUnlocked,
        completedLevels: completed,
        totalQuestionsAsked: p.totalQuestionsAsked + questionsCount,
        levelQuestionsCount: {
          ...p.levelQuestionsCount,
          [lvl.id]: (p.levelQuestionsCount[lvl.id] || 0) + questionsCount,
        },
      };
    });

    setVictoryStats({
      earnedCoins: reward,
      timeSeconds,
      questionsCount,
    });

    if (lvl.id === 200) {
      setScreen('FINAL_VICTORY');
    } else {
      setScreen('VICTORY');
    }
  };

  // Proceed to next level from Victory Screen
  const handleProceedNextLevel = () => {
    if (!currentLevel) return;

    if (currentLevel.id >= 200) {
      setScreen('FINAL_VICTORY');
      return;
    }

    const nextId = currentLevel.id + 1;
    const nextLvl = getLevelById(nextId);
    if (nextLvl) {
      const nextCh = CHAPTERS.find((c) => c.id === nextLvl.chapterId) || CHAPTERS[0];
      setSelectedChapter(nextCh);
      setCurrentLevel(nextLvl);
      setScreen('GAMEPLAY');
    }
  };

  const handleReplayLevel = () => {
    if (currentLevel) {
      setScreen('GAMEPLAY');
    }
  };

  const handleUnlockHint = (levelId: number, hintIndex: number, price: number): boolean => {
    if (profile.coins < price) return false;

    updateProfile((p) => {
      const existing = p.unlockedHints[levelId] || [];
      if (existing.includes(hintIndex)) return p;
      return {
        ...p,
        coins: p.coins - price,
        unlockedHints: {
          ...p.unlockedHints,
          [levelId]: [...existing, hintIndex],
        },
      };
    });
    return true;
  };

  const handleClaimDailyReward = (coins: number) => {
    const todayStr = new Date().toISOString().split('T')[0];
    updateProfile((p) => {
      if (p.completedDailyDates.includes(todayStr)) return p;
      return {
        ...p,
        coins: p.coins + coins,
        completedDailyDates: [...p.completedDailyDates, todayStr],
        dailyStreak: p.dailyStreak + 1,
        lastDailyDate: todayStr,
      };
    });
  };

  const handleClaimAchievement = (achievementId: string, rewardCoins: number) => {
    updateProfile((p) => {
      if (p.achievementsClaimed.includes(achievementId)) return p;
      return {
        ...p,
        coins: p.coins + rewardCoins,
        achievementsClaimed: [...p.achievementsClaimed, achievementId],
      };
    });
  };

  const handleResetGame = () => {
    const refreshed = resetGameData();
    setProfile(refreshed);
    setCurrentLevel(null);
    setSelectedChapter(null);
    setScreen('MAIN_MENU');
  };

  const handleSelectGameMode = (mode: GameMode) => {
    if (mode === 'CLASSIC') {
      handlePlayNextLevel();
    } else {
      setActiveSpecialMode(mode);
    }
  };

  // Text size classes based on settings
  const textSizeClass = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  }[profile.settings.textSize];

  return (
    <div className={`min-h-screen bg-[#101426] text-white flex flex-col font-sans ${textSizeClass}`}>
      {/* 1. SPLASH SCREEN */}
      {screen === 'SPLASH' && (
        <SplashScreen onFinish={() => setScreen('MAIN_MENU')} />
      )}

      {/* 2. MAIN APPLICATION SHELL */}
      {screen !== 'SPLASH' && (
        <div className="flex-1 flex flex-col h-full w-full max-w-md mx-auto relative overflow-hidden bg-[#101426] shadow-2xl">
          {/* Top Header */}
          <TopHeader
            profile={profile}
            title={
              screen === 'CHAPTER_SELECT'
                ? 'Chapters'
                : screen === 'LEVEL_SELECT' && selectedChapter
                ? selectedChapter.title
                : screen === 'GAMEPLAY' && currentLevel
                ? `Case #${currentLevel.id}`
                : screen === 'DAILY_MYSTERY'
                ? 'Daily Mystery'
                : screen === 'GAME_MODES'
                ? 'Game Modes'
                : screen === 'ACHIEVEMENTS'
                ? 'Achievements'
                : screen === 'STATISTICS'
                ? 'Detective Profile'
                : undefined
            }
            subtitle={
              screen === 'GAMEPLAY' && currentLevel
                ? currentLevel.chapterName
                : screen === 'LEVEL_SELECT' && selectedChapter
                ? `Cases ${selectedChapter.levelStart} – ${selectedChapter.levelEnd}`
                : undefined
            }
            showBack={screen !== 'MAIN_MENU'}
            onBack={handleBackNavigation}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onToggleSound={() => {
              const next = !profile.settings.soundEffects;
              sound.setMuted(!next);
              updateProfile((p) => ({
                ...p,
                settings: { ...p.settings, soundEffects: next },
              }));
            }}
          />

          {/* Active Screen Content */}
          <main className="flex-1 flex flex-col overflow-y-auto">
            {screen === 'MAIN_MENU' && (
              <MainMenu
                profile={profile}
                onNavigate={(s) => setScreen(s)}
                onPlayNextLevel={handlePlayNextLevel}
              />
            )}

            {screen === 'CHAPTER_SELECT' && (
              <ChapterSelect
                profile={profile}
                onSelectChapter={handleSelectChapter}
              />
            )}

            {screen === 'LEVEL_SELECT' && selectedChapter && (
              <LevelSelect
                chapter={selectedChapter}
                profile={profile}
                onSelectLevel={handleSelectLevel}
                onBackToChapters={() => setScreen('CHAPTER_SELECT')}
              />
            )}

            {screen === 'GAMEPLAY' && currentLevel && (
              <MysteryGameplay
                level={currentLevel}
                profile={profile}
                onLevelCompleted={handleLevelCompleted}
                onUnlockHint={handleUnlockHint}
                onPause={() => setIsPauseOpen(true)}
                onBack={() => setIsPauseOpen(true)}
              />
            )}

            {screen === 'VICTORY' && currentLevel && (
              <VictoryScreen
                level={currentLevel}
                profile={profile}
                earnedCoins={victoryStats.earnedCoins}
                timeSeconds={victoryStats.timeSeconds}
                questionsCount={victoryStats.questionsCount}
                onNextLevel={handleProceedNextLevel}
                onReplayLevel={handleReplayLevel}
                onBackToChapter={() => setScreen('LEVEL_SELECT')}
                onGoHome={() => setScreen('MAIN_MENU')}
              />
            )}

            {screen === 'FINAL_VICTORY' && (
              <FinalTrophyScreen
                profile={profile}
                onReplayChapters={() => setScreen('CHAPTER_SELECT')}
                onGoHome={() => setScreen('MAIN_MENU')}
              />
            )}

            {screen === 'DAILY_MYSTERY' && (
              <DailyMystery
                profile={profile}
                onClaimDailyReward={handleClaimDailyReward}
                onBack={() => setScreen('MAIN_MENU')}
              />
            )}

            {screen === 'GAME_MODES' && (
              activeSpecialMode ? (
                <SpecialGameModeScreen
                  mode={activeSpecialMode}
                  profile={profile}
                  onExit={() => setActiveSpecialMode(null)}
                />
              ) : (
                <GameModes
                  profile={profile}
                  onSelectMode={handleSelectGameMode}
                  onBack={() => setScreen('MAIN_MENU')}
                />
              )
            )}

            {screen === 'ACHIEVEMENTS' && (
              <AchievementsModal
                profile={profile}
                onClaimAchievement={handleClaimAchievement}
                onBack={() => setScreen('MAIN_MENU')}
              />
            )}

            {screen === 'STATISTICS' && (
              <StatisticsModal
                profile={profile}
                onBack={() => setScreen('MAIN_MENU')}
              />
            )}
          </main>

          {/* Bottom Navigation */}
          {['MAIN_MENU', 'CHAPTER_SELECT', 'ACHIEVEMENTS', 'STATISTICS'].includes(screen) && (
            <BottomNav
              currentScreen={screen}
              onNavigate={(s) => setScreen(s)}
            />
          )}

          {/* Pause Menu Modal */}
          {isPauseOpen && (
            <PauseMenu
              onResume={() => setIsPauseOpen(false)}
              onRestartLevel={() => {
                setIsPauseOpen(false);
                // Level restarts by resetting
                const current = currentLevel;
                setCurrentLevel(null);
                setTimeout(() => setCurrentLevel(current), 50);
              }}
              onOpenSettings={() => {
                setIsPauseOpen(false);
                setIsSettingsOpen(true);
              }}
              onReturnHome={() => {
                setIsPauseOpen(false);
                setScreen('MAIN_MENU');
              }}
            />
          )}

          {/* Settings Modal */}
          {isSettingsOpen && (
            <SettingsModal
              profile={profile}
              onUpdateSettings={(newSettings) =>
                updateProfile((p) => ({ ...p, settings: newSettings }))
              }
              onResetGame={handleResetGame}
              onImportSuccess={(imported) => {
                setProfile(imported);
                setIsSettingsOpen(false);
              }}
              onClose={() => setIsSettingsOpen(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}
