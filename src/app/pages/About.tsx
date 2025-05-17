import React from "react";
import Skills from "@/components/about/Skills";
import Roadmap from "@/components/about/Roadmap";
import GithubActivity from "@/components/about/GithubActivity";

export default function About() {
    return (
        <div className="flex flex-col min-h-[80vh] w-full max-w-3xl py-4 gap-8">

      <section className="w-full flex flex-col">
        <h2 className="font-mono text-xl text-blue-400 mb-2">About Me</h2>
        <p>
          I began my journey as a software developer in 2021, tinkering around with code for building my own games in C#/Unity. 
          From there, I expanded into learning more programming concepts through Python, and then OOP through Java.
          Throughout university, I learned more about theory, specifically data structures, system programming in C, and ML/RL. 
          In the future, I hope to further lean into software development and data analysis.
        </p>
      </section>
      <section className="w-full flex flex-col">
        <h2 className="font-mono text-xl text-blue-400 mb-2">Developer Roadmap</h2>
        <Roadmap />
      </section>
      <section className="w-full flex flex-col">
        <h2 className="font-mono text-xl text-blue-400 mb-2">Skills</h2>
        <Skills />
      </section>
      <section className="w-full flex flex-col">
        <h2 className="font-mono text-xl text-blue-400 mb-2">GitHub Activity</h2>
        <GithubActivity usernames={["EpicaltCMPT", "Epicslooyer"]} />
      </section>
    </div>
    );
}
