import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft, BarChart3, Users, Globe2, Languages, MapPin, ShieldCheck,
  Activity, RefreshCw, Database, Sparkles, Eye, UserRound, MessageSquare
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Logo } from "@/components/Logo";
import { useEmployeeState } from "@/lib/employee-store";
import { getEmployeeUserActivity } from "@/lib/employee-activity.functions";
import { supabase } from "@/integrations/supabase/client";
import { ageFromDob, type UserProfile } from "@/lib/user-store";
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line
} from "recharts";

export const Route = createFileRoute("/employee/analytics")({ component: AnalyticsPanel });

const DEMO_REGIONS = [
  { name: "Jaipur", users: 548 },
  { name: "Kathputli Nagar", users: 22 },
  { name: "Bagru", users: 18 },
  { name: "Chomu", users: 15 },
  { name: "North India", users: 12 },
  { name: "West India", users: 14 },
  { name: "East India", users: 8 },
  { name: "South India", users: 7 },
  { name: "North-East India", users: 4 },
];

const DEMO_LANGUAGES = [
  { name: "Hindi", users: 440 }, { name: "English", users: 98 },
  { name: "Bengali", users: 42 }, { name: "Marathi", users: 25 },
  { name: "Gujarati", users: 18 }, { name: "Tamil", users: 12 },
  { name: "Telugu", users: 8 }, { name: "Other", users: 5 },
];

const DEMO_AGES = [
  { name: "0–12", users: 74 }, { name: "13–17", users: 82 }, { name: "18–24", users: 136 },
  { name: "25–34", users: 154 }, { name: "35–44", users: 108 }, { name: "45–59", users: 65 }, { name: "60+", users: 29 },
];

const DEMO_GENDER = [
  { name: "Female", users: 338 }, { name: "Male", users: 292 }, { name: "Other / undisclosed", users: 18 },
];

const DEMO_TOPICS = [
  { name: "Nutrition", users: 382 }, { name: "Menstrual health", users: 274 },
  { name: "Vaccination", users: 221 }, { name: "Maternal care", users: 196 },
  { name: "Child health", users: 183 }, { name: "Emergency help", users: 166 },
  { name: "Hygiene", users: 159 }, { name: "Government schemes", users: 131 },
];

const DEMO_GROWTH = [
  { week: "W1", users: 418 }, { week: "W2", users: 452 }, { week: "W3", users: 489 },
  { week: "W4", users: 523 }, { week: "W5", users: 557 }, { week: "W6", users: 593 }, { week: "W7", users: 621 }, { week: "W8", users: 648 },
];

