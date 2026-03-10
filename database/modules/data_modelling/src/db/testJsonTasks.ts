import {
  addMetadataColumn,
  addTaskMetadata,
  getHighPriorityTasks,
  addCompletionTime,
  createMetadataIndex
} from "./tasks_jsonb.js"

async function run() {

  await addMetadataColumn()

  await addTaskMetadata(1)

  const tasks = await getHighPriorityTasks()
  console.log("High priority tasks:", tasks)

  await addCompletionTime(1)

  await createMetadataIndex()

}

run()