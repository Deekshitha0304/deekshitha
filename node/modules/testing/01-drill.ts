import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "./app";

describe("Integration Test", () => {

  it("GET /ping returns ok true", async () => {
    const res = await request(app).get("/ping");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

});


it("failing test example", async () => {
  const res = await request(app).get("/ping");

  expect(res.body).toEqual({ ok: false });
});