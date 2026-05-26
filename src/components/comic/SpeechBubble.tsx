import type { ReactNode } from "react";

interface SpeechBubbleProps {
  tailDirection?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  children: ReactNode;
  className?: string;
}

export function SpeechBubble({
  tailDirection = "bottom-left",
  children,
  className = "",
}: SpeechBubbleProps) {
  const tailStyles: Record<typeof tailDirection, string> = {
    "bottom-left": "left-8 -bottom-5 rotate-[35deg]",
    "bottom-right": "right-8 -bottom-5 -rotate-[35deg]",
    "top-left": "left-8 -top-5 -rotate-[145deg]",
    "top-right": "right-8 -top-5 rotate-[145deg]",
  };
  return (
    <div className={`relative ${className}`}>
      <div className="relative rounded-[2rem] border-[3px] border-sr-black bg-white px-6 py-5 shadow-comic">
        {children}
      </div>
      <div
        aria-hidden="true"
        className={`absolute h-6 w-6 border-[3px] border-sr-black bg-white ${tailStyles[tailDirection]}`}
        style={{
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
        }}
      />
    </div>
  );
}
