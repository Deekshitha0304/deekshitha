import express from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// GET all tasks

app.get("/tasks", (req, res) => {
  res.status(200).json([{ id: 1, title: "Study Node.js" },{id: 2, title: "Study Basics"}]);
});

//Create new task

app.post("/tasks", (req, res) => {
  res.status(201).json({ id: 3, title: "Practice Express drills" });
});

//Get task by id

app.get("/tasks/:id", (req, res) => {
  res.status(200).json({ id: req.params.id, title: "Finish assignment" });
});

//Update task

app.put("/tasks/:id", (req, res) => {
  res.status(200).json({ id: req.params.id, title: "Complete project work" });
});

//Delete task

app.delete("/tasks/:id", (req, res) => {
  res.status(204).send();
});

//Nested resource

app.get("/users/:id/tasks", (req, res) => {
  res.status(200).json([
    { id: 1, userId: req.params.id, title: "User personal task" }
  ]);
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});