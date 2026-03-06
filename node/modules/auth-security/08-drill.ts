import express from "express";
import Database from "better-sqlite3";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));

const PORT = process.env.PORT || 3003;
const SECRET = process.env.JWT_SECRET as string;

// database
const db = new Database("users.db");

db.prepare(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  password_hash TEXT,
  role TEXT
)
`).run();

// rate limit for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    error: "RATE_LIMIT",
    message: "Too many login attempts. Try again later."
  }
});

// consistent error helper
function authError(res: any, message: string) {
  return res.status(401).json({
    error: "AUTH_FAILED",
    message
  });
}

// hash password
async function hashPassword(plain: string) {
  return await bcrypt.hash(plain, 10);
}

// register
app.post("/register", async (req, res) => {

  const { email, password } = req.body;

  try {

    const hash = await hashPassword(password);

    db.prepare(`
      INSERT INTO users (email, password_hash, role)
      VALUES (?, ?, ?)
    `).run(email, hash, "user");

    res.json({ message: "User registered" });

  } catch {

    res.status(400).json({
      error: "REGISTER_FAILED",
      message: "Email already exists"
    });

  }

});

// login
app.post("/login", loginLimiter, async (req, res) => {

  const { email, password } = req.body;

  const user: any = db.prepare(
    "SELECT * FROM users WHERE email = ?"
  ).get(email);

  if (!user) {
    console.log(`Failed login attempt from IP: ${req.ip}`);
    return authError(res, "Invalid credentials");
  }

  const valid = await bcrypt.compare(password, user.password_hash);

  if (!valid) {
    console.log(`Failed login attempt from IP: ${req.ip}`);
    return authError(res, "Invalid credentials");
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });

});

// protected route
app.get("/profile", (req, res) => {
  res.json({ message: "Profile route working" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});