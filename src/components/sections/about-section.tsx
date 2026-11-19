import { Lightbulb, RefreshCw, WandSparkles } from "lucide-react";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const highlights = [
  {
    title: "Problem Solver",
    description: "I enjoy breaking down challenges and finding useful, thoughtful solutions.",
    Icon: Lightbulb,
    accent: "text-blue",
    iconSurface: "bg-blue/10",
  },
  {
    title: "Continuous Learner",
    description: "I stay curious, explore new tools, and keep growing through each project.",
    Icon: RefreshCw,
    accent: "text-purple",
    iconSurface: "bg-purple/10",
  },
  {
    title: "Creative Developer",
    description: "I care about turning clear ideas into engaging, easy-to-use experiences.",
    Icon: WandSparkles,
    accent: "text-blue",
    iconSurface: "bg-blue/10",
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative scroll-mt-20 overflow-hidden py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 size-80 rounded-full bg-purple/[0.07] blur-[100px]"
      />
      <Container className="relative">
        <AnimatedReveal>
          <SectionHeading
            id="about-heading"
            eyebrow="A bit about me"
            title="A Little About Me"
          />
        </AnimatedReveal>

        <AnimatedReveal delay={0.08} className="mt-7 max-w-3xl">
          <p className="mb-0 text-lg leading-8 text-secondary sm:text-xl sm:leading-9">
            I&apos;m Netsanet Amare, a Computer Science student at Arsi University interested in
            mobile and web development. I enjoy building useful applications, solving problems,
            learning new technologies, and creating clean user interfaces.
          </p>
        </AnimatedReveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">
          {highlights.map(({ title, description, Icon, accent, iconSurface }, index) => (
            <AnimatedReveal key={title} delay={0.12 + index * 0.1} className="h-full">
              <article className="group h-full rounded-2xl border border-border/80 bg-surface/55 p-6 backdrop-blur-sm transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-purple/40 hover:bg-surface/80 hover:shadow-[0_18px_50px_rgb(0_0_0_/_22%)] sm:p-7">
                <div className={`mb-6 inline-flex size-12 items-center justify-center rounded-xl ${iconSurface} ${accent} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-xl">{title}</h3>
                <p className="mb-0 leading-7">{description}</p>
              </article>
            </AnimatedReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
