import express from "express";
import { z } from "zod";

const app = express();
app.use(express.json());

const PORT = 3003;

//In-memory tasks
let tasks = [
  { id: 1, title: "Study Node", completed: false, createdAt: new Date() },
  { id: 2, title: "Practice Express", completed: true, createdAt: new Date() },
  { id: 3, title: "Learn Zod", completed: false, createdAt: new Date() }
];

let nextId = 4;

//Query validation schema
const querySchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(5),
  completed: z.enum(["true", "false"]).optional(),
  sort: z.enum(["createdAt", "title"]).default("createdAt"),
  order: z.enum(["asc", "desc"]).default("asc")
});

//GET /tasks
//Return tasks with pagination, filtering, sorting
app.get("/tasks", (req, res) => {

  const result = querySchema.safeParse(req.query);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.issues
    });
  }

  const { page, limit, completed, sort, order } = result.data;

  let data = [...tasks];

  //Filtering
  if (completed) {
    const value = completed === "true";
    data = data.filter(t => t.completed === value);
  }

  //Sorting
  data.sort((a, b) => {
    if (a[sort] > b[sort]) return order === "asc" ? 1 : -1;
    if (a[sort] < b[sort]) return order === "asc" ? -1 : 1;
    return 0;
  });

  //Pagination
  const start = (page - 1) * limit;
  const paginated = data.slice(start, start + limit);

  const total = data.length;

  res.json({
    data: paginated,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  });

});

//POST /tasks
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
    completed: false,
    createdAt: new Date()
  };

  tasks.push(newTask);

  res.status(201).json({
    data: newTask
  });

});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});