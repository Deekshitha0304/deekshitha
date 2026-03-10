import { createTagsTable, insertTags } from "./tags.js"
import { createTaskTagsTable, assignTag, getTasksWithTags } from "./taskTags.js"
import { pool } from "./db.js"


async function run() {

    console.log(await pool.query("SELECT id,title FROM tasks"))
    console.log(await pool.query("SELECT * FROM tags"))


  await createTagsTable()
  await insertTags()

  await createTaskTagsTable()

  await assignTag(1,1)
  await assignTag(1,3)
  await assignTag(1,2)

  const result = await getTasksWithTags()

  console.log(result)
}

run()