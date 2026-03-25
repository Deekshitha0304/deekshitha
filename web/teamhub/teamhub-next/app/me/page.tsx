import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import MeLogoutButton from "@/components/MeLogoutButton";
import { projects, team } from "@/data";

export default async function MePage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) {
    redirect("/login");
  }

  const sessionUserId = Number(session.value);
  const user = team.find((member) => member.id === sessionUserId);

  if (!user) {
    redirect("/login");
  }

  const userProjects = projects.filter((project) => project.team.includes(user.id));

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <MeLogoutButton />
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-md">
        <p className="text-base">
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p className="mt-2 text-base">
          <span className="font-semibold">Role:</span> {user.role}
        </p>
        <p className="mt-2 text-base">
          <span className="font-semibold">Department:</span> {user.dept}
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">My Projects</h2>
        {userProjects.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-5 shadow-md">
            <p className="text-sm text-muted">No assigned projects</p>
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {userProjects.map((project) => (
              <li
                key={project.id}
                className="rounded-xl border border-border bg-card p-5 shadow-md transition hover:shadow-lg"
              >
                <p className="font-semibold">{project.name}</p>
                <p className="mt-1 text-sm text-muted">Status: {project.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
