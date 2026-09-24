import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { timingSafeEqual } from "node:crypto";

function validGatePassword(input: string): boolean {
  const secret = process.env.EMPLOYEE_GATE_PASSWORD;
  if (!secret || secret.length < 20) return false;
  const supplied = Buffer.from(input.trim());
  const expected = Buffer.from(secret);
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

export const verifyEmployeeGate = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ gatePassword: z.string().min(1).max(200) }).parse(input))
  .handler(async ({ data }) => ({ ok: validGatePassword(data.gatePassword) }));

export const claimEmployeeRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({
      name: z.string().trim().min(1).max(120),
      gatePassword: z.string().min(1).max(200),
    }).parse(input),
  )
  .handler(async ({ data, context }) => {
    if (!validGatePassword(data.gatePassword)) {
      return { ok: false as const, error: "Invalid team passcode." };
    }
    const userId = context.userId;
    const email = context.claims?.email ?? "";

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
