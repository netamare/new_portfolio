"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { portfolio } from "@/data/portfolio";

export function IntroAnimation() {
  const reduceMotion = useReducedMotion() ?? false;
  const [visible, setVisible] = useState(true);
  const previousOverflow = useRef("");
  const timerRef = useRef<number | null>(null);

  const dismiss = useCallback(() => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    document.body.style.overflow = previousOverflow.current;
    setVisible(false);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    timerRef.current = window.setTimeout(dismiss, 3100);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow.current;
    };
  }, [dismiss, reduceMotion]);

  return (
    <AnimatePresence>
      {visible && !reduceMotion ? (
        <motion.div
          className="intro-curtain"
          role="status"
          aria-label={`Welcome to ${portfolio.name}'s portfolio`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-5%", scale: 1.025 }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="intro-wordmark">
            <svg className="intro-welcome-svg" viewBox="0 0 800 200" role="img" aria-label="Welcome">
              <defs>
                <linearGradient id="welcome-stroke" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--purple)" />
                  <stop offset="100%" stopColor="var(--blue)" />
                </linearGradient>
              </defs>
              <motion.text
                x="400"
                y="142"
                textAnchor="middle"
                className="intro-handwritten"
                initial={{ strokeDashoffset: 1500, fillOpacity: 0.04, opacity: 0.7 }}
                animate={{ strokeDashoffset: 0, fillOpacity: [0.04, 0.04, 0.12], opacity: 1 }}
                transition={{
                  strokeDashoffset: { duration: 2.25, ease: "easeInOut" },
                  fillOpacity: { duration: 0.6, delay: 2.1 },
                  opacity: { duration: 0.35 },
                }}
                stroke="url(#welcome-stroke)"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="1500"
              >
                Welcome
              </motion.text>
              <motion.path
                d="M175 164 C300 181 500 180 626 159"
                className="intro-flourish"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ pathLength: { duration: 0.8, delay: 1.9 }, opacity: { duration: 0.25, delay: 1.9 } }}
                fill="none"
                stroke="url(#welcome-stroke)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <motion.span
              className="intro-caption"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.65, duration: 0.5 }}
            >
              {portfolio.name.toUpperCase()} · PORTFOLIO
            </motion.span>
          </div>
          <button
            className="intro-skip"
            type="button"
            onClick={dismiss}
          >
            Skip intro <span aria-hidden="true">↗</span>
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
