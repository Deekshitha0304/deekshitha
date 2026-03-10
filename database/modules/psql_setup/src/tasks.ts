import { pool } from "./db";

export async function createTask(title: string) {
  try {
    const result = await pool.query(
      "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
      [title]
    );

    return result.rows[0];

  } catch (error: any) {

    if (error.code === "23514") {
      throw new Error("Task title cannot be empty");
    }

    throw error;
  }
}



export async function getTasksByStatus(completed: boolean) {
  const result = await pool.query(
    "SELECT * FROM tasks WHERE completed = $1",
    [completed]
  );

  return result.rows;
}


export async function completeTask(id: number) {
  const result = await pool.query(
    "UPDATE tasks SET completed = true WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
}

export async function deleteTask(id: number) {
  const result = await pool.query(
    "DELETE FROM tasks WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
}




