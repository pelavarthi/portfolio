export interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  liveUrlLabel?: string;
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    title: "CIO Clearinghouse",
    description:
      "Full-stack club discovery platform for UVA student organizations with authenticated profiles, searchable club listings, membership tracking, favorites, direct messaging, and role-based admin approval workflows.",
    tags: ["Django", "Python", "Auth", "Messaging", "Role-Based Access"],
    githubUrl: "https://github.com/pelavarthi/CIOClearinghouse",
  },
  {
    title: "Othello AI",
    description:
      "Othello game engine with GUI featuring multiple AI opponents using minimax and alpha-beta pruning strategies.",
    tags: ["Python", "Minimax", "Alpha-Beta Pruning", "Game AI"],
    githubUrl:
      "https://github.com/pelavarthi/Artificial-Intelligence/tree/main/Unit%203",
    demoUrl: "/projects/othello",
  },
  {
    title: "COVLIAS 1.0 Study",
    description:
      "Analysis of ML models' ability to predict COVID severity from CT scans. Co-authored paper published in the journal Diagnostics.",
    tags: ["Machine Learning", "Research", "Medical Imaging"],
    liveUrl: "https://pubmed.ncbi.nlm.nih.gov/34829372/",
    liveUrlLabel: "Learn More",
  },
  {
    title: "AR Drone Control",
    description:
      "An intuitive augmented reality drone control system where users control drone movements via hand gestures. Presented findings at TJSTAR.",
    tags: ["Unity", "Flask", "Python", "Mixed Reality"],
    liveUrl: "https://docs.google.com/presentation/d/1EO5hcERbS8VcNu1L2MWJ6d4nRspYdyikLplJnwtp2Gk/edit?usp=sharing",
    liveUrlLabel: "Learn More",
  },
  {
    title: "PickupGame",
    description:
      "A platform to help users find and organize local basketball pickup games.",
    tags: ["Full-stack"],
    githubUrl: "https://github.com/pelavarthi/PickupGame",
  },
  {
    title: "Neural Network from Scratch",
    description:
      "Multi-layer neural network built without libraries, implementing forward propagation, backpropagation, and gradient descent to classify 2D points. Trained on 30k samples.",
    tags: ["Python", "Neural Networks", "Backpropagation"],
    githubUrl:
      "https://github.com/pelavarthi/Artificial-Intelligence/blob/main/Unit%206/Unit6Lab3.py",
  },
  {
    title: "Crossword Generator",
    description:
      "Generates symmetric crossword puzzles using backtracking, constraint satisfaction, regex pattern matching, and flood-fill connectivity validation.",
    tags: ["Python", "Backtracking", "Constraint Satisfaction"],
    githubUrl:
      "https://github.com/pelavarthi/Artificial-Intelligence/blob/main/Unit%205/crossword.py",
  },
  {
    title: "Portfolio",
    description:
      "This website you're currently on!",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/pelavarthi/portfolio",
  },
];
