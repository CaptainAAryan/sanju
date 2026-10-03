import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Lock } from "lucide-react";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { t } from "@/lib/i18n";
import { setDraft, useDraft, commitDraft, type Gender } from "@/lib/user-store";

export const Route = createFileRoute("/onboarding/name")({
  component: ProfilePage,
});

const NAME_RX = /^[\p{L}\s.'-]+$/u;

function ProfilePage() {
  const draft = useDraft();
  const nav = useNavigate();
  const dict = t[draft.lang ?? "en"];
  const [name, setName] = useState(draft.name ?? "");
  const [age, setAge] = useState(draft.dob ? String(new Date().getFullYear() - new Date(draft.dob).getFullYear()) : "");
  const [gender, setGender] = useState<Gender | null>(draft.gender ?? null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const options: { key: Gender; label: string; icon: string }[] = [
    { key: "female", label: dict.female, icon: "👩" },
    { key: "male", label: dict.male, icon: "👨" },
    { key: "other", label: dict.other, icon: "🌈" },
  ];

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    const years = Number(age);
    if (trimmed.length < 2 || !NAME_RX.test(trimmed)) return setError(dict.nameError);
    if (!Number.isInteger(years) || years < 12 || years > 120) return setError("Please enter a valid age (12–120).");
    if (!gender) return setError("Please select your gender.");
    if (!draft.mobile) return setError("Mobile number is missing. Please go back and enter it.");

    const now = new Date();
    const dob = new Date(now);
    dob.setFullYear(now.getFullYear() - years);
    const dobValue = dob.toISOString().slice(0, 10);

    setBusy(true);
    setError("");
    setDraft({ name: trimmed, gender, dob: dobValue });
    const result = await commitDraft();
    setBusy(false);
    if ("error" in result) return setError(result.error);
    nav({ to: "/dashboard" });
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-lg px-5 py-10">
        <Link to="/onboarding/mobile" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> {dict.back}
        </Link>

        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="mt-7 mx-auto size-24 rounded-full bg-gradient-primary shadow-glow grid place-items-center text-5xl animate-float">
          🌸
        </motion.div>

        <h1 className="mt-7 text-3xl font-bold text-center">Create your profile</h1>
        <p className="mt-2 text-center text-muted-foreground text-sm">Tell us a few basics so Sanjeevni can personalize your experience.</p>

        <form onSubmit={submit} className="mt-7 space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input autoFocus value={name} onChange={(e) => { setName(e.target.value); setError(""); }}
              placeholder={dict.namePlaceholder} maxLength={60}
              className="w-full rounded-2xl bg-card border-2 border-border focus:border-primary px-5 py-4 text-lg outline-none transition shadow-soft focus:shadow-glow" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Age</label>
            <input type="number" min={12} max={120} value={age}
              onChange={(e) => { setAge(e.target.value); setError(""); }}
              placeholder="Your age"
              className="w-full rounded-2xl bg-card border-2 border-border focus:border-primary px-5 py-4 text-lg outline-none transition shadow-soft focus:shadow-glow" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Gender</label>
            <div className="grid grid-cols-3 gap-2">
              {options.map((o) => (
                <button type="button" key={o.key} onClick={() => { setGender(o.key); setError(""); }}
                  className={`relative rounded-2xl border-2 p-4 text-center transition ${gender === o.key ? "border-primary bg-primary/10 shadow-glow" : "border-border bg-card hover:border-primary/40"}`}>
                  <div className="text-3xl">{o.icon}</div>
                  <div className="mt-1 text-sm font-semibold">{o.label}</div>
                  {gender === o.key && <Check className="absolute top-2 right-2 size-4 text-primary" />}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-destructive text-center">{error}</p>}

          <div className="inline-flex items-center gap-1.5 text-[11px] text-pregnancy bg-pregnancy/10 rounded-full px-3 py-1 font-semibold">
            <Lock className="size-3" /> Your profile details stay private.
          </div>

          <button type="submit" disabled={busy}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-4 font-semibold text-primary-foreground shadow-glow hover:scale-[1.02] transition disabled:opacity-50">
            {busy ? "Creating profile…" : "Create profile"} <ArrowRight className="size-4" />
          </button>
        </form>
      </div>
    </PageShell>
  );
}
