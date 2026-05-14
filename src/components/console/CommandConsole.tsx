import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { DotGrid } from "./DotGrid";
import { ReflectiveCard } from "./ReflectiveCard";
import { DecryptText } from "./DecryptText";
import {
  Activity, Crosshair, Radar, ShieldCheck, Cpu, Database,
  Eye, GitBranch, HardDrive, Lock, Radio, Waves, ArrowUpRight,
} from "lucide-react";

/* ───────────────────────── Top operational chrome ───────────────────────── */

function ConsoleChrome() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(
        d.toUTCString().split(" ").slice(4, 5)[0] + "Z · " +
        d.toISOString().slice(0, 10),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center justify-between px-6 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-mercury-dim">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--rose-quartz)", boxShadow: "0 0 8px var(--rose-glow)" }} />
          <span style={{ color: "var(--mercury)" }}>SafeSight · Console</span>
        </div>
        <span>SVN-04 · CLEARANCE Δ</span>
      </div>
      <div className="hidden items-center gap-6 md:flex">
        <span>Edge nodes 2,481</span>
        <span>Latency 14ms</span>
        <span>{time}</span>
      </div>
      <div className="flex items-center gap-2">
        <button className="rounded-sm border border-white/10 px-3 py-1 hover:border-white/30" style={{ color: "var(--mercury)" }}>
          Brief
        </button>
        <button className="rounded-sm px-3 py-1 text-[10px]" style={{ background: "var(--rose-quartz)", color: "#0b0b0b" }}>
          Engage
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────── Left intelligence rail ───────────────────────── */

function IntelligenceRail() {
  const items = [
    { icon: Eye, label: "Live Vision", count: "12" },
    { icon: Radar, label: "Detections", count: "47" },
    { icon: GitBranch, label: "Rule Canvas", count: "" },
    { icon: Database, label: "Forensic Vault", count: "8.2k" },
    { icon: Cpu, label: "Training Loop", count: "" },
    { icon: ShieldCheck, label: "Custody", count: "" },
    { icon: HardDrive, label: "Edge Nodes", count: "" },
    { icon: Lock, label: "Sovereignty", count: "" },
  ];
  return (
    <ReflectiveCard className="row-span-6 flex flex-col p-3">
      <div className="px-2 pb-3 pt-1 font-mono text-[9px] uppercase tracking-[0.32em] text-mercury-dim">
        Intelligence
      </div>
      <nav className="flex flex-col gap-1">
        {items.map((it, i) => (
          <button
            key={it.label}
            className="group flex items-center justify-between rounded-md px-2 py-2 text-left transition-colors hover:bg-white/[0.04]"
          >
            <div className="flex items-center gap-3">
              <it.icon className="h-3.5 w-3.5 text-mercury-dim group-hover:text-mercury" />
              <span className="text-xs text-mercury">{it.label}</span>
            </div>
            {it.count && (
              <span className="font-mono text-[10px] text-mercury-dim">{it.count}</span>
            )}
            {i === 1 && (
              <span className="absolute left-0 h-5 w-[2px]" style={{ background: "var(--rose-quartz)" }} />
            )}
          </button>
        ))}
      </nav>
      <div className="mt-auto rounded-md border border-white/5 p-3">
        <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-mercury-dim">Operator</div>
        <div className="mt-1 text-sm text-mercury">R. Hassid</div>
        <div className="font-mono text-[10px] text-mercury-dim">tier-Δ · sovereign</div>
      </div>
    </ReflectiveCard>
  );
}

/* ───────────────────────── Central live canvas ─────────────────────────── */

