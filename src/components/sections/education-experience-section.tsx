import { GraduationCap } from "lucide-react";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { JourneyTimeline } from "@/components/sections/journey-timeline";

export function EducationExperienceSection() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="relative scroll-mt-20 overflow-hidden border-y border-white/[0.04] bg-[#0b0d15]/65 py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-44 top-16 size-96 rounded-full bg-purple/[0.06] blur-[110px]"
      />
      <Container className="relative">
        <AnimatedReveal>
          <SectionHeading
            id="education-heading"
            eyebrow="Learning and growth"
            title="Education & Experience"
            description="My studies and the projects shaping my development journey."
          />
        </AnimatedReveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
          <div>
            <AnimatedReveal>
              <h3 className="mb-5 text-xl">Education</h3>
            </AnimatedReveal>
            <AnimatedReveal delay={0.08}>
              <article className="relative overflow-hidden rounded-2xl border border-purple/20 bg-gradient-to-br from-surface/90 to-surface/50 p-6 shadow-[0_18px_55px_rgb(0_0_0_/_20%)] sm:p-7">
                <div
                  aria-hidden="true"
                  className="absolute -right-12 -top-12 size-40 rounded-full bg-purple/10 blur-3xl"
                />
                <div className="relative">
                  <span className="mb-6 inline-flex size-12 items-center justify-center rounded-xl border border-purple/25 bg-purple/10 text-purple">
                    <GraduationCap size={23} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <p className="mb-2 text-sm font-medium text-blue">Arsi University</p>
                  <h4 className="mb-5 text-2xl">Computer Science</h4>
                  <span className="inline-flex items-center gap-2 rounded-full border border-blue/20 bg-blue/10 px-3 py-1.5 text-sm font-medium text-slate-200">
                    <span className="size-1.5 rounded-full bg-blue" aria-hidden="true" />
                    Third-year student
                  </span>
                </div>
              </article>
            </AnimatedReveal>
          </div>

          <div>
            <AnimatedReveal>
              <h3 className="mb-5 text-xl">Development Journey</h3>
            </AnimatedReveal>
            <JourneyTimeline />
          </div>
        </div>
      </Container>
    </section>
  );
}
