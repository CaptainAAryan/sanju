-- Add country used by onboarding and profile settings.
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS country text DEFAULT 'IN';
