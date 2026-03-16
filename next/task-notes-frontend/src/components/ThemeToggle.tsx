"use client"

import { useEffect, useState } from "react"

type Theme = "light" | "dark"

const THEME_STORAGE_KEY = "theme"

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)
    const initialTheme: Theme =
      storedTheme === "dark" || storedTheme === "light"
        ? storedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"

    document.documentElement.classList.toggle("dark", initialTheme === "dark")
    setTheme(initialTheme)
    setMounted(true)
  }, [])

  function applyTheme(nextTheme: Theme) {
    document.documentElement.classList.toggle("dark", nextTheme === "dark")
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    setTheme(nextTheme)
  }

  if (!mounted) {
    return (
      <div className="inline-flex h-9 items-center rounded-md border border-border px-2 text-xs text-muted-foreground">
        Theme
      </div>
    )
  }

  return (
    <fieldset
      aria-label="Theme mode"
      className="inline-flex items-center gap-1 rounded-md border border-border bg-card p-1"
    >
      <label
        className={`cursor-pointer rounded px-2 py-1 text-xs transition-colors ${
          theme === "light"
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:bg-accent/60 hover:text-accent-foreground"
        }`}
      >
        <input
          type="radio"
          name="theme"
          value="light"
          checked={theme === "light"}
          onChange={() => applyTheme("light")}
          className="sr-only"
        />
        ☀️ Light
      </label>

      <label
        className={`cursor-pointer rounded px-2 py-1 text-xs transition-colors ${
          theme === "dark"
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:bg-accent/60 hover:text-accent-foreground"
        }`}
      >
        <input
          type="radio"
          name="theme"
          value="dark"
          checked={theme === "dark"}
          onChange={() => applyTheme("dark")}
          className="sr-only"
        />
        🌙 Dark
      </label>
    </fieldset>
  )
}
