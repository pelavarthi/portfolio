import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-4xl px-6 py-24">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Projects
      </h2>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        A few things I&apos;ve built recently.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
