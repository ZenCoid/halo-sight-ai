import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-6 pt-5">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all ${
          scrolled ? "bg-glass" : "bg-transparent"
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="font-display text-lg tracking-tight">SafeSight<span className="text-iridescent"> AI</span></span>
        </Link>
        <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#platform" className="transition-colors hover:text-foreground">Platform</a>
          <a href="#architecture" className="transition-colors hover:text-foreground">Architecture</a>
          <a href="#industries" className="transition-colors hover:text-foreground">Industries</a>
          <a href="#evidence" className="transition-colors hover:text-foreground">Evidence</a>
        </div>
        <button className="rounded-full px-4 py-2 text-sm font-medium text-primary-foreground"
          style={{ background: "var(--gradient-iridescent)" }}>
          Brief us
        </button>
      </motion.nav>
    </header>
  );
}

function Logo() {
  return (
    <div className="relative h-7 w-7">
      <div className="absolute inset-0 rounded-full" style={{ background: "var(--gradient-emerald)", boxShadow: "0 0 20px var(--emerald-glow)" }} />
      <div className="absolute inset-[3px] rounded-full bg-background flex items-center justify-center">
        <div className="h-2 w-2 rounded-full" style={{ background: "var(--platinum)" }} />
      </div>
    </div>
  );
}

/* ============== SECTIONS ============== */

export function CommandCenter() {
  const ref = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const [, force] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mouse.current.x = (e.clientX - r.left - r.width / 2) / r.width;
      mouse.current.y = (e.clientY - r.top - r.height / 2) / r.height;
      force((n) => n + 1);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="platform" className="relative px-6 py-32">
      <SectionLabel kicker="01 — Command Center" title="An operating room for vision intelligence." />

      <div ref={ref} className="relative mx-auto mt-20 max-w-7xl"
        style={{ perspective: "2000px" }}>
        <div
          className="border-iridescent relative overflow-hidden p-2"
          style={{
            transform: `rotateX(${-mouse.current.y * 4}deg) rotateY(${mouse.current.x * 6}deg)`,
            transition: "transform 0.4s cubic-bezier(.2,.8,.2,1)",
          }}
        >
          <div className="relative grid grid-cols-12 gap-3 rounded-2xl bg-background/60 p-6">
            {/* Top bar */}
            <div className="col-span-12 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--emerald-glow)" }} />
                Live · Sector 7-North
              </div>
              <div>SHA-256 · Verified · 14:02:38.441 UTC</div>
            </div>

            {/* Main feed */}
            <Panel className="col-span-8 aspect-[16/9] relative">
              <div className="absolute inset-0" style={{
                background: "radial-gradient(ellipse at 30% 20%, oklch(0.78 0.16 170 / 0.3), transparent 60%), radial-gradient(ellipse at 80% 80%, oklch(0.72 0.14 210 / 0.25), transparent 55%), oklch(0.18 0.014 220)"
              }} />
              {/* Detection boxes */}
              <DetectionBox top="22%" left="18%" w="14%" h="22%" label="Worker · No PPE · 0.94" pulse />
              <DetectionBox top="48%" left="55%" w="12%" h="28%" label="Forklift · Path · 0.99" />
              <DetectionBox top="32%" left="72%" w="18%" h="18%" label="Restricted Zone · 0.87" warn />
              {/* Scan line */}
              <div className="pointer-events-none absolute inset-x-0 h-24 animate-scan"
                style={{ background: "linear-gradient(180deg, transparent, oklch(0.85 0.14 195 / 0.25), transparent)" }} />
              <div className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-widest text-foreground/70">
                CAM-07 · 4K · 30fps
              </div>
            </Panel>

            {/* Side panels */}
            <div className="col-span-4 grid grid-rows-3 gap-3">
              <Panel className="relative overflow-hidden p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Active reasoning</p>
                <p className="mt-2 font-display text-lg leading-tight">Qwen2.5-VL is verifying intent of a worker entering Zone-3.</p>
                <div className="mt-3 flex gap-1">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <span key={i} className="h-3 w-1 rounded-full"
                      style={{ background: `oklch(0.85 0.14 ${170 + i * 4} / ${0.3 + (i % 4) * 0.15})` }} />
                  ))}
                </div>
              </Panel>
              <Panel className="p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Rule fired</p>
                <p className="mt-2 text-sm">PPE compliance · Hard-hat absent for 4.2s</p>
                <p className="mt-1 text-xs text-muted-foreground">No-code rule v2.18 · Site Manager</p>
              </Panel>
              <Panel className="p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">False alarm reduction</p>
                <p className="mt-2 text-2xl font-display">−98.4%</p>
                <p className="text-xs text-muted-foreground">Temporal windowing · 90-day rolling</p>
              </Panel>
            </div>

            {/* Bottom telemetry */}
            <div className="col-span-12 mt-1 grid grid-cols-4 gap-3">
              <Stat label="Edge inference" value="14 ms" />
              <Stat label="Models hot" value="9 / 12" />
              <Stat label="Tokens spent today" value="0" hint="Privacy by physics" />
              <Stat label="Chain integrity" value="100%" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return <div className={`relative overflow-hidden rounded-xl bg-card border border-white/5 ${className}`}>{children}</div>;
}
function DetectionBox({ top, left, w, h, label, pulse, warn }: { top: string; left: string; w: string; h: string; label: string; pulse?: boolean; warn?: boolean }) {
  const color = warn ? "oklch(0.78 0.18 60)" : "oklch(0.85 0.14 175)";
  return (
    <div className="absolute" style={{ top, left, width: w, height: h }}>
      <div className="absolute inset-0 rounded-sm" style={{ border: `1px solid ${color}`, boxShadow: `0 0 24px -4px ${color}` }}>
        {pulse && <div className="absolute inset-0 rounded-sm animate-pulse-glow" style={{ border: `1px solid ${color}` }} />}
        {[
          ["top-0 left-0", "border-t-2 border-l-2"],
          ["top-0 right-0", "border-t-2 border-r-2"],
          ["bottom-0 left-0", "border-b-2 border-l-2"],
          ["bottom-0 right-0", "border-b-2 border-r-2"],
        ].map(([pos, b]) => (
          <span key={pos} className={`absolute h-2 w-2 ${pos} ${b}`} style={{ borderColor: color }} />
        ))}
      </div>
      <div className="absolute -top-6 left-0 whitespace-nowrap rounded-sm px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider"
        style={{ background: color, color: "oklch(0.14 0.012 220)" }}>{label}</div>
    </div>
  );
}
function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-card/60 p-3">
      <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg text-foreground">{value}</p>
      {hint && <p className="text-[10px] text-muted-foreground/70">{hint}</p>}
    </div>
  );
}

