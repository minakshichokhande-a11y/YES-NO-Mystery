import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { DetectiveAlex } from './DetectiveAlex';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 250);
          return 100;
        }
        return prev + 18;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 bg-[#101426] flex flex-col items-center justify-between p-6 select-none">
      {/* Top Brand Pill */}
      <div className="pt-8 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1A2140] border border-[#8257FF]/30 text-xs font-bold text-purple-300">
        <Sparkles className="w-4 h-4 text-[#FFC857]" />
        <span>YES / NO MYSTERY</span>
      </div>

      {/* Center Character & Title */}
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">
          <DetectiveAlex pose="idle" size="xl" showDialogue={false} />
        </div>

        <h1 className="text-4xl font-extrabold font-display tracking-tight text-white">
          YES <span className="text-[#FFC857]">/</span> NO
        </h1>
        <h2 className="text-3xl font-black tracking-widest text-[#8257FF] font-display mt-0.5">
          MYSTERY
        </h2>
        <p className="text-xs font-semibold tracking-wider text-slate-300 uppercase mt-2">
          THINK. QUESTION. DISCOVER THE TRUTH.
        </p>
      </div>

      {/* Bottom Loading Bar */}
      <div className="w-full max-w-xs pb-10 flex flex-col items-center">
        <p className="text-xs font-medium text-slate-400 mb-2">
          Preparing your next mystery...
        </p>
        <div className="w-full h-2 bg-[#1A2140] rounded-full overflow-hidden border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-[#8257FF] to-[#FFC857] transition-all duration-150 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[10px] text-slate-500 font-mono mt-1.5 tabular-nums">
          Loading 200 Handcrafted Cases ({progress}%)
        </span>
      </div>
    </div>
  );
};
