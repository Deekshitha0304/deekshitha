// Drill Set 6: Error Handling

import express from "express";
import "express-async-errors"; // Catch async errors automatically

const app = express();

/*
Drill Task 1:
Add a route that throws an error
*/
app.get("/error", (req, res) => {
  throw new Error("Something went wrong!");
});

/*
Drill Task 3:
Catch async errors with express-async-errors
This async route throws an error which will be caught automatically
*/
app.get("/async-error", async (req, res) => {
  throw new Error("Async error occurred!");
});

/*
Normal route for testing server
*/
app.get("/", (req, res) => {
  res.send("Server running");
});

/*
Drill Task 2:
Express error-handling middleware (4 parameters)
(err, req, res, next)
*/
app.use((err: any, req: any, res: any, next: any) => {

  /*
  Drill Task 4:
  Return consistent error JSON format
  */

  const errorResponse = {
    status: "error",
    message: err.message
  };

  /*
  Drill Task 5:
  Different error handling for development vs production
  */

  if (process.env.NODE_ENV === "development") {
    res.status(500).json({
      ...errorResponse,
      stack: err.stack
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }

});

/*
Start the server
*/
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});