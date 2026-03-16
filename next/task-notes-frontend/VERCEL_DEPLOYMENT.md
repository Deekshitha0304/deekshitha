# Vercel Deployment Guide

## 1) Prerequisites

- GitHub repository connected to Vercel
- Project root for deployment: `next/task-notes-frontend`
- Neon Postgres database created
- Environment variables configured in Vercel:
  - `NEXT_PUBLIC_API_URL`
  - `JWT_SECRET`
  - `DATABASE_URL`

## 2) Recommended Environment Values

- `NEXT_PUBLIC_API_URL`: your production URL, for example `https://your-app.vercel.app`
- `JWT_SECRET`: long random string (at least 32 chars)
- `DATABASE_URL`: Neon connection string (`postgresql://...` with `sslmode=require`)

## 3) Database Notes (Important)

This project uses managed Postgres on Neon via Prisma (`@prisma/client`).

- Data persists in Neon across deploys and serverless restarts.
- Set `DATABASE_URL` for local and production environments.

## 4) Deploy From Vercel Dashboard

1. Import the GitHub repo in Vercel.
2. Set **Root Directory** to `next/task-notes-frontend`.
3. Add environment variables from section 2.
4. Deploy.
5. After first deploy, run `npm run prisma:push` once with production `DATABASE_URL` to create/update tables.

## 5) Post-Deploy Validation

- Open `/login` and register a user.
- Create, edit, and delete a task.
- Refresh and confirm behavior.
- Re-deploy and confirm data still exists.
