export type SkillGroup = {
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "C++", "C", "C#", "SQL", "Bash", "Lua", "HTML/CSS"],
  },
  {
    label: "ML & data",
    items: ["PyTorch", "Pandas", "NumPy", "SciPy", "Scikit-learn", "Jupyter"],
  },
  {
    label: "Web",
    items: ["Next.js", "React", "Convex", "Express", "Flask", "Tailwind", "Node.js"],
  },
  {
    label: "Systems & cloud",
    items: ["Docker", "ROS1", "AWS", "PostgreSQL", "MongoDB", "Redis", "Linux", "Git", "CI/CD"],
  },
];

export const roadmap = [
  {
    year: "2021–22",
    label: "Games",
    stack: "C# · Unity",
    description: "Single-player and multiplayer prototypes. This is still how I think about interaction.",
  },
  {
    year: "2023",
    label: "CS foundations",
    stack: "Java · C · Python",
    description: "OOP without an engine, then SFU: data structures, systems programming, discrete math.",
  },
  {
    year: "2024",
    label: "Research + teaching",
    stack: "PyTorch · ROS · React",
    description: "Tangent Lab CNN + Z1 arm. Science Alive workshops. First serious web apps.",
  },
  {
    year: "2025",
    label: "Realtime products",
    stack: "Convex · Next.js · Playwright",
    description: "Code Royale at StormHacks. Stock monitoring. Gesture pipeline published as Z1-LeapC.",
  },
  {
    year: "2026",
    label: "Applied data",
    stack: "Python · SQL · OCPP telemetry",
    description: "Clockwork Energy: root-cause analysis on thousands of live EV chargers.",
  },
];
