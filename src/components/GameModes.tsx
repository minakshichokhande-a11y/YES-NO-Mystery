import React from 'react';
import {
  Compass,
  Timer,
  Infinity as InfinityIcon,
  Users,
  Flame,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { GameMode, PlayerProfile } from '../types/game';
import { sound } from '../services/sound';

interface GameModesProps {
  profile: PlayerProfile;
  onSelectMode: (mode: GameMode) => void;
  onBack: () => void;
}

export const GameModes: React.FC<GameModesProps> = ({
  profile,
  onSelectMode,
  onBack,
}) => {
  const modes = [
    {
      id: 'CLASSIC' as GameMode,
      title: 'Classic Progression',
      badge: 'Main Campaign',
      badgeColor: 'text-purple-300 bg-purple-500/20 border-purple-500/30',
      description: 'Journey across all 10 chapters and 200 handcrafted detective mysteries.',
      icon: Compass,
      color: '#8257FF',
    },
    {
      id: 'TIMED' as GameMode,
      title: '5-Minute Rush',
      badge: 'Speed Deduction',
      badgeColor: 'text-amber-300 bg-amber-500/20 border-amber-500/30',
      description: 'Race against a 300-second ticking clock to crack the case before time runs out!',
      icon: Timer,
      color: '#FFC857',
    },
    {
      id: 'ENDLESS' as GameMode,
      title: 'Endless Mystery Replay',
      badge: 'Infinite Cases',
      badgeColor: 'text-sky-300 bg-sky-500/20 border-sky-500/30',
      description: 'Infinite random mystery selection from your discovered archives.',
      icon: InfinityIcon,
      color: '#388BFF',
    },
    {
      id: 'PASS_AND_PLAY' as GameMode,
      title: 'Pass & Play (2 Players)',
      badge: 'Local Multiplayer',
      badgeColor: 'text-emerald-300 bg-emerald-500/20 border-emerald-500/30',
      description: 'Share one device! Player 1 and Player 2 take turns asking clues to solve.',
      icon: Users,
      color: '#35C98B',
    },
    {
      id: 'EXPERT' as GameMode,
      title: 'Expert Gauntlet',
      badge: 'Difficult Cases',
      badgeColor: 'text-rose-300 bg-rose-500/20 border-rose-500/30',
      description: 'Dive directly into Hard and Expert cases from Science, History, and Master chapters.',
      icon: Flame,
      color: '#FF626C',
    },
  ];

  return (
    <div className="flex-1 max-w-md mx-auto w-full px-4 py-4 overflow-y-auto">
      <div className="mb-4">
        <h2 className="text-xl font-bold font-display text-white">Investigation Modes</h2>
        <p className="text-xs text-slate-400">All modes are 100% free with no locks or timers</p>
      </div>

      <div className="flex flex-col gap-3 pb-8">
        {modes.map((m) => {
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              onClick={() => {
                sound.playClick();
                onSelectMode(m.id);
              }}
              className="w-full text-left rounded-2xl p-4 bg-[#1A2140] hover:bg-[#202952] border border-white/10 active:scale-[0.98] transition-all relative overflow-hidden group shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
                    style={{ backgroundColor: `${m.color}20`, color: m.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${m.badgeColor}`}>
                        {m.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white font-display">
                      {m.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>

                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 mt-2" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
