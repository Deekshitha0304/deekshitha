//  Zod is a TypeScript-first schema validation library.
// Validate data at runtime



import express, { Request, Response, NextFunction } from "express";
import { z } from "zod";

const app = express();
app.use(express.json());

const PORT = 3002;

//In-memory data store
let tasks = [
  { id: 1, title: "Study Node.js", completed: false },
  { id: 2, title: "Practice Express", completed: false }
];

let nextId = 3;

//Zod schema for task creation
const taskSchema = z.object({
  title: z.string().min(1, "Title is required")
});

//Zod schema for query params
const querySchema = z.object({
  completed: z.string().optional()
});

//Type inference from Zod
type TaskInput = z.infer<typeof taskSchema>;

//Reusable validation middleware
function validate(schema: z.ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: result.error.issues
      });
    }

    req.body = result.data;
    next();
  };
}

//Return all tasks
app.get("/tasks", (req, res) => {
  const query = querySchema.safeParse(req.query);

  if (!query.success) {
    return res.status(400).json({
      error: query.error.issues
    });
  }

  let filteredTasks = tasks;

  if (query.data.completed) {
    const value = query.data.completed === "true";
    filteredTasks = tasks.filter(t => t.completed === value);
  }

  res.status(200).json({
    data: filteredTasks
  });
});

//Create new task
app.post("/tasks", validate(taskSchema), (req: Request, res: Response) => {

  const body: TaskInput = req.body;

  const newTask = {
    id: nextId++,
    title: body.title,
    completed: false
  };

  tasks.push(newTask);

  res.status(201).json({
    data: newTask
  });
});

//Return single task
app.get("/tasks/:id", (req, res) => {

  const id = Number(req.params.id);

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  res.status(200).json({
    data: task
  });
});

//Full update task
app.put("/tasks/:id", (req, res) => {

  const id = Number(req.params.id);

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  const { title, completed } = req.body;

  task.title = title;
  task.completed = completed;

  res.status(200).json({
    data: task
  });
});

//Remove task
app.delete("/tasks/:id", (req, res) => {

  const id = Number(req.params.id);

  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  tasks.splice(index, 1);

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});