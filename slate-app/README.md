# Slate

A smart internship and fresher job offer analyzer that tells you if an opportunity is solid, risky, or exploitative, with clear reasoning.

## What it does

- **Paste** any offer letter, internship message, or job description
- **Analyze** with AI + heuristics across 5 dimensions (compensation, role clarity, legal clarity, growth potential, risk signals)
- **Decide** with red flags, missing clarity points, and suggested questions to ask the employer

## Tech stack

- **Frontend:** Next.js 14 (App Router), Tailwind CSS
- **Backend:** Next.js API routes, Google Gemini (free tier)
- **Storage:** Supabase (free tier) for saving & shareable links

## Setup

1. **Clone and install**
   ```bash
   cd slate-app
   npm install
   ```

2. **Environment variables**
   - Copy `.env.example` to `.env.local`
   - Get a free [Gemini API key](https://aistudio.google.com/app/apikey)
   - Create a free [Supabase](https://supabase.com/dashboard) project
   - Run `supabase-schema.sql` in Supabase SQL Editor
   - Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from your project settings
   - For auth: In Supabase Dashboard → Authentication → Providers, ensure Email is enabled. Optionally disable "Confirm email" for easier local testing.

3. **Run locally**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Deployment (Vercel)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add env vars: `GEMINI_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

If Supabase is not configured, analyses still work — they’re stored in the browser session and share links won’t persist.


