"use client"

import Link from "next/link"
import { useActionState, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useFormStatus } from "react-dom"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import type { LoginState } from "./actions"
import { login } from "./actions"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Signing in..." : "Login"}
    </Button>
  )
}

function LoginForm({ initialState }: { initialState: LoginState }) {
  "use client"

  const [showPassword, setShowPassword] = useState(false)
  const [state, formAction] = useActionState(login, initialState)

  return (
    <form action={formAction} className="space-y-5">
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
        <Link href="/">Cancel</Link>
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-primary hover:underline">
          Register
        </Link>
      </p>
    </form>
  )
}

export default function LoginPage() {
  const initialState: LoginState = {}

  return (
    <div className="mx-auto flex w-full max-w-md justify-center">
      <Card className="w-full interactive-lift">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">Login</CardTitle>
          <p className="text-sm text-muted-foreground">
            Sign in to access your tasks.
          </p>
        </CardHeader>
        <CardContent>
          <LoginForm initialState={initialState} />
        </CardContent>
      </Card>
    </div>
  )
}

