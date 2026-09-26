# Project Sanjeevni deployment setup

The application runs on Vercel with Supabase. Add these to the **same Vercel project** that serves `sanju-ecru.vercel.app` under Settings → Environment Variables, then redeploy:

- `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (server only)
- `AI_API_KEY` (server only; used for chat, speech transcription, and speech playback)
- `EMPLOYEE_GATE_PASSWORD` (server only; at least 20 unpredictable characters)

Never prefix server secrets with `VITE_` or commit their values. Apply the migrations in `supabase/migrations` to the same Supabase project before testing auth or chat.

In Supabase Authentication, enable Google, supply the Google OAuth client ID and secret, set the site URL to `https://sanju-ecru.vercel.app`, and allow `https://sanju-ecru.vercel.app/auth/callback` in Redirect URLs. In Google Cloud, add Supabase's callback URL displayed in its Google provider settings as an authorized redirect URI. Google accounts complete the mobile and profile questions after sign-in.

The legacy mobile/password flow uses a generated internal email under `user.sanjeevni.local`, so it currently requires Supabase email confirmation to be disabled. This flow does **not** prove ownership of the phone number. For production phone verification, configure a supported SMS provider in Supabase and migrate to phone OTP before inviting real users. Google sign-in offers verified account identity when configured correctly.

The employee console lives at `/employee/login`; there is no public navigation link. Access requires the server-side team passcode and an authenticated account with the `employee` role. Do not share the passcode with end users. Demographics are fetched server-side only after verifying the employee role. Avoid collecting information the project does not need, and keep access limited to authorized team members.
