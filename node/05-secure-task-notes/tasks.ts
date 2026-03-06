import db from "./db";

export function getTasks(req: any, res: any) {

  if (req.user.role === "admin") {

    const tasks = db.prepare(
      "SELECT * FROM tasks"
    ).all();

    return res.json(tasks);

  }

  const tasks = db.prepare(
    "SELECT * FROM tasks WHERE user_id = ?"
  ).all(req.user.id);

  res.json(tasks);

}