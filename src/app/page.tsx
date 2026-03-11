import Hero from "@/components/hero";

import VerticalAccordion from "@/components/vertical-accordian";

import { Navbar } from "@/components/navbar";
import { RevealBento } from "@/components/reveal-bento";
import MasonryGrid from "@/components/masonary-grid";
import AboutSection from "@/components/about";
import RollingTrophy from "@/components/rolling-trophy";
import { TapeSection } from "@/components/tape";
import { CallToAction } from "@/components/call-to-action";
import PrizePoolBanner from "@/components/prize-pool-banner";
import FestStats from "@/components/count-up";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background gradients */}
      <div className="pointer-events-none fixed inset-0">
        <div
          style={{
            backgroundImage: "url('/background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="min-h-screen flex flex-col items-center justify-center  bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-800  to-[#1c1c1d] "
        >
          <div className="absolute inset-0 bg-transparent/50">
            <div className="absolute inset-0 grid place-content-center place-items-center"></div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <PrizePoolBanner />
        <AboutSection />
        <RollingTrophy />
        <MasonryGrid />
        <TapeSection />
        <FestStats />
        <CallToAction />
        <VerticalAccordion />
        <RevealBento />
      </div>
    </div>
  );
}
