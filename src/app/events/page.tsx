"use client";

import { EventCard, type Event } from "@/components/event-card";
import { Navbar } from "@/components/navbar";

export default function EventPage() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/brochure.pdf"; // Ensure the file is placed in the public folder
    link.download = "Ikyam_2026_Brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const events: Event[] = [
    {
      title: "Solo Dance",
      image: "/events/solo-dance.jpg",
      description: "Show your moves in Hip-Hop, Breakdance, Freestyle or any dance style.",
      isPublished: true,
    },
    {
      title: "Western Group Dance",
      image: "/events/western-group-dance.jpg",
      description: "High-energy group choreography in Western dance styles.",
      isPublished: true,
    },
    {
      title: "Indian Group Dance",
      image: "/events/indian-group-dance.jpg",
      description: "Celebrate classical, folk, Bollywood, and Indian fusion dance forms.",
      isPublished: true,
    },
    {
      title: "On Spot Choreography",
      image: "/events/on-spot-choreography.jpg",
      description: "Perform instantly to a surprise track — no preparation time.",
      isPublished: true,
    },
    {
      title: "Duo Dance",
      image: "/events/duo-dance.jpg",
      description: "Two dancers. One stage. Perfect synchronization.",
      isPublished: true,
    },
    {
      title: "Solo Singing",
      image: "/events/solo-singing.jpg",
      description: "Showcase your vocal talent across any genre.",
      isPublished: true,
    },
    {
      title: "Group Singing",
      image: "/events/group-singing.jpg",
      description: "Perform live with harmony, rhythm, and coordination.",
      isPublished: true,
    },
    {
      title: "Rap & Boxing",
      image: "/events/rap-and-boxing.jpg",
      description: "Bring rhythm, flow, and lyrical energy to the stage.",
      isPublished: true,
    },
    {
      title: "Stand Up Comedy",
      image: "/events/stand-up-comedy.jpg",
      description: "Make the audience laugh with your original comedic performance.",
      isPublished: true,
    },
    {
      title: "Reel Making Competition",
      image: "/events/reel-making-competition.jpg",
      description: "Create and edit a 60-second reel on the spot.",
      isPublished: true,
    },
    {
      title: "Final Cut – Short Film",
      image: "/events/final-cut-short-film.jpg",
      description: "Present an original short film at the Vemanotsava Film Festival.",
      isPublished: true,
    },
    {
      title: "Esports Tournament",
      image: "/events/esports-tournament.jpg",
      description: "Compete in BGMI, Call of Duty Mobile, and Free Fire.",
      isPublished: true,
    },
    {
      title: "The Great Hunt – Treasure Hunt",
      image: "/events/the-great-hunt.jpg",
      description: "Solve clues across campus and race to the final destination.",
      isPublished: true,
    },
    {
      title: "Can You Guess? – Quiz Competition",
      image: "/events/can-you-guess.jpg",
      description: "Test your knowledge in a multi-round quiz challenge.",
      isPublished: true,
    },
    {
      title: "Mr. & Ms. Aura",
      image: "/events/mr-ms-aura.jpg",
      description: "Showcase personality, confidence, and stage presence.",
      isPublished: true,
    },
    {
      title: "Canvas Painting",
      image: "/events/canvas-painting.jpg",
      description: "Express creativity through art on canvas.",
      isPublished: true,
    },
    {
      title: "Shark Tank – Capital Quest",
      image: "/events/shark-tank.jpg",
      description: "Pitch your innovative business idea to a panel of judges.",
      isPublished: true,
    },
    {
      title: "Fashion Show",
      image: "/events/fashion-show.jpg",
      description: "Present a creative theme with coordinated ramp performance.",
      isPublished: true,
    },
    {
      title: "Beyond The Lens – Photography",
      image: "/events/beyond-the-lens.jpg",
      description: "Mobile photography competition. Capture creativity and present your best shot in 5 minutes.",
      isPublished: true,
    },
    {
      title: "Chamber of Secrets – Escape Room",
      image: "/events/chamber-of-secrets.jpg",
      description: "Team-based escape challenge. Solve puzzles and race against time to break free.",
      isPublished: true,
    },
    {
      title: "Inkspire – Creative Writing",
      image: "/events/inkspire.jpg",
      description: "Team storytelling challenge with a unique Universe Switch concept.",
      isPublished: true,
    },
    {
      title: "Air Crash",
      image: "/events/air-crash.jpg",
      description: "Role-play debate event. Convince the panel why you deserve to survive.",
      isPublished: true,
    },
    {
      title: "House of Games",
      image: "/events/house-of-games.jpg",
      description: "High-energy survival-based team competition with multiple rounds.",
      isPublished: true,
    },
    {
      title: "Echoes of Poetry",
      image: "/events/web-designing.jpg",
      description: "Unleash your inner poet and let your words paint vivid pictures on canvas.",
      isPublished: true,
    }
  ];

  return (
    <div
      className="min-h-screen w-full flex flex-col bg-fixed bg-cover bg-center bg-no-repeat "
      style={{ backgroundImage: "url('/background.png')" }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-transparent via-transparent/90 to-transparent/90">
        {/* Header Section */}
        <div className="text-center mb-12 mt-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-600">
              Ikyam 2026 Events
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            Explore our exciting lineup of events and competitions. Showcase
            your talents and win amazing prizes!
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-16">
          {events.map((event, i) => (
            <EventCard key={i} event={event} index={i} />
          ))}
        </div>

        {/* Brochure Download Section */}
        <div className="bg-black/50 backdrop-blur-md rounded-2xl p-8 text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            🎉 Want More Details?
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Get complete information about all our events, rules, and prizes by
            downloading the official brochure.
          </p>
          <button
            onClick={handleDownload}
            className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold rounded-lg hover:from-yellow-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            📥 Download Brochure
          </button>
        </div>
      </div>
    </div>
  );
}
