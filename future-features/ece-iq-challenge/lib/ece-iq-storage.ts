import type { IQProgress } from "../types/ece-iq";

const KEY = "eceexamguide:iq-progress:v1";

export const defaultProgress: IQProgress = {
  xp: 1280, rating: 1180, coins: 340, completed: 14, correct: 37, attempted: 45, streak: 6,
  lastPlayed: null, completedIds: [], achievements: ["first-spark", "logic-rookie"],
};

export const progressStore = {
  load(): IQProgress {
    if (typeof window === "undefined") return defaultProgress;
    try {
      const saved = JSON.parse(window.localStorage.getItem(KEY) || "null");
      return saved ? { ...defaultProgress, ...saved } : defaultProgress;
    } catch { return defaultProgress; }
  },
  save(progress: IQProgress) {
    if (typeof window !== "undefined") window.localStorage.setItem(KEY, JSON.stringify(progress));
  },
};

// A future Firebase adapter only needs the same load/save contract.
export type ProgressStore = typeof progressStore;
