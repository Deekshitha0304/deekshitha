import prisma from "@/src/lib/prisma"

export interface UserRecord {
  id: string
  email: string
  passwordHash: string
  createdAt: string
  updatedAt: string
}

declare global {
  var __taskNotesAuthSchemaReady__: boolean | undefined
}

async function ensureSchema() {
  // Schema is managed by Prisma migrations/db push.
  globalThis.__taskNotesAuthSchemaReady__ = true
}

export async function getUserByEmail(email: string): Promise<UserRecord | null> {
  await ensureSchema()
  const row = await prisma.user.findUnique({
    where: { email }
  })
  if (!row) {
    return null
  }

  return {
    id: row.id,
    email: row.email,
    passwordHash: row.passwordHash,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString()
  }
}

export async function createUser(email: string, passwordHash: string): Promise<UserRecord> {
  await ensureSchema()
  const now = new Date().toISOString()
  const created = await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      email,
      passwordHash,
      createdAt: new Date(now),
      updatedAt: new Date(now)
    }
  })

  return {
    id: created.id,
    email: created.email,
    passwordHash: created.passwordHash,
    createdAt: created.createdAt.toISOString(),
    updatedAt: created.updatedAt.toISOString()
  }
}
