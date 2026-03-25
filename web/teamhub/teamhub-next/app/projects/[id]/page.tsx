import Link from "next/link";
import { projects, team } from "@/data";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = projects.find((item) => item.id === Number(id));

  if (!project) {
    notFound();
  }

  const lead = team.find((member) => member.id === project.lead)?.name ?? "Unknown";
  const members = project.team
    .map((memberId) => team.find((member) => member.id === memberId)?.name ?? "Unknown")
    .join(", ");

  return (
    <section className="mx-auto max-w-3xl rounded-xl border border-border bg-card p-6 shadow-md">
      <h1 className="text-3xl font-bold">{project.name}</h1>
      <div className="mt-5 space-y-3 text-muted">
        <p className="leading-relaxed">{project.description}</p>
        <p>
          <span className="font-semibold text-foreground">Status:</span> {project.status}
        </p>
        <p>
          <span className="font-semibold text-foreground">Tech:</span> {project.tech.join(", ")}
        </p>
        <p>
          <span className="font-semibold text-foreground">Lead:</span> {lead}
        </p>
        <p>
          <span className="font-semibold text-foreground">Team Members:</span> {members}
        </p>
      </div>
      <Link
        className="mt-6 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
        href="/projects"
      >
        Back to Projects
      </Link>
    </section>
  );
}
