"use client";

import { useState } from "react";
import Link from "next/link";

type Project = {
  id: number;
  name: string;
  status: string;
  lead: string;
  tech: string[];
};

type ProjectSearchProps = {
  projects: Project[];
};

function statusBadge(status: string) {
  const normalized = status.toLowerCase();
  if (normalized.includes("progress")) {
    return "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-200";
  }
  if (normalized.includes("planning")) {
    return "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200";
  }
  if (normalized.includes("complete")) {
    return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200";
  }
  return "bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-200";
}

export default function ProjectSearch({ projects }: ProjectSearchProps) {
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();
  const filteredProjects = term
    ? projects.filter((project) => project.name.toLowerCase().includes(term))
    : projects;

  return (
    <section className="mt-8 space-y-5 rounded-xl border border-border bg-card p-6 shadow-md">
      <label className="text-sm font-medium" htmlFor="project-search">
        Search projects
      </label>
      <input
        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-indigo-500"
        id="project-search"
        type="text"
        placeholder="Filter by project name..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      {filteredProjects.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted">
          No projects found
        </p>
      ) : (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <li
              key={project.id}
              className="rounded-xl border border-border bg-card p-4 shadow-md transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Link className="block space-y-3" href={`/projects/${project.id}`}>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-lg font-semibold">{project.name}</p>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusBadge(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-muted">
                  <span className="font-medium text-foreground">Lead:</span> {project.lead}
                </p>
                <p className="text-sm text-muted">
                  <span className="font-medium text-foreground">Tech:</span> {project.tech.join(", ")}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
