import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-16 pt-24">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-stone-500">
        What I&apos;ve built
      </p>
      <h2 className="mt-4 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
        Projects
      </h2>
      <p className="mt-4 max-w-2xl text-lg text-stone-600">
        A selection of full-stack apps, AI projects, and research work.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
