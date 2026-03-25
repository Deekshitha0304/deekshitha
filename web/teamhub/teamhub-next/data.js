export const projects = [
  {
    id: 1,
    name: "Website Redesign",
    status: "In Progress",
    tech: ["Next.js", "Tailwind CSS", "Node.js"],
    lead: 1,
    description:
      "Revamping the company website with a cleaner dashboard experience and better mobile performance.",
    team: [1, 3, 5],
  },
  {
    id: 2,
    name: "Mobile App Launch",
    status: "Planning",
    tech: ["React Native", "Firebase"],
    lead: 2,
    description:
      "Planning and rollout for the first TeamHub companion app, focused on project updates and notifications.",
    team: [1, 2, 4],
  },
  {
    id: 3,
    name: "Analytics Dashboard",
    status: "Completed",
    tech: ["Next.js", "PostgreSQL", "Chart.js"],
    lead: 3,
    description:
      "Delivered a KPI dashboard to track delivery timelines, sprint health, and cross-team throughput.",
    team: [3, 4],
  },
];

export const articles = [
  {
    id: 1,
    title: "How to Run Effective Standups",
    author: 4,
    date: "2026-03-01",
    body: "A quick guide to keeping daily standups focused and useful. Keep updates brief, surface blockers early, and park deep discussions for follow-up.",
  },
  {
    id: 2,
    title: "Improving Team Collaboration",
    author: 2,
    date: "2026-03-08",
    body: "Simple habits that help teams communicate better every week. Write clear ownership, share decisions in one place, and close loops before sprint end.",
  },
  {
    id: 3,
    title: "Planning Better Sprints",
    author: 5,
    date: "2026-03-15",
    body: "Tips for setting realistic goals and reducing sprint carry-over. Scope by outcomes, protect focus time, and leave room for operational work.",
  },
];

export const team = [
  { id: 1, name: "Alice Patel", role: "Engineering Manager", dept: "Engineering" },
  { id: 2, name: "Liam Chen", role: "Product Manager", dept: "Product" },
  { id: 3, name: "Maya Johnson", role: "Frontend Developer", dept: "Engineering" },
  { id: 4, name: "Noah Williams", role: "Content Strategist", dept: "Editorial" },
  { id: 5, name: "Emma Davis", role: "UX Designer", dept: "Design" },
];

export const credentials = [
  { userId: 1, username: "ava", password: "ava123" },
  { userId: 1, username: "alice", password: "pass123" },
  { userId: 2, username: "liam", password: "liam123" },
  { userId: 3, username: "maya", password: "maya123" },
  { userId: 4, username: "noah", password: "noah123" },
];
