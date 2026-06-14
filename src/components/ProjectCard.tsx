import Link from "next/link";
import { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group rounded-xl border border-stone-200 bg-stone-50/50 p-6 transition-all hover:border-stone-300 hover:bg-stone-50 hover:shadow-sm">
      <h3 className="text-lg font-semibold text-stone-900">{project.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-stone-600">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex gap-3">
        {project.demoUrl && (
          <Link
            href={project.demoUrl}
            className="rounded-full bg-stone-900 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-stone-700"
          >
            Try Demo
          </Link>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-stone-600 underline-offset-4 hover:text-stone-900 hover:underline"
          >
            Code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-stone-900 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-stone-700"
          >
            {project.liveUrlLabel || "Live Demo"}
          </a>
        )}
      </div>
    </div>
  );
}
