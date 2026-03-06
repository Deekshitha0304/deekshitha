import express from "express";
import Database from "better-sqlite3";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

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

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {

    const hashed = await hashPassword(password);

    const stmt = db.prepare(`
      INSERT INTO users (email, password_hash, role)
      VALUES (?, ?, ?)
    `);

    stmt.run(email, hashed, "user");

    res.status(201).json({ message: "User registered" });

  } catch (err) {

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

  res.json({ message: "Login successful" });

});

// start server
app.listen(3003, () => {
  console.log("Server running on port 3003");
});