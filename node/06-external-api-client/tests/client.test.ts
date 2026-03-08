import { test, expect } from "vitest";
import "../tests/setup";
import { getUserRepos } from "../client/githubClient";

test("success response", async () => {

  const repos = await getUserRepos("test");

  expect(repos[0].name).toBe("demo");

});

test("401 unauthorized", async () => {

  await expect(getUserRepos("auth"))
    .rejects
    .toThrow();

});

test("500 retry failure", async () => {

  await expect(getUserRepos("error"))
    .rejects
    .toThrow();

});