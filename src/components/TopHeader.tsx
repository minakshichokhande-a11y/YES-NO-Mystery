import React from 'react';
import { ArrowLeft, Coins, Settings, Volume2, VolumeX } from 'lucide-react';
import { PlayerProfile } from '../types/game';
import { sound } from '../services/sound';

interface TopHeaderProps {
  profile: PlayerProfile;
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  onOpenSettings: () => void;
  onToggleSound?: () => void;
  showBack?: boolean;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  profile,
  title,
  subtitle,
  onBack,
  onOpenSettings,
  onToggleSound,
  showBack = false,
}) => {
  const detectiveRank = Math.min(10, 1 + Math.floor(profile.completedLevels.length / 20));

  return (
    <header className="sticky top-0 z-30 w-full bg-[#101426]/90 backdrop-blur-md border-b border-slate-800/80 px-3 py-2.5 sm:px-4 sm:py-3 select-none">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        {/* Left Section */}
        <div className="flex items-center gap-2 min-w-0">
          {showBack && onBack ? (
            <button
              onClick={() => {
                sound.playClick();
                onBack();
              }}
              className="w-10 h-10 -ml-1 rounded-xl flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800/80 active:scale-95 transition-all"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-[#8257FF]/60 bg-[#1A2140] shrink-0">
                <img
                  src="/src/assets/images/detective_alex_main_1793883122095.jpg"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col text-left truncate">
                <span className="text-xs font-semibold text-slate-100 truncate">{profile.name}</span>
                <span className="text-[10px] text-amber-400 font-medium">Rank {detectiveRank}</span>
              </div>
            </div>
          )}
        </div>

        {/* Center Title if provided */}
        {title && (
          <div className="text-center px-1 truncate flex-1">
            <h1 className="text-sm sm:text-base font-bold text-white tracking-tight truncate font-display">
              {title}
            </h1>
            {subtitle && <p className="text-[10px] text-slate-400 truncate">{subtitle}</p>}
          </div>
        )}

        {/* Right Section: Coins & Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Coin Badge */}
          <div className="flex items-center gap-1 bg-[#1A2140] border border-amber-500/40 rounded-full px-2.5 py-1 shadow-sm">
            <Coins className="w-4 h-4 text-[#FFC857]" />
            <span className="text-xs sm:text-sm font-bold text-[#FFC857] tabular-nums">
              {profile.coins.toLocaleString()}
            </span>
          </div>

          {/* Sound Toggle */}
          {onToggleSound && (
            <button
              onClick={() => {
                sound.playClick();
                onToggleSound();
              }}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800/70 active:scale-95 transition-all"
              aria-label="Toggle Sound"
            >
              {profile.settings.soundEffects ? (
                <Volume2 className="w-4 h-4 text-purple-300" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>
          )}

          {/* Settings Gear */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenSettings();
            }}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800/70 active:scale-95 transition-all"
            aria-label="Open Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
