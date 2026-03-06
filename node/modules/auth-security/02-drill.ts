import Database from "better-sqlite3";
import bcrypt from "bcrypt";

// connect database
const db = new Database("users2.db");

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
  const saltRounds = 10;                                    //Combine password + salt
  return await bcrypt.hash(plain, saltRounds);
}

// compare password
async function comparePassword(plain: string, hash: string) {
  return await bcrypt.compare(plain, hash);
}

// create user
function createUser(email: string, passwordHash: string, role: string) {

  const stmt = db.prepare(`
    INSERT INTO users (email, password_hash, role)
    VALUES (?, ?, ?)
  `);

  return stmt.run(email, passwordHash, role);
}

// get user
function getUserByEmail(email: string) {

  const stmt = db.prepare(`
    SELECT * FROM users WHERE email = ?
  `);

  return stmt.get(email);
}

// test password hashing
async function test() {

  // hash password
  const hashed = await hashPassword("mypassword");

  // create user with hashed password
  await createUser("123@example.com", hashed, "user");

  const user: any = getUserByEmail("123@example.com");

  if (!user) {
    console.log("User not found");
    return;
  }

  console.log("Stored user:", user);

  // correct password test
  const isCorrect = await comparePassword("mypassword", user.password_hash);
  console.log("Correct password:", isCorrect);

  // wrong password test
  const isWrong = await comparePassword("wrongpassword", user.password_hash);
  console.log("Wrong password:", isWrong);
}

test();