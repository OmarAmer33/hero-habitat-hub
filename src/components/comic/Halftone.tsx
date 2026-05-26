interface HalftoneProps {
  variant?: "blue" | "red" | "yellow" | "black";
  density?: "sparse" | "normal" | "dense";
  opacity?: number;
  className?: string;
}

/**
 * SVG halftone dot pattern. Decorative — aria-hidden.
 */
export function Halftone({
  variant = "blue",
  density = "normal",
  opacity = 0.18,
  className = "",
}: HalftoneProps) {
  const colorMap = {
    blue: "var(--color-sr-blue)",
    red: "var(--color-sr-red)",
    yellow: "var(--color-sr-yellow)",
    black: "var(--color-sr-black)",
  };
  const sizeMap = { sparse: 22, normal: 14, dense: 9 };
  const dotMap = { sparse: 2.2, normal: 1.8, dense: 1.4 };
  const size = sizeMap[density];
  const dot = dotMap[density];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ opacity }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={`halftone-${variant}-${density}`}
            x="0"
            y="0"
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
          >
            <circle cx={size / 2} cy={size / 2} r={dot} fill={colorMap[variant]} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#halftone-${variant}-${density})`} />
      </svg>
    </div>
  );
}
