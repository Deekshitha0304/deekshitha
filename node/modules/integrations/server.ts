import express from "express";

const app = express();

app.get("/posts/1", (req, res) => {
  res.json({
    id: 1,
    title: "My first API",
    body: "Hello from my own API"
  });
});

app.listen(4001, () => {
  console.log("Server running on port 4001");
});