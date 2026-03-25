import ProjectSearch from "@/components/ProjectSearch";
import { projects, team } from "@/data";

export default function ProjectsPage() {
  const displayProjects = projects.map((project) => {
    const lead = team.find((member) => member.id === project.lead);
    return {
      ...project,
      lead: lead?.name ?? "Unknown",
    };
  });

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Projects</h1>
      <p className="mt-2 text-muted">All active and completed TeamHub projects.</p>
      <ProjectSearch projects={displayProjects} />
    </section>
  );
}
