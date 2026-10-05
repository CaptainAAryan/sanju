import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { timingSafeEqual, createHmac } from "node:crypto";
import { getCookie, setCookie } from "@tanstack/react-start/server";

const TEAM_COOKIE = "sanjeevni_team_session";

function makeTicket(): string {
  const secret = process.env.EMPLOYEE_GATE_PASSWORD ?? "";
  const payload = String(Date.now() + 8 * 60 * 60 * 1000);
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

function validTicket(ticket: string | undefined): boolean {
  if (!ticket) return false;
  const [payload, sig] = ticket.split(".");
  const secret = process.env.EMPLOYEE_GATE_PASSWORD ?? "";
  if (!payload || !sig || !secret || Number(payload) < Date.now()) return false;
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  return sig.length === expected.length && timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

function validGatePassword(input: string): boolean {
  const secret = process.env.EMPLOYEE_GATE_PASSWORD;
  if (!secret || secret.length < 20) return false;
  const supplied = Buffer.from(input.trim());
  const expected = Buffer.from(secret);
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

export const verifyEmployeeGate = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ gatePassword: z.string().min(1).max(200) }).parse(input))
  .handler(async ({ data }) => {
    const ok = validGatePassword(data.gatePassword);
    if (ok) setCookie(TEAM_COOKIE, makeTicket(), { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 8 });
    return { ok };
  });

export const verifyEmployeeSession = createServerFn({ method: "GET" }).handler(async () => validTicket(getCookie(TEAM_COOKIE)));

export const claimEmployeeRole = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z.object({
      name: z.string().trim().min(1).max(120),
      gatePassword: z.string().min(1).max(200),
      accessToken: z.string().min(10),
    }).parse(input),
  )
  .handler(async ({ data }) => {
    if (!validGatePassword(data.gatePassword)) {
      return { ok: false as const, error: "Invalid team passcode." };
    }
    const { data: auth, error: authError } = await supabaseAdmin.auth.getUser(data.accessToken);
    if (authError || !auth.user) return { ok: false as const, error: "Please sign in again." };
    const userId = auth.user.id;
    const email = auth.user.email ?? "";

    // Insert role (idempotent via unique constraint)
    const { error: roleErr } = await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: userId, role: "employee" }, { onConflict: "user_id,role" });
    if (roleErr) return { ok: false as const, error: roleErr.message };

    const { error: empErr } = await supabaseAdmin
      .from("employees")
      .upsert({ id: userId, name: data.name, email });
    if (empErr) return { ok: false as const, error: empErr.message };

    return { ok: true as const };
  });
