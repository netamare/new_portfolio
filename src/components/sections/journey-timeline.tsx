"use client";

import { motion, useReducedMotion } from "motion/react";
import { Code2, Lightbulb, NotebookPen, Plane, Smartphone } from "lucide-react";
import { AnimatedReveal } from "@/components/ui/animated-reveal";

const journey = [
  { title: "Learning Flutter and Dart", description: "Learning Flutter and Dart for mobile development.", Icon: Code2, accent: "text-blue", label: "Mobile development" },
  { title: "Exploring Kotlin and Android", description: "Exploring Kotlin and Android development.", Icon: Smartphone, accent: "text-purple", label: "Android" },
  { title: "Building WellFly", description: "Building WellFly, a flight booking application.", Icon: Plane, accent: "text-blue", label: "Application project" },
  { title: "Developing Student Helper", description: "Developing University Student Helper.", Icon: NotebookPen, accent: "text-purple", label: "Application project" },
  { title: "Learning with the tech community", description: "Participating in technology and startup learning activities.", Icon: Lightbulb, accent: "text-blue", label: "Technology & startups" },
];

export function JourneyTimeline() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <div className="journey-timeline relative">
      <div aria-hidden="true" className="journey-timeline__spine" />
      <ol className="m-0 list-none space-y-5 p-0">
        {journey.map(({ title, description, Icon, accent, label }, index) => (
          <li key={title} className="journey-timeline__item relative">
            <motion.span
              aria-hidden="true"
              className="journey-timeline__node absolute z-10 flex size-[1.125rem] items-center justify-center rounded-full border border-purple/50 bg-background shadow-[0_0_22px_rgb(139_92_246_/_48%)]"
              initial={false}
              whileInView={shouldReduceMotion ? undefined : { scale: [0.75, 1], opacity: [0.3, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.42, delay: shouldReduceMotion ? 0 : 0.09 * index, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="size-1.5 rounded-full bg-blue shadow-[0_0_10px_rgb(56_189_248_/_90%)]" />
            </motion.span>
            <AnimatedReveal delay={index * 0.09} distance={14}>
              <article className="group rounded-2xl border border-border/80 bg-surface/55 p-5 backdrop-blur-sm transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-purple/40 hover:bg-surface/80 hover:shadow-[0_16px_44px_rgb(0_0_0_/_22%)] sm:p-6">
                <div className="flex items-start gap-4">
                  <span className={`mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] ${accent}`}>
                    <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-secondary sm:text-xs">{label}</p>
                    <h4 className="mb-2 text-base font-semibold tracking-tight sm:text-lg">{title}</h4>
                    <p className="mb-0 text-sm leading-6 sm:text-base sm:leading-7">{description}</p>
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
