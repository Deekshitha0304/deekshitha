import request from "supertest"
import { describe, it, expect } from "vitest"
import { TaskServer } from "../../src/server.js"
import { loadConfig } from "../../src/config.js"

const server = new TaskServer(loadConfig())
const app = server.getApp()

describe("Tasks API", () => {

  it("GET /health returns ok", async () => {

    const res = await request(app).get("/health")

    expect(res.status).toBe(200)

  })

  it("GET /api/tasks returns tasks list", async () => {

    const res = await request(app).get("/api/tasks")

    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)

  })

  it("POST /api/tasks creates task", async () => {

    const res = await request(app)
      .post("/api/tasks")
      .send({
        title: "Test Task",
        priority: "high"
      })

    expect(res.status).toBe(201)
    expect(res.body.title).toBe("Test Task")

  })

})