// Express is a web framework for Node.js.
// Express = A tool that helps Node.js create web servers quickly.

// A route is a path in the server.

import express from "express";

const app = express();

// root route
app.get("/", (req, res) => {
  res.send("Hello Deekshi");
});

// ping route
app.get("/ping", (req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {                                 //app.listen()-> start server
  console.log(`Server running on port ${PORT}`);
});

// graceful shutdown
process.on("SIGINT", () => {
  console.log("\nShutting down server...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});


// test port using curl http://localhost:4000/ping


// Creating an Express application

// Defining routes using app.get()

// Returning text and JSON responses

// Starting a server with app.listen()

// Testing APIs with curl

// Handling graceful shutdown using SIGINT