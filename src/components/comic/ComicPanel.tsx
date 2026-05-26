import type { ReactNode, HTMLAttributes } from "react";

interface ComicPanelProps extends HTMLAttributes<HTMLDivElement> {
  tilt?: number;
  hover?: boolean;
  background?: "white" | "cream" | "yellow" | "blue" | "red";
  children: ReactNode;
}

const bgMap = {
  white: "bg-white",
  cream: "bg-sr-cream",
  yellow: "bg-sr-yellow",
  blue: "bg-sr-blue text-white",
  red: "bg-sr-red text-white",
};

export function ComicPanel({
  tilt = 0,
  hover = false,
  background = "white",
  children,
  className = "",
  style,
  ...rest
}: ComicPanelProps) {
  return (
    <div
      {...rest}
      style={{ transform: `rotate(${tilt}deg)`, ...style }}
      className={[
        "relative border-comic shadow-comic",
        bgMap[background],
        hover ? "transition-transform duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-comic-sm" : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
