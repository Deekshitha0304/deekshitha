import express, { Request, Response, NextFunction } from "express";

const app = express();

// Middleware: Parse JSON

app.use(express.json());

// Middleware: Request Logger with time

app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`Request finished in ${duration} ms`);
  });

  next();
});


//Serve Static Files

app.use(express.static("public"));

// /health route

app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "ok"
  });
});

// /api/info route

app.get("/api/info", (req: Request, res: Response) => {
  res.json({
    version: "1.0.0",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// POST /api/echo

app.post("/api/echo", (req: Request, res: Response) => {
  res.json({
    received: req.body
  });
});

// 404 Handler

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Route not found"
  });
});

// Error Handler

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  res.status(500).json({
    error: "Internal Server Error"
  });
});

// Start Server

const PORT = 6000;

const server = app.listen(PORT, () => {
  console.log(`NoteServer running on port ${PORT}`);
});

// Graceful Shutdown

process.on("SIGINT", () => {
  console.log("\nShutting down server...");

  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});