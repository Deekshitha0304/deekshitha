import express from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

//In-memory data store
let tasks = [
  { id: 1, title: "Study Node.js", completed: false },
  { id: 2, title: "Practice Express", completed: false }
];

let nextId = 3;

//Return all tasks
app.get("/tasks", (req, res) => {
  res.status(200).json({
    data: tasks
  });
});

//Create new task
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