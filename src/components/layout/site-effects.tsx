"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { ParticleUniverse } from "@/components/layout/particle-universe";
import { FixedOrbitBackground } from "@/components/layout/fixed-orbit-background";
import { AmbientAugmentation } from "@/components/layout/ambient-augmentation";

export function SiteEffects() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const updateScrollState = () => {
      const shouldShow = window.scrollY > 560;
      setShowBackToTop((visible) => visible === shouldShow ? visible : shouldShow);
    };
    const firstFrame = window.requestAnimationFrame(updateScrollState);
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  return (
    <>
      <FixedOrbitBackground />
      <div aria-hidden="true" className="cinematic-aurora pointer-events-none fixed inset-0 -z-10" />
      <ParticleUniverse />
      <AmbientAugmentation />
      <AnimatePresence>
        {showBackToTop ? (
          <motion.button
            type="button"
            aria-label="Back to top"
            title="Back to top"
            className="fixed bottom-5 right-5 z-[55] inline-flex size-12 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-purple to-blue text-white shadow-[0_8px_30px_rgb(0_0_0_/_38%),0_0_24px_rgb(139_92_246_/_22%)] backdrop-blur-lg transition-shadow hover:shadow-[0_10px_34px_rgb(0_0_0_/_45%),0_0_32px_rgb(56_189_248_/_30%)] sm:bottom-7 sm:right-7"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.86 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: 8, scale: 0.9 }}
            whileHover={shouldReduceMotion ? undefined : { y: -3, rotate: -4, scale: 1.06 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: "easeOut" }}
            onClick={() => window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" })}
          >
            <ArrowUp size={19} aria-hidden="true" />
          </motion.button>
        ) : null}
      </AnimatePresence>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-purple via-blue to-purple shadow-[0_0_12px_rgb(139_92_246_/_55%)]"
        style={{ scaleX: shouldReduceMotion ? 0 : scaleX }}
      />
      <motion.div
        aria-hidden="true"
        className="site-intro-glint pointer-events-none fixed inset-x-0 top-0 z-[61] h-[2px] origin-left bg-gradient-to-r from-transparent via-white/90 to-transparent"
        initial={{ scaleX: 0, opacity: 0.9 }}
        animate={{ scaleX: [0, 1, 1], opacity: [0.9, 0.9, 0] }}
        transition={{ duration: 1.1, times: [0, 0.65, 1], ease: "easeInOut" }}
      />
    </>
  );
}
