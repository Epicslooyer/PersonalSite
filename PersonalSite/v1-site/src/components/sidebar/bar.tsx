"use client"
import React from "react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "../ui/theme-toggle"; // Re-add ThemeToggle import
import Node from "./node";
import type { FileSysNode } from "../terminal/terminal";

interface BarProps {
    tree: FileSysNode[];
    onFileClick: (command: string) => void;
}

export default function SideBar({ tree, onFileClick }: BarProps) {
    const { theme } = useTheme();
    const sidebarBg = theme === 'dark' ? 'bg-[#1e2029]' : 'bg-gray-100'; 
    const textColour = theme === 'dark' ? 'text-[#a9b1d6]' : 'text-gray-700';
    const titleColour = theme === 'dark' ? 'text-[#c0caf5]' : 'text-gray-500'; 
    const hoverBg = theme === 'dark' ? 'hover:bg-[#24283b]' : 'hover:bg-gray-200'; 
    const borderColour = theme === 'dark' ? 'border-[#3b4261]' : 'border-gray-300';

     return (
    <div className={`w-60 h-screen ${sidebarBg} ${textColour} flex flex-col border-r ${borderColour}`}>
      <div className="flex-1 overflow-y-auto px-1 pt-2">
        <h2 className={`text-md uppercase font-semibold mb-2 px-1 ${titleColour}`}>Explorer</h2>
        <ul className="space-y-1">
          {tree.map((node, index) => (
            <Node
              key={node.name}
              node={node}
              onClick={onFileClick}
              level={0} 
              isLast={index === tree.length - 1}
              hoverBg={hoverBg}
            />
          ))}
        </ul>      </div>

      {/* Add ThemeToggle back */}
      <div className="p-2 border-t flex justify-start items-center">
        <ThemeToggle inSidebar={true} />
      </div>
    </div>
  );
}