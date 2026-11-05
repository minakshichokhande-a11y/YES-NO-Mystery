import React from 'react';
import {
  User,
  Coins,
  CheckCircle2,
  HelpCircle,
  Clock,
  Trophy,
  Flame,
  Lightbulb,
  Award,
} from 'lucide-react';
import { PlayerProfile } from '../types/game';
import { CHAPTERS } from '../data/chapters';
import { DetectiveAlex } from './DetectiveAlex';

interface StatisticsModalProps {
  profile: PlayerProfile;
  onBack: () => void;
}

export const StatisticsModal: React.FC<StatisticsModalProps> = ({
  profile,
  onBack,
}) => {
  const solvedCount = profile.completedLevels.length;
  const completionPercentage = Math.round((solvedCount / 200) * 100);
  const highestChapter = Math.min(10, 1 + Math.floor((profile.highestLevelUnlocked - 1) / 20));

  let totalHintsUsed = 0;
  Object.values(profile.unlockedHints).forEach((arr) => {
    totalHintsUsed += arr.length;
  });

  const avgQuestions =
    solvedCount > 0 ? (profile.totalQuestionsAsked / solvedCount).toFixed(1) : '0';

  const formatPlayTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m ${totalSeconds % 60}s`;
  };

  return (
    <div className="flex-1 max-w-md mx-auto w-full px-4 py-4 overflow-y-auto">
      {/* Profile Card */}
      <div className="bg-[#1A2140] border border-[#8257FF]/40 rounded-3xl p-5 shadow-xl mb-4 text-center flex flex-col items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />

        <div className="mb-2">
          <DetectiveAlex pose="happy" size="md" showDialogue={false} />
        </div>

        <h2 className="text-xl font-bold font-display text-white">{profile.name}</h2>
        <span className="text-xs font-semibold text-amber-300 mt-0.5">
          Master Detective Rank {highestChapter}
        </span>

        {/* Big Key Stats Grid */}
        <div className="grid grid-cols-3 gap-2 w-full mt-4 text-center">
          <div className="bg-[#101426]/70 rounded-2xl p-2.5 border border-white/5">
            <span className="text-[10px] text-slate-400 block">Total Solved</span>
            <span className="text-base font-black text-emerald-400 tabular-nums">
              {solvedCount} / 200
            </span>
            <span className="text-[9px] text-slate-500">{completionPercentage}%</span>
          </div>

          <div className="bg-[#101426]/70 rounded-2xl p-2.5 border border-white/5">
            <span className="text-[10px] text-slate-400 block">Mystery Coins</span>
            <div className="flex items-center justify-center gap-1 text-base font-black text-[#FFC857] tabular-nums">
              <Coins className="w-3.5 h-3.5" />
              <span>{profile.coins.toLocaleString()}</span>
            </div>
            <span className="text-[9px] text-slate-500">Available</span>
          </div>

          <div className="bg-[#101426]/70 rounded-2xl p-2.5 border border-white/5">
            <span className="text-[10px] text-slate-400 block">Daily Streak</span>
            <div className="flex items-center justify-center gap-1 text-base font-black text-rose-400 tabular-nums">
              <Flame className="w-3.5 h-3.5" />
              <span>{profile.dailyStreak}d</span>
            </div>
            <span className="text-[9px] text-slate-500">Days active</span>
          </div>
        </div>
      </div>

      {/* Forensic Performance Metrics */}
      <div className="bg-[#1A2140] border border-white/10 rounded-2xl p-4 shadow-md mb-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
          Investigation Metrics
        </h3>

        <div className="grid grid-cols-2 gap-2.5 text-xs">
          <div className="bg-[#101426]/60 rounded-xl p-3 border border-white/5 flex items-center gap-2.5">
            <HelpCircle className="w-5 h-5 text-purple-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block">Total Questions</span>
              <span className="font-bold text-white text-sm tabular-nums">
                {profile.totalQuestionsAsked}
              </span>
            </div>
          </div>

          <div className="bg-[#101426]/60 rounded-xl p-3 border border-white/5 flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block">Play Time</span>
              <span className="font-bold text-white text-sm font-mono">
                {formatPlayTime(profile.totalTimePlayedSeconds)}
              </span>
            </div>
          </div>

          <div className="bg-[#101426]/60 rounded-xl p-3 border border-white/5 flex items-center gap-2.5">
            <Lightbulb className="w-5 h-5 text-yellow-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block">Hints Unlocked</span>
              <span className="font-bold text-white text-sm tabular-nums">{totalHintsUsed}</span>
            </div>
          </div>

          <div className="bg-[#101426]/60 rounded-xl p-3 border border-white/5 flex items-center gap-2.5">
            <Award className="w-5 h-5 text-sky-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block">Avg Qs / Case</span>
              <span className="font-bold text-white text-sm tabular-nums">{avgQuestions}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter Breakdown */}
      <div className="bg-[#1A2140] border border-white/10 rounded-2xl p-4 shadow-md mb-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
          Chapter Breakdown
        </h3>

        <div className="flex flex-col gap-2.5">
          {CHAPTERS.map((ch) => {
            let solved = 0;
            for (let l = ch.levelStart; l <= ch.levelEnd; l++) {
              if (profile.completedLevels.includes(l)) solved++;
            }
            const pct = Math.round((solved / 20) * 100);

            return (
              <div key={ch.id} className="text-xs">
                <div className="flex items-center justify-between mb-1 text-slate-300">
                  <span className="font-semibold truncate">
                    Ch {ch.id}. {ch.title}
                  </span>
                  <span className="tabular-nums font-mono text-slate-400">
                    {solved} / 20 ({pct}%)
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: ch.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
