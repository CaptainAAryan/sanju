# Project Sanjeevni — independent Vercel deployment

This copy uses TanStack Start, Vite and Nitro directly. It does not require the Lovable Vite plugin or Lovable AI gateway.

## Upload to GitHub

Create a new empty repository. Upload the **contents** of this folder to its root (including `src`, `public`, `supabase`, `package.json`, `vite.config.ts` and `vercel.json`). Do not upload an `.env` file.

## Deploy

Import the new repository on Vercel. Keep Root Directory at the repository root and Framework Preset at **TanStack Start**. Do not override Build Command or Output Directory. Set the variables from `.env.example` in Vercel Settings > Environment Variables and redeploy.

The existing Supabase project is still required for accounts and chat storage. Chat, translation, voice input and voice output require `AI_API_KEY` for an OpenAI-compatible provider; default models are OpenAI models. The AI provider must support the chat and audio endpoints and models you select. Keep the service role and AI keys server-side. `VITE_` variables are public.

## Local check

Use Node.js 20.19+ or 22.12+; run `npm install`, then `npm run build` and `npm run dev`. This archive has no dependency lockfile; the first install will create `package-lock.json`. Commit that generated lockfile before production deployment.

**Security:** the original public repository tracked an `.env` file. Review its history and rotate any exposed private keys before deploying this copy. Never upload that file to a new repository.
