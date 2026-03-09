import { TaskEventEmitter } from "./events"

const events = new TaskEventEmitter()

events.on("taskCreated", (task) => {
  console.log("New task:", task)
})

events.emitTaskCreated({ id: "1", title: "Study Node.js" })