export function SectionLabel({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">{kicker}</p>
      <h2 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
        <span className="text-platinum">{title}</span>
      </h2>
      {sub && <p className="mt-5 text-base text-muted-foreground sm:text-lg">{sub}</p>}
    </div>
  );
}

/* ============ Teacher / Student architecture ============ */
export function TeacherStudent() {
  return (
    <section id="architecture" className="relative px-6 py-32">
      <SectionLabel
        kicker="02 — Architecture"
        title="A Teacher that never sleeps. A Student that never forgets."
        sub="A Qwen2.5-VL reasoning teacher distills judgment into RF-DETR specialist students — every night, on your data, behind your firewall."
      />
      <div className="relative mx-auto mt-24 grid max-w-6xl gap-6 md:grid-cols-[1fr_auto_1fr]">
        <ArchCard
          tag="Teacher"
          name="Qwen2.5-VL"
          role="Multimodal reasoning · Intent understanding · Edge-case adjudication"
          metrics={[["Context", "128k"], ["Modality", "Vision · Text"], ["Mode", "Reflective"]]}
          gradient="var(--gradient-emerald)"
        />
        <div className="relative flex items-center justify-center">
          <Connector />
        </div>
        <ArchCard
          tag="Student"
          name="RF-DETR · Specialist"
          role="Real-time detection · Edge-deployable · Domain-tuned"
          metrics={[["Latency", "14 ms"], ["Runtime", "OpenVINO"], ["Footprint", "21 MB"]]}
          gradient="linear-gradient(135deg, var(--cyan-glow), var(--iridescent))"
        />
        <div className="md:col-span-3 mt-6 rounded-2xl bg-glass p-6 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Autonomous overnight loop</p>
          <p className="mt-3 font-display text-2xl">Each night, the Teacher reviews uncertain cases, generates labels, and re-tunes its Students before sunrise.</p>
        </div>
      </div>
    </section>
  );
}

