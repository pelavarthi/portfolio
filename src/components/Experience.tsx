import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Experience
      </h2>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Where I&apos;ve worked and what I&apos;ve built.
      </p>

      <div className="mt-10 space-y-10">
        {experiences.map((exp) => (
          <div
            key={exp.company + exp.role}
            className="group relative border-l-2 border-zinc-200 pl-8 dark:border-zinc-800"
          >
            {/* Timeline dot */}
            <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-zinc-300 bg-white transition-colors group-hover:border-blue-500 dark:border-zinc-700 dark:bg-zinc-950 dark:group-hover:border-blue-400" />

            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold">{exp.company}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {exp.role}
                </p>
              </div>
              <span className="shrink-0 text-sm text-zinc-500 dark:text-zinc-500">
                {exp.period}
              </span>
            </div>

            <ul className="mt-3 space-y-2">
              {exp.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
                >
                  <span className="mr-2 text-zinc-400 dark:text-zinc-600">
                    &bull;
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-3 flex flex-wrap gap-2">
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