function LiveCanvas() {
  return (
    <ReflectiveCard className="col-span-2 row-span-3 p-5" intent="alert">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-mercury-dim">
            CAM-07 · north perimeter · live
          </div>
          <h2 className="mt-2 font-display text-3xl leading-none text-mercury">
            Surveillance, <span className="italic text-iridescent" style={{ backgroundImage: "var(--gradient-iridescent)" }}>re-imagined</span>
          </h2>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-mercury-dim">
          <span className="h-1.5 w-1.5 rounded-full animate-pulse-glow" style={{ background: "var(--rose-quartz)" }} />
          REC · 14:22:08.471
        </div>
      </div>

      {/* Faux video feed */}
      <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-md border border-white/5"
        style={{ background: "radial-gradient(ellipse at 30% 30%, oklch(0.18 0.01 240) 0%, oklch(0.04 0.003 240) 70%)" }}>
        {/* Crosshair grid */}
        <svg className="absolute inset-0 h-full w-full opacity-20" aria-hidden>
          <defs>
            <pattern id="cx" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0 H0 V40" fill="none" stroke="oklch(0.92 0.005 230)" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cx)" />
        </svg>

        {/* Detection boxes */}
        <DetectionBox top="22%" left="14%" w="22%" h="42%" label="WORKER · no-helmet" conf={0.94} />
        <DetectionBox top="48%" left="58%" w="14%" h="32%" label="VEHICLE · idle 4m" conf={0.82} />
        <DetectionBox top="10%" left="68%" w="10%" h="14%" label="PPE · compliant" conf={0.99} variant="ok" />

        {/* Scanline */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-x-0 h-[1px] animate-scan" style={{ background: "linear-gradient(90deg, transparent, var(--mercury), transparent)" }} />
        </div>

        {/* Corner brackets */}
        {["tl","tr","bl","br"].map(p => <Bracket key={p} pos={p as any} />)}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 font-mono text-[10px]">
        <Stat label="Confidence" value="99.7%" />
        <Stat label="Latency" value="14ms" />
        <Stat label="Reasoning" value="active" pulse />
      </div>
    </ReflectiveCard>
  );
}

function DetectionBox({
  top, left, w, h, label, conf, variant = "alert",
}: { top: string; left: string; w: string; h: string; label: string; conf: number; variant?: "alert" | "ok" }) {
  const color = variant === "alert" ? "var(--rose-quartz)" : "var(--emerald-glow)";
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
      className="absolute" style={{ top, left, width: w, height: h }}
    >
      <div className="absolute inset-0 rounded-[2px] border" style={{ borderColor: color, boxShadow: `0 0 18px ${color}33, inset 0 0 24px ${color}10` }} />
      <div className="absolute -top-5 left-0 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color }}>
        <span className="h-1 w-1" style={{ background: color }} />
        {label} · {(conf * 100).toFixed(1)}%
      </div>
    </motion.div>
  );
}

function Bracket({ pos }: { pos: "tl"|"tr"|"bl"|"br" }) {
  const map: Record<string, string> = {
    tl: "top-2 left-2 border-t border-l",
    tr: "top-2 right-2 border-t border-r",
    bl: "bottom-2 left-2 border-b border-l",
    br: "bottom-2 right-2 border-b border-r",
  };
  return <span className={`pointer-events-none absolute h-3 w-3 ${map[pos]}`} style={{ borderColor: "var(--mercury)" }} />;
}

function Stat({ label, value, pulse }: { label: string; value: string; pulse?: boolean }) {
  return (
    <div className="rounded-sm border border-white/5 bg-black/30 px-3 py-2">
      <div className="text-mercury-dim uppercase tracking-[0.2em] text-[9px]">{label}</div>
      <div className="mt-1 flex items-center gap-2 text-mercury">
        {pulse && <span className="h-1.5 w-1.5 rounded-full animate-pulse-glow" style={{ background: "var(--emerald-glow)" }} />}
        {value}
      </div>
    </div>
  );
}

/* ───────────────────────── Rule canvas (telemetry) ─────────────────────── */

