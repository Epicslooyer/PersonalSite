import React from 'react';
import { useTheme } from 'next-themes';

interface topProp {
    currentpage: string;
}

export default function Top({ currentpage }: topProp) {
    const { theme } = useTheme();
  const barBg = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200';
  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-300';

  return (
    <div className={`flex justify-between items-center px-3 py-1 border-b ${barBg} ${borderColor}`}>
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" title="Close"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer" title="Minimize"></div>
        <div className="w-3 h-3 rounded-full bg-green-500 cursor-pointer" title="Maximize"></div>
      </div>

      <div className={`text-sm font-medium ${textColor}`}>
        {currentpage}
      </div>

      <div className="w-16"></div> 
    </div>
  );
}