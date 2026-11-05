import React, { memo } from 'react';
import { DetectivePose } from '../types/game';

interface DetectiveAlexProps {
  pose?: DetectivePose;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  dialogue?: string;
  className?: string;
  showDialogue?: boolean;
}

export const DetectiveAlex: React.FC<DetectiveAlexProps> = memo(({
  pose = 'idle',
  size = 'md',
  dialogue,
  className = '',
  showDialogue = false,
}) => {
  const mainImage = '/src/assets/images/detective_alex_main_1793883122095.jpg';
  const victoryImage = '/src/assets/images/detective_alex_victory_1793883123075.jpg';

  const isVictory = pose === 'victory' || pose === 'happy';
  const currentImage = isVictory ? victoryImage : mainImage;

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-44 h-44',
    xl: 'w-60 h-60',
  }[size];

  const poseBadge = {
    idle: { icon: '🔍', text: 'Ready', color: 'bg-indigo-500/80 text-white' },
    thinking: { icon: '🤔', text: 'Pondering...', color: 'bg-amber-500/80 text-white' },
    investigating: { icon: '🔎', text: 'Examining clues...', color: 'bg-purple-500/80 text-white' },
    happy: { icon: '✨', text: 'Case Solved!', color: 'bg-emerald-500/80 text-white' },
    confused: { icon: '❓', text: 'Needs clarification', color: 'bg-blue-500/80 text-white' },
    sad: { icon: '💭', text: 'Try another angle', color: 'bg-rose-500/80 text-white' },
    victory: { icon: '🏆', text: 'Ultimate Detective!', color: 'bg-amber-400 text-slate-900 font-bold' },
  }[pose];

  const defaultDialogue = {
    idle: 'Ready to solve a mystery?',
    thinking: 'Hmm... let us examine the verified facts.',
    investigating: 'Excellent question, detective!',
    happy: 'Another mystery solved! Superb work!',
    confused: 'Can you ask that in another way?',
    sad: 'Not quite! Look at the clues again.',
    victory: 'You are the Ultimate Detective!',
  }[pose];

  const speechText = dialogue || defaultDialogue;

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Speech bubble if enabled */}
      {showDialogue && (
        <div className="relative mb-3 max-w-[280px] bg-[#1A2140] text-slate-100 border border-[#8257FF]/40 rounded-2xl px-4 py-2.5 shadow-lg shadow-purple-950/30 text-center animate-in fade-in duration-150">
          <p className="text-xs sm:text-sm font-medium leading-snug">{speechText}</p>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#1A2140]" />
        </div>
      )}

      {/* Detective Alex Character Container */}
      <div className="relative group">
        <div
          className={`relative ${sizeClasses} rounded-full overflow-hidden border-2 border-[#8257FF]/60 shadow-xl shadow-purple-950/40 bg-[#1A2140] will-change-transform ${
            pose === 'idle' ? 'animate-float-slow' : ''
          }`}
        >
          <img
            src={currentImage}
            alt="Detective Alex"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
            loading="eager"
            decoding="async"
          />

          {/* Pose overlay indicator if not standard idle */}
          {pose !== 'idle' && (
            <div className="absolute bottom-1 right-1/2 translate-x-1/2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-sm shadow-md border border-white/20 whitespace-nowrap bg-black/70">
              <span>{poseBadge.icon}</span>
              <span>{poseBadge.text}</span>
            </div>
          )}
        </div>

        {/* Optimized glow halo */}
        <div className="absolute inset-0 -z-10 rounded-full bg-purple-600/20 blur-md scale-95 pointer-events-none" />
      </div>
    </div>
  );
});
