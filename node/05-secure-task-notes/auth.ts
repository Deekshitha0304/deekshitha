import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "./db";

const SECRET = process.env.JWT_SECRET as string;

export async function register(email: string, password: string) {

  const hash = await bcrypt.hash(password, 10);

  db.prepare(`
    INSERT INTO users (email, password_hash, role)
    VALUES (?, ?, ?)
  `).run(email, hash, "user");

}

export async function login(email: string, password: string) {

  const user: any = db.prepare(
    "SELECT * FROM users WHERE email = ?"
  ).get(email);

  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password_hash);

  if (!valid) return null;

  return jwt.sign(
    { id: user.id, role: user.role },
    SECRET,
    { expiresIn: "1h" }
  );

}