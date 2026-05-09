import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function useVisualizationSteps(steps = []) {
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  const safeSteps = useMemo(() => steps.filter(Boolean), [steps]);

  useEffect(() => {
    setActiveStep(0);
  }, [safeSteps.length]);

  useEffect(() => {
    if (shouldReduceMotion || safeSteps.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveStep((currentValue) => (currentValue + 1) % safeSteps.length);
    }, 2600);

    return () => window.clearInterval(intervalId);
  }, [safeSteps.length, shouldReduceMotion]);

  return {
    activeStep,
    setActiveStep,
    shouldReduceMotion,
  };
}
