import { COMMAND_NAMES } from "@/data/commands";
import { profile } from "@/data/profile";

const hints: Record<string, string> = {
  help: "this menu",
  about: "bio, skills, github heatmap",
  experience: "Clockwork, Tangent Lab, Science Alive",
  projects: "Code Royale, robotics, automation",
  lab: "interactive CNN in the browser",
  resume: "open resume.pdf",
  contact: "email / github / linkedin",
  clear: "wipe the buffer",
};

export default function Help() {
  return (
    <div className="flex flex-col gap-4 max-w-2xl py-2">
      <div>
        <h2 className="font-mono text-xl text-blue-400">SajanOS 2.0</h2>
        <p className="text-sm text-gray-400 mt-1">
          {profile.name} — {profile.title}. Press{" "}
          <kbd className="px-1 bg-gray-800 rounded">:</kbd> then a command, or click the explorer.
        </p>
      </div>
      <ul className="font-mono text-sm space-y-1">
        {COMMAND_NAMES.map((name) => (
          <li key={name}>
            <span className="text-green-400">:{name}</span>
            <span className="text-gray-500"> — {hints[name]}</span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-gray-500">
        vim keys: <span className="text-gray-300">i</span> insert ·{" "}
        <span className="text-gray-300">:</span> command ·{" "}
        <span className="text-gray-300">Esc</span> normal ·{" "}
        <span className="text-gray-300">Tab</span> complete
      </p>
    </div>
  );
}
