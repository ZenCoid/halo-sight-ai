import { useEffect, useRef } from "react";

/**
 * Cursor-reactive iridescent particle field.
 * Lightweight canvas2D — magnetic attraction, depth parallax, ambient drift.
 */
export function ParticleField({ density = 90 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; vx: number; vy: number; z: number; r: number; hue: number };
    let particles: P[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        z: Math.random() * 0.8 + 0.2,
        r: Math.random() * 1.4 + 0.4,
        hue: 170 + Math.random() * 60, // emerald → cyan
      }));
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onLeave = () => { mouseRef.current.active = false; };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const m = mouseRef.current;

      // Connections + particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // magnetic attraction toward cursor
        if (m.active) {
          const dx = m.x - p.x;
          const dy = m.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 240 * 240) {
            const f = (1 - Math.sqrt(d2) / 240) * 0.06 * p.z;
            p.vx += (dx / Math.sqrt(d2 + 1)) * f;
            p.vy += (dy / Math.sqrt(d2 + 1)) * f;
          }
        }

        p.vx *= 0.96;
        p.vy *= 0.96;
        p.x += p.vx + Math.sin((p.y + performance.now() * 0.0002) * 0.01) * 0.1;
        p.y += p.vy;

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        // glow dot
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grd.addColorStop(0, `oklch(0.92 0.14 ${p.hue} / ${0.7 * p.z})`);
        grd.addColorStop(1, "transparent");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();

        // line connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 130 * 130) {
            const a = (1 - Math.sqrt(d2) / 130) * 0.18 * Math.min(p.z, q.z);
            ctx.strokeStyle = `oklch(0.85 0.12 190 / ${a})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
