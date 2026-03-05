import express, { Request, Response, NextFunction } from "express";

const app = express();
app.use(express.json());

const PORT = 3004;

//In-memory tasks
let tasks = [
  { id: 1, title: "Study Node", completed: false },
  { id: 2, title: "Practice Express", completed: false }
];

let nextId = 3;

//Function to return RFC7807 error
function sendProblem(
  res: Response,
  status: number,
  title: string,
  detail: string
) {
  res
    .status(status)
    .type("application/problem+json")
    .json({
      type: "about:blank",
      title,
      status,
      detail
    });
}

//GET /tasks
//Return all tasks
app.get("/tasks", (req: Request, res: Response) => {
  res.json({ data: tasks });
});

//GET /tasks/:id
//Return single task
app.get("/tasks/:id", (req: Request, res: Response, next: NextFunction) => {

  const id = Number(req.params.id);

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return sendProblem(
      res,
      404,
      "Not Found",
      `Task with id ${id} not found`
    );
  }

  res.json({ data: task });
});

//POST /tasks
//Create new task
app.post("/tasks", (req: Request, res: Response, next: NextFunction) => {

  const { title } = req.body;

  //Validation error
  if (!title) {
    return sendProblem(
      res,
      400,
      "Bad Request",
      "title is required"
    );
  }

  const newTask = {
    id: nextId++,
    title,
    completed: false
  };

  tasks.push(newTask);

  res.status(201).json({ data: newTask });
});

//Route to simulate server error
app.get("/error", (req, res, next) => {
  throw new Error("Unexpected server failure");
});

//Central error middleware          // all errors comes here
app.use((err: any, req: Request, res: Response, next: NextFunction) => {

  sendProblem(
    res,
    500,
    "Internal Server Error",
    err.message || "Unexpected error"
  );

});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});