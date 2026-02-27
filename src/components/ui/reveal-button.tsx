import React from "react";
import { cn } from "@/lib/utils";

type RevealVariant = "purple" | "orange" | "cyan" | "rose" | "emerald" | "gold";

interface RevealButtonProps extends React.PropsWithChildren {
  variant?: RevealVariant;
  className?: string;
}

const VARIANTS: Record<RevealVariant, { bg: string; reveal: string; border: string }> = {
  purple: {
    bg: "bg-neutral-950",
    reveal: "bg-violet-600",
    border: "border-violet-500/30",
  },
  orange: {
    bg: "bg-neutral-950",
    reveal: "bg-gradient-to-r from-orange-500 to-amber-500",
    border: "border-orange-500/30",
  },
  cyan: {
    bg: "bg-neutral-950",
    reveal: "bg-cyan-500",
    border: "border-cyan-500/30",
  },
  rose: {
    bg: "bg-neutral-950",
    reveal: "bg-rose-600",
    border: "border-rose-500/30",
  },
  emerald: {
    bg: "bg-neutral-950",
    reveal: "bg-emerald-600",
    border: "border-emerald-500/30",
  },
  gold: {
    bg: "bg-neutral-950",
    reveal: "bg-gradient-to-r from-yellow-400 to-amber-500",
    border: "border-yellow-500/30",
  },
};

export default function RevealButton({
  variant = "purple",
  className,
  children,
}: RevealButtonProps) {
  const v = VARIANTS[variant];
  return (
    <button
      className={cn(
        "group relative h-10 overflow-hidden overflow-x-hidden rounded-lg px-6 py-2 font-semibold text-sm text-white border transition-all duration-300",
        v.bg,
        v.border,
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 overflow-hidden rounded-lg">
        <span
          className={cn(
            "absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150",
            v.reveal
          )}
        />
      </span>
    </button>
  );
}
