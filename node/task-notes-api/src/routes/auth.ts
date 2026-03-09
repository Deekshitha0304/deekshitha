import { Router } from "express"
import { AuthService } from "../auth/service.js"
import { UserDatabase } from "../database.js"

export const authRouter = Router()

const userDb = new UserDatabase()
const authService = new AuthService(userDb)

authRouter.post("/register", async (req, res) => {

  const { email, password } = req.body

  try {

    const user = await authService.register(email, password)

    res.json({
      id: user.id,
      email: user.email
    })

  } catch (err) {
    res.status(400).json({ error: "User already exists" })
  }

})

authRouter.post("/login", async (req, res) => {

  const { email, password } = req.body

  try {

    const token = await authService.login(email, password)

    res.json({ token })

  } catch {
    res.status(401).json({ error: "Invalid credentials" })
  }

})