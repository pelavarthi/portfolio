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
    title: "Neural Network from Scratch",
    description:
      "Multi-layer neural network built without libraries, implementing forward propagation, backpropagation, and gradient descent to classify 2D points. Trained on 30k samples.",
    tags: ["Python", "Neural Networks", "Backpropagation"],
    githubUrl:
      "https://github.com/pelavarthi/Artificial-Intelligence/blob/main/Unit%206/Unit6Lab3.py",
    demoUrl: "/projects/neural-network",
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
    title: "Railroad Pathfinding",
    description:
      "Pathfinding across a real US railroad network using BFS, bidirectional BFS, A*, bidirectional A*, and tri-directional search with GUI visualization.",
    tags: ["Python", "A*", "Graph Algorithms", "Haversine"],
    githubUrl:
      "https://github.com/pelavarthi/Artificial-Intelligence/blob/main/Unit%201/Elavarthi_Pranav_U1_Lab7_Railroad_shell.py",
    demoUrl: "/projects/railroad",
  },
  {
    title: "Crossword Generator",
    description:
      "Generates symmetric crossword puzzles using backtracking, constraint satisfaction, regex pattern matching, and flood-fill connectivity validation.",
    tags: ["Python", "Backtracking", "Constraint Satisfaction"],
    githubUrl:
      "https://github.com/pelavarthi/Artificial-Intelligence/blob/main/Unit%205/crossword.py",
    demoUrl: "/projects/crossword",
  },
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
    liveUrlLabel: "Learn More",
  },
];
