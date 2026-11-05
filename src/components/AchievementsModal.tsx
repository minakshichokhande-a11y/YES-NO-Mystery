import React from 'react';
import {
  Trophy,
  CheckCircle2,
  Lock,
  Coins,
  Sparkles,
  Search,
  Compass,
  BookOpen,
  Target,
  Shield,
  Award,
  Crown,
  Brain,
  Lightbulb,
  Calendar,
  HelpCircle,
} from 'lucide-react';
import { ACHIEVEMENTS } from '../data/achievements';
import { PlayerProfile } from '../types/game';
import { sound } from '../services/sound';

interface AchievementsModalProps {
  profile: PlayerProfile;
  onClaimAchievement: (achievementId: string, rewardCoins: number) => void;
  onBack: () => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  profile,
  onClaimAchievement,
  onBack,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search': return Search;
      case 'Compass': return Compass;
      case 'BookOpen': return BookOpen;
      case 'Target': return Target;
      case 'Shield': return Shield;
      case 'Award': return Award;
      case 'Crown': return Crown;
      case 'Brain': return Brain;
      case 'Lightbulb': return Lightbulb;
      case 'Calendar': return Calendar;
      case 'CheckCircle2': return CheckCircle2;
      case 'HelpCircle': return HelpCircle;
      default: return Trophy;
    }
  };

  const unlockedCount = ACHIEVEMENTS.filter(
    (a) => a.getProgress(profile) >= a.maxProgress
  ).length;

  return (
    <div className="flex-1 max-w-md mx-auto w-full px-4 py-4 overflow-y-auto">
      {/* Header Banner */}
      <div className="bg-[#1A2140] border border-amber-500/40 rounded-2xl p-4 shadow-lg mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#FFC857]" />
            <h2 className="text-lg font-bold font-display text-white">Detective Badges</h2>
          </div>
          <span className="text-xs font-bold text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/30">
            {unlockedCount} / 12 Unlocked
          </span>
        </div>
        <p className="text-xs text-slate-300">
          Earn prestigious badges and bonus Mystery Coins as you master investigative deduction.
        </p>
      </div>

      {/* Achievements List */}
      <div className="flex flex-col gap-2.5 pb-8">
        {ACHIEVEMENTS.map((ach) => {
          const Icon = getIcon(ach.icon);
          const current = ach.getProgress(profile);
          const isFinished = current >= ach.maxProgress;
          const isClaimed = profile.achievementsClaimed.includes(ach.id);
          const percent = Math.min(100, Math.round((current / ach.maxProgress) * 100));

          return (
            <div
              key={ach.id}
              className={`rounded-2xl p-3.5 border transition-all relative overflow-hidden ${
                isFinished
                  ? 'bg-[#1A2140] border-amber-500/40 shadow-md'
                  : 'bg-[#12162A]/80 border-white/5 opacity-80'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                      isFinished
                        ? 'bg-amber-500/20 text-[#FFC857] border-amber-500/40 shadow-sm'
                        : 'bg-slate-800 text-slate-500 border-white/5'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white font-display">{ach.title}</h3>
                    <p className="text-[11px] text-slate-300 mt-0.5">{ach.description}</p>
                    <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                      Progress: {current} / {ach.maxProgress} ({percent}%)
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-end">
                  {isFinished ? (
                    isClaimed ? (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                        Claimed
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          sound.playCoin();
                          onClaimAchievement(ach.id, ach.rewardCoins);
                        }}
                        className="text-xs font-bold px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#FFC857] to-amber-400 text-slate-900 shadow-md animate-pulse active:scale-95 transition-all flex items-center gap-1"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>+{ach.rewardCoins}🪙</span>
                      </button>
                    )
                  ) : (
                    <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 bg-slate-800/60 px-2 py-1 rounded-lg">
                      <Lock className="w-3 h-3 text-slate-500" />
                      <span>+{ach.rewardCoins}🪙</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1 bg-slate-800 rounded-full mt-2.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-[#FFC857] transition-all duration-300"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
