import { BAND_META, bandOf } from "@/lib/shram-data";
import { usePortal } from "@/lib/portal-store";
import { cn } from "@/lib/utils";

export function RiskGauge({ score, size = 190 }: { score: number; size?: number }) {
  const band = bandOf(score);
  const meta = BAND_META[band];
  const { lang } = usePortal();
  const radius = size / 2 - 16;
  const circumference = Math.PI * radius;
  const offset = circumference * (1 - score / 100);

  return (
    <div className="flex flex-col items-center" role="img" aria-label={`Compliance score ${score} out of 100, ${meta.label}`}>
      <svg width={size} height={size / 1.75} viewBox={`0 0 ${size} ${size / 1.75}`} aria-hidden>
        <path
          d={`M 16 ${size / 2 - 8} A ${radius} ${radius} 0 0 1 ${size - 16} ${size / 2 - 8}`}
          fill="none"
          stroke="var(--muted)"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path
          d={`M 16 ${size / 2 - 8} A ${radius} ${radius} 0 0 1 ${size - 16} ${size / 2 - 8}`}
          fill="none"
          stroke={meta.color}
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 900ms cubic-bezier(.2,.8,.2,1), stroke 300ms" }}
        />
      </svg>
      <div className="-mt-8 text-center">
        <div className="font-display text-4xl font-bold tabular-nums" style={{ color: meta.color }}>
          {score}
          <span className="text-lg text-muted-foreground">/100</span>
        </div>
        <div
          className={cn("mt-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold")}
          style={{ backgroundColor: `color-mix(in oklab, ${meta.color} 18%, transparent)`, color: meta.color }}
        >
          <span aria-hidden>{meta.emoji}</span>
          {lang === "hi" ? meta.labelHi : meta.label}
        </div>
      </div>
    </div>
  );
}

export function RiskPill({ score }: { score: number }) {
  const band = bandOf(score);
  const meta = BAND_META[band];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold"
      style={{ backgroundColor: `color-mix(in oklab, ${meta.color} 16%, transparent)`, color: meta.color }}
    >
      <span aria-hidden>{meta.emoji}</span>
      {meta.label} · {score}
    </span>
  );
}
