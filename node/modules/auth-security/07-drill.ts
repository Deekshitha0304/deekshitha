import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app = express();

// disable express fingerprint
app.disable("x-powered-by");                            // disables backend framework showing

// helmet security headers
app.use(helmet());                                      // auto security headers

// allow only frontend origin
app.use(cors({                                          // which frontend can access api -> cors
  origin: "http://localhost:3000"
}));

// request size limit
app.use(express.json({ limit: "1mb" }));

// rate limit login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 attempts
  message: "Too many login attempts. Try again later."
});

// example login route with rate limiting
app.post("/login", loginLimiter, (req, res) => {
  res.json({ message: "Login endpoint working" });
});

// test route
app.get("/test", (req, res) => {
  res.json({ message: "Server secure" });
});

app.listen(3003, () => {
  console.log("Server running on port 3003");
});