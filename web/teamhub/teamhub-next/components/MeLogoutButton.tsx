"use client";

import { useRouter } from "next/navigation";

export default function MeLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
      onClick={handleLogout}
      type="button"
    >
      Logout
    </button>
  );
}
