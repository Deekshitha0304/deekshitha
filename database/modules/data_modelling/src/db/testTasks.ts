import { createCategoriesTable, insertCategories } from "./categories.js"
import { addCategoryColumn, assignCategory, getTasksGroupedByCategory } from "./tasks.js"

async function run() {

  await createCategoriesTable()
  await insertCategories()

  await addCategoryColumn()

  await assignCategory("Learn SQL", 1)
  await assignCategory("Buy milk", 3)

  const result = await getTasksGroupedByCategory()

  console.log(result)
}

run()