"use client"

import { useEffect, useMemo, useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import type { Task } from "@/lib/api"
import AuthRequiredModal from "@/components/auth-required-modal"
import EditTaskModal from "@/components/edit-task-modal"
import TaskActions from "@/components/task-actions"
import { useAuthGuard } from "@/components/use-auth-guard"
import { toggleTaskCompletion, deleteTask } from "@/lib/actions"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"

type TasksInteractiveListProps = {
  tasks: Task[]
  initialAuthenticated?: boolean
}

type TaskWithId = Task & { id: string | number }

export function TasksInteractiveList({
  tasks,
  initialAuthenticated = false,
}: TasksInteractiveListProps) {
  const router = useRouter()
  const { runIfAuthenticated, isAuthRequiredModalOpen, closeAuthRequiredModal } =
    useAuthGuard(initialAuthenticated)
  const [orderedTasks, setOrderedTasks] = useState<TaskWithId[]>(() =>
    tasks.map(task => ({ ...task, id: task.id ?? String(task.title) })) // fallback, should already have id
  )
  const [draggingId, setDraggingId] = useState<string | number | null>(null)
  const [selectedTaskIds, setSelectedTaskIds] = useState<Array<string | number>>([])
  const [search, setSearch] = useState("")
  const [searchInputFocused, setSearchInputFocused] = useState(false)
  const [isBulkPending, startBulkTransition] = useTransition()
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const dragOverIdRef = useRef<string | number | null>(null)

  useEffect(() => {
    setOrderedTasks(prevOrdered => {
      const prevById = new Map(prevOrdered.map(task => [task.id, task]))
      return tasks.map(task => {
        const id = task.id ?? String(task.title)
        const previous = prevById.get(id)
        return previous ? { ...previous, ...task, id } : { ...task, id }
      })
    })
  }, [tasks])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const isTypingTarget =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)

      // "/" focuses search, but don't interfere when already typing in an input
      if (event.key === "/" && !event.altKey && !event.ctrlKey && !event.metaKey) {
        if (!isTypingTarget) {
          event.preventDefault()
          searchInputRef.current?.focus()
        }
        return
      }

      // "N" navigates to new task
      if ((event.key === "n" || event.key === "N") && !event.altKey && !event.ctrlKey && !event.metaKey) {
        if (!isTypingTarget) {
          event.preventDefault()
          runIfAuthenticated(() => router.push("/tasks/new"))
        }
        return
      }

      // "Escape" closes any open modal (broadcast event)
      if (event.key === "Escape") {
        window.dispatchEvent(new CustomEvent("app-escape"))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [router, runIfAuthenticated])

  // Filtered tasks with debounced search
  const [debouncedSearch, setDebouncedSearch] = useState("")
  useEffect(() => {
    const id = window.setTimeout(() => {
      setDebouncedSearch(search.toLowerCase())
    }, 300)
    return () => window.clearTimeout(id)
  }, [search])

  const filteredTasks = useMemo(() => {
    if (!debouncedSearch) return orderedTasks
    return orderedTasks.filter(task =>
      String(task.title ?? "")
        .toLowerCase()
        .includes(debouncedSearch)
    )
  }, [orderedTasks, debouncedSearch])

  // Drag and drop helpers
  const handleDragStart = (taskId: string | number) => {
    setDraggingId(taskId)
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>, overId: string | number) => {
    event.preventDefault()
    dragOverIdRef.current = overId
  }

  const handleDrop = () => {
    if (draggingId == null || dragOverIdRef.current == null || draggingId === dragOverIdRef.current) {
      setDraggingId(null)
      dragOverIdRef.current = null
      return
    }

    const currentIndex = orderedTasks.findIndex(task => task.id === draggingId)
    const overIndex = orderedTasks.findIndex(task => task.id === dragOverIdRef.current)
    if (currentIndex === -1 || overIndex === -1) {
      setDraggingId(null)
      dragOverIdRef.current = null
      return
    }

    const updated = [...orderedTasks]
    const [moved] = updated.splice(currentIndex, 1)
    updated.splice(overIndex, 0, moved)
    setOrderedTasks(updated)

    setDraggingId(null)
    dragOverIdRef.current = null
  }

  const toggleSelection = (id: string | number) => {
    setSelectedTaskIds(prev =>
      prev.includes(id) ? prev.filter(existingId => existingId !== id) : [...prev, id]
    )
  }

  const clearSelection = () => setSelectedTaskIds([])

  const areAnySelected = selectedTaskIds.length > 0

  const handleBulkComplete = () => {
    if (!areAnySelected) return
    runIfAuthenticated(() => {
      startBulkTransition(async () => {
        try {
          for (const id of selectedTaskIds) {
            await toggleTaskCompletion(id, true)
          }
          clearSelection()
          router.refresh()
        } catch (error) {
          console.error("Failed to complete selected tasks:", error)
        }
      })
    })
  }

  const handleBulkDelete = () => {
    if (!areAnySelected) return
    runIfAuthenticated(() => {
      const confirmed = window.confirm("Delete selected tasks? This cannot be undone.")
      if (!confirmed) return

      startBulkTransition(async () => {
        try {
          for (const id of selectedTaskIds) {
            await deleteTask(id)
          }
          clearSelection()
          router.refresh()
        } catch (error) {
          console.error("Failed to delete selected tasks:", error)
        }
      })
    })
  }

  const getPriorityBadgeClasses = (priority: string) => {
    if (priority === "high") return "bg-red-100 text-red-800"
    if (priority === "low") return "bg-green-100 text-green-800"
    return "bg-yellow-100 text-yellow-800"
  }

  const formatDate = (value: string | number | Date) => {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return ""
    // Use a stable, locale-independent format to avoid hydration mismatches
    return date.toISOString().slice(0, 10)
  }

  return (
    <Card className="mt-6">
      <CardHeader className="pb-3 space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-lg">Task List</CardTitle>
          <div className="text-xs text-muted-foreground">
            Shortcuts: <kbd className="rounded border px-1">N</kbd> new task,{" "}
            <kbd className="rounded border px-1">/</kbd> search,{" "}
            <kbd className="rounded border px-1">Esc</kbd> close modals
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <input
            ref={searchInputRef}
            type="search"
            placeholder="Search tasks..."
            value={search}
            onChange={event => setSearch(event.target.value)}
            onFocus={() => setSearchInputFocused(true)}
            onBlur={() => setSearchInputFocused(false)}
            className="flex h-9 w-full max-w-md rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          {areAnySelected && (
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
              <span className="text-muted-foreground">
                {selectedTaskIds.length} tasks selected
              </span>
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={isBulkPending}
                onClick={handleBulkComplete}
                className="h-8 px-2"
              >
                {isBulkPending ? "Updating..." : "Mark Selected Complete"}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="destructive"
                disabled={isBulkPending}
                onClick={handleBulkDelete}
                className="h-8 px-2"
              >
                {isBulkPending ? "Deleting..." : "Delete Selected"}
              </Button>
              <button
                type="button"
                onClick={clearSelection}
                className="text-xs text-muted-foreground underline-offset-2 hover:underline"
              >
                Clear Selection
              </button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {filteredTasks.length === 0 ? (
          <div className="rounded-lg border border-dashed border-muted-foreground/30 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              {search && !searchInputFocused
                ? "No tasks match your search."
                : "No tasks found."}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredTasks.map(task => {
              const isSelected = selectedTaskIds.includes(task.id)
              const isDragging = draggingId === task.id

              return (
                <Card
                  key={String(task.id)}
                  draggable
                  onDragStart={() => handleDragStart(task.id)}
                  onDragOver={event => handleDragOver(event, task.id)}
                  onDrop={handleDrop}
                  onDragEnd={handleDrop}
                  className={`interactive-lift animate-page-in-delayed ${
                    task.completed ? "bg-gray-50 opacity-60" : ""
                  } ${isDragging ? "ring-2 ring-primary/60" : ""}`}
                >
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelection(task.id)}
                          className="mt-1 h-4 w-4 rounded border-input text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                        <div className="min-w-0">
                          <a
                            href={`/tasks/${task.id}`}
                            className={`block truncate text-base font-semibold transition-colors duration-200 hover:text-primary ${
                              task.completed ? "line-through text-gray-500" : "text-foreground"
                            }`}
                          >
                            {task.title}
                          </a>
                          {task.description ? (
                            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                              {task.description}
                            </p>
                          ) : null}
                          <p className="mt-1 text-sm text-muted-foreground">
                            Priority: {task.priority}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="transition-transform duration-200 hover:-translate-y-0.5"
                        >
                          <a href={`/tasks/${task.id}`}>View</a>
                        </Button>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${getPriorityBadgeClasses(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                        {!task.completed && (
                          <EditTaskModal task={task} initialAuthenticated={initialAuthenticated} />
                        )}
                        <TaskActions
                          task={{
                            id: task.id,
                            title: task.title,
                            completed: task.completed,
                          }}
                          initialAuthenticated={initialAuthenticated}
                        />
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <p>
                        <span className="font-medium text-foreground">Created:</span>{" "}
                        {formatDate(task.createdAt)}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">Updated:</span>{" "}
                        {formatDate(task.updatedAt)}
                      </p>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                          task.completed
                            ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                            : "bg-sky-50 text-sky-700 ring-1 ring-sky-200"
                        }`}
                      >
                        {task.completed ? "Completed" : "In progress"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </CardContent>

      <AuthRequiredModal
        open={isAuthRequiredModalOpen}
        onClose={closeAuthRequiredModal}
        actionLabel="perform this task action"
      />
    </Card>
  )
}

