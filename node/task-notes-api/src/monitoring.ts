export interface HealthStatus {
  status: "ok" | "error"
  timestamp: string
}

export interface ServiceStatus {
  name: string
  status: "ok" | "error"
}

export class HealthChecker {

  async checkHealth(): Promise<HealthStatus> {
    return {
      status: "ok",
      timestamp: new Date().toISOString()
    }
  }

  async checkDependencies(): Promise<ServiceStatus[]> {
    return [
      { name: "database", status: "ok" },
      { name: "redis", status: "ok" }
    ]
  }

}