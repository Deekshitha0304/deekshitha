import express, { Request, Response, NextFunction } from "express";
import usersRouter from "./routers/users";
import postsRouter from "./routers/posts";

const app = express();

/*
Drill Task:
Add router-level middleware
*/

function routerLogger(req: Request, res: Response, next: NextFunction) {
  console.log("Router middleware triggered");
  next();
}

/*
Drill Task:
Mount router at /api prefix
*/

app.use("/api/users", routerLogger, usersRouter);
app.use("/api/posts", postsRouter);

/*
Normal route
*/
app.get("/", (req: Request, res: Response) => {
  res.send("Main Server Running");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});