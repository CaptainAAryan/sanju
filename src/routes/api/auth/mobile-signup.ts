import { createFileRoute } from "@tanstack/react-router";

function internalEmail(mobile: string) {
  return `m${mobile}@user.sanjeevni.local`;
}

export const Route = createFileRoute("/api/auth/mobile-signup")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (request.method !== "POST") {
          return Response.json({ error: "Method not allowed" }, { status: 405 });
        }

        const body = (await request.json().catch(() => null)) as { mobile?: unknown; password?: unknown } | null;
        const mobile = typeof body?.mobile === "string" ? body.mobile.replace(/\D/g, "") : "";
        const password = typeof body?.password === "string" ? body.password : "";

        if (!/^[6-9]\d{9}$/.test(mobile)) {
          return Response.json({ error: "Enter a valid 10-digit mobile number." }, { status: 400 });
        }
        if (password.length < 6 || password.length > 72) {
          return Response.json({ error: "Password must be 6–72 characters." }, { status: 400 });
        }

        const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!url || !serviceKey) {
          console.error("[mobile-signup] Missing server Supabase credentials");
          return Response.json({ error: "Account service is not configured yet. Please try again shortly." }, { status: 500 });
        }

        const response = await fetch(`${url}/auth/v1/admin/users`, {
          method: "POST",
          headers: {
            apikey: serviceKey,
            Authorization: `Bearer ${serviceKey}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email: internalEmail(mobile),
            password,
            email_confirm: true,
            user_metadata: { mobile },
          }),
        });

        const result = (await response.json().catch(() => ({}))) as { msg?: string; message?: string; error_description?: string };
        if (!response.ok) {
          const message = result.msg ?? result.message ?? result.error_description ?? "";
          if (/already|exists/i.test(message)) {
            return Response.json({ error: "This mobile number is already registered. Please log in." }, { status: 409 });
          }
          console.error("[mobile-signup] Supabase admin error:", message);
          return Response.json({ error: "Could not create your account. Please try again." }, { status: response.status >= 500 ? 502 : 400 });
        }

        return Response.json({ ok: true }, { status: 201 });
      },
    },
  },
});
