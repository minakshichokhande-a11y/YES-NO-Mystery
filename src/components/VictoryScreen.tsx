import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Home,
  Coins,
  Clock,
  HelpCircle,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { MysteryLevel, PlayerProfile } from '../types/game';
import { DetectiveAlex } from './DetectiveAlex';
import { sound } from '../services/sound';

interface VictoryScreenProps {
  level: MysteryLevel;
  profile: PlayerProfile;
  earnedCoins: number;
  timeSeconds: number;
  questionsCount: number;
  onNextLevel: () => void;
  onReplayLevel: () => void;
  onBackToChapter: () => void;
  onGoHome: () => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({
  level,
  profile,
  earnedCoins,
  timeSeconds,
  questionsCount,
  onNextLevel,
  onReplayLevel,
  onBackToChapter,
  onGoHome,
}) => {
  useEffect(() => {
    // Confetti celebration
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FFC857', '#8257FF', '#35C98B', '#FFFFFF'],
      });
    } catch {}
  }, []);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const isFinalLevel = level.id === 200;
  const isChapterEnd = level.id % 20 === 0 && !isFinalLevel;

  return (
    <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full px-4 py-4 overflow-y-auto select-none">
      {/* Top Header / Trophy */}
      <div className="flex flex-col items-center text-center pt-2">
        <div className="relative mb-2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FFC857] to-amber-300 flex items-center justify-center text-[#101426] shadow-xl shadow-amber-500/40 animate-pulse-gold">
            <Trophy className="w-8 h-8 stroke-[2.5]" />
          </div>
          <Sparkles className="w-5 h-5 text-amber-300 absolute -top-1 -right-1 animate-spin duration-3000" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black font-display text-white tracking-wide">
          {isFinalLevel ? 'ULTIMATE DETECTIVE!' : 'MYSTERY SOLVED!'}
        </h1>
        <p className="text-xs font-semibold text-purple-300 tracking-wider uppercase mt-0.5">
          {isFinalLevel
            ? 'You have solved all 200 mysteries!'
            : 'Excellent detective work!'}
        </p>

        {/* Detective Alex celebratory pose */}
        <div className="my-2">
          <DetectiveAlex
            pose="victory"
            size="md"
            showDialogue={false}
          />
        </div>
      </div>

      {/* Case Summary Card */}
      <div className="bg-[#1A2140] border border-[#8257FF]/40 rounded-3xl p-4 shadow-xl mb-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 text-xs">
          <span className="text-slate-400 font-semibold">{level.chapterName}</span>
          <span className="font-bold text-[#FFC857]">Case #{level.id} Complete</span>
        </div>

        <h2 className="text-base font-bold text-white font-display mb-1.5">{level.title}</h2>

        {/* Official Truth Revealed */}
        <div className="bg-[#101426]/70 border border-emerald-500/30 rounded-xl p-3 mb-3">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>The Official Truth</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-normal">
            {level.solution}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-[#101426]/50 rounded-xl p-2 border border-white/5">
            <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px]">
              <HelpCircle className="w-3 h-3 text-purple-400" />
              <span>Questions</span>
            </div>
            <span className="text-sm font-bold text-white tabular-nums">{questionsCount}</span>
          </div>

          <div className="bg-[#101426]/50 rounded-xl p-2 border border-white/5">
            <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px]">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>Time</span>
            </div>
            <span className="text-sm font-bold text-white tabular-nums font-mono">{formatTime(timeSeconds)}</span>
          </div>

          <div className="bg-[#101426]/50 rounded-xl p-2 border border-white/5">
            <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px]">
              <Coins className="w-3 h-3 text-[#FFC857]" />
              <span>Reward</span>
            </div>
            <span className="text-sm font-bold text-[#FFC857] tabular-nums">+{earnedCoins}</span>
          </div>
        </div>

        {/* Total Coin Balance */}
        <div className="mt-3 flex items-center justify-between bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-1.5 text-xs">
          <span className="text-slate-300">Total Mystery Coins:</span>
          <div className="flex items-center gap-1 font-bold text-[#FFC857]">
            <Coins className="w-3.5 h-3.5" />
            <span className="tabular-nums">{profile.coins.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2.5 w-full pb-2">
        {/* NEXT LEVEL / ULTIMATE DETECTIVE BUTTON */}
        <button
          onClick={() => {
            sound.playClick();
            onNextLevel();
          }}
          className="w-full min-h-[56px] py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FFC857] via-amber-400 to-[#FFC857] text-[#101426] font-black text-sm sm:text-base shadow-xl shadow-amber-500/20 hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          {isFinalLevel ? (
            <>
              <Trophy className="w-5 h-5 text-[#101426]" />
              <span>ULTIMATE DETECTIVE FINISHED!</span>
            </>
          ) : isChapterEnd ? (
            <>
              <span>UNLOCK CHAPTER {Math.floor(level.id / 20) + 1}</span>
              <ArrowRight className="w-5 h-5" />
            </>
          ) : (
            <>
              <span>NEXT LEVEL (CASE #{level.id + 1})</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        {/* Secondary Buttons Row */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => {
              sound.playClick();
              onReplayLevel();
            }}
            className="py-2.5 rounded-xl bg-[#1A2140] hover:bg-[#222B52] border border-white/10 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-purple-300" />
            <span>Replay</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onBackToChapter();
            }}
            className="py-2.5 rounded-xl bg-[#1A2140] hover:bg-[#222B52] border border-white/10 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all"
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
            <span>Chapters</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onGoHome();
            }}
            className="py-2.5 rounded-xl bg-[#1A2140] hover:bg-[#222B52] border border-white/10 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all"
          >
            <Home className="w-3.5 h-3.5 text-emerald-400" />
            <span>Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
