import express from "express";
import path from "path";

const app = express();

// status codes
app.get("/success", (req, res) => {
  res.status(200).json({ message: "Success" });
});

app.post("/create", (req, res) => {
  res.status(201).json({ message: "Resource created" });
});

app.get("/bad", (req, res) => {
  res.status(400).json({ error: "Bad request" });
});

app.get("/missing", (req, res) => {
  res.status(404).json({ error: "Not found" });
});

// custom headers
app.get("/headers", (req, res) => {
  res.set("X-App-Name", "Express Drill");
  res.json({ message: "Custom header sent" });
});

// json response
app.get("/json", (req, res) => {
  res.json({ name: "Deekshi", role: "developer" });
});

// text response
app.get("/text", (req, res) => {
  res.send("This is plain text response");
});

// send file
app.get("/file", (req, res) => {
  const filePath = path.join(process.cwd(), "sample.txt");
  res.sendFile(filePath);
});

// redirect
app.get("/google", (req, res) => {
  res.redirect("https://google.com");
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});