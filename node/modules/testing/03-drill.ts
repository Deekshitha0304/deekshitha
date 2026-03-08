import { describe, beforeAll, it, expect } from "vitest";
import { createApp } from "./app";
import request from "supertest";


let app: any;

let pool: any;

beforeAll(async () => {
  // after pool setup
  app = createApp(pool);
});

it("creates a user", async () => {
  const res = await request(app)
    .post("/users")
    .send({
      email: "new@test.com",
      name: "NewUser"
    });

  expect(res.status).toBe(201);
  expect(res.body.email).toBe("new@test.com");
});

it("returns seeded user", async () => {
  const res = await request(app).get("/users/1");

  expect(res.status).toBe(200);
  expect(res.body.email).toBe("user1@test.com");
});

it("returns 404 if user missing", async () => {
  const res = await request(app).get("/users/999");

  expect(res.status).toBe(404);
});

it("returns paginated users", async () => {
  const res = await request(app).get("/users?limit=2&offset=0");

  expect(res.status).toBe(200);
  expect(res.body.length).toBe(2);
});