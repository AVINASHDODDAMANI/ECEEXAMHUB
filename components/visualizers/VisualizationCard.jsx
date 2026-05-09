import { memo } from "react";
import { motion } from "framer-motion";
import { cardMotionProps } from "../../lib/communication-visualization-utils";

function VisualizationCardComponent({ title, subtitle, ariaLabel, children }) {
  return (
    <motion.section
      {...cardMotionProps}
      className="overflow-hidden rounded-[26px] border border-portal-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,251,255,0.98))] shadow-sm"
      aria-label={ariaLabel}
    >
      <div className="border-b border-portal-100 px-4 py-4 sm:px-5">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-portal-700">
          Animated concept visual
        </p>
        <h3 className="mt-1 text-lg font-black tracking-tight text-slate-950 sm:text-xl">
          {title}
        </h3>
        <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-700">{subtitle}</p>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </motion.section>
  );
}

const VisualizationCard = memo(VisualizationCardComponent);

export default VisualizationCard;
