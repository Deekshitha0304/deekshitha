export interface MetricsSnapshot {
  totalRequests: number
  totalErrors: number
}

export class MetricsCollector {

  private totalRequests = 0
  private totalErrors = 0

  recordRequest() {
    this.totalRequests++
  }

  recordError() {
    this.totalErrors++
  }

  getMetrics(): MetricsSnapshot {
    return {
      totalRequests: this.totalRequests,
      totalErrors: this.totalErrors
    }
  }

}