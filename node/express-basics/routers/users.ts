import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "All users" });
});

router.get("/:id", (req: Request, res: Response) => {
  res.json({ userId: req.params.id });
});

export default router;