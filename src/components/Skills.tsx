const skillCategories = [
  {
    label: "Languages",
    items: [
      "Python",
      "Java",
      "JavaScript",
      "TypeScript",
      "C",
      "R",
      "x86 Assembly",
      "HTML/CSS",
    ],
  },
  {
    label: "Tools & Frameworks",
    items: [
      "Docker",
      "MongoDB",
      "MySQL",
      "Angular",
      "Tableau",
      "Unity",
      "Git",
      "AWS",
      "MATLAB",
    ],
  },
  {
    label: "Other",
    items: [
      "Agile",
      "Test-Driven Development",
      "Augmented Reality",
      "Mobile Development",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Skills</h2>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Technologies and tools I work with.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat) => (
          <div key={cat.label}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
              {cat.label}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-zinc-200 px-3 py-1.5 text-sm text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
