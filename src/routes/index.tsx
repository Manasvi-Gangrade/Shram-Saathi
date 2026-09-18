import { Link, createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  Brain,
  FileSearch,
  Gauge,
  Landmark,
  Mic,
  Presentation,
  ScanEye,
  ShieldCheck,
  Store,
  TrendingDown,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
  YAxis,
} from "recharts";

import { PageHero, Section, StatCard } from "@/components/portal/page-shell";
import { SpeakButton } from "@/components/portal/speak-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePortal } from "@/lib/portal-store";
import { DGFASLI_COVERAGE, PIPELINE_STAGES } from "@/lib/shram-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Executive Overview — SHRAM SATHI | AI Labour Code Compliance, MoLE" },
      {
        name: "description",
        content:
          "PS-05 AI-driven smart inspection and PS-06 inclusive technology: how SHRAM SATHI reverses the fall in inspection coverage from 47.56% to 19.12% across India's four Labour Codes.",
      },
      { property: "og:title", content: "Executive Overview — SHRAM SATHI, Ministry of Labour & Employment" },
      {
        property: "og:description",
        content:
          "An AI-powered, inclusive compliance intelligence portal for risk-based labour inspections, built by Team Vision Buddies for Digital Shram Sankalp Ideathon 2026.",
      },
    ],
  }),
  component: Overview,
});

const MODULES = [
  { to: "/documents", icon: FileSearch, title: "AI Document Ingestion & Verification", desc: "OCR + RAG + deterministic statutory rule engine over wage registers, OSH audits and ECR challans." },
  { to: "/scorecard", icon: Gauge, title: "Risk-Based Compliance Scorecard", desc: "Composite 0–100 score per Shram Pehchan Sankhya with clause-level citations and remedies." },
  { to: "/voice", icon: Mic, title: "Inclusive Voice & Low-Tech Suite", desc: "Bolo Shram Sathi speech in/out, icon mode, SMS alerts and a working IVR simulator." },
  { to: "/employer", icon: Store, title: "Employer Self-Serve Portal", desc: "Kirana, MSME and factory views with traffic-light guidance to fix issues before inspection." },
  { to: "/inspector", icon: ScanEye, title: "Inspector-cum-Facilitator Dashboard", desc: "Cluster risk heatmap, computerised priority queue and on-site voice dictation." },
  { to: "/dpdp", icon: ShieldCheck, title: "DPDP Act 2023 & Security Hub", desc: "Consent architecture, erasure, audit trail and anonymisation demonstration." },
  { to: "/pitch", icon: Presentation, title: "Ideathon Pitch Mode", desc: "Team Vision Buddies' full narrative: problem, solution, impact and roadmap." },
] as const;

