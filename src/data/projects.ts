export interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    title: "AR Drone Control",
    description:
      "An intuitive augmented reality drone control system where users control drone movements via hand gestures. Presented findings at TJSTAR.",
    tags: ["Unity", "Flask", "Python", "Mixed Reality"],
  },
  {
    title: "COVLIAS 1.0 Study",
    description:
      "Analysis of ML models' ability to predict COVID severity from CT scans. Co-authored paper published in the journal Diagnostics.",
    tags: ["Machine Learning", "Research", "Medical Imaging"],
    liveUrl: "https://pubmed.ncbi.nlm.nih.gov/34829372/",
  },
];
