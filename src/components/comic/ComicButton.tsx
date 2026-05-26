import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const variantClass: Record<Variant, string> = {
  primary: "bg-sr-yellow text-sr-black",
  secondary: "bg-sr-red text-white",
  ghost: "bg-white text-sr-black",
};

const sizeClass: Record<Size, string> = {
  md: "px-5 py-2.5 text-lg",
  lg: "px-7 py-3.5 text-xl md:text-2xl",
};

const baseClass =
  "relative inline-flex items-center justify-center gap-2 border-comic-thin font-display uppercase tracking-wide " +
  "shadow-comic-sm transition-transform duration-100 " +
  "hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-comic-hover " +
  "active:translate-x-[3px] active:translate-y-[3px] active:shadow-none " +
  "min-h-11 min-w-11";

interface ComicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export const ComicButton = forwardRef<HTMLButtonElement, ComicButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...rest }, ref) => (
    <button
      ref={ref}
      {...rest}
      className={`${baseClass} ${variantClass[variant]} ${sizeClass[size]} ${className}`}
    >
      {children}
    </button>
  )
);
ComicButton.displayName = "ComicButton";

interface ComicLinkProps extends Omit<LinkProps, "className" | "children"> {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function ComicLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ComicLinkProps) {
  return (
    <Link
      {...(rest as LinkProps)}
      className={`${baseClass} ${variantClass[variant]} ${sizeClass[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
