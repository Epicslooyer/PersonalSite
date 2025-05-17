import React from "react";
import { useTheme } from "next-themes";

export interface TerminalEntry {
  type: "input" | "output";
  value: string | React.ReactElement;
}

export default function TerminalOutput({ entries }: { entries: TerminalEntry[] }) {
  const { theme } = useTheme();

  const inputColor = theme === 'dark' ? 'text-green-400' : 'text-green-600';
  const outputColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-800';
  const promptColor = theme === 'dark' ? 'text-gray-500' : 'text-gray-400';
  const lineNumberColor = theme === 'dark' ? 'text-gray-600' : 'text-gray-400';

  return (
    <div className="flex flex-col gap-1">
      {entries.map((entry, idx) => (
        <div key={idx} className="flex"> {/* Use flex to align line number and content */}
          {/* Line Number */}
          <span className={`w-8 pr-2 text-right select-none ${lineNumberColor}`}>
            {idx + 1}
          </span>
          {/* Entry Content */}
          <div className="flex-1">
            {entry.type === "input" ? (
              <div className={inputColor}>
                <span className={promptColor}>$</span> {entry.value}
              </div>
            ) : (
              <div className={outputColor}>
                {typeof entry.value === 'string' ? (
                  <pre className="whitespace-pre-wrap">{entry.value}</pre>
                ) : (
                  entry.value
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}