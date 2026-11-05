import React from 'react';
import { Home, BookOpen, Gift, User } from 'lucide-react';
import { ScreenType } from '../types/game';
import { sound } from '../services/sound';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  unclaimedRewardsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  unclaimedRewardsCount = 0,
}) => {
  const tabs = [
    {
      id: 'MAIN_MENU' as ScreenType,
      label: 'Home',
      icon: Home,
    },
    {
      id: 'CHAPTER_SELECT' as ScreenType,
      label: 'Chapters',
      icon: BookOpen,
    },
    {
      id: 'ACHIEVEMENTS' as ScreenType,
      label: 'Rewards',
      icon: Gift,
      badge: unclaimedRewardsCount > 0 ? unclaimedRewardsCount : null,
    },
    {
      id: 'STATISTICS' as ScreenType,
      label: 'Profile',
      icon: User,
    },
  ];

  return (
    <nav className="w-full bg-[#101426]/95 backdrop-blur-md border-t border-slate-800/80 px-2 py-1.5 select-none z-30 shrink-0">
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentScreen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                onNavigate(tab.id);
              }}
              className={`min-h-[48px] flex flex-col items-center justify-center gap-1 rounded-xl transition-all relative ${
                isActive
                  ? 'text-[#8257FF] bg-[#1A2140]/80 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                {tab.badge && (
                  <span className="absolute -top-1 -right-2.5 w-4 h-4 bg-amber-500 text-slate-900 text-[10px] font-black rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] tracking-tight">{tab.label}</span>
              {isActive && (
                <span className="absolute bottom-1 w-6 h-0.5 bg-[#8257FF] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
