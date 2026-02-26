// type LogLevel = "info" | "warn" | "error";

class Logger {

  info(message: string): void {
    console.log("INFO:", message);
  }

  warn(message: string): void {
    console.log("WARN:", message);
  }

  error(message: string): void {
    console.log("ERROR:", message);
  }

}

