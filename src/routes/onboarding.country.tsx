import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Globe2, MapPin } from "lucide-react";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { StickyContinue } from "@/components/StickyContinue";
import { COUNTRIES, getCountry } from "@/lib/countries";
import { t } from "@/lib/i18n";
import { setDraft, useDraft } from "@/lib/user-store";

export const Route = createFileRoute("/onboarding/country")({
  component: CountryPage,
});

function CountryPage() {
  const draft = useDraft();
  const nav = useNavigate();
  const dict = t[draft.lang ?? "en"];
  const [code, setCode] = useState(draft.country ?? "IN");
  const [city, setCity] = useState((draft.city ?? "").split(",")[0]?.trim() ?? "");
  const [state, setState] = useState((draft.city ?? "").split(",").slice(1).join(",").trim());
  const [error, setError] = useState("");
  const country = getCountry(code);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedCity = city.trim();
    const trimmedState = state.trim();
    if (!trimmedCity || !trimmedState) {
      setError("Please enter your city/area and state or region.");
      return;
    }
    setError("");
    setDraft({ country: code, pincode: null, city: `${trimmedCity}, ${trimmedState}` });
    nav({ to: "/onboarding/mobile" });
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-2xl px-5 py-8">
        <Link to="/onboarding/language" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> {dict.back}
        </Link>

        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="mt-6 mx-auto size-20 rounded-full bg-gradient-primary shadow-glow grid place-items-center text-4xl">
          <Globe2 className="size-9 text-primary-foreground" />
        </motion.div>

        <h1 className="mt-5 text-2xl sm:text-3xl font-bold text-center">Where are you from?</h1>
        <p className="mt-1.5 text-center text-muted-foreground text-sm px-4">
          We'll show emergency numbers and government schemes for your country.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {COUNTRIES.map((c) => {
              const active = code === c.code;
              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => { setCode(c.code); setError(""); }}
                  className={`rounded-2xl border-2 p-3 text-left transition ${active ? "border-primary bg-gradient-primary text-primary-foreground shadow-glow" : "border-border bg-card hover:border-primary/40 shadow-card"}`}
                >
                  <div className="text-2xl">{c.flag}</div>
                  <div className={`mt-1 font-bold text-sm ${active ? "" : "text-foreground"}`}>{c.name}</div>
                  <div className={`text-[10px] tracking-wider ${active ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{c.dialPrefix} · {c.mobileLengths.join("/")}d</div>
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl bg-card border-2 border-border p-4 shadow-soft">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <MapPin className="size-4 text-primary" /> Your location
            </div>
            <p className="mt-1 text-xs text-muted-foreground">No PIN/postal code is needed.</p>
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              <input value={city} onChange={(e) => { setCity(e.target.value); setError(""); }} placeholder="City / area" className="w-full rounded-xl bg-muted border border-border focus:border-primary px-4 py-3 text-base outline-none" required />
              <input value={state} onChange={(e) => { setState(e.target.value); setError(""); }} placeholder={code === "IN" ? "State" : "State / province / region"} className="w-full rounded-xl bg-muted border border-border focus:border-primary px-4 py-3 text-base outline-none" required />
            </div>
            {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
          </div>

          <StickyContinue label={dict.continue} type="submit" show={!!code} />
        </form>
      </div>
    </PageShell>
  );
}
