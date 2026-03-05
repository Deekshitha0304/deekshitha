import express from "express";

const app = express();

// JSON middleware
app.use(express.json({ limit: "1mb" })); 

// form middleware
app.use(express.urlencoded({ extended: true }));            // form text -> js obj

// POST route
app.post("/echo", (req, res) => {
  const body = req.body;

  res.json({
    received: body
  });
});

// Error JSON handler                                         // error middleware
app.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      error: "Invalid JSON"
    });
  }

  next();
});


const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




