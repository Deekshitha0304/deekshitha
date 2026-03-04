import express from "express";

const app = express();

// JSON middleware
app.use(express.json({ limit: "1mb" }));

// form middleware
app.use(express.urlencoded({ extended: true }));

// POST route
app.post("/echo", (req, res) => {
  const body = req.body;

  res.json({
    received: body
  });
});

// malformed JSON handler
app.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      error: "Invalid JSON"
    });
  }

  next();
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// Test JSON Request
// curl -X POST http://localhost:3000/echo \
// -H "Content-Type: application/json" \
// -d '{"name":"Deekshi","role":"developer"}'


// Test Form Data
// curl -X POST http://localhost:3000/echo \
// -H "Content-Type: application/x-www-form-urlencoded" \
// -d "name=Deekshi&role=developer"


