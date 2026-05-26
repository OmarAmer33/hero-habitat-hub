{/* CONFIRM WITH SHELLEY — swap for uploaded logo files once provided.
    For now this is a styled SVG shield + Bangers wordmark placeholder. */}

interface LogoProps {
  variant?: "horizontal" | "stacked" | "shield";
  className?: string;
  height?: number;
}

export function Logo({ variant = "horizontal", className = "", height = 44 }: LogoProps) {
  if (variant === "shield") {
    return <Shield className={className} size={height} />;
  }
  if (variant === "stacked") {
    return (
      <div className={`inline-flex flex-col items-center gap-2 ${className}`}>
        <Shield size={height * 1.6} />
        <span
          className="font-display uppercase leading-none text-sr-black"
          style={{ fontSize: height * 0.7, letterSpacing: "0.02em" }}
        >
          Super<span className="text-sr-red">Realtor</span>
        </span>
      </div>
    );
  }
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <Shield size={height} />
      <span
        className="font-display uppercase leading-none text-sr-black"
        style={{ fontSize: height * 0.62, letterSpacing: "0.02em" }}
      >
        Super<span className="text-sr-red">Realtor</span>
      </span>
    </div>
  );
}

function Shield({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      aria-label="SuperRealtor shield"
      role="img"
    >
      {/* Shield body */}
      <path
        d="M32 3 L58 11 V32 C58 47 47 56 32 61 C17 56 6 47 6 32 V11 Z"
        fill="var(--color-sr-red)"
        stroke="var(--color-sr-black)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Yellow inner */}
      <path
        d="M32 11 L50 16 V32 C50 43 42 50 32 53 C22 50 14 43 14 32 V16 Z"
        fill="var(--color-sr-yellow)"
        stroke="var(--color-sr-black)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* SR letters */}
      <text
        x="32"
        y="40"
        textAnchor="middle"
        fontFamily="Bangers, sans-serif"
        fontSize="22"
        fill="var(--color-sr-black)"
        style={{ paintOrder: "stroke fill" }}
      >
        SR
      </text>
    </svg>
  );
}
