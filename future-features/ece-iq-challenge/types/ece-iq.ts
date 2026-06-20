export type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "GATE/BEL Level";

export type GameModeId =
  | "circuit-detective"
  | "logic-gate-master"
  | "signal-analyst"
  | "engineering-aptitude"
  | "network-challenge"
  | "memory-lab";

export interface GameMode {
  id: GameModeId;
  title: string;
  shortTitle: string;
  description: string;
  skills: string[];
  icon: string;
  accent: string;
  available: number;
}

export interface ChallengeQuestion {
  id: string;
  mode: GameModeId;
  difficulty: Difficulty;
  prompt: string;
  diagram?: "circuit" | "logic" | "signal" | "network" | "memory";
  options: string[];
  correctIndex: number;
  explanation: string;
  xp: number;
  coins: number;
}

export interface IQProgress {
  xp: number;
  rating: number;
  coins: number;
  completed: number;
  correct: number;
  attempted: number;
  streak: number;
  lastPlayed: string | null;
  completedIds: string[];
  achievements: string[];
}
