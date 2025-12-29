# ELITE SMP — Community Portal

A full-stack community website for the **ELITE SMP** Minecraft server with a dark, moody **Mac Miller “Faces”** aesthetic, glassmorphism UI, and modern React interactions.

This repo is designed to grow into:
- Community gallery (Discord screenshots + reactions)
- Payments + whitelist flow
- Live Minecraft server status
- **AI Bot Live View (24/7)** section (read-only feed)

---

## Tech Stack

- **Frontend:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS + shadcn/ui + Framer Motion
- **Routing:** wouter
- **Backend:** Express (TypeScript)
- **API:** tRPC
- **Database:** MySQL (via Drizzle ORM)
- **Storage:** AWS S3
- **Payments:** Stripe
- **Discord:** discord.js (imports + metadata)

---

## What’s in here (high level)

### Core Features (planned / in progress)
- **Community Gallery**
  - Discord screenshot import
  - Store: uploader, date, caption, reactions
  - Lightbox viewer
  - Daily scheduled sync (server-side)
- **AI Bot Live View (24/7)**
  - View-only dashboard of bot activity driven by in-game commands
  - Live feed via SSE or WebSocket (recommended: SSE)
- **Whitelist + Payments**
  - Stripe one-time payment
  - Auto-whitelist on success
  - Payment history
- **Admin**
  - Manage users
  - Review applications / whitelist status

---

## Project Scripts

These scripts come from `package.json`:

- `pnpm dev` — run dev server (Express + Vite)
- `pnpm build` — build client + bundle server
- `pnpm start` — run production server build
- `pnpm check` — TypeScript typecheck
- `pnpm format` — Prettier
- `pnpm test` — Vitest
- `pnpm db:push` — Drizzle generate + migrate

---

## Local Development

### 1) Install dependencies
```bash
pnpm install
