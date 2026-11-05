import React from 'react';
import {
  Play,
  Calendar,
  Gamepad2,
  BookOpen,
  Trophy,
  BarChart3,
  Search,
  Sparkles,
} from 'lucide-react';
import { PlayerProfile, ScreenType } from '../types/game';
import { DetectiveAlex } from './DetectiveAlex';
import { sound } from '../services/sound';

interface MainMenuProps {
  profile: PlayerProfile;
  onNavigate: (screen: ScreenType) => void;
  onPlayNextLevel: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  profile,
  onNavigate,
  onPlayNextLevel,
}) => {
  const nextLevel = profile.highestLevelUnlocked;
  const completedCount = profile.completedLevels.length;

  return (
    <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full px-4 py-4 overflow-y-auto">
      {/* Brand Hero Center */}
      <div className="flex flex-col items-center text-center pt-2 pb-3">
        {/* Bespoke Logo Lockup */}
        <div className="flex flex-col items-center mb-1">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A2140] border border-[#8257FF]/30 text-[11px] font-semibold text-purple-300 tracking-wider uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FFC857]" />
            <span>Detective Investigation</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-purple-200 leading-none">
            YES <span className="text-[#FFC857]">/</span> NO
          </h1>
          <h2 className="text-2xl sm:text-3xl font-black tracking-widest text-[#8257FF] font-display mt-0.5">
            MYSTERY
          </h2>
          <p className="text-[11px] sm:text-xs font-semibold tracking-wider text-slate-300 uppercase mt-2">
            THINK. QUESTION. DISCOVER THE TRUTH.
          </p>
        </div>

        {/* Animated Detective Alex Mascot */}
        <div className="my-2 cursor-pointer active:scale-95 transition-transform" onClick={() => sound.playYes()}>
          <DetectiveAlex pose="idle" size="lg" showDialogue={true} dialogue="Ready to solve a mystery?" />
        </div>

        {/* Progress pill */}
        <div className="text-[11px] text-slate-400 font-medium mt-1">
          Solved <span className="text-emerald-400 font-bold tabular-nums">{completedCount}</span> / 200 cases
          {nextLevel <= 200 && (
            <span className="text-purple-300 ml-1">· Next: Case #{nextLevel}</span>
          )}
        </div>
      </div>

      {/* Main Buttons Section */}
      <div className="flex flex-col gap-2.5 w-full my-auto pb-4">
        {/* 1. PLAY GAME - Primary CTA */}
        <button
          onClick={() => {
            sound.playClick();
            onPlayNextLevel();
          }}
          className="relative group w-full min-h-[56px] py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#8257FF] via-[#7040FF] to-[#5922FF] text-white font-bold text-base shadow-lg shadow-purple-900/50 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-base font-extrabold tracking-wide uppercase">PLAY GAME</span>
              <span className="text-[11px] font-normal text-purple-200">
                Continue Case #{nextLevel}
              </span>
            </div>
          </div>
          <Play className="w-6 h-6 fill-white text-white group-hover:translate-x-1 transition-transform" />
        </button>

        {/* 2. DAILY MYSTERY */}
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('DAILY_MYSTERY');
          }}
          className="w-full min-h-[48px] py-3 px-5 rounded-2xl bg-[#1D3557] hover:bg-[#23426B] border border-blue-500/40 text-white font-semibold text-sm shadow-md active:scale-[0.98] transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-sky-400" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold">DAILY MYSTERY</span>
              <span className="text-[10px] text-sky-300">Earn +25 Bonus Mystery Coins</span>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/30">
            Streak: {profile.dailyStreak}d
          </span>
        </button>

        {/* 3. GAME MODES */}
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('GAME_MODES');
          }}
          className="w-full min-h-[48px] py-3 px-5 rounded-2xl bg-[#1A2140] hover:bg-[#222B52] border border-indigo-500/30 text-white font-semibold text-sm shadow-md active:scale-[0.98] transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <Gamepad2 className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold">GAME MODES</span>
              <span className="text-[10px] text-slate-400">Timed, Pass & Play, Endless, Expert</span>
            </div>
          </div>
          <span className="text-xs text-indigo-300">5 Modes</span>
        </button>

        {/* 4. CHAPTERS */}
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('CHAPTER_SELECT');
          }}
          className="w-full min-h-[48px] py-3 px-5 rounded-2xl bg-[#1A2140] hover:bg-[#222B52] border border-[#8257FF]/40 text-purple-200 font-semibold text-sm shadow-md active:scale-[0.98] transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-purple-400" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-white">CHAPTERS</span>
              <span className="text-[10px] text-purple-300">10 Chapters · 200 Handcrafted Levels</span>
            </div>
          </div>
          <span className="text-xs text-purple-300">View All</span>
        </button>

        {/* Row for Achievements and Statistics */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* 5. ACHIEVEMENTS */}
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('ACHIEVEMENTS');
            }}
            className="py-3 px-4 rounded-2xl bg-[#1A2140] hover:bg-[#222B52] border border-amber-500/40 text-white font-medium text-xs shadow-md active:scale-[0.98] transition-all flex items-center gap-2.5"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
              <Trophy className="w-3.5 h-3.5 text-[#FFC857]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-xs">ACHIEVEMENTS</span>
              <span className="text-[10px] text-amber-300">12 Badges</span>
            </div>
          </button>

          {/* 6. STATISTICS */}
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('STATISTICS');
            }}
            className="py-3 px-4 rounded-2xl bg-[#1A2140] hover:bg-[#222B52] border border-sky-500/40 text-white font-medium text-xs shadow-md active:scale-[0.98] transition-all flex items-center gap-2.5"
          >
            <div className="w-7 h-7 rounded-lg bg-sky-500/20 flex items-center justify-center shrink-0">
              <BarChart3 className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-xs">STATISTICS</span>
              <span className="text-[10px] text-sky-300">Accuracy & Time</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
