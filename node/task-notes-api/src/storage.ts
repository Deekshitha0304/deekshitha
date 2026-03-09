import { promises as fs } from "fs"
import path from "path"

export class FileStorage {
  constructor(private dataPath: string) {}

  async loadNotes(): Promise<any[]> {
    try {
      const data = await fs.readFile(this.dataPath, "utf-8")
      return JSON.parse(data)
    } catch (error) {
      return []
    }
  }

  async saveNotes(notes: any[]): Promise<void> {
    const data = JSON.stringify(notes, null, 2)
    await fs.writeFile(this.dataPath, data)
  }

  async watchChanges(callback: () => void): Promise<void> {
    const fsWatch = await import("fs")
    
    fsWatch.watch(this.dataPath, () => {
      callback()
    })
  }
}