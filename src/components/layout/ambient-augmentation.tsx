"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

const orbitalPaths = [
  { width: "148vw", height: "106vh", duration: 52, reverse: false, dots: 2 },
  { width: "132vw", height: "132vh", duration: 39, reverse: true, dots: 2 },
  { width: "172vw", height: "88vh", duration: 64, reverse: false, dots: 1 },
  { width: "118vw", height: "148vh", duration: 46, reverse: true, dots: 2 },
] as const;

const shapePaths = [
  "M50 8 L82 28 L88 63 L50 92 L12 63 L18 28 Z",
  "M50 13 L75 23 L92 55 L50 87 L8 55 L25 23 Z",
  "M50 5 L86 34 L79 77 L50 95 L21 77 L14 34 Z",
] as const;

export function AmbientAugmentation() {
  const reduceMotion = useReducedMotion() ?? false;
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    let frame = 0;
    let pointer = { x: -1000, y: -1000 };
    const trackPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer = { x: event.clientX, y: event.clientY };
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        if (lightRef.current) {
          lightRef.current.style.backgroundImage = `radial-gradient(300px circle at ${pointer.x}px ${pointer.y}px, rgb(139 92 246 / 9%), transparent 74%)`;
        }
        frame = 0;
      });
    };
    window.addEventListener("pointermove", trackPointer, { passive: true });
    return () => {
      window.removeEventListener("pointermove", trackPointer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  return (
    <div aria-hidden="true" className="ambient-augmentation-layer">
      <div className="ambient-augmentation-atmosphere" />
      <div ref={lightRef} className="ambient-augmentation-light" />

      <svg className="ambient-augmentation-energy" viewBox="0 0 1200 800" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id="ambient-energy-gradient" x1="0" y1="0" x2="1200" y2="800" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8b5cf6" stopOpacity="0" />
            <stop offset=".38" stopColor="#8b5cf6" stopOpacity=".72" />
            <stop offset=".68" stopColor="#38bdf8" stopOpacity=".82" />
            <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          className="ambient-augmentation-trail"
          d="M-100 480 C120 130 330 760 590 390 S1010 100 1310 540"
          stroke="url(#ambient-energy-gradient)"
          strokeWidth="2"
          animate={reduceMotion ? undefined : { strokeDashoffset: [0, -720] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          className="ambient-augmentation-trail ambient-augmentation-trail--second"
          d="M-90 250 C180 650 390 40 650 410 S1030 730 1300 250"
          stroke="url(#ambient-energy-gradient)"
          strokeWidth="1.3"
          animate={reduceMotion ? undefined : { strokeDashoffset: [0, 640] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {orbitalPaths.map((orbit, index) => (
        <motion.div
          key={`orbit-${index}`}
          className={`ambient-augmentation-orbit ${index % 2 ? "ambient-augmentation-orbit--blue" : "ambient-augmentation-orbit--purple"} ${index === 3 ? "ambient-augmentation-orbit--compact" : ""}`}
          style={{ width: orbit.width, height: orbit.height }}
          animate={reduceMotion ? undefined : { rotate: orbit.reverse ? -360 : 360 }}
          transition={{ duration: orbit.duration, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: orbit.dots }, (_, dotIndex) => (
            <span
              key={dotIndex}
              className={`ambient-augmentation-particle ${dotIndex % 2 ? "ambient-augmentation-particle--small" : ""}`}
              style={{ left: `${dotIndex ? 76 : 50}%`, top: dotIndex ? "auto" : "-0.24rem", bottom: dotIndex ? "-0.2rem" : "auto" }}
            />
          ))}
        </motion.div>
      ))}

      <motion.svg
        className="ambient-augmentation-wire ambient-augmentation-wire--one"
        viewBox="0 0 100 100"
        fill="none"
        animate={reduceMotion ? undefined : { y: [0, -12, 0], rotateY: [0, 24, 0], rotateZ: [0, 8, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d={shapePaths[0]} stroke="currentColor" strokeWidth=".8" />
        <path d="M50 8 50 92M12 63 82 28M18 28 88 63" stroke="currentColor" strokeOpacity=".55" strokeWidth=".55" />
        <circle cx="50" cy="50" r="3" fill="currentColor" />
      </motion.svg>

      <motion.svg
        className="ambient-augmentation-wire ambient-augmentation-wire--two"
        viewBox="0 0 100 100"
        fill="none"
        animate={reduceMotion ? undefined : { y: [0, 10, 0], rotateX: [0, 22, 0], rotateZ: [0, -12, 0] }}
        transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.path
          d={shapePaths[0]}
          stroke="currentColor"
          strokeWidth=".9"
          animate={reduceMotion ? undefined : { d: [shapePaths[0], shapePaths[1], shapePaths[2], shapePaths[0]] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <path d="M50 8 50 92M18 28 82 28M12 63 88 63" stroke="currentColor" strokeOpacity=".48" strokeWidth=".5" />
      </motion.svg>

      <motion.svg
        className="ambient-augmentation-accent ambient-augmentation-accent--one"
        viewBox="0 0 120 120"
        fill="none"
        animate={reduceMotion ? undefined : { rotate: 360, opacity: [0.22, 0.42, 0.22] }}
        transition={{ duration: 76, repeat: Infinity, ease: "linear" }}
      >
        <path d="M60 8 105 34 105 86 60 112 15 86 15 34Z" stroke="currentColor" strokeWidth=".8" />
        <path d="m15 34 45 26 45-26M15 86l45-26 45 26M60 8v52m0 52V60" stroke="currentColor" strokeOpacity=".55" strokeWidth=".55" />
        <circle cx="60" cy="60" r="4" fill="currentColor" fillOpacity=".65" />
      </motion.svg>

      <motion.svg
        className="ambient-augmentation-accent ambient-augmentation-accent--two"
        viewBox="0 0 120 120"
        fill="none"
        animate={reduceMotion ? undefined : { rotate: -360, opacity: [0.18, 0.36, 0.18] }}
        transition={{ duration: 94, repeat: Infinity, ease: "linear" }}
      >
        <path d="m60 9 39 22 12 39-28 36H37L9 70l12-39Z" stroke="currentColor" strokeWidth=".8" />
        <path d="m21 31 39 39 39-39M9 70h90M60 9v61l23 36M60 70l-23 36" stroke="currentColor" strokeOpacity=".52" strokeWidth=".55" />
      </motion.svg>

      <motion.div
          className="ambient-augmentation-hologram"
        animate={reduceMotion ? undefined : { y: [0, -11, 0], rotateY: [-14, 12, -14], rotateZ: [-3, 3, -3] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="ambient-augmentation-hologram-grid" />
        <span className="ambient-augmentation-hologram-core" />
        <span className="ambient-augmentation-hologram-orbit" />
      </motion.div>

      <motion.div
        className="ambient-augmentation-glass-sphere"
        animate={reduceMotion ? undefined : { y: [0, 13, 0], scale: [0.96, 1.04, 0.96] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
