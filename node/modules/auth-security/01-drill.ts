import Database from "better-sqlite3";

// create or open database file
const db = new Database("users.db");

console.log("Database connected");

// create users table

db.prepare(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  password_hash TEXT,
  role TEXT
)
`).run();

console.log("Users table ready");



// create user

function createUser(email: string, passwordHash: string, role: string) {

  const stmt = db.prepare(`
    INSERT INTO users (email, password_hash, role)
    VALUES (?, ?, ?)
  `);

  return stmt.run(email, passwordHash, role);
}


// get user by email

function getUserByEmail(email: string) {

  const stmt = db.prepare(`
    SELECT * FROM users WHERE email = ?
  `);

  return stmt.get(email);
}


createUser("test@example.com", "hashed123", "user");

const user = getUserByEmail("test@example.com");

console.log("User:", user);


function closeDb() {
  db.close();
  console.log("Database closed");
}

process.on("exit", closeDb);