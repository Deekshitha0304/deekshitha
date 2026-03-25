import { credentials } from "@/data";

export async function POST(request: Request) {
  const body = await request.json();
  const username = body?.username;
  const password = body?.password;

  const user = credentials.find(
    (item) => item.username === username && item.password === password
  );

  if (!user) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const response = Response.json({ ok: true });
  response.headers.append(
    "Set-Cookie",
    `session=${user.userId}; HttpOnly; Path=/; SameSite=Strict`
  );
  return response;
}
