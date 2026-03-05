import express from "express";
import pino from "pino";
import pinoHttp from "pino-http";

const app = express();
app.use(express.json());

const PORT = 3005;

//Environment mode
const isProd = process.env.NODE_ENV === "production";

//Create logger
const logger = pino({
  level: isProd ? "info" : "debug"
});

//HTTP logger middleware
app.use(
  pinoHttp({
    logger,
    genReqId: () => Math.random().toString(36).substring(2, 10)
  })
);

//In-memory tasks
let tasks = [
  { id: 1, title: "Study Node", completed: false },
  { id: 2, title: "Practice Express", completed: false }
];

let nextId = 3;

//Request duration middleware
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    logger.info({
      requestId: req.id,
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`
    });
  });

  next();
});

//GET /tasks
app.get("/tasks", (req, res) => {
  res.json({ data: tasks });
});

//POST /tasks
app.post("/tasks", (req, res) => {

  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      error: "title is required"
    });
  }

  const newTask = {
    id: nextId++,
    title,
    completed: false
  };

  tasks.push(newTask);

  //Business event log
  logger.info({
    event: "task_created",
    taskId: newTask.id,
    title: newTask.title
  });

  res.status(201).json({ data: newTask });

});

//DELETE /tasks/:id
app.delete("/tasks/:id", (req, res) => {

  const id = Number(req.params.id);

  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  const deleted = tasks.splice(index, 1)[0];

  //Business event log
  logger.info({
    event: "task_deleted",
    taskId: deleted.id
  });

  res.status(204).send();

});

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});