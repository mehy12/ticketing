"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { MorphingSquare } from "@/components/molecule-ui/morphing-square";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Show loading on route change
    if (prevPathname.current !== pathname) {
      setIsLoading(true);
      prevPathname.current = pathname;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (isLoading) {
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

  return <>{children}</>;
}
