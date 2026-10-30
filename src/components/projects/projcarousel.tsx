"use client";
import { useState } from "react";
import { projects, projectFilters } from "@/data/projects";
import ProjectCard from "./proj";

const labels: Record<(typeof projectFilters)[number], string> = {
  all: "all",
  ml: "ml",
  web: "web",
  automation: "auto",
  systems: "sys",
};

export default function ProjectGrid() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("all");
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="w-full max-w-3xl py-2">
      <div className="flex flex-wrap gap-2 mb-4">
        {projectFilters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 text-xs font-mono rounded border ${
              filter === f
                ? "bg-blue-600 border-blue-400 text-white"
                : "bg-gray-900 border-gray-700 text-gray-300 hover:border-blue-500"
            }`}
          >
            {labels[f]}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {visible.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
