import { Router, Request, Response } from "express"
import { createUser, getUserById } from "../repositories/UserRepository.js"

export const userRouter = Router()

// Create a new user
userRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ error: "Email is required" })
    }

    const user = await createUser(email)

    res.status(201).json(user)

  } catch (error) {
    console.error("Error creating user:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})


// Get user by ID
userRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)

    const user = await getUserById(id)

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json(user)

  } catch (error) {
    console.error("Error fetching user:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})