import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, BarChart3, Users, Globe2, Languages, MapPin, ShieldCheck, Activity, Database, Eye, UserRound, MessageSquare } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Logo } from "@/components/Logo";
import { useEmployeeState } from "@/lib/employee-store";
import {
  COHORT_USERS, COHORT_REGIONS, COHORT_LANGUAGES, COHORT_AGES,
  COHORT_GENDER, COHORT_TOPICS, COHORT_GROWTH,
} from "@/lib/cohort-users";
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line,
} from "recharts";

export const Route = createFileRoute("/employee/analytics")({ component: AnalyticsPanel });

const CHART_COLORS = ["#2563eb","#16a34a","#f59e0b","#dc2626","#7c3aed","#0891b2","#db2777","#64748b"];

function ChartCard({ title, subtitle, children, className = "" }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return <section className={`rounded-3xl border border-border bg-card p-4 sm:p-5 shadow-card ${className}`}>
    <div className="mb-3"><h2 className="font-bold">{title}</h2>{subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}</div>
    {children}
  </section>;
}

function Donut({ data }: { data: { name: string; users: number }[] }) {
  return <ResponsiveContainer width="100%" height={260}>
    <PieChart>
      <Pie data={data} dataKey="users" nameKey="name" innerRadius={65} outerRadius={100} paddingAngle={2}>
        {data.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
      </Pie>
      <Tooltip /><Legend />
    </PieChart>
  </ResponsiveContainer>;
}

function AnalyticsPanel() {
  const nav = useNavigate();
  const { authed, hydrated } = useEmployeeState();
  const [search, setSearch] = useState("");

  useMemo(() => {
    if (hydrated && !authed) nav({ to: "/employee/login" });
  }, [hydrated, authed, nav]);

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return COHORT_USERS;
    return COHORT_USERS.filter(u => [u.name, u.place, u.language, u.gender, u.care, u.activity].some(v => v.toLowerCase().includes(q)));
  }, [search]);

  if (!authed) return null;

  return <PageShell>
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => nav({ to: "/employee" })} className="rounded-full p-2 hover:bg-muted"><ArrowLeft className="size-4" /></button>
          <Logo size={34} withText={false} />
          <div><div className="text-[10px] uppercase tracking-[0.22em] font-black text-primary">Project Sanjeevni</div><div className="font-bold">Impact Intelligence</div></div>
        </div>
        <div className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-bold">648 assigned users</div>
      </div>
    </header>

    <main className="mx-auto max-w-7xl px-4 py-5 space-y-5">
      <div className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 flex gap-3 items-start">
        <Users className="size-4 mt-0.5 shrink-0 text-primary" />
        <div className="text-xs"><b>Project cohort loaded.</b> The console and analytics use the same 648 assigned user records, including names, ages, locations, languages and engagement details.</div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <Metric icon={<Users />} label="Users" value="648" sub="assigned cohort" />
        <Metric icon={<Activity />} label="7-day active" value="421" sub="engaged users" />
        <Metric icon={<MessageSquare />} label="Health conversations" value="3,842" sub="threads / sessions" />
        <Metric icon={<Languages />} label="Languages" value={COHORT_LANGUAGES.length} sub="represented" />
        <Metric icon={<Globe2 />} label="Coverage" value="18" sub="places represented" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard title="Regional footprint" subtitle="Distribution of the 648-user project cohort.">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={COHORT_REGIONS} layout="vertical" margin={{left:10,right:10}}>
              <CartesianGrid strokeDasharray="3 3" /><XAxis type="number" /><YAxis type="category" dataKey="name" width={110} tick={{fontSize:11}} /><Tooltip />
              <Bar dataKey="users" name="Users" radius={[0,8,8,0]}>{COHORT_REGIONS.map((_,i)=><Cell key={i} fill={CHART_COLORS[i%CHART_COLORS.length]} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Language mix" subtitle="Primary language selected by cohort members."><Donut data={COHORT_LANGUAGES} /></ChartCard>
        <ChartCard title="Age distribution" subtitle="Age bands across all 648 assigned users.">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={COHORT_AGES}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip />
              <Bar dataKey="users" name="Users" radius={[8,8,0,0]}>{COHORT_AGES.map((_,i)=><Cell key={i} fill={CHART_COLORS[i%CHART_COLORS.length]} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Gender mix" subtitle="Aggregate cohort distribution."><Donut data={COHORT_GENDER} /></ChartCard>
        <ChartCard title="Cohort growth" subtitle="Cumulative project-user progression." className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={COHORT_GROWTH}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="week" /><YAxis /><Tooltip />
              <Line type="monotone" dataKey="users" name="Users" stroke="#2563eb" strokeWidth={3} dot={{r:4}} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Care-area engagement" subtitle="Health topics represented across the cohort.">
          <ResponsiveContainer width="100%" height={330}>
            <BarChart data={COHORT_TOPICS} layout="vertical" margin={{left:10,right:10}}><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" /><YAxis type="category" dataKey="name" width={125} tick={{fontSize:11}} /><Tooltip />
              <Bar dataKey="users" name="Users" radius={[0,8,8,0]}>{COHORT_TOPICS.map((_,i)=><Cell key={i} fill={CHART_COLORS[i%CHART_COLORS.length]} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <section className="rounded-3xl border border-border bg-card p-5 shadow-card">
          <h2 className="font-bold">Operations cockpit</h2><p className="text-xs text-muted-foreground mt-0.5">Current project monitoring.</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Ops icon={<Database />} title="Dataset" value="648 users" detail="Unified project cohort" />
            <Ops icon={<ShieldCheck />} title="Access" value="Team-only" detail="Passcode protected" />
            <Ops icon={<MapPin />} title="Location" value="Tracked" detail="City / region" />
            <Ops icon={<Eye />} title="Privacy" value="Restricted" detail="Team console only" />
            <Ops icon={<UserRound />} title="Profiles" value="Tracked" detail="Age, language, gender" />
            <Ops icon={<BarChart3 />} title="Analytics" value="Enabled" detail="Unified dataset" />
          </div>
        </section>
      </div>

      <ChartCard title={`648 user records • ${filteredUsers.length} shown`} subtitle="Search the same user records displayed in the Team Console.">
        <div className="flex gap-2 mb-3">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name, place, language, topic..." className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
          <div className="rounded-xl border border-border px-3 py-2 text-xs font-bold whitespace-nowrap hidden sm:block">648 total</div>
        </div>
        <div className="overflow-x-auto max-h-[620px] overflow-y-auto rounded-xl border border-border">
          <table className="w-full text-sm"><thead className="sticky top-0 bg-card"><tr className="border-b border-border text-left text-xs text-muted-foreground">
            <th className="p-3">#</th><th className="p-3">Name</th><th className="p-3">Age</th><th className="p-3">Gender</th><th className="p-3">Place</th><th className="p-3">Language</th><th className="p-3">Profiles</th><th className="p-3">Chats</th><th className="p-3">Last active</th><th className="p-3">Activity</th>
          </tr></thead><tbody>
            {filteredUsers.map((u,i)=><tr key={u.id} className="border-b border-border/60 hover:bg-muted/40">
              <td className="p-3 text-muted-foreground">{i+1}</td><td className="p-3 font-semibold">{u.name}</td><td className="p-3">{u.age}</td><td className="p-3">{u.gender}</td><td className="p-3">{u.place}</td><td className="p-3">{u.language}</td><td className="p-3">{u.profiles}</td><td className="p-3">{u.chats}</td><td className="p-3 whitespace-nowrap">{new Date(u.lastActive).toLocaleDateString()}</td><td className="p-3">{u.activity}</td>
            </tr>)}
          </tbody></table>
        </div>
      </ChartCard>
    </main>
  </PageShell>;
}

function Metric({icon,label,value,sub}:{icon:React.ReactNode;label:string;value:string|number;sub:string}) {
  return <div className="rounded-3xl border border-border bg-card p-4 shadow-card"><div className="text-primary">{icon}</div><div className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{label}</div><div className="text-2xl font-black mt-0.5">{value}</div><div className="text-[10px] text-muted-foreground">{sub}</div></div>;
}
function Ops({icon,title,value,detail}:{icon:React.ReactNode;title:string;value:string;detail:string}) {
  return <div className="rounded-2xl border border-border/70 bg-background/60 p-3"><div className="flex items-center gap-2 text-primary">{icon}<span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{title}</span></div><div className="font-bold mt-2">{value}</div><div className="text-[10px] text-muted-foreground">{detail}</div></div>;
}
