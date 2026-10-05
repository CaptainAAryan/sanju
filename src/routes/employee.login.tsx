import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Flower2, Lock, ArrowLeft, Mail, User, Eye, EyeOff } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import {
  gateUnlock, gateLock,
  useEmployeeState, useEnsureEmployeeInit,
} from "@/lib/employee-store";
import { useEffect } from "react";

export const Route = createFileRoute("/employee/login")({ component: EmployeeLogin });

function EmployeeLogin() {
  useEnsureEmployeeInit();
  const nav = useNavigate();
  const { gateUnlocked, authed, hydrated } = useEmployeeState();

  const [gatePw, setGatePw] = useState("");
  const [remember, setRemember] = useState(true);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (hydrated && authed) nav({ to: "/employee" }); }, [hydrated, authed, nav]);

  async function submitGate(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      if (!await gateUnlock(gatePw, remember)) setErr("Invalid passcode.");
    } catch {
      setErr("Could not verify passcode. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function submitAuth(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    const res = mode === "signin"
      ? await employeeSignIn(email.trim(), pw, gatePw)
      : await employeeSignUp(name.trim(), email.trim(), pw, gatePw);
    setBusy(false);
    if (res.error) return setErr(res.error);
    nav({ to: "/employee" });
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-md px-5 py-16">
        <button onClick={() => nav({ to: "/" })} className="inline-flex items-center gap-1 text-sm text-muted-foreground mb-6 hover:text-foreground">
          <ArrowLeft className="size-4" /> Back
        </button>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-card border border-border shadow-card p-8">
          <div className="text-center">
            <div className="mx-auto size-16 rounded-full bg-gradient-primary grid place-items-center text-white shadow-glow">
              <Flower2 className="size-7" />
            </div>
            <h1 className="mt-5 text-2xl font-bold">Sanjeevni Team Access</h1>
            <p className="text-sm text-muted-foreground mt-1">Internal use only.</p>
          </div>

          {!gateUnlocked ? (
            <form onSubmit={submitGate} className="mt-6 space-y-3">
              <div className="relative">
                <Lock className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  autoFocus
                  value={gatePw}
                  onChange={(e) => { setGatePw(e.target.value); setErr(""); }}
                  placeholder="Team passcode"
                  className="w-full rounded-2xl bg-muted border border-border pl-10 pr-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="accent-primary" />
                Remember this device
              </label>
              {err && <p className="text-xs text-emergency">{err}</p>}
              <button type="submit" className="w-full rounded-full bg-gradient-primary text-primary-foreground py-3 font-semibold shadow-glow">
                Continue
              </button>
            </form>
          ) : (
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm">
                <p className="font-semibold">Team access unlocked</p>
                <p className="text-muted-foreground mt-1">No employee email or account is required. This dashboard is protected by the team passcode only.</p>
              </div>
              <button onClick={() => nav({ to: "/employee" })} className="w-full rounded-full bg-gradient-primary text-primary-foreground py-3 font-semibold shadow-glow">
                Enter Team Dashboard
              </button>
              <button onClick={() => { gateLock(); setGatePw(""); }} className="w-full rounded-full border border-border py-3 text-sm font-semibold hover:bg-muted">
                Lock
              </button>
            </div>
          )}
)}
        </motion.div>
      </div>
    </PageShell>
  );
}
