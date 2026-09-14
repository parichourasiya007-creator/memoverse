// ═══════════════════════════════════════════════════════════════════
//  AI-BASED ADAPTIVE COGNITIVE GAME ENGINE
// ═══════════════════════════════════════════════════════════════════

export type CognitiveSkill =
  | "Memory"
  | "Attention"
  | "Pattern Recognition"
  | "Visual-Spatial"
  | "Categorization"
  | "Sequencing"
  | "Recognition";

export interface DetailedGameResult {
  gameId: string;
  gameTitle: string;
  skill: CognitiveSkill;
  level: number; // 1 | 2 | 3 | 4
  accuracy: number; // 0 to 100
  correctAnswers: number;
  totalQuestions: number;
  attempts: number;
  completionTime: number; // seconds
  hintsUsed: number;
  retries: number;
  timestamp: number;
  completed: boolean;
}

export interface SkillPerformance {
  skill: CognitiveSkill;
  score: number; // 0 to 100
  trend: "improving" | "struggling" | "strong" | "stable";
  gamesPlayed: number;
  lastPlayed: number | null;
}

export interface AIRecommendation {
  recommendedGameId: string;
  recommendedGameTitle: string;
  recommendedLevel: number;
  skillCategory: CognitiveSkill;
  reasonKey: string;
  reasonDefault: string;
  badge: "next_level" | "practice" | "explore" | "starter";
}

const STORAGE_KEY_HISTORY = "memoverse_game_performance_history";
const STORAGE_KEY_UNLOCKED = "memoverse_unlocked_levels";
const STORAGE_KEY_SKILL_PROFILES = "memoverse_skill_profiles";

// Map of games to their primary cognitive skill and metadata
export const GAME_SKILL_MAP: Record<string, { title: string; skill: CognitiveSkill; icon: string }> = {
  memory_match: { title: "Memory Match", skill: "Memory", icon: "🧠" },
  whats_missing: { title: "What's Missing?", skill: "Visual-Spatial", icon: "🔍" },
  pattern_recognition: { title: "Pattern Recognition", skill: "Pattern Recognition", icon: "🧩" },
  jigsaw_puzzle: { title: "Jigsaw Puzzle", skill: "Visual-Spatial", icon: "🖼️" },
  sorting_game: { title: "NER Bazaar Sorting", skill: "Categorization", icon: "🧺" },
  daily_routine: { title: "Daily Routine", skill: "Sequencing", icon: "📅" },
  word_puzzles: { title: "Word Puzzles", skill: "Attention", icon: "✏️" },
  dice_activity: { title: "Dice Memory & Calculation", skill: "Attention", icon: "🎲" },
  board_game: { title: "Assam Board Game", skill: "Attention", icon: "🎯" },
  sound_rec: { title: "Sound Recognition", skill: "Recognition", icon: "🎵" },
  kaziranga_puzzle: { title: "Kaziranga Wildlife Puzzle", skill: "Visual-Spatial", icon: "🦏" },
  memory_lane: { title: "Northeast Memory Lane", skill: "Memory", icon: "🏞️" },
  interactive_stories: { title: "Heritage Story Time", skill: "Recognition", icon: "📖" },
};

/**
 * Gets the maximum level unlocked for a game (1 to 4).
 */
export function getUnlockedLevel(gameId: string): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_UNLOCKED);
    const map: Record<string, number> = raw ? JSON.parse(raw) : {};
    return Math.max(1, Math.min(4, map[gameId] || 1));
  } catch {
    return 1;
  }
}

/**
 * Unlocks the next level for a game if accuracy was sufficient.
 */
export function unlockLevel(gameId: string, level: number): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_UNLOCKED);
    const map: Record<string, number> = raw ? JSON.parse(raw) : {};
    const currentMax = map[gameId] || 1;
    if (level > currentMax && level <= 4) {
      map[gameId] = level;
      localStorage.setItem(STORAGE_KEY_UNLOCKED, JSON.stringify(map));
    }
  } catch {}
}

/**
 * Retrieves all saved detailed performance history.
 */
export function getPerformanceHistory(): DetailedGameResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Save a new detailed game performance result, update unlocked levels, and recalculate skill profile.
 */
