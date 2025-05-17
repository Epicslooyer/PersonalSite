"use client";
import React, { useRef, useEffect } from "react";
import { animate, createScope, Scope } from "animejs";

interface RoadmapNode {
  year: string;
  label: string;
  language: string;
  description: string;
}

const roadmapData: RoadmapNode[] = [
  { year: "2022", label: "Game Development", language: "C# and Unity", description: "Started developing singleplayer and multiplayer games with Unity." },
  { year: "2023", label: "Object Oriented Programming", language: "Java", description: "Developed games in Java using OOP to make games without an engine." },
  { year: "2024", label: "Web Development", language: "Typescript/React", description: "Interested in creating websites, Javascript/HTML/CSS with React." },
  { year: "Current", label: "Backend", language: "Typescript/Python/C/SQL", description: "Currently learning backend to become a full stack developer." },
];

export default function Roadmap() {
  const rootref = useRef<HTMLDivElement | null>(null);
  const scope = useRef<Scope | null>(null);
  const scrollref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if(!rootref.current) return;
    scope.current = createScope({ root : rootref.current });
    scope.current.add(() => {
      animate('.roadmap-node', {
        translateY: [40, 0],
        opacity: [0, 1],
        delay: (el, i) => i * 100,
        duration: 700,
        easing: "out(3)",
      });

      animate('.timeline-line', {
        scaleX: [0, 1],
        transformOrigin: 'left',
        duration: 700,
        easing: "easeOutExpo",
      });
    });
    return () => scope.current?.revert?.();
  }, []);

  const scroll = (offset: number) => {
    if(!rootref.current) return;
    scrollref.current?.scrollTo({
      left: offset,
      behavior: "smooth",
    });
  }


  return (
    <div className="w-full flex flex-col items-center py-8" ref={rootref}>


      
      <div className="relative w-full px-6">
        <div className="absolute top-[32px] w-full left-0 right-0 h-0.5 bg-blue-300 z-0" />

        <div className="grid grid-flow-col auto-cols-max gap-16 relative z-10">
          {roadmapData.map((node, idx) => (
            <div
              key={node.year}
              className="roadmap-node group flex flex-col items-center cursor-pointer relative z-10"
              style={{ marginTop: "20px" }}
              onMouseEnter={() => {
                animate(`.dot-${idx}`, {
                  scale: [
                    { to: 1.25, duration: 150, easing: 'out(3)' },
                    { to: 1, duration: 300, easing: 'spring(1, 80, 10, 0)' }
                  ],
                });
              }}
            >
              <div className={`dot-${idx} w-5 h-5 rounded-full bg-blue-500 border-2 border-blue-300`} />

              <div className="font-mono text-xs text-blue-400 mt-2">{node.year}</div>
              <div className="font-mono text-xs text-gray-300">{node.label}</div>

              <div className="absolute -top-24 left-1/2 -translate-x-1/2 z-20 hidden group-hover:flex flex-col bg-gray-900 text-gray-100 rounded px-4 py-2 shadow-lg min-w-[180px] border border-blue-400 transition-all duration-200">
                <div className="font-bold text-blue-300">{node.language}</div>
                <div className="text-xs mt-1">{node.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 