import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Cpu,
  Flame,
  Globe2,
  HardHat,
  KeyRound,
  Lock,
  LogIn,
  Mail,
  Phone,
  Radio,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  User,
  UserCheck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Central Compliance Access Gateway - SHRAM SATHI" },
      {
        name: "description",
        content:
          "Single Sign-On Authentication Gateway for Inspector-cum-Facilitators, Establishments, and Workers under India's 4 Labour Codes.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("inspector");

  // Inspector credentials state
  const [inspId, setInspId] = useState("INSP-DL-9842");
  const [inspEmail, setInspEmail] = useState("rajesh.sharma@mole.gov.in");
  const [inspPass, setInspPass] = useState("••••••••••••");

  // Employer credentials state
  const [empLin, setEmpLin] = useState("LIN-1082-9923-4120");
  const [empName, setEmpName] = useState("Radha Krishna Garments");
  const [empPass, setEmpPass] = useState("••••••••••••");

  // Worker credentials state
  const [workerUan, setWorkerUan] = useState("UAN-8891-2041-9920");
  const [workerPhone, setWorkerPhone] = useState("+91 98765 43210");
  const [workerOtp, setWorkerOtp] = useState("582194");

  const [loading, setLoading] = useState(false);

  const handleInspectorLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Security Clearance Verified - Welcome, Inspector Rajesh Sharma (Delhi/NCR Command Hub)");
      navigate({ to: "/inspector" });
    }, 600);
  };

  const handleEmployerLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("LIN Verified - Authenticated as Radha Krishna Garments (Peenya Cluster)");
      navigate({ to: "/employer" });
    }, 600);
  };

  const handleWorkerLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("eShram UAN Verified - Session Authenticated for Rameshwar Verma");
      navigate({ to: "/scorecard" });
    }, 600);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-background to-slate-100/60 dark:from-slate-950 dark:via-background dark:to-slate-900/60 pb-16">
      {/* Dynamic Ambient Glow Layers for Visual Depth */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[1100px] rounded-full bg-gradient-to-tr from-blue-600/20 via-amber-500/15 to-emerald-500/15 blur-3xl opacity-80" />
      <div className="pointer-events-none absolute top-1/4 -left-48 h-[450px] w-[450px] rounded-full bg-blue-600/20 blur-3xl opacity-70" />
      <div className="pointer-events-none absolute top-1/2 -right-48 h-[450px] w-[450px] rounded-full bg-emerald-600/20 blur-3xl opacity-70" />

      {/* Prominent High-Impact Hero Section */}
      <div className="relative border-b border-border/80 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 pt-10 pb-12 text-white shadow-xl">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-500 via-white to-emerald-500" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-300 backdrop-blur-sm">
                <span className="size-2 rounded-full bg-amber-400 animate-ping" />
                <span>Central Compliance Access Gateway</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Unified Single Sign-On Portal
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                Role-based access gateway for Enforcement Officers, Commercial Establishments, and Workers. Interoperable with Shram Suvidha 2.0, eShram, and Jan Parichay.
              </p>
            </div>

            {/* Live Security Clearance Badge */}
            <div className="flex flex-col sm:items-end gap-2 shrink-0">
              <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-950/70 px-3.5 py-2 text-xs font-bold text-emerald-300 shadow-md">
                <ShieldCheck className="size-4 text-emerald-400" />
                <span>DPDP Act 2023 Compliant</span>
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                TLS 1.3 Certified · AES-256 Sovereign Vault
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Standout 1-Click Evaluation Sandbox Banner */}
        <div className="relative mb-8 overflow-hidden rounded-2xl border-2 border-amber-500/40 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 p-5 text-white shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="grid size-7 place-items-center rounded-lg bg-amber-500 text-slate-950 font-bold shadow-md">
                  <Sparkles className="size-4" />
                </div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                  IDEATHON EVALUATION SANDBOX
                </span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                  Instant 1-Click Entry
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                Click any role below to bypass manual entry and test live authenticated portals with pre-populated statutory records.
              </p>
            </div>

            {/* Glowing Role Quick Launch Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full sm:w-auto">
              <Button
                size="sm"
                onClick={() => {
                  setActiveTab("inspector");
                  handleInspectorLogin();
                }}
                className="w-full h-10 gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3 sm:px-4 text-xs font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.45)] transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(37,99,235,0.7)]"
              >
                <ShieldCheck className="size-4 shrink-0" />
                <span className="truncate">Demo Inspector</span>
              </Button>

              <Button
                size="sm"
                onClick={() => {
                  setActiveTab("employer");
                  handleEmployerLogin();
                }}
                className="w-full h-10 gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-3 sm:px-4 text-xs font-bold text-white shadow-[0_0_20px_rgba(217,119,6,0.45)] transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(217,119,6,0.7)]"
              >
                <Building2 className="size-4 shrink-0" />
                <span className="truncate">Demo Employer</span>
              </Button>

              <Button
                size="sm"
                onClick={() => {
                  setActiveTab("worker");
                  handleWorkerLogin();
                }}
                className="w-full h-10 gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-3 sm:px-4 text-xs font-bold text-white shadow-[0_0_20px_rgba(16,185,129,0.45)] transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(16,185,129,0.7)]"
              >
                <HardHat className="size-4 shrink-0" />
                <span className="truncate">Demo Worker</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Auth & Credentials Container */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Prominent Role Authentication Card */}
          <div className="lg:col-span-7">
            <Card className="overflow-hidden border-2 border-primary/30 bg-card shadow-2xl shadow-primary/10 transition-all">
              {/* Dynamic Prominent Header Banner */}
              <div
                className={`p-4 text-white transition-all duration-300 ${
                  activeTab === "inspector"
                    ? "bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 border-b-2 border-blue-500"
                    : activeTab === "employer"
                    ? "bg-gradient-to-r from-amber-600 via-orange-700 to-slate-900 border-b-2 border-amber-500"
                    : "bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 border-b-2 border-emerald-500"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="grid size-9 place-items-center rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                      {activeTab === "inspector" ? (
                        <ShieldCheck className="size-5 text-blue-300" />
                      ) : activeTab === "employer" ? (
                        <Building2 className="size-5 text-amber-300" />
                      ) : (
                        <HardHat className="size-5 text-emerald-300" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white leading-tight">
                        {activeTab === "inspector"
                          ? "Inspector-cum-Facilitator Access"
                          : activeTab === "employer"
                          ? "Establishment & MSME Sign-In"
                          : "Worker Entitlement & Wage Portal"}
                      </h2>
                      <p className="text-xs text-white/80">
                        {activeTab === "inspector"
                          ? "Central & State Labour Enforcement Division"
                          : activeTab === "employer"
                          ? "Unique Labour Identification Number (LIN)"
                          : "12-Digit eShram UAN / Aadhaar Verification"}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                    {activeTab.toUpperCase()}
                  </span>
                </div>
              </div>

              <CardContent className="p-4 sm:p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  {/* High-Contrast Bold Role Tabs */}
                  <TabsList className="grid w-full grid-cols-3 mb-6 p-1 sm:p-1.5 bg-muted/80 rounded-xl border border-border">
                    <TabsTrigger
                      value="inspector"
                      className="gap-1 sm:gap-1.5 px-1 sm:px-3 text-[11px] sm:text-xs font-bold rounded-lg py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-500/40 transition-all"
                    >
                      <ShieldCheck className="size-3.5 sm:size-4 shrink-0" />
                      <span className="truncate">Inspector</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="employer"
                      className="gap-1 sm:gap-1.5 px-1 sm:px-3 text-[11px] sm:text-xs font-bold rounded-lg py-2 data-[state=active]:bg-amber-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-amber-500/40 transition-all"
                    >
                      <Building2 className="size-3.5 sm:size-4 shrink-0" />
                      <span className="truncate">Employer</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="worker"
                      className="gap-1 sm:gap-1.5 px-1 sm:px-3 text-[11px] sm:text-xs font-bold rounded-lg py-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-emerald-500/40 transition-all"
                    >
                      <HardHat className="size-3.5 sm:size-4 shrink-0" />
                      <span className="truncate">Worker</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* 1. INSPECTOR LOGIN TAB */}
                  <TabsContent value="inspector">
                    <form onSubmit={handleInspectorLogin} className="space-y-4">
                      <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-3.5 text-xs text-blue-950 dark:text-blue-100 flex items-start gap-2.5">
                        <Shield className="size-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold">Statutory Field Clearance: </strong>
                          Authorized for Labour Commissioners &amp; Facilitators. Grants full visibility into cluster risk heatmaps and priority queues.
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-foreground">Officer Service Identification ID</Label>
                        <div className="relative">
                          <Shield className="absolute left-3 top-3 size-4 text-blue-600" />
                          <Input
                            value={inspId}
                            onChange={(e) => setInspId(e.target.value)}
                            placeholder="e.g. INSP-DL-9842"
                            className="h-10 pl-9 text-xs font-mono font-bold border-2 border-border focus:border-blue-600"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-foreground">Government Official Email (.gov.in / .nic.in)</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 size-4 text-blue-600" />
                          <Input
                            type="email"
                            value={inspEmail}
                            onChange={(e) => setInspEmail(e.target.value)}
                            placeholder="officer@mole.gov.in"
                            className="h-10 pl-9 text-xs border-2 border-border focus:border-blue-600"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs font-bold text-foreground">Security Key / DSC Pin</Label>
                          <span className="text-[11px] text-blue-600 font-bold cursor-pointer hover:underline">
                            Use Digital Signature (DSC)
                          </span>
                        </div>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-3 size-4 text-blue-600" />
                          <Input
                            type="password"
                            value={inspPass}
                            onChange={(e) => setInspPass(e.target.value)}
                            placeholder="••••••••••••"
                            className="h-10 pl-9 text-xs font-mono border-2 border-border focus:border-blue-600"
                            required
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 gap-2 font-extrabold text-xs bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.01]"
                      >
                        <LogIn className="size-4" />
                        <span>{loading ? "Verifying Clearance..." : "Access Inspector Command Center"}</span>
                        <ArrowRight className="size-3.5" />
                      </Button>
                    </form>
                  </TabsContent>

                  {/* 2. EMPLOYER LOGIN TAB */}
                  <TabsContent value="employer">
                    <form onSubmit={handleEmployerLogin} className="space-y-4">
                      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-950 dark:text-amber-100 flex items-start gap-2.5">
                        <Building2 className="size-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold">Establishment Portal: </strong>
                          Sign in with your Unique Labour Identification Number (LIN). View self-remediation scorecards and wage calculators.
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-foreground">Labour Identification Number (LIN)</Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-3 size-4 text-amber-600" />
                          <Input
                            value={empLin}
                            onChange={(e) => setEmpLin(e.target.value)}
                            placeholder="LIN-XXXX-XXXX-XXXX"
                            className="h-10 pl-9 text-xs font-mono font-bold border-2 border-border focus:border-amber-600"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-foreground">Registered Establishment Legal Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 size-4 text-amber-600" />
                          <Input
                            value={empName}
                            onChange={(e) => setEmpName(e.target.value)}
                            placeholder="Factory or Enterprise Name"
                            className="h-10 pl-9 text-xs border-2 border-border focus:border-amber-600"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs font-bold text-foreground">Shram Suvidha Portal Password</Label>
                          <span className="text-[11px] text-amber-600 font-bold cursor-pointer hover:underline">
                            Forgot Password?
                          </span>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 size-4 text-amber-600" />
                          <Input
                            type="password"
                            value={empPass}
                            onChange={(e) => setEmpPass(e.target.value)}
                            placeholder="••••••••••••"
                            className="h-10 pl-9 text-xs font-mono border-2 border-border focus:border-amber-600"
                            required
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 gap-2 font-extrabold text-xs bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-800 text-white shadow-xl shadow-amber-600/30 transition-all hover:scale-[1.01]"
                      >
                        <LogIn className="size-4" />
                        <span>{loading ? "Verifying Establishment..." : "Open MSME Self-Compliance Portal"}</span>
                        <ArrowRight className="size-3.5" />
                      </Button>
                    </form>
                  </TabsContent>

                  {/* 3. WORKER LOGIN TAB */}
                  <TabsContent value="worker">
                    <form onSubmit={handleWorkerLogin} className="space-y-4">
                      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-950 dark:text-emerald-100 flex items-start gap-2.5">
                        <HardHat className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold">Citizen &amp; Worker Gateway: </strong>
                          Verify wage payments, overtime entitlements, and social security coverage directly via eShram UAN.
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-foreground">12-Digit eShram UAN or Aadhaar ID</Label>
                        <div className="relative">
                          <HardHat className="absolute left-3 top-3 size-4 text-emerald-600" />
                          <Input
                            value={workerUan}
                            onChange={(e) => setWorkerUan(e.target.value)}
                            placeholder="UAN-XXXX-XXXX-XXXX"
                            className="h-10 pl-9 text-xs font-mono font-bold border-2 border-border focus:border-emerald-600"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-foreground">Registered Mobile Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 size-4 text-emerald-600" />
                          <Input
                            value={workerPhone}
                            onChange={(e) => setWorkerPhone(e.target.value)}
                            placeholder="+91 XXXXX XXXXX"
                            className="h-10 pl-9 text-xs border-2 border-border focus:border-emerald-600"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs font-bold text-foreground">6-Digit One-Time Password (OTP)</Label>
                          <span className="text-[11px] text-emerald-600 font-extrabold cursor-pointer hover:underline">
                            Resend SMS OTP
                          </span>
                        </div>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-3 size-4 text-emerald-600" />
                          <Input
                            value={workerOtp}
                            onChange={(e) => setWorkerOtp(e.target.value)}
                            placeholder="582194"
                            className="h-10 pl-9 text-xs font-mono tracking-widest font-bold border-2 border-border focus:border-emerald-600"
                            required
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 gap-2 font-extrabold text-xs bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-xl shadow-emerald-600/30 transition-all hover:scale-[1.01]"
                      >
                        <CheckCircle2 className="size-4" />
                        <span>{loading ? "Verifying Aadhaar / UAN OTP..." : "Check My Wage & Benefit Status"}</span>
                        <ArrowRight className="size-3.5" />
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>

              <CardFooter className="border-t bg-muted/20 p-4 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
                <ShieldCheck className="size-4 text-emerald-600" />
                <span>
                  Secured by <strong>National Informatics Centre (NIC)</strong> · Digital Public Infrastructure
                </span>
              </CardFooter>
            </Card>
          </div>

          {/* Right Column: Prominent Telemetry & Statutory Verification */}
          <div className="space-y-5 lg:col-span-5">
            {/* Live Gateway Telemetry Badge Card (High Contrast) */}
            <Card className="border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/15 via-card to-card shadow-lg">
              <CardHeader className="pb-3 border-b border-emerald-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex size-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex size-3 rounded-full bg-emerald-500" />
                    </span>
                    <CardTitle className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-200">
                      SSO Gateway Status: Online
                    </CardTitle>
                  </div>
                  <Badge className="bg-emerald-600 text-white text-[10px] font-bold">
                    99.98% Uptime
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-3.5 space-y-2.5 text-xs text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Active Inspections Target:</span>
                  <strong className="text-foreground font-bold">100% Coverage (AI Prescreen)</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Monitored Labour Codes:</span>
                  <strong className="text-foreground font-bold">All 4 Codes Active</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pilot Clusters Live:</span>
                  <strong className="text-foreground font-bold">Peenya, Okhla, Sanand</strong>
                </div>
              </CardContent>
            </Card>

            {/* Statutory Trust Card with Colorful Icon Accents */}
            <Card className="border-2 border-border shadow-lg">
              <CardHeader className="pb-3 border-b bg-muted/20">
                <div className="flex items-center gap-2">
                  <Shield className="size-4 text-primary" />
                  <CardTitle className="text-sm font-bold">Statutory Trust Framework</CardTitle>
                </div>
                <CardDescription className="text-xs">
                  Aligned with Government of India security directives.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-4 text-xs text-muted-foreground">
                <div className="flex items-start gap-3">
                  <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-blue-600 text-white shadow-md">
                    <BadgeCheck className="size-4" />
                  </div>
                  <div>
                    <strong className="font-bold text-foreground">DPDP Act 2023 Compliant: </strong>
                    Data is processed strictly under specified-purpose compliance evaluation with zero secondary dissemination.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-purple-600 text-white shadow-md">
                    <Lock className="size-4" />
                  </div>
                  <div>
                    <strong className="font-bold text-foreground">Cryptographic Isolation: </strong>
                    All session tokens and document pointers are encrypted with AES-256 at rest and TLS 1.3 in transit.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-emerald-600 text-white shadow-md">
                    <CheckCircle2 className="size-4" />
                  </div>
                  <div>
                    <strong className="font-bold text-foreground">Immutable Audit Trail: </strong>
                    Every access and inspection note is logged with tamper-proof timestamps and legal clause citations.
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Command Shortcuts */}
            <div className="rounded-xl border-2 border-border bg-card p-4 space-y-2.5 shadow-md">
              <p className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
                Direct Command Shortcuts
              </p>
              <div className="grid grid-cols-1 gap-2.5 text-xs">
                <Link
                  to="/inspector"
                  className="flex items-center justify-between rounded-lg border-2 border-blue-500/30 bg-blue-500/10 p-3 transition-all hover:bg-blue-500/20 hover:scale-[1.01] font-bold text-blue-900 dark:text-blue-100"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-blue-600" />
                    <span>Inspector Priority Queue</span>
                  </span>
                  <ArrowRight className="size-4 text-blue-600" />
                </Link>

                <Link
                  to="/employer"
                  className="flex items-center justify-between rounded-lg border-2 border-amber-500/30 bg-amber-500/10 p-3 transition-all hover:bg-amber-500/20 hover:scale-[1.01] font-bold text-amber-900 dark:text-amber-100"
                >
                  <span className="flex items-center gap-2">
                    <Building2 className="size-4 text-amber-600" />
                    <span>Employer Wage &amp; OSH Guide</span>
                  </span>
                  <ArrowRight className="size-4 text-amber-600" />
                </Link>

                <Link
                  to="/scorecard"
                  className="flex items-center justify-between rounded-lg border-2 border-emerald-500/30 bg-emerald-500/10 p-3 transition-all hover:bg-emerald-500/20 hover:scale-[1.01] font-bold text-emerald-900 dark:text-emerald-100"
                >
                  <span className="flex items-center gap-2">
                    <HardHat className="size-4 text-emerald-600" />
                    <span>LIN Establishment Scorecard</span>
                  </span>
                  <ArrowRight className="size-4 text-emerald-600" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
