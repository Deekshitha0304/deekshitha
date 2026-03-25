import { projects, team } from "@/data";

function getSessionFromCookie(cookieHeader: string | null) {
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(";").map((value) => value.trim());
  const sessionCookie = cookies.find((cookie) => cookie.startsWith("session="));

  if (!sessionCookie) {
    return null;
  }

  return sessionCookie.slice("session=".length);
}

export async function GET(request: Request) {
  const sessionUserId = getSessionFromCookie(request.headers.get("cookie"));

  if (!sessionUserId) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }

  const userId = Number(sessionUserId);
  const user = team.find((item) => item.id === userId);

  if (!user) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }

  const assignedProjects = projects.filter((project) => project.team.includes(user.id));

  return Response.json({
    user: {
      name: user.name,
      role: user.role,
      department: user.dept,
    },
    projects: assignedProjects,
  });
}
