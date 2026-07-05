import { motion } from "motion/react";

export function BronzeAura({ className = "", intensity = 0.35 }: { className?: string; intensity?: number }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.06, 1], opacity: [0.55, 0.9, 0.55] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        background: `radial-gradient(circle, rgba(166,124,82,${intensity}) 0%, transparent 65%)`,
        filter: "blur(60px)",
      }}
    />
  );
}
