export async function POST() {
  const response = Response.json({ ok: true });
  response.headers.append(
    "Set-Cookie",
    "session=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0"
  );
  return response;
}
