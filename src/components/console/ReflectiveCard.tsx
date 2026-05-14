import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type CSSProperties } from "react";

/**
 * ReflectiveCard — machined-edge tile with a silver specular highlight that
 * tracks the cursor. Subtle 3D tilt. Used for every intelligence module.
 */
export function ReflectiveCard({
  children,
  className = "",
  style,
  intent = "neutral",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  intent?: "neutral" | "alert";
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });

  const handleMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    mx.set(x); my.set(y);
    ry.set((x - 50) / 18);
    rx.set(-(y - 50) / 22);
  };
  const reset = () => { rx.set(0); ry.set(0); };

  const sheen = useMotionTemplate`radial-gradient(220px circle at ${mx}% ${my}%, oklch(0.92 0.005 230 / 0.18), transparent 65%)`;
  const accent = intent === "alert"
    ? `radial-gradient(180px circle at ${50}% ${50}%, oklch(0.78 0.18 16 / 0.18), transparent 60%)`
    : "transparent";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, ...style }}
      className={`group relative overflow-hidden border-machined ${intent === "alert" ? "glow-rose" : ""} ${className}`}
    >
      {/* Specular sheen */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: sheen, mixBlendMode: "screen" }}
      />
      {/* Static accent wash for alert tiles */}
      {intent === "alert" && (
        <div className="pointer-events-none absolute inset-0" style={{ background: accent }} />
      )}
      {/* Brushed-metal scanline */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, oklch(0.92 0.005 230 / 1) 0 1px, transparent 1px 3px)",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
