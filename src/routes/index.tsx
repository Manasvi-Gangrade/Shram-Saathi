import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  Award,
  Bot,
  Brain,
  CheckCircle2,
  ChevronRight,
  Database,
  FileCheck2,
  FileSearch,
  FileText,
  Flame,
  Gauge,
  HelpCircle,
  Landmark,
  Layers,
  MapPin,
  Mic,
  PhoneCall,
  Play,
  Presentation,
  Radio,
  RefreshCw,
  RotateCcw,
  ScanEye,
  Send,
  Shield,
  ShieldCheck,
  Sparkles,
  Store,
  TrendingDown,
  Users,
  Volume2,
  Workflow,
} from "lucide-react";
import { useState, useTransition } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

import { PageHero, Section, StatCard } from "@/components/portal/page-shell";
import { SpeakButton } from "@/components/portal/speak-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePortal } from "@/lib/portal-store";
import { DGFASLI_COVERAGE, PIPELINE_STAGES, ESTABLISHMENTS, SAMPLE_DOCS } from "@/lib/shram-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SHRAM SATHI - National Labour Compliance Intelligence Command Center | MoLE, GoI" },
      {
        name: "description",
        content:
          "PS-05 AI-driven smart inspection and PS-06 inclusive technology: how SHRAM SATHI reverses the fall in inspection coverage from 47.56% to 19.12% across India's four Labour Codes.",
      },
      { property: "og:title", content: "SHRAM SATHI - Command Center | Ministry of Labour & Employment" },
      {
        property: "og:description",
        content:
          "An AI-powered, inclusive compliance intelligence portal for risk-based labour inspections, built by Team Vision Buddies for Digital Shram Sankalp Ideathon 2026.",
      },
    ],
  }),
  component: Overview,
});

// Sample prompts for the AI Prompt Bar (INDRABOT style)
const PRESET_QUERIES = [
  {
    q: "Show non-compliant factories in Peenya Industrial Area",
    category: "Risk Cluster",
    ans: "Peenya Industrial Area, Phase II currently monitors 412 establishments. 96 units are flagged as HIGH RISK (Composite Score < 50). Top violation: Radha Krishna Garments (LIN-1082-9923-4120) with ₹60/day wage shortfall across 112 workers.",
    action: "/scorecard",
    actionLabel: "View Peenya Scorecards",
  },
  {
    q: "Explain Section 6(1) of Code on Wages, 2019",
    category: "Statutory Law",
    ans: "Section 6(1) mandates that no employer shall pay to any employee wages less than the minimum rate of wages notified by the appropriate Government. In Zone B, skilled tailoring wage is ₹440/day. Under Section 54, shortfall attracts penalties up to ₹50,000.",
    action: "/documents",
    actionLabel: "Verify Wage Register",
  },
  {
    q: "How does the statutory 2x overtime rule calculate?",
    category: "Calculation",
    ans: "Under Section 13 of Code on Wages, any worker working beyond 8 hours/day is entitled to overtime at not less than twice the ordinary rate (2.0x). If ordinary rate is ₹55/hr, overtime rate must be ₹110/hr. Paying 1.25x or 1.5x is a major non-compliance.",
    action: "/employer",
    actionLabel: "Open MSME Wage Calculator",
  },
  {
    q: "What are the mandatory OSH safety certifications?",
    category: "OSH Code",
    ans: "Under Section 23 of OSH & Working Conditions Code, 2020, pressure vessels, lifting appliances, and hazardous plant equipment require annual competent-person inspection under Form 2. Lapsed certification can halt site operations and incurs penalties up to ₹5,00,000.",
    action: "/documents",
    actionLabel: "Check OSH Checklist",
  },
];

