import { Event } from "@/lib/types";

export const evento: Event[] = [
  //solo dance
  {
    slug: "solo-dance",
    name: "Solo Dance",
    tagline: "Hip-Hop, Breakdance, Freestyle — Show Us What You've Got!",
    description:
      "An electrifying solo dance battle where participants showcase their style, creativity, expressions, and stage presence across any dance genre.",
    date: "March 27, 2026",
    time: "4:00 PM",
    venue: "Vemana Institute of Technology",
    category: "Dance",
    image: "/events/solo-dance.jpg",
    rules: [
      "Solo performance only — 1 participant.",
      "Time limit: 3–5 minutes (strict).",
      "Any dance style is allowed.",
      "Music must be submitted in MP3 format at least 1 hour before the event (Pen drive backup mandatory).",
      "Props are allowed but must be managed by the participant.",
      "No vulgar or offensive songs or moves allowed.",
      "Dangerous items such as fire, glass, or water are strictly prohibited.",
      "Participants must report 1 hour before the event.",
    ],
    eligibility: [
      "Open to all bonafide college students.",
      "Participants must carry valid college ID card.",
    ],
    registration: {
      method: "Online Registration Only",
      deadline: "Before March 27, 2026",
      fee: "As per registration portal",
      link: "https://linktr.ee/Ekyam.vemanotsava",
    },
    prizes: [
      {
        position: "Winner",
        amount: "To Be Announced",
        description: "Trophy + Certificate",
      },
      {
        position: "Runner-Up",
        amount: "To Be Announced",
        description: "Certificate",
      },
    ],
    coordinators: [
      {
        name: "Vasanth Kumar S",
        contact: "9620300081",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
      {
        name: "Ekta Priya V",
        contact: "8431666914",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
    ],
    faqs: [
      {
        question: "Can I perform any dance style?",
        answer: "Yes, any dance style is allowed as long as it follows decorum.",
      },
      {
        question: "Are props allowed?",
        answer: "Yes, but you must manage your own props and ensure safety.",
      },
    ],
    maxTeamSize: 1,
    minTeamSize: 1,
    featured: true,
    gradient: "from-pink-500 to-rose-600",
    price: 99,
  },
  //western group dance
  {
    slug: "western-group-dance",
    name: "Western Group Dance",
    tagline: "Bring the Energy. Own the Stage.",
    description:
      "A high-voltage group dance competition featuring western styles like hip-hop, freestyle, jazz, contemporary, street, and fusion. Teams will battle it out with synchronization, creativity, and stage presence.",
    date: "March 27, 2026",
    time: "6:30 PM",
    venue: "Vemana Institute of Technology",
    category: "Dance",
    image: "/events/western-group-dance.jpg",
    rules: [
      "Team size: Minimum 5 members, Maximum 12 members.",
      "All participants must carry valid college ID cards.",
      "Time limit: 5–7 minutes including entry and exit.",
      "Exceeding time limit may lead to negative marking or disqualification.",
      "Songs must not contain offensive content.",
      "Props are allowed but must be informed to coordinators in advance.",
      "Props must not damage the stage or equipment.",
    ],
    eligibility: [
      "Open to bonafide college students.",
      "All team members must belong to the same college.",
    ],
    registration: {
      method: "Online Registration Only",
      deadline: "Before March 27, 2026",
      fee: "As per registration portal",
      link: "https://linktr.ee/Ekyam.vemanotsava",
    },
    prizes: [
      {
        position: "Winner",
        amount: "To Be Announced",
        description: "Trophy + Certificate",
      },
      {
        position: "Runner-Up",
        amount: "To Be Announced",
        description: "Certificate",
      },
    ],
    coordinators: [
      {
        name: "Mythri M",
        contact: "9901413481",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
      {
        name: "Pranathi",
        contact: "9019519055",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
    ],
    faqs: [
      {
        question: "Can we perform fusion style?",
        answer: "Yes, fusion is allowed as long as it primarily reflects western dance styles.",
      },
      {
        question: "Can we exceed 7 minutes?",
        answer: "No. Exceeding time limit may result in negative marking or disqualification.",
      },
    ],
    minTeamSize: 5,
    maxTeamSize: 12,
    featured: true,
    gradient: "from-yellow-500 to-orange-500",
    price: 1000,
  },
  // indian group dance
  {
    slug: "indian-group-dance",
    name: "Indian Group Dance",
    tagline: "Celebrate Tradition Through Rhythm & Expression.",
    description:
      "A vibrant group dance competition showcasing classical, folk, Bollywood, and Indian fusion styles. Teams will express culture, coordination, and creativity through powerful choreography and storytelling.",
    date: "March 27, 2026",
    time: "12:00 PM",
    venue: "Vemana Institute of Technology",
    category: "Dance",
    image: "/events/indian-group-dance.jpg",
    rules: [
      "Team size: Minimum 5 members, Maximum 12 members.",
      "Time limit: 5–7 minutes including entry and exit.",
      "All team members must carry valid college ID cards.",
      "Songs must reflect Indian themes (classical, folk, Bollywood, fusion).",
      "No vulgar or offensive content allowed.",
      "Props are allowed but must be safe and informed to coordinators beforehand.",
      "Teams must report at least 1 hour before the event.",
    ],
    eligibility: [
      "Open to bonafide college students.",
      "All participants must belong to the same college.",
    ],
    registration: {
      method: "Online Registration Only",
      deadline: "Before March 27, 2026",
      fee: "As per registration portal",
      link: "https://linktr.ee/Ekyam.vemanotsava",
    },
    prizes: [
      {
        position: "Winner",
        amount: "To Be Announced",
        description: "Trophy + Certificate",
      },
      {
        position: "Runner-Up",
        amount: "To Be Announced",
        description: "Certificate",
      },
    ],
    coordinators: [
      {
        name: "Bhuvana Shree MK",
        contact: "8197659865",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
      {
        name: "Mahima Reddy",
        contact: "8660579490",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
    ],
    faqs: [
      {
        question: "Can we mix classical and Bollywood?",
        answer: "Yes, fusion styles are allowed as long as they represent Indian dance forms.",
      },
      {
        question: "Are props mandatory?",
        answer: "No, props are optional but must follow safety rules.",
      },
    ],
    minTeamSize: 5,
    maxTeamSize: 12,
    featured: true,
    gradient: "from-orange-500 to-amber-600",
    price: 1000,
  },
  // on spot choreography
  {
    slug: "on-spot-choreography",
    name: "On Spot Choreography",
    tagline: "No Preparation. Just Pure Talent.",
    description:
      "A spontaneous solo dance challenge where participants must perform instantly to a randomly played song. This event tests adaptability, rhythm, creativity, and stage confidence.",
    date: "March 27, 2026",
    time: "4:00 PM",
    venue: "Vemana Institute of Technology",
    category: "Dance",
    image: "/events/on-spot-choreography.jpg",
    rules: [
      "Solo event — only one participant per entry.",
      "Time limit: 2–3 minutes.",
      "Song will be played on stage without prior notice.",
      "No preparation or rehearsal time will be given.",
      "Only dance performance is allowed (no acting or props).",
      "Participants must adapt instantly to the music.",
      "Use of offensive gestures, lyrics, or movements is strictly prohibited.",
    ],
    eligibility: [
      "Open to bonafide college students.",
      "Valid college ID card must be carried.",
    ],
    registration: {
      method: "Online Registration Only",
      deadline: "Before March 27, 2026",
      fee: "As per registration portal",
      link: "https://linktr.ee/Ekyam.vemanotsava",
    },
    prizes: [
      {
        position: "Winner",
        amount: "To Be Announced",
        description: "Trophy + Certificate",
      },
      {
        position: "Runner-Up",
        amount: "To Be Announced",
        description: "Certificate",
      },
    ],
    coordinators: [
      {
        name: "Mythri M",
        contact: "9901413481",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
      {
        name: "Jithesh U",
        contact: "8722067551",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
    ],
    faqs: [
      {
        question: "Will we know the song beforehand?",
        answer: "No. The song will be played instantly on stage without prior notice.",
      },
      {
        question: "Can we use props?",
        answer: "No, props and acting elements are not allowed in this event.",
      },
    ],
    minTeamSize: 1,
    maxTeamSize: 1,
    featured: false,
    gradient: "from-purple-500 to-pink-600",
    price: 99,
  },

  //duo dance
  {
    slug: "duo-dance",
    name: "Duo Dance",
    tagline: "Two Dancers. One Stage. Perfect Harmony.",
    description:
      "A dynamic dance competition where pairs showcase synchronization, chemistry, and creative choreography across any dance style. This event celebrates coordination and stage connection between two performers.",
    date: "March 27, 2026",
    time: "10:00 AM",
    venue: "Vemana Institute of Technology",
    category: "Dance",
    image: "/events/duo-dance.jpg",
    rules: [
      "Each team must consist of exactly 2 dancers.",
      "Time limit: 3–5 minutes.",
      "Any dance style is allowed (Hip-Hop, Classical, Contemporary, Freestyle, etc.).",
      "Song must not contain explicit or offensive content.",
      "Music track must be submitted at least 1 day prior to the event.",
      "No water, fire, inflammable items, or vehicles allowed on stage.",
      "Participants must arrange their own props (if needed).",
      "Green rooms will be provided for changing.",
    ],
    eligibility: [
      "Open to bonafide college students.",
      "Valid college ID card required.",
    ],
    registration: {
      method: "Online Registration Only",
      deadline: "Before March 27, 2026",
      fee: "As per registration portal",
      link: "https://linktr.ee/Ekyam.vemanotsava",
    },
    prizes: [
      {
        position: "Winner",
        amount: "To Be Announced",
        description: "Trophy + Certificate",
      },
      {
        position: "Runner-Up",
        amount: "To Be Announced",
        description: "Certificate",
      },
    ],
    coordinators: [
      {
        name: "Likith",
        contact: "6361165164",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
      {
        name: "Jithesh",
        contact: "8722067551",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
    ],
    faqs: [
      {
        question: "Can we perform any dance style?",
        answer: "Yes, any dance style is allowed as long as it follows decorum.",
      },
      {
        question: "Is synchronization important?",
        answer: "Yes. Synchronization and chemistry carry significant weight in judging.",
      },
    ],
    minTeamSize: 2,
    maxTeamSize: 2,
    featured: true,
    gradient: "from-indigo-500 to-purple-600",
    price: 179,
  },
  //solo singing
  {
    slug: "solo-singing",
    name: "Solo Singing",
    tagline: "Let Your Voice Take the Spotlight.",
    description:
      "A melodious platform for solo performers to showcase their vocal talent across genres including classical, semi-classical, light music, folk, and film songs. Express emotion, rhythm, and stage presence through your voice.",
    date: "March 27, 2026",
    time: "3:00 PM",
    venue: "Vemana Institute of Technology",
    category: "Music",
    image: "/events/solo-singing.jpg",
    rules: [
      "Solo performance only — one participant per entry.",
      "Time limit: 3–4 minutes.",
      "Karaoke tracks are allowed (must bring via pen drive or mobile).",
      "Live instruments are permitted.",
      "Pre-recorded vocals and lip-syncing are strictly prohibited.",
      "Participants must report 1 hour before the event.",
      "Valid college ID card is mandatory.",
    ],
    eligibility: [
      "Open to bonafide college students.",
      "Participants must carry valid college ID card.",
    ],
    registration: {
      method: "Online Registration Only",
      deadline: "Before March 27, 2026",
      fee: "As per registration portal",
      link: "https://linktr.ee/Ekyam.vemanotsava",
    },
    prizes: [
      {
        position: "Winner",
        amount: "To Be Announced",
        description: "Trophy + Certificate",
      },
      {
        position: "Runner-Up",
        amount: "To Be Announced",
        description: "Certificate",
      },
    ],
    coordinators: [
      {
        name: "Chandana A",
        contact: "9591903527",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
      {
        name: "Tanushree",
        contact: "9108196367",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
    ],
    faqs: [
      {
        question: "Can I sing any genre?",
        answer: "Yes, any genre is allowed including classical, folk, light music, or film songs.",
      },
      {
        question: "Can I use karaoke?",
        answer: "Yes, karaoke tracks are allowed but pre-recorded vocals are not.",
      },
    ],
    minTeamSize: 1,
    maxTeamSize: 1,
    featured: true,
    gradient: "from-blue-500 to-indigo-600",
    price: 99,
  },
  //group singing
  {
    slug: "group-singing",
    name: "Group Singing",
    tagline: "Harmony. Rhythm. One Unified Voice.",
    description:
      "A live musical showcase where teams perform in harmony, blending voices, rhythm, and coordination across various genres including classical, semi-classical, folk, devotional, patriotic, and film songs.",
    date: "March 27, 2026",
    time: "6:30 PM",
    venue: "Vemana Institute of Technology",
    category: "Music",
    image: "/events/group-singing.jpg",
    rules: [
      "Each team must consist of 4–6 members.",
      "All members must belong to the same college.",
      "Time limit: 5–7 minutes including entry and exit.",
      "All participants must sing live on stage.",
      "Karaoke/background tracks are allowed.",
      "Pre-recorded vocals and lip-syncing are strictly prohibited.",
      "Live instruments may be used; teams must manage their own instruments.",
    ],
    eligibility: [
      "Open to bonafide college students.",
      "All members must carry valid college ID cards.",
    ],
    registration: {
      method: "Online Registration Only",
      deadline: "Before March 27, 2026",
      fee: "As per registration portal",
      link: "https://linktr.ee/Ekyam.vemanotsava",
    },
    prizes: [
      {
        position: "Winner",
        amount: "To Be Announced",
        description: "Trophy + Certificate",
      },
      {
        position: "Runner-Up",
        amount: "To Be Announced",
        description: "Certificate",
      },
    ],
    coordinators: [
      {
        name: "Punitha Reddy N",
        contact: "9606631294",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
      {
        name: "Vyshnavi R K",
        contact: "9449118250",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
    ],
    faqs: [
      {
        question: "Can we use live instruments?",
        answer: "Yes, live instruments are allowed, but teams must manage their own setup.",
      },
      {
        question: "Are songs in any language allowed?",
        answer: "Yes, songs in any language are permitted as long as they are appropriate.",
      },
    ],
    minTeamSize: 4,
    maxTeamSize: 6,
    featured: true,
    gradient: "from-emerald-500 to-teal-600",
    price: 269,
  },
  //rap and boxing
  {
    slug: "rap-and-boxing",
    name: "Rap & Boxing",
    tagline: "Unleash the Flow. Own the Mic.",
    description:
      "A high-energy solo performance event where participants showcase their lyrical flow, rhythm, and vocal power through rap and beatboxing. This stage is all about creativity, confidence, and commanding presence.",
    date: "March 27, 2026",
    time: "12:00 PM",
    venue: "Vemana Institute of Technology",
    category: "Music",
    image: "/events/rap-and-boxing.jpg",
    rules: [
      "Solo participation only.",
      "Time limit: 3–4 minutes.",
      "Participants may perform rap, beatboxing, or a combination of both.",
      "Karaoke/background tracks are allowed.",
      "Pre-recorded vocals are strictly prohibited.",
      "Content must not include vulgar, offensive, or inappropriate language.",
      "Participants must report 1 hour before the event with valid college ID.",
    ],
    eligibility: [
      "Open to bonafide college students.",
      "Valid college ID card is mandatory.",
    ],
    registration: {
      method: "Online Registration Only",
      deadline: "Before March 27, 2026",
      fee: "As per registration portal",
      link: "https://linktr.ee/Ekyam.vemanotsava",
    },
    prizes: [
      {
        position: "Winner",
        amount: "To Be Announced",
        description: "Trophy + Certificate",
      },
      {
        position: "Runner-Up",
        amount: "To Be Announced",
        description: "Certificate",
      },
    ],
    coordinators: [
      {
        name: "Jithesh U",
        contact: "8722067551",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
      {
        name: "Krupashree G",
        contact: "8317319367",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
    ],
    faqs: [
      {
        question: "Can I perform only beatboxing?",
        answer: "Yes, participants can perform rap, beatboxing, or both.",
      },
      {
        question: "Are explicit lyrics allowed?",
        answer: "No. Any vulgar or offensive content will lead to disqualification.",
      },
    ],
    minTeamSize: 1,
    maxTeamSize: 1,
    featured: false,
    gradient: "from-red-500 to-orange-600",
    price: 99,
  },
  //stand up comedy
  {
    slug: "stand-up-comedy",
    name: "Stand Up Comedy",
    tagline: "Make Them Laugh. Own the Stage.",
    description:
      "A solo performance event where participants bring humor, wit, and confidence to the stage through original stand-up comedy. This competition celebrates creativity, timing, and audience engagement.",
    date: "March 27, 2026",
    time: "3:00 PM",
    venue: "Vemana Institute of Technology",
    category: "Entertainment",
    image: "/events/stand-up-comedy.jpg",
    rules: [
      "Solo participation only.",
      "Time limit: 3–4 minutes.",
      "Performance must be original content.",
      "No vulgar, offensive, political, or religiously sensitive jokes allowed.",
      "Participants must report 1 hour before the event.",
      "Valid college ID card is mandatory.",
    ],
    eligibility: [
      "Open to bonafide college students.",
      "Participants must carry valid college ID card.",
    ],
    registration: {
      method: "Online Registration Only",
      deadline: "Before March 27, 2026",
      fee: "As per registration portal",
      link: "https://linktr.ee/Ekyam.vemanotsava",
    },
    prizes: [
      {
        position: "Winner",
        amount: "To Be Announced",
        description: "Trophy + Certificate",
      },
      {
        position: "Runner-Up",
        amount: "To Be Announced",
        description: "Certificate",
      },
    ],
    coordinators: [
      {
        name: "Nandan",
        contact: "7899589115",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
      {
        name: "Deepthi",
        contact: "8618968484",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
    ],
    faqs: [
      {
        question: "Can I perform in any language?",
        answer: "Yes, you may perform in any language as long as the content is appropriate.",
      },
      {
        question: "Is improvisation allowed?",
        answer: "Yes, improvisation is allowed but content must remain respectful and appropriate.",
      },
    ],
    minTeamSize: 1,
    maxTeamSize: 1,
    featured: false,
    gradient: "from-yellow-500 to-orange-500",
    price: 99,
  },

  //reel making
  {
    slug: "reel-making-competition",
    name: "Reel Making Competition",
    tagline: "Shoot. Edit. Create — All Within 60 Seconds!",
    description:
      "An exciting on-the-spot creative challenge where participants must shoot, edit, and submit a 60-second reel based on a randomly assigned theme. This event tests creativity, editing skills, and quick thinking.",
    date: "March 27, 2026",
    time: "6:30 PM",
    venue: "Vemana Institute of Technology",
    category: "Media & Creative",
    image: "/events/reel-making-competition.jpg",
    rules: [
      "Open to all college students (Inter-College).",
      "Participants may compete individually or as a team.",
      "Maximum reel duration: 60 seconds.",
      "Theme will be decided on the spot through chit selection.",
      "All content must be original and created during the event.",
      "No pre-recorded or pre-edited videos are allowed.",
      "Reels must not be posted on social media before results are declared.",
      "Final submission must be in MP4 format within the allotted time.",
    ],
    eligibility: [
      "Open to bonafide college students.",
      "Participants must carry valid college ID card.",
    ],
    registration: {
      method: "Online Registration Only",
      deadline: "Before March 27, 2026",
      fee: "As per registration portal",
      link: "https://linktr.ee/Ekyam.vemanotsava",
    },
    prizes: [
      {
        position: "Winner",
        amount: "To Be Announced",
        description: "Trophy + Certificate",
      },
      {
        position: "Runner-Up",
        amount: "To Be Announced",
        description: "Certificate",
      },
    ],
    coordinators: [
      {
        name: "Madhusudhan Raj",
        contact: "9353963147",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
      {
        name: "Ananth Kulkarni",
        contact: "7795776025",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
    ],
    faqs: [
      {
        question: "Can we prepare the reel beforehand?",
        answer: "No. The reel must be created strictly during the event time.",
      },
      {
        question: "Can we use any language?",
        answer: "Yes, reels can be made in English or any Indian regional language.",
      },
    ],
    minTeamSize: 1,
    maxTeamSize: 5,
    featured: false,
    gradient: "from-blue-500 to-cyan-500",
    price: 99,
  },
  // final cut short film
  {
    slug: "final-cut-short-film",
    name: "Final Cut – Short Film",
    tagline: "Direct. Create. Captivate.",
    description:
      "Final Cut – Vemanotsava Film Festival 2026 is a cinematic platform where participants present original short films. This event celebrates storytelling, direction, editing, and visual creativity.",
    date: "March 27, 2026",
    time: "11:00 AM (Screening: 12:00 PM – 1:00 PM)",
    venue: "Vemana Institute of Technology",
    category: "Media & Creative",
    image: "/events/final-cut-short-film.jpg",
    rules: [
      "Short film duration: 5–10 minutes.",
      "Content must be original and created by participants.",
      "Films can be in any language (subtitles recommended if not in English).",
      "No plagiarism — copied content will lead to disqualification.",
      "Films must not contain vulgar, offensive, or inappropriate content.",
      "Submission must be in MP4 format before the specified deadline.",
      "Participants must be present during screening.",
    ],
    eligibility: [
      "Open to bonafide college students.",
      "Participants must carry valid college ID card.",
    ],
    registration: {
      method: "Online Registration Only",
      deadline: "Before March 27, 2026",
      fee: "As per registration portal",
      link: "https://linktr.ee/Ekyam.vemanotsava",
    },
    prizes: [
      {
        position: "Best Short Film",
        amount: "To Be Announced",
        description: "Trophy + Certificate",
      },
      {
        position: "Runner-Up",
        amount: "To Be Announced",
        description: "Certificate",
      },
    ],
    coordinators: [
      {
        name: "Hitesh R Sulegai",
        contact: "7406573131",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
      {
        name: "Keerthana V",
        contact: "8088134399",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
    ],
    faqs: [
      {
        question: "Can we submit films made before the fest?",
        answer: "Yes, but the film must be original and created by the participants.",
      },
      {
        question: "Are subtitles mandatory?",
        answer: "Subtitles are recommended if the film is not in English.",
      },
    ],
    minTeamSize: 1,
    maxTeamSize: 10,
    featured: true,
    gradient: "from-indigo-500 to-blue-600",
    price: 99,
  },
  //esports
  {
    slug: "esports-tournament",
    name: "Esports Tournament",
    tagline: "Battle. Survive. Dominate.",
    description:
      "An adrenaline-filled competitive gaming tournament featuring popular titles like BGMI, Call of Duty Mobile, and Free Fire. Teams compete in knockout rounds leading to the ultimate championship showdown.",
    date: "March 27, 2026",
    time: "11:00 AM (Final Round)",
    venue: "Vemana Institute of Technology",
    category: "Esports",
    image: "/events/esports-tournament.jpg",
    rules: [
      "Games included: BGMI, Call of Duty Mobile, Free Fire.",
      "Participants must bring their own mobile devices.",
      "Stable internet connection will be provided by organizers.",
      "Team size depends on game mode (Squad mode preferred).",
      "No use of hacks, cheats, or unfair means.",
      "Players must report at least 30 minutes before match time.",
      "Decision of the judges and technical team will be final.",
    ],
    eligibility: [
      "Open to bonafide college students.",
      "Valid college ID card is mandatory.",
    ],
    registration: {
      method: "Online Registration Only",
      deadline: "Before March 27, 2026",
      fee: "As per registration portal",
      link: "https://linktr.ee/Ekyam.vemanotsava",
    },
    prizes: [
      {
        position: "Champion",
        amount: "To Be Announced",
        description: "Cash Prize + Trophy + Certificate",
      },
      {
        position: "Runner-Up",
        amount: "To Be Announced",
        description: "Certificate",
      },
    ],
    coordinators: [
      {
        name: "Shreyas",
        contact: "7019444158",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
      {
        name: "Pramod",
        contact: "7676456587",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
      {
        name: "Sumanth",
        contact: "9110640067",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
    ],
    faqs: [
      {
        question: "Do we need to bring our own devices?",
        answer: "Yes, participants must bring their own mobile devices for gameplay.",
      },
      {
        question: "Are emulator players allowed?",
        answer: "No, only mobile device gameplay is allowed.",
      },
    ],
    minTeamSize: 4,
    maxTeamSize: 5,
    featured: true,
    gradient: "from-red-500 to-orange-600",
    price: 269,
  },
  // treasure hunt
  {
    slug: "the-great-hunt-treasure-hunt",
    name: "The Great Hunt – Treasure Hunt",
    tagline: "Crack the Clues. Race the Clock. Claim the Treasure.",
    description:
      "An adventurous team-based challenge where participants solve riddles, decode clues, and complete tasks across multiple checkpoints to reach the final treasure. Strategy, speed, and teamwork are the keys to victory.",
    date: "March 27, 2026",
    time: "11:00 AM",
    venue: "Vemana Institute of Technology Campus",
    category: "Adventure",
    image: "/events/the-great-hunt.jpg",
    rules: [
      "Team size: 3–5 members.",
      "Each clue will lead to the next checkpoint.",
      "All team members must stay together throughout the hunt.",
      "No use of mobile phones or internet is allowed.",
      "Teams must check in at every checkpoint to receive the next clue.",
      "Any form of cheating will result in immediate disqualification.",
      "Judging criteria: Speed, Accuracy, Teamwork, and Strategy.",
    ],
    eligibility: [
      "Open to bonafide college students.",
      "All participants must carry valid college ID cards.",
    ],
    registration: {
      method: "Online Registration Only",
      deadline: "Before March 27, 2026",
      fee: "As per registration portal",
      link: "https://linktr.ee/Ekyam.vemanotsava",
    },
    prizes: [
      {
        position: "Winner",
        amount: "To Be Announced",
        description: "Cash Prize + Trophy + Certificate",
      },
      {
        position: "Runner-Up",
        amount: "To Be Announced",
        description: "Certificate",
      },
    ],
    coordinators: [
      {
        name: "C. Shashank",
        contact: "9110465773",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
      {
        name: "Sanjana H.N",
        contact: "9008419329",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
    ],
    faqs: [
      {
        question: "Can we split up to solve clues faster?",
        answer: "No. All team members must stay together throughout the hunt.",
      },
      {
        question: "Can we use Google to solve clues?",
        answer: "No, use of mobile phones or internet is strictly prohibited.",
      },
    ],
    minTeamSize: 3,
    maxTeamSize: 5,
    featured: false,
    gradient: "from-green-500 to-yellow-400",
    price: 269,
  },
  //can you guess
  {
    slug: "can-you-guess-quiz-competition",
    name: "Can You Guess?",
    tagline: "Think Fast. Answer Smart. Win Big.",
    description:
      "A multi-round quiz competition designed to test participants' knowledge, logical thinking, and quick decision-making skills across various domains including general knowledge, current affairs, entertainment, and more.",
    date: "March 27, 2026",
    time: "3:00 PM – 4:00 PM",
    venue: "ISE Seminar Hall (3rd Floor), Vemana Institute of Technology",
    category: "Quiz",
    image: "/events/can-you-guess.jpg",
    rules: [
      "Team size: 2 members per team.",
      "Multiple rounds will be conducted.",
      "No use of mobile phones or electronic devices.",
      "Quiz master’s decision will be final.",
      "In case of tie, a rapid-fire round will be conducted.",
      "Teams must report 30 minutes before the event.",
    ],
    eligibility: [
      "Open to bonafide college students.",
      "Participants must carry valid college ID cards.",
    ],
    registration: {
      method: "Online Registration Only",
      deadline: "Before March 27, 2026",
      fee: "As per registration portal",
      link: "https://linktr.ee/Ekyam.vemanotsava",
    },
    prizes: [
      {
        position: "Winner",
        amount: "To Be Announced",
        description: "Trophy + Certificate",
      },
      {
        position: "Runner-Up",
        amount: "To Be Announced",
        description: "Certificate",
      },
    ],
    coordinators: [
      {
        name: "Shamitha",
        contact: "8147751063",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
      {
        name: "Puneeth",
        contact: "7975873284",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
    ],
    faqs: [
      {
        question: "Can we participate individually?",
        answer: "No. The quiz is strictly a team event with 2 members per team.",
      },
      {
        question: "What happens in case of a tie?",
        answer: "A rapid-fire round will be conducted to determine the winner.",
      },
    ],
    minTeamSize: 2,
    maxTeamSize: 2,
    featured: false,
    gradient: "from-cyan-500 to-blue-600",
    price: 269,
  },
  //mr ms aura
  {
    slug: "mr-ms-aura",
    name: "Mr. & Ms. Aura",
    tagline: "Confidence. Charisma. Crown the Aura.",
    description:
      "A personality-based competition that celebrates confidence, talent, intelligence, and stage presence. Participants go through multiple rounds including introduction, talent showcase, and Q&A to compete for the prestigious Mr. & Ms. Aura title.",
    date: "March 27, 2026",
    time: "12:00 PM",
    venue: "Vemana Institute of Technology",
    category: "Personality",
    image: "/events/mr-ms-aura.jpg",
    rules: [
      "Solo participation only.",
      "Participants must be bonafide college students.",
      "Event consists of multiple rounds (Introduction, Talent, Q&A).",
      "Time limits must be strictly followed for each round.",
      "Content must be respectful and appropriate.",
      "Judges’ decision will be final and binding.",
    ],
    eligibility: [
      "Open to bonafide college students.",
      "Valid college ID card is mandatory.",
    ],
    registration: {
      method: "Online Registration Only",
      deadline: "Before March 27, 2026",
      fee: "As per registration portal",
      link: "https://linktr.ee/Ekyam.vemanotsava",
    },
    prizes: [
      {
        position: "Mr. Aura",
        amount: "To Be Announced",
        description: "Crown + Trophy + Certificate",
      },
      {
        position: "Ms. Aura",
        amount: "To Be Announced",
        description: "Crown + Trophy + Certificate",
      },
    ],
    coordinators: [
      {
        name: "Jeeva M",
        contact: "8904094150",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
      {
        name: "B. Yashaswini",
        contact: "9080971372",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
    ],
    faqs: [
      {
        question: "Is prior modeling experience required?",
        answer: "No. Confidence and personality matter more than experience.",
      },
      {
        question: "What rounds will be conducted?",
        answer: "The event includes Introduction, Talent Showcase, and Q&A rounds.",
      },
    ],
    minTeamSize: 1,
    maxTeamSize: 1,
    featured: true,
    gradient: "from-pink-500 to-purple-600",
    price: 99,
  },
  // canvas painting
  {
    slug: "canvas-painting",
    name: "Canvas Painting",
    tagline: "Paint Your Imagination. Frame Your Vision.",
    description:
      "A creative art competition where participants express their imagination and artistic skills on canvas based on a given theme. This event celebrates originality, technique, and visual storytelling.",
    date: "March 27, 2026",
    time: "4:00 PM",
    venue: "Vemana Institute of Technology",
    category: "Art",
    image: "/events/canvas-painting.jpg",
    rules: [
      "Solo participation only.",
      "Theme will be announced on the spot.",
      "Time limit: 2–3 hours.",
      "Participants must bring their own art materials.",
      "Canvas will be provided by organizers (if mentioned during briefing).",
      "Artwork must be original.",
      "No pre-drawn sketches allowed.",
    ],
    eligibility: [
      "Open to bonafide college students.",
      "Valid college ID card is mandatory.",
    ],
    registration: {
      method: "Online Registration Only",
      deadline: "Before March 27, 2026",
      fee: "As per registration portal",
      link: "https://linktr.ee/Ekyam.vemanotsava",
    },
    prizes: [
      {
        position: "Winner",
        amount: "To Be Announced",
        description: "Trophy + Certificate",
      },
      {
        position: "Runner-Up",
        amount: "To Be Announced",
        description: "Certificate",
      },
    ],
    coordinators: [
      {
        name: "Chaitra G",
        contact: "9738485144",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
      {
        name: "Meghana B N",
        contact: "6366039762",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
    ],
    faqs: [
      {
        question: "Will the theme be given beforehand?",
        answer: "No. The theme will be announced on the spot.",
      },
      {
        question: "Do we need to bring our own materials?",
        answer: "Yes. Participants must bring their own paints and brushes.",
      },
    ],
    minTeamSize: 1,
    maxTeamSize: 1,
    featured: false,
    gradient: "from-amber-500 to-orange-600",
    price: 99,
  },

  // shark tank
  {
    slug: "shark-tank-capital-quest",
    name: "Shark Tank – Capital Quest",
    tagline: "Pitch Bold. Think Big. Win Smart.",
    description:
      "A business idea pitching competition where participants present innovative startup concepts to a panel of judges. This event tests creativity, feasibility, presentation skills, and entrepreneurial mindset.",
    date: "March 27, 2026",
    time: "9:30 AM",
    venue: "Vemana Institute of Technology",
    category: "Business",
    image: "/events/shark-tank.jpg",
    rules: [
      "Team size: 1–4 members.",
      "Each team must present an original business idea.",
      "Pitch duration: 5–7 minutes followed by Q&A.",
      "Participants may use PPT or visual aids for presentation.",
      "Ideas must be feasible and practically implementable.",
      "Judges’ decision will be final.",
    ],
    eligibility: [
      "Open to bonafide college students.",
      "Participants must carry valid college ID card.",
    ],
    registration: {
      method: "Online Registration Only",
      deadline: "Before March 27, 2026",
      fee: "As per registration portal",
      link: "https://linktr.ee/Ekyam.vemanotsava",
    },
    prizes: [
      {
        position: "Best Business Idea",
        amount: "To Be Announced",
        description: "Trophy + Certificate",
      },
      {
        position: "Runner-Up",
        amount: "To Be Announced",
        description: "Certificate",
      },
    ],
    coordinators: [
      {
        name: "Likith",
        contact: "6361165164",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
      {
        name: "Jithesh",
        contact: "8722067551",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
    ],
    faqs: [
      {
        question: "Can we pitch an existing business idea?",
        answer: "Yes, but the idea must be original and presented uniquely by your team.",
      },
      {
        question: "Is prior business experience required?",
        answer: "No. Innovative thinking and presentation skills matter most.",
      },
    ],
    minTeamSize: 1,
    maxTeamSize: 4,
    featured: true,
    gradient: "from-emerald-500 to-teal-600",
    price: 269,
  },
  //fashion show
  {
    slug: "fashion-show",
    name: "Fashion Show",
    tagline: "Walk the Ramp. Own the Spotlight.",
    description:
      "A glamorous ramp walk competition where teams present a creative theme through coordinated costumes, choreography, and confident stage presence. This event celebrates fashion, creativity, and attitude.",
    date: "March 27, 2026",
    time: "6:30 PM",
    venue: "Vemana Institute of Technology",
    category: "Fashion",
    image: "/events/fashion-show.jpg",
    rules: [
      "Team size: 6–12 members.",
      "Each team must present a unique theme.",
      "Time limit: 8–10 minutes including introduction.",
      "Participants must arrange their own costumes and props.",
      "Themes must be respectful and appropriate.",
      "Use of fire, water, or hazardous materials is strictly prohibited.",
      "Judging criteria: Theme (30%), Coordination (25%), Creativity (25%), Confidence & Presentation (20%).",
    ],
    eligibility: [
      "Open to bonafide college students.",
      "All participants must carry valid college ID cards.",
    ],
    registration: {
      method: "Online Registration Only",
      deadline: "Before March 27, 2026",
      fee: "As per registration portal",
      link: "https://linktr.ee/Ekyam.vemanotsava",
    },
    prizes: [
      {
        position: "Winner",
        amount: "To Be Announced",
        description: "Trophy + Certificate",
      },
      {
        position: "Runner-Up",
        amount: "To Be Announced",
        description: "Certificate",
      },
    ],
    coordinators: [
      {
        name: "Akash R",
        contact: "9449751537",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
      {
        name: "Khushitha R L",
        contact: "9113571734",
        email: "",
        role: "Student Coordinator",
        image: "",
      },
    ],
    faqs: [
      {
        question: "Can we choose any theme?",
        answer: "Yes, but the theme must be appropriate and approved by the organizers.",
      },
      {
        question: "Are props allowed?",
        answer: "Yes, props are allowed but must not damage the stage or equipment.",
      },
    ],
    minTeamSize: 6,
    maxTeamSize: 12,
    featured: true,
    gradient: "from-rose-500 to-pink-600",
    price: 2000,
  },
];
