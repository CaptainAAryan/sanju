import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Brain, Globe2, HeartHandshake, Languages, ShieldCheck, Users } from "lucide-react";
import { PageShell, Disclaimer } from "@/components/PageShell";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/mission")({ component: MissionPage });

function MissionPage() {
  const points = [
    { icon: HeartHandshake, title: "Basic health knowledge for everyone", text: "We want basic health and hygiene knowledge to be easy to find and easy to understand — including nutrition, prevention, hygiene, common health concerns and knowing when to seek professional care." },
    { icon: Languages, title: "Break language and literacy barriers", text: "Health information should not become less useful because someone speaks another language or prefers simpler explanations. Sanjeevni is designed around accessible, multilingual communication." },
    { icon: Brain, title: "Use AI to improve access", text: "AI helps Sanjeevni understand natural questions, explain information simply, support multiple languages and guide people toward relevant resources. It is a support tool, not a replacement for doctors or emergency services." },
    { icon: Globe2, title: "Reach people across communities", text: "Our ambition is to make basic health awareness available across countries and communities, while respecting local languages, health systems and available services." },
    { icon: Users, title: "Empower families and communities", text: "Better health knowledge can help people have better conversations with parents, caregivers, teachers, community workers and healthcare professionals." },
    { icon: ShieldCheck, title: "Build with responsibility", text: "We aim to be transparent about Sanjeevni's limits, encourage professional care for serious concerns and direct users toward reliable health information and appropriate human support." }
  ];

  return (
    <PageShell>
      <header className="mx-auto max-w-5xl px-5 py-5 flex items-center justify-between">
        <Logo />
        <Link to="/" className="inline-flex items-center gap-1.5 rounded-full bg-card border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted transition">
          <ArrowLeft className="size-3.5" /> Back
        </Link>
      </header>
      <main className="mx-auto max-w-5xl px-5 pb-12">
        <section className="rounded-[2rem] bg-gradient-primary text-primary-foreground p-7 md:p-12 shadow-glow">
          <div className="size-16 rounded-2xl bg-white/15 grid place-items-center overflow-hidden"><img src="/project-sanjeevni-logo.jpeg" alt="Project Sanjeevni" className="size-full object-cover" /></div>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] font-bold text-primary-foreground/75">Project Sanjeevni</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">Our Mission</h1>
          <p className="mt-5 text-lg md:text-xl leading-relaxed text-primary-foreground/90 max-w-3xl">
            To make basic health and hygiene knowledge accessible to everyone — regardless of language, location, age, literacy level or background.
          </p>
        </section>
        <section className="mt-6 grid md:grid-cols-2 gap-4">
          {points.map((item) => (
            <div key={item.title} className="rounded-3xl bg-card border border-border shadow-card p-6">
              <item.icon className="size-7 text-primary" />
              <h2 className="mt-4 text-xl font-bold">{item.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </section>
        <section className="mt-6 rounded-3xl bg-card border border-border shadow-card p-7">
          <h2 className="text-2xl font-bold">Why Sanjeevni uses AI</h2>
          <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
            AI can help people ask questions naturally, receive explanations in simpler language, switch between languages, explore health information and discover relevant public-health resources. We use that capability to improve access while being transparent that AI can be wrong and should never replace a qualified healthcare professional.
          </p>
        </section>
        <section className="mt-6 rounded-3xl glass p-7">
          <h2 className="text-2xl font-bold">Our vision</h2>
          <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
            A world where basic health and hygiene knowledge is not limited by geography, language or literacy — and where technology helps people reach the right information and the right human support sooner.
          </p>
        </section>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-5 py-3 text-sm font-semibold hover:bg-muted transition">Back to Sanjeevni</Link>
          <Link to="/login" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow">Log in</Link>
        </div>
        <Disclaimer text="Sanjeevni provides general health information and is not a substitute for professional medical advice, diagnosis or emergency care." />
      </main>
    </PageShell>
  );
}
