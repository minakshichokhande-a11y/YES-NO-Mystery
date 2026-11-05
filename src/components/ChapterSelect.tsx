import React from 'react';
import {
  Sparkles,
  GraduationCap,
  Home,
  ShieldAlert,
  Compass,
  Feather,
  FlaskConical,
  Landmark,
  BrainCircuit,
  Trophy,
  Lock,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { CHAPTERS } from '../data/chapters';
import { Chapter, PlayerProfile } from '../types/game';
import { sound } from '../services/sound';

interface ChapterSelectProps {
  profile: PlayerProfile;
  onSelectChapter: (chapter: Chapter) => void;
}

export const ChapterSelect: React.FC<ChapterSelectProps> = ({
  profile,
  onSelectChapter,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles': return Sparkles;
      case 'GraduationCap': return GraduationCap;
      case 'Home': return Home;
      case 'ShieldAlert': return ShieldAlert;
      case 'Compass': return Compass;
      case 'Feather': return Feather;
      case 'FlaskConical': return FlaskConical;
      case 'Landmark': return Landmark;
      case 'BrainCircuit': return BrainCircuit;
      case 'Trophy': return Trophy;
      default: return Sparkles;
    }
  };

  return (
    <div className="flex-1 max-w-md mx-auto w-full px-4 py-4 overflow-y-auto">
      <div className="mb-4">
        <h2 className="text-xl font-bold font-display text-white">Select Chapter</h2>
        <p className="text-xs text-slate-400">10 Chapters · 200 Handcrafted Detective Cases</p>
      </div>

      <div className="flex flex-col gap-3 pb-8">
        {CHAPTERS.map((ch) => {
          const Icon = getIcon(ch.iconName);
          // Unlock condition: Chapter 1 is always unlocked. Subsequent chapters require completing the previous chapter's final level.
          const isUnlocked = ch.id === 1 || profile.completedLevels.includes((ch.id - 1) * 20);

          // Calculate completed levels in this chapter
          let completedInChapter = 0;
          for (let l = ch.levelStart; l <= ch.levelEnd; l++) {
            if (profile.completedLevels.includes(l)) {
              completedInChapter++;
            }
          }
          const percent = Math.round((completedInChapter / 20) * 100);
          const isCompleted = completedInChapter === 20;

          return (
            <button
              key={ch.id}
              disabled={!isUnlocked}
              onClick={() => {
                if (isUnlocked) {
                  sound.playClick();
                  onSelectChapter(ch);
                } else {
                  sound.playNo();
                }
              }}
              style={{
                borderColor: isUnlocked ? `${ch.color}55` : 'rgba(255,255,255,0.08)',
              }}
              className={`w-full text-left rounded-2xl p-4 border transition-all relative overflow-hidden ${
                isUnlocked
                  ? 'bg-[#1A2140] hover:bg-[#202952] active:scale-[0.99] shadow-md'
                  : 'bg-[#12162A]/60 opacity-60 cursor-not-allowed'
              }`}
            >
              {/* Subtle chapter color background gradient */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundColor: ch.color }}
              />

              <div className="relative flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
                    style={{
                      backgroundColor: isUnlocked ? `${ch.color}25` : '#1A2140',
                      color: isUnlocked ? ch.color : '#64748B',
                    }}
                  >
                    {isUnlocked ? <Icon className="w-6 h-6" /> : <Lock className="w-5 h-5 text-slate-500" />}
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Chapter {ch.id}
                      </span>
                      {isCompleted && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" /> Solved
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white font-display leading-snug">
                      {ch.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {ch.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0">
                  <div className="flex items-center text-xs font-semibold text-slate-300">
                    <span className="text-white font-bold">{completedInChapter}</span>/20
                    <ChevronRight className="w-4 h-4 text-slate-500 ml-1" />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1">{percent}%</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative w-full h-1.5 bg-slate-800/80 rounded-full mt-3 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${percent}%`,
                    backgroundColor: isCompleted ? '#35C98B' : ch.color,
                  }}
                />
              </div>

              {!isUnlocked && (
                <div className="mt-2 text-[10px] font-medium text-amber-400/90 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Complete Case #{(ch.id - 1) * 20} to unlock
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