export function recordGamePerformance(result: DetailedGameResult): {
  unlockedNewLevel: boolean;
  nextRecommendedLevel: number;
  feedbackMessage: string;
} {
  try {
    const history = getPerformanceHistory();
    history.unshift(result);
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history.slice(0, 100)));

    let unlockedNewLevel = false;
    const currentMax = getUnlockedLevel(result.gameId);

    // Rule: If user scores >= 75% accuracy, unlock next level up to 4
    if (result.accuracy >= 75 && result.level >= currentMax && currentMax < 4) {
      unlockLevel(result.gameId, result.level + 1);
      unlockedNewLevel = true;
    }

    const updatedMax = getUnlockedLevel(result.gameId);
    let nextRecommendedLevel = result.level;

    if (result.accuracy >= 85) {
      nextRecommendedLevel = Math.min(4, result.level + 1);
    } else if (result.accuracy < 50 && result.level > 1) {
      nextRecommendedLevel = result.level - 1;
    }

    recalculateSkillProfiles(history);

    // Generate feedback message based on performance
    let feedbackMessage = "";
    if (result.accuracy >= 85) {
      feedbackMessage = unlockedNewLevel
        ? `Outstanding! You answered ${result.correctAnswers}/${result.totalQuestions} correctly and unlocked Level ${updatedMax}!`
        : `Excellent work! You scored ${Math.round(result.accuracy)}%. You are doing great at Level ${result.level}!`;
    } else if (result.accuracy >= 60) {
      feedbackMessage = `Good effort! You answered ${result.correctAnswers}/${result.totalQuestions} correctly. Keep practicing to master Level ${result.level}.`;
    } else {
      feedbackMessage = `Thank you for completing this session! Consistent practice helps build skills. Try Level ${nextRecommendedLevel} next.`;
    }

    return {
      unlockedNewLevel,
      nextRecommendedLevel,
      feedbackMessage,
    };
  } catch {
    return {
      unlockedNewLevel: false,
      nextRecommendedLevel: result.level,
      feedbackMessage: "Great job completing the game!",
    };
  }
}

/**
 * Recalculate all skill scores and trends from gameplay history.
 */
export function recalculateSkillProfiles(history?: DetailedGameResult[]): Record<CognitiveSkill, SkillPerformance> {
  const data = history || getPerformanceHistory();
  const skills: CognitiveSkill[] = [
    "Memory",
    "Attention",
    "Pattern Recognition",
    "Visual-Spatial",
    "Categorization",
    "Sequencing",
    "Recognition",
  ];

  const profiles: Record<CognitiveSkill, SkillPerformance> = {} as any;

  skills.forEach((skill) => {
    const skillResults = data.filter((r) => r.skill === skill || GAME_SKILL_MAP[r.gameId]?.skill === skill);

    if (skillResults.length === 0) {
      profiles[skill] = {
        skill,
        score: 50, // default starting score
        trend: "stable",
        gamesPlayed: 0,
        lastPlayed: null,
      };
      return;
    }

    // Calculate score (weighted recent results)
    const recent = skillResults.slice(0, 5);
    const avgAccuracy = Math.round(recent.reduce((sum, r) => sum + r.accuracy, 0) / recent.length);

    // Determine trend
    let trend: SkillPerformance["trend"] = "stable";
    if (recent.length >= 2) {
      const latest = recent[0].accuracy;
      const prevAvg = recent.slice(1).reduce((s, r) => s + r.accuracy, 0) / (recent.length - 1);
      if (latest > prevAvg + 10) trend = "improving";
      else if (latest < prevAvg - 15) trend = "struggling";
      else if (avgAccuracy >= 80) trend = "strong";
    } else if (avgAccuracy >= 80) {
      trend = "strong";
    }

    profiles[skill] = {
      skill,
      score: avgAccuracy,
      trend,
      gamesPlayed: skillResults.length,
      lastPlayed: skillResults[0].timestamp,
    };
  });

  try {
    localStorage.setItem(STORAGE_KEY_SKILL_PROFILES, JSON.stringify(profiles));
  } catch {}

  return profiles;
}

/**
 * Gets user skill profiles.
 */
