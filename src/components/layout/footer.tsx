import { Mail, MoveUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GithubMark, LinkedInMark } from "@/components/ui/social-icons";

const socials = [
  { label: "GitHub", href: "https://github.com/netamare", Icon: GithubMark },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/netsanet-amare-599a11381",
    Icon: LinkedInMark,
  },
  { label: "Email", href: "mailto:nestiamare64@gmail.com", Icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#080a11]/80 py-7">
      <Container className="flex flex-col items-center justify-between gap-5 sm:flex-row">
        <a href="#home" className="font-mono text-sm font-bold tracking-[0.14em] text-foreground">
          NETSANET<span className="text-purple">.</span>
        </a>
        <p className="mb-0 text-center text-xs text-secondary sm:text-sm">
          Netsanet Amare · Built with care.
        </p>
        <nav aria-label="Social links" className="flex items-center gap-2">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={label === "Email" ? undefined : "_blank"}
              rel={label === "Email" ? undefined : "noreferrer"}
              aria-label={label}
              className="group inline-flex size-10 items-center justify-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] text-secondary transition-[transform,border-color,color,background-color] duration-200 hover:-translate-y-0.5 hover:border-purple/40 hover:bg-purple/10 hover:text-foreground"
            >
              <Icon size={17} aria-hidden="true" />
              <MoveUpRight size={10} aria-hidden="true" className="-ml-1 opacity-0 transition-opacity group-hover:opacity-70" />
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
