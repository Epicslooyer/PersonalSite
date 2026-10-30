export type FileSysNode = {
  name: string;
  type: "file" | "folder";
  icon?: string;
  command?: string;
  children?: FileSysNode[];
};

export const COMMAND_NAMES = [
  "help",
  "about",
  "experience",
  "projects",
  "lab",
  "resume",
  "contact",
  "clear",
] as const;

export type CommandName = (typeof COMMAND_NAMES)[number];

export const COMMAND_ALIASES: Record<string, CommandName> = {
  experimental: "lab",
  exp: "experience",
  proj: "projects",
  ls: "help",
  "?": "help",
};

export const fileSysTree: FileSysNode[] = [
  {
    name: "pages",
    type: "folder",
    children: [
      { name: "about.md", command: "about", type: "file" },
      { name: "experience.md", command: "experience", type: "file" },
      { name: "projects.md", command: "projects", type: "file" },
      { name: "lab.tsx", command: "lab", type: "file" },
      { name: "contact.md", command: "contact", type: "file" },
      { name: "resume.pdf", command: "resume", type: "file" },
    ],
  },
  {
    name: "config",
    type: "folder",
    children: [{ name: "help.txt", command: "help", type: "file" }],
  },
];