export function getSkillProfiles(): Record<CognitiveSkill, SkillPerformance> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SKILL_PROFILES);
    if (raw) return JSON.parse(raw);
  } catch {}
  return recalculateSkillProfiles();
}

/**
 * Intelligent Centralized AI Recommendation Engine.
 * Analyzes recent gameplay, weak areas, unused games, and current levels to recommend next game.
 */
export function getAIRecommendation(): AIRecommendation {
  const history = getPerformanceHistory();
  const profiles = getSkillProfiles();

  // If no games played yet -> Starter Recommendation
  if (history.length === 0) {
    return {
      recommendedGameId: "memory_match",
      recommendedGameTitle: "Memory Match",
      recommendedLevel: 1,
      skillCategory: "Memory",
      reasonKey: "ai_rec_starter",
      reasonDefault: "Start with a gentle memory exercise to begin your training.",
      badge: "starter",
    };
  }

  const lastResult = history[0];
  const lastGameId = lastResult.gameId;

  // 1. If user did exceptionally well in the last game (>= 85%), recommend next level of same game or another game in same skill
  if (lastResult.accuracy >= 85) {
    const maxUnlocked = getUnlockedLevel(lastGameId);
    if (lastResult.level < 4 && maxUnlocked >= lastResult.level + 1) {
      const meta = GAME_SKILL_MAP[lastGameId] || { title: lastResult.gameTitle, skill: lastResult.skill };
      return {
        recommendedGameId: lastGameId,
        recommendedGameTitle: meta.title,
        recommendedLevel: lastResult.level + 1,
        skillCategory: meta.skill,
        reasonKey: "ai_rec_strong_next_level",
        reasonDefault: `You performed strongly in ${meta.title}! Ready for Level ${lastResult.level + 1}?`,
        badge: "next_level",
      };
    }
  }

  // 2. Look for skills where user is struggling (< 60% average score) or played least recently
  const skillList: CognitiveSkill[] = [
    "Memory",
    "Attention",
    "Pattern Recognition",
    "Visual-Spatial",
    "Categorization",
    "Sequencing",
    "Recognition",
  ];

  // Sort skills by score ascending (weakest first) then by lastPlayed ascending
  const sortedSkills = [...skillList].sort((a, b) => {
    const pA = profiles[a];
    const pB = profiles[b];
    if (pA.score !== pB.score) return pA.score - pB.score;
    return (pA.lastPlayed || 0) - (pB.lastPlayed || 0);
  });

  const targetSkill = sortedSkills[0];
  const targetSkillProfile = profiles[targetSkill];

  // Find a game corresponding to targetSkill (different from last played if possible)
  const candidateGames = Object.entries(GAME_SKILL_MAP).filter(([gid, meta]) => meta.skill === targetSkill);
  const selectedEntry = candidateGames.find(([gid]) => gid !== lastGameId) || candidateGames[0] || ["memory_match", GAME_SKILL_MAP.memory_match];

  const [recGameId, recMeta] = selectedEntry;
  const recUnlocked = getUnlockedLevel(recGameId);

  // If struggling, recommend Level 1 or 2; otherwise recommended unlocked level
  let recLevel = recUnlocked;
  if (targetSkillProfile.score < 60) {
    recLevel = 1;
  }

  let reasonDefault = "";
  let reasonKey = "";
  let badge: AIRecommendation["badge"] = "practice";

  if (targetSkillProfile.score < 60) {
    reasonKey = "ai_rec_practice_weak";
    reasonDefault = `Let's practice ${targetSkill} with a friendly Level ${recLevel} exercise.`;
    badge = "practice";
  } else if (targetSkillProfile.gamesPlayed === 0) {
    reasonKey = "ai_rec_explore_new";
    reasonDefault = `Try ${recMeta.title} to practice your ${targetSkill} skills!`;
    badge = "explore";
  } else {
    reasonKey = "ai_rec_balanced_routine";
    reasonDefault = `Great job maintaining your skills! Try ${recMeta.title} at Level ${recLevel}.`;
    badge = "practice";
  }

  return {
    recommendedGameId: recGameId,
    recommendedGameTitle: recMeta.title,
    recommendedLevel: recLevel,
    skillCategory: targetSkill,
    reasonKey,
    reasonDefault,
    badge,
  };
}
