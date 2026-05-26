interface SoundFxProps {
  text: string;
  rotation?: number;
  color?: "yellow" | "red" | "blue" | "white";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const colorMap = {
  yellow: "text-sr-yellow",
  red: "text-sr-red",
  blue: "text-sr-blue",
  white: "text-white",
};
const sizeMap = {
  sm: "text-3xl md:text-4xl",
  md: "text-5xl md:text-6xl",
  lg: "text-6xl md:text-7xl",
  xl: "text-7xl md:text-8xl",
};

export function SoundFx({
  text,
  rotation = -6,
  color = "yellow",
  size = "md",
  className = "",
}: SoundFxProps) {
  return (
    <span
      className={`inline-block font-display uppercase ${colorMap[color]} ${sizeMap[size]} ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        WebkitTextStroke: "3px var(--color-sr-black)",
        textShadow: "4px 4px 0 var(--color-sr-black)",
        paintOrder: "stroke fill",
      }}
    >
      {text}
    </span>
  );
}
