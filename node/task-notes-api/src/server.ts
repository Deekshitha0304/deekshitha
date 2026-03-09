import express, { Express, Request, Response, NextFunction } from "express"
import { Server } from "http"
import { AppConfig } from "./config.js"
import { logger } from "./logger.js"
import { taskRouter } from "./routes/tasks.js"
import { authRouter } from "./routes/auth.js"
import { MetricsCollector } from "./metrics.js"
import { errorHandler } from "./middleware/errorHandler.js"
import { v4 as uuidv4 } from "uuid"
import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "./swagger.js"

export class TaskServer {

  private app: Express
  private server?: Server
  private metrics: MetricsCollector

  constructor(private config: AppConfig) {
    this.app = express()
    this.metrics = new MetricsCollector()
    this.setupApp()
    this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  }

  getApp() {
    return this.app
  }

  private setupApp(): void {

    // JSON parser
    this.app.use(express.json())

    // Request ID + Logging middleware
    this.app.use((req: Request, res: Response, next: NextFunction) => {

      const requestId = uuidv4()

      ;(req as any).requestId = requestId

      logger.info(`[${requestId}] ${req.method} ${req.url}`)

      this.metrics.recordRequest()

      next()

    })

    // Routes
    this.app.use("/api/auth", authRouter)
    this.app.use("/api/tasks", taskRouter)

    // Health endpoint
    this.app.get("/health", (req: Request, res: Response) => {
      res.json({
        status: "ok",
        timestamp: new Date().toISOString()
      })
    })

    // Metrics endpoint
    this.app.get("/metrics", (req: Request, res: Response) => {
      res.json(this.metrics.getMetrics())
    })

    // 404 handler
    this.app.use((req: Request, res: Response) => {
      res.status(404).json({
        error: "Route not found"
      })
    })

    // Global error handler (must be LAST)
    this.app.use(errorHandler)

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