import { ArrowUpRight, Code2 } from "lucide-react";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

function CodeforcesMark() {
  return (
    <svg viewBox="0 0 48 48" className="size-8" fill="none" aria-hidden="true">
      <path d="M8 20h7v19H8z" fill="#38BDF8" />
      <path d="M20 9h8v30h-8z" fill="#8B5CF6" />
      <path d="M33 16h7v23h-7z" fill="#F97316" />
      <path d="M5 39h38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LeetCodeMark() {
  return (
    <svg viewBox="0 0 48 48" className="size-8" fill="none" aria-hidden="true">
      <path d="M20 7c-7 5-11 12-11 19 0 8 5 14 13 16 4 1 8 0 11-2" stroke="#FFA116" strokeWidth="4" strokeLinecap="round" />
      <path d="M19 14 30 4M17 34l12 10" stroke="#B3B3B3" strokeWidth="4" strokeLinecap="round" />
      <path d="M22 25h19" stroke="#FFA116" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

const profiles = [
  {
    name: "Codeforces",
    username: "netsiamre21",
    url: "https://codeforces.com/profile/netsiamre21",
    description: "Contests, algorithms, and problem solving.",
    Mark: CodeforcesMark,
    accent: "text-blue",
    glow: "hover:border-blue/45 hover:shadow-[0_24px_65px_rgb(56_189_248_/_12%),0_0_32px_rgb(56_189_248_/_10%)]",
  },
  {
    name: "LeetCode",
    username: "net_amare",
    url: "https://leetcode.com/u/net_amare/",
    description: "Practice and sharpen coding interview skills.",
    Mark: LeetCodeMark,
    accent: "text-orange-300",
    glow: "hover:border-orange-300/40 hover:shadow-[0_24px_65px_rgb(251_146_60_/_10%),0_0_32px_rgb(251_146_60_/_8%)]",
  },
];

export function CodingProfilesSection() {
  return (
    <section id="coding-profiles" aria-labelledby="coding-profiles-heading" className="relative scroll-mt-20 py-24 sm:py-32">
      <Container className="relative">
        <AnimatedReveal>
          <SectionHeading
            id="coding-profiles-heading"
            eyebrow="Find me online"
            title="Coding Profiles"
            description="Follow my competitive programming and problem-solving journey."
          />
        </AnimatedReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {profiles.map(({ name, username, url, description, Mark, accent, glow }, index) => (
            <AnimatedReveal key={name} delay={0.08 + index * 0.12} className="h-full" tilt>
              <article className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-surface/65 p-6 shadow-[0_16px_50px_rgb(0_0_0_/_14%)] transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-2 sm:p-8 ${glow}`}>
                <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-16 size-48 rounded-full bg-gradient-to-br from-purple/10 to-blue/10 blur-3xl transition-opacity duration-500 group-hover:opacity-150" />
                <div className="relative flex items-start justify-between gap-4">
                  <span className={`flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.035] ${accent}`}>
                    <Mark />
                  </span>
                  <span className="flex size-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-secondary transition-colors group-hover:border-purple/30 group-hover:text-foreground">
                    <Code2 size={16} aria-hidden="true" />
                  </span>
                </div>
                <div className="relative mt-7">
                  <h3 className="mb-2 text-xl transition-colors group-hover:text-white">{name}</h3>
                  <p className="mb-2 font-mono text-sm text-blue">@{username}</p>
                  <p className="mb-0 text-sm leading-6">{description}</p>
                </div>
                <a href={url} target="_blank" rel="noopener noreferrer" className="relative mt-7 inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-gradient-to-r from-purple to-blue px-5 text-sm font-semibold text-white shadow-[0_0_24px_rgb(139_92_246_/_18%)] transition-[transform,box-shadow] duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgb(139_92_246_/_32%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue">
                  Visit profile <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </article>
            </AnimatedReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
