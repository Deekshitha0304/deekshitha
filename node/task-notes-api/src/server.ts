import express, { Express, Request, Response, NextFunction } from "express"
import { Server } from "http"
import { AppConfig } from "./config.js"
import { logger } from "./logger.js"
import { taskRouter } from "./routes/tasks.js"
import { authRouter } from "./routes/auth.js"

export class TaskServer {

  private app: Express
  private server?: Server

  constructor(private config: AppConfig) {
    this.app = express()
    this.setupApp()
  }

  getApp() {
  return this.app
}


  private setupApp(): void {

    // JSON parser middleware
    this.app.use(express.json())
    this.app.use("/api/auth", authRouter)
    this.app.use("/api/tasks", taskRouter)

    // Request logger middleware
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      logger.info(`${req.method} ${req.url}`)
      next()
    })

    // Health check endpoint
    this.app.get("/health", (req: Request, res: Response) => {
      res.json({
        status: "ok",
        timestamp: new Date().toISOString()
      })
    })

    // 404 handler
    this.app.use((req: Request, res: Response) => {
      res.status(404).json({
        error: "Route not found"
      })
    })
  }

  async start(): Promise<void> {
    this.server = this.app.listen(this.config.port, () => {
      logger.info(`Server running on port ${this.config.port}`)
    })
  }

  async stop(): Promise<void> {
    if (this.server) {
      this.server.close()
      logger.info("Server stopped")
    }
  }
}