"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/articles", label: "Articles" },
  { href: "/team", label: "Team" },
];

type AuthNavProps = {
  initialUserName: string | null;
};

export default function AuthNav({ initialUserName }: AuthNavProps) {
  const router = useRouter();
  const isLoggedIn = Boolean(initialUserName);
  const userName = initialUserName ?? "";

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-3 px-6 py-4">
      <Link className="text-lg font-semibold tracking-tight" href="/">
        TeamHub
      </Link>

      <nav className="ml-1 flex flex-wrap items-center gap-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            className="rounded-lg border border-border bg-card px-4 py-2 text-sm transition hover:-translate-y-0.5 hover:shadow-md"
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        {!isLoggedIn ? (
          <Link
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
            href="/login"
          >
            Login
          </Link>
        ) : null}

        {isLoggedIn ? (
          <>
            <span className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted">
              {userName ? `Hi, ${userName}` : "Logged in"}
            </span>
            <Link
              className="rounded-lg border border-border bg-card px-4 py-2 text-sm transition hover:-translate-y-0.5 hover:shadow-md"
              href="/me"
            >
              My Profile
            </Link>
            <button
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
              onClick={handleLogout}
              type="button"
            >
              Logout
            </button>
          </>
        ) : null}

      </div>
    </div>
  );
}
