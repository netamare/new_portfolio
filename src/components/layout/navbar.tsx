"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const shouldReduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const sections = links
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.15, 0.35, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-background/75 shadow-[0_8px_32px_rgb(0_0_0_/_12%)] backdrop-blur-xl"
      initial={false}
      animate={{ y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <Container className="flex h-[4.5rem] items-center justify-between gap-5">
        <a
          href="#home"
          onClick={closeMenu}
          className="group inline-flex items-center gap-2.5 rounded-sm font-mono text-sm font-bold tracking-[0.16em] text-foreground sm:text-base"
          aria-label="Netsanet Amare, home"
        >
          <span className="flex size-8 items-center justify-center rounded-lg border border-purple/40 bg-purple/10 text-sm text-purple transition-colors group-hover:bg-purple/20">
            N
          </span>
          NETSANET<span className="text-purple">.</span>
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={activeHref === link.href ? "location" : undefined}
              className={`main-nav-link relative rounded-full px-3.5 py-2 text-sm transition-colors hover:text-foreground focus-visible:text-foreground ${activeHref === link.href ? "text-foreground" : "text-secondary"}`}
            >
              {link.label}
              {activeHref === link.href ? (
                <motion.span
                  layoutId="active-navigation-indicator"
                  aria-hidden="true"
                  className="absolute inset-x-3 bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-purple to-blue"
                  transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: "easeOut" }}
                />
              ) : null}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="#contact" variant="secondary" className="min-h-10 px-4 py-2">
            Let&apos;s Talk
            <span aria-hidden="true" className="text-blue">↗</span>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface/70 text-foreground transition-colors hover:border-purple/50 hover:bg-surface lg:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
      </Container>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="absolute inset-x-0 top-full border-b border-border bg-[#0b0d16]/95 px-5 pb-5 pt-2 shadow-2xl backdrop-blur-2xl lg:hidden"
            initial={shouldReduceMotion ? false : { y: -8 }}
            animate={{ y: 0 }}
            exit={shouldReduceMotion ? undefined : { y: -8 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
          >
            <div className="mx-auto flex max-w-[var(--content-width)] flex-col">
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={activeHref === link.href ? "location" : undefined}
                  className={`rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-white/5 hover:text-foreground ${activeHref === link.href ? "bg-purple/10 text-foreground" : "text-secondary"}`}
                  initial={shouldReduceMotion ? false : { x: -6 }}
                  animate={{ x: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.18, delay: shouldReduceMotion ? 0 : index * 0.035 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <Button
                href="#contact"
                onClick={closeMenu}
                className="mt-3 w-full"
              >
                Let&apos;s Talk <span aria-hidden="true">↗</span>
              </Button>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
