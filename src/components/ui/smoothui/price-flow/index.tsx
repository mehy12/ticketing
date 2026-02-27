"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const STAGGER_DELAY = 40;

export interface PriceFlowProps {
  value: number;
  prefix?: string;
  className?: string;
}

const animateDigit = (
  prevElement: HTMLElement | null,
  nextElement: HTMLElement | null,
  isIncreasing: boolean
) => {
  if (!prevElement || !nextElement) return;

  if (isIncreasing) {
    prevElement.classList.add("price-slide-out-up");
    nextElement.classList.add("price-slide-in-up");
  } else {
    prevElement.classList.add("price-slide-out-down");
    nextElement.classList.add("price-slide-in-down");
  }

  const handleAnimationEnd = () => {
    prevElement.classList.remove("price-slide-out-up", "price-slide-out-down");
    nextElement.classList.remove("price-slide-in-up", "price-slide-in-down");
    prevElement.removeEventListener("animationend", handleAnimationEnd);
  };

  prevElement.addEventListener("animationend", handleAnimationEnd);
};

function DigitSlot({
  prevChar,
  nextChar,
  changed,
  isIncreasing,
  delay,
}: {
  prevChar: string;
  nextChar: string;
  changed: boolean;
  isIncreasing: boolean;
  delay: number;
}) {
  const prevRef = useRef<HTMLSpanElement>(null);
  const nextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!changed) return;
    const timer = setTimeout(() => {
      animateDigit(prevRef.current, nextRef.current, isIncreasing);
    }, delay);
    return () => clearTimeout(timer);
  }, [nextChar, changed, isIncreasing, delay]);

  return (
    <span className="relative inline-block overflow-hidden" style={{ width: "0.65em" }}>
      <span
        ref={prevRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: "translateY(-100%)" }}
      >
        {prevChar}
      </span>
      <span
        ref={nextRef}
        className="flex items-center justify-center"
        style={{ transform: "translateY(0%)" }}
      >
        {nextChar}
      </span>
    </span>
  );
}

export default function PriceFlow({
  value,
  prefix = "₹",
  className = "",
}: PriceFlowProps) {
  const [prevValue, setPrevValue] = useState(value);

  const prevStr = prevValue.toString();
  const currStr = value.toString();

  const maxLen = Math.max(prevStr.length, currStr.length);
  const prevPadded = prevStr.padStart(maxLen, " ");
  const currPadded = currStr.padStart(maxLen, " ");

  const isIncreasing = value > prevValue;

  useEffect(() => {
    if (value !== prevValue) {
      // Small delay so the animation triggers after render
      const t = setTimeout(() => setPrevValue(value), 400);
      return () => clearTimeout(t);
    }
  }, [value, prevValue]);

  return (
    <span className={cn("relative inline-flex items-center tabular-nums font-bold", className)}>
      {prefix && <span>{prefix}</span>}
      {currPadded.split("").map((char, i) => {
        const prevChar = prevPadded[i] || " ";
        const changed = prevChar !== char && value !== prevValue;
        return (
          <DigitSlot
            key={`digit-${maxLen - i}`}
            prevChar={prevChar}
            nextChar={char}
            changed={changed}
            isIncreasing={isIncreasing}
            delay={i * STAGGER_DELAY}
          />
        );
      })}
    </span>
  );
}
