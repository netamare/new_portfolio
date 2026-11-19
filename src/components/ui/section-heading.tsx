import type { HTMLAttributes, ReactNode } from "react";

type SectionHeadingProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
  ...props
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={`max-w-2xl ${centered ? "mx-auto text-center" : "text-left"} ${className}`.trim()}
      {...props}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-blue sm:text-sm">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mb-4 text-balance">{title}</h2>
      {description ? (
        <p className="mb-0 max-w-xl text-base leading-7 sm:text-lg sm:leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
}
