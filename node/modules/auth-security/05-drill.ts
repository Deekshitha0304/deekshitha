import express from "express";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

const SECRET = "mysecretkey";

// auth middleware
function authMiddleware(req: any, res: any, next: any) {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token required" });
  }

  const token = authHeader.split(" ")[1];

  try {

    const decoded = jwt.verify(token, SECRET);

    req.user = decoded;

    next();

  } catch {

    res.status(401).json({ error: "Invalid or expired token" });

  }

}

// public route
app.get("/public", (req, res) => {
  res.json({ message: "Public route accessible" });
});

// protected route
app.get("/profile", authMiddleware, (req: any, res) => {

  res.json({
    message: "Protected profile route",
    user: req.user
  });

});

// start server
app.listen(3003, () => {
  console.log("Server running on port 3003");
});