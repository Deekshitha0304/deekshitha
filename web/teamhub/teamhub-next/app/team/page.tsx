import { team } from "@/data";

export default function TeamPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Team</h1>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <li
            key={member.id}
            className="rounded-xl border border-border bg-card p-5 shadow-md transition hover:shadow-lg"
          >
            <p className="font-semibold">{member.name}</p>
            <p className="mt-1 text-sm text-muted">{member.role}</p>
            <p className="text-sm text-muted">{member.dept}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
