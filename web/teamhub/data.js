const projects = [
  {
    id: 1,
    name: "Website Redesign",
    status: "In Progress",
    lead: "Ava Patel",
    techStack: "React, Node.js",
    userId: 1,
  },
  {
    id: 2,
    name: "Mobile App Launch",
    status: "Planning",
    lead: "Liam Chen",
    techStack: "Flutter, Firebase",
    userId: 2,
  },
  {
    id: 3,
    name: "Analytics Dashboard",
    status: "Completed",
    lead: "Maya Johnson",
    techStack: "Vue, Express, MongoDB",
    userId: 3,
  },
];

const articles = [
  {
    id: 1,
    title: "How to Run Effective Standups",
    content: "A quick guide to keeping daily standups focused and useful.",
    author: "Noah Williams",
    date: "2026-03-01",
  },
  {
    id: 2,
    title: "Improving Team Collaboration",
    content: "Simple habits that help teams communicate better every week.",
    author: "Emma Davis",
    date: "2026-03-08",
  },
  {
    id: 3,
    title: "Planning Better Sprints",
    content: "Tips for setting realistic goals and reducing sprint carry-over.",
    author: "Olivia Martin",
    date: "2026-03-15",
  },
];

const team = [
  {
    id: 1,
    name: "Ava Patel",
    role: "Engineering Manager",
    department: "Engineering",
  },
  {
    id: 2,
    name: "Noah Williams",
    role: "Content Strategist",
    department: "Editorial",
  },
  {
    id: 3,
    name: "Maya Johnson",
    role: "Frontend Developer",
    department: "Engineering",
  },
];

const users = [
  {
    id: 1,
    username: "ava",
    password: "ava123",
    name: "Ava Patel",
    role: "Engineering Manager",
  },
  {
    id: 2,
    username: "liam",
    password: "liam123",
    name: "Liam Chen",
    role: "Product Manager",
  },
  {
    id: 3,
    username: "maya",
    password: "maya123",
    name: "Maya Johnson",
    role: "Frontend Developer",
  },
];

module.exports = { projects, articles, team, users };
