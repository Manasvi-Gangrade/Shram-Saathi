import { Link } from "@tanstack/react-router";
import {
  Accessibility,
  ArrowRight,
  Bot,
  Building2,
  ChevronDown,
  Clock,
  CloudSun,
  Contrast,
  FileSearch,
  FileText,
  HardHat,
  Home,
  Languages,
  LayoutDashboard,
  Link2,
  LogIn,
  MapPin,
  Menu,
  Mic,
  Minus,
  Moon,
  PauseCircle,
  Play,
  Plus,
  Radio,
  RotateCcw,
  ScanEye,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Sun,
  Type,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { GoogleTranslateWidget, useTTS } from "@/components/portal/translate-tts";
import { LANGUAGES, usePortal } from "@/lib/portal-store";
import { cn } from "@/lib/utils";

export function GovHeader() {
  const portal = usePortal();
  const { ttsEnabled, setTtsEnabled } = useTTS();
  const [timeStr, setTimeStr] = useState("08:42:15 pm");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).toLowerCase()
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    toast.info(soundEnabled ? "Audio narration muted" : "Audio narration enabled");
  };

  const navLinks = [
    { to: "/", label: "Home Command Center", icon: Home, badge: "Overview" },
    { to: "/login", label: "Central SSO Login", icon: LogIn, badge: "GovTech Auth" },
    { to: "/scorecard", label: "Establishments & Scorecards", icon: LayoutDashboard, badge: "LIN 2.0" },
    { to: "/documents", label: "Live AI OCR Parser", icon: FileSearch, badge: "Inspection" },
    { to: "/inspector", label: "Inspector Field View", icon: ShieldCheck, badge: "Priority Queue" },
    { to: "/employer", label: "MSME Self-Cure Portal", icon: Building2, badge: "Wage/OT" },
    { to: "/worker", label: "Bolo Shram Sathi", icon: Mic, badge: "Voice AI" },
    { to: "/dpdp", label: "DPDP 2023 Architecture", icon: Shield, badge: "Privacy" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85 shadow-xs">
      {/* Tricolour Accent Line */}
      <div className="tricolour-bar h-1 w-full" aria-hidden />

      {/* Unified, Sleek Main Header (Zero Clutter, Fully Responsive) */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:px-6 sm:py-2.5 lg:px-8">
        {/* Left: Branding & Compact Live Status */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group" aria-label="Shram Sathi Home">
            <div className="relative flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-white p-1 shadow-sm border border-border/80 transition-transform group-hover:scale-105">
              <img
                src="/images/Logo.png"
                alt="Ministry of Labour & Employment Logo"
                className="size-full object-contain"
              />
              <span className="absolute -bottom-0.5 -right-0.5 size-2 sm:size-2.5 rounded-full border-2 border-background bg-emerald-500 animate-pulse" />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="font-display text-sm sm:text-base lg:text-lg font-extrabold tracking-tight text-foreground">
                  SHRAM SATHI
                </span>
                <span className="rounded bg-emerald-500/15 px-1 sm:px-1.5 py-0.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  MoLE · GoI
                </span>
              </div>
              <p className="hidden md:block text-[10px] text-muted-foreground">
                AI Compliance Intelligence Portal
              </p>
            </div>
          </Link>

          {/* Compact Telemetry Pill (Desktop only) */}
          <div className="hidden xl:flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-[11px] text-muted-foreground font-medium">
            <span className="flex items-center gap-1 text-foreground">
              <Clock className="size-3 text-primary" />
              <span className="tabular-nums font-mono">{timeStr}</span>
            </span>
            <span className="text-border">|</span>
            <span className="flex items-center gap-1">
              <MapPin className="size-3 text-destructive" />
              <span>New Delhi</span>
            </span>
            <span className="text-border">|</span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <CloudSun className="size-3" />
              <span>28.5°C</span>
            </span>
          </div>
        </div>

        {/* Right: Controls & Glowing Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Google Translate Dropdown */}
          <div className="max-w-[110px] xs:max-w-[130px] sm:max-w-none overflow-hidden">
            <GoogleTranslateWidget />
          </div>

          {/* Hover Text-to-Speech (TTS) Toggle */}
          <Button
            variant={ttsEnabled ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setTtsEnabled(!ttsEnabled);
              toast.info(
                !ttsEnabled
                  ? "Hover voice narration active (hover over any text to listen)"
                  : "Hover voice narration muted"
              );
            }}
            className={cn(
              "h-8 rounded-full px-2 sm:px-2.5 text-xs transition-all gap-1.5",
              ttsEnabled
                ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            )}
            title={
              ttsEnabled
                ? "Hover Voice Active: Auto-reads hovered text in selected language (Click to mute)"
                : "Hover Voice Muted (Click to enable audio reading on hover)"
            }
          >
            <Volume2 className={cn("size-3.5", ttsEnabled && "animate-pulse")} />
            <span className="hidden sm:inline font-medium">
              {ttsEnabled ? "Voice On" : "Voice Off"}
            </span>
          </Button>

          {/* Accessibility Dropdown (Desktop) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1 rounded-full px-2.5 text-xs bg-background hidden md:inline-flex">
                <Accessibility className="size-3.5 text-saffron" />
                <span className="hidden lg:inline">Accessibility</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-3 text-xs shadow-xl">
              <div className="mb-2 flex items-center justify-between border-b pb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-foreground">
                  Accessibility &amp; Display
                </span>
                <span className="text-[10px] rounded bg-primary/10 px-1.5 py-0.5 font-medium text-primary">
                  WCAG 2.1 AA
                </span>
              </div>

              {/* Text Size Scaler */}
              <div className="mb-2 flex items-center justify-between rounded-lg border bg-muted/20 p-2">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <Type className="size-3.5 text-primary" /> Text Size
                </span>
                <span className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="outline"
                    className="size-6 rounded"
                    onClick={() => portal.bumpText(-0.1)}
                    title="Decrease font size"
                  >
                    <Minus className="size-3" />
                  </Button>
                  <span className="w-9 text-center text-xs tabular-nums font-bold text-foreground">
                    {Math.round(portal.textScale * 100)}%
                  </span>
                  <Button
                    size="icon"
                    variant="outline"
                    className="size-6 rounded"
                    onClick={() => portal.bumpText(0.1)}
                    title="Increase font size"
                  >
                    <Plus className="size-3" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-6 text-muted-foreground hover:text-foreground"
                    onClick={portal.resetText}
                    title="Reset to 100%"
                  >
                    <RotateCcw className="size-3" />
                  </Button>
                </span>
              </div>

              {/* Dark Mode */}
              <ToolbarToggle
                icon={portal.darkMode ? <Moon className="size-3.5 text-indigo-400" /> : <Sun className="size-3.5 text-amber-500" />}
                label="Dark Theme"
                checked={portal.darkMode}
                onChange={portal.toggleDarkMode}
              />

              {/* High Contrast */}
              <ToolbarToggle
                icon={<Contrast className="size-3.5 text-yellow-500" />}
                label="High Contrast (AAA)"
                checked={portal.highContrast}
                onChange={portal.toggleContrast}
              />

              {/* Dyslexia-Friendly Font */}
              <ToolbarToggle
                icon={<Type className="size-3.5 text-blue-500" />}
                label="Dyslexia Font"
                checked={portal.dyslexia}
                onChange={portal.toggleDyslexia}
              />

              {/* Focus Spotlight */}
              <ToolbarToggle
                icon={<ScanEye className="size-3.5 text-emerald-500" />}
                label="Focus Spotlight"
                checked={portal.focusMode}
                onChange={portal.toggleFocusMode}
              />

              {/* Highlight Links */}
              <ToolbarToggle
                icon={<Link2 className="size-3.5 text-cyan-500" />}
                label="Highlight Links"
                checked={portal.highlightLinks}
                onChange={portal.toggleHighlightLinks}
              />

              {/* Reduce Motion / Pause Animations */}
              <ToolbarToggle
                icon={<PauseCircle className="size-3.5 text-rose-500" />}
                label="Pause Animations"
                checked={portal.reduceMotion}
                onChange={portal.toggleReduceMotion}
              />
            </DropdownMenuContent>
          </DropdownMenu>

          {/* SIMULATION Pill (INDRA Style) - Visible on tablet/desktop */}
          <a
            href="#simulation-section"
            className="hidden md:inline-flex h-8 items-center gap-1.5 rounded-full border border-slate-300 dark:border-slate-700 bg-background px-3 text-[11px] font-bold text-foreground shadow-xs transition-all hover:bg-muted"
          >
            <Play className="size-2.5 fill-primary text-primary" />
            <span>SIMULATION</span>
          </a>

          {/* LIN REGISTRY Pill (Emerald Glow) - Visible on large screens */}
          <Link
            to="/scorecard"
            className="hidden lg:inline-flex h-8 items-center gap-1 rounded-full bg-emerald-600 px-3.5 text-[11px] font-bold text-white shadow-[0_0_15px_rgba(16,185,129,0.35)] transition-all hover:bg-emerald-700 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]"
          >
            <span>LIN REGISTRY</span>
          </Link>

          {/* SECURE LOGIN Pill (Blue Glow) - Always accessible */}
          <Link
            to="/login"
            className="inline-flex h-8 items-center gap-1 sm:gap-1.5 rounded-full bg-blue-600 px-2.5 sm:px-3.5 text-[10px] sm:text-[11px] font-bold text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(37,99,235,0.6)]"
          >
            <LogIn className="size-3" />
            <span>LOGIN</span>
          </Link>

          {/* Mobile Sheet Drawer Trigger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-8 rounded-lg md:hidden border-border bg-background hover:bg-muted"
                aria-label="Open mobile menu"
              >
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-[340px] p-0 overflow-y-auto">
              <div className="p-4 border-b bg-muted/40">
                <div className="flex items-center gap-2.5">
                  <div className="size-9 rounded-lg bg-white p-1 shadow-sm border border-border">
                    <img
                      src="/images/Logo.png"
                      alt="Ministry Logo"
                      className="size-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-extrabold text-foreground">SHRAM SATHI</h3>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      MoLE · Govt of India
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="p-4 space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2 px-2">
                  Portal Navigation
                </p>
                {navLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="size-4 text-primary" />
                        <span>{item.label}</span>
                      </span>
                      <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold text-primary">
                        {item.badge}
                      </span>
                    </Link>
                  );
                })}

                <a
                  href="#simulation-section"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  <span className="flex items-center gap-2.5">
                    <Play className="size-4 text-emerald-600" />
                    <span>System Simulation</span>
                  </span>
                  <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700 dark:text-emerald-400">
                    Live Demo
                  </span>
                </a>
              </div>

              {/* Accessibility & Display Controls in Mobile Drawer */}
              <div className="p-4 border-t bg-muted/20 space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Accessibility Suite
                  </p>
                  <span className="text-[9px] font-bold rounded bg-primary/10 px-1.5 py-0.5 text-primary">
                    WCAG 2.1 AA
                  </span>
                </div>

                {/* Text Sizing */}
                <div className="flex items-center justify-between rounded-lg border bg-background p-2 text-xs">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Type className="size-3.5 text-primary" /> Font Size
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="outline"
                      className="size-6 rounded"
                      onClick={() => portal.bumpText(-0.1)}
                    >
                      <Minus className="size-3" />
                    </Button>
                    <span className="w-8 text-center text-xs tabular-nums font-bold">
                      {Math.round(portal.textScale * 100)}%
                    </span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="size-6 rounded"
                      onClick={() => portal.bumpText(0.1)}
                    >
                      <Plus className="size-3" />
                    </Button>
                  </div>
                </div>

                {/* Toggles */}
                <ToolbarToggle
                  icon={portal.darkMode ? <Moon className="size-3.5 text-indigo-400" /> : <Sun className="size-3.5 text-amber-500" />}
                  label="Dark Theme"
                  checked={portal.darkMode}
                  onChange={portal.toggleDarkMode}
                />

                <ToolbarToggle
                  icon={<Contrast className="size-3.5 text-yellow-500" />}
                  label="High Contrast AAA"
                  checked={portal.highContrast}
                  onChange={portal.toggleContrast}
                />

                <ToolbarToggle
                  icon={<Type className="size-3.5 text-blue-500" />}
                  label="Dyslexia Font"
                  checked={portal.dyslexia}
                  onChange={portal.toggleDyslexia}
                />

                <ToolbarToggle
                  icon={<ScanEye className="size-3.5 text-emerald-500" />}
                  label="Focus Spotlight"
                  checked={portal.focusMode}
                  onChange={portal.toggleFocusMode}
                />

                <ToolbarToggle
                  icon={<PauseCircle className="size-3.5 text-rose-500" />}
                  label="Pause Animations"
                  checked={portal.reduceMotion}
                  onChange={portal.toggleReduceMotion}
                />
              </div>

              {/* Helpline Footer */}
              <div className="p-4 border-t text-[11px] text-muted-foreground space-y-1">
                <p>Toll-Free Helpline: <strong className="text-foreground">1800-SHRAM-SATHI</strong></p>
                <p>SMS Status: <strong className="text-foreground">SHRAM &lt;LIN&gt; to 56161</strong></p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* INDRA-Style Red Marquee Live Compliance Feed Banner (Thin & Sleek) */}
      <div className="relative flex h-7 items-center overflow-hidden border-t bg-destructive text-destructive-foreground w-full max-w-full">
        <div className="z-10 flex shrink-0 items-center gap-1.5 bg-destructive px-2 sm:px-3 font-bold text-[9px] sm:text-[10px] tracking-wider uppercase shadow-md">
          <span className="size-1.5 rounded-full bg-white animate-pulse" />
          <span>LIVE ALERT FEED</span>
        </div>

        <div className="flex flex-1 overflow-hidden min-w-0">
          <div className="animate-marquee flex items-center gap-8 whitespace-nowrap text-[11px] font-medium">
            <span className="flex items-center gap-2">
              <span className="font-bold uppercase tracking-wider text-amber-200">ALERT:</span>
              <span>Minimum wage shortfall flagged for 112 workers in Peenya Garment Hub</span>
              <span className="rounded bg-black/30 px-1.5 py-0.2 font-mono text-[9px] text-emerald-200">
                [Confidence: 96%]
              </span>
            </span>
            <span className="text-white/40">•</span>
            <span className="flex items-center gap-2">
              <span className="font-bold uppercase tracking-wider text-amber-200">DGFASLI METRIC:</span>
              <span>National factory inspection coverage at 19.12% - AI Priority Queue Activated</span>
              <span className="rounded bg-black/30 px-1.5 py-0.2 font-mono text-[9px] text-emerald-200">
                [Confidence: 99%]
              </span>
            </span>
            <span className="text-white/40">•</span>
            <span className="flex items-center gap-2">
              <span className="font-bold uppercase tracking-wider text-amber-200">SOCIAL SECURITY:</span>
              <span>42,890 muster rolls verified against Code on Social Security 2020 today</span>
              <span className="rounded bg-black/30 px-1.5 py-0.2 font-mono text-[9px] text-emerald-200">
                [Confidence: 94%]
              </span>
            </span>
            <span className="text-white/40">•</span>
            <span className="flex items-center gap-2">
              <span className="font-bold uppercase tracking-wider text-amber-200">OSH SAFETY:</span>
              <span>Pressure vessel test certification lapsed in Okhla Phase III cluster unit</span>
              <span className="rounded bg-black/30 px-1.5 py-0.2 font-mono text-[9px] text-emerald-200">
                [Confidence: 98%]
              </span>
            </span>
            <span className="text-white/40">•</span>
            <span className="flex items-center gap-2">
              <span className="font-bold uppercase tracking-wider text-amber-200">BOLO SHRAM SATHI:</span>
              <span>18,400+ multilingual speech queries processed via Web Speech &amp; IVR</span>
              <span className="rounded bg-black/30 px-1.5 py-0.2 font-mono text-[9px] text-emerald-200">
                [Confidence: 95%]
              </span>
            </span>
            <span className="text-white/40">•</span>
            <span className="flex items-center gap-2">
              <span className="font-bold uppercase tracking-wider text-amber-200">DPDP ACT 2023:</span>
              <span>AES-256-GCM encryption active across all payroll data at rest</span>
              <span className="rounded bg-black/30 px-1.5 py-0.2 font-mono text-[9px] text-emerald-200">
                [Confidence: 100%]
              </span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

function ToolbarToggle({
  icon,
  label,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="mb-1.5 flex cursor-pointer items-center justify-between rounded-lg border p-2 text-xs">
      <span className="flex items-center gap-1.5">
        {icon}
        {label}
      </span>
      <Switch checked={checked} onCheckedChange={onChange} aria-label={label} />
    </label>
  );
}

export function GovFooter() {
  const { t } = usePortal();
  return (
    <footer className="mt-12 border-t bg-card text-card-foreground">
      <div className="tricolour-bar h-1 w-full" aria-hidden />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white p-1 shadow-xs border border-border/80">
              <img
                src="/images/Logo.png"
                alt="Ministry of Labour & Employment Logo"
                className="size-full object-contain"
              />
            </div>
            <p className="font-display text-base font-bold">{t("portalName")}</p>
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">{t("ministry")}</p>
          <p className="mt-3 text-xs text-muted-foreground leading-relaxed max-w-md">
            AI-Powered, Inclusive Compliance Intelligence Platform created for the Digital Shram Sankalp Ideathon 2026.
            Designed by <strong>Team Vision Buddies</strong> to reverse the statutory inspection deficit across India's 4 Labour Codes.
          </p>
        </div>
        <div className="text-xs space-y-2">
          <p className="font-semibold uppercase tracking-wider text-foreground">National Integrations</p>
          <ul className="space-y-1.5 text-muted-foreground">
            <li>• Shram Suvidha Portal 2.0 (LIN Registry)</li>
            <li>• eShram Unorganised Worker Database</li>
            <li>• EPFO &amp; ESIC Contribution Gateways</li>
            <li>• DGFASLI National Safety Statistics</li>
          </ul>
        </div>
        <div className="text-xs space-y-2">
          <p className="font-semibold uppercase tracking-wider text-foreground">Emergency &amp; Helpline</p>
          <p className="text-muted-foreground">Toll-Free IVR: <strong>1800-SHRAM-SATHI</strong></p>
          <p className="text-muted-foreground">SMS Query: <strong>SHRAM &lt;LIN&gt; to 56161</strong></p>
          <div className="pt-2">
            <Badge variant="outline" className="text-[10px] text-emerald-600 border-emerald-500/30">
              WCAG 2.1 AA Compliant · AES-256
            </Badge>
          </div>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © 2026 Ministry of Labour &amp; Employment, Government of India · Team Vision Buddies
      </div>
    </footer>
  );
}
