import React from "react";
import { FaJs, FaPython, FaReact, FaNodeJs, FaDocker, FaGitAlt, FaLinux  } from "react-icons/fa";
import { SiTypescript, SiGnubash, SiC} from "react-icons/si";
import { DiPostgresql } from "react-icons/di";

const skills = [
  { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
  { name: "Typescript", icon: <SiTypescript className="text-blue-400" /> },
  { name: "C", icon: <SiC className="text-blue-400" /> },
  { name: "Bash", icon: <SiGnubash className="text-blue-400" /> },
  { name: "Python", icon: <FaPython className="text-blue-400" /> },
  { name: "React", icon: <FaReact className="text-cyan-400" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
  { name: "Docker", icon: <FaDocker className="text-blue-300" /> },
  { name: "Git", icon: <FaGitAlt className="text-orange-500" /> },
  { name: "Linux", icon: <FaLinux className="text-gray-400" /> },
  { name: "SQL", icon: <DiPostgresql className="text-indigo-400" /> },
];

export default function Skills() {
  return (
    <div className="w-full max-w-lg py-4">
      <div className="grid grid-cols-4 gap-3">
        {skills.map(skill => (
          <div key={skill.name} className="flex flex-col items-center gap-1 p-2 bg-gray-800 rounded font-mono">
            <div className="text-xl">{skill.icon}</div>
            <div className="text-gray-200 text-xs">{skill.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 