"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { portfolio } from "@/data/portfolio";
import { cvFileName, cvFilePath } from "@/data/cv";
import { LiveCodeTerminal } from "@/components/sections/live-code-terminal";
import { CodeforcesMark, LeetCodeMark } from "@/components/ui/coding-platform-icons";

export function Hero() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 170, damping: 22, mass: 0.65 });
  const springY = useSpring(pointerY, { stiffness: 170, damping: 22, mass: 0.65 });
  const rotateX = useTransform(springY, [-1, 1], [7, -7]);
  const rotateY = useTransform(springX, [-1, 1], [-8, 8]);
  const handlePhotoPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1);
    pointerY.set(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
  };
  const resetPhotoPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };
  const enter = (delay: number) =>
    ({
      initial: false as const,
      animate: {
        opacity: shouldReduceMotion ? 1 : [0.88, 1],
        y: shouldReduceMotion ? 0 : [12, 0],
      },
      transition: {
        duration: shouldReduceMotion ? 0 : 0.7,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    });
  const revealName = (value: string, delay: number, letterOffset = 0) => {
    const letters = Array.from(value).map((letter, index) => (
      <span key={`${letter}-${index}`} className="hero-name-letter inline-block overflow-hidden align-bottom pb-[0.04em]">
        <motion.span
          className="hero-name-letter__reveal inline-block"
          initial={shouldReduceMotion ? false : { y: "120%", opacity: 0, filter: "blur(8px)", scale: 0.94 }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.82, delay: shouldReduceMotion ? 0 : delay + index * 0.045, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero-name-letter__glyph" style={{ animationDelay: `${(letterOffset + index) * -0.13}s` }}>
            {letter}
          </span>
        </motion.span>
      </span>
    ));

    return <motion.span {...enter(delay)} className="inline-block">{letters}</motion.span>;
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] scroll-mt-20 items-center overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-40 top-[15%] size-72 rounded-full bg-purple/10 blur-[110px] sm:size-[28rem]"
          animate={shouldReduceMotion ? undefined : { x: [0, 34, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-40 bottom-[5%] size-80 rounded-full bg-blue/10 blur-[120px] sm:size-[32rem]"
          animate={shouldReduceMotion ? undefined : { x: [0, -25, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <Container className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="relative z-30 min-w-0 max-w-3xl">
          <motion.div {...enter(0.12)} className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-purple to-blue" />
            <span className="font-mono text-xs font-semibold tracking-[0.25em] text-blue sm:text-sm">
              HELLO, I&apos;M
            </span>
          </motion.div>

          <h1
            id="hero-title"
            aria-label={portfolio.name}
            data-name={portfolio.name}
            className="hero-name-heading mb-5 max-w-3xl text-balance text-[clamp(3.25rem,10vw,6.75rem)] leading-[0.98]"
          >
            {revealName(portfolio.firstName, 0.22)}{" "}
            {revealName(portfolio.lastName, 0.3, Array.from(portfolio.firstName).length)}
          </h1>

          <motion.p
            {...enter(0.34)}
            className="mb-5 max-w-2xl text-lg font-medium leading-8 text-slate-200 sm:text-xl sm:leading-9"
          >
            {portfolio.role}
          </motion.p>

          <motion.p
            {...enter(0.44)}
            className="mb-6 max-w-xl text-base leading-7 sm:text-lg sm:leading-8"
          >
            {portfolio.intro}
          </motion.p>

          <motion.div {...enter(0.5)} className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <motion.a
              href={portfolio.socials.leetcode.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode profile, opens in a new tab"
              className="group relative inline-flex min-h-[4.25rem] w-full items-center gap-3 overflow-hidden rounded-2xl border border-purple/30 bg-surface/75 px-4 py-3 shadow-[0_12px_34px_rgb(0_0_0_/_18%)] backdrop-blur-md transition-[border-color,box-shadow,background-color] duration-300 hover:border-purple/65 hover:bg-surface hover:shadow-[0_16px_42px_rgb(139_92_246_/_18%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue sm:w-[14rem]"
              style={{ transformPerspective: 700 }}
              whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.02, rotateX: 1.8, rotateY: -1.2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
            >
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-purple/10 via-transparent to-blue/10 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <LeetCodeMark className="size-7" />
              </span>
              <span className="relative min-w-0 flex-1 text-left">
                <span className="block text-sm font-semibold leading-5 text-foreground">LeetCode</span>
                <span className="block truncate font-mono text-[11px] leading-5 text-secondary">@{portfolio.socials.leetcode.username}</span>
              </span>
              <ArrowUpRight className="relative size-4 shrink-0 text-blue transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </motion.a>
            <motion.a
              href={portfolio.socials.codeforces.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Codeforces profile, opens in a new tab"
              className="group relative inline-flex min-h-[4.25rem] w-full items-center gap-3 overflow-hidden rounded-2xl border border-blue/30 bg-surface/75 px-4 py-3 shadow-[0_12px_34px_rgb(0_0_0_/_18%)] backdrop-blur-md transition-[border-color,box-shadow,background-color] duration-300 hover:border-blue/65 hover:bg-surface hover:shadow-[0_16px_42px_rgb(56_189_248_/_16%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue sm:w-[14rem]"
              style={{ transformPerspective: 700 }}
              whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.02, rotateX: 1.8, rotateY: 1.2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
            >
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-blue/10 via-transparent to-purple/10 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                <CodeforcesMark className="size-7" />
              </span>
              <span className="relative min-w-0 flex-1 text-left">
                <span className="block text-sm font-semibold leading-5 text-foreground">Codeforces</span>
                <span className="block truncate font-mono text-[11px] leading-5 text-secondary">@{portfolio.socials.codeforces.username}</span>
              </span>
              <ArrowUpRight className="relative size-4 shrink-0 text-purple transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </motion.a>
          </motion.div>

          <motion.div {...enter(0.58)} className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button href="#projects" className="w-full sm:w-auto">
              Explore My Work <ArrowRight size={17} aria-hidden="true" />
            </Button>
            <Button href="#contact" variant="secondary" className="w-full sm:w-auto">
              Let&apos;s Connect <ArrowRight size={17} aria-hidden="true" />
            </Button>
            <a
              href={cvFilePath}
              download={cvFileName}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-blue/30 bg-blue/10 px-5 py-2.5 text-sm font-semibold text-foreground shadow-[0_0_24px_rgb(56_189_248_/_8%)] transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-blue/60 hover:bg-blue/15 hover:shadow-[0_0_30px_rgb(56_189_248_/_18%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue sm:w-auto"
            >
              <ArrowDown size={16} aria-hidden="true" /> Download CV
            </a>
          </motion.div>

          <motion.div {...enter(0.64)} className="inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-surface/65 px-3.5 py-2 backdrop-blur-md">
            <span className="relative flex size-2.5" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/50 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-medium tracking-wide text-slate-300 sm:text-sm">
              Computer Science student at Arsi University
            </span>
          </motion.div>
        </div>

        <div className="relative mx-auto flex min-w-0 w-full max-w-[28rem] flex-col items-center justify-center lg:max-w-none">
        <div className="relative flex h-[min(88vw,30rem)] w-full items-center justify-center sm:h-[31rem] lg:h-[31rem]">
          <motion.div
            className="profile-orbit-frame relative z-20 aspect-square w-[min(86%,24rem)] rounded-full p-[3px] [transform-style:preserve-3d]"
            initial={false}
            onPointerMove={handlePhotoPointerMove}
            onPointerLeave={resetPhotoPointer}
            animate={{
              opacity: shouldReduceMotion ? 1 : [0.88, 1],
              y: shouldReduceMotion ? 0 : [0, -8, 0, 7, 0],
            }}
            style={shouldReduceMotion ? undefined : { rotateX, rotateY }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.8,
              delay: shouldReduceMotion ? 0 : 0.5,
              ease: [0.22, 1, 0.36, 1],
              y: { duration: shouldReduceMotion ? 0 : 8, repeat: shouldReduceMotion ? 0 : Infinity, ease: "easeInOut" },
            }}
          >
            <div className="relative z-10 size-full overflow-hidden rounded-full border border-white/15 bg-surface">
              <motion.div
                className="size-full"
                animate={shouldReduceMotion ? undefined : { y: [0, -5, 0], scale: [1, 1.015, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src={portfolio.photo}
                  alt={portfolio.name}
                  width={956}
                  height={1320}
                  priority
                  sizes="(max-width: 1024px) 78vw, 384px"
                  className="h-full w-full object-cover object-top"
                />
              </motion.div>
            </div>
          </motion.div>
         </div>
          <LiveCodeTerminal />
        </div>
      </Container>

      <motion.a
        href="#about"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full px-3 py-2 text-xs text-secondary transition-colors hover:text-foreground sm:flex"
        initial={false}
        animate={shouldReduceMotion ? undefined : { opacity: [0.7, 1], y: [6, 0] }}
        transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
        whileHover={shouldReduceMotion ? undefined : { y: -2 }}
      >
        Scroll to explore <ArrowDown size={14} aria-hidden="true" />
      </motion.a>
    </section>
  );
}
