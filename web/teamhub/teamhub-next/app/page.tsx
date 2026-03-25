import { articles, projects, team } from "@/data";

export default function Home() {
  return (
    <section>
      <h1 className="text-3xl font-bold">TeamHub</h1>
      <p className="mt-2 max-w-3xl text-muted">
        Welcome to TeamHub. Use the pages below to explore projects, articles, and team members.
      </p>

      <h2 className="mt-8 text-lg font-semibold">Stats</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 shadow-md transition hover:shadow-lg">
          <p className="text-sm text-muted">Projects</p>
          <p className="text-2xl font-semibold">{projects.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-md transition hover:shadow-lg">
          <p className="text-sm text-muted">Articles</p>
          <p className="text-2xl font-semibold">{articles.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-md transition hover:shadow-lg">
          <p className="text-sm text-muted">Team Members</p>
          <p className="text-2xl font-semibold">{team.length}</p>
        </div>
      </div>
    </section>
  );
}
