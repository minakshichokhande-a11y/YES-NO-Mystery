import React, { useState } from 'react';
import { Play, RotateCcw, Settings, Home, AlertTriangle } from 'lucide-react';
import { sound } from '../services/sound';

interface PauseMenuProps {
  onResume: () => void;
  onRestartLevel: () => void;
  onOpenSettings: () => void;
  onReturnHome: () => void;
}

export const PauseMenu: React.FC<PauseMenuProps> = ({
  onResume,
  onRestartLevel,
  onOpenSettings,
  onReturnHome,
}) => {
  const [showRestartConfirm, setShowRestartConfirm] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 select-none">
      <div className="w-full max-w-xs rounded-3xl bg-[#1A2140] border border-white/10 p-5 shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-150">
        <h2 className="text-xl font-bold font-display text-white mb-1">Game Paused</h2>
        <p className="text-xs text-slate-400 mb-5">Timer and investigation paused</p>

        <div className="flex flex-col gap-2.5 w-full">
          {/* RESUME */}
          <button
            onClick={() => {
              sound.playClick();
              onResume();
            }}
            className="w-full min-h-[50px] py-3 rounded-2xl bg-[#8257FF] hover:bg-[#7042F0] text-white font-bold text-sm shadow-lg shadow-purple-900/40 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>RESUME</span>
          </button>

          {/* RESTART LEVEL */}
          {showRestartConfirm ? (
            <div className="p-3 rounded-xl bg-amber-950/70 border border-amber-500/40 text-xs flex flex-col gap-2">
              <span className="text-amber-200 font-semibold">
                Restart investigation and clear asked questions?
              </span>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  onClick={() => setShowRestartConfirm(false)}
                  className="py-1.5 rounded-lg bg-slate-800 text-slate-300 font-medium text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    onRestartLevel();
                  }}
                  className="py-1.5 rounded-lg bg-amber-600 text-white font-bold text-xs hover:bg-amber-500"
                >
                  Restart
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowRestartConfirm(true)}
              className="w-full min-h-[46px] py-2.5 rounded-2xl bg-[#101426] hover:bg-[#151B33] border border-white/10 text-slate-200 font-semibold text-xs active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>RESTART LEVEL</span>
            </button>
          )}

          {/* SETTINGS */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenSettings();
            }}
            className="w-full min-h-[46px] py-2.5 rounded-2xl bg-[#101426] hover:bg-[#151B33] border border-white/10 text-slate-200 font-semibold text-xs active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Settings className="w-4 h-4 text-purple-300" />
            <span>SETTINGS</span>
          </button>

          {/* RETURN TO HOME */}
          <button
            onClick={() => {
              sound.playClick();
              onReturnHome();
            }}
            className="w-full min-h-[46px] py-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 border border-white/5 text-slate-300 font-semibold text-xs active:scale-95 transition-all flex items-center justify-center gap-2 mt-1"
          >
            <Home className="w-4 h-4 text-emerald-400" />
            <span>RETURN TO HOME</span>
          </button>
        </div>
      </div>
    </div>
  );
};
