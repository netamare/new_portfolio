"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";

export function Hero() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const heroRef = useRef<HTMLElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 170, damping: 22, mass: 0.65 });
  const springY = useSpring(pointerY, { stiffness: 170, damping: 22, mass: 0.65 });
  const rotateX = useTransform(springY, [-1, 1], [7, -7]);
  const rotateY = useTransform(springX, [-1, 1], [-8, 8]);
  const glowX = useTransform(springX, [-1, 1], [-14, 14]);
  const glowY = useTransform(springY, [-1, 1], [-12, 12]);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 24]);
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

  return (
    <section
      ref={heroRef}
      id="home"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] scroll-mt-20 items-center overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-40 top-[15%] size-72 rounded-full bg-purple/10 blur-[110px] sm:size-[28rem]"
          animate={shouldReduceMotion ? undefined : { x: [0, 34, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-40 bottom-[5%] size-80 rounded-full bg-blue/10 blur-[120px] sm:size-[32rem]"
          animate={shouldReduceMotion ? undefined : { x: [0, -25, 0], y: [0, 24, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="relative z-10 max-w-3xl">
          <motion.div {...enter(0.12)} className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-purple to-blue" />
            <span className="font-mono text-xs font-semibold tracking-[0.25em] text-blue sm:text-sm">
              HELLO, I&apos;M
            </span>
          </motion.div>

          <h1
            id="hero-title"
            className="mb-5 max-w-3xl text-balance text-[clamp(3.25rem,10vw,6.75rem)] leading-[0.98]"
          >
            <motion.span {...enter(0.22)} className="inline-block">Netsanet</motion.span>{" "}
            <motion.span {...enter(0.3)} className="inline-block"><GradientText>Amare</GradientText></motion.span>
          </h1>

          <motion.p
            {...enter(0.34)}
            className="mb-5 max-w-2xl text-lg font-medium leading-8 text-slate-200 sm:text-xl sm:leading-9"
          >
            Computer Science Student <span className="text-purple">|</span> Developer{" "}
            <span className="text-purple">|</span> Creative Thinker
          </motion.p>

          <motion.p
            {...enter(0.44)}
            className="mb-8 max-w-xl text-base leading-7 sm:text-lg sm:leading-8"
          >
            I enjoy building digital experiences, solving problems, and turning ideas into
            functional applications. I&apos;m currently exploring mobile and web development.
          </motion.p>

          <motion.div {...enter(0.54)} className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="#projects" className="w-full sm:w-auto">
              Explore My Work <ArrowRight size={17} aria-hidden="true" />
            </Button>
            <Button href="#contact" variant="secondary" className="w-full sm:w-auto">
              Let&apos;s Connect <ArrowRight size={17} aria-hidden="true" />
            </Button>
          </motion.div>

          <motion.div {...enter(0.64)} className="inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-surface/65 px-3.5 py-2 backdrop-blur-md">
            <span className="relative flex size-2.5" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/50 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-medium tracking-wide text-slate-300 sm:text-sm">
              Available for opportunities
            </span>
          </motion.div>
        </div>

        <div className="relative mx-auto flex min-h-[24rem] w-full max-w-[28rem] items-center justify-center sm:min-h-[30rem] lg:min-h-0 lg:max-w-none">
          <motion.div
            aria-hidden="true"
            className="absolute h-[68%] w-[72%] rounded-full bg-gradient-to-br from-purple/35 via-purple/15 to-blue/30 blur-[4rem]"
            animate={shouldReduceMotion ? undefined : { scale: [0.96, 1.04, 0.96], opacity: [0.65, 0.9, 0.65] }}
            style={shouldReduceMotion ? undefined : { x: glowX, y: glowY }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="relative z-10 w-[min(72%,22rem)] overflow-hidden rounded-[2rem] border border-white/15 bg-surface/70 shadow-[0_24px_80px_rgb(0_0_0_/_45%),0_0_50px_rgb(139_92_246_/_18%)] [transform-style:preserve-3d]"
            initial={false}
            onPointerMove={handlePhotoPointerMove}
            onPointerLeave={resetPhotoPointer}
            animate={{
              opacity: shouldReduceMotion ? 1 : [0.88, 1],
              clipPath: shouldReduceMotion
                ? "inset(0 0 0% 0 round 2rem)"
                : ["inset(0 0 9% 0 round 2rem)", "inset(0 0 0% 0 round 2rem)"],
            }}
            style={shouldReduceMotion ? undefined : { rotateX, rotateY, y: scrollY }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.8,
              delay: shouldReduceMotion ? 0 : 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              className="aspect-[956/1320]"
              animate={shouldReduceMotion ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/net.jpg"
                alt="Netsanet Amare"
                width={956}
                height={1320}
                quality={100}
                unoptimized
                className="h-full w-full object-contain"
              />
            </motion.div>
          </motion.div>
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
