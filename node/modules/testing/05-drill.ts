import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { createApp } from "./app";
import { Pool } from "pg";
import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { setupServer } from "msw/node";
import { http, HttpResponse, delay } from "msw";

let container: any;
let pool: Pool;
let app: any;

const server = setupServer();

beforeAll(async () => {
  server.listen();

  container = await new PostgreSqlContainer("postgres:15").start();

  pool = new Pool({
    host: container.getHost(),
    port: container.getPort(),
    user: container.getUsername(),
    password: container.getPassword(),
    database: container.getDatabase(),
  });

  await pool.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL
    )
  `);

  await pool.query(`
    INSERT INTO users(email,name)
    VALUES ('user1@test.com','User1')
  `);

  app = createApp(pool);
});

afterAll(async () => {
  server.close();
  await pool.end();
  await container.stop();
});




// Test: Invalid JSON from External API

server.use(
  http.get("https://api.example.com/user", () => {
    return new HttpResponse("invalid json", { status: 200 });
  })
);

it("throws parse error for invalid json", async () => {
  const res = await fetch("https://api.example.com/user");

  await expect(res.json()).rejects.toThrow();
});


// Test: Transaction Rollback

it("transaction rollback prevents persistence", async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      "INSERT INTO users(email,name) VALUES('tx@test.com','TxUser')"
    );

    throw new Error("force rollback");
  } catch {
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }

  const result = await pool.query(
    "SELECT * FROM users WHERE email='tx@test.com'"
  );

  expect(result.rows.length).toBe(0);
});


// RFC7807 Error Format

it("returns RFC7807 error format", async () => {
  const res = await request(app).get("/users/999");

  expect(res.body).toHaveProperty("type");
  expect(res.body).toHaveProperty("title");
  expect(res.body).toHaveProperty("status");
});


// Test: Timeout Simulation

server.use(
  http.get("https://api.example.com/user", async () => {
    await delay(3000);
    return HttpResponse.json({ id: 1 });
  })
);

it("timeout fires for delayed response", async () => {
  const controller = new AbortController();

  setTimeout(() => controller.abort(), 100);

  await expect(
    fetch("https://api.example.com/user", {
      signal: controller.signal,
    })
  ).rejects.toThrow();
});