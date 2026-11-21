"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, PointerEvent as ReactPointerEvent, ReactNode } from "react";

type SharedProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

type ButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: never;
  };

type LinkButtonProps = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
    href: string;
  };

export type ActionButtonProps = ButtonProps | LinkButtonProps;

const baseStyles =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-[transform,background-color,border-color,box-shadow,color] duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary:
    "border border-purple/50 bg-purple text-white shadow-[0_0_28px_rgb(139_92_246_/_20%)] hover:bg-purple/90 hover:shadow-[0_0_36px_rgb(139_92_246_/_32%)]",
  secondary:
    "border border-border bg-surface/80 text-foreground hover:border-purple/60 hover:bg-surface",
  ghost: "border border-transparent bg-transparent text-secondary hover:bg-white/5 hover:text-foreground",
} as const;

export function Button({ variant = "primary", className = "", ...props }: ActionButtonProps) {
  const classes = `${baseStyles} ${variants[variant]} ${className}`.trim();
  const reduceMotion = useReducedMotion() ?? false;
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 260, damping: 20, mass: 0.45 });
  const y = useSpring(pointerY, { stiffness: 260, damping: 20, mass: 0.45 });
  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(Math.max(-5, Math.min(5, (event.clientX - (bounds.left + bounds.width / 2)) * 0.12)));
    pointerY.set(Math.max(-4, Math.min(4, (event.clientY - (bounds.top + bounds.height / 2)) * 0.12)));
  };
  const wrapperClass = className.split(/\s+/).includes("w-full") ? "flex w-full sm:w-auto" : "inline-flex";

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    return (
      <motion.div
        className={wrapperClass}
        style={reduceMotion ? undefined : { x, y, transformPerspective: 700 }}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}
        whileHover={reduceMotion ? undefined : { scale: 1.025, rotateX: 1.5, rotateY: -1.5 }}
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      >
        <Link className={classes} href={href} {...linkProps} />
      </motion.div>
    );
  }

  return (
    <motion.div
      className={wrapperClass}
      style={reduceMotion ? undefined : { x, y, transformPerspective: 700 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}
      whileHover={reduceMotion ? undefined : { scale: 1.025, rotateX: 1.5, rotateY: -1.5 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
    >
      <button className={classes} {...(props as ButtonProps)} />
    </motion.div>
  );
}
