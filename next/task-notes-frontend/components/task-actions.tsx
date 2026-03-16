"use client"

import { useEffect, useState, useTransition } from "react"
import { createPortal } from "react-dom"
import { useRouter } from "next/navigation"
import AuthRequiredModal from "@/components/auth-required-modal"
import { useAuthGuard } from "@/components/use-auth-guard"
import { deleteTask, toggleTaskCompletion } from "@/lib/actions"

interface TaskActionsProps {
  task: {
    id: string | number
    title: string
    completed: boolean
  }
  initialAuthenticated?: boolean
}

export default function TaskActions({ task, initialAuthenticated = false }: TaskActionsProps) {
  const router = useRouter()
  const { runIfAuthenticated, isAuthRequiredModalOpen, closeAuthRequiredModal } =
    useAuthGuard(initialAuthenticated)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isTogglePending, startToggleTransition] = useTransition()
  const [isDeletePending, startDeleteTransition] = useTransition()

  const isBusy = isTogglePending || isDeletePending

  const handleToggle = () => {
    startToggleTransition(async () => {
      try {
        await toggleTaskCompletion(task.id, !task.completed)
        router.refresh()
      } catch (error) {
        console.error("Failed to toggle task completion:", error)
      }
    })
  }

  const handleDeleteConfirm = () => {
    startDeleteTransition(async () => {
      try {
        await deleteTask(task.id)
        setIsDeleteModalOpen(false)
        router.refresh()
      } catch (error) {
        console.error("Failed to delete task:", error)
      }
    })
  }

  // Close delete modal on global Escape shortcut
  useEffect(() => {
    const handler = () => {
      setIsDeleteModalOpen(false)
    }
    window.addEventListener("app-escape", handler as EventListener)
    return () => window.removeEventListener("app-escape", handler as EventListener)
  }, [])

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => runIfAuthenticated(handleToggle)}
          disabled={isBusy}
          className="rounded-md border border-input px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isTogglePending
            ? "Updating..."
            : task.completed
              ? "Mark Incomplete"
              : "Mark Complete"}
        </button>

        <button
          type="button"
          onClick={() => runIfAuthenticated(() => setIsDeleteModalOpen(true))}
          disabled={isBusy}
          className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isDeletePending ? "Deleting..." : "Delete"}
        </button>
      </div>

      {isDeleteModalOpen && typeof document !== "undefined"
        ? createPortal(
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="w-full max-w-md rounded-lg bg-background p-5 shadow-xl">
                <h2 className="text-lg font-semibold text-foreground">Delete task?</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Are you sure you want to delete &quot;{task.title}&quot;? This action cannot be undone.
                </p>

                <div className="mt-4 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsDeleteModalOpen(false)}
                    disabled={isBusy}
                    className="rounded-md border border-input px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteConfirm}
                    disabled={isBusy}
                    className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isDeletePending ? "Deleting..." : "Confirm Delete"}
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}

      <AuthRequiredModal
        open={isAuthRequiredModalOpen}
        onClose={closeAuthRequiredModal}
        actionLabel={task.completed ? "mark tasks incomplete" : "mark tasks complete"}
      />
    </>
  )
}
