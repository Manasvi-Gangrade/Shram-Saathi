import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2,
  Database,
  Eye,
  FileKey,
  Key,
  Lock,
  RefreshCw,
  Server,
  Shield,
  ShieldCheck,
  Trash2,
  UserCheck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PageHero, Section, StatCard } from "@/components/portal/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { AUDIT_LOG } from "@/lib/shram-data";

export const Route = createFileRoute("/dpdp")({
  head: () => ({
    meta: [
      { title: "DPDP Act 2023 & Security Hub — SHRAM SATHI" },
      {
        name: "description",
        content:
          "Digital Personal Data Protection Act 2023 compliance architecture: consent management, verifiable audit logs, AES-256 encryption, and right to erasure.",
      },
    ],
  }),
  component: DpdpHub,
});

function DpdpHub() {
  const [wageConsent, setWageConsent] = useState(true);
  const [voiceConsent, setVoiceConsent] = useState(true);
  const [anonymizedDemo, setAnonymizedDemo] = useState(false);
  const [erasureRequested, setErasureRequested] = useState(false);

  const handleErasure = () => {
    setErasureRequested(true);
    toast.success("Statutory right to erasure request logged under Section 12(3) DPDP Act 2023.");
  };

  return (
    <>
      <PageHero
        eyebrow="DPDP Act 2023 · Sovereign Data Safeguards"
        title="Data Protection & Cryptographic Security Hub"
        titleHi="डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम 2023 व सुरक्षा केंद्र"
        description="SHRAM SATHI is engineered from inception to comply with the Digital Personal Data Protection (DPDP) Act, 2023. We ensure unorganised workers and MSMEs retain full sovereignty over their biometric, payroll, and identity records."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-emerald-600 text-white font-mono text-xs px-3 py-1">
              <ShieldCheck className="mr-1.5 size-3.5" /> CERT-In Hardened Standards
            </Badge>
            <Badge variant="outline" className="border-primary/40 text-xs px-3 py-1">
              <Lock className="mr-1.5 size-3.5" /> AES-256-GCM at Rest
            </Badge>
          </div>
        }
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Encryption Standard" value="AES-256" hint="FIPS 140-3 cryptographic modules" accent="primary" />
          <StatCard label="In-Transit Security" value="TLS 1.3" hint="Zero unencrypted plaintext transmission" accent="green" />
          <StatCard label="Active Consents" value="1.42M" hint="Granular statutory purpose logs" accent="saffron" />
          <StatCard label="Data Sovereignty" value="100% In-Country" hint="Hosted strictly in MeitY-empaneled data centers" accent="green" />
        </div>
      </Section>

      <Section
        title="Consent Architecture (Section 6 DPDP Act 2023)"
        subtitle="Workers and employers can inspect, grant, or revoke consent for processing payroll, biometric, and inspection records."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <UserCheck className="size-4 text-primary" />
                Data Principal Consent Manager
              </CardTitle>
              <CardDescription>
                Simulate how an unorganised worker or MSME employer exercises control over their data artifacts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div>
                  <p className="font-semibold text-sm">Wage & Muster Roll Processing</p>
                  <p className="text-xs text-muted-foreground">Consent to verify wages against Code on Wages Section 6(1)</p>
                </div>
                <Switch
                  checked={wageConsent}
                  onCheckedChange={(v) => {
                    setWageConsent(v);
                    toast.info(v ? "Wage processing consent granted" : "Wage processing consent paused");
                  }}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div>
                  <p className="font-semibold text-sm">Voice Recording & Speech Telemetry</p>
                  <p className="text-xs text-muted-foreground">Allows IVR and Bolo Shram Sathi to transcribe voice complaints</p>
                </div>
                <Switch
                  checked={voiceConsent}
                  onCheckedChange={(v) => {
                    setVoiceConsent(v);
                    toast.info(v ? "Voice consent granted" : "Voice consent paused");
                  }}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div>
                  <p className="font-semibold text-sm">Right to Erasure (Sec 12(3))</p>
                  <p className="text-xs text-muted-foreground">Purge historical audio logs and non-statutory metadata</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleErasure}
                  disabled={erasureRequested}
                  className="text-xs gap-1 border-destructive/30 text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="size-3.5" />
                  {erasureRequested ? "Purge Queued" : "Request Erasure"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Eye className="size-4 text-primary" />
                  Dynamic Data Masking Demo
                </CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setAnonymizedDemo(!anonymizedDemo)}
                  className="text-xs"
                >
                  <RefreshCw className="mr-1 size-3" />
                  {anonymizedDemo ? "Show Raw Demo" : "Toggle Anonymization"}
                </Button>
              </div>
              <CardDescription>
                Zero-knowledge data masking protects individual PII while enabling aggregate cluster intelligence.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-lg border bg-muted/40">
                <span className="text-muted-foreground block text-[11px] uppercase">Aadhaar / UAN Record:</span>
                <span className="text-foreground font-semibold">
                  {anonymizedDemo ? "XXXX-XXXX-4417" : "6891-4412-4417"}
                </span>
              </div>
              <div className="p-3 rounded-lg border bg-muted/40">
                <span className="text-muted-foreground block text-[11px] uppercase">Worker Name:</span>
                <span className="text-foreground font-semibold">
                  {anonymizedDemo ? "R****** K****" : "Ramesh Kumar"}
                </span>
              </div>
              <div className="p-3 rounded-lg border bg-muted/40">
                <span className="text-muted-foreground block text-[11px] uppercase">Bank Account / IFSC:</span>
                <span className="text-foreground font-semibold">
                  {anonymizedDemo ? "SBIN000**** [Acc: ******4182]" : "SBIN0001042 [Acc: 309118944182]"}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground font-sans pt-1">
                {anonymizedDemo
                  ? "✓ Cryptographic SHA-256 salted hashing prevents re-identification across data breaches."
                  : "Click 'Toggle Anonymization' to preview the automated masking applied to public and inspector views."}
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section
        title="Immutable Statutory Audit Trail"
        subtitle="Every document read, scorecard computation, and facilitator access is permanently logged with cryptographic timestamping."
      >
        <Card className="border shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileKey className="size-4 text-primary" />
              Verifiable Cryptographic Event Ledger
            </CardTitle>
            <CardDescription>
              Tamper-evident logs verifiable by third-party auditors and the Data Protection Board of India.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="border-b bg-muted/40 font-semibold">
                  <tr>
                    <th className="px-4 py-3">Timestamp (IST)</th>
                    <th className="px-4 py-3">Actor & Identity</th>
                    <th className="px-4 py-3">Action Performed</th>
                    <th className="px-4 py-3">Target Resource</th>
                    <th className="px-4 py-3">Statutory Legal Basis</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {AUDIT_LOG.map((log, idx) => (
                    <tr key={idx} className="hover:bg-muted/20">
                      <td className="px-4 py-2.5 text-muted-foreground">{log.time}</td>
                      <td className="px-4 py-2.5 font-semibold text-primary">{log.actor}</td>
                      <td className="px-4 py-2.5">{log.action}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{log.target}</td>
                      <td className="px-4 py-2.5 text-foreground">{log.basis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </Section>
    </>
  );
}