function ChartCard({ title, subtitle, children, className = "" }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-3xl border border-border bg-card p-4 sm:p-5 shadow-card ${className}`}>
      <div className="mb-3">
        <h2 className="font-bold">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function Donut({ data }: { data: { name: string; users: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey="users" nameKey="name" innerRadius={65} outerRadius={100} paddingAngle={2}>
          {data.map((_, i) => <Cell key={i} />)}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

function AnalyticsPanel() {
  const nav = useNavigate();
  const { authed, hydrated } = useEmployeeState();
  const [mode, setMode] = useState<"demo" | "live">("demo");
  const [liveUsers, setLiveUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (hydrated && !authed) nav({ to: "/employee/login" });
  }, [hydrated, authed, nav]);

  async function loadLive() {
    setLoading(true); setError("");
    try {
      const rows = await getEmployeeUserActivity();
      setLiveUsers(rows as any[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load live demographics.");
    } finally { setLoading(false); }
  }

  useEffect(() => { if (mode === "live" && authed && liveUsers.length === 0) void loadLive(); }, [mode, authed]);

  const liveRegions = useMemo(() => {
    const counts: Record<string, number> = {};
    liveUsers.forEach(p => { const k = p.city || (p.country === "IN" ? "India — location not set" : p.country || "Unknown"); counts[k] = (counts[k] ?? 0) + 1; });
    return Object.entries(counts).map(([name, users]) => ({ name, users })).sort((a,b)=>b.users-a.users).slice(0, 12);
  }, [liveProfiles]);

  const liveLanguages = useMemo(() => {
    const counts: Record<string, number> = {};
    liveProfiles.forEach(p => { counts[p.lang] = (counts[p.lang] ?? 0) + 1; });
    return Object.entries(counts).map(([name, users]) => ({ name, users })).sort((a,b)=>b.users-a.users);
  }, [liveProfiles]);

  const liveAges = useMemo(() => {
    const buckets = [{name:"0–12",users:0},{name:"13–17",users:0},{name:"18–24",users:0},{name:"25–34",users:0},{name:"35–44",users:0},{name:"45–59",users:0},{name:"60+",users:0}];
    liveProfiles.forEach(p => { const a = ageFromDob(p.dob); if (a === null) return; const i = a<=12?0:a<=17?1:a<=24?2:a<=34?3:a<=44?4:a<=59?5:6; buckets[i].users++; });
    return buckets;
  }, [liveProfiles]);

  const liveGender = useMemo(() => {
    const counts: Record<string, number> = {"Female":0,"Male":0,"Other / undisclosed":0};
    liveProfiles.forEach(p => { const k = p.gender === "female" ? "Female" : p.gender === "male" ? "Male" : "Other / undisclosed"; counts[k]++; });
    return Object.entries(counts).map(([name, users]) => ({name, users}));
  }, [liveProfiles]);

  const regions = mode === "demo" ? DEMO_REGIONS : liveRegions;
  const languages = mode === "demo" ? DEMO_LANGUAGES : liveLanguages;
  const ages = mode === "demo" ? DEMO_AGES : liveAges;
  const gender = mode === "demo" ? DEMO_GENDER : liveGender;
  const total = mode === "demo" ? 648 : liveUsers.length;

  if (!authed) return null;

  return (
    <PageShell>
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => nav({ to: "/employee" })} className="rounded-full p-2 hover:bg-muted"><ArrowLeft className="size-4" /></button>
            <Logo size={34} withText={false} />
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] font-black text-primary">Project Sanjeevni</div>
              <div className="font-bold">Impact Intelligence</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex rounded-full border border-border p-1">
              <button onClick={() => setMode("demo")} className={`px-3 py-1.5 text-xs rounded-full ${mode==="demo" ? "bg-foreground text-background" : "text-muted-foreground"}`}>Demo 648</button>
              <button onClick={() => setMode("live")} className={`px-3 py-1.5 text-xs rounded-full ${mode==="live" ? "bg-foreground text-background" : "text-muted-foreground"}`}>Live</button>
            </div>
            <button onClick={() => void loadLive()} className="rounded-full border border-border p-2 hover:bg-muted" title="Refresh live data"><RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} /></button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-5 space-y-5">
        {mode === "demo" && (
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 flex gap-3 items-start">
            <Sparkles className="size-4 mt-0.5 shrink-0" />
            <div className="text-xs"><b>Illustrative analytics mode.</b> The 648-user figures and regional breakdowns are demo data for the backend design. They are not presented as real registered-user statistics.</div>
          </div>
        )}
        {error && <div className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-xs">{error}</div>}

        {mode === "live" && (
          <ChartCard title="Real user activity" subtitle="Persistent Supabase account records. Last sign-in and onboarding profile data are shown for each account.">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="py-2 pr-4">Name</th><th className="py-2 pr-4">Location</th><th className="py-2 pr-4">Language</th><th className="py-2 pr-4">Profiles</th><th className="py-2">Last sign-in</th>
                </tr></thead>
                <tbody>{liveUsers.map((u) => (
                  <tr key={u.id} className="border-b border-border/60">
                    <td className="py-3 pr-4 font-semibold">{u.name}</td>
                    <td className="py-3 pr-4">{u.city || u.country || "—"}</td>
                    <td className="py-3 pr-4">{u.lang || "—"}</td>
                    <td className="py-3 pr-4">{u.profileCount}</td>
                    <td className="py-3">{u.lastSignInAt ? new Date(u.lastSignInAt).toLocaleString() : "Never"}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </ChartCard>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <Metric icon={<Users />} label="Registered users" value={total.toLocaleString()} sub={mode==="demo" ? "demo cohort" : "live profiles"} />
          <Metric icon={<Activity />} label="7-day active" value={mode==="demo" ? "421" : "—"} sub="engaged users" />
          <Metric icon={<MessageSquare />} label="Health conversations" value={mode==="demo" ? "3,842" : "—"} sub="threads / sessions" />
          <Metric icon={<Languages />} label="Languages" value={languages.length} sub="available in cohort" />
          <Metric icon={<Globe2 />} label="Countries" value={mode==="demo" ? "1+" : "—"} sub="coverage footprint" />
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <ChartCard title="Regional footprint" subtitle="Where the demo cohort is concentrated.">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regions} layout="vertical" margin={{left: 10,right:10}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={110} tick={{fontSize:11}} />
                <Tooltip />
                <Bar dataKey="users" name="Users" radius={[0,8,8,0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Language mix" subtitle="Primary language selected during onboarding.">
            <Donut data={languages} />
          </ChartCard>

          <ChartCard title="Age distribution" subtitle="Aggregated age bands; no individual records shown.">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={ages}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" name="Users" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Gender mix" subtitle="Aggregate only; undisclosed values remain grouped.">
            <Donut data={gender} />
          </ChartCard>

          <ChartCard title="Cohort growth" subtitle="Illustrative cumulative registered-user trend." className="lg:col-span-2">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={DEMO_GROWTH}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" name="Registered users" strokeWidth={3} dot={{r:4}} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <ChartCard title="Care-area engagement" subtitle="Illustrative aggregated topic interest; users may select multiple areas.">
            <ResponsiveContainer width="100%" height={330}>
              <BarChart data={DEMO_TOPICS} layout="vertical" margin={{left:10,right:10}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={125} tick={{fontSize:11}} />
                <Tooltip />
                <Bar dataKey="users" name="Users" radius={[0,8,8,0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <section className="rounded-3xl border border-border bg-card p-5 shadow-card">
            <h2 className="font-bold">Operations cockpit</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Backend signals the team can monitor.</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Ops icon={<Database />} title="Supabase" value="Connected" detail="Profile + auth data" />
              <Ops icon={<ShieldCheck />} title="Access" value="Employee-only" detail="Server role check" />
              <Ops icon={<MapPin />} title="Location" value="Aggregated" detail="City / region buckets" />
              <Ops icon={<Eye />} title="Privacy" value="No raw export" detail="Dashboard shows aggregates" />
              <Ops icon={<UserRound />} title="Onboarding" value="Tracked" detail="Language, age, region" />
              <Ops icon={<BarChart3 />} title="Analytics" value="Live / Demo" detail="Switch above" />
            </div>
          </section>
        </div>

        <div className="rounded-2xl border border-border/70 bg-muted/30 p-4 text-xs text-muted-foreground flex gap-3">
          <ShieldCheck className="size-4 shrink-0" />
          <span>For a production health service, keep this console restricted to authorized staff and use aggregate analytics wherever possible. The Live mode reads the existing protected employee demographics endpoint; Demo mode never writes fake users into Supabase.</span>
        </div>
      </main>
    </PageShell>
  );
}

function Metric({icon,label,value,sub}:{icon:React.ReactNode;label:string;value:string|number;sub:string}) {
  return <div className="rounded-3xl border border-border bg-card p-4 shadow-card">
    <div className="text-primary">{icon}</div><div className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{label}</div>
    <div className="text-2xl font-black mt-0.5">{value}</div><div className="text-[10px] text-muted-foreground">{sub}</div>
  </div>;
}
function Ops({icon,title,value,detail}:{icon:React.ReactNode;title:string;value:string;detail:string}) {
  return <div className="rounded-2xl border border-border/70 bg-background/60 p-3">
    <div className="flex items-center gap-2 text-primary">{icon}<span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{title}</span></div>
    <div className="font-bold mt-2">{value}</div><div className="text-[10px] text-muted-foreground">{detail}</div>
  </div>;
}
