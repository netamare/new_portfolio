"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Star = { x: number; y: number; vx: number; vy: number; radius: number; phase: number };

function CursorTrail({ x, y, delay }: { x: MotionValue<number>; y: MotionValue<number>; delay: number }) {
  const springX = useSpring(x, { stiffness: 150 - delay * 12, damping: 24, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 150 - delay * 12, damping: 24, mass: 0.8 });

  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[79] hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple/35 blur-[2px] md:block"
      style={{ x: springX, y: springY, scale: 1 - delay * 0.18, opacity: 0.65 - delay * 0.13 }}
    />
  );
}

export function ParticleUniverse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: -1000, y: -1000, active: false });
  const reduceMotion = useReducedMotion() ?? false;
  const [finePointer, setFinePointer] = useState(false);
  const [pointer, setPointer] = useState({ active: false, hovering: false });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const cursorX = useSpring(x, { stiffness: 440, damping: 34, mass: 0.32 });
  const cursorY = useSpring(y, { stiffness: 440, damping: 34, mass: 0.32 });

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)");
    const sync = () => setFinePointer(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!finePointer || reduceMotion) return;
    document.documentElement.classList.add("has-custom-cursor");
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      pointerRef.current = { x: event.clientX, y: event.clientY, active: true };
      setPointer((current) => current.active ? current : { ...current, active: true });
    };
    const hover = (event: PointerEvent) => {
      const target = event.target;
      const interactive = target instanceof Element && Boolean(target.closest("a, button, input, textarea, select, [role='button']"));
      setPointer((current) => current.hovering === interactive ? current : { ...current, hovering: interactive });
    };
    const leave = () => {
      pointerRef.current.active = false;
      setPointer({ active: false, hovering: false });
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", hover, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", hover);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [finePointer, reduceMotion, x, y]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context || reduceMotion) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let stars: Star[] = [];
    let columns = 1;
    let buckets: number[][] = [];
    const resize = () => {
      const mobile = window.innerWidth < 640;
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = mobile
        ? Math.max(88, Math.min(132, Math.round(width / 3.8)))
        : Math.max(180, Math.min(260, Math.round(width / 7)));
      const linkDistance = mobile ? 82 : 126;
      columns = Math.ceil(width / linkDistance) + 1;
      const rows = Math.ceil(height / linkDistance) + 1;
      buckets = Array.from({ length: columns * rows }, () => []);
      stars = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (mobile ? 0.13 : 0.17),
        vy: (Math.random() - 0.5) * (mobile ? 0.13 : 0.17),
        radius: 0.55 + Math.random() * 1.15,
        phase: index * 0.7,
      }));
    };

    const draw = (time: number) => {
      frame = 0;
      if (document.hidden) return;
      context.clearRect(0, 0, width, height);
      const pointerX = pointerRef.current.active ? pointerRef.current.x : -1000;
      const pointerY = pointerRef.current.active ? pointerRef.current.y : -1000;
      const linkDistance = width < 640 ? 82 : 126;
      const linkDistanceSquared = linkDistance * linkDistance;
      const trailsPath = new Path2D();
      const pointerLinesPath = pointerRef.current.active ? new Path2D() : null;

      for (const bucket of buckets) bucket.length = 0;

      context.beginPath();
      for (let i = 0; i < stars.length; i += 1) {
        const star = stars[i];
        star.x += star.vx;
        star.y += star.vy;
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;
        const cellX = Math.min(columns - 1, Math.floor(star.x / linkDistance));
        const cellY = Math.floor(star.y / linkDistance);
        buckets[cellY * columns + cellX]?.push(i);
      }

      for (let i = 0; i < stars.length; i += 1) {
        const star = stars[i];
        const cellX = Math.min(columns - 1, Math.floor(star.x / linkDistance));
        const cellY = Math.floor(star.y / linkDistance);
        for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
          const neighborY = cellY + offsetY;
          if (neighborY < 0 || neighborY >= Math.ceil(height / linkDistance) + 1) continue;
          for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
            const neighborX = cellX + offsetX;
            if (neighborX < 0 || neighborX >= columns) continue;
            const neighbors = buckets[neighborY * columns + neighborX];
            for (const j of neighbors) {
              if (j <= i) continue;
              const next = stars[j];
              const dx = star.x - next.x;
              const dy = star.y - next.y;
              const distanceSquared = dx * dx + dy * dy;
              if (distanceSquared >= linkDistanceSquared) continue;
              context.moveTo(star.x, star.y);
              context.lineTo(next.x, next.y);
              if ((i + j) % 5 === 0) {
                const trail = (time * 0.000025 + star.phase * 0.17) % 0.84;
                trailsPath.moveTo(star.x - dx * trail, star.y - dy * trail);
                trailsPath.lineTo(star.x - dx * (trail + 0.12), star.y - dy * (trail + 0.12));
              }
            }
          }
        }
      }
      context.strokeStyle = "rgba(119, 137, 255, 0.105)";
      context.lineWidth = 0.65;
      context.stroke();
      context.strokeStyle = "rgba(125, 211, 252, 0.48)";
      context.lineWidth = 1.05;
      context.stroke(trailsPath);

      context.beginPath();
      for (let i = 0; i < stars.length; i += 1) {
        const star = stars[i];
        const pulse = 0.82 + Math.sin(time * 0.0007 + star.phase) * 0.16;
        const mouseDistance = Math.hypot(star.x - pointerX, star.y - pointerY);
        const glow = Math.max(0, 1 - mouseDistance / 170);
        const radius = star.radius * pulse + glow * 1.4;
        context.moveTo(star.x + radius, star.y);
        context.arc(star.x, star.y, radius, 0, Math.PI * 2);

        if (pointerLinesPath && mouseDistance < 185) {
          pointerLinesPath.moveTo(star.x, star.y);
          pointerLinesPath.lineTo(pointerX, pointerY);
        }
      }
      context.fillStyle = "rgba(157, 132, 255, 0.76)";
      context.fill();
      if (pointerLinesPath) {
        context.strokeStyle = "rgba(56, 189, 248, 0.16)";
        context.lineWidth = 0.75;
        context.stroke(pointerLinesPath);
      }
      frame = window.requestAnimationFrame(draw);
    };

    resize();
    frame = window.requestAnimationFrame(draw);
    const handleVisibility = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      } else if (!frame) {
        frame = window.requestAnimationFrame(draw);
      }
    };
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reduceMotion]);

  return (
    <>
      <canvas ref={canvasRef} aria-hidden="true" className="particle-universe pointer-events-none fixed inset-0 z-0" />
      {finePointer ? (
        <>
          <CursorTrail x={x} y={y} delay={1} />
          <CursorTrail x={x} y={y} delay={2} />
          <CursorTrail x={x} y={y} delay={3} />
          <motion.span
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-[80] hidden size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue/60 bg-blue/5 shadow-[0_0_24px_rgb(56_189_248_/_22%)] backdrop-blur-sm md:flex"
            animate={{ opacity: pointer.active ? 1 : 0, scale: pointer.hovering ? 1.55 : 1 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{ x: cursorX, y: cursorY }}
          >
            <motion.span className="size-1.5 rounded-full bg-blue shadow-[0_0_12px_2px_rgb(56_189_248_/_75%)]" animate={{ scale: pointer.hovering ? 0.5 : 1 }} />
          </motion.span>
        </>
      ) : null}
    </>
  );
}
