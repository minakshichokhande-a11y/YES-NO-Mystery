import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  CheckCircle,
  XCircle,
  Info,
  HelpCircle,
  Lightbulb,
  Clock,
  ArrowRight,
  Send,
  Sparkles,
  RotateCcw,
  Pause,
  AlertTriangle,
} from 'lucide-react';
import {
  MysteryLevel,
  PlayerProfile,
  QuestionHistoryItem,
  AnswerType,
  DetectivePose,
} from '../types/game';
import { evaluateQuestion, verifyFinalSolution } from '../services/qaEngine';
import { HINT_PRICES } from '../data/levels';
import { DetectiveAlex } from './DetectiveAlex';
import { sound } from '../services/sound';

interface MysteryGameplayProps {
  level: MysteryLevel;
  profile: PlayerProfile;
  onLevelCompleted: (
    level: MysteryLevel,
    timeSeconds: number,
    questionsCount: number
  ) => void;
  onUnlockHint: (levelId: number, hintIndex: number, price: number) => boolean;
  onPause: () => void;
  onBack: () => void;
}

export const MysteryGameplay: React.FC<MysteryGameplayProps> = ({
  level,
  profile,
  onLevelCompleted,
  onUnlockHint,
  onPause,
  onBack,
}) => {
  const [questionInput, setQuestionInput] = useState('');
  const [history, setHistory] = useState<QuestionHistoryItem[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<{
    answer: AnswerType;
    message: string;
  } | null>(null);
  const [alexPose, setAlexPose] = useState<DetectivePose>('idle');
  const [alexDialogue, setAlexDialogue] = useState<string>('Ready to solve this mystery?');
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [isSolutionModalOpen, setIsSolutionModalOpen] = useState(false);
  const [solutionInput, setSolutionInput] = useState('');
  const [solutionError, setSolutionError] = useState<string | null>(null);
  const [isHintsModalOpen, setIsHintsModalOpen] = useState(false);

  const historyEndRef = useRef<HTMLDivElement>(null);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [level.id]);

  // Reset when level changes
  useEffect(() => {
    setQuestionInput('');
    setHistory([]);
    setCurrentAnswer(null);
    setAlexPose('idle');
    setAlexDialogue('Examine the crime scene clues and ask your first question!');
    setTimeSeconds(0);
    setSolutionInput('');
    setSolutionError(null);
  }, [level.id]);

  // Auto scroll history
  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAskQuestion = (textToAsk?: string) => {
    const text = (textToAsk || questionInput).trim();
    if (!text) return;

    sound.playClick();
    const result = evaluateQuestion(text, level);

    // Audio & Detective Alex reaction
    if (result.answer === 'YES') {
      sound.playYes();
      setAlexPose('happy');
      setAlexDialogue('Excellent question, detective! That is confirmed.');
    } else if (result.answer === 'NO') {
      sound.playNo();
      setAlexPose('thinking');
      setAlexDialogue('Not quite! The evidence directly contradicts that.');
    } else if (result.answer === 'NOT_RELEVANT') {
      sound.playNotRelevant();
      setAlexPose('confused');
      setAlexDialogue('That detail is NOT RELEVANT to solving the case.');
    } else {
      setAlexPose('confused');
      setAlexDialogue('Can you ask that in another way, detective?');
    }

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
    const result = verifyFinalSolution(solutionInput, level);

    if (result.isCorrect) {
      sound.playMysterySolved();
      setAlexPose('victory');
      setIsSolutionModalOpen(false);
      onLevelCompleted(level, timeSeconds, history.length);
    } else {
      sound.playNo();
      setSolutionError(result.feedback);
      setAlexPose('sad');
      setAlexDialogue('Not quite! Look at the clues again, or try asking more YES/NO questions.');
    }
  };

  const unlockedHintIndices = profile.unlockedHints[level.id] || [];

  return (
    <div className="flex-1 flex flex-col max-w-md mx-auto w-full px-3 py-3 overflow-y-auto">
      {/* Top Status Strip */}
      <div className="flex items-center justify-between bg-[#1A2140] border border-white/10 rounded-2xl px-3 py-2 mb-3 shadow-sm select-none">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-purple-300">Case #{level.id}</span>
          <span className="text-[11px] text-slate-400">·</span>
          <span className="text-[11px] font-semibold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            {level.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            <span className="tabular-nums font-bold">{history.length}</span>
            <span className="text-[10px] text-slate-400">questions</span>
          </div>

          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="tabular-nums font-mono">{formatTime(timeSeconds)}</span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onPause();
            }}
            className="w-7 h-7 rounded-lg bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-300"
            aria-label="Pause"
          >
            <Pause className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Story Card */}
      <div className="bg-[#1A2140] border border-[#8257FF]/30 rounded-2xl p-4 shadow-lg mb-3 relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#8257FF]/20 to-transparent rounded-bl-full pointer-events-none" />

        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-purple-300">
              {level.chapterName}
            </span>
            <h2 className="text-lg font-bold font-display text-white">{level.title}</h2>
          </div>

          <div className="shrink-0 -mt-1">
            <DetectiveAlex pose={alexPose} size="sm" showDialogue={false} />
          </div>
        </div>

        {/* Story Text */}
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal bg-[#101426]/60 p-3 rounded-xl border border-white/5">
          {level.story}
        </p>

        {/* Detective Alex speech reaction */}
        <div className="mt-2 text-[11px] text-purple-300 italic flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#FFC857] shrink-0" />
          <span>Alex: "{alexDialogue}"</span>
        </div>
      </div>

      {/* Suggested Fast Questions */}
      {level.suggestedQuestions && level.suggestedQuestions.length > 0 && (
        <div className="mb-3">
          <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1.5 flex items-center gap-1">
            <span>Fast Clue Inquiries:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {level.suggestedQuestions.map((sq, idx) => (
              <button
                key={idx}
                onClick={() => handleAskQuestion(sq)}
                className="text-[11px] text-left py-1 px-2.5 rounded-lg bg-[#1A2140] hover:bg-[#252E58] active:scale-95 border border-purple-500/20 text-purple-200 transition-all"
              >
                {sq}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Question Input Section */}
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
              if (e.key === 'Enter') {
                handleAskQuestion();
              }
            }}
            placeholder="Type your YES/NO question here..."
            className="flex-1 bg-[#101426] border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#8257FF] transition-all"
          />
          <button
            onClick={() => handleAskQuestion()}
            disabled={!questionInput.trim()}
            className="min-h-[44px] px-4 rounded-xl bg-[#8257FF] hover:bg-[#7042F0] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all shrink-0"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">ASK</span>
          </button>
        </div>
      </div>

      {/* Current Answer Alert Banner if just received */}
      {currentAnswer && (
        <div
          className={`rounded-2xl p-3 mb-3 border shadow-lg animate-in fade-in zoom-in-95 duration-200 flex items-center gap-3 ${
            currentAnswer.answer === 'YES'
              ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
              : currentAnswer.answer === 'NO'
              ? 'bg-rose-950/60 border-rose-500/60 text-rose-200'
              : currentAnswer.answer === 'NOT_RELEVANT'
              ? 'bg-sky-950/60 border-sky-500/60 text-sky-200'
              : 'bg-amber-950/60 border-amber-500/60 text-amber-200'
          }`}
        >
          <div className="shrink-0">
            {currentAnswer.answer === 'YES' && <CheckCircle className="w-6 h-6 text-emerald-400" />}
            {currentAnswer.answer === 'NO' && <XCircle className="w-6 h-6 text-rose-400" />}
            {currentAnswer.answer === 'NOT_RELEVANT' && <Info className="w-6 h-6 text-sky-400" />}
            {currentAnswer.answer === 'AMBIGUOUS' && <HelpCircle className="w-6 h-6 text-amber-400" />}
          </div>
          <div className="flex-1">
            <span className="text-sm font-black uppercase tracking-wider block">
              {currentAnswer.answer.replace('_', ' ')}
            </span>
            <p className="text-xs opacity-90">{currentAnswer.message}</p>
          </div>
        </div>
      )}

      {/* Question Investigation History */}
      <div className="bg-[#1A2140] border border-white/10 rounded-2xl p-3 shadow-md mb-3 flex-1 min-h-[140px] max-h-[220px] overflow-y-auto flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Investigation History ({history.length})
          </span>
          {history.length > 0 && (
            <span className="text-[10px] text-slate-500">Scroll for earlier</span>
          )}
        </div>

        {history.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4 text-slate-500 text-xs">
            <Search className="w-6 h-6 mb-1 opacity-50" />
            <p>No questions asked yet.</p>
            <p className="text-[10px] text-slate-600 mt-0.5">
              Ask anything to discover verified YES, NO, or NOT RELEVANT facts.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {history.map((item) => {
              const badgeStyle = {
                YES: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
                NO: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
                NOT_RELEVANT: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
                AMBIGUOUS: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
              }[item.answer];

              return (
                <div
                  key={item.id}
                  className="bg-[#101426]/70 border border-white/5 rounded-xl p-2.5 flex items-start justify-between gap-2 text-xs"
                >
                  <div className="flex flex-col text-slate-200">
                    <span className="font-medium">Q: {item.question}</span>
                    {item.message && (
                      <span className="text-[10px] text-slate-400 mt-0.5">{item.message}</span>
                    )}
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border shrink-0 ${badgeStyle}`}
                  >
                    {item.answer.replace('_', ' ')}
                  </span>
                </div>
              );
            })}
            <div ref={historyEndRef} />
          </div>
        )}
      </div>

      {/* Action Footer: Hints & Submit Final Solution */}
      <div className="grid grid-cols-2 gap-2 mt-auto pt-1">
        {/* Hint Button */}
        <button
          onClick={() => {
            sound.playClick();
            setIsHintsModalOpen(true);
          }}
          className="min-h-[48px] py-2.5 px-3 rounded-2xl bg-[#1A2140] hover:bg-[#222B52] border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
        >
          <Lightbulb className="w-4 h-4 text-[#FFC857]" />
          <span>HINTS ({unlockedHintIndices.length}/3)</span>
        </button>

        {/* Submit Final Solution Button */}
        <button
          onClick={() => {
            sound.playClick();
            setIsSolutionModalOpen(true);
          }}
          className="min-h-[48px] py-2.5 px-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/40 active:scale-95 transition-all"
        >
          <span>SUBMIT SOLUTION</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* HINTS MODAL */}
      {isHintsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl bg-[#1A2140] border border-amber-500/40 p-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#FFC857]" />
                <h3 className="text-base font-bold text-white font-display">Investigation Clues</h3>
              </div>
              <button
                onClick={() => setIsHintsModalOpen(false)}
                className="w-7 h-7 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 mb-4">
              Unlock graduated clues if you are stuck. You have{' '}
              <span className="text-[#FFC857] font-bold">{profile.coins}</span> Mystery Coins.
            </p>

            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((hIndex) => {
                const isUnlocked = unlockedHintIndices.includes(hIndex);
                const hintText = level.hints[hIndex - 1];
                const price = HINT_PRICES[hIndex];
                const canAfford = profile.coins >= price;

                return (
                  <div
                    key={hIndex}
                    className={`rounded-xl p-3 border ${
                      isUnlocked
                        ? 'bg-[#101426] border-emerald-500/30 text-white'
                        : 'bg-[#12162A] border-slate-700/60 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-amber-300 uppercase">
                        Clue {hIndex}: {hIndex === 1 ? 'Small Clue' : hIndex === 2 ? 'Useful Clue' : 'Decisive Clue'}
                      </span>
                      {isUnlocked ? (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          Unlocked
                        </span>
                      ) : (
                        <button
                          disabled={!canAfford}
                          onClick={() => {
                            const success = onUnlockHint(level.id, hIndex, price);
                            if (success) {
                              sound.playHintUnlocked();
                            } else {
                              sound.playNo();
                            }
                          }}
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 ${
                            canAfford
                              ? 'bg-[#FFC857] text-[#101426] hover:brightness-105 active:scale-95'
                              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          <span>Unlock</span>
                          <span className="text-[10px]">({price}🪙)</span>
                        </button>
                      )}
                    </div>

                    <p className="text-xs mt-1.5 leading-relaxed">
                      {isUnlocked ? (
                        <span className="text-slate-100">{hintText}</span>
                      ) : (
                        <span className="italic text-slate-500">
                          {canAfford ? 'Locked clue. Tap unlock to reveal.' : 'Need more coins to unlock.'}
                        </span>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setIsHintsModalOpen(false)}
              className="mt-4 w-full py-2.5 rounded-xl bg-slate-800 text-white font-semibold text-xs hover:bg-slate-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* FINAL SOLUTION SUBMISSION MODAL */}
      {isSolutionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl bg-[#1A2140] border border-[#8257FF]/50 p-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-[#8257FF]" />
                <h3 className="text-base font-bold text-white font-display">Submit Final Solution</h3>
              </div>
              <button
                onClick={() => {
                  setIsSolutionModalOpen(false);
                  setSolutionError(null);
                }}
                className="w-7 h-7 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 mb-3">
              In your own words, what actually happened in this case?
            </p>

            <textarea
              rows={4}
              value={solutionInput}
              onChange={(e) => {
                setSolutionInput(e.target.value);
                setSolutionError(null);
              }}
              placeholder="Explain the truth (e.g. who did it, how it happened, or what caused the anomaly)..."
              className="w-full bg-[#101426] border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#8257FF] resize-none"
            />

            {solutionError && (
              <div className="mt-2.5 p-2.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{solutionError}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button
                onClick={() => {
                  setIsSolutionModalOpen(false);
                  setSolutionError(null);
                }}
                className="py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitSolution}
                disabled={!solutionInput.trim()}
                className="py-2.5 rounded-xl bg-gradient-to-r from-[#8257FF] to-[#6035FF] hover:brightness-110 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-950/40"
              >
                <Send className="w-3.5 h-3.5" />
                <span>CHECK MY SOLUTION</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
