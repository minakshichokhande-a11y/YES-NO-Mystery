import React, { useState, useEffect } from 'react';
import {
  Timer,
  Users,
  Infinity as InfinityIcon,
  Flame,
  ArrowRight,
  RotateCcw,
  Search,
  CheckCircle,
  XCircle,
  Info,
  HelpCircle,
  AlertTriangle,
} from 'lucide-react';
import { GameMode, MysteryLevel, PlayerProfile, QuestionHistoryItem, AnswerType } from '../types/game';
import { ALL_LEVELS } from '../data/levels';
import { evaluateQuestion, verifyFinalSolution } from '../services/qaEngine';
import { sound } from '../services/sound';

interface SpecialGameModeProps {
  mode: GameMode;
  profile: PlayerProfile;
  onExit: () => void;
}

export const SpecialGameModeScreen: React.FC<SpecialGameModeProps> = ({
  mode,
  profile,
  onExit,
}) => {
  // Select a level suitable for the mode
  const getLevelForMode = () => {
    if (mode === 'EXPERT') {
      // Pick random from chapters 7-10 (Levels 121-200)
      const expertPool = ALL_LEVELS.filter((l) => l.id >= 121);
      return expertPool[Math.floor(Math.random() * expertPool.length)];
    }
    // Random level from full database
    return ALL_LEVELS[Math.floor(Math.random() * ALL_LEVELS.length)];
  };

  const [currentLevel, setCurrentLevel] = useState<MysteryLevel>(getLevelForMode());
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(300); // 5 minutes for Timed Mode
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [activePlayer, setActivePlayer] = useState<1 | 2>(1); // For Pass & Play
  const [questionInput, setQuestionInput] = useState('');
  const [history, setHistory] = useState<QuestionHistoryItem[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<{ answer: AnswerType; message: string } | null>(null);
  const [isSolutionModalOpen, setIsSolutionModalOpen] = useState(false);
  const [solutionInput, setSolutionInput] = useState('');
  const [solutionError, setSolutionError] = useState<string | null>(null);

  // Timed Mode countdown
  useEffect(() => {
    if (mode !== 'TIMED' || isWon || isGameOver) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds((t) => {
        if (t <= 1) {
          clearInterval(interval);
          setIsGameOver(true);
          sound.playNo();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [mode, isWon, isGameOver]);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleAskQuestion = (textToAsk?: string) => {
    const text = (textToAsk || questionInput).trim();
    if (!text) return;

    sound.playClick();
    const result = evaluateQuestion(text, currentLevel);

    if (result.answer === 'YES') sound.playYes();
    else if (result.answer === 'NO') sound.playNo();
    else if (result.answer === 'NOT_RELEVANT') sound.playNotRelevant();

    const newItem: QuestionHistoryItem = {
      id: `${Date.now()}_${Math.random()}`,
      question: `${mode === 'PASS_AND_PLAY' ? `[P${activePlayer}] ` : ''}${text}`,
      answer: result.answer,
      message: result.message,
      timestamp: Date.now(),
    };

    setHistory((prev) => [...prev, newItem]);
    setCurrentAnswer({ answer: result.answer, message: result.message });
    setQuestionInput('');

    // Toggle turn in Pass & Play
    if (mode === 'PASS_AND_PLAY') {
      setActivePlayer((p) => (p === 1 ? 2 : 1));
    }
  };

  const handleSubmitSolution = () => {
    sound.playClick();
    const result = verifyFinalSolution(solutionInput, currentLevel);

    if (result.isCorrect) {
      sound.playMysterySolved();
      setIsWon(true);
      setIsSolutionModalOpen(false);
    } else {
      sound.playNo();
      setSolutionError(result.feedback);
      if (mode === 'PASS_AND_PLAY') {
        setActivePlayer((p) => (p === 1 ? 2 : 1));
      }
    }
  };

  const handleNextRandomCase = () => {
    sound.playClick();
    setCurrentLevel(getLevelForMode());
    setTimeLeftSeconds(300);
    setIsGameOver(false);
    setIsWon(false);
    setHistory([]);
    setCurrentAnswer(null);
    setSolutionInput('');
    setSolutionError(null);
    setActivePlayer(1);
  };

  return (
    <div className="flex-1 flex flex-col max-w-md mx-auto w-full px-3 py-3 overflow-y-auto">
      {/* Mode Header Banner */}
      <div className="bg-[#1A2140] border border-white/10 rounded-2xl p-3.5 shadow-md mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {mode === 'TIMED' && <Timer className="w-5 h-5 text-amber-400" />}
          {mode === 'PASS_AND_PLAY' && <Users className="w-5 h-5 text-emerald-400" />}
          {mode === 'ENDLESS' && <InfinityIcon className="w-5 h-5 text-sky-400" />}
          {mode === 'EXPERT' && <Flame className="w-5 h-5 text-rose-400" />}

          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              {mode === 'TIMED' && '5-Minute Rush'}
              {mode === 'PASS_AND_PLAY' && 'Pass & Play (2 Players)'}
              {mode === 'ENDLESS' && 'Endless Replay Mode'}
              {mode === 'EXPERT' && 'Expert Gauntlet'}
            </span>
            <span className="text-[10px] text-slate-400">
              Case #{currentLevel.id}: {currentLevel.title}
            </span>
          </div>
        </div>

        {mode === 'TIMED' && (
          <div className="flex items-center gap-1 font-mono text-sm font-black px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Timer className="w-4 h-4" />
            <span>{formatTimer(timeLeftSeconds)}</span>
          </div>
        )}

        {mode === 'PASS_AND_PLAY' && (
          <div className="px-2.5 py-1 rounded-xl text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Player {activePlayer}'s Turn
          </div>
        )}

        <button
          onClick={onExit}
          className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded-lg bg-slate-800"
        >
          Exit
        </button>
      </div>

      {/* WIN STATE MODAL/CARD */}
      {isWon ? (
        <div className="bg-[#1A2140] border border-emerald-500/40 rounded-3xl p-5 shadow-2xl text-center my-auto">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-2">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold font-display text-white">Case Cracked!</h2>
          <p className="text-xs text-emerald-300 mt-1">
            {mode === 'PASS_AND_PLAY'
              ? `Player ${activePlayer === 1 ? 2 : 1} found the truth!`
              : 'Brilliant deduction!'}
          </p>

          <div className="bg-[#101426] p-3 rounded-xl border border-white/5 my-4 text-xs text-slate-200 text-left">
            <span className="font-bold text-emerald-400 block mb-1">Official Solution:</span>
            <span>{currentLevel.solution}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleNextRandomCase}
              className="py-2.5 rounded-xl bg-[#8257FF] text-white font-bold text-xs"
            >
              Play Another Case
            </button>
            <button
              onClick={onExit}
              className="py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
            >
              Back to Modes
            </button>
          </div>
        </div>
      ) : isGameOver ? (
        /* TIME OUT CARD */
        <div className="bg-[#1A2140] border border-rose-500/40 rounded-3xl p-5 shadow-2xl text-center my-auto">
          <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto mb-2">
            <Timer className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold font-display text-white">Time Ran Out!</h2>
          <p className="text-xs text-rose-300 mt-1">The 5-minute rush timer reached zero.</p>

          <div className="bg-[#101426] p-3 rounded-xl border border-white/5 my-4 text-xs text-slate-200 text-left">
            <span className="font-bold text-amber-400 block mb-1">The Clue Was:</span>
            <span>{currentLevel.hints[2]}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleNextRandomCase}
              className="py-2.5 rounded-xl bg-[#FFC857] text-slate-900 font-bold text-xs"
            >
              Retry New Case
            </button>
            <button
              onClick={onExit}
              className="py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
            >
              Exit Mode
            </button>
          </div>
        </div>
      ) : (
        /* ACTIVE INVESTIGATION VIEW */
        <>
          {/* Story Card */}
          <div className="bg-[#1A2140] border border-white/10 rounded-2xl p-4 shadow-md mb-3">
            <h3 className="text-base font-bold font-display text-white mb-1.5">
              {currentLevel.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-[#101426]/60 p-3 rounded-xl border border-white/5">
              {currentLevel.story}
            </p>
          </div>

          {/* Question Input */}
          <div className="bg-[#1A2140] border border-white/10 rounded-2xl p-3 shadow-md mb-3">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              {mode === 'PASS_AND_PLAY' ? `PLAYER ${activePlayer}: ASK A QUESTION` : 'ASK A QUESTION'}
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
                className="flex-1 bg-[#101426] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={() => handleAskQuestion()}
                disabled={!questionInput.trim()}
                className="px-4 py-2 rounded-xl bg-[#8257FF] hover:bg-[#7042F0] disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1 shadow-md shrink-0"
              >
                <Search className="w-3.5 h-3.5" />
                <span>ASK</span>
              </button>
            </div>
          </div>

          {/* Current Answer Alert */}
          {currentAnswer && (
            <div
              className={`rounded-2xl p-3 mb-3 border shadow-md flex items-center gap-2.5 ${
                currentAnswer.answer === 'YES'
                  ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
                  : currentAnswer.answer === 'NO'
                  ? 'bg-rose-950/60 border-rose-500/60 text-rose-200'
                  : 'bg-sky-950/60 border-sky-500/60 text-sky-200'
              }`}
            >
              {currentAnswer.answer === 'YES' && <CheckCircle className="w-5 h-5 text-emerald-400" />}
              {currentAnswer.answer === 'NO' && <XCircle className="w-5 h-5 text-rose-400" />}
              {currentAnswer.answer === 'NOT_RELEVANT' && <Info className="w-5 h-5 text-sky-400" />}
              {currentAnswer.answer === 'AMBIGUOUS' && <HelpCircle className="w-5 h-5 text-amber-400" />}
              <span className="text-xs font-black uppercase">
                {currentAnswer.answer.replace('_', ' ')}: {currentAnswer.message}
              </span>
            </div>
          )}

          {/* History */}
          {history.length > 0 && (
            <div className="bg-[#1A2140] border border-white/10 rounded-2xl p-3 shadow-md mb-3 flex-1 min-h-[100px] max-h-[160px] overflow-y-auto">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Mode Case Notes ({history.length})
              </span>
              <div className="flex flex-col gap-1.5">
                {history.map((h) => (
                  <div
                    key={h.id}
                    className="bg-[#101426]/70 border border-white/5 rounded-xl p-2 flex items-center justify-between text-xs"
                  >
                    <span className="text-slate-200 truncate">{h.question}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 shrink-0">
                      {h.answer.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="mt-auto pt-2">
            <button
              onClick={() => {
                sound.playClick();
                setIsSolutionModalOpen(true);
              }}
              className="w-full min-h-[48px] py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-all"
            >
              <span>SUBMIT SOLUTION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Solution Modal */}
          {isSolutionModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
              <div className="w-full max-w-sm rounded-3xl bg-[#1A2140] border border-white/10 p-5 shadow-2xl">
                <h3 className="text-base font-bold text-white font-display mb-2">Submit Explanation</h3>
                <textarea
                  rows={4}
                  value={solutionInput}
                  onChange={(e) => {
                    setSolutionInput(e.target.value);
                    setSolutionError(null);
                  }}
                  placeholder="Explain what actually occurred..."
                  className="w-full bg-[#101426] border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
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
                    className="py-2.5 rounded-xl bg-[#8257FF] hover:bg-[#7042F0] text-white font-bold text-xs disabled:opacity-50"
                  >
                    Check Truth
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
