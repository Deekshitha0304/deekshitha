import { Request, Response, NextFunction } from "express"
import { AuthService } from "./service.js"
import { UserDatabase } from "../database.js"

const authService = new AuthService(new UserDatabase())

export function requireAuth(req: Request, res: Response, next: NextFunction) {

  const header = req.headers.authorization

  if (!header) {
    return res.status(401).json({ error: "Missing token" })
  }

  const token = header.split(" ")[1]

  try {

    const payload = authService.verifyToken(token)

    ;(req as any).user = payload

    next()

  } catch {
    res.status(401).json({ error: "Invalid token" })
  }

}