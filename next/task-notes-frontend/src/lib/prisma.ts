import { PrismaClient } from "@prisma/client"

declare global {
  var __taskNotesPrisma__: PrismaClient | undefined
}

const prisma = globalThis.__taskNotesPrisma__ ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalThis.__taskNotesPrisma__ = prisma
}

export default prisma
