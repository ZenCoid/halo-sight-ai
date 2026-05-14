import { useEffect, useRef } from "react";

/**
 * DotGrid — silver attractor field. Cursor magnetises a substrate of dots,
 * subtle ripples propagate from active "detections". GPU-light Canvas2D.
 */
export function DotGrid({ spacing = 28 }: { spacing?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const ripples = useRef<{ x: number; y: number; t: number }[]>([]);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, cols = 0, rows = 0;
    let dots: { x: number; y: number }[] = [];

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / spacing) + 2;
      rows = Math.ceil(h / spacing) + 2;
      dots = [];
      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++)
          dots.push({ x: x * spacing, y: y * spacing });
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - r.left;
      mouse.current.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.current.x = -9999; mouse.current.y = -9999; };
    const onClick = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      ripples.current.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() });
    };
    window.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("click", onClick);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouse.current.x, my = mouse.current.y;
      const now = performance.now();
      ripples.current = ripples.current.filter(r => now - r.t < 1800);

      for (const d of dots) {
        const dx = d.x - mx, dy = d.y - my;
        const dist = Math.hypot(dx, dy);
        const pull = Math.max(0, 1 - dist / 160);
        const ox = -dx / Math.max(dist, 1) * pull * 8;
        const oy = -dy / Math.max(dist, 1) * pull * 8;

        let rippleBoost = 0;
        for (const r of ripples.current) {
          const age = (now - r.t) / 1800;
          const radius = age * 320;
          const dd = Math.hypot(d.x - r.x, d.y - r.y);
          const band = Math.exp(-Math.pow(dd - radius, 2) / 400);
          rippleBoost += band * (1 - age);
        }

        const a = 0.18 + pull * 0.55 + rippleBoost * 0.6;
        const size = 1 + pull * 1.2 + rippleBoost * 1.2;
        ctx.fillStyle = `oklch(0.92 0.005 230 / ${Math.min(a, 0.9)})`;
        ctx.beginPath();
        ctx.arc(d.x + ox, d.y + oy, size, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, [spacing]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
