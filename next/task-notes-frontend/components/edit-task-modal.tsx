"use client"

import { FormEvent, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useRouter } from "next/navigation"
import AuthRequiredModal from "@/components/auth-required-modal"
import { useAuthGuard } from "@/components/use-auth-guard"
import { api, type ApiError, type Task as ApiTask } from "@/lib/api"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"

interface Task extends ApiTask {
  description?: string
}

interface EditTaskModalProps {
  task: Task
  initialAuthenticated?: boolean
}

export default function EditTaskModal({
  task,
  initialAuthenticated = false,
}: EditTaskModalProps) {
  const router = useRouter()
  const { runIfAuthenticated, isAuthRequiredModalOpen, closeAuthRequiredModal } =
    useAuthGuard(initialAuthenticated)
  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [title, setTitle] = useState(task.title)
  const [priority, setPriority] = useState(task.priority.toLowerCase())
  const [description, setDescription] = useState(task.description ?? "")

  // Close on global Escape shortcut
  useEffect(() => {
    const handler = () => {
      setIsOpen(false)
    }
    window.addEventListener("app-escape", handler as EventListener)
    return () => window.removeEventListener("app-escape", handler as EventListener)
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage("")

    try {
      setIsSaving(true)
      const normalizedPriority = priority.toLowerCase()
      const updatedData = {
        title: title.trim(),
        priority:
          normalizedPriority === "low" ||
          normalizedPriority === "medium" ||
          normalizedPriority === "high"
            ? normalizedPriority
            : "medium",
        description: description.trim()
      }

      await api.updateTask(task.id, updatedData as Parameters<typeof api.updateTask>[1])
      router.refresh()
      setIsOpen(false)
    } catch (error) {
      if ((error as ApiError | undefined)?.status === 401) {
        setIsOpen(false)
        router.push("/login")
        router.refresh()
        return
      }

      setErrorMessage(error instanceof Error ? error.message : "Failed to update task.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => runIfAuthenticated(() => setIsOpen(true))}
        className="rounded-md border border-input px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent"
      >
        Edit
      </button>

      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setIsOpen(false)}
            role="presentation"
          >
            <div
              className="w-full max-w-md rounded-lg bg-background p-5 shadow-xl"
              onClick={e => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="edit-task-title"
            >
              <h2 id="edit-task-title" className="text-lg font-semibold text-foreground">
                Edit Task
              </h2>

              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                {errorMessage ? (
                  <p className="rounded-md border border-destructive bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {errorMessage}
                  </p>
                ) : null}
                <div>
                  <label htmlFor="edit-title" className="mb-1 block text-sm font-medium">
                    Title
                  </label>
                  <input
                    id="edit-title"
                    type="text"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/40"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="edit-priority" className="mb-1 block text-sm font-medium">
                    Priority
                  </label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger
                      id="edit-priority"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/40"
                    >
                      <SelectValue placeholder="Choose priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="edit-description" className="mb-1 block text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    id="edit-description"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/40"
                    rows={4}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    disabled={isSaving}
                    className="rounded-md border border-input px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}

      <AuthRequiredModal
        open={isAuthRequiredModalOpen}
        onClose={closeAuthRequiredModal}
        actionLabel="edit tasks"
      />
    </>
  )
}
