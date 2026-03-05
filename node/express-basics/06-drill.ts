import express from "express";

const app = express();

//Add a route that throws an error

app.get("/error", (req, res) => {
  throw new Error("Something went wrong!");
});


app.get("/async-error", async (req, res) => {
  throw new Error("Async error occurred!");
});


app.get("/", (req, res) => {
  res.send("Server running");
});


app.use((err: any, req: any, res: any, next: any) => {
  const errorResponse = {
    status: "error",
    message: err.message
  };


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
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});