import { skillGroups } from "@/data/skills";

export default function Skills() {
  return (
    <div className="w-full py-2 flex flex-col gap-5">
      {skillGroups.map((group) => (
        <div key={group.label}>
          <h3 className="font-mono text-xs uppercase tracking-wider text-gray-500 mb-2">{group.label}</h3>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <span
                key={item}
                className="px-2 py-1 text-xs font-mono rounded bg-gray-800 text-gray-200 border border-gray-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
