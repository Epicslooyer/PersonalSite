import React from "react";
import { useTheme } from "next-themes";
import { terminalmode } from "../utilityterminal";


interface BottomProp {
  mode: terminalmode;
}

export default function Bottom({ mode }: BottomProp) {
    const { theme } = useTheme();
  const barBg = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200';
  const textColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const modeColor = theme === 'dark' ? 'text-yellow-400' : 'text-blue-600';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-300';

  return (
    <div className={`flex justify-between items-center px-3 py-1 border-t ${barBg} ${borderColor} ${textColor} text-xs`}>
      <div className={`font-bold uppercase ${modeColor}`}>
        -- {mode} --
      </div>

      <div>
        Press <kbd className={`px-1 rounded ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`}>:</kbd> for command
      </div>
    </div>
  );
}