function RuleCanvas() {
  const rules = [
    { id: "R-01", txt: "no-helmet ∧ zone=site → alert(severity:high)", state: "armed" },
    { id: "R-02", txt: "fall ∨ collapse → dispatch(med, custody)",     state: "armed" },
    { id: "R-03", txt: "loiter(>180s) ∧ after_hours → escalate(L2)",   state: "training" },
    { id: "R-04", txt: "weapon(conf>0.85) → broadcast(security)",      state: "armed" },
  ];
  return (
    <ReflectiveCard className="col-span-2 row-span-2 p-5">
      <Header icon={GitBranch} label="Rule Canvas" sub="declarative · compiled · sovereign" />
      <div className="mt-4 grid grid-cols-2 gap-2 font-mono text-[11px]">
        {rules.map(r => (
          <div key={r.id} className="group flex items-center justify-between rounded-sm border border-white/5 bg-black/30 px-3 py-2 hover:border-white/15">
            <div className="flex items-center gap-3 truncate">
              <span className="text-mercury-dim">{r.id}</span>
              <span className="truncate text-mercury">{r.txt}</span>
            </div>
            <span className={`text-[9px] uppercase tracking-[0.25em] ${r.state === "armed" ? "" : "text-mercury-dim"}`}
              style={r.state === "armed" ? { color: "var(--rose-quartz)" } : undefined}>
              {r.state}
            </span>
          </div>
        ))}
      </div>
    </ReflectiveCard>
  );
}

/* ───────────────────────── Forensic vault (bento) ──────────────────────── */

const VAULT = [
  { sev: "high", who: "WORKER-12", act: "no-helmet · zone-A", conf: 0.94, hash: "9f8a…b21c", t: "14:22:08", size: "lg" },
  { sev: "med",  who: "VEHICLE-03", act: "unauthorised idle", conf: 0.82, hash: "12cd…77e0", t: "14:21:44", size: "sm" },
  { sev: "low",  who: "PPE-CHK", act: "compliant pass", conf: 0.99, hash: "0a4f…91dd", t: "14:21:12", size: "sm" },
  { sev: "high", who: "INTRUSION", act: "perimeter breach · gate-2", conf: 0.97, hash: "44ee…0c10", t: "14:19:55", size: "md" },
  { sev: "med",  who: "FALL", act: "posture anomaly", conf: 0.71, hash: "ab9c…3210", t: "14:18:02", size: "sm" },
];