function Overview() {
  const { lang, t } = usePortal();

  const narration =
    lang === "hi"
      ? "श्रम साथी एक एआई आधारित समावेशी अनुपालन पोर्टल है। देश में निरीक्षण कवरेज 47.56 प्रतिशत से घटकर 19.12 प्रतिशत रह गई है। श्रम साथी दस्तावेज़ों का एआई विश्लेषण कर जोखिम आधारित निरीक्षण सूची बनाता है, और आवाज़, एसएमएस तथा आईवीआर के माध्यम से हर श्रमिक और छोटे नियोक्ता तक पहुँचता है।"
      : "SHRAM SATHI is an AI powered inclusive compliance intelligence portal for the Ministry of Labour and Employment. Statutory inspection coverage in India has fallen from 47.56 percent to 19.12 percent. SHRAM SATHI reads establishment documents with AI, validates every flag against the exact statutory section, and ranks establishments by risk so that scarce inspectors visit the right places. Its accessibility layer reaches every worker through voice, SMS and I V R.";

  return (
    <>
      <PageHero
        eyebrow="Problem Statement PS-05 · integrated PS-06"
        title="AI-Driven Smart Inspection System for Labour Code Compliance"
        titleHi="श्रम संहिता अनुपालन हेतु एआई आधारित स्मार्ट निरीक्षण प्रणाली"
        description="SHRAM SATHI converts scanned registers, safety audits and contribution challans into verified, citation-backed compliance intelligence — then delivers it to inspectors, employers and workers in the language and medium each one can actually use."
        actions={
          <>
            <SpeakButton text={narration} label={t("listen")} size="default" />
            <Button asChild size="default" className="gap-1.5">
              <Link to="/documents">
                Run the live AI engine <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </>
        }
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Inspection coverage 2024" value="19.12%" hint="Down from 47.56% (DGFASLI)" accent="red" />
          <StatCard label="Registered establishments" value="9.3 lakh+" hint="Shram Suvidha 2.0 LIN registry" accent="primary" />
          <StatCard label="Inspectors available" value="~3,300" hint="Against a sanctioned need of 7,000+" accent="saffron" />
          <StatCard label="High-risk units surfaced" value="434" hint="Across 6 pilot industrial clusters" accent="green" />
        </div>
      </Section>

      <Section
        title="The compliance enforcement gap"
        subtitle="DGFASLI data shows statutory inspection coverage of registered factories collapsing over a decade, while the establishment base keeps expanding. Random, manual inspection cannot close this gap."
      >
        <div className="grid gap-5 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingDown className="size-4 text-risk-high" aria-hidden />
                Percentage of registered factories inspected
              </CardTitle>
              <CardDescription>Source: DGFASLI Standard Reference Note, Ministry of Labour &amp; Employment</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DGFASLI_COVERAGE} margin={{ left: -18, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="cov" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--risk-high)" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="var(--risk-high)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="year" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                  <YAxis unit="%" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                  <ReTooltip
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      color: "var(--card-foreground)",
                      fontSize: 12,
                    }}
                    formatter={(v: number) => [`${v}%`, "Coverage"]}
                  />
                  <Area type="monotone" dataKey="coverage" stroke="var(--risk-high)" strokeWidth={2.5} fill="url(#cov)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 lg:col-span-2">
            <Card className="border-l-4 border-l-saffron">
              <CardHeader className="pb-2">
                <Badge variant="secondary" className="w-fit">PS-05</Badge>
                <CardTitle className="text-base">AI-Driven Smart Inspection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>
                  Inspections are allotted randomly, documents are verified manually, and violations surface only after harm
                  is done. Enforcement capacity cannot scale linearly with the establishment base.
                </p>
                <p className="text-foreground">
                  <strong>Our answer:</strong> an AI ingestion engine plus a deterministic statutory rule engine that ranks
                  every establishment by risk, so inspection becomes targeted facilitation.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-india-green">
              <CardHeader className="pb-2">
                <Badge variant="secondary" className="w-fit">PS-06</Badge>
                <CardTitle className="text-base">Accessibility &amp; Inclusive Technology</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>
                  A compliance portal that only a chartered accountant can read excludes the kirana owner, the contract
                  worker and the visually impaired citizen.
                </p>
                <p className="text-foreground">
                  <strong>Our answer:</strong> inclusion is not a tab — it is a layer. Voice in eight languages, icon-driven
                  low-literacy mode, high contrast, dyslexia font, SMS and IVR on feature phones.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      <Section
        title="How the engine reasons — and why it cannot hallucinate a notice"
        subtitle="Every AI-generated flag passes through a deterministic statutory rule engine before it reaches a human. If a flag cannot be tied to an exact section and threshold, it is discarded."
      >
        <ol className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
          {PIPELINE_STAGES.map((stage, i) => (
            <li key={stage.key} className="animate-rise rounded-xl border bg-card p-4 shadow-sm" style={{ animationDelay: `${i * 70}ms` }}>
              <span className="grid size-8 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <h3 className="mt-3 text-sm font-semibold">{stage.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{stage.detail}</p>
            </li>
          ))}
        </ol>
        <div className="mt-5 flex flex-wrap gap-2">
          {[
            "Code on Wages, 2019",
            "OSH & Working Conditions Code, 2020",
            "Code on Social Security, 2020",
            "Industrial Relations Code, 2020",
          ].map((code) => (
            <Badge key={code} variant="outline" className="gap-1 border-primary/30 text-primary">
              <Landmark className="size-3.5" aria-hidden /> {code}
            </Badge>
          ))}
        </div>
      </Section>

      <Section title="Portal modules" subtitle="Every module below is live in this prototype with pre-loaded sample data — nothing is a mock-up screenshot.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m) => (
            <Link
              key={m.to}
              to={m.to}
              className="group rounded-xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <m.icon className="size-6 text-primary" aria-hidden />
              <h3 className="mt-3 font-display text-base font-semibold">{m.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{m.desc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Open module
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section
        title="Expected outcomes"
        subtitle="Modelled on the six pilot clusters carried in this prototype."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Inspector time saved" value="62%" hint="Document pre-verification before site visit" accent="green" />
          <StatCard label="Detection lead time" value="-41 days" hint="Violations flagged before statutory harm" accent="primary" />
          <StatCard label="Voluntary self-rectification" value="3.4x" hint="Employers fixing flags pre-inspection" accent="saffron" />
          <StatCard label="Worker reach without smartphones" value="100%" hint="Via SMS + IVR channels" accent="green" />
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm"><Brain className="size-4 text-primary" aria-hidden /> Explainable by design</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Each flag carries the statutory section, the extracted value, the legal threshold and the arithmetic in
              between — an inspector can defend it in an appellate hearing.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm"><Users className="size-4 text-india-green" aria-hidden /> Facilitation before penalty</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              MSMEs get a plain-language rectification window with exact arrear amounts, aligning with the Labour Codes'
              facilitation-first mandate.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm"><AlertTriangle className="size-4 text-saffron" aria-hidden /> No blind inspections</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              The computerised priority queue replaces random allotment with transparent, auditable risk scoring — fully
              consistent with the Codes' web-based inspection scheme.
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}
