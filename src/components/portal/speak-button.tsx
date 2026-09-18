import { Loader2, Volume2, VolumeX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { usePortal } from "@/lib/portal-store";
import { cn } from "@/lib/utils";

export function SpeakButton({
  text,
  label,
  className,
  size = "sm",
}: {
  text: string;
  label?: string;
  className?: string;
  size?: "sm" | "default" | "icon";
}) {
  const { speak, stopSpeaking, speaking, ttsSupported, t } = usePortal();

  if (!ttsSupported) {
    return (
      <span className={cn("inline-flex items-center gap-1 text-xs text-muted-foreground", className)}>
        <VolumeX className="size-3.5" aria-hidden /> Audio unavailable in this browser
      </span>
    );
  }

  return (
    <Button
      type="button"
      size={size}
      variant="outline"
      aria-label={speaking ? "Stop reading aloud" : `Read aloud: ${label ?? t("listen")}`}
      onClick={() => (speaking ? stopSpeaking() : speak(text))}
      className={cn("gap-1.5 border-primary/30 text-primary hover:bg-primary/10", className)}
    >
      {speaking ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Volume2 className="size-4" aria-hidden />}
      <span>{speaking ? "Stop" : (label ?? t("listen"))}</span>
    </Button>
  );
}
