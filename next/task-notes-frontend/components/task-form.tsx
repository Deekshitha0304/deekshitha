"use client"

import type { FormEvent } from "react"
import { useState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"

type Priority = "low" | "medium" | "high"

type DefaultValues = {
  title?: string
  priority?: Priority
  completed?: boolean
  description?: string
}

type TaskFormProps = {
  action: (formData: FormData) => Promise<void> | void
  defaultValues?: DefaultValues
  submitLabel: string
  includeDescription?: boolean
  showCompletedCheckbox?: boolean
}

type FieldErrors = {
  title?: string
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Saving..." : label}
    </Button>
  )
}

export function TaskForm({
  action,
  defaultValues,
  submitLabel,
  includeDescription = false,
  showCompletedCheckbox = false,
}: TaskFormProps) {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    setFormError(null)

    const form = event.currentTarget
    const formData = new FormData(form)
    const title = String(formData.get("title") ?? "").trim()

    const newFieldErrors: FieldErrors = {}

    if (!title) {
      newFieldErrors.title = "Title is required"
    } else if (title.length < 3) {
      newFieldErrors.title = "Title must be at least 3 characters"
    }

    if (Object.keys(newFieldErrors).length > 0) {
      event.preventDefault()
      setFieldErrors(newFieldErrors)
      return
    }

    setFieldErrors({})
  }

  return (
    <form action={action} onSubmit={handleSubmit} className="animate-page-in-delayed space-y-5">
      {formError && (
        <div className="rounded-md border border-destructive bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {formError}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-foreground">
          Title
        </label>
        <Input
          id="title"
          name="title"
          type="text"
          defaultValue={defaultValues?.title ?? ""}
          className={`${
            fieldErrors.title
              ? "border-destructive focus-visible:ring-destructive"
              : "border-input focus-visible:ring-ring"
          }`}
          aria-invalid={fieldErrors.title ? "true" : "false"}
          aria-describedby={fieldErrors.title ? "title-error" : undefined}
        />
        {fieldErrors.title && (
          <p id="title-error" className="text-sm text-destructive">
            {fieldErrors.title}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="priority" className="text-sm font-medium text-foreground">
          Priority
        </label>
        <select
          id="priority"
          name="priority"
          defaultValue={defaultValues?.priority ?? "medium"}
          className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
      </div>

      {includeDescription && (
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium text-foreground">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            defaultValue={defaultValues?.description ?? ""}
            placeholder="Add a short description"
            className="min-h-[110px]"
          />
        </div>
      )}

      {showCompletedCheckbox && (
        <div className="flex items-center gap-2">
          <input
            id="completed"
            name="completed"
            type="checkbox"
            defaultChecked={defaultValues?.completed ?? false}
            className="h-4 w-4 rounded border-input text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          <label htmlFor="completed" className="text-sm font-medium text-foreground">
            Completed
          </label>
        </div>
      )}

      <div className="flex items-center justify-end gap-2">
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  )
}

