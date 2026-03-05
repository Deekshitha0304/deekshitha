import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "All posts" });
});

router.get("/:id", (req: Request, res: Response) => {
  res.json({ postId: req.params.id });
});

export default router;