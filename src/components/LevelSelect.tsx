import React from 'react';
import { Lock, Check, Sparkles, ArrowLeft } from 'lucide-react';
import { Chapter, MysteryLevel, PlayerProfile } from '../types/game';
import { getLevelsByChapter, getLevelReward } from '../data/levels';
import { sound } from '../services/sound';

interface LevelSelectProps {
  chapter: Chapter;
  profile: PlayerProfile;
  onSelectLevel: (level: MysteryLevel) => void;
  onBackToChapters: () => void;
}

export const LevelSelect: React.FC<LevelSelectProps> = ({
  chapter,
  profile,
  onSelectLevel,
  onBackToChapters,
}) => {
  const levels = getLevelsByChapter(chapter.id);
  const currentHighest = profile.highestLevelUnlocked;

  return (
    <div className="flex-1 max-w-md mx-auto w-full px-4 py-4 overflow-y-auto">
      {/* Chapter Banner */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => {
            sound.playClick();
            onBackToChapters();
          }}
          className="flex items-center gap-1.5 text-xs font-semibold text-purple-300 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" /> All Chapters
        </button>

        <span
          className="text-xs font-bold px-2.5 py-0.5 rounded-full"
          style={{ backgroundColor: `${chapter.color}25`, color: chapter.color }}
        >
          Chapter {chapter.id}
        </span>
      </div>

      <div className="bg-[#1A2140] rounded-2xl p-4 border border-white/10 mb-4 shadow-md">
        <h2 className="text-xl font-bold font-display text-white">{chapter.title}</h2>
        <p className="text-xs text-slate-300 mt-1">{chapter.subtitle}</p>
        <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
          <span>Cases {chapter.levelStart} – {chapter.levelEnd}</span>
          <span>·</span>
          <span>Reward: +{getLevelReward(chapter.levelStart)} coins/level</span>
        </div>
      </div>

      {/* 20 Levels Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 pb-8">
        {levels.map((lvl) => {
          const isCompleted = profile.completedLevels.includes(lvl.id);
          const isCurrent = lvl.id === currentHighest && !isCompleted;
          const isUnlocked = lvl.id <= currentHighest || isCompleted;

          return (
            <button
              key={lvl.id}
              disabled={!isUnlocked}
              onClick={() => {
                if (isUnlocked) {
                  sound.playClick();
                  onSelectLevel(lvl);
                } else {
                  sound.playNo();
                }
              }}
              className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center font-bold transition-all ${
                isCompleted
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/40 active:scale-95'
                  : isCurrent
                  ? 'bg-gradient-to-tr from-[#8257FF] to-[#6035FF] text-white border-2 border-[#FFC857] shadow-lg shadow-amber-500/30 animate-pulse-gold active:scale-95'
                  : isUnlocked
                  ? 'bg-[#8257FF] hover:bg-[#7245EE] text-white shadow-md active:scale-95'
                  : 'bg-[#151A30] text-slate-600 border border-slate-800/80 cursor-not-allowed opacity-60'
              }`}
            >
              {/* Badge for Current Level */}
              {isCurrent && (
                <span className="absolute -top-1.5 -right-1 px-1.5 py-0.2 bg-[#FFC857] text-[#101426] text-[9px] font-black rounded-full shadow-sm">
                  NEW
                </span>
              )}

              {isCompleted ? (
                <>
                  <Check className="w-5 h-5 stroke-[3] text-white mb-0.5" />
                  <span className="text-[11px] font-bold text-emerald-100">{lvl.id}</span>
                </>
              ) : isUnlocked ? (
                <>
                  <span className="text-lg font-extrabold tracking-tight">{lvl.id}</span>
                  {isCurrent && <Sparkles className="w-3 h-3 text-[#FFC857]" />}
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-slate-500 mb-0.5" />
                  <span className="text-xs font-semibold text-slate-500">{lvl.id}</span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
