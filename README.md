# Supabase Set-Up

A Next.js 14 + Supabase starter template with TypeScript, Tailwind CSS, ESLint, and GitHub Actions workflows for CI and deployment.

---

## Features

- ⚡ **Next.js 14** with the App Router
- 🔐 **Supabase Auth** with server-side session refresh via middleware
- 🗄️ **Supabase Database** helpers for server components and client components
- 🎨 **Tailwind CSS** for styling
- 🔎 **TypeScript** for type safety
- 🧹 **ESLint** for code quality
- 🤖 **GitHub Actions** – CI pipeline (lint + type-check + test) and optional Vercel deploy

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/hollman/supabase_set-up.git
cd supabase_set-up
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Then open `.env.local` and set:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

You can find these values in your [Supabase Dashboard](https://app.supabase.com/) under **Project Settings → API**.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
.
├── app/
│   ├── globals.css        # Tailwind CSS imports
│   ├── layout.tsx         # Root layout (HTML shell)
│   └── page.tsx           # Example page – fetches todos from Supabase
├── utils/
│   └── supabase/
│       ├── client.ts      # Browser-side Supabase client
│       ├── server.ts      # Server-side Supabase client (Server Components / Actions)
│       └── middleware.ts  # Supabase client for Next.js middleware (session refresh)
├── middleware.ts           # Root Next.js middleware (auth guard)
├── .env.example            # Environment variable template
├── .github/
│   └── workflows/
│       ├── ci.yml          # CI: lint, type-check, test
│       └── deploy.yml      # Optional: deploy to Vercel
└── ...
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the production bundle |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |
| `npm test` | Run Jest tests |

---

## GitHub Actions

### CI Workflow (`.github/workflows/ci.yml`)

Runs automatically on every push and pull request to `main`/`master`:

1. Install dependencies
2. Run ESLint
3. Run TypeScript type check
4. Run tests

### Deploy Workflow (`.github/workflows/deploy.yml`)

Deploys to **Vercel** on every push to `main`/`master`.

To enable it, add the following [repository secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets):

| Secret | Description |
|---|---|
| `VERCEL_TOKEN` | Vercel personal access token |
| `VERCEL_ORG_ID` | Vercel organisation/team ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |

---

## How It Works

### Supabase Client Helpers

| File | Usage |
|---|---|
| `utils/supabase/server.ts` | Use in **Server Components**, **Server Actions**, and **Route Handlers** |
| `utils/supabase/client.ts` | Use in **Client Components** (`"use client"`) |
| `utils/supabase/middleware.ts` | Used internally by `middleware.ts` to refresh sessions |

### Session Refresh (Middleware)

`middleware.ts` intercepts every request and calls `supabase.auth.getUser()`. This silently refreshes the user's JWT, preventing session expiry while they're active. It also demonstrates how to protect routes (e.g., redirect unauthenticated users away from `/dashboard`).

---

## Customisation

- **Add more pages** – create new files under `app/`.
- **Protect routes** – extend the `if (!user && ...)` block in `middleware.ts`.
- **Change the table** – update `supabase.from("todos")` in `app/page.tsx` with your own table name.
- **Add Supabase Storage / Realtime** – import and use the client from `utils/supabase/client.ts` or `utils/supabase/server.ts`.

---

## Resources

- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [@supabase/ssr package](https://github.com/supabase/ssr)
- [Vercel Deployment](https://vercel.com/docs)
