import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { fetchProfiles, getDraftSnapshot, useStore } from "@/lib/user-store";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/auth/callback")({ component: AuthCallback });

function AuthCallback() {
  const nav = useNavigate();
  const store = useStore();
  const [error, setError] = useState("");
  useEffect(() => {
    let cancelled = false;
    async function finish() {
      try {
        const params = new URLSearchParams(window.location.search);
        if (params.get("error")) throw new Error(params.get("error_description") || "Google sign in was cancelled.");
        const code = params.get("code");
        const { data: existing } = await supabase.auth.getSession();
        if (code && !existing.session) {
          const result = await supabase.auth.exchangeCodeForSession(code);
          if (result.error) throw result.error;
        }
        const { data } = await supabase.auth.getSession();
        if (!data.session) throw new Error("Sign in did not complete. Please try again.");
        await fetchProfiles();
        if (cancelled) return;
        const { data: rows } = await supabase.from("profiles").select("id").eq("user_id", data.session.user.id).limit(1);
        const draft = getDraftSnapshot();
        nav({ to: rows?.length ? "/dashboard" : draft.country && draft.lang ? "/onboarding/mobile" : "/onboarding/language", replace: true });
      } catch (e) { if (!cancelled) setError(e instanceof Error ? e.message : "Sign in failed."); }
    }
    void finish();
    return () => { cancelled = true; };
  }, [nav]);
  return <PageShell><main className="mx-auto max-w-md px-6 py-24 text-center">
    <h1 className="text-2xl font-bold">{error ? "Could not sign in" : "Signing you in…"}</h1>
    {error && <><p className="mt-4 text-destructive">{error}</p><a href="/login" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-primary-foreground">Try again</a></>}
    {!error && !store.hydrated && <p className="mt-4 text-muted-foreground">Please wait a moment.</p>}
  </main></PageShell>;
}
