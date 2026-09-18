import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  titleHi,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  titleHi?: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <section className="gov-gradient border-b">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="animate-rise text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div className="animate-rise max-w-3xl">
            <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl">{title}</h1>
            {titleHi ? <p className="mt-1 text-lg font-medium text-primary/80">{titleHi}</p> : null}
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{description}</p>
          </div>
          {actions ? <div className="animate-rise flex flex-wrap items-center gap-2">{actions}</div> : null}
        </div>
      </div>
    </section>
  );
}

export function Section({
  title,
  subtitle,
  children,
  className,
  id,
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8", className)}>
      {title ? (
        <div className="mb-5">
          <h2 className="font-display text-xl font-bold sm:text-2xl">{title}</h2>
          {subtitle ? <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{subtitle}</p> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function StatCard({
  label,
  value,
  hint,
  accent = "primary",
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: "primary" | "saffron" | "green" | "red";
}) {
  const colors: Record<string, string> = {
    primary: "var(--primary)",
    saffron: "var(--saffron)",
    green: "var(--india-green)",
    red: "var(--risk-high)",
  };
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-2xl font-bold tabular-nums" style={{ color: colors[accent] }}>
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
