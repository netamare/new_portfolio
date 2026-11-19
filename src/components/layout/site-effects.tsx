"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useState } from "react";

const particlePositions = [
  [8, 18], [17, 72], [24, 38], [33, 88], [42, 14], [51, 63],
  [60, 29], [69, 81], [77, 48], [86, 17], [92, 69], [96, 37],
] as const;

function AmbientParticle({
  position,
  index,
  pointerX,
  pointerY,
}: {
  position: readonly [number, number];
  index: number;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}) {
  const drift = 4 + (index % 4) * 2;
  const x = useTransform(pointerX, [-1, 1], [-drift, drift]);
  const y = useTransform(pointerY, [-1, 1], [-drift, drift]);

  return (
    <motion.span
      className="absolute size-1 rounded-full bg-blue/50 shadow-[0_0_12px_rgb(56_189_248_/_35%)]"
      style={{ left: `${position[0]}%`, top: `${position[1]}%`, x, y }}
      animate={{ opacity: [0.18, 0.55, 0.18], scale: [0.75, 1.15, 0.75] }}
      transition={{ duration: 5 + (index % 5), delay: index * 0.22, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function SiteEffects() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [hasPointer, setHasPointer] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${pointerX}px ${pointerY}px, rgb(139 92 246 / 7%), transparent 72%)`;
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const updatePointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      parallaxX.set((event.clientX / window.innerWidth) * 2 - 1);
      parallaxY.set((event.clientY / window.innerHeight) * 2 - 1);
      setHasPointer(true);
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => window.removeEventListener("pointermove", updatePointer);
  }, [parallaxX, parallaxY, pointerX, pointerY, shouldReduceMotion]);

  return (
    <>
      <div aria-hidden="true" className="ambient-mesh pointer-events-none fixed inset-0 -z-10" />
      {!shouldReduceMotion ? (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden sm:block">
          {particlePositions.map((position, index) => (
            <AmbientParticle key={index} position={position} index={index} pointerX={parallaxX} pointerY={parallaxY} />
          ))}
        </div>
      ) : null}
      {hasPointer && !shouldReduceMotion ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[1] hidden mix-blend-screen sm:block"
          style={{ background: spotlight }}
        />
      ) : null}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-purple via-blue to-purple shadow-[0_0_12px_rgb(139_92_246_/_55%)]"
        style={{ scaleX: shouldReduceMotion ? 0 : scaleX }}
      />
      {!shouldReduceMotion ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 z-[61] h-[2px] origin-left bg-gradient-to-r from-transparent via-white/90 to-transparent"
          initial={{ scaleX: 0, opacity: 0.9 }}
          animate={{ scaleX: [0, 1, 1], opacity: [0.9, 0.9, 0] }}
          transition={{ duration: 1.1, times: [0, 0.65, 1], ease: "easeInOut" }}
        />
      ) : null}
    </>
  );
}
