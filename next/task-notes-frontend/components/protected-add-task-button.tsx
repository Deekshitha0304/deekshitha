"use client"

import { useRouter } from "next/navigation"
import AuthRequiredModal from "@/components/auth-required-modal"
import { useAuthGuard } from "@/components/use-auth-guard"
import { Button } from "@/src/components/ui/button"

type ProtectedAddTaskButtonProps = {
  initialAuthenticated?: boolean
}

export default function ProtectedAddTaskButton({
  initialAuthenticated = false,
}: ProtectedAddTaskButtonProps) {
  const router = useRouter()
  const { runIfAuthenticated, isAuthRequiredModalOpen, closeAuthRequiredModal } =
    useAuthGuard(initialAuthenticated)

  return (
    <>
      <Button
        type="button"
        className="transition-transform duration-200 hover:-translate-y-0.5"
        onClick={() => runIfAuthenticated(() => router.push("/tasks/new"))}
      >
        Add Task
      </Button>

      <AuthRequiredModal
        open={isAuthRequiredModalOpen}
        onClose={closeAuthRequiredModal}
        actionLabel="create tasks"
      />
    </>
  )
}
