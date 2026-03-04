import express, { Request, Response, NextFunction } from "express";

const app = express();

/*
Drill Task 1:
Add middleware that logs method and url for every request
*/
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Method: ${req.method}, URL: ${req.url}`);
  next();
});


/*
Drill Task 2:
Add middleware that times requests and logs duration
*/
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`Request took ${duration} ms`);
  });

  next();
});

/*
Drill Task 3:
Add middleware that adds a requestId to each request
*/
app.use((req: Request & { requestId?: string }, res: Response, next: NextFunction) => {
  const id = Math.random().toString(36).substring(2, 8);
  req.requestId = id;

  console.log("Request ID:", id);
  next();
});

/*
Drill Task 4:
Apply middleware to only specific routes
*/
function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log("Admin middleware executed");
  next();
}

/*
Drill Task 5:
Demonstrate middleware execution order
*/
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Middleware 1 executed");
  next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Middleware 2 executed");
  next();
});

/*
Normal routes
*/
app.get("/", (req: Request, res: Response) => {
  res.send("Home Route");
});

app.get("/admin", adminMiddleware, (req: Request, res: Response) => {
  res.send("Admin Page");
});

app.get("/order", (req: Request, res: Response) => {
  console.log("Route handler executed");
  res.send("Order Route");
});

/*
Start server
*/
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});