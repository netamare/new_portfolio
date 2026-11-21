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
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(18, Math.min(58, Math.round(width / 24)));
      stars = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: 0.7 + Math.random() * 1.4,
        phase: index * 0.7,
      }));
    };

    const draw = (time: number) => {
      if (document.hidden) {
        frame = window.requestAnimationFrame(draw);
        return;
      }
      context.clearRect(0, 0, width, height);
      const pointerX = pointerRef.current.active ? pointerRef.current.x : -1000;
      const pointerY = pointerRef.current.active ? pointerRef.current.y : -1000;
      const linkDistance = width < 640 ? 100 : 145;

      for (let i = 0; i < stars.length; i += 1) {
        const star = stars[i];
        star.x += star.vx;
        star.y += star.vy;
        if (star.x < -4) star.x = width + 4;
        if (star.x > width + 4) star.x = -4;
        if (star.y < -4) star.y = height + 4;
        if (star.y > height + 4) star.y = -4;

        const pulse = 0.52 + Math.sin(time * 0.0007 + star.phase) * 0.2;
        const mouseDistance = Math.hypot(star.x - pointerX, star.y - pointerY);
        const glow = Math.max(0, 1 - mouseDistance / 170);
        context.beginPath();
        context.arc(star.x, star.y, star.radius + glow * 1.8, 0, Math.PI * 2);
        context.fillStyle = `rgba(157, 132, 255, ${pulse + glow * 0.38})`;
        context.shadowBlur = 8 + glow * 18;
        context.shadowColor = glow > 0.1 ? "#38bdf8" : "#8b5cf6";
        context.fill();
        context.shadowBlur = 0;

        for (let j = i + 1; j < stars.length; j += 1) {
          const next = stars[j];
          const distance = Math.hypot(star.x - next.x, star.y - next.y);
          if (distance < linkDistance) {
            context.beginPath();
            context.moveTo(star.x, star.y);
            context.lineTo(next.x, next.y);
            context.strokeStyle = `rgba(104, 117, 255, ${(1 - distance / linkDistance) * 0.13})`;
            context.lineWidth = 0.7;
            context.stroke();
          }
        }

        if (mouseDistance < 185) {
          context.beginPath();
          context.moveTo(star.x, star.y);
          context.lineTo(pointerX, pointerY);
          context.strokeStyle = `rgba(56, 189, 248, ${(1 - mouseDistance / 185) * 0.25})`;
          context.lineWidth = 0.8;
          context.stroke();
        }
      }
      frame = window.requestAnimationFrame(draw);
    };

    resize();
    frame = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <>
      <canvas ref={canvasRef} aria-hidden="true" className="particle-universe pointer-events-none fixed inset-0 -z-10" />
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
