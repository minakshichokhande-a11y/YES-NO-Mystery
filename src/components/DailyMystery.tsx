import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  Coins,
  Search,
  CheckCircle,
  XCircle,
  Info,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Send,
  AlertTriangle,
} from 'lucide-react';
import { MysteryLevel, PlayerProfile, QuestionHistoryItem, AnswerType } from '../types/game';
import { ALL_LEVELS } from '../data/levels';
import { evaluateQuestion, verifyFinalSolution } from '../services/qaEngine';
import { DetectiveAlex } from './DetectiveAlex';
import { sound } from '../services/sound';

interface DailyMysteryProps {
  profile: PlayerProfile;
  onClaimDailyReward: (coins: number) => void;
  onBack: () => void;
}

export const DailyMystery: React.FC<DailyMysteryProps> = ({
  profile,
  onClaimDailyReward,
  onBack,
}) => {
  // Deterministically select today's mystery based on local date
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  const dateFormatted = today.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Hash date string to pick a level from 1 to 200
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) % ALL_LEVELS.length;
  }
  const dailyLevel: MysteryLevel = ALL_LEVELS[hash] || ALL_LEVELS[0];

  const alreadyCompletedToday = profile.completedDailyDates.includes(dateStr);

  const [questionInput, setQuestionInput] = useState('');
  const [history, setHistory] = useState<QuestionHistoryItem[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<{
    answer: AnswerType;
    message: string;
  } | null>(null);
  const [isSolutionModalOpen, setIsSolutionModalOpen] = useState(false);
  const [solutionInput, setSolutionInput] = useState('');
  const [solutionError, setSolutionError] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(alreadyCompletedToday);
  const [unlockedHints, setUnlockedHints] = useState<number[]>([]);

  const handleAskQuestion = (textToAsk?: string) => {
    const text = (textToAsk || questionInput).trim();
    if (!text) return;

    sound.playClick();
    const result = evaluateQuestion(text, dailyLevel);

    if (result.answer === 'YES') sound.playYes();
    else if (result.answer === 'NO') sound.playNo();
    else if (result.answer === 'NOT_RELEVANT') sound.playNotRelevant();

    const newItem: QuestionHistoryItem = {
      id: `${Date.now()}_${Math.random()}`,
      question: text,
      answer: result.answer,
      message: result.message,
      timestamp: Date.now(),
    };

    setHistory((prev) => [...prev, newItem]);
    setCurrentAnswer({ answer: result.answer, message: result.message });
    setQuestionInput('');
  };

  const handleSubmitSolution = () => {
    sound.playClick();
    const result = verifyFinalSolution(solutionInput, dailyLevel);

    if (result.isCorrect) {
      sound.playMysterySolved();
      setIsCompleted(true);
      setIsSolutionModalOpen(false);
      if (!alreadyCompletedToday) {
        onClaimDailyReward(25);
      }
    } else {
      sound.playNo();
      setSolutionError(result.feedback);
    }
  };

  return (
    <div className="flex-1 flex flex-col max-w-md mx-auto w-full px-3 py-3 overflow-y-auto">
      {/* Daily Header */}
      <div className="bg-[#1D3557] border border-blue-400/30 rounded-2xl p-4 shadow-lg mb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-sky-400" />
            <span className="text-xs font-bold text-sky-200 uppercase tracking-wider">
              Daily Investigation
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
            <Sparkles className="w-3.5 h-3.5 text-[#FFC857]" />
            <span>Streak: {profile.dailyStreak} days</span>
          </div>
        </div>

        <p className="text-sm font-semibold text-white mt-1">{dateFormatted}</p>
        <p className="text-xs text-sky-200/80 mt-0.5">
          Solve today's case to earn +25 Mystery Coins and maintain your detective streak!
        </p>
      </div>

      {/* Story Card */}
      <div className="bg-[#1A2140] border border-white/10 rounded-2xl p-4 shadow-md mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-purple-300">Today's Mystery</span>
          {isCompleted && (
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
              Completed Today
            </span>
          )}
        </div>
        <h2 className="text-lg font-bold font-display text-white mb-2">{dailyLevel.title}</h2>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-[#101426]/60 p-3 rounded-xl border border-white/5">
          {dailyLevel.story}
        </p>

        {isCompleted && (
          <div className="mt-3 p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-xs text-emerald-200">
            <span className="font-bold block mb-1">Official Solution:</span>
            <span>{dailyLevel.solution}</span>
          </div>
        )}
      </div>

      {/* Suggested Fast Questions */}
      {dailyLevel.suggestedQuestions && !isCompleted && (
        <div className="mb-3">
          <span className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 block">
            Suggested Questions:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {dailyLevel.suggestedQuestions.map((sq, idx) => (
              <button
                key={idx}
                onClick={() => handleAskQuestion(sq)}
                className="text-[11px] text-left py-1 px-2.5 rounded-lg bg-[#1A2140] hover:bg-[#252E58] border border-blue-500/20 text-sky-200 transition-all active:scale-95"
              >
                {sq}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Question Input */}
      {!isCompleted && (
        <div className="bg-[#1A2140] border border-white/10 rounded-2xl p-3 shadow-md mb-3">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            ASK YOUR QUESTIONS
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAskQuestion();
              }}
              placeholder="Type your YES/NO question here..."
              className="flex-1 bg-[#101426] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={() => handleAskQuestion()}
              disabled={!questionInput.trim()}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1 shadow-md shrink-0"
            >
              <Search className="w-3.5 h-3.5" />
              <span>ASK</span>
            </button>
          </div>
        </div>
      )}

      {/* Current Answer Banner */}
      {currentAnswer && !isCompleted && (
        <div
          className={`rounded-2xl p-3 mb-3 border shadow-lg flex items-center gap-3 ${
            currentAnswer.answer === 'YES'
              ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
              : currentAnswer.answer === 'NO'
              ? 'bg-rose-950/60 border-rose-500/60 text-rose-200'
              : 'bg-sky-950/60 border-sky-500/60 text-sky-200'
          }`}
        >
          <div className="shrink-0">
            {currentAnswer.answer === 'YES' && <CheckCircle className="w-5 h-5 text-emerald-400" />}
            {currentAnswer.answer === 'NO' && <XCircle className="w-5 h-5 text-rose-400" />}
            {currentAnswer.answer === 'NOT_RELEVANT' && <Info className="w-5 h-5 text-sky-400" />}
            {currentAnswer.answer === 'AMBIGUOUS' && <HelpCircle className="w-5 h-5 text-amber-400" />}
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider block">
              {currentAnswer.answer.replace('_', ' ')}
            </span>
            <p className="text-[11px] opacity-90">{currentAnswer.message}</p>
          </div>
        </div>
      )}

      {/* Question History */}
      {!isCompleted && history.length > 0 && (
        <div className="bg-[#1A2140] border border-white/10 rounded-2xl p-3 shadow-md mb-3 flex-1 min-h-[100px] max-h-[180px] overflow-y-auto">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Today's Inquiries ({history.length})
          </span>
          <div className="flex flex-col gap-2">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-[#101426]/70 border border-white/5 rounded-xl p-2 flex items-center justify-between gap-2 text-xs"
              >
                <span className="text-slate-200">Q: {item.question}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-sky-300">
                  {item.answer.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="mt-auto pt-2">
        {!isCompleted ? (
          <button
            onClick={() => {
              sound.playClick();
              setIsSolutionModalOpen(true);
            }}
            className="w-full min-h-[50px] py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <span>SUBMIT DAILY SOLUTION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => {
              sound.playClick();
              onBack();
            }}
            className="w-full min-h-[50px] py-3 rounded-2xl bg-slate-800 text-slate-200 font-bold text-sm hover:bg-slate-700 active:scale-95 transition-all"
          >
            Back to Main Menu
          </button>
        )}
      </div>

      {/* Solution Modal */}
      {isSolutionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl bg-[#1A2140] border border-blue-500/50 p-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-base font-bold text-white font-display mb-2">Submit Daily Solution</h3>
            <p className="text-xs text-slate-300 mb-3">Explain what happened in this mystery:</p>

            <textarea
              rows={4}
              value={solutionInput}
              onChange={(e) => {
                setSolutionInput(e.target.value);
                setSolutionError(null);
              }}
              placeholder="Type your explanation..."
              className="w-full bg-[#101426] border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
            />

            {solutionError && (
              <div className="mt-2 p-2 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs">
                {solutionError}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button
                onClick={() => setIsSolutionModalOpen(false)}
                className="py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitSolution}
                disabled={!solutionInput.trim()}
                className="py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs"
              >
                Submit (+25🪙)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