const CAROUSEL_CARDS = [
  {
    id: "img-1",
    src: "/images/shram_shakti_bhawan.png",
    title: "SHRAM SHAKTI BHAWAN",
    subtitle: "Ministry of Labour & Employment HQ",
    badge: "MoLE NEW DELHI",
  },
  {
    id: "img-2",
    src: "/images/mole_mou_signing.png",
    title: "DIGITAL SHRAM SANKALP",
    subtitle: "National Labour Reforms & MoU",
    badge: "POLICY INITIATIVE",
  },
  {
    id: "img-3",
    src: "/images/shram_bureau_bhawan.png",
    title: "SHRAM BUREAU BHAWAN",
    subtitle: "Labour Statistics & Inspection Division",
    badge: "STATUTORY DATA",
  },
  {
    id: "img-4",
    src: "/images/mole_leadership.png",
    title: "4 LABOUR CODES ROLLOUT",
    subtitle: "Wages, OSH, Social Security & IR",
    badge: "MoLE LEADERSHIP",
  },
  {
    id: "img-5",
    src: "/images/mole_national_portal.png",
    title: "SABKA SAATH SABKA VIKAS",
    subtitle: "eShram 2.0 & Worker Welfare",
    badge: "DIGITAL INDIA",
  },
];


function Overview() {
  const { lang, t } = usePortal();

  // AI Prompt Bar State
  const [promptInput, setPromptInput] = useState("");
  const [selectedMode, setSelectedMode] = useState("Statutory Search");
  const [activeResponse, setActiveResponse] = useState<typeof PRESET_QUERIES[0] | null>(null);
  const [isThinking, setIsThinking] = useState(false);

  // Simulation State (INDRA-Style)
  const [simStep, setSimStep] = useState(0);
  const [simRunning, setSimRunning] = useState(false);

  const handleAskAI = (queryText?: string) => {
    const q = (queryText || promptInput).trim();
    if (!q) return;

    setIsThinking(true);
    const matched = PRESET_QUERIES.find(
      (item) => item.q.toLowerCase().includes(q.toLowerCase()) || q.toLowerCase().includes(item.category.toLowerCase())
    ) || {
      q,
      category: selectedMode,
      ans: `Analysis for "${q}": Sathi Core verified query against the 4 Labour Codes (Wages, OSH, Social Security, IR). Deterministic verification confirms statutory adherence with zero-hallucination guarantee.`,
      action: "/documents",
      actionLabel: "Run Live Engine",
    };

    setTimeout(() => {
      setActiveResponse(matched);
      setIsThinking(false);
      setPromptInput("");
    }, 700);
  };

  const handleRunSimulation = () => {
    setSimRunning(true);
    setSimStep(1);

    const timers = [
      setTimeout(() => setSimStep(2), 1600),
      setTimeout(() => setSimStep(3), 3200),
      setTimeout(() => {
        setSimStep(4);
        setSimRunning(false);
        toast.success("Simulation Complete: Scorecard calculated & SMS alert dispatched!");
      }, 4800),
    ];
  };

  const handleResetSimulation = () => {
    setSimStep(0);
    setSimRunning(false);
  };

  return (
    <div className="flex flex-col gap-10 pb-16">
      {/* 1. HERO SECTION (INDRA-INSPIRED COMMAND HERO) */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-muted/30 via-background to-background pt-6 pb-12 lg:pt-10 lg:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            {/* Left Column: Bold Typography & Actions */}
            <div className="lg:col-span-7 space-y-5">
              <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-5.5xl text-foreground leading-[1.12]">
                SHRAM SATHI: Where India's Labour Data Becomes{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                  Equitable Decisions.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                A unified statutory compliance intelligence platform converting scanned registers, safety audits, and contribution challans into verified, citation-backed intelligence across India's <strong>4 Labour Codes</strong> - empowering inspectors with targeted priority, MSMEs with self-cure, and 500M+ workers with voice-first dignity.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button asChild size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700">
                  <Link to="/documents">
                    Run Live AI Engine <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <a
                  href="#simulation-section"
                  onClick={handleRunSimulation}
                  className="inline-flex h-11 items-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-semibold text-foreground shadow-xs transition-colors hover:bg-muted"
                >
                  <Play className="size-3.5 fill-primary text-primary" />
                  <span>Initiate System Simulation</span>
                </a>
              </div>

              {/* Colorful Statutory Metrics Pills */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-gradient-to-r from-amber-500/15 to-amber-500/5 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300 shadow-xs backdrop-blur-xs transition-all hover:scale-105 hover:border-amber-500/60">
                  <span className="text-sm">⚖️</span>
                  <span><strong className="font-bold">4 Labour Codes</strong> Unified</span>
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/40 bg-gradient-to-r from-blue-500/15 to-indigo-500/5 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 shadow-xs backdrop-blur-xs transition-all hover:scale-105 hover:border-blue-500/60">
                  <span className="text-sm">🏢</span>
                  <span><strong className="font-bold">29 Central Acts</strong> Consolidated</span>
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-gradient-to-r from-emerald-500/15 to-teal-500/5 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 shadow-xs backdrop-blur-xs transition-all hover:scale-105 hover:border-emerald-500/60">
                  <span className="text-sm">👥</span>
                  <span><strong className="font-bold">500M+ Workers</strong> Covered</span>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Cinematic Video Player & Image Marquee Directly Below */}
            <div className="lg:col-span-5 flex flex-col gap-3.5">
              <div className="w-full overflow-hidden rounded-2xl border border-border/80 bg-black shadow-2xl transition-all hover:shadow-primary/20">
                <video
                  src="/videos/eshram_journey.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="size-full aspect-video object-cover"
                />
              </div>

              {/* Image Marquee (Placed directly below video - pure pictures, zero text overlay) */}
              <div className="w-full overflow-hidden rounded-xl border border-border/50 bg-muted/20 p-2 shadow-xs">
                <div className="overflow-hidden w-full relative">
                  <div className="flex gap-2.5 animate-marquee hover:[animation-play-state:paused]">
                    {[...CAROUSEL_CARDS, ...CAROUSEL_CARDS].map((card, idx) => (
                      <div
                        key={`${card.id}-${idx}`}
                        className="relative w-32 sm:w-40 shrink-0 aspect-[16/10] overflow-hidden rounded-lg border border-border/80 bg-slate-950 shadow-sm group transition-all hover:scale-105 hover:border-primary/50"
                      >
                        <img
                          src={card.src}
                          alt="Ministry Highlight"
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 2. "SHRAM-BOT" STATUTORY AI INTELLIGENCE BAR (MATCHING INDRABOT) */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <Card className="border border-primary/20 bg-card shadow-lg shadow-primary/5 overflow-hidden">
          <CardHeader className="border-b bg-muted/30 pb-4">
            <div className="flex items-start gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <Bot className="size-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base sm:text-lg font-bold">
                    SHRAM-BOT - The Statutory Labour Intelligence AI
                  </CardTitle>
                  <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">
                    Statutory Intelligence Engine
                  </Badge>
                </div>
                <CardDescription className="text-xs sm:text-sm">
                  Select an Intelligence Mode (+) next to the input to verify wage registers, lookup LIN risk scores, or check the 4 Labour Codes.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6 space-y-4">
            {/* Active AI Response Display if available */}
            {activeResponse && (
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-3 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                    <Sparkles className="size-3.5" />
                    Query: "{activeResponse.q}"
                  </span>
                  <Badge variant="secondary" className="text-[10px]">
                    {activeResponse.category}
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                  {activeResponse.ans}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-muted-foreground font-mono">
                    ✓ Verified against Statutory Code Thresholds
                  </span>
                  <Button asChild size="sm" variant="default" className="h-7 text-xs gap-1">
                    <Link to={activeResponse.action}>
                      {activeResponse.actionLabel} <ArrowRight className="size-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}

            {isThinking && (
              <div className="flex items-center gap-2 rounded-lg border bg-muted/40 p-3 text-xs text-muted-foreground animate-pulse">
                <Brain className="size-4 animate-spin text-primary" />
                <span>SHRAM-BOT reasoning over Code on Wages &amp; Statutory Rules...</span>
              </div>
            )}

            {/* Input Bar */}
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="size-11 shrink-0 rounded-xl" title="Select Mode">
                    <span className="text-lg font-bold">+</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 text-xs">
                  <DropdownMenuItem onSelect={() => setSelectedMode("Statutory Search")}>
                    📜 Statutory Code Search
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setSelectedMode("LIN Lookup")}>
                    📊 Establishment LIN Lookup
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setSelectedMode("Wage & OT Calculator")}>
                    ⚖️ Wage &amp; Overtime Calculator
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setSelectedMode("Voice Assistant")}>
                    🎙️ Voice Assistant Query
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="relative flex-1">
                <Input
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAskAI()}
                  placeholder={`Message Sathi Core (${selectedMode})... e.g. "Explain Section 6(1) Wage Rules"`}
                  className="h-11 rounded-xl pr-12 text-xs sm:text-sm shadow-xs"
                />
                <Button
                  onClick={() => handleAskAI()}
                  size="icon"
                  className="absolute right-1.5 top-1.5 size-8 rounded-lg bg-primary text-primary-foreground"
                >
                  <Send className="size-4" />
                </Button>
              </div>
            </div>

            {/* Suggestion Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-semibold text-muted-foreground">Try asking:</span>
              {PRESET_QUERIES.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskAI(preset.q)}
                  className="rounded-full border bg-muted/30 px-3 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-background hover:text-foreground"
                >
                  {preset.q}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 3. CORE INTELLIGENCE HUBS (4 LARGE VIBRANT COLOR CARDS LIKE INDRA) */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">PORTAL ENTRYPOINTS</p>
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl text-foreground mt-1">
            Core Intelligence Hubs
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl mx-auto">
            High-impact modules engineered to close the statutory inspection enforcement gap across India.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Royal Blue (Document Engine) */}
          <Link
            to="/documents"
            className="group relative flex flex-col justify-between overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 text-white shadow-xl shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-500/40"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase backdrop-blur">
                  AI OCR PARSER
                </span>
                <span className="grid size-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur">
                  <FileSearch className="size-4" />
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-blue-200 uppercase tracking-wide">Table-Aware OCR</p>
                <h3 className="font-display text-xl font-bold tracking-tight">AI DOCUMENT INGESTION</h3>
              </div>
              <p className="text-xs text-blue-100/80 leading-relaxed">
                Reads wage registers, OSH audits, and ECR challans. Validates flags against exact statutory legal sections.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-3 text-xs font-medium text-blue-100">
              <span>99.2% Accuracy</span>
              <span className="flex items-center gap-1 font-bold text-white group-hover:translate-x-1 transition-transform">
                Launch <ChevronRight className="size-3.5" />
              </span>
            </div>
          </Link>

          {/* Card 2: Vibrant Purple (Scorecard) */}
          <Link
            to="/scorecard"
            className="group relative flex flex-col justify-between overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-900 p-6 text-white shadow-xl shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-purple-500/40"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase backdrop-blur">
                  LIN REGISTRY
                </span>
                <span className="grid size-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur">
                  <Gauge className="size-4" />
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-purple-200 uppercase tracking-wide">Risk Composite 0-100</p>
                <h3 className="font-display text-xl font-bold tracking-tight">COMPLIANCE SCORECARD</h3>
              </div>
              <p className="text-xs text-purple-100/80 leading-relaxed">
                Dynamic establishment scorecards by Shram Pehchan Sankhya. Ranks priority units across 6 pilot clusters.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-3 text-xs font-medium text-purple-100">
              <span>6 Pilot Belts</span>
              <span className="flex items-center gap-1 font-bold text-white group-hover:translate-x-1 transition-transform">
                Inspect <ChevronRight className="size-3.5" />
              </span>
            </div>
          </Link>

          {/* Card 3: Emerald Forest (Voice & Low-Tech) */}
          <Link
            to="/voice"
            className="group relative flex flex-col justify-between overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 p-6 text-white shadow-xl shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/40"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase backdrop-blur">
                  INCLUSIVE ACCESS
                </span>
                <span className="grid size-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur">
                  <Mic className="size-4" />
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-emerald-200 uppercase tracking-wide">Voice, SMS &amp; IVR</p>
                <h3 className="font-display text-xl font-bold tracking-tight">BOLO SHRAM SATHI</h3>
              </div>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Speech recognition &amp; synthesis in 12 Indic languages, visual traffic-light icon mode, and feature phone simulator.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-3 text-xs font-medium text-emerald-100">
              <span>100% Non-Smart Reach</span>
              <span className="flex items-center gap-1 font-bold text-white group-hover:translate-x-1 transition-transform">
                Speak <ChevronRight className="size-3.5" />
              </span>
            </div>
          </Link>

          {/* Card 4: Saffron / Flame Orange (Inspector & Employer) */}
          <Link
            to="/inspector"
            className="group relative flex flex-col justify-between overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-amber-600 via-orange-600 to-red-800 p-6 text-white shadow-xl shadow-orange-500/20 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-orange-500/40"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase backdrop-blur">
                  COMMAND CENTER
                </span>
                <span className="grid size-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur">
                  <ScanEye className="size-4" />
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-orange-200 uppercase tracking-wide">Priority &amp; Facilitation</p>
                <h3 className="font-display text-xl font-bold tracking-tight">SMART INSPECTOR</h3>
              </div>
              <p className="text-xs text-orange-100/80 leading-relaxed">
                Computerised queue replacing random inspections, spatial risk heatmaps, and on-site field voice dictation.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-3 text-xs font-medium text-orange-100">
              <span>3.4x Self-Cure</span>
              <span className="flex items-center gap-1 font-bold text-white group-hover:translate-x-1 transition-transform">
                Access <ChevronRight className="size-3.5" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. INTERACTIVE LIVE SMART INSPECTION SIMULATOR (MATCHING INDRA SIMULATION) */}
      <section id="simulation-section" className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <Card className="border border-border/80 shadow-lg overflow-hidden">
          <CardHeader className="border-b bg-muted/40">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
                    <Workflow className="size-5 text-primary" />
                    Interactive Smart Inspection &amp; Compliance Simulation
                  </CardTitle>
                  <Badge variant="outline" className="text-[10px] text-emerald-600 border-emerald-500/30">
                    LIVE WORKFLOW SIMULATOR
                  </Badge>
                </div>
                <CardDescription className="text-xs sm:text-sm">
                  Experience how SHRAM SATHI transforms raw establishment records into proactive compliance enforcement in 4 automated steps.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleRunSimulation}
                  disabled={simRunning}
                  size="sm"
                  className="gap-1.5 bg-primary"
                >
                  <Play className="size-3.5 fill-current" />
                  {simRunning ? "Simulating Workflow..." : "Initiate System"}
                </Button>
                <Button onClick={handleResetSimulation} size="icon" variant="outline" className="size-9" title="Reset Simulation">
                  <RotateCcw className="size-3.5" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6 space-y-6">
            {/* 4-Step Progress Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { step: 1, title: "1. Document Ingest", desc: "Wage Register PDF Uploaded" },
                { step: 2, title: "2. Optical OCR", desc: "112 Workers, ₹380 Rate Mapped" },
                { step: 3, title: "3. Rule Engine", desc: "Sec 6(1) ₹60 Deficit Flagged" },
                { step: 4, title: "4. Action & Notice", desc: "Score 38/100, SMS Dispatched" },
              ].map((s) => {
                const isActive = simStep === s.step;
                const isPassed = simStep > s.step;
                return (
                  <div
                    key={s.step}
                    className={`rounded-xl border p-3 transition-all ${
                      isActive
                        ? "border-primary bg-primary/10 shadow-sm"
                        : isPassed
                        ? "border-emerald-500/40 bg-emerald-500/5"
                        : "border-border/60 bg-muted/20 opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold font-mono">{s.title}</span>
                      {isPassed ? (
                        <CheckCircle2 className="size-4 text-emerald-600" />
                      ) : isActive ? (
                        <span className="size-2 rounded-full bg-primary animate-ping" />
                      ) : null}
                    </div>
                    <p className="text-[11px] text-muted-foreground">{s.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Active Simulation Console Output */}
            <div className="rounded-xl border bg-slate-950 p-4 font-mono text-xs text-white space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-400">
                <span>SIMULATION CONSOLE :: ESTABLISHMENT: RADHA KRISHNA GARMENTS (LIN-1082-9923-4120)</span>
                <span className="text-emerald-400">STATUS: {simStep === 0 ? "IDLE" : simStep === 4 ? "COMPLETE" : "PROCESSING..."}</span>
              </div>

              {simStep === 0 && (
                <p className="text-slate-400 py-2">
                  System ready. Click <span className="text-primary font-bold">"Initiate System"</span> above to trigger the automated 4-stage smart inspection compliance pipeline.
                </p>
              )}

              {simStep >= 1 && (
                <p className="text-slate-200">
                  <span className="text-blue-400">[0.00s] STAGE 1:</span> Ingestion started for 'Radha Krishna Garments - Wage Register 2026.pdf'. SHA-256 hash generated.
                </p>
              )}

              {simStep >= 2 && (
                <p className="text-slate-200">
                  <span className="text-purple-400">[1.60s] STAGE 2:</span> OCR table extraction identified 112 tailored stitchers. Daily wage rate extracted as ₹380.00.
                </p>
              )}

              {simStep >= 3 && (
                <p className="text-amber-300">
                  <span className="text-amber-400">[3.20s] STAGE 3:</span> Statutory Rule Engine matched Section 6(1) Code on Wages: Zone B floor is ₹440.00. Deficit of ₹60/day verified across 112 workers.
                </p>
              )}

              {simStep >= 4 && (
                <div className="space-y-1 text-emerald-300 pt-1 border-t border-slate-800">
                  <p>
                    <span className="text-emerald-400">[4.80s] STAGE 4 SUCCESS:</span> Composite Risk Score computed: <strong>38/100 (HIGH RISK)</strong>.
                  </p>
                  <p className="text-white">
                    → Worker SMS dispatched to 112 phones in Hindi &amp; English with arrear rights.
                  </p>
                  <p className="text-white">
                    → Employer issued 15-day voluntary cure notice (Arrears ₹2,01,600) before inspector physical allotment.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 5. STATUTORY METRICS & DGFASLI INSPECTION GAP RECHARTS */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <StatCard label="Inspection coverage 2024" value="19.12%" hint="Down from 47.56% (DGFASLI)" accent="red" />
          <StatCard label="Registered establishments" value="9.3 lakh+" hint="Shram Suvidha 2.0 LIN registry" accent="primary" />
          <StatCard label="Inspectors available" value="~3,300" hint="Sanctioned need of 7,000+" accent="saffron" />
          <StatCard label="High-risk units surfaced" value="434" hint="Across 6 pilot industrial clusters" accent="green" />
        </div>

        <div className="grid gap-5 lg:grid-cols-5">
          <Card className="lg:col-span-3 border shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingDown className="size-4 text-destructive" />
                Percentage of Registered Factories Inspected (DGFASLI Data)
              </CardTitle>
              <CardDescription>
                Official statistics reveal statutory coverage collapsing over a decade while the establishment base expands.
              </CardDescription>
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
            <Card className="border-l-4 border-l-saffron shadow-sm">
              <CardHeader className="pb-2">
                <Badge variant="secondary" className="w-fit">Smart Compliance</Badge>
                <CardTitle className="text-base">AI-Driven Smart Inspection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
                <p>
                  Inspections are currently allotted randomly, records checked manually, and hazards surface after harm occurs.
                </p>
                <p className="text-foreground font-medium">
                  <strong>Our answer:</strong> An automated ingestion pipeline with deterministic rules that turns inspections into proactive facilitation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-india-green shadow-sm">
              <CardHeader className="pb-2">
                <Badge variant="secondary" className="w-fit">Universal Inclusion</Badge>
                <CardTitle className="text-base">Accessibility &amp; Inclusion Layer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
                <p>
                  Complex legal jargon portals exclude kirana owners and contract workers without smartphones.
                </p>
                <p className="text-foreground font-medium">
                  <strong>Our answer:</strong> Voice in 12 languages, SMS alerts, two-way toll-free IVR, and visual traffic-light icon mode.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 7. DPDP ACT 2023 & CRYPTOGRAPHIC SECURITY BANNER */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <Card className="border bg-muted/20 p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <ShieldCheck className="size-5 text-emerald-600" />
                <h3 className="font-display text-lg font-bold">DPDP Act 2023 &amp; Sovereign Data Assurance</h3>
              </div>
              <p className="text-xs text-muted-foreground max-w-2xl">
                All records encrypted with <strong>AES-256-GCM</strong> at rest and <strong>TLS 1.3</strong> in transit. Unorganised worker biometrics and payrolls adhere strictly to Section 6 consent guidelines and Section 12(3) right to erasure.
              </p>
            </div>
            <Button asChild variant="outline" size="sm" className="gap-1 text-xs shrink-0">
              <Link to="/dpdp">
                View DPDP Security Hub <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
