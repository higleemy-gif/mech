import type { ReactNode } from "react";

type ButtonVariant = "gold" | "navy" | "ghost";

interface ButtonProps {
  variant: ButtonVariant;
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-busy"?: boolean;
}

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 min-h-[44px] text-base font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed";

const VARIANTS: Record<ButtonVariant, string> = {
  gold: "bg-gold text-navy hover:bg-gold-light",
  navy: "bg-navy text-white hover:bg-navy-dark",
  ghost: "bg-transparent text-white border border-white hover:bg-white/10",
};

export function Button({
  variant,
  children,
  onClick,
  href,
  type = "button",
  disabled,
  className = "",
  "aria-label": ariaLabel,
  "aria-busy": ariaBusy,
}: ButtonProps) {
  const classes = BASE + " " + VARIANTS[variant] + " " + className;
  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
      aria-busy={ariaBusy}
    >
      {children}
    </button>
  );
}
