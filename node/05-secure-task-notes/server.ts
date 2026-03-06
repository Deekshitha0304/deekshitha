import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import { register, login } from "./auth";
import { authMiddleware } from "./middleware";
import { getTasks } from "./tasks";

dotenv.config();

const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json({ limit: "1mb" }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5
});

app.post("/register", async (req, res) => {

  try {

    await register(req.body.email, req.body.password);

    res.json({ message: "User registered" });

  } catch {

    res.status(400).json({
      error: "REGISTER_FAILED",
      message: "Email already exists"
    });

  }

});

app.post("/login", limiter, async (req, res) => {

  const token = await login(req.body.email, req.body.password);

  if (!token) {

    console.log(`Failed login from IP: ${req.ip}`);

    return res.status(401).json({
      error: "AUTH_FAILED",
      message: "Invalid credentials"
    });

  }

  res.json({ token });

});

app.get("/tasks", authMiddleware, getTasks);

app.listen(process.env.PORT, () => {
  console.log("Server running");
});