import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;

export function authMiddleware(req: any, res: any, next: any) {

  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({
      error: "AUTH_FAILED",
      message: "Token required"
    });
  }

  try {

    const token = auth.split(" ")[1];

    req.user = jwt.verify(token, SECRET);

    next();

  } catch {

    res.status(401).json({
      error: "AUTH_FAILED",
      message: "Invalid token"
    });

  }

}

export function requireAdmin(req: any, res: any, next: any) {

  if (req.user.role !== "admin") {
    return res.status(403).json({
      error: "FORBIDDEN",
      message: "Admin access required"
    });
  }

  next();

}