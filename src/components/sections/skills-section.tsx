"use client";

import { motion, useReducedMotion } from "motion/react";
import { Code2, Database, Palette, Smartphone, Wrench } from "lucide-react";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechnologyIcon } from "@/components/ui/technology-icons";
import { skillGroups as portfolioSkills } from "@/data/portfolio";

const skillGroupStyles = {
  Mobile: { Icon: Smartphone, color: "text-purple", glow: "group-hover:shadow-purple/10" },
  "Programming Languages": { Icon: Code2, color: "text-purple", glow: "group-hover:shadow-purple/10" },
  Web: { Icon: Code2, color: "text-blue", glow: "group-hover:shadow-blue/10" },
  "Backend & Database": { Icon: Database, color: "text-purple", glow: "group-hover:shadow-purple/10" },
  Tools: { Icon: Wrench, color: "text-blue", glow: "group-hover:shadow-blue/10" },
  Creative: { Icon: Palette, color: "text-purple", glow: "group-hover:shadow-purple/10" },
} as const;

const skillGroups = portfolioSkills.map((group) => ({ ...group, ...skillGroupStyles[group.title] }));

const orbitPositions = [
  { x: 50, y: 5 },
  { x: 93, y: 36 },
  { x: 77, y: 88 },
  { x: 50, y: 96 },
  { x: 23, y: 88 },
  { x: 7, y: 36 },
];

function SkillOrbit() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute right-2 top-0 hidden size-40 lg:block">
      <motion.div
        className="absolute inset-2 rounded-full border border-dashed border-blue/20"
        initial={false}
        animate={shouldReduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border border-purple/15"
        initial={false}
        animate={shouldReduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 62, repeat: Infinity, ease: "linear" }}
      >
        {skillGroups.map(({ Icon, color }, index) => (
          <motion.span
            key={index}
            className={`absolute flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-white/10 bg-surface text-xs shadow-lg ${color}`}
            style={{ left: `${orbitPositions[index].x}%`, top: `${orbitPositions[index].y}%` }}
            initial={false}
            animate={shouldReduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 62, repeat: Infinity, ease: "linear" }}
          >
            <Icon size={15} strokeWidth={1.8} />
          </motion.span>
        ))}
      </motion.div>
      <div className="absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-purple/25 to-blue/20 blur-md" />
      <div className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue shadow-[0_0_18px_5px_rgb(56_189_248_/_40%)]" />
    </div>
  );
}

export function SkillsSection() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative scroll-mt-20 border-y border-white/[0.04] bg-[#0b0d15]/65 py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-1/3 size-96 rounded-full bg-blue/[0.06] blur-[110px]"
      />
      <Container className="relative">
        <div className="relative">
        <AnimatedReveal>
          <SectionHeading
            id="skills-heading"
            eyebrow="What I work with"
            title="Technologies & Tools"
            description="A growing toolkit for building across mobile, web, and creative work."
          />
        </AnimatedReveal>
          <SkillOrbit />
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map(({ title, skills, Icon, color, glow }, index) => (
            <AnimatedReveal key={title} delay={0.08 + index * 0.08} className="h-full" tilt>
              <article className={`group h-full rounded-2xl border border-border/80 bg-surface/60 p-5 shadow-[0_12px_40px_rgb(0_0_0_/_12%)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-purple/40 hover:shadow-xl ${glow} sm:p-6`}>
                <div className="mb-5 flex items-center gap-3">
                  <motion.span
                    className={`inline-flex size-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] transition-[transform,background-color] duration-300 group-hover:bg-white/[0.06] ${color}`}
                    whileHover={shouldReduceMotion ? undefined : { rotate: [0, -8, 8, 0], scale: 1.1 }}
                    transition={{ duration: 0.45 }}
                  >
                    <Icon size={19} strokeWidth={1.8} aria-hidden="true" className="transition-transform duration-300 group-hover:scale-105" />
                  </motion.span>
                  <h3 className="mb-0 text-lg tracking-tight">{title}</h3>
                </div>
                <ul className="m-0 flex list-none flex-wrap gap-2 p-0" aria-label={`${title} skills`}>
                  {skills.map((skill) => (
                    <li
                      key={skill}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/70 px-3 py-1.5 text-sm text-slate-300 transition-colors duration-200 group-hover:border-white/15"
                    >
                      <TechnologyIcon name={skill} className="size-4 shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            </AnimatedReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
