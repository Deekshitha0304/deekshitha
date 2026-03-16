"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Toaster, toast } from "sonner"
import { z } from "zod"
import { api } from "@/lib/api"
import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import { Textarea } from "@/src/components/ui/textarea"

const INVALID_DETAILS_MESSAGE = "Invalid details. Please fill in all required fields."

const formSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
  priority: z.enum(["low", "medium", "high"], {
    message: "Priority is required",
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function NewTaskForm() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
    },
  })

  async function onSubmit(values: FormValues) {
    setServerError(null)
    try {
      const normalizedPriority = values.priority.toLowerCase() as "low" | "medium" | "high"

      await api.createTask({
        title: values.title.trim(),
        description: values.description.trim(),
        priority: normalizedPriority,
      })

      toast.success("Task created successfully")
      sessionStorage.setItem("tasks-refresh-on-arrival", "1")
      router.push("/tasks")
      router.refresh()
    } catch (error) {
      const message = error instanceof Error ? error.message : INVALID_DETAILS_MESSAGE
      setServerError(message)
      toast.error(message)
    }
  }

  function onInvalidSubmit() {
    setServerError(INVALID_DETAILS_MESSAGE)
    toast.error(INVALID_DETAILS_MESSAGE)
  }

  const isSubmitting = form.formState.isSubmitting

  return (
    <>
      <Toaster position="top-right" richColors />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onInvalidSubmit)}
          className="animate-page-in-delayed space-y-5"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Finish homework"
                    {...field}
                    className={cn(
                      "transition-colors duration-200",
                      form.formState.errors.title && "border-destructive"
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add a short description"
                    className={cn(
                      "min-h-[110px] transition-colors duration-200",
                      form.formState.errors.description && "border-destructive"
                    )}
                    {...field}
                  />
                </FormControl>
                <FormDescription>This helps when you revisit the task later.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger
                      className={cn(
                        "transition-colors duration-200",
                        form.formState.errors.priority && "border-destructive"
                      )}
                    >
                      <SelectValue placeholder="Choose priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {serverError && <p className="text-sm font-medium text-destructive">{serverError}</p>}

          <div className="flex items-center justify-end gap-2">
            <Button type="button" variant="outline" asChild>
              <Link href="/tasks">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting} className="transition-transform duration-200 hover:-translate-y-0.5">
              {isSubmitting ? "Creating..." : "Create task"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
