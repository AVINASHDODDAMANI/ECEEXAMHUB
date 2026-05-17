import { memo } from "react";
import { motion } from "framer-motion";

function VLSIAnimationWrapperComponent({ ariaLabel, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-2xl border border-slate-200 bg-slate-50 p-2"
      role="img"
      aria-label={ariaLabel}
    >
      {children}
    </motion.div>
  );
}

const VLSIAnimationWrapper = memo(VLSIAnimationWrapperComponent);

export default VLSIAnimationWrapper;
