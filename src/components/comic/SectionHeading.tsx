import type { ReactNode } from "react";

interface SectionHeadingProps {
  kicker?: string;
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  underline?: boolean;
  className?: string;
}

export function SectionHeading({
  kicker,
  children,
  as: Tag = "h2",
  align = "center",
  underline = true,
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const sizeClass =
    Tag === "h1"
      ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
      : Tag === "h2"
      ? "text-3xl sm:text-4xl md:text-5xl"
      : "text-2xl sm:text-3xl";

  return (
    <div className={`${alignClass} ${className}`}>
      {kicker && (
        <div
          className="mb-2 font-marker text-base md:text-lg text-sr-red"
          style={{ transform: "rotate(-1.5deg)" }}
        >
          {kicker}
        </div>
      )}
      <Tag className={`text-sr-black ${sizeClass}`}>{children}</Tag>
      {underline && (
        <svg
          aria-hidden="true"
          viewBox="0 0 200 12"
          className={`mt-3 h-3 ${align === "center" ? "mx-auto" : ""}`}
          width="200"
          height="12"
        >
          <path
            d="M2 7 Q 40 1, 80 6 T 160 5 T 198 7"
            stroke="var(--color-sr-red)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      )}
    </div>
  );
}
