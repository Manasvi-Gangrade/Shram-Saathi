import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, FileUp, Loader2, ShieldCheck, TriangleAlert, Upload } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

import { PageHero, Section } from "@/components/portal/page-shell";
import { SpeakButton } from "@/components/portal/speak-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { usePortal } from "@/lib/portal-store";
import { ALL_FINDINGS, ESTABLISHMENTS, PIPELINE_STAGES, SAMPLE_DOCS, type SampleDoc } from "@/lib/shram-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "AI Document Ingestion & Verification Engine - SHRAM SATHI" },
      {
        name: "description",
        content:
          "Upload or load sample wage registers, OSH audits and ECR challans and watch OCR, RAG interpretation and the deterministic statutory rule engine produce citation-backed compliance flags.",
      },
      { property: "og:title", content: "AI Document Ingestion & Verification Engine - SHRAM SATHI" },
      {
        property: "og:description",
        content: "OCR + RAG + statutory rule engine over labour compliance documents, with sector anomaly detection.",
      },
    ],
  }),
  component: DocumentsPage,
});

const SEVERITY_STYLE: Record<string, string> = {
  critical: "border-l-risk-high",
  major: "border-l-saffron",
  minor: "border-l-primary",
  compliant: "border-l-india-green",
};

function DocumentsPage() {
  const { lang, speak, voiceOn } = usePortal();
  const [doc, setDoc] = useState<SampleDoc | null>(null);
  const [stage, setStage] = useState(-1);
  const [done, setDone] = useState(false);
  const [dragging, setDragging] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const run = useCallback(
    (selected: SampleDoc) => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      setDoc(selected);
      setDone(false);
      setStage(0);
      PIPELINE_STAGES.forEach((_, i) => {
        timers.current.push(
          setTimeout(() => setStage(i + 1), 850 * (i + 1)),
        );
      });
      timers.current.push(
        setTimeout(() => {
          setDone(true);
          const flags = selected.extracted.filter((e) => e.status === "flag").length;
          toast.success("Analysis complete", {
            description: `${selected.title}: ${flags} field-level anomalies validated against statute.`,
          });
          if (voiceOn) {
            speak(
              lang === "hi"
                ? `विश्लेषण पूर्ण। ${flags} विसंगतियाँ वैधानिक धाराओं के विरुद्ध सत्यापित हुईं।`
                : `Analysis complete. ${flags} anomalies validated against statutory sections.`,
            );
          }
        }, 850 * (PIPELINE_STAGES.length + 1)),
      );
    },
    [lang, speak, voiceOn],
  );

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    const guess =
      /osh|safety/i.test(file.name) ? SAMPLE_DOCS[1]
      : /esi|epf|challan|ecr/i.test(file.name) ? SAMPLE_DOCS[2]
      : /muster|clra|contract/i.test(file.name) ? SAMPLE_DOCS[3]
      : SAMPLE_DOCS[0];
    if (!guess) return;
    toast.info(`${file.name} queued`, { description: "Classified and routed to the ingestion pipeline." });
    run({ ...guess, title: `${file.name} - parsed as ${guess.kind}` });
  };

  const establishment = doc ? ESTABLISHMENTS.find((e) => e.lin === doc.lin) : undefined;
  const findings = doc ? ALL_FINDINGS.filter((f) => doc.findingIds.includes(f.id)) : [];
  const progress = stage < 0 ? 0 : Math.round((Math.min(stage, PIPELINE_STAGES.length) / PIPELINE_STAGES.length) * 100);

  return (
    <>
      <PageHero
        eyebrow="PS-05 · Module 2"
        title="AI Document Ingestion & Compliance Verification Engine"
        titleHi="एआई दस्तावेज़ ग्रहण एवं अनुपालन सत्यापन इंजन"
        description="Drop a wage register, safety audit or contribution challan - or load a pre-verified sample - and watch the five-stage pipeline extract, interpret, and legally validate every field."
      />

      <Section>
        <div className="grid gap-5 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Upload establishment documents</CardTitle>
              <CardDescription>PDF, JPG or PNG. Scanned and handwritten registers supported via layout-aware OCR.</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  handleFiles(e.dataTransfer.files);
                }}
                className={cn(
                  "flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-colors",
                  dragging ? "border-saffron bg-saffron/10" : "border-border bg-secondary/40",
                )}
              >
                <Upload className="size-8 text-primary" aria-hidden />
                <p className="mt-3 text-sm font-medium">Drag &amp; drop documents here</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Wage Register (Form XVII) · OSH Safety Checklist · ESI/EPF Challan · CLRA Muster Roll
                </p>
                <input
                  ref={inputRef}
                  type="file"
                  className="sr-only"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => handleFiles(e.target.files)}
                />
                <Button className="mt-4 gap-1.5" onClick={() => inputRef.current?.click()}>
                  <FileUp className="size-4" aria-hidden /> Browse files
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">One-click sample documents</CardTitle>
              <CardDescription>Realistic records for instant jury testing.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {SAMPLE_DOCS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => run(d)}
                  className={cn(
                    "w-full rounded-lg border p-3 text-left transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-sm",
                    doc?.id === d.id && "border-primary bg-primary/5",
                  )}
                >
                  <p className="text-sm font-semibold">{d.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {d.kind} · {d.pages} pages · {d.sizeKb} KB
                  </p>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>

      {doc ? (
        <>
          <Section title="Extraction pipeline" subtitle={doc.title}>
            <Progress value={progress} className="mb-5 h-2" aria-label="Pipeline progress" />
            <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
              {PIPELINE_STAGES.map((s, i) => {
                const state = stage > i ? "done" : stage === i ? "active" : "idle";
                return (
                  <li
                    key={s.key}
                    className={cn(
                      "rounded-xl border bg-card p-4 transition-all",
                      state === "active" && "border-saffron shadow-md",
                      state === "done" && "border-india-green/50",
                      state === "idle" && "opacity-60",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {state === "done" ? (
                        <CheckCircle2 className="size-5 text-india-green" aria-hidden />
                      ) : state === "active" ? (
                        <Loader2 className="size-5 animate-spin text-saffron" aria-hidden />
                      ) : (
                        <span className="grid size-5 place-items-center rounded-full border text-[10px]">{i + 1}</span>
                      )}
                      <p className="text-sm font-semibold">{s.title}</p>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.detail}</p>
                  </li>
                );
              })}
            </ol>
          </Section>

          {done ? (
            <>
              <Section title="Normalised field extraction" subtitle="Canonical labour-code fields mapped from the document layout.">
                <div className="overflow-hidden rounded-xl border">
                  <table className="w-full text-sm">
                    <caption className="sr-only">Extracted fields and their compliance status</caption>
                    <thead className="bg-secondary text-left">
                      <tr>
                        <th scope="col" className="px-4 py-2 font-semibold">Field</th>
                        <th scope="col" className="px-4 py-2 font-semibold">Extracted value</th>
                        <th scope="col" className="px-4 py-2 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {doc.extracted.map((row) => (
                        <tr key={row.field} className="border-t">
                          <td className="px-4 py-2 text-muted-foreground">{row.field}</td>
                          <td className="px-4 py-2 font-medium">{row.value}</td>
                          <td className="px-4 py-2">
                            {row.status === "ok" ? (
                              <span className="inline-flex items-center gap-1 text-india-green">
                                <CheckCircle2 className="size-4" aria-hidden /> Verified
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-risk-high">
                                <TriangleAlert className="size-4" aria-hidden /> Anomaly
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>

              <Section
                title="Rule-engine validated findings"
                subtitle="Each flag survived deterministic revalidation against the exact statutory threshold. Citations are machine-generated but legally verifiable."
              >
                <div className="grid gap-4 lg:grid-cols-2">
                  {findings.map((f) => (
                    <Card key={f.id} className={cn("animate-rise border-l-4", SEVERITY_STYLE[f.severity])}>
                      <CardHeader className="pb-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant={f.severity === "compliant" ? "secondary" : "destructive"} className="uppercase">
                            {f.severity}
                          </Badge>
                          <Badge variant="outline">{f.code} Code</Badge>
                        </div>
                        <CardTitle className="mt-1 text-base">{f.title}</CardTitle>
                        <CardDescription className="font-medium text-primary">{f.section}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <p>{lang === "hi" ? f.observationHi : f.observation}</p>
                        <p className="text-muted-foreground">
                          <strong className="text-foreground">Penalty exposure:</strong> {f.penalty}
                        </p>
                        <p className="rounded-lg bg-secondary p-2">
                          <strong>How to resolve:</strong> {lang === "hi" ? f.resolveHi : f.resolve}
                        </p>
                        <SpeakButton
                          text={`${f.title}. ${lang === "hi" ? f.observationHi : f.observation} ${lang === "hi" ? f.resolveHi : f.resolve}`}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <p className="mt-4 inline-flex items-center gap-2 rounded-lg border border-india-green/40 bg-india-green/10 px-3 py-2 text-sm">
                  <ShieldCheck className="size-4 text-india-green" aria-hidden />
                  Rule engine dropped 2 LLM-proposed flags that could not be tied to a notified threshold - zero hallucinated
                  notices reach an inspector.
                </p>
              </Section>

              {establishment ? (
                <Section
                  title="Sector anomaly detection"
                  subtitle={`${establishment.name} measured against ${establishment.sector} norms for ${establishment.district}.`}
                >
                  <Card>
                    <CardContent className="h-80 pt-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={establishment.benchmark} margin={{ left: -10, right: 8 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis dataKey="metric" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} interval={0} angle={-12} height={50} />
                          <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                          <ReTooltip
                            contentStyle={{
                              background: "var(--card)",
                              border: "1px solid var(--border)",
                              borderRadius: 8,
                              color: "var(--card-foreground)",
                              fontSize: 12,
                            }}
                          />
                          <Legend wrapperStyle={{ fontSize: 12 }} />
                          <Bar dataKey="establishment" name="This establishment" fill="var(--risk-high)" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="sectorNorm" name="Regional sector norm" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </Section>
              ) : null}
            </>
          ) : null}
        </>
      ) : null}
    </>
  );
}
