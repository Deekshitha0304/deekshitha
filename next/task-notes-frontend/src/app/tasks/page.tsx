import TaskItem from "../../components/TaskItem"

export default function TasksPage() {

  const tasks = [
    "Learn Next.js",
    "Build Task Notes UI",
    "Connect API"
  ]

  return (
    <main style={{ padding: "20px" }}>
      <h2>Your Tasks</h2>

      <ul>
        {tasks.map((task, index) => (
          <TaskItem key={index} title={task} />
        ))}
      </ul>

    </main>
  )
}