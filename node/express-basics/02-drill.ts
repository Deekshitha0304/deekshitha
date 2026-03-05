// A path parameter is a value inside the URL path.
// http://localhost:3000/users/42

import express from "express";

const app = express();


// path parameter
app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  res.json({
    userId: id
  });
});


// query parameter                                      // for filtering,searching,sorting
app.get("/search", (req, res) => {
  const q = req.query.q;

  res.json({
    search: q
  });
});

// params + query
app.get("/users/:id/posts", (req, res) => {
  const id = req.params.id;
  const limit = req.query.limit;

  res.json({
    userId: id,
    limit: limit
  });
});


// 404 route
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

