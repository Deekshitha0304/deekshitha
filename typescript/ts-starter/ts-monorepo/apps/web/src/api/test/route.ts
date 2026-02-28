import { readFile } from "../../../../server/src/file";

export async function GET() {
  const content = readFile("package.json");
  return Response.json({ content });
}