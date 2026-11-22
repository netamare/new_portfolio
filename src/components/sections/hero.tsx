"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { type PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, Code2, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { portfolio } from "@/data/portfolio";
import { cvFileName, cvFilePath } from "@/data/cv";
import { LiveCodeTerminal } from "@/components/sections/live-code-terminal";
import { CodeforcesMark, LeetCodeMark } from "@/components/ui/coding-platform-icons";
import { InstagramMark, TelegramMark } from "@/components/ui/social-icons";

export function Hero() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const roles = ["Computer Science Student", "Software Developer", "Mobile App Developer", "Creative Thinker"];
  const [roleIndex, setRoleIndex] = useState(0);
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
  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = window.setInterval(() => setRoleIndex((index) => (index + 1) % roles.length), 3200);
    return () => window.clearInterval(timer);
  }, [shouldReduceMotion, roles.length]);
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

    return <motion.span {...enter(delay)} className="block">{letters}</motion.span>;
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

      <Container className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <div className="relative z-30 min-w-0 max-w-3xl lg:pr-14">
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
            className="hero-name-heading mb-6 max-w-3xl text-balance text-[clamp(3rem,8vw,3.25rem)] font-extrabold leading-[0.96] lg:mb-7 lg:text-[7rem]"
          >
            {revealName(portfolio.firstName, 0.22)}{" "}
            {revealName(portfolio.lastName, 0.3, Array.from(portfolio.firstName).length)}
          </h1>

          <motion.p
            {...enter(0.34)}
            aria-live="polite"
            className="mb-5 min-h-8 max-w-2xl text-lg font-medium leading-8 text-slate-200 sm:min-h-9 sm:text-xl sm:leading-9"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={roles[roleIndex]}
                className="inline-block bg-gradient-to-r from-purple via-violet-300 to-blue bg-clip-text text-transparent"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: "easeOut" }}
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.p>

          <motion.p
            {...enter(0.44)}
            className="mb-6 max-w-xl text-base leading-7 sm:text-lg sm:leading-8"
          >
            {portfolio.intro}
          </motion.p>

          <motion.div
            {...enter(0.48)}
            className="relative mb-7 inline-flex items-center gap-2.5 rounded-full border border-purple/30 bg-surface/65 px-3.5 py-2 text-xs font-medium text-slate-200 shadow-[0_0_28px_rgb(139_92_246_/_12%)] backdrop-blur-md sm:text-sm"
          >
            <motion.span
              aria-hidden="true"
              className="flex size-7 items-center justify-center rounded-full border border-blue/25 bg-blue/10 text-blue"
              animate={shouldReduceMotion ? undefined : { rotate: [0, -8, 8, 0], scale: [1, 1.04, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Code2 size={15} strokeWidth={1.8} />
            </motion.span>
            <span>Building Digital Experiences</span>
            <motion.span
              aria-hidden="true"
              className="absolute -right-1 -top-1 size-2 rounded-full bg-blue shadow-[0_0_10px_3px_rgb(56_189_248_/_45%)]"
              animate={shouldReduceMotion ? undefined : { y: [0, -3, 0], opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <Sparkles aria-hidden="true" size={13} className="text-purple/80" />
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

          <nav
            aria-label="Social links"
            className="mt-6 flex flex-wrap gap-2 lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 lg:flex-col lg:gap-2.5"
          >
            <a href="https://t.me/net_amare" target="_blank" rel="noopener noreferrer" aria-label="Telegram @net_amare, opens in a new tab" title="Telegram · @net_amare" className="group relative grid size-[2.65rem] shrink-0 place-items-center rounded-xl border border-white/10 bg-surface/65 text-blue shadow-[0_8px_20px_rgb(0_0_0_/_15%)] transition-[transform,border-color,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-blue/45 hover:shadow-[0_10px_24px_rgb(0_0_0_/_22%),0_0_18px_rgb(56_189_248_/_12%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue">
              <TelegramMark size={19} /><span role="tooltip" className="pointer-events-none absolute left-0 top-full z-40 mt-2 hidden w-max max-w-56 rounded-lg border border-border bg-[#08090f]/95 px-2.5 py-1.5 text-[11px] font-medium leading-4 text-foreground shadow-xl group-hover:block group-focus-visible:block lg:left-full lg:top-1/2 lg:ml-2 lg:mt-0 lg:-translate-y-1/2">Telegram · @net_amare</span>
            </a>
            <a href="https://www.instagram.com/net_amare/" target="_blank" rel="noopener noreferrer" aria-label="Instagram @net_amare, opens in a new tab" title="Instagram · @net_amare" className="group relative grid size-[2.65rem] shrink-0 place-items-center rounded-xl border border-white/10 bg-surface/65 text-purple shadow-[0_8px_20px_rgb(0_0_0_/_15%)] transition-[transform,border-color,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-purple/45 hover:shadow-[0_10px_24px_rgb(0_0_0_/_22%),0_0_18px_rgb(139_92_246_/_12%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue">
              <InstagramMark size={19} /><span role="tooltip" className="pointer-events-none absolute left-0 top-full z-40 mt-2 hidden w-max max-w-56 rounded-lg border border-border bg-[#08090f]/95 px-2.5 py-1.5 text-[11px] font-medium leading-4 text-foreground shadow-xl group-hover:block group-focus-visible:block lg:left-full lg:top-1/2 lg:ml-2 lg:mt-0 lg:-translate-y-1/2">Instagram · @net_amare</span>
            </a>
            <a href="tel:+251960236616" aria-label="Call +251 960 236 616" title="Phone · +251 960 236 616" className="group relative grid size-[2.65rem] shrink-0 place-items-center rounded-xl border border-white/10 bg-surface/65 text-blue shadow-[0_8px_20px_rgb(0_0_0_/_15%)] transition-[transform,border-color,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-blue/45 hover:shadow-[0_10px_24px_rgb(0_0_0_/_22%),0_0_18px_rgb(56_189_248_/_12%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue">
              <Phone size={18} strokeWidth={1.8} aria-hidden="true" /><span role="tooltip" className="pointer-events-none absolute left-0 top-full z-40 mt-2 hidden w-max max-w-56 rounded-lg border border-border bg-[#08090f]/95 px-2.5 py-1.5 text-[11px] font-medium leading-4 text-foreground shadow-xl group-hover:block group-focus-visible:block lg:left-full lg:top-1/2 lg:ml-2 lg:mt-0 lg:-translate-y-1/2">Phone · +251 960 236 616</span>
            </a>
            <a href="https://codeforces.com/profile/netsiamre21" target="_blank" rel="noopener noreferrer" aria-label="Codeforces profile, opens in a new tab" title="Codeforces · @netsiamre21" className="group relative grid size-[2.65rem] shrink-0 place-items-center rounded-xl border border-white/10 bg-surface/65 text-blue shadow-[0_8px_20px_rgb(0_0_0_/_15%)] transition-[transform,border-color,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-blue/45 hover:shadow-[0_10px_24px_rgb(0_0_0_/_22%),0_0_18px_rgb(56_189_248_/_12%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue">
              <CodeforcesMark className="size-5" /><span role="tooltip" className="pointer-events-none absolute left-0 top-full z-40 mt-2 hidden w-max max-w-56 rounded-lg border border-border bg-[#08090f]/95 px-2.5 py-1.5 text-[11px] font-medium leading-4 text-foreground shadow-xl group-hover:block group-focus-visible:block lg:left-full lg:top-1/2 lg:ml-2 lg:mt-0 lg:-translate-y-1/2">Codeforces · @netsiamre21</span>
            </a>
            <a href="https://leetcode.com/u/net_amare/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode profile, opens in a new tab" title="LeetCode · @net_amare" className="group relative grid size-[2.65rem] shrink-0 place-items-center rounded-xl border border-white/10 bg-surface/65 text-orange-300 shadow-[0_8px_20px_rgb(0_0_0_/_15%)] transition-[transform,border-color,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-purple/45 hover:shadow-[0_10px_24px_rgb(0_0_0_/_22%),0_0_18px_rgb(139_92_246_/_12%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue">
              <LeetCodeMark className="size-5" /><span role="tooltip" className="pointer-events-none absolute left-auto right-0 top-full z-40 mt-2 hidden w-max max-w-56 rounded-lg border border-border bg-[#08090f]/95 px-2.5 py-1.5 text-[11px] font-medium leading-4 text-foreground shadow-xl group-hover:block group-focus-visible:block lg:left-full lg:right-auto lg:top-1/2 lg:ml-2 lg:mt-0 lg:-translate-y-1/2">LeetCode · @net_amare</span>
            </a>
          </nav>
        </div>

        <div className="relative mx-auto flex min-w-0 w-full max-w-[42rem] flex-col items-center justify-center lg:max-w-none">
        <div className="relative flex h-[min(98vw,40rem)] w-full items-center justify-center sm:h-[42rem] lg:h-[44rem]">
          <motion.div
            className="profile-photo-blend relative z-20 aspect-square w-full max-w-[18rem] rounded-full border border-purple/30 bg-surface/70 p-2 shadow-[0_0_44px_rgb(139_92_246_/_18%),0_0_70px_rgb(56_189_248_/_12%)] sm:max-w-[26rem] lg:max-w-[31.25rem] [transform-style:preserve-3d]"
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
            <div className="relative z-10 size-full overflow-hidden rounded-full">
              <motion.div
                className="relative size-full overflow-hidden rounded-full"
                animate={shouldReduceMotion ? undefined : { y: [0, -5, 0], scale: [1, 1.015, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/images/net.png"
                  alt={portfolio.name}
                  width={1672}
                  height={1064}
                  priority
                  unoptimized
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 80vw, 512px"
                  className="size-full rounded-full object-cover"
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
        aria-label="Scroll to explore"
        className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full px-3 py-2 text-xs text-secondary transition-colors hover:text-foreground"
        initial={false}
        animate={shouldReduceMotion ? undefined : { opacity: [0.7, 1], y: [6, 0] }}
        transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
        whileHover={shouldReduceMotion ? undefined : { y: -2 }}
      >
        <span className="projects-scroll-icon" aria-hidden="true"><ArrowDown size={14} /></span>
        <span className="hidden sm:inline">Scroll to explore</span>
      </motion.a>
    </section>
  );
}
