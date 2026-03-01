import React from "react";
import { cn } from "@/lib/utils";

/* ─── Variant Types ─── */
type ButtonVariant =
  | "primary"      // Slide-up reveal — main CTAs
  | "secondary"    // Slide-left reveal — secondary actions
  | "ghost"        // Text-flip with skew — subtle actions
  | "underline"    // Underline animation — nav links
  | "expand";      // Circle that expands with arrow — special actions

type ButtonColor = "violet" | "rose" | "cyan" | "orange" | "emerald" | "gold" | "white";

interface FancyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  children: React.ReactNode;
}

const COLORS: Record<ButtonColor, string> = {
  violet: "bg-violet-600",
  rose: "bg-rose-600",
  cyan: "bg-cyan-500",
  orange: "bg-orange-500",
  emerald: "bg-emerald-600",
  gold: "bg-gradient-to-r from-yellow-400 to-amber-500",
  white: "bg-white",
};

const BORDER_COLORS: Record<ButtonColor, string> = {
  violet: "border-violet-500/40",
  rose: "border-rose-500/40",
  cyan: "border-cyan-400/40",
  orange: "border-orange-500/40",
  emerald: "border-emerald-500/40",
  gold: "border-yellow-500/40",
  white: "border-white/20",
};

/* ─── 1. PRIMARY: Slide-up reveal ─── */
function PrimaryButton({ color = "violet", className, children, ...props }: Omit<FancyButtonProps, "variant">) {
  return (
    <button
      className={cn(
        "group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-lg border bg-neutral-950 font-semibold text-sm",
        BORDER_COLORS[color],
        className
      )}
      {...props}
    >
      <div className="inline-flex h-11 translate-y-0 items-center justify-center px-6 text-white transition duration-500 group-hover:-translate-y-[150%]">
        {children}
      </div>
      <div className="absolute inline-flex h-11 w-full translate-y-[100%] items-center justify-center text-white transition duration-500 group-hover:translate-y-0">
        <span className={cn(
          "absolute h-full w-full translate-y-full skew-y-12 scale-y-0 transition duration-500 group-hover:translate-y-0 group-hover:scale-150",
          COLORS[color]
        )} />
        <span className="z-10">{children}</span>
      </div>
    </button>
  );
}

/* ─── 2. SECONDARY: Slide-left reveal ─── */
function SecondaryButton({ color = "cyan", className, children, ...props }: Omit<FancyButtonProps, "variant">) {
  return (
    <button
      className={cn(
        "group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-lg border bg-neutral-950 font-semibold text-sm",
        BORDER_COLORS[color],
        className
      )}
      {...props}
    >
      <div className="inline-flex h-11 w-full translate-x-0 items-center justify-center bg-neutral-950 px-6 text-white transition group-hover:-translate-x-[150%]">
        {children}
      </div>
      <div className={cn(
        "absolute inline-flex h-11 w-full translate-x-[100%] items-center justify-center px-6 text-white transition duration-300 group-hover:translate-x-0",
        COLORS[color]
      )}>
        {children}
      </div>
    </button>
  );
}

/* ─── 3. GHOST: Text-flip with skew ─── */
function GhostButton({ className, children, ...props }: Omit<FancyButtonProps, "variant" | "color">) {
  return (
    <button
      className={cn(
        "group relative h-10 rounded-full border border-white/20 bg-transparent px-5 text-white text-sm font-medium",
        className
      )}
      {...props}
    >
      <span className="relative inline-flex overflow-hidden">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[110%] group-hover:skew-y-12">
          {children}
        </div>
        <div className="absolute translate-y-[110%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {children}
        </div>
      </span>
    </button>
  );
}

/* ─── 4. UNDERLINE: Animated underline ─── */
function UnderlineButton({ className, children, ...props }: Omit<FancyButtonProps, "variant" | "color">) {
  return (
    <button
      className={cn(
        "relative text-sm font-medium text-white/70 hover:text-white transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-white after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65,0.05,0.36,1)] hover:after:origin-bottom-left hover:after:scale-x-100",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* ─── 5. EXPAND: Circle that expands with arrow ─── */
function ExpandButton({ color = "violet", className, children, ...props }: Omit<FancyButtonProps, "variant">) {
  return (
    <button
      className={cn(
        "group relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full font-medium text-white transition-all duration-300 hover:w-36",
        COLORS[color],
        className
      )}
      {...props}
    >
      <div className="inline-flex whitespace-nowrap opacity-0 transition-all duration-200 group-hover:-translate-x-3 group-hover:opacity-100 text-sm">
        {children}
      </div>
      <div className="absolute right-3">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
          <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
        </svg>
      </div>
    </button>
  );
}

/* ─── Unified Export ─── */
export default function FancyButton({ variant = "primary", ...props }: FancyButtonProps) {
  switch (variant) {
    case "primary":
      return <PrimaryButton {...props} />;
    case "secondary":
      return <SecondaryButton {...props} />;
    case "ghost":
      return <GhostButton {...props} />;
    case "underline":
      return <UnderlineButton {...props} />;
    case "expand":
      return <ExpandButton {...props} />;
    default:
      return <PrimaryButton {...props} />;
  }
}

export { PrimaryButton, SecondaryButton, GhostButton, UnderlineButton, ExpandButton };
export type { ButtonVariant, ButtonColor, FancyButtonProps };
