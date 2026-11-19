import type { HTMLAttributes } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "section" | "main" | "header" | "footer";
};

export function Container({
  as: Element = "div",
  className = "",
  ...props
}: ContainerProps) {
  return (
    <Element
      className={`mx-auto w-full max-w-[var(--content-width)] px-5 sm:px-8 lg:px-10 ${className}`.trim()}
      {...props}
    />
  );
}
