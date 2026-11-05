import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Sparkles, BookOpen, Home, Coins, Crown, CheckCircle2 } from 'lucide-react';
import { PlayerProfile } from '../types/game';
import { DetectiveAlex } from './DetectiveAlex';
import { sound } from '../services/sound';

interface FinalTrophyScreenProps {
  profile: PlayerProfile;
  onReplayChapters: () => void;
  onGoHome: () => void;
}

export const FinalTrophyScreen: React.FC<FinalTrophyScreenProps> = ({
  profile,
  onReplayChapters,
  onGoHome,
}) => {
  useEffect(() => {
    sound.playAchievementUnlocked();
    try {
      const end = Date.now() + 3000;
      const interval = setInterval(() => {
        if (Date.now() > end) {
          return clearInterval(interval);
        }
        confetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
          colors: ['#FFC857', '#8257FF', '#35C98B', '#FFFFFF'],
        });
      }, 250);
      return () => clearInterval(interval);
    } catch {}
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full px-4 py-6 overflow-y-auto text-center select-none">
      {/* Top Trophy Banner */}
      <div className="flex flex-col items-center pt-2">
        <div className="relative mb-3">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 via-[#FFC857] to-yellow-200 text-[#101426] flex items-center justify-center shadow-2xl shadow-amber-500/50 animate-pulse-gold">
            <Trophy className="w-12 h-12 stroke-[2.5]" />
          </div>
          <Crown className="w-8 h-8 text-amber-300 absolute -top-3 -right-2 animate-bounce" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-amber-200">
          CONGRATULATIONS!
        </h1>
        <h2 className="text-xl sm:text-2xl font-black text-[#FFC857] font-display mt-0.5 tracking-wider">
          YOU ARE THE ULTIMATE DETECTIVE!
        </h2>
        <p className="text-xs font-semibold text-purple-200 uppercase tracking-widest mt-2">
          You solved all 200 mysteries. The mystery journey is complete.
        </p>
      </div>

      {/* Mascot Celebratory View */}
      <div className="my-3">
        <DetectiveAlex
          pose="victory"
          size="lg"
          showDialogue={true}
          dialogue="You are the true Master Detective! Every puzzle and case has been conquered!"
        />
      </div>

      {/* 200/200 Master Badge Card */}
      <div className="bg-[#1A2140] border-2 border-[#FFC857]/60 rounded-3xl p-4 shadow-2xl my-2">
        <div className="flex items-center justify-center gap-2 mb-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-[#FFC857]" />
          <span>Supreme Detective Honors</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-[#101426]/70 rounded-xl p-3 border border-white/5 flex flex-col items-center">
            <span className="text-[10px] text-slate-400">Cases Solved</span>
            <span className="text-lg font-black text-emerald-400 tabular-nums">200 / 200</span>
            <span className="text-[10px] text-emerald-300 flex items-center gap-0.5 mt-0.5">
              <CheckCircle2 className="w-3 h-3" /> 100% Complete
            </span>
          </div>

          <div className="bg-[#101426]/70 rounded-xl p-3 border border-white/5 flex flex-col items-center">
            <span className="text-[10px] text-slate-400">Grand Bonus</span>
            <span className="text-lg font-black text-[#FFC857] tabular-nums">+1,000🪙</span>
            <span className="text-[10px] text-amber-300">Golden Trophy Unlocked</span>
          </div>
        </div>

        <div className="mt-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-slate-300 text-[11px] leading-relaxed">
          From Level 1's missing cake to Level 200's grand inquiry, your deductive mind pieced together every single truth.
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5 w-full mt-auto pt-2">
        <button
          onClick={() => {
            sound.playClick();
            onReplayChapters();
          }}
          className="w-full min-h-[52px] py-3 px-6 rounded-2xl bg-gradient-to-r from-[#FFC857] to-amber-400 text-slate-900 font-black text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <BookOpen className="w-4 h-4 text-slate-900" />
          <span>REPLAY CHAPTERS & CASES</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onGoHome();
          }}
          className="w-full min-h-[48px] py-2.5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4 text-emerald-400" />
          <span>RETURN HOME</span>
        </button>
      </div>
    </div>
  );
};
