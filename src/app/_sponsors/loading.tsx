"use client";

import { MorphingSquare } from "@/components/molecule-ui/morphing-square";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <MorphingSquare
        message="Loading..."
        messagePlacement="bottom"
        className="bg-white h-12 w-12"
      />
    </div>
  );
}
