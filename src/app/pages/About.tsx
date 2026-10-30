import React from "react";
import Skills from "@/components/about/Skills";
import Roadmap from "@/components/about/Roadmap";
import GithubActivity from "@/components/about/GithubActivity";
import { profile } from "@/data/profile";

export default function About() {
  return (
    <div className="flex flex-col w-full max-w-3xl py-2 gap-8">
      <section>
        <h2 className="font-mono text-xl text-blue-400 mb-2">About</h2>
        <p className="leading-relaxed">{profile.summary}</p>
      </section>

      <section>
        <h2 className="font-mono text-xl text-blue-400 mb-2">Education</h2>
        <div className="font-mono text-sm">
          <div className="text-gray-100">{profile.education.degree}</div>
          <div className="text-blue-300">
            {profile.education.school} · {profile.education.dates}
          </div>
          <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
            {profile.education.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 className="font-mono text-xl text-blue-400 mb-2">Roadmap</h2>
        <Roadmap />
      </section>

      <section>
        <h2 className="font-mono text-xl text-blue-400 mb-2">Skills</h2>
        <Skills />
      </section>

      <section>
        <h2 className="font-mono text-xl text-blue-400 mb-2">GitHub</h2>
        <GithubActivity usernames={[...profile.githubUsernames]} />
      </section>
    </div>
  );
}
