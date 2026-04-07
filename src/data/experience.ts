export interface Experience {
  company: string;
  role: string;
  period: string;
  bullets: string[];
  tags: string[];
}

export const experiences: Experience[] = [
  {
    company: "GuidePoint Security",
    role: "Cybersecurity Engineer Intern",
    period: "Sep 2025 — Dec 2025",
    bullets: [
      "Built a Python CLI tool to automate end-to-end SOC environment deployment, orchestrating VM provisioning via Ludus/Proxmox and triggering Ansible playbooks for configuration",
      "Integrated core SOC tooling including Splunk (SIEM), Velociraptor (EDR), Tenable/OpenVAS, Wireshark, and Splunk Forwarder across segmented VLANs",
      "Reduced SOC lab deployment time from 2–6 weeks to ~30 minutes — ~99.6% faster setup",
    ],
    tags: ["Python", "Ansible", "Splunk", "Proxmox"],
  },
  {
    company: "Amp Health",
    role: "Software Engineer Intern",
    period: "Jun 2025 — Aug 2025",
    bullets: [
      "Developed a mobile app using Ionic/Angular with real-time computer vision via Google MediaPipe for biomechanical movement tracking on iOS and Android",
      "Built responsive UI with camera integration, real-time canvas overlays, and touch-optimized controls at 30+ FPS",
      "Replaced a third-party SDK costing $8,000/month with a custom MediaPipe solution",
    ],
    tags: ["Angular", "Ionic", "MediaPipe", "Mobile"],
  },
  {
    company: "Obscurity Labs",
    role: "Software Engineer Intern",
    period: "Jul 2023 — Aug 2023",
    bullets: [
      "Developed a CLI and API tool using Python and Unix to extract file metadata from Windows VHDs",
      "Created a web interface for interacting with metadata and hash information",
      "Built a REST API for file metadata lookups backed by MongoDB",
    ],
    tags: ["Python", "MongoDB", "REST API"],
  },
  {
    company: "Fairfax Collegiate",
    role: "Assistant Instructor",
    period: "Jul 2022 — Aug 2022",
    bullets: [
      "Taught Python game development to 20 middle school students",
      "Prepared lecture slides, assisted debugging, and led live coding demos",
    ],
    tags: ["Python", "Teaching"],
  },
];
