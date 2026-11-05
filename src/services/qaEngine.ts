import { AnswerType, MysteryLevel } from '../types/game';

interface EvaluationResult {
  answer: AnswerType;
  confidence: number;
  message: string;
}

// Normalize text for matching
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\b(wasn't|was not)\b/g, 'was not')
    .replace(/\b(didn't|did not)\b/g, 'did not')
    .replace(/\b(isn't|is not)\b/g, 'is not')
    .replace(/\b(aren't|are not)\b/g, 'are not')
    .replace(/\b(couldn't|could not)\b/g, 'could not')
    .replace(/\b(can't|cannot)\b/g, 'cannot')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Common detective synonyms dictionary
const SYNONYMS: Record<string, string[]> = {
  dog: ['pet', 'animal', 'puppy', 'canine', 'hound'],
  person: ['someone', 'somebody', 'human', 'man', 'woman', 'girl', 'boy', 'individual', 'people'],
  door: ['entrance', 'entryway', 'gate', 'portal'],
  broken: ['damaged', 'shattered', 'cracked', 'smashed'],
  stolen: ['taken', 'robbed', 'thief', 'burglary', 'stole'],
  water: ['liquid', 'rain', 'moisture', 'wetness', 'sprinkler'],
  sound: ['noise', 'heard', 'audible', 'acoustic'],
  light: ['illumination', 'lamp', 'brightness', 'sun', 'flash'],
  clock: ['time', 'timer', 'watch', 'hours', 'minutes'],
  inside: ['interior', 'within', 'indoor'],
  outside: ['exterior', 'outdoor', 'yard', 'garden'],
  fake: ['artificial', 'replica', 'prop', 'imitation'],
};

function expandTokens(tokens: string[]): string[] {
  const expanded = new Set<string>(tokens);
  for (const token of tokens) {
    for (const [key, synList] of Object.entries(SYNONYMS)) {
      if (token === key || synList.includes(token)) {
        expanded.add(key);
        synList.forEach((s) => expanded.add(s));
      }
    }
  }
  return Array.from(expanded);
}

// Deterministic question engine evaluating YES, NO, or NOT RELEVANT
export function evaluateQuestion(
  rawQuestion: string,
  level: MysteryLevel
): EvaluationResult {
  const trimmed = rawQuestion.trim();
  if (!trimmed) {
    return {
      answer: 'AMBIGUOUS',
      confidence: 0,
      message: 'Please ask a detective question.',
    };
  }

  const normalized = normalizeText(trimmed);
  const words = normalized.split(' ').filter((w) => w.length > 1);

  // Check if it's too short to be meaningful
  if (words.length < 2 && !['yes', 'no', 'dog', 'ice', 'key', 'fan', 'why'].includes(normalized)) {
    return {
      answer: 'AMBIGUOUS',
      confidence: 0,
      message: 'Can you ask that in another way?',
    };
  }

  // Detect negative phrasing in question
  const hasNegation = /\b(not|never|no|without|was not|did not|is not)\b/.test(normalized);

  const tokens = expandTokens(words);

  // Helper score function
  const computeScore = (factList: string[]) => {
    let score = 0;
    for (const fact of factList) {
      const factNorm = normalizeText(fact);
      // Exact substring match
      if (normalized.includes(factNorm) || factNorm.includes(normalized)) {
        score += 3.5;
      }
      // Word overlap
      const factWords = factNorm.split(' ');
      let matchCount = 0;
      for (const fw of factWords) {
        if (tokens.includes(fw)) {
          matchCount++;
        }
      }
      if (matchCount > 0) {
        score += matchCount / factWords.length;
      }
    }
    return score;
  };

  const yesScore = computeScore(level.positiveFacts);
  const noScore = computeScore(level.negativeFacts);
  const irrevScore = computeScore(level.irrelevantFacts);

  // Check against suggested questions if available
  if (level.suggestedQuestions) {
    for (const sq of level.suggestedQuestions) {
      const sqNorm = normalizeText(sq);
      if (normalized === sqNorm || normalized.includes(sqNorm) || sqNorm.includes(normalized)) {
        return {
          answer: 'YES',
          confidence: 0.95,
          message: 'Excellent question, detective! That is correct.',
        };
      }
    }
  }

  // Decision logic
  if (yesScore >= 1.5 && yesScore > noScore * 1.3 && yesScore > irrevScore) {
    const finalAnswer: AnswerType = hasNegation ? 'NO' : 'YES';
    return {
      answer: finalAnswer,
      confidence: 0.85,
      message: finalAnswer === 'YES' ? 'Confirmed by verified facts.' : 'The evidence contradicts that statement.',
    };
  }

  if (noScore >= 1.4 && noScore > yesScore * 1.2 && noScore > irrevScore) {
    const finalAnswer: AnswerType = hasNegation ? 'YES' : 'NO';
    return {
      answer: finalAnswer,
      confidence: 0.85,
      message: finalAnswer === 'NO' ? 'The evidence directly contradicts that.' : 'Confirmed by verified facts.',
    };
  }

  if (irrevScore >= 1.2 && irrevScore > yesScore && irrevScore > noScore) {
    return {
      answer: 'NOT_RELEVANT',
      confidence: 0.8,
      message: 'This detail does not affect the case.',
    };
  }

  // If outside known verified facts and sufficiently long
  if (words.length >= 3) {
    // Check if it asks about something completely unrelated
    const allKnown = [
      ...level.positiveFacts,
      ...level.negativeFacts,
      ...level.irrelevantFacts,
      level.story,
    ].join(' ');
    const knownTokens = new Set(normalizeText(allKnown).split(' '));
    const overlap = words.filter((w) => knownTokens.has(w)).length;

    if (overlap === 0) {
      return {
        answer: 'NOT_RELEVANT',
        confidence: 0.7,
        message: 'NOT RELEVANT. This is unrelated to the mystery.',
      };
    }
  }

  return {
    answer: 'AMBIGUOUS',
    confidence: 0.2,
    message: 'Can you ask that in another way?',
  };
}

// Validate the player's final explanation
export function verifyFinalSolution(
  explanation: string,
  level: MysteryLevel
): { isCorrect: boolean; feedback: string } {
  const normInput = normalizeText(explanation);

  if (normInput.length < 3) {
    return {
      isCorrect: false,
      feedback: 'Please write your explanation of what actually happened.',
    };
  }

  // Special Level 200 rule: "Who is the Master Detective?" -> The player/you/me!
  if (level.id === 200) {
    const playerTokens = ['player', 'me', 'i am', 'you', 'myself', 'user', 'the player', 'detective me'];
    const matched = playerTokens.some((tok) => normInput.includes(tok));
    if (matched) {
      return {
        isCorrect: true,
        feedback: 'CONGRATULATIONS! YOU are the Master Detective!',
      };
    }
  }

  // Check required keyword sets (must match at least one keyword from each required concept group)
  let matchedAllGroups = true;
  for (const group of level.solutionKeywords) {
    const groupMatched = group.some((keyword) => {
      const normKw = normalizeText(keyword);
      return normInput.includes(normKw);
    });
    if (!groupMatched) {
      matchedAllGroups = false;
      break;
    }
  }

  if (matchedAllGroups) {
    return {
      isCorrect: true,
      feedback: 'Brilliant deduction, detective! That is the official truth.',
    };
  }

  // Alternative check: similarity to the official solution text
  const solWords = normalizeText(level.solution)
    .split(' ')
    .filter((w) => w.length > 3);
  const inputWords = new Set(normInput.split(' '));
  const matchedWords = solWords.filter((w) => inputWords.has(w));
  const ratio = matchedWords.length / solWords.length;

  if (ratio >= 0.45) {
    return {
      isCorrect: true,
      feedback: 'Spot on! You figured out the secret.',
    };
  }

  return {
    isCorrect: false,
    feedback: 'Not quite! Look at the clues again or use a hint to investigate deeper.',
  };
}
