interface ActionLinesProps {
  color?: "black" | "blue" | "red" | "yellow";
  count?: number;
  className?: string;
}

/** Radial speed lines emanating from center. Decorative. */
export function ActionLines({ color = "black", count = 32, className = "" }: ActionLinesProps) {
  const colorMap = {
    black: "var(--color-sr-black)",
    blue: "var(--color-sr-blue)",
    red: "var(--color-sr-red)",
    yellow: "var(--color-sr-yellow)",
  };
  const lines = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 360;
    const len = 35 + ((i * 7) % 18);
    return { angle, len };
  });

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      <svg
        viewBox="-50 -50 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        {lines.map(({ angle, len }, i) => (
          <line
            key={i}
            x1="0"
            y1="0"
            x2={len}
            y2="0"
            transform={`rotate(${angle})`}
            stroke={colorMap[color]}
            strokeWidth="0.6"
            strokeLinecap="round"
            opacity="0.55"
          />
        ))}
      </svg>
    </div>
  );
}
