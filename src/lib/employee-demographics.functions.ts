import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const getEmployeeDemographics = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ accessToken: z.string().min(10) }).parse(input))
  .handler(async ({ data }) => {
    const { data: auth, error: authError } = await supabaseAdmin.auth.getUser(data.accessToken);
    if (authError || !auth.user) throw new Error("Please sign in again.");
    const { data: role, error: roleError } = await supabaseAdmin
      .from("user_roles").select("role").eq("user_id", auth.user.id).eq("role", "employee").maybeSingle();
    if (roleError || !role) throw new Error("Employee access required.");
    const profiles: Array<{id:string;mobile:string;name:string;dob:string|null;gender:string|null;lang:string;country:string|null;pincode:string|null;city:string|null;description:string|null;created_at:string}> = [];
    for (let page = 0; page < 100; page++) {
      const { data: batch, error } = await supabaseAdmin
        .from("profiles")
        .select("id,mobile,name,dob,gender,lang,country,pincode,city,description,created_at")
        .order("created_at", { ascending: false })
        .range(page * 1000, page * 1000 + 999);
      if (error) throw new Error("Could not load demographics.");
      profiles.push(...(batch ?? []));
      if (!batch || batch.length < 1000) break;
    }
    return profiles.map((p) => ({
      id: p.id, mobile: p.mobile, name: p.name, dob: p.dob,
      gender: p.gender, lang: p.lang, country: p.country ?? "IN",
      pincode: p.pincode, city: p.city, description: p.description,
      createdAt: new Date(p.created_at).getTime(),
    }));
  });
