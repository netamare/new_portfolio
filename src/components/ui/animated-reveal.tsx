"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";

type AnimatedRevealProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  delay?: number;
  distance?: number;
  once?: boolean;
  tilt?: boolean;
};

type TiltRevealProps = Omit<AnimatedRevealProps, "tilt">;

function TiltReveal({
  children,
  delay = 0,
  distance = 18,
  once = true,
  className,
  style,
  ...props
}: TiltRevealProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 180, damping: 24, mass: 0.55 });
  const springY = useSpring(pointerY, { stiffness: 180, damping: 24, mass: 0.55 });
  const rotateX = useTransform(springY, [-1, 1], [3, -3]);
  const rotateY = useTransform(springX, [-1, 1], [-3, 3]);
  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1);
    pointerY.set(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
  };

  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={shouldReduceMotion ? undefined : { opacity: [0.88, 1], y: [distance, 0] }}
      whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.01 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      style={shouldReduceMotion ? style : { ...style, transformPerspective: 900, rotateX, rotateY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedReveal({
  children,
  delay = 0,
  distance = 18,
  once = true,
  tilt = false,
  className = "",
  style,
  ...props
}: AnimatedRevealProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  if (tilt) {
    return (
      <TiltReveal delay={delay} distance={distance} once={once} className={className} style={style} {...props}>
        {children}
      </TiltReveal>
    );
  }

  return (
    <motion.div
      className={className}
      // Keep the server render and first client render visible and identical.
      // A missed viewport callback can then only skip the optional movement.
      initial={false}
      whileInView={shouldReduceMotion ? undefined : { opacity: [0.88, 1], y: [distance, 0] }}
      whileHover={undefined}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}