function ForensicVault({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <ReflectiveCard className="col-span-2 row-span-4 p-5">
      <Header icon={Database} label="Forensic Vault" sub="SHA-256 · immutable evidence matrix" right={
        <span className="font-mono text-[10px] text-mercury-dim">8,241 sealed</span>
      } />
      <div className="mt-4 grid auto-rows-[68px] grid-cols-4 gap-2">
        {VAULT.map((v, i) => {
          const span =
            v.size === "lg" ? "col-span-2 row-span-2" :
            v.size === "md" ? "col-span-2 row-span-1" :
            "col-span-1 row-span-1";
          const alert = v.sev === "high";
          return (
            <button
              key={i}
              onClick={() => onOpen(i)}
              className={`group relative ${span} overflow-hidden rounded-md border border-white/5 bg-black/40 p-3 text-left transition-all hover:border-white/20`}
              style={alert ? { boxShadow: "inset 0 0 22px oklch(0.78 0.18 16 / 0.12)" } : undefined}
            >
              {alert && <span className="absolute inset-y-0 left-0 w-[2px]" style={{ background: "var(--rose-quartz)", boxShadow: "0 0 10px var(--rose-glow)" }} />}
              <div className="flex items-start justify-between">
                <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-mercury-dim">{v.t}</div>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em]"
                  style={{ color: alert ? "var(--rose-quartz)" : "var(--mercury-dim)" }}>{v.sev}</span>
              </div>
              <div className="mt-1 truncate text-xs text-mercury">{v.who}</div>
              <div className="truncate font-mono text-[10px] text-mercury-dim">{v.act}</div>
              {v.size !== "sm" && (
                <div className="absolute inset-x-3 bottom-2 flex items-center justify-between font-mono text-[9px] text-mercury-dim">
                  <DecryptText value={v.hash} />
                  <span>conf {(v.conf * 100).toFixed(0)}%</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </ReflectiveCard>
  );
}

/* ───────────────────────── Right-side stack ────────────────────────────── */

function TrainingLoopTile() {
  return (
    <ReflectiveCard className="row-span-2 p-4">
      <Header icon={Cpu} label="Training Loop" sub="autonomous · overnight" />
      <div className="mt-3 space-y-2 font-mono text-[10px] text-mercury-dim">
        {[
          { t: "02:14", s: "Qwen2.5-VL · teacher snapshot" },
          { t: "03:02", s: "RF-DETR · distill epoch 41/64" },
          { t: "04:18", s: "validation · mAP 0.913" },
          { t: "05:01", s: "deploy → 2,481 edge nodes" },
        ].map((r, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: i === 1 ? "var(--rose-quartz)" : "var(--mercury-dim)" }} />
            <span style={{ color: "var(--mercury)" }}>{r.t}</span>
            <span className="truncate">{r.s}</span>
          </div>
        ))}
      </div>
    </ReflectiveCard>
  );
}

function CustodyTile() {
  return (
    <ReflectiveCard className="row-span-2 p-4">
      <Header icon={ShieldCheck} label="Chain of Custody" sub="cryptographically sealed" />
      <div className="mt-3 space-y-2">
        {[
          ["sealed", "evt-9f8ab21c"],
          ["sealed", "evt-12cd77e0"],
          ["sealed", "evt-44ee0c10"],
        ].map(([s, h]) => (
          <div key={h} className="flex items-center justify-between rounded-sm border border-white/5 bg-black/30 px-2 py-1.5 font-mono text-[10px]">
            <div className="flex items-center gap-2">
              <Lock className="h-3 w-3" style={{ color: "var(--emerald-glow)" }} />
              <DecryptText value={h} className="text-mercury" />
            </div>
            <span className="text-mercury-dim uppercase tracking-[0.2em] text-[9px]">{s}</span>
          </div>
        ))}
      </div>
    </ReflectiveCard>
  );
}

function EdgeTile() {
  return (
    <ReflectiveCard className="row-span-2 p-4">
      <Header icon={Radio} label="Edge Mesh" sub="sovereign · air-gappable" />
      <div className="mt-3 grid grid-cols-8 gap-1">
        {Array.from({ length: 64 }).map((_, i) => {
          const off = i % 11 === 0;
          const hot = i % 13 === 0;
          return (
            <span key={i} className="aspect-square rounded-[2px]"
              style={{
                background: off ? "oklch(0.20 0.005 240)" : hot ? "var(--rose-quartz)" : "oklch(0.55 0.04 195)",
                opacity: off ? 0.5 : 0.85,
                boxShadow: hot ? "0 0 8px var(--rose-glow)" : undefined,
              }} />
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-mercury-dim">
        <span>2,481 / 2,506 online</span>
        <span style={{ color: "var(--rose-quartz)" }}>3 hot</span>
      </div>
    </ReflectiveCard>
  );
}

/* ───────────────────────── Header micro-component ──────────────────────── */

function Header({ icon: Icon, label, sub, right }: { icon: any; label: string; sub: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <span className="grid h-7 w-7 place-items-center rounded-sm border border-white/10 bg-black/50">
          <Icon className="h-3.5 w-3.5 text-mercury" />
        </span>
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-mercury">{label}</div>
          <div className="font-mono text-[10px] text-mercury-dim">{sub}</div>
        </div>
      </div>
      {right}
    </div>
  );
}

/* ───────────────────────── Forensic viewer (modal) ─────────────────────── */

function ForensicViewer({ idx, onClose }: { idx: number | null; onClose: () => void }) {
  const v = idx != null ? VAULT[idx] : null;
  return (
    <AnimatePresence>
      {v && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-6 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl border-machined p-6"
          >
            <Header icon={Crosshair} label={`Evidence · ${v.who}`} sub={`captured ${v.t} · sealed`} right={
              <button onClick={onClose} className="font-mono text-[10px] uppercase tracking-[0.22em] text-mercury-dim hover:text-mercury">close</button>
            } />
            <div className="mt-5 aspect-video rounded-md border border-white/5"
              style={{ background: "radial-gradient(ellipse at 40% 30%, oklch(0.18 0.012 240), oklch(0.04 0.003 240))" }} />
            <div className="mt-5 grid grid-cols-3 gap-3 font-mono text-[11px]">
              <div className="rounded-sm border border-white/5 bg-black/30 p-3">
                <div className="text-mercury-dim text-[9px] uppercase tracking-[0.22em]">image_hash</div>
                <DecryptText value={v.hash} className="text-mercury" />
              </div>
              <div className="rounded-sm border border-white/5 bg-black/30 p-3">
                <div className="text-mercury-dim text-[9px] uppercase tracking-[0.22em]">confidence</div>
                <div style={{ color: "var(--mercury)" }}>{(v.conf * 100).toFixed(2)}%</div>
              </div>
              <div className="rounded-sm border border-white/5 bg-black/30 p-3">
                <div className="text-mercury-dim text-[9px] uppercase tracking-[0.22em]">severity</div>
                <div style={{ color: v.sev === "high" ? "var(--rose-quartz)" : "var(--mercury)" }}>{v.sev}</div>
              </div>
            </div>
            <div className="mt-4 rounded-sm border border-white/5 bg-black/30 p-4 font-mono text-[11px] leading-relaxed text-mercury">
              <span className="text-mercury-dim">VLM · reasoning →</span> subject within zone-A perimeter · helmet absent across 14 consecutive frames · pose consistent with active labor · violation classified at threshold τ=0.85 · escalated per rule R-01.
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ───────────────────────── The console ─────────────────────────────────── */

export function CommandConsole() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="relative isolate min-h-[100svh] w-full overflow-hidden"
      style={{ background: "var(--gradient-obsidian)" }}>
      <DotGrid />

      {/* Atmospheric obsidian wash */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 70% 10%, oklch(0.16 0.012 200 / 0.5), transparent 60%)" }} />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1480px] flex-col px-4 pb-6 pt-4">
        <ConsoleChrome />

        {/* Bento operational grid */}
        <div className="grid flex-1 grid-cols-12 grid-rows-6 gap-3 p-2">
          {/* Left rail — 2 cols × 6 rows */}
          <div className="col-span-2 row-span-6">
            <IntelligenceRail />
          </div>

          {/* Live canvas — 5 cols × 3 rows */}
          <div className="col-span-5 row-span-3 grid">
            <LiveCanvas />
          </div>

          {/* Forensic vault — 3 cols × 6 rows  (coexists with rule canvas) */}
          <div className="col-span-3 row-span-6 grid">
            <ForensicVault onOpen={(i) => setOpenIdx(i)} />
          </div>

          {/* Right edge stack — 2 cols */}
          <div className="col-span-2 row-span-3 grid">
            <EdgeTile />
          </div>

          {/* Rule canvas — 5 cols × 3 rows  (coexists with vault, side-by-side) */}
          <div className="col-span-5 row-span-3 grid">
            <RuleCanvas />
          </div>

          {/* Right lower — training + custody */}
          <div className="col-span-2 row-span-3 grid grid-rows-2 gap-3">
            <TrainingLoopTile />
            <CustodyTile />
          </div>
        </div>

        {/* Footer status bar */}
        <div className="mt-2 flex items-center justify-between px-4 py-2 font-mono text-[9px] uppercase tracking-[0.3em] text-mercury-dim">
          <div className="flex items-center gap-4">
            <Activity className="h-3 w-3" /> system nominal
            <span>·</span>
            <Waves className="h-3 w-3" /> reasoning load 41%
          </div>
          <a href="#dossier" className="flex items-center gap-1 hover:text-mercury">
            descend to dossier <ArrowUpRight className="h-3 w-3 rotate-90" />
          </a>
        </div>
      </div>

      <ForensicViewer idx={openIdx} onClose={() => setOpenIdx(null)} />
    </section>
  );
}
