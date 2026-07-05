import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/storefront/ProductCard";
import { productsQuery } from "@/lib/queries";
import { MarqueeStrip } from "@/components/decor/MarqueeStrip";
import { BronzeAura } from "@/components/decor/BronzeAura";
import { Crosshair } from "@/components/decor/Crosshair";
import { Rule } from "@/components/decor/Rule";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HOLYCULT — SS26 / FIRST LIGHT" },
      { name: "description", content: "Heavyweight fabrics. Drop-based releases. One production run. No restocks. Ever." },
      { property: "og:title", content: "HOLYCULT — SS26 / FIRST LIGHT" },
      { property: "og:description", content: "Heavyweight fabrics. Drop-based releases. No restocks. Ever." },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "/brand/holycult.png" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(productsQuery("live"));
  },
  component: Home,
});

const TICKER = [
  "SS26 / FIRST LIGHT",
  "ONE RUN. NO RESTOCKS.",
  "HEAVYWEIGHT 420GSM",
  "CULT NUMBER ☩ 0026",
  "SHIPPING WORLDWIDE",
  "JOIN THE CONGREGATION",
];

function Home() {
  const { data: products } = useSuspenseQuery(productsQuery("live"));
  const [activeWall, setActiveWall] = useState<"MENS" | "WOMENS">("MENS");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const featured = products
    .filter((p) => p.gender === activeWall)
    .slice(0, 3);

  return (
    <div className="relative bg-hc-bg text-hc-text overflow-x-hidden">
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden pt-16">
        {/* loose-fit model background */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden flex items-center justify-center">
          <img
            src="/images/model_bg.png"
            alt="HOLYCULT Model"
            className="w-full h-full object-cover opacity-15 mix-blend-multiply scale-105"
            style={{ filter: "grayscale(1) contrast(1.15)" }}
          />
        </div>
        {/* ghost backdrop */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.04]">
          <span
            className="leading-none uppercase tracking-tighter text-hc-text"
            style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "min(38vw, 720px)" }}
          >
            HOLY
          </span>
        </div>

        {/* grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(var(--hc-text) 1px, transparent 1px), linear-gradient(90deg, var(--hc-text) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        {/* aura + orbits */}
        <BronzeAura className="w-[80vw] h-[80vw] max-w-[820px] max-h-[820px]" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute rounded-full border border-hc-text/10 pointer-events-none"
          style={{ width: "min(82vw, 800px)", height: "min(82vw, 800px)" }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute rounded-full border border-hc-bronze/25 pointer-events-none"
          style={{ width: "min(68vw, 680px)", height: "min(68vw, 680px)" }}
        />

        {/* center sigil */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute z-10 text-hc-bronze/60 leading-none select-none"
          style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "min(22vw, 220px)" }}
        >
          ☩
        </motion.div>

        {/* HOLY / CULT title sandwich */}
        <motion.div
          style={{ y: titleY, opacity: fade }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 px-4 sm:px-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: -30, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="uppercase tracking-tighter text-hc-text text-center w-full"
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "clamp(4rem, 18vw, 16rem)",
              lineHeight: 0.82,
              textShadow: "0 12px 40px rgba(0,0,0,0.08)",
            }}
          >
            HOLY
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 30, clipPath: "inset(100% 0 0 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.0, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="uppercase tracking-tighter text-center w-full"
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "clamp(4rem, 18vw, 16rem)",
              lineHeight: 0.82,
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(28,26,24,0.55)",
              paddingRight: "0.08em",
            }}
          >
            CULT
          </motion.h1>
        </motion.div>


        {/* corner crosshairs */}
        <Crosshair className="absolute top-20 left-6 md:left-12" />
        <Crosshair className="absolute top-20 right-6 md:right-12" />
        <Crosshair className="absolute bottom-6 left-6 md:left-12" />
        <Crosshair className="absolute bottom-6 right-6 md:right-12" />

        {/* bottom-left transmission */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="absolute bottom-10 left-6 md:left-16 max-w-[320px] hidden lg:block z-20"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} className="w-2 h-2 rounded-full bg-hc-neon" />
              <span className="label-xs text-hc-muted">LIVE DROP / TRANSMISSION 026</span>
            </div>
            <p className="meta text-hc-muted leading-relaxed">
              Heavyweight fabrics. Drop-based releases. One production run. No restocks. Ever.
            </p>
            <div className="w-10 h-px bg-hc-bronze" />
          </div>
        </motion.div>

        {/* bottom-right CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 right-6 md:right-16 flex flex-col items-end gap-4 z-20"
        >
          <Link to="/drop" className="cta cta-primary">ENTER THE DROP</Link>
          <Link to="/archive" className="label-xs text-hc-muted hover:text-hc-text transition-colors">
            → ARCHIVE
          </Link>
        </motion.div>
      </section>

      <MarqueeStrip items={TICKER} />

      {/* ETHOS */}
      <section className="py-24 md:py-32">
        <div className="page-container grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-3 section-num">/ 002 — ETHOS</div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-9"
          >
            <h2
              className="uppercase leading-[0.9] mb-10"
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "clamp(2.5rem, 7vw, 6rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Not a brand.<br />
              A <span className="text-hc-bronze">congregation</span>.
            </h2>
            <p className="text-lg md:text-xl max-w-[55ch] leading-relaxed text-hc-muted">
              Every piece is numbered. Every run is finite. When it's gone, it's gone — pressed into the
              archive, never to return. This isn't scarcity as marketing. It's scarcity as{" "}
              <em className="not-italic text-hc-text">respect</em>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="border-y border-hc-border py-20">
        <div className="page-container">
          <Rule label="/ 003 — IN THE DROP" sub="FIRST LIGHT" className="mb-8" />
          <div className="flex items-center justify-between mb-12 gap-4 flex-wrap">
            <h2 className="display-lg">PIECES</h2>
            {/* Wall Selector */}
            <div className="flex gap-2 border border-hc-border p-1 bg-hc-surface">
              {(["MENS", "WOMENS"] as const).map((gender) => (
                <button
                  key={gender}
                  type="button"
                  onClick={() => setActiveWall(gender)}
                  className={`px-4 py-2 label-xs font-mono tracking-widest transition-colors duration-200 ${
                    activeWall === gender ? "bg-hc-text text-hc-bg" : "text-hc-muted hover:text-hc-text"
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
            <Link to="/drop" className="label-xs hover:text-hc-bronze transition-colors">VIEW ALL →</Link>
          </div>
          <div className="product-grid">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-hc-border">
        <div className="page-container grid grid-cols-2 md:grid-cols-4">
          {[
            { k: "420", l: "GSM HEAVYWEIGHT" },
            { k: "01", l: "PRODUCTION RUN" },
            { k: "00", l: "RESTOCKS EVER" },
            { k: "26", l: "CULT NUMBER" },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="py-12 px-4 md:px-8 border-l border-hc-border first:border-l-0"
            >
              <div
                className="mb-3 uppercase"
                style={{
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                {s.k}
              </div>
              <div className="label-xs text-hc-muted">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="relative py-32 text-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at center, rgba(166,124,82,0.18) 0%, transparent 60%)" }}
        />
        <div className="relative z-10 page-container">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="uppercase mb-12"
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "clamp(4rem, 14vw, 14rem)",
              lineHeight: 0.85,
              letterSpacing: "-0.05em",
            }}
          >
            DROP<br />
            <span style={{ color: "transparent", WebkitTextStroke: "2px var(--hc-bronze)" }}>026</span>
          </motion.h2>
          <Link to="/drop" className="cta cta-primary">SECURE YOUR PIECE</Link>
        </div>
      </section>
    </div>
  );
}
