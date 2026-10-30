export type Project = {
  title: string;
  blurb: string;
  points: string[];
  tags: string[];
  category: "ml" | "web" | "automation" | "systems";
  github?: string;
  site?: string;
  accent: string;
};

export const projects: Project[] = [
  {
    title: "Code Royale",
    blurb: "Jackbox-style multiplayer for coding interviews.",
    points: [
      "Convex backend + Next.js client for live rooms, scores, timers, and power-ups.",
      "Spectate mode held up at 100+ concurrent users during StormHacks 2025.",
    ],
    tags: ["Convex", "Next.js", "TypeScript", "Bun"],
    category: "web",
    github: "https://github.com/Epicslooyer/Stormhacks",
    site: "https://stormhacks.vercel.app",
    accent: "from-violet-600 to-sky-500",
  },
  {
    title: "Z1 × LeapC Pipeline",
    blurb: "Gesture in, robotic arm out.",
    points: [
      "Experimental Leap Motion → Unitree Z1 pipeline from Tangent Lab research.",
      "CNN classifications fed a Q-learning policy for adaptive control.",
    ],
    tags: ["C++", "Python", "PyTorch", "ROS1"],
    category: "ml",
    github: "https://github.com/Epicslooyer/Z1-LeapC",
    accent: "from-emerald-600 to-lime-500",
  },
  {
    title: "Pokemon Stock Checker",
    blurb: "High-frequency availability monitor for Amazon.ca restocks.",
    points: [
      "Async HTTP polling, Playwright sessions, and Amazon TVSS signals for product availability.",
      "Seller and price checks, reconnect logic, event logs, and a dashboard across 100+ tracked attempts.",
    ],
    tags: ["Python", "asyncio", "Playwright"],
    category: "automation",
    github: "https://github.com/Epicslooyer/PokemonCenter",
    accent: "from-amber-500 to-rose-500",
  },
  {
    title: "SFU Scrape Bot",
    blurb: "Course and schedule data off Coursys / SFU pages.",
    points: [
      "Python scraper used to feed a schedule-maker UI for picking conflict-free course sets.",
    ],
    tags: ["Python", "React", "Tailwind"],
    category: "automation",
    github: "https://github.com/Epicslooyer/SFUScrapeBot",
    accent: "from-red-600 to-orange-400",
  },
  {
    title: "AVTT",
    blurb: "Security runner for Node.js web apps.",
    points: [
      "CLI that exercises common web-framework footguns and reports what broke.",
    ],
    tags: ["JavaScript", "Node.js", "Security"],
    category: "systems",
    github: "https://github.com/Epicslooyer/AVTT",
    accent: "from-slate-500 to-cyan-500",
  },
];

export const projectFilters = ["all", "ml", "web", "automation", "systems"] as const;
