# Vercel Deployment Guide

## 1) Prerequisites

- GitHub repository connected to Vercel
- Project root for deployment: `next/task-notes-frontend`
- Environment variables configured in Vercel:
  - `NEXT_PUBLIC_API_URL`
  - `JWT_SECRET`

## 2) Recommended Environment Values

- `NEXT_PUBLIC_API_URL`: your production URL, for example `https://your-app.vercel.app`
- `JWT_SECRET`: long random string (at least 32 chars)

## 3) Database Notes (Important)

This project currently uses `better-sqlite3` and writes runtime files.

- On Vercel, app code storage is read-only.
- This branch writes SQLite files to `/tmp/task-notes-frontend-data` on Vercel (writable).
- `/tmp` is ephemeral, so data is not guaranteed to persist long-term.

For production persistence, migrate to a managed database (for example Neon/Postgres, Supabase, or Vercel Postgres).

## 4) Deploy From Vercel Dashboard

1. Import the GitHub repo in Vercel.
2. Set **Root Directory** to `next/task-notes-frontend`.
3. Add environment variables from section 2.
4. Deploy.

## 5) Post-Deploy Validation

- Open `/login` and register a user.
- Create, edit, and delete a task.
- Refresh and confirm behavior.
- Re-deploy once and verify whether data resets (expected with `/tmp` SQLite).
