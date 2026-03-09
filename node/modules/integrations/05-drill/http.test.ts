import { test, expect } from "vitest";
import "./setup";


//Happy Path Test
// test success case
test("happy path response", async () => {

  const res = await fetch("https://api.test.com/data");

  const data = await res.json();

  expect(data.message).toBe("success");

});

//Unauthorized Test

test("401 unauthorized", async () => {

  const res = await fetch("https://api.test.com/unauthorized");

  expect(res.status).toBe(401);

});

//Server Error Test

test("500 server error", async () => {

  const res = await fetch("https://api.test.com/error");

  expect(res.status).toBe(500);

});

//Timeout Test

test("timeout fires", async () => {

  const controller = new AbortController();

  setTimeout(() => controller.abort(), 5000);

  await expect(
    fetch("https://api.test.com/slow", {
      signal: controller.signal
    })
  ).rejects.toThrow();

});