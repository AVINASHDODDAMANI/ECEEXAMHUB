import { useEffect, useMemo, useState } from "react";
import {
  buildTopicKey,
  getLearningProgressStats,
  readLearningProgress,
  readLearningRevision,
  writeLearningProgress,
  writeLearningRevision,
} from "./learning-utils";

export function useLearningProgress() {
  const [progressMap, setProgressMap] = useState({});
  const [revisionMap, setRevisionMap] = useState({});
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const nextProgress = readLearningProgress();
    const nextRevision = readLearningRevision();
    setProgressMap(nextProgress);
    setRevisionMap(nextRevision);
    setIsReady(true);
  }, []);

  const progressStats = useMemo(
    () => getLearningProgressStats(progressMap),
    [progressMap]
  );

  function setTopicCompleted(subjectSlug, topicSlug, completed) {
    const topicKey = buildTopicKey(subjectSlug, topicSlug);

    setProgressMap((currentValue) => {
      const nextValue = {
        ...currentValue,
        [topicKey]: completed,
      };

      if (!completed) {
        delete nextValue[topicKey];
      }

      writeLearningProgress(nextValue);
      return nextValue;
    });
  }

  function setTopicSavedForRevision(subjectSlug, topicSlug, saved) {
    const topicKey = buildTopicKey(subjectSlug, topicSlug);

    setRevisionMap((currentValue) => {
      const nextValue = {
        ...currentValue,
        [topicKey]: saved,
      };

      if (!saved) {
        delete nextValue[topicKey];
      }

      writeLearningRevision(nextValue);
      return nextValue;
    });
  }

  return {
    isReady,
    progressMap,
    revisionMap,
    progressStats,
    revisionCount: Object.keys(revisionMap).length,
    setTopicCompleted,
    setTopicSavedForRevision,
  };
}
