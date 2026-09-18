import { Link } from "@tanstack/react-router";
import {
  Accessibility,
  BadgeCheck,
  ChevronDown,
  Contrast,
  FileSearch,
  Gauge,
  Landmark,
  Languages,
  Mic,
  Minus,
  Plus,
  Presentation,
  RotateCcw,
  ScanEye,
  ShieldCheck,
  Store,
  Type,
  Menu,
} from "lucide-react";
import { useState } from "react";

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
import { LANGUAGES, usePortal } from "@/lib/portal-store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", key: "navOverview", icon: Landmark, emoji: "🏛️" },
  { to: "/documents", key: "navDocs", icon: FileSearch, emoji: "📄" },
  { to: "/scorecard", key: "navScorecard", icon: Gauge, emoji: "📊" },
  { to: "/voice", key: "navVoice", icon: Mic, emoji: "🎙️" },
  { to: "/employer", key: "navEmployer", icon: Store, emoji: "👷" },
  { to: "/inspector", key: "navInspector", icon: ScanEye, emoji: "🔍" },
  { to: "/dpdp", key: "navDpdp", icon: ShieldCheck, emoji: "🛡️" },
  { to: "/pitch", key: "navPitch", icon: Presentation, emoji: "📑" },
] as const;

export function GovHeader() {
  const portal = usePortal();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="tricolour-bar h-1.5 w-full" aria-hidden />
      <div className="border-b bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-1.5 text-[11px] sm:px-6 lg:px-8">
          <p className="font-medium">
            {portal.t("ministry")} · <span className="opacity-80">Digital Shram Sankalp Ideathon 2026</span>
          </p>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1 sm:inline-flex">
              <BadgeCheck className="size-3.5" aria-hidden /> Shram Suvidha Portal 2.0 — integrated
            </span>
            <span className="hidden items-center gap-1 md:inline-flex">
              <ShieldCheck className="size-3.5" aria-hidden /> DPDP Act 2023 compliant
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label={`${portal.t("portalName")} home`}>
          <span
            className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-saffron bg-primary text-lg font-bold text-primary-foreground shadow-sm"
            aria-hidden
          >
            ☸
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-bold tracking-tight sm:text-xl">
              {portal.t("portalName")}
              <span className="ml-2 align-middle text-[10px] font-semibold uppercase tracking-wider text-india-green">
                MoLE · GoI
              </span>
            </span>
            <span className="block text-[11px] text-muted-foreground sm:text-xs">{portal.t("tagline")}</span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Languages className="size-4" aria-hidden />
                <span className="hidden sm:inline">{LANGUAGES.find((l) => l.code === portal.lang)?.label}</span>
                <ChevronDown className="size-3.5" aria-hidden />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>भाषा चुनें · Select language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {LANGUAGES.map((l) => (
                <DropdownMenuItem
                  key={l.code}
                  onSelect={() => portal.setLang(l.code)}
                  className={cn("justify-between", portal.lang === l.code && "font-semibold text-primary")}
                >
                  <span>{l.label}</span>
                  <span className="text-xs text-muted-foreground">{l.english}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Accessibility className="size-4" aria-hidden />
                <span className="hidden sm:inline">Accessibility</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 p-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                PS-06 Accessibility Toolbar
              </p>
              <div className="mb-3 flex items-center justify-between rounded-lg border p-2">
                <span className="flex items-center gap-1.5 text-sm">
                  <Type className="size-4" aria-hidden /> Text size
                </span>
                <span className="flex items-center gap-1">
                  <Button size="icon" variant="ghost" className="size-8" aria-label="Decrease text size" onClick={() => portal.bumpText(-0.1)}>
                    <Minus className="size-4" aria-hidden />
                  </Button>
                  <span className="w-10 text-center text-xs tabular-nums">{Math.round(portal.textScale * 100)}%</span>
                  <Button size="icon" variant="ghost" className="size-8" aria-label="Increase text size" onClick={() => portal.bumpText(0.1)}>
                    <Plus className="size-4" aria-hidden />
                  </Button>
                  <Button size="icon" variant="ghost" className="size-8" aria-label="Reset text size" onClick={portal.resetText}>
                    <RotateCcw className="size-4" aria-hidden />
                  </Button>
                </span>
              </div>
              <ToolbarToggle
                icon={<Contrast className="size-4" aria-hidden />}
                label="High contrast mode"
                checked={portal.highContrast}
                onChange={portal.toggleContrast}
              />
              <ToolbarToggle
                icon={<Type className="size-4" aria-hidden />}
                label="Dyslexia-friendly font"
                checked={portal.dyslexia}
                onChange={portal.toggleDyslexia}
              />
              <ToolbarToggle
                icon={<ScanEye className="size-4" aria-hidden />}
                label="Screen-reader focus mode"
                checked={portal.focusMode}
                onChange={portal.toggleFocusMode}
              />
              <ToolbarToggle
                icon={<Gauge className="size-4" aria-hidden />}
                label="Low-literacy icon mode"
                checked={portal.iconMode}
                onChange={portal.toggleIconMode}
              />
              <ToolbarToggle
                icon={<Mic className="size-4" aria-hidden />}
                label="Voice assistant"
                checked={portal.voiceOn}
                onChange={portal.toggleVoice}
              />
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden min-h-11 min-w-11"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <Menu className="size-5" aria-hidden />
          </Button>
        </div>
      </div>

      <nav aria-label="Portal modules" className="border-t bg-secondary/60">
        <div className="mx-auto hidden max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6 lg:flex lg:px-8">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "border-saffron text-primary bg-surface" }}
              inactiveProps={{ className: "border-transparent text-muted-foreground hover:bg-surface/70" }}
              className="flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors"
            >
              <span aria-hidden>{item.emoji}</span>
              {portal.t(item.key)}
            </Link>
          ))}
        </div>
        {mobileOpen ? (
          <div className="mx-auto grid max-w-7xl gap-1 px-4 py-2 sm:px-6 lg:hidden">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                onClick={() => setMobileOpen(false)}
                activeProps={{ className: "bg-surface text-primary font-semibold" }}
                className="flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm"
              >
                <span aria-hidden>{item.emoji}</span>
                {portal.t(item.key)}
              </Link>
            ))}
          </div>
        ) : null}
      </nav>
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
    <label className="mb-1.5 flex cursor-pointer items-center justify-between rounded-lg border p-2 text-sm">
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
    <footer className="mt-10 border-t bg-primary text-primary-foreground">
      <div className="tricolour-bar h-1.5 w-full" aria-hidden />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-lg font-bold">{t("portalName")}</p>
          <p className="mt-1 text-xs opacity-85">{t("ministry")}</p>
          <p className="mt-3 text-xs opacity-85">
            Prototype submission for the Digital Shram Sankalp Ideathon 2026 · Problem Statements PS-05 & PS-06 · Team{" "}
            <strong>Vision Buddies</strong>.
          </p>
        </div>
        <div className="text-xs">
          <p className="mb-2 font-semibold uppercase tracking-wide opacity-80">Integrations referenced</p>
          <ul className="space-y-1 opacity-85">
            <li>Shram Suvidha Portal 2.0 — unified LIN registry</li>
            <li>eShram — unorganised worker database</li>
            <li>EPFO / ESIC contribution gateways</li>
            <li>DGFASLI inspection statistics</li>
          </ul>
        </div>
        <div className="text-xs">
          <p className="mb-2 font-semibold uppercase tracking-wide opacity-80">Helpline</p>
          <p className="opacity-85">Toll-free IVR: 1800-SHRAM-SATHI (1800-747-262-7284)</p>
          <p className="mt-1 opacity-85">SMS keyword: SHRAM &lt;LIN&gt; to 56161</p>
          <p className="mt-3 opacity-85">
            Accessibility: WCAG 2.1 AA target · AES-256 at rest · TLS 1.3 in transit
          </p>
        </div>
      </div>
    </footer>
  );
}
