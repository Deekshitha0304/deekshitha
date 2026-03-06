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

    res.status(401).json({ error: "Invalid token" });

  }

}

// role middleware
function requireRole(role: string) {

  return (req: any, res: any, next: any) => {

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();

  };

}

// profile route (user allowed)
app.get("/profile", authMiddleware, (req: any, res) => {

  res.json({
    message: "User profile",
    user: req.user
  });

});

// admin route (admin only)
app.get("/admin",
  authMiddleware,
  requireRole("admin"),
  (req: any, res) => {

    res.json({
      message: "Admin access granted",
      user: req.user
    });

});

// start server
app.listen(3003, () => {
  console.log("Server running on port 3003");
});