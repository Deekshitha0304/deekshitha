import { httpClient } from "./httpClient";
import { Repo } from "../types/github";

export async function getUserRepos(
  username: string
): Promise<Repo[]> {

  const url = `https://api.github.com/users/${username}/repos`;

  return httpClient(url, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "X-Request-ID": crypto.randomUUID() // request id
    }
  });
}