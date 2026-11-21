"use client";

import { motion, useReducedMotion } from "motion/react";
import { Code2, Lightbulb, NotebookPen, Plane, Smartphone } from "lucide-react";
import { AnimatedReveal } from "@/components/ui/animated-reveal";

const journey = [
  {
    number: "01",
    title: "Learning Flutter and Dart",
    description: "Learning Flutter and Dart for mobile development.",
    Icon: Code2,
    label: "Mobile development",
  },
  {
    number: "02",
    title: "Exploring Kotlin and Android",
    description: "Exploring Kotlin and Android development.",
    Icon: Smartphone,
    label: "Android",
  },
  {
    number: "03",
    title: "Building WellFly",
    description: "Building WellFly, a flight booking application.",
    Icon: Plane,
    label: "Application project",
  },
  {
    number: "04",
    title: "Developing Student Helper",
    description: "Developing University Student Helper.",
    Icon: NotebookPen,
    label: "Application project",
    related: {
      title: "Learning with the tech community",
      description: "Participating in technology and startup learning activities.",
      Icon: Lightbulb,
      label: "Technology & startups",
    },
  },
];

export function JourneyTimeline() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <div className="journey-timeline relative">
      <svg
        aria-hidden="true"
        className="journey-timeline__path journey-timeline__path--desktop"
        viewBox="0 0 100 1088"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M50 0 C50 65 44 78 50 136 C56 194 56 350 50 408 C44 466 44 622 50 680 C56 738 56 894 50 952 C44 1010 50 1020 50 1088"
          fill="none"
          pathLength={1}
          className="journey-timeline__stroke journey-timeline__stroke--glow"
          initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0.25 }}
          whileInView={{ pathLength: 1, opacity: 0.8 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M50 0 C50 65 44 78 50 136 C56 194 56 350 50 408 C44 466 44 622 50 680 C56 738 56 894 50 952 C44 1010 50 1020 50 1088"
          fill="none"
          pathLength={1}
          className="journey-timeline__stroke journey-timeline__stroke--core"
          initial={shouldReduceMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <svg
        aria-hidden="true"
        className="journey-timeline__path journey-timeline__path--mobile"
        viewBox="0 0 100 1504"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M10 0 C10 90 4 120 10 188 C16 255 16 497 10 564 C4 631 4 873 10 940 C16 1007 16 1249 10 1316 C4 1383 10 1414 10 1504"
          fill="none"
          pathLength={1}
          className="journey-timeline__stroke journey-timeline__stroke--glow"
          initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0.25 }}
          whileInView={{ pathLength: 1, opacity: 0.8 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M10 0 C10 90 4 120 10 188 C16 255 16 497 10 564 C4 631 4 873 10 940 C16 1007 16 1249 10 1316 C4 1383 10 1414 10 1504"
          fill="none"
          pathLength={1}
          className="journey-timeline__stroke journey-timeline__stroke--core"
          initial={shouldReduceMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      <ol className="journey-timeline__list m-0 list-none p-0">
        {journey.map(({ number, title, description, Icon, label, related }, index) => (
          <li key={number} className="journey-timeline__item relative">
            <motion.span
              aria-hidden="true"
              className="journey-timeline__node absolute z-10 flex size-12 items-center justify-center rounded-full border-2 border-orange-300/80 bg-[#14110f] font-mono text-sm font-semibold tracking-wide text-orange-200 shadow-[0_0_24px_rgb(251_146_60_/_22%)] sm:size-[3.25rem]"
              initial={false}
              whileInView={shouldReduceMotion ? undefined : { scale: [0.82, 1], opacity: [0.5, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.45, delay: shouldReduceMotion ? 0 : 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
            >
              {number}
            </motion.span>
            <AnimatedReveal delay={index * 0.08} distance={16} className="journey-timeline__card-wrap">
              <article className="journey-timeline__card group rounded-2xl border p-5 shadow-[0_18px_50px_rgb(0_0_0_/_24%)] transition-[transform,border-color,box-shadow,background-color] duration-300 hover:-translate-y-1 sm:rounded-3xl sm:p-6">
                <div className="flex items-start gap-4">
                  <span className="journey-timeline__icon mt-0.5 inline-flex size-11 shrink-0 items-center justify-center rounded-xl border">
                    <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="journey-timeline__label mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] sm:text-xs">{label}</p>
                    <h4 className="mb-2 text-base font-semibold tracking-tight text-slate-100 sm:text-lg">{title}</h4>
                    <p className="mb-0 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">{description}</p>
                    {related ? (
                      <div className="journey-timeline__related mt-4 border-t pt-4">
                        <div className="flex items-start gap-3">
                          <span className="journey-timeline__icon mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg border">
                            <related.Icon size={15} strokeWidth={1.8} aria-hidden="true" />
                          </span>
                          <div>
                            <p className="journey-timeline__label mb-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em]">{related.label}</p>
                            <h5 className="mb-1 text-sm font-semibold text-slate-200">{related.title}</h5>
                            <p className="mb-0 text-sm leading-6 text-slate-400">{related.description}</p>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            </AnimatedReveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
