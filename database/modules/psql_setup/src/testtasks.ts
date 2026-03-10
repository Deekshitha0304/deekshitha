import { createTask } from "./tasks";
import { completeTask } from "./tasks";
import { deleteTask } from "./tasks";
import { pool } from "./database.js"


async function run() {
    const task= await createTask("Practice sql");
    console.log(task);    
}

run();



async function runUpdate() {
  const task = await completeTask(1);
  console.log(task);
}

runUpdate();




async function runDelete() {
  const task = await deleteTask(2);
  console.log(task);
}

runDelete();



async function shutdown() {
  console.log("Shutting down server...")

  await pool.end()

  console.log("Database pool closed")
  process.exit(0)
}

process.on("SIGINT", shutdown)
process.on("SIGTERM", shutdown)

shutdown();

