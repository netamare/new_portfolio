"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

export function FixedOrbitBackground() {
  const reduceMotion = useReducedMotion() ?? false;
  const cursorLightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const trackPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      if (cursorLightRef.current) {
        cursorLightRef.current.style.backgroundImage = `radial-gradient(460px circle at ${event.clientX}px ${event.clientY}px, rgb(56 189 248 / 8%), transparent 72%)`;
      }
    };
    window.addEventListener("pointermove", trackPointer, { passive: true });
    return () => window.removeEventListener("pointermove", trackPointer);
  }, [reduceMotion]);

  return (
    <div aria-hidden="true" className="fixed-orbit-background pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="fixed-orbit-background__aura" />
      <div className="fixed-orbit-background__ring fixed-orbit-background__ring--wide" />
      <div className="fixed-orbit-background__ring fixed-orbit-background__ring--tall" />
      <div className="fixed-orbit-background__ring fixed-orbit-background__ring--inner" />
      <div className="fixed-orbit-background__ring fixed-orbit-background__ring--outer" />
      <div className="fixed-orbit-background__ring fixed-orbit-background__ring--cross" />
      <svg aria-hidden="true" className="fixed-orbit-background__energy-wave fixed-orbit-background__energy-wave--one" viewBox="0 0 1200 800" preserveAspectRatio="none" fill="none">
        <defs><linearGradient id="fixed-energy-gradient-a" x1="0" y1="0" x2="1200" y2="800" gradientUnits="userSpaceOnUse"><stop stopColor="#8b5cf6" stopOpacity=".08" /><stop offset=".35" stopColor="#8b5cf6" stopOpacity=".78" /><stop offset=".62" stopColor="#38bdf8" stopOpacity=".86" /><stop offset="1" stopColor="#38bdf8" stopOpacity=".06" /></linearGradient></defs>
        <ellipse className="fixed-orbit-background__energy-trace" cx="600" cy="400" rx="550" ry="286" stroke="url(#fixed-energy-gradient-a)" strokeWidth="2.2" />
      </svg>
      <svg aria-hidden="true" className="fixed-orbit-background__energy-wave fixed-orbit-background__energy-wave--two" viewBox="0 0 1200 800" preserveAspectRatio="none" fill="none">
        <defs><linearGradient id="fixed-energy-gradient-b" x1="1200" y1="0" x2="0" y2="800" gradientUnits="userSpaceOnUse"><stop stopColor="#38bdf8" stopOpacity=".06" /><stop offset=".38" stopColor="#38bdf8" stopOpacity=".68" /><stop offset=".7" stopColor="#8b5cf6" stopOpacity=".76" /><stop offset="1" stopColor="#8b5cf6" stopOpacity=".04" /></linearGradient></defs>
        <ellipse className="fixed-orbit-background__energy-trace fixed-orbit-background__energy-trace--reverse" cx="600" cy="400" rx="474" ry="324" stroke="url(#fixed-energy-gradient-b)" strokeWidth="1.8" />
      </svg>
      <div className="fixed-orbit-background__pulse fixed-orbit-background__pulse--one" />
      <div className="fixed-orbit-background__pulse fixed-orbit-background__pulse--two" />
      <div ref={cursorLightRef} className="fixed-orbit-background__cursor-light" />
      <motion.svg
        className="fixed-orbit-background__wire fixed-orbit-background__wire--one"
        viewBox="0 0 120 120" fill="none" stroke="url(#fixed-wire-a)" strokeWidth="1.1"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
      >
        <defs><linearGradient id="fixed-wire-a" x1="0" y1="0" x2="120" y2="120"><stop stopColor="#8b5cf6" stopOpacity=".8" /><stop offset="1" stopColor="#38bdf8" stopOpacity=".75" /></linearGradient></defs>
        <path d="M60 5 108 34 100 90 60 115 20 90 12 34 60 5Z" />
        <path d="m12 34 48 19 48-19M20 90l40-37 40 37M60 5v48m0 62V53M12 34l8 56m88-56-8 56" />
      </motion.svg>
      <motion.svg
        className="fixed-orbit-background__wire fixed-orbit-background__wire--two"
        viewBox="0 0 120 120" fill="none" stroke="url(#fixed-wire-b)" strokeWidth="1"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 130, repeat: Infinity, ease: "linear" }}
      >
        <defs><linearGradient id="fixed-wire-b" x1="0" y1="0" x2="120" y2="120"><stop stopColor="#38bdf8" stopOpacity=".78" /><stop offset="1" stopColor="#8b5cf6" stopOpacity=".7" /></linearGradient></defs>
        <circle cx="60" cy="60" r="48" /><path d="M60 12v96M12 60h96M26 26l68 68m0-68L26 94" />
      </motion.svg>
      <motion.div
        className="fixed-orbit-background__cube"
        animate={reduceMotion ? undefined : { y: [0, -13, 0], rotateX: [18, 28, 18], rotateY: [-24, 18, -24], rotateZ: [0, 8, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="cube-face cube-front" /><span className="cube-face cube-back" />
        <span className="cube-face cube-left" /><span className="cube-face cube-right" />
        <span className="cube-face cube-top" /><span className="cube-face cube-bottom" />
      </motion.div>
      <motion.div
        className="fixed-orbit-background__orb"
        animate={reduceMotion ? undefined : { y: [0, 12, 0], scale: [0.92, 1.08, 0.92] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="fixed-orbit-background__glass-sphere" />
      <div className="fixed-orbit-background__hologram"><span /><span /><span /></div>
    </div>
  );
}
