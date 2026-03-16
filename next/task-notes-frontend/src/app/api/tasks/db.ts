declare global {
  var __taskNotesTaskSchemaReady__: boolean | undefined
}

export async function ensureTaskSchema() {
  // Schema is managed by Prisma migrations/db push.
  globalThis.__taskNotesTaskSchemaReady__ = true
}
