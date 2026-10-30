import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <div className="flex flex-col w-full max-w-3xl py-2 gap-6">
      <h2 className="font-mono text-xl text-blue-400">Experience</h2>
      <ol className="relative border-l border-blue-900/80 ml-2 space-y-8">
        {experience.map((job) => (
          <li key={job.org + job.role} className="pl-6">
            <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-blue-500 border border-blue-300" />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-mono text-gray-100">{job.role}</h3>
              <span className="text-blue-300 text-sm">{job.org}</span>
            </div>
            <div className="text-xs text-gray-500 font-mono mb-2">
              {job.dates} · {job.location}
            </div>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
              {job.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
