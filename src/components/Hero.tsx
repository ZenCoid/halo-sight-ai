import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ParticleField } from "./ParticleField";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden">
      <ParticleField density={110} />

      {/* Aurora orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{ background: "var(--gradient-emerald)" }} />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl animate-float-slow"
        style={{ background: "radial-gradient(circle, var(--cyan-glow), transparent 70%)" }} />

      {/* Floating horizontal lines */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden>
        <defs>
          <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="white" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-center px-6 pt-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 inline-flex items-center gap-3 rounded-full bg-glass px-4 py-2 text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-glow opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "var(--emerald-glow)" }} />
          </span>
          Sovereign · Edge-Native · Class-A Reliability
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="text-balance text-6xl leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-[9rem]"
        >
          <span className="text-platinum">Surveillance,</span>
          <br />
          <span className="text-iridescent italic animate-shimmer" style={{
            backgroundImage: "linear-gradient(110deg, var(--platinum), var(--emerald-glow), var(--cyan-glow), var(--iridescent), var(--platinum))",
          }}>
            re-imagined
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          A sovereign vision intelligence platform that learns from your operations every night —
          and protects what matters before anyone notices.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <button className="group relative overflow-hidden rounded-full px-8 py-4 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
            style={{ background: "var(--gradient-iridescent)", boxShadow: "var(--shadow-glow)" }}>
            <span className="relative z-10">Request a private briefing</span>
            <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
          <button className="rounded-full border border-white/15 bg-glass px-8 py-4 text-sm font-medium text-foreground transition-colors hover:border-white/30">
            Watch the system think →
          </button>
        </motion.div>

        {/* Live telemetry chip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="flex items-center gap-6 rounded-full bg-glass px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <Telemetry label="Latency" value="14ms" />
            <span className="h-3 w-px bg-white/10" />
            <Telemetry label="Confidence" value="99.7%" />
            <span className="h-3 w-px bg-white/10" />
            <Telemetry label="Edge nodes" value="2,481" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Telemetry({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground/60">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}
