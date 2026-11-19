import type { HTMLAttributes } from "react";

export function GradientText({
  className = "",
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`gradient-shift bg-gradient-to-r from-purple via-[#a78bfa] to-blue bg-clip-text text-transparent ${className}`.trim()}
      {...props}
    />
  );
}
