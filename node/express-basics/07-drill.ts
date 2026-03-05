import express, { Request, Response, NextFunction } from "express";
import usersRouter from "./routers/users";
import postsRouter from "./routers/posts";

const app = express();

//Add router-level middleware

function routerLogger(req: Request, res: Response, next: NextFunction) {
  console.log("Router middleware triggered");
  next();
}

//Mount router at /api prefix

app.use("/api/users", routerLogger, usersRouter);
app.use("/api/posts", postsRouter);

//Normal route

app.get("/", (req: Request, res: Response) => {
  res.send("Main Server Running");
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});