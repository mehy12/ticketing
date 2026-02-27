"use client";

const FuzzyOverlay = () => {
  return (
    <div
      style={{
        backgroundImage: 'url("/black-noise.png")',
        backgroundRepeat: "repeat",
      }}
      className="pointer-events-none fixed inset-0 z-[9999] animate-grain opacity-[15%]"
    />
  );
};

export default FuzzyOverlay;
