import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, CheckCircle2, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PageHero, Section, StatCard } from "@/components/portal/page-shell";
import { RiskGauge } from "@/components/portal/risk-gauge";
import { SpeakButton } from "@/components/portal/speak-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePortal } from "@/lib/portal-store";
import { ESTABLISHMENTS } from "@/lib/shram-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/employer")({
  head: () => ({
    meta: [
      { title: "Employer Self-Serve Portal - SHRAM SATHI" },
      {
        name: "description",
        content:
          "A kirana, MSME and factory-friendly view of labour compliance: traffic-light status, exact arrear amounts and a rectification window before any inspection.",
      },
      { property: "og:title", content: "Employer Self-Serve Portal - SHRAM SATHI" },
      {
        property: "og:description",
        content: "Simple, encouraging guidance for small employers to fix labour code gaps before an inspection.",
      },
    ],
  }),
  component: EmployerPage,
});

function EmployerPage() {
  const { lang } = usePortal();
  const [linIndex, setLinIndex] = useState(3);
  const est = ESTABLISHMENTS[linIndex] ?? ESTABLISHMENTS[0]!;
  const [fixed, setFixed] = useState<string[]>([]);

  const open = est.findings.filter((f) => f.severity !== "compliant");
  const remaining = open.filter((f) => !fixed.includes(f.id));

  return (
    <>
      <PageHero
        eyebrow="Module 5 · Employer view"
        title="Employer Self-Serve Portal"
        titleHi="नियोक्ता स्व-सेवा पोर्टल"
        description="Written for the shop owner and the contractor, not the compliance lawyer. See what is wrong, what it costs to fix, and how long you have - before an inspector is ever allotted."
      />

      <Section>
        <div className="mb-5 flex flex-wrap gap-2">
          {ESTABLISHMENTS.map((e, i) => (
            <button
              key={e.lin}
              onClick={() => {
                setLinIndex(i);
                setFixed([]);
              }}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors",
                i === linIndex ? "border-primary bg-primary text-primary-foreground font-semibold" : "hover:bg-secondary",
              )}
            >
              {e.name.split(" ").slice(0, 3).join(" ")}
            </button>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{est.name}</CardTitle>
              <CardDescription>
                {est.lin} · {est.workers} workers · {est.cluster}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-3">
              <RiskGauge score={est.score} />
              <SpeakButton
                size="default"
                text={
                  lang === "hi"
                    ? `आपका स्कोर ${est.score} है। ${remaining.length} काम बाकी हैं। समय पर सुधार करने पर कोई जुर्माना नहीं लगेगा।`
                    : `Your score is ${est.score}. ${remaining.length} items are pending. Fix them in time and no penalty applies.`
                }
              />
            </CardContent>
          </Card>

          <div className="grid gap-4 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard label="Things to fix" value={String(remaining.length)} accent={remaining.length ? "red" : "green"} />
              <StatCard label="Days left in window" value="15" hint="Facilitation-first: no penalty if resolved" accent="saffron" />
              <StatCard label="Money to release" value="₹2,44,400" hint="Wage arrears + OT differential + EPF" accent="primary" />
            </div>
            <Card className="border-l-4 border-l-india-green">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Sparkles className="size-4 text-india-green" aria-hidden /> You are not being penalised - you are being helped
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                SHRAM SATHI shows every gap before an inspection is allotted. Employers who clear their list inside the
                window move out of the priority queue automatically, and the change is recorded in the audit trail.
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      <Section title="Your action list" subtitle="Tick each item as you complete it. Tap the speaker to hear the instruction in your language.">
        <div className="grid gap-4 md:grid-cols-2">
          {open.map((f) => {
            const isFixed = fixed.includes(f.id);
            const colour = isFixed ? "var(--risk-low)" : f.severity === "critical" ? "var(--risk-high)" : "var(--risk-mid)";
            return (
              <div
                key={f.id}
                className="animate-rise rounded-2xl border-4 p-5"
                style={{ borderColor: colour, backgroundColor: `color-mix(in oklab, ${colour} 8%, var(--card))` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-4xl" aria-hidden>
                    {isFixed ? "✅" : f.severity === "critical" ? "⛔" : "⚠️"}
                  </span>
                  <Badge variant="outline">{f.code} Code</Badge>
                </div>
                <h3 className="mt-3 font-display text-base font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm">{lang === "hi" ? f.resolveHi : f.resolve}</p>
                <p className="mt-2 text-xs text-muted-foreground">{f.section} · risk if ignored: {f.penalty}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <SpeakButton text={`${lang === "hi" ? f.observationHi : f.observation} ${lang === "hi" ? f.resolveHi : f.resolve}`} />
                  <Button
                    size="sm"
                    variant={isFixed ? "secondary" : "default"}
                    className="gap-1.5"
                    onClick={() => {
                      setFixed((l) => (isFixed ? l.filter((x) => x !== f.id) : [...l, f.id]));
                      if (!isFixed) toast.success("Marked as rectified", { description: `${f.title} - proof upload reminder scheduled.` });
                    }}
                  >
                    <CheckCircle2 className="size-4" aria-hidden />
                    {isFixed ? "Marked done" : "Mark as fixed"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        <Card className="mt-5">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 pt-6">
            <p className="flex items-center gap-2 text-sm">
              <CalendarClock className="size-4 text-primary" aria-hidden />
              Need help? A facilitator visit is advisory, free, and does not trigger prosecution.
            </p>
            <Button
              onClick={() =>
                toast.success("Facilitation visit requested", {
                  description: `${est.district} office will confirm a slot within 48 hours.`,
                })
              }
            >
              Request facilitation visit
            </Button>
          </CardContent>
        </Card>
      </Section>
    </>
  );
}
