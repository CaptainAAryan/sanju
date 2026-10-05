import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { verifyEmployeeSession } from "@/lib/employee-claim.functions";

export const getEmployeeUserActivity = createServerFn({ method: "POST" })
  .handler(async () => {
    if (!(await verifyEmployeeSession())) throw new Error("Team access required.");

    const users: any[] = [];
    for (let page = 1; page <= 100; page++) {
      const { data: batch, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 1000 });
      if (error) throw new Error("Could not load user activity.");
      users.push(...(batch.users ?? []));
      if (!batch.users || batch.users.length < 1000) break;
    }

    const { data: profiles, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("id,user_id,name,mobile,lang,city,country,created_at")
      .order("created_at", { ascending: false });
    if (profileError) throw new Error("Could not load user profiles.");

    const byUser = new Map<string, any[]>();
    for (const p of profiles ?? []) {
      const rows = byUser.get(p.user_id) ?? [];
      rows.push(p);
      byUser.set(p.user_id, rows);
    }

    return users.map((u) => {
      const rows = byUser.get(u.id) ?? [];
      const latest = rows[0] ?? null;
      return {
        id: u.id,
        name: latest?.name ?? u.user_metadata?.name ?? u.email?.split("@")[0] ?? "Unnamed user",
        mobile: latest?.mobile ?? null,
        lang: latest?.lang ?? null,
        city: latest?.city ?? null,
        country: latest?.country ?? "IN",
        registeredAt: u.created_at,
        lastSignInAt: u.last_sign_in_at ?? null,
        profileCount: rows.length,
        lastProfileAt: latest?.created_at ?? null,
      };
    }).sort((a, b) => {
      const aa = a.lastSignInAt ? new Date(a.lastSignInAt).getTime() : 0;
      const bb = b.lastSignInAt ? new Date(b.lastSignInAt).getTime() : 0;
      return bb - aa;
    });
  });
