export interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    title: "Project One",
    description:
      "A brief description of your first project. Replace this with your actual project details.",
    tags: ["React", "TypeScript", "Tailwind"],
    githubUrl: "https://github.com/yourusername/project-one",
    liveUrl: "https://project-one.vercel.app",
  },
  {
    title: "Project Two",
    description:
      "A brief description of your second project. Replace this with your actual project details.",
    tags: ["Next.js", "Node.js", "PostgreSQL"],
    githubUrl: "https://github.com/yourusername/project-two",
  },
  {
    title: "Project Three",
    description:
      "A brief description of your third project. Replace this with your actual project details.",
    tags: ["Python", "FastAPI", "Docker"],
    githubUrl: "https://github.com/yourusername/project-three",
    liveUrl: "https://project-three.vercel.app",
  },
];
