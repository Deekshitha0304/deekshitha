"use client"

import Link from "next/link"
import { useActionState, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { useFormStatus } from "react-dom"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import type { RegisterState } from "@/src/app/login/actions"
import { register } from "@/src/app/login/actions"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Creating account..." : "Register"}
    </Button>
  )
}

function RegisterForm({ initialState }: { initialState: RegisterState }) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [state, formAction] = useActionState(register, initialState)

  useEffect(() => {
    if (!state?.success) {
      return
    }

    const timeout = setTimeout(() => {
      router.push("/login")
    }, 1200)

    return () => clearTimeout(timeout)
  }, [router, state?.success])

  return (
    <form action={formAction} className="space-y-5">
      {state?.success && (
        <div className="rounded-md border border-emerald-600/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300">
          {state.success}
        </div>
      )}

      {state?.error && (
        <div className="rounded-md border border-destructive bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="you@example.com" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            minLength={6}
            className="pr-10"
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <p className="text-xs text-muted-foreground">Minimum 6 characters</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            required
            minLength={6}
            className="pr-10"
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <SubmitButton />

      <Button asChild variant="outline" className="w-full">
        <Link href="/login">Cancel</Link>
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Login
        </Link>
      </p>
    </form>
  )
}

export default function RegisterPage() {
  const initialState: RegisterState = {}

  return (
    <div className="mx-auto flex w-full max-w-md justify-center">
      <Card className="w-full interactive-lift">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">Create account</CardTitle>
          <p className="text-sm text-muted-foreground">
            Register to start creating and managing tasks.
          </p>
        </CardHeader>
        <CardContent>
          <RegisterForm initialState={initialState} />
        </CardContent>
      </Card>
    </div>
  )
}

