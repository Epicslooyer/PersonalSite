"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { useTheme } from "next-themes";
import { FaGithub } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";

interface ProjectProps {
  title: string;
  description: string[];
  tags: string[];
  image: string;
  githubLink: string;
  siteLink: string;
}

export default function Project({ title, description, tags, image, githubLink, siteLink }: ProjectProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`w-full h-full p-4 ${isDark ? "bg-gray-900" : "bg-gray-100"} rounded-lg border ${isDark ? "border-gray-700" : "border-gray-300"}`}>
      <div className="flex flex-col h-full">
        <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
          <Image 
            src={image} 
            alt={title}
            fill 
            className="w-full h-full object-cover"
          />
        </div>

        <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          {title}
        </h3>

        <div className={`flex-1 mb-4 ${isDark ? "text-gray-300" : "text-gray-700"} min-h-[100px]`}>
          <TypeAnimation
            sequence={description}
            wrapper="p"
            speed={50}
            repeat={0}
            cursor={true}
            className="text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className={`px-2 py-1 text-xs rounded-full ${
                isDark 
                  ? "bg-gray-800 text-gray-300" 
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-auto">
          <a 
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full hover:bg-opacity-80 transition-colors ${
              isDark 
                ? "bg-gray-800 hover:bg-gray-700" 
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            <FaGithub className={`w-5 h-5 ${isDark ? "text-gray-300" : "text-gray-700"}`} />
          </a>
          <a 
            href={siteLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full hover:bg-opacity-80 transition-colors ${
              isDark 
                ? "bg-gray-800 hover:bg-gray-700" 
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            <FaExternalLinkAlt className={`w-5 h-5 ${isDark ? "text-gray-300" : "text-gray-700"}`} />
          </a>
        </div>
      </div>
    </div>
  );
}
