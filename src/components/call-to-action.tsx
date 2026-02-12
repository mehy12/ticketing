import Link from "next/link";
import ShinyButton from "./ui/shiny-button";

export const CallToAction = () => {
  return (
    <div className="py-32 md:py-48 lg:py-56 relative z-0 overflow-x-clip bg-gradient-to-b from-transparent/60 to-transparent/80">
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]">
        <div
          className="absolute inset-0 -z-30 opacity-5"
          style={{
            background: `url('/grain.jpg')`,
          }}
        ></div>
        <div className="size-[620px]  hero-ring"></div>
        <div className="size-[820px]  hero-ring"></div>
        <div className="size-[1020px]  hero-ring"></div>
        <div className="size-[1220px]  hero-ring"></div>
      </div>
      <div className="container">
        <div className="max-w-lg mx-auto">
          <h1 className="text-white font-bold text-3xl md:text-5xl text-center mt-8 tracking-wide">
            Join Us at Ekyam 2026
          </h1>
          <p className="text-center text-lg font-semibold text-orange-500">
            25 Years of Culture & Celebration!
          </p>
          <p className="mt-4 text-center text-white/60 md:text-lg ">
            Experience the biggest cultural fest of the year! Electrifying
            performances, thrilling competitions, and a star-studded event
            featuring Bigg Boss Kannada. Don’t miss out on the excitement!
          </p>
        </div>
        <div className=" flex flex-col md:flex-row justify-center items-center mt-8 gap-2">
          <Link href={"/events"}>
            <ShinyButton variant="purple">
              <span className="font-semibold">Explore Events</span>
            </ShinyButton>
          </Link>
          <Link href={"/passes"}>
            <ShinyButton variant="green">
              <span>🎟️</span>
              <span className=" font-semibold ">Get Your Pass</span>
            </ShinyButton>
          </Link>
        </div>
      </div>
    </div>
  );
};
