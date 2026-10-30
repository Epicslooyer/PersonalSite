"use client";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="h-full flex flex-col rounded-lg border border-gray-700 bg-gray-900/80 overflow-hidden">
      <div className={`h-20 bg-gradient-to-r ${project.accent} flex items-end p-3`}>
        <h3 className="text-lg font-bold text-white drop-shadow">{project.title}</h3>
      </div>
      <div className="flex flex-col flex-1 p-4 gap-3">
        <p className="text-sm text-gray-300">{project.blurb}</p>
        <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
          {project.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-[10px] rounded-full bg-gray-800 text-gray-300">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-3 pt-1">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
              aria-label={`${project.title} GitHub`}
            >
              <FaGithub className="w-4 h-4 text-gray-300" />
            </a>
          )}
          {project.site && (
            <a
              href={project.site}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
              aria-label={`${project.title} live site`}
            >
              <FaExternalLinkAlt className="w-4 h-4 text-gray-300" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
