import { loadConfig } from "./config"
import { TaskServer } from "./server"
import { logger } from "./logger"

async function main() {

  const config = loadConfig()

  const server = new TaskServer(config)

  await server.start()

  process.on("SIGINT", async () => {
    logger.info("Gracefully shutting down...")
    await server.stop()
    process.exit(0)
  })

}

main()