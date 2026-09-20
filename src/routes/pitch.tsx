import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  FileCheck2,
  Flag,
  Globe2,
  HeartHandshake,
  Landmark,
  Lightbulb,
  Presentation,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import { PageHero, Section, StatCard } from "@/components/portal/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/pitch")({
  head: () => ({
    meta: [
      { title: "Ideathon Pitch Mode - Team Vision Buddies | SHRAM SATHI" },
      {
        name: "description",
        content:
          "Digital Shram Sankalp Ideathon 2026 presentation deck: PS-05 AI-driven smart inspection and PS-06 inclusive compliance technology.",
      },
    ],
  }),
  component: PitchDeck,
});

function PitchDeck() {
  return (
    <>
      <PageHero
        eyebrow="Digital Shram Sankalp Ideathon 2026 · Team Vision Buddies"
        title="SHRAM SATHI: Inclusive AI Compliance Intelligence"
        titleHi="श्रम साथी: समावेशी एआई अनुपालन बुद्धिमत्ता"
        description="A unified submission solving Problem Statement PS-05 (AI-Driven Smart Inspection System) and PS-06 (Accessibility & Inclusive Technology as a Core Layer) for the Ministry of Labour & Employment, Government of India."
        actions={
          <div className="flex flex-wrap gap-2">
            <Button asChild size="default" className="gap-1.5 shadow-md">
              <Link to="/documents">
                Launch Live Prototype <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="default">
              <Link to="/scorecard">View Establishment Scorecard</Link>
            </Button>
          </div>
        }
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Primary Statement" value="PS-05" hint="Smart Inspection & 4 Labour Codes" accent="primary" />
          <StatCard label="Integrated Mandate" value="PS-06" hint="Inclusive Voice, SMS, IVR, Low-Lit" accent="green" />
          <StatCard label="Coverage Reversal" value="19% → 85%" hint="AI risk-based establishment targeting" accent="saffron" />
          <StatCard label="Target Population" value="500M+" hint="Unorganised and formal workforce" accent="red" />
        </div>
      </Section>

      <Section
        title="Executive Summary & Problem Statement"
        subtitle="Addressing the critical paradox of India's labour enforcement ecosystem."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-l-4 border-l-destructive shadow-sm">
            <CardHeader>
              <Badge variant="destructive" className="w-fit mb-1">
                The Crisis
              </Badge>
              <CardTitle className="text-lg">DGFASLI Inspection Deficit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                Official DGFASLI data indicates that statutory inspection coverage has collapsed from <strong>47.56%</strong> in 2014 to just <strong>19.12%</strong> in 2024.
              </p>
              <p>
                With only ~3,300 inspectors against 9.3 lakh+ registered establishments, blind random allotment guarantees that the vast majority of hazardous violations go unnoticed until irreversible tragedy strikes.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-600 shadow-sm">
            <CardHeader>
              <Badge className="bg-emerald-600 text-white w-fit mb-1">
                Our Innovation
              </Badge>
              <CardTitle className="text-lg">SHRAM SATHI Dual Architecture</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                <strong>1. AI Document Parsing + Deterministic Statutory Rule Engine (PS-05):</strong> Validates wage registers, OSH certifications, and ECR challans with zero hallucinations.
              </p>
              <p>
                <strong>2. Inclusive Low-Tech Layer (PS-06):</strong> Bridges the digital divide via "Bolo Shram Sathi" speech synthesis in 12 Indic languages, visual traffic-light icon mode, and 1800-SHRAM-SATHI phone IVR.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section
        title="Core Technical Pillars"
        subtitle="Built on cutting-edge GovTech standards for seamless national scaling."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <Card className="border shadow-sm">
            <CardHeader>
              <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary mb-2">
                <Sparkles className="size-5" />
              </div>
              <CardTitle className="text-base">Statutory Rule Engine</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Every LLM output passes through hard-coded statutory formulas (Section 6(1) minimum wage floors, Section 13 overtime 2x multipliers). If a notice cannot cite an exact legal section, it is discarded.
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader>
              <div className="grid size-10 place-items-center rounded-lg bg-india-green/10 text-india-green mb-2">
                <Globe2 className="size-5" />
              </div>
              <CardTitle className="text-base">Low-Tech Inclusivity</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Built for the 100M+ workers without smartphones or functional literacy. SMS push alerts, two-way IVR helplines, and large visual icon cards make labour rights comprehensible to everyone.
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader>
              <div className="grid size-10 place-items-center rounded-lg bg-saffron/10 text-saffron mb-2">
                <ShieldCheck className="size-5" />
              </div>
              <CardTitle className="text-base">DPDP Act 2023 Sovereignty</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Compliant with Section 6 consent requirements and Section 12(3) right to erasure. AES-256 encrypted at rest, TLS 1.3 in transit, and hosted strictly on sovereign Indian infrastructure.
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section
        title="Team Vision Buddies & Roadmap"
        subtitle="Dedicated to transforming Indian labour governance with dignity, speed, and fairness."
      >
        <Card className="border bg-muted/20 p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="font-display text-xl font-bold">Ready for Pilot Deployment</h3>
              <p className="text-sm text-muted-foreground max-w-xl">
                Integrated with Shram Suvidha 2.0 LIN formats, pre-configured for 6 national industrial clusters (Peenya, Okhla, Bhiwandi, Tiruppur, Sanwer Road, Surat).
              </p>
            </div>
            <Button asChild size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md">
              <Link to="/documents">
                Explore Full Interactive Demo <Rocket className="size-4" />
              </Link>
            </Button>
          </div>
        </Card>
      </Section>
    </>
  );
}
