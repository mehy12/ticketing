import React from "react";
import clsx from "clsx";

interface ShinyButtonProps extends React.PropsWithChildren {
  variant?: "blue" | "red" | "green" | "gold" | "purple";
  className?: string; // ✅ ADD THIS
}

export default function ShinyButton({
  variant = "blue",
  children,
  className, // ✅ ADD THIS
}: ShinyButtonProps) {
  const variants = {
    blue: {
      bg: "from-[#0b1d33] to-[#20508a]",
      shadow: "shadow-[0px_0px_12px_#458cff]",
      innerShadow: "shadow-[0_0_10px_rgb(69,140,255,.7)_inset]",
    },
    red: {
      bg: "from-[#330b0b] to-[#8a2020]",
      shadow: "shadow-[0px_0px_12px_#ff4545]",
      innerShadow: "shadow-[0_0_10px_rgb(255,69,69,.7)_inset]",
    },
    green: {
      bg: "from-[#0b3313] to-[#208a42]",
      shadow: "shadow-[0px_0px_12px_#45ff8c]",
      innerShadow: "shadow-[0_0_10px_rgb(69,255,140,.7)_inset]",
    },
    gold: {
      bg: "from-[#33290b] to-[#8a6720]",
      shadow: "shadow-[0px_0px_12px_#ffc745]",
      innerShadow: "shadow-[0_0_10px_rgb(255,199,69,.7)_inset]",
    },
    purple: {
      bg: "from-[#190d2e] to-[#4a208a]",
      shadow: "shadow-[0px_0px_12px_#8c45ff]",
      innerShadow: "shadow-[0_0_10px_rgb(140,69,255,.7)_inset]",
    },
  };

  return (
    <button
      className={clsx(
        "relative py-2 px-4 rounded-lg font-medium text-sm text-white bg-gradient-to-b transition-all duration-300 hover:scale-105",
        variants[variant].bg,
        variants[variant].shadow,
        className // ✅ now extra styling works
      )}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="border border-white/20 absolute inset-0 rounded-lg [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
        <div className="absolute border inset-0 border-white/40 [mask-image:linear-gradient(to_top,black,transparent)] rounded-lg"></div>
        <div
          className={clsx(
            "absolute inset-0 rounded-lg",
            variants[variant].innerShadow
          )}
        ></div>
      </div>
      <span className="relative">{children}</span>
    </button>
  );
}
