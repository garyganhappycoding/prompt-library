# Prompt Library

A minimalist dark-mode web app to build and save AI prompts using the CO-STAR framework, powered by Google Gemini.

## Tech Stack
- Next.js 14 (React)
- TypeScript
- Google Gemini API (gemini-1.5-flash)
- localStorage (no backend needed)

---

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to https://vercel.com → New Project → Import your repo
3. Click Deploy (no env vars needed — API key is entered by the user in the app)
4. Done ✓

---

## How to use

1. Click ⚙ in the top nav → paste your Gemini API key
2. Get a free key from: https://aistudio.google.com/app/apikey
3. Go to Builder → name your prompt → fill the form → Generate
4. Save to Library → access anytime
