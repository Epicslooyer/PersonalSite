"use client";
import React, { useRef, useEffect } from "react";
import { animate, createScope, Scope } from "animejs";
import { roadmap } from "@/data/skills";

export default function Roadmap() {
  const rootref = useRef<HTMLDivElement | null>(null);
  const scope = useRef<Scope | null>(null);

  useEffect(() => {
    if (!rootref.current) return;
    scope.current = createScope({ root: rootref.current });
    scope.current.add(() => {
      animate(".roadmap-node", {
        translateY: [24, 0],
        opacity: [0, 1],
        delay: (_el, i) => i * 90,
        duration: 600,
        easing: "out(3)",
      });
    });
    return () => scope.current?.revert?.();
  }, []);

  return (
    <div className="w-full overflow-x-auto py-6" ref={rootref}>
      <div className="relative min-w-max px-4">
        <div className="absolute top-[28px] left-4 right-4 h-px bg-blue-900" />
        <div className="grid grid-flow-col auto-cols-max gap-10 relative z-10">
          {roadmap.map((node, idx) => (
            <div
              key={node.year}
              className="roadmap-node group flex flex-col items-center cursor-default relative"
              onMouseEnter={() => {
                animate(`.dot-${idx}`, {
                  scale: [
                    { to: 1.25, duration: 150, easing: "out(3)" },
                    { to: 1, duration: 300, easing: "spring(1, 80, 10, 0)" },
                  ],
                });
              }}
            >
              <div className={`dot-${idx} w-4 h-4 rounded-full bg-blue-500 border-2 border-blue-300`} />
              <div className="font-mono text-xs text-blue-400 mt-2">{node.year}</div>
              <div className="font-mono text-xs text-gray-200">{node.label}</div>
              <div className="absolute -top-28 left-1/2 -translate-x-1/2 z-20 hidden group-hover:flex flex-col bg-gray-900 text-gray-100 rounded px-3 py-2 shadow-lg w-52 border border-blue-400">
                <div className="font-bold text-blue-300 text-xs">{node.stack}</div>
                <div className="text-xs mt-1 text-gray-300">{node.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
