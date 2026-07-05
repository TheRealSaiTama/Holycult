import { motion } from "motion/react";

export function MarqueeStrip({
  items,
  speed = 32,
  tone = "dark",
}: {
  items: readonly string[];
  speed?: number;
  tone?: "dark" | "light";
}) {
  const isDark = tone === "dark";
  return (
    <section
      className={`relative overflow-hidden py-5 border-y ${isDark ? "bg-hc-text text-hc-bg border-hc-text" : "bg-hc-bg text-hc-text border-hc-border"}`}
    >
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span
            key={i}
            className="uppercase tracking-tight text-xl md:text-3xl flex items-center gap-10"
            style={{ fontFamily: "'Archivo Black', sans-serif" }}
          >
            {t}
            <span className="text-hc-bronze">☩</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
