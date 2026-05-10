import { useEffect, useMemo, useState } from "react";

export function useVisualizationSteps(steps = [], intervalMs = 2600) {
  const [activeStep, setActiveStep] = useState(0);
  const stepCount = steps.length;

  useEffect(() => {
    setActiveStep(0);
  }, [stepCount]);

  useEffect(() => {
    if (stepCount <= 1 || typeof window === "undefined") {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReducedMotion) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveStep((currentStep) => (currentStep + 1) % stepCount);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, stepCount]);

  return useMemo(
    () => ({
      activeStep,
      setActiveStep,
      stepCount,
    }),
    [activeStep, stepCount]
  );
}

export default useVisualizationSteps;
