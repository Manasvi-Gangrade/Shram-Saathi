import { Link } from "@tanstack/react-router";
import {
  Accessibility,
  ChevronDown,
  Clock,
  CloudSun,
  Contrast,
  Languages,
  LogIn,
  MapPin,
  Mic,
  Minus,
  Play,
  Plus,
  RotateCcw,
  ScanEye,
  Type,
  Volume2,
  VolumeX,
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
import { Switch } from "@/components/ui/switch";
import { GoogleTranslateWidget, useTTS } from "@/components/portal/translate-tts";
import { LANGUAGES, usePortal } from "@/lib/portal-store";
import { cn } from "@/lib/utils";

export function GovHeader() {
  const portal = usePortal();
  const { ttsEnabled, setTtsEnabled } = useTTS();
  const [timeStr, setTimeStr] = useState("08:42:15 pm");
  const [soundEnabled, setSoundEnabled] = useState(true);

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

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85 shadow-xs">
      {/* Tricolour Accent Line */}
      <div className="tricolour-bar h-1 w-full" aria-hidden />

      {/* Unified, Sleek Main Header (Zero Clutter) */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        {/* Left: Branding & Compact Live Status */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3 group" aria-label="Shram Sathi Home">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white p-1 shadow-sm border border-border/80 transition-transform group-hover:scale-105">
              <img
                src="/images/Logo.png"
                alt="Ministry of Labour & Employment Logo"
                className="size-full object-contain"
              />
              <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-background bg-emerald-500 animate-pulse" />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-base sm:text-lg font-extrabold tracking-tight text-foreground">
                  SHRAM SATHI
                </span>
                <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  MoLE · GoI
                </span>
              </div>
              <p className="hidden md:block text-[10px] text-muted-foreground">
                AI Compliance Intelligence Portal
              </p>
            </div>
          </Link>

          {/* Compact Telemetry Pill */}
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
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Google Translate Dropdown */}
          <GoogleTranslateWidget />

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
              "h-8 gap-1.5 rounded-full px-2.5 text-xs transition-all",
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

          {/* Accessibility Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1 rounded-full px-2.5 text-xs bg-background hidden md:inline-flex">
                <Accessibility className="size-3.5 text-saffron" />
                <span className="hidden lg:inline">Accessibility</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 p-3 text-xs">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                PS-06 Accessibility Options
              </p>
              <div className="mb-3 flex items-center justify-between rounded-lg border p-2">
                <span className="flex items-center gap-1.5 text-xs font-medium">
                  <Type className="size-3.5" /> Text Size
                </span>
                <span className="flex items-center gap-1">
                  <Button size="icon" variant="ghost" className="size-6" onClick={() => portal.bumpText(-0.1)}>
                    <Minus className="size-3" />
                  </Button>
                  <span className="w-8 text-center text-xs tabular-nums font-bold">
                    {Math.round(portal.textScale * 100)}%
                  </span>
                  <Button size="icon" variant="ghost" className="size-6" onClick={() => portal.bumpText(0.1)}>
                    <Plus className="size-3" />
                  </Button>
                  <Button size="icon" variant="ghost" className="size-6" onClick={portal.resetText}>
                    <RotateCcw className="size-3" />
                  </Button>
                </span>
              </div>
              <ToolbarToggle
                icon={<Contrast className="size-3.5" />}
                label="High Contrast"
                checked={portal.highContrast}
                onChange={portal.toggleContrast}
              />
              <ToolbarToggle
                icon={<Type className="size-3.5" />}
                label="Dyslexia Font"
                checked={portal.dyslexia}
                onChange={portal.toggleDyslexia}
              />
              <ToolbarToggle
                icon={<ScanEye className="size-3.5" />}
                label="Focus Mode"
                checked={portal.focusMode}
                onChange={portal.toggleFocusMode}
              />
            </DropdownMenuContent>
          </DropdownMenu>

          {/* SIMULATION Pill (INDRA Style) */}
          <a
            href="#simulation-section"
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-slate-300 dark:border-slate-700 bg-background px-3 text-[11px] font-bold text-foreground shadow-xs transition-all hover:bg-muted"
          >
            <Play className="size-2.5 fill-primary text-primary" />
            <span>SIMULATION</span>
          </a>

          {/* LIN REGISTRY Pill (Emerald Glow) */}
          <Link
            to="/scorecard"
            className="hidden sm:inline-flex h-8 items-center gap-1 rounded-full bg-emerald-600 px-3.5 text-[11px] font-bold text-white shadow-[0_0_15px_rgba(16,185,129,0.35)] transition-all hover:bg-emerald-700 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]"
          >
            <span>LIN REGISTRY</span>
          </Link>

          {/* INSPECTOR LOGIN Pill (Blue Glow) */}
          <Link
            to="/inspector"
            className="inline-flex h-8 items-center gap-1 rounded-full bg-blue-600 px-3.5 text-[11px] font-bold text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(37,99,235,0.6)]"
          >
            <LogIn className="size-3" />
            <span className="hidden sm:inline">INSPECTOR</span>
            <span>LOGIN</span>
          </Link>
        </div>
      </div>

      {/* INDRA-Style Red Marquee Live Compliance Feed Banner (Thin & Sleek) */}
      <div className="relative flex h-7 items-center overflow-hidden border-t bg-destructive text-destructive-foreground">
        <div className="z-10 flex shrink-0 items-center gap-1.5 bg-destructive px-3 font-bold text-[10px] tracking-wider uppercase shadow-md">
          <span className="size-1.5 rounded-full bg-white animate-pulse" />
          <span>LIVE ALERT FEED</span>
        </div>

        <div className="flex flex-1 overflow-hidden">
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
