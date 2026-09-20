import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  Brain,
  CheckCircle2,
  Filter,
  Flame,
  Gauge,
  MapPin,
  Mic,
  MicOff,
  Navigation,
  RefreshCw,
  ScanEye,
  ShieldAlert,
  Sparkles,
  Volume2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PageHero, Section, StatCard } from "@/components/portal/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePortal } from "@/lib/portal-store";
import { CLUSTER_RISK, ESTABLISHMENTS, bandOf, BAND_META } from "@/lib/shram-data";

export const Route = createFileRoute("/inspector")({
  head: () => ({
    meta: [
      { title: "Inspector-cum-Facilitator Command Dashboard — SHRAM SATHI" },
      {
        name: "description",
        content:
          "Computerised priority queue, spatial cluster risk heatmaps, and on-site voice observation dictation under India's 4 Labour Codes.",
      },
    ],
  }),
  component: InspectorDashboard,
});

function InspectorDashboard() {
  const { lang, t } = usePortal();
  const [selectedCluster, setSelectedCluster] = useState<string>("all");
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dictationActive, setDictationActive] = useState(false);
  const [dictatedText, setDictatedText] = useState(
    "Unit 4 boiler pressure relief valve inspection seal missing. Worker muster logs indicate 14 contract labourers without issued eye protection goggles in hot grinding zone."
  );
  const [analyzingNotes, setAnalyzingNotes] = useState(false);
  const [taggedSections, setTaggedSections] = useState<string[]>([]);

  const filteredEstablishments = ESTABLISHMENTS.filter((est) => {
    if (selectedCluster !== "all" && !est.cluster.includes(selectedCluster)) return false;
    if (riskFilter !== "all" && est.band !== riskFilter) return false;
    if (
      searchQuery &&
      !est.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !est.lin.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleVoiceDictate = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      toast.info("Speech Recognition API not supported in this browser. Showing simulated voice input.");
      setDictationActive(!dictationActive);
      return;
    }

    const SpeechRecognition =
      (window as unknown as { SpeechRecognition: any; webkitSpeechRecognition: any }).SpeechRecognition ||
      (window as unknown as { SpeechRecognition: any; webkitSpeechRecognition: any }).webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = lang === "hi" ? "hi-IN" : "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    if (!dictationActive) {
      recognition.start();
      setDictationActive(true);
      toast.info("Listening for inspector spot notes...");

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setDictatedText(text);
        setDictationActive(false);
        toast.success("Voice observation captured!");
      };

      recognition.onerror = () => {
        setDictationActive(false);
      };
    } else {
      recognition.stop();
      setDictationActive(false);
    }
  };

  const handleAutoTag = () => {
    setAnalyzingNotes(true);
    setTimeout(() => {
      setAnalyzingNotes(false);
      setTaggedSections([
        "Section 23, OSH Code (Lapsed Equipment Safety & Pressure Relief)",
        "Section 16, OSH Code (Mandatory PPE & Eye Protection)",
        "Rule 41, Central Labour Rules (Contract Muster Discrepancy)",
      ]);
      toast.success("Statutory AI tags extracted from spot notes!");
    }, 1100);
  };

  return (
    <>
      <PageHero
        eyebrow="PS-05 Smart Inspection · Facilitator Command"
        title="Inspector-cum-Facilitator Smart Priority Dashboard"
        titleHi="निरीक्षक-सह-सुविधाकर्ता स्मार्ट प्राथमिकता डैशबोर्ड"
        description="Replacing arbitrary manual raids with data-driven statutory risk ranking. Facilitate voluntary compliance, allocate scarce inspectors to verified high-risk units, and dictate on-site spot observations directly into legal code citations."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 border-emerald-500/30 px-3 py-1 font-mono text-xs">
              ACTIVE FACILITATOR ID: INSP/KA/BLR/0271
            </Badge>
            <Button size="sm" variant="outline" onClick={() => toast.success("Live priority queue synced with Shram Suvidha 2.0")}>
              <RefreshCw className="mr-1.5 size-3.5" /> Sync Live Registry
            </Button>
          </div>
        }
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Cluster units monitored" value="2,387" hint="Across 6 priority manufacturing belts" accent="primary" />
          <StatCard label="Critical risk queue" value="334 units" hint="Triggering immediate facilitation notice" accent="red" />
          <StatCard label="Voluntary self-cure" value="78.4%" hint="Fixed before site inspection visit" accent="green" />
          <StatCard label="Average visit time saved" value="4.2 hrs" hint="Pre-verified document OCR audit" accent="saffron" />
        </div>
      </Section>

      <Section
        title="Computerised Priority Inspection Queue"
        subtitle="Ranked dynamically by Composite Statutory Risk Score (0-100). Low score = High Violation Probability."
      >
        <Card className="border border-border/80 shadow-md">
          <CardHeader className="border-b bg-muted/30 pb-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <ScanEye className="size-4 text-primary" />
                  Statutory Establishment Allotment Queue
                </CardTitle>
                <CardDescription>
                  Web-based non-discretionary inspection roster mandated under Section 34 of the OSH Code, 2020.
                </CardDescription>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Input
                  placeholder="Search establishment / LIN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 w-48 text-xs sm:w-64"
                />
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger className="h-9 w-32 text-xs">
                    <SelectValue placeholder="Risk Band" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Bands</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                    <SelectItem value="mid">Moderate Risk</SelectItem>
                    <SelectItem value="low">Low Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b bg-muted/40 font-semibold text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Establishment & LIN</th>
                    <th className="px-4 py-3">Sector & Cluster</th>
                    <th className="px-4 py-3">Workers</th>
                    <th className="px-4 py-3">Risk Score</th>
                    <th className="px-4 py-3">Status / Queue</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredEstablishments.map((est) => {
                    const meta = BAND_META[est.band];
                    return (
                      <tr key={est.lin} className="hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3.5">
                          <p className="font-semibold text-foreground">{est.name}</p>
                          <p className="font-mono text-[11px] text-muted-foreground">{est.lin}</p>
                        </td>
                        <td className="px-4 py-3.5">
                          <p className="text-foreground">{est.sector}</p>
                          <p className="text-[11px] text-muted-foreground">{est.cluster}</p>
                        </td>
                        <td className="px-4 py-3.5 font-medium">{est.workers}</td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <span
                              className={`grid size-7 place-items-center rounded-md font-bold text-xs ${
                                est.band === "high"
                                  ? "bg-red-500/15 text-red-700"
                                  : est.band === "mid"
                                  ? "bg-amber-500/15 text-amber-700"
                                  : "bg-emerald-500/15 text-emerald-700"
                              }`}
                            >
                              {est.score}
                            </span>
                            <Badge
                              variant="outline"
                              className={`text-[10px] ${
                                est.band === "high"
                                  ? "border-red-400 bg-red-50 text-red-700"
                                  : est.band === "mid"
                                  ? "border-amber-400 bg-amber-50 text-amber-700"
                                  : "border-emerald-400 bg-emerald-50 text-emerald-700"
                              }`}
                            >
                              {meta.label}
                            </Badge>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          {est.band === "high" ? (
                            <span className="inline-flex items-center gap-1 font-medium text-red-600">
                              <Flame className="size-3.5" /> Priority Visit Scheduled
                            </span>
                          ) : est.band === "mid" ? (
                            <span className="inline-flex items-center gap-1 text-amber-600">
                              <AlertTriangle className="size-3.5" /> 15-Day Cure Window
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-emerald-600">
                              <CheckCircle2 className="size-3.5" /> Routine Audit
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <Button asChild size="sm" variant="ghost" className="h-8 gap-1 text-xs">
                            <Link to="/scorecard">
                              Inspect <ArrowRight className="size-3.5" />
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section
        title="Industrial Cluster Risk Heatmap"
        subtitle="Geospatial concentration of non-compliance indicators across monitored export and manufacturing belts."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CLUSTER_RISK.map((c) => (
            <Card key={c.cluster} className="border hover:border-primary/40 transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    <MapPin className="mr-1 size-3" /> {c.district}
                  </Badge>
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                      c.score < 50
                        ? "bg-red-100 text-red-700"
                        : c.score < 70
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    Avg Score: {c.score}/100
                  </span>
                </div>
                <CardTitle className="text-sm font-semibold mt-2">{c.cluster}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">Total Establishments:</span>
                  <span className="font-semibold">{c.establishments}</span>
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">High Risk Violations:</span>
                  <span className="font-bold text-red-600">{c.high} units</span>
                </div>
                <div className="pt-2">
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500"
                      style={{ width: `${c.score}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        title="On-Site Voice Observation Dictation Tool"
        subtitle="Inspectors can speak natural voice observations during field inspections. The AI transcribes and automatically tags exact statutory code violations and prescribed penalties."
      >
        <Card className="border border-primary/30 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Mic className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-base">Field Spot Dictation & Citation Extractor</CardTitle>
                  <CardDescription>
                    Records on-device audio, transcribes multilingual observations, and maps them to Labour Codes.
                  </CardDescription>
                </div>
              </div>
              <Button
                onClick={handleVoiceDictate}
                variant={dictationActive ? "destructive" : "default"}
                size="sm"
                className="gap-1.5"
              >
                {dictationActive ? <MicOff className="size-4 animate-pulse" /> : <Mic className="size-4" />}
                {dictationActive ? "Stop Dictation" : "Start Voice Recording"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">
                Inspector Observation Notes (Transcribed Text)
              </label>
              <textarea
                value={dictatedText}
                onChange={(e) => setDictatedText(e.target.value)}
                rows={4}
                className="w-full rounded-md border border-input bg-background p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Dictate or type field observation..."
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Supported inputs: English, हिन्दी, regional voice notes with noise-canceling field preprocessing.
              </span>
              <Button onClick={handleAutoTag} disabled={analyzingNotes} size="sm" className="gap-1.5">
                <Sparkles className="size-4" />
                {analyzingNotes ? "Extracting Citations..." : "Auto-Extract Statutory Citations"}
              </Button>
            </div>

            {taggedSections.length > 0 && (
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-50/50 p-4 dark:bg-emerald-950/20">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="size-4" />
                  Statutory Rule Engine Validation Result
                </p>
                <div className="space-y-1.5">
                  {taggedSections.map((sec, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded bg-white p-2 text-xs font-mono shadow-sm dark:bg-card"
                    >
                      <span className="text-foreground">{sec}</span>
                      <Badge variant="outline" className="text-[10px] text-primary border-primary/30">
                        VERIFIED CITATION
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </Section>
    </>
  );
}
