import { ArrowUpRight, Mail } from "lucide-react";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/sections/contact-form";
import { GithubMark, LinkedInMark } from "@/components/ui/social-icons";
import { portfolio } from "@/data/portfolio";
import { Code2 } from "lucide-react";

const socialLinks = [
  {
    label: "GitHub",
    value: "github.com/netamare",
    href: portfolio.socials.github.url,
    Icon: GithubMark,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/netsanet-amare-599a11381",
    href: portfolio.socials.linkedin.url,
    Icon: LinkedInMark,
  },
  {
    label: "Email",
    value: "nestiamare64@gmail.com",
    href: `mailto:${portfolio.email}`,
    Icon: Mail,
  },
  { label: "Codeforces", value: `@${portfolio.socials.codeforces.username}`, href: portfolio.socials.codeforces.url, Icon: Code2 },
  { label: "LeetCode", value: `@${portfolio.socials.leetcode.username}`, href: portfolio.socials.leetcode.url, Icon: Code2 },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/[0.05] py-24 sm:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 size-96 rounded-full bg-purple/[0.09] blur-[120px]" />
        <div className="absolute -right-40 bottom-0 size-96 rounded-full bg-blue/[0.07] blur-[120px]" />
      </div>

      <Container className="relative">
        <AnimatedReveal>
          <SectionHeading
            id="contact-heading"
            eyebrow="Get in touch"
            title="Let's Work Together"
            description="Have a project idea, opportunity, or just want to connect? I'd love to hear from you."
          />
        </AnimatedReveal>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:gap-8">
          <AnimatedReveal delay={0.08}>
            <div className="rounded-2xl border border-border/80 bg-surface/65 p-5 shadow-[0_22px_70px_rgb(0_0_0_/_22%)] backdrop-blur-md sm:p-8">
              <ContactForm />
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={0.16}>
            <aside className="rounded-2xl border border-white/[0.07] bg-[#0d111c]/75 p-6 backdrop-blur-md sm:p-7">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue">
                Other ways to connect
              </p>
              <h3 className="mb-6 text-xl">Find me online</h3>
              <ul className="m-0 list-none space-y-3 p-0">
                {socialLinks.map(({ label, value, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={label === "Email" ? undefined : "_blank"}
                      rel={label === "Email" ? undefined : "noopener noreferrer"}
                      aria-label={`${label}: ${value}`}
                      className="group flex items-center gap-3 rounded-xl border border-border/70 bg-background/45 p-3 transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-purple/40 hover:bg-background/75"
                    >
                      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-purple transition-colors group-hover:border-purple/20 group-hover:bg-purple/10">
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-foreground">{label}</span>
                        <span className="block truncate text-xs text-secondary">{value}</span>
                      </span>
                      <ArrowUpRight size={15} className="shrink-0 text-secondary transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </AnimatedReveal>
        </div>
      </Container>
    </section>
  );
}
