import type { ReactNode } from "react";

interface BurstProps {
  size?: number;
  color?: "yellow" | "red" | "blue";
  rotation?: number;
  points?: number;
  className?: string;
  children?: ReactNode;
}

/** Sunburst / starburst shape. Often holds a badge or icon. */
export function Burst({
  size = 140,
  color = "yellow",
  rotation = 0,
  points = 22,
  className = "",
  children,
}: BurstProps) {
  const colorMap = {
    yellow: "var(--color-sr-yellow)",
    red: "var(--color-sr-red)",
    blue: "var(--color-sr-blue)",
  };
  const path = makeStarPath(points, 50, 38);

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        style={{ transform: `rotate(${rotation}deg)` }}
        aria-hidden="true"
        className="absolute inset-0"
      >
        <path
          d={path}
          fill={colorMap[color]}
          stroke="var(--color-sr-black)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
      {children && (
        <div className="relative z-10 flex items-center justify-center text-center">
          {children}
        </div>
      )}
    </div>
  );
}

function makeStarPath(points: number, outer: number, inner: number) {
  const cx = 50;
  const cy = 50;
  const step = Math.PI / points;
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = i * step - Math.PI / 2;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)} `;
  }
  return d + "Z";
}
