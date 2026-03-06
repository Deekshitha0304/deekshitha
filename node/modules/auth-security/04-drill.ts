import express from "express";
import Database from "better-sqlite3";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

const SECRET = "mysecretkey";

// connect database
const db = new Database("users.db");

// create users table
db.prepare(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  password_hash TEXT,
  role TEXT
)
`).run();

// hash password
async function hashPassword(plain: string) {
  return await bcrypt.hash(plain, 10);
}

// compare password
async function comparePassword(plain: string, hash: string) {
  return await bcrypt.compare(plain, hash);
}

// register route
app.post("/register", async (req, res) => {

  const { email, password } = req.body;

  try {

    const hash = await hashPassword(password);

    const stmt = db.prepare(`
      INSERT INTO users (email, password_hash, role)
      VALUES (?, ?, ?)
    `);

    stmt.run(email, hash, "user");

    res.json({ message: "User registered" });

  } catch {
    res.status(400).json({ error: "Email already exists" });
  }

});

// login route
app.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const stmt = db.prepare(`
    SELECT * FROM users WHERE email = ?
  `);

  const user: any = stmt.get(email);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const valid = await comparePassword(password, user.password_hash);

  if (!valid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // create jwt token
  const token = jwt.sign(
    { id: user.id, role: user.role },
    SECRET,
    { expiresIn: "1m" }
  );

  res.json({ token });

});

// protected test route
app.get("/profile", (req, res) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token required" });
  }

  const token = authHeader.split(" ")[1];

  try {

    const decoded = jwt.verify(token, SECRET);

    res.json({
      message: "Token valid",
      user: decoded
    });

  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }

});

// start server
app.listen(3004, () => {
  console.log("Server running on port 3004");
});