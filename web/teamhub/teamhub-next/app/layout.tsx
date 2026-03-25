import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import AuthNav from "@/components/AuthNav";
import { team } from "@/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TeamHub",
  description: "TeamHub project and collaboration dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get("session")?.value;
  const sessionUserId = Number(sessionValue);
  const sessionUser = Number.isFinite(sessionUserId)
    ? team.find((member) => member.id === sessionUserId) ?? null
    : null;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full bg-background text-foreground"
      >
        <header className="sticky top-0 z-20 border-b border-border bg-background">
          <AuthNav initialUserName={sessionUser?.name ?? null} />
        </header>
        <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-6">{children}</main>
      </body>
    </html>
  );
}