function ArchCard({ tag, name, role, metrics, gradient }: { tag: string; name: string; role: string; metrics: [string, string][]; gradient: string }) {
  return (
    <div className="border-iridescent relative overflow-hidden p-6 group">
      <div className="absolute -inset-32 opacity-20 blur-3xl transition-opacity group-hover:opacity-40" style={{ background: gradient }} />
      <p className="relative font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{tag}</p>
      <h3 className="relative mt-3 text-3xl">{name}</h3>
      <p className="relative mt-3 text-sm text-muted-foreground">{role}</p>
      <div className="relative mt-6 grid grid-cols-3 gap-2">
        {metrics.map(([k, v]) => (
          <div key={k} className="rounded-lg border border-white/5 bg-card/60 p-2.5">
            <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{k}</p>
            <p className="mt-0.5 text-sm">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Connector() {
  return (
    <svg width="120" height="220" viewBox="0 0 120 220" className="hidden md:block">
      <defs>
        <linearGradient id="conn" x1="0" x2="1">
          <stop offset="0%" stopColor="oklch(0.85 0.14 175)" />
          <stop offset="100%" stopColor="oklch(0.82 0.14 210)" />
        </linearGradient>
      </defs>
      <path d="M 0 70 C 60 70, 60 110, 120 110" stroke="url(#conn)" strokeWidth="1.5" fill="none" />
      <path d="M 120 110 C 60 110, 60 150, 0 150" stroke="url(#conn)" strokeWidth="1.5" fill="none" />
      <circle r="3" fill="oklch(0.92 0.14 195)">
        <animateMotion dur="3s" repeatCount="indefinite" path="M 0 70 C 60 70, 60 110, 120 110" />
      </circle>
      <circle r="3" fill="oklch(0.92 0.14 195)">
        <animateMotion dur="3s" repeatCount="indefinite" begin="1.5s" path="M 120 110 C 60 110, 60 150, 0 150" />
      </circle>
    </svg>
  );
}

/* ============ Use cases ============ */
const INDUSTRIES = [
  { name: "Construction", line: "Site safety without site supervisors.", k: "PPE · Vehicle paths · Fall risk", grad: "linear-gradient(135deg, oklch(0.82 0.13 80), oklch(0.78 0.15 30))" },
  { name: "Healthcare", line: "Dignity-preserving patient awareness.", k: "Falls · Wandering · Hand hygiene", grad: "linear-gradient(135deg, oklch(0.85 0.12 175), oklch(0.78 0.14 210))" },
  { name: "Retail", line: "Quiet eyes on the floor.", k: "Shrink · Queues · Layout heat", grad: "linear-gradient(135deg, oklch(0.85 0.14 320), oklch(0.78 0.10 280))" },
  { name: "National security", line: "Sovereign vision, on your soil.", k: "Perimeter · Anomaly · Forensics", grad: "linear-gradient(135deg, oklch(0.92 0.012 200), oklch(0.55 0.02 220))" },
];
export function Industries() {
  return (
    <section id="industries" className="relative px-6 py-32">
      <SectionLabel kicker="03 — Industries" title="One platform. Four worlds." sub="The same engine adapts overnight to the cameras, vocabulary, and edge cases of your domain." />
      <div className="mx-auto mt-20 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
        {INDUSTRIES.map((i, idx) => (
          <motion.div
            key={i.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.08 }}
            viewport={{ once: true, margin: "-80px" }}
            className="border-iridescent group relative h-72 overflow-hidden p-5"
          >
            <div className="absolute inset-0 opacity-30 transition-opacity group-hover:opacity-60" style={{ background: i.grad }} />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="relative flex h-full flex-col justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">0{idx + 1}</p>
              <div>
                <h3 className="text-3xl">{i.name}</h3>
                <p className="mt-2 text-sm text-foreground/80">{i.line}</p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{i.k}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ============ Training Loop ============ */
export function TrainingLoop() {
  const stages = [
    { t: "21:00", title: "Harvest", desc: "Uncertain frames quietly queued from edge nodes." },
    { t: "23:30", title: "Adjudicate", desc: "Teacher reasons through edge cases, produces labels." },
    { t: "02:15", title: "Distill", desc: "Specialist Students fine-tune on the new judgment." },
    { t: "04:50", title: "Validate", desc: "A holdout panel compares yesterday vs. tonight." },
    { t: "05:30", title: "Deploy", desc: "Signed weights pushed to every edge node before shift." },
  ];
  return (
    <section className="relative px-6 py-32">
      <SectionLabel kicker="04 — Autonomy" title="Your system is wiser every morning." />
      <div className="relative mx-auto mt-20 max-w-5xl">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2" style={{ background: "linear-gradient(180deg, transparent, var(--emerald-glow), var(--cyan-glow), transparent)" }} />
        {stages.map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`relative grid grid-cols-2 gap-12 py-10 ${i % 2 ? "" : ""}`}
          >
            <div className={i % 2 ? "col-start-2 pl-12" : "text-right pr-12"}>
              <p className="font-mono text-xs tracking-[0.25em] text-muted-foreground">{s.t}</p>
              <h3 className="mt-2 text-3xl">{s.title}</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">{s.desc}</p>
            </div>
            <div className="absolute left-1/2 top-12 -translate-x-1/2">
              <div className="relative h-4 w-4">
                <span className="absolute inset-0 animate-ripple rounded-full" style={{ background: "var(--emerald-glow)" }} />
                <span className="absolute inset-1 rounded-full" style={{ background: "var(--platinum)", boxShadow: "0 0 20px var(--emerald-glow)" }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ============ Chain of custody ============ */
export function ChainOfCustody() {
  return (
    <section id="evidence" className="relative px-6 py-32">
      <SectionLabel kicker="05 — Evidence" title="Truth, signed and sealed." sub="Every frame, decision, and rule produces a forensic record verifiable in court." />
      <div className="mx-auto mt-20 max-w-5xl rounded-3xl bg-glass p-2">
        <div className="rounded-2xl bg-background/60 p-8">
          <div className="grid gap-4 md:grid-cols-5">
            {["Capture", "Sign", "Reason", "Decide", "Archive"].map((s, i) => (
              <div key={s} className="rounded-xl border border-white/5 p-4 text-center">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Step 0{i + 1}</p>
                <p className="mt-2 text-lg">{s}</p>
                <p className="mt-1 font-mono text-[10px] text-emerald-glow truncate">SHA-256 ✓</p>
              </div>
            ))}
          </div>
          <div className="mt-6 overflow-hidden rounded-xl border border-white/5 bg-card/60 p-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
            <p><span className="text-emerald-glow">›</span> evt.0x9f1e · cam-07 · 14:02:38.441 · ppe.compliance.fail</p>
            <p><span className="text-emerald-glow">›</span> sha256: 7b 9f 1c 4d a2 ef ··· 02 d1 8c · signed by edge-node 482</p>
            <p><span className="text-emerald-glow">›</span> reasoning: Qwen2.5-VL · v3.4 · "Worker removed hard-hat in zone tagged active-crane."</p>
            <p><span className="text-emerald-glow">›</span> dispatch: site-supervisor.42 · ack 14:02:41.117 · resolved 14:04:09</p>
            <p><span className="text-emerald-glow">›</span> chain: <span className="text-platinum">VERIFIED · 100%</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ CTA ============ */
export function CTA() {
  return (
    <section className="relative px-6 py-32">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl p-1"
        style={{ background: "var(--gradient-iridescent)" }}>
        <div className="relative overflow-hidden rounded-3xl bg-background px-10 py-24 text-center">
          <div className="absolute -top-32 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
            style={{ background: "var(--gradient-emerald)" }} />
          <p className="relative font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Limited briefings · Q3</p>
          <h2 className="relative mt-6 text-balance text-5xl leading-[1.02] sm:text-6xl md:text-7xl">
            <span className="text-platinum">Step into the </span>
            <span className="text-iridescent italic">command room.</span>
          </h2>
          <p className="relative mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            See SafeSight AI deployed live on your camera feed in a 45-minute private session. NDA upon request.
          </p>
          <div className="relative mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button className="rounded-full px-8 py-4 text-sm font-medium text-primary-foreground"
              style={{ background: "var(--gradient-iridescent)", boxShadow: "var(--shadow-glow)" }}>
              Request a private briefing
            </button>
            <button className="rounded-full border border-white/15 bg-glass px-8 py-4 text-sm font-medium">
              Speak to engineering
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ Footer ============ */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 px-6 py-20">
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-80 opacity-30 blur-3xl"
        style={{ background: "var(--gradient-emerald)" }} />
      <div className="relative mx-auto grid max-w-6xl gap-16 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5"><Logo /><span className="font-display text-lg">SafeSight<span className="text-iridescent"> AI</span></span></div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">Sovereign vision intelligence for environments where mistakes are not allowed.</p>
        </div>
        {[
          ["Platform", ["Architecture", "Edge runtime", "Privacy by physics"]],
          ["Industries", ["Construction", "Healthcare", "Retail", "Defense"]],
          ["Company", ["Briefings", "Engineering", "Press"]],
        ].map(([title, items]) => (
          <div key={title as string}>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{title as string}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {(items as string[]).map((it) => <li key={it}><a className="text-foreground/80 transition-colors hover:text-foreground" href="#">{it}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="relative mx-auto mt-16 flex max-w-6xl items-center justify-between border-t border-white/5 pt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <p>© 2026 SafeSight AI · All rights reserved</p>
        <p>Made by Ruben Hassid</p>
      </div>
    </footer>
  );
}
