import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const INITIAL_TASKS = [
  {
    id: "1",
    title: "Learn Next.js Routing",
    description: "Understand file-based routing",
    year: 2024,
    completed: false,
    priority: "medium",
    createdAt: new Date("2026-03-10T09:00:00.000Z"),
    updatedAt: new Date("2026-03-12T11:30:00.000Z"),
  },
  {
    id: "2",
    title: "Build Task UI",
    description: "Create components and forms",
    year: 2024,
    completed: true,
    priority: "high",
    createdAt: new Date("2026-03-08T14:15:00.000Z"),
    updatedAt: new Date("2026-03-13T08:45:00.000Z"),
  },
] as const

async function main() {
  for (const task of INITIAL_TASKS) {
    await prisma.task.upsert({
      where: { id: task.id },
      update: {
        title: task.title,
        description: task.description,
        year: task.year,
        completed: task.completed,
        priority: task.priority,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      },
      create: {
        id: task.id,
        title: task.title,
        description: task.description,
        year: task.year,
        completed: task.completed,
        priority: task.priority,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
