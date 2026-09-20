import { createFileRoute } from "@tanstack/react-router";
import { Mic, MicOff, Phone, PhoneOff, Send, Smartphone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PageHero, Section } from "@/components/portal/page-shell";
import { SpeakButton } from "@/components/portal/speak-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePortal, useSpeechRecognition } from "@/lib/portal-store";
import { ESTABLISHMENTS, IVR_TREE, SMS_SCRIPTS } from "@/lib/shram-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/voice")({
  head: () => ({
    meta: [
      { title: "Inclusive Voice & Low-Tech Suite (PS-06) - SHRAM SATHI" },
      {
        name: "description",
        content:
          "Bolo Shram Sathi: real speech synthesis and speech recognition in eight Indian languages, plus SMS alert and IVR keypad simulators for feature-phone users.",
      },
      { property: "og:title", content: "Bolo Shram Sathi - Inclusive Voice & Low-Tech Suite" },
      {
        property: "og:description",
        content: "Voice-first, SMS and IVR access to labour compliance status for low-literacy and low-connectivity users.",
      },
    ],
  }),
  component: VoicePage,
});

const est = ESTABLISHMENTS[0]!;

function answerFor(q: string, lang: string) {
  const s = q.toLowerCase();
  if (/safety|osh|सुरक्षा/.test(s))
    return lang === "hi"
      ? "सुरक्षा संबंधी एक गंभीर फ्लैग है: दबाव पात्र का प्रमाणपत्र 11 जनवरी 2026 को समाप्त हो गया और 9 श्रमिकों के पीपीई रिकॉर्ड नहीं हैं।"
      : "There is one critical safety flag: the pressure vessel certificate expired on 11 January 2026 and nine workers lack PPE issuance records.";
  if (/wage|salary|मजदूरी|वेतन/.test(s))
    return lang === "hi"
      ? "आपकी दैनिक मजदूरी ₹380 है जो अधिसूचित न्यूनतम ₹440 से कम है। 112 श्रमिकों का ₹2,01,600 बकाया 15 दिनों में दें।"
      : "Your daily wage of 380 rupees is below the notified minimum of 440 rupees. Pay arrears of 2 lakh 1 thousand 600 rupees for 112 workers within 15 days.";
  if (/epf|esi|pf|भविष्य/.test(s))
    return lang === "hi"
      ? "ईपीएफ का ईसीआर 24 तारीख को दाखिल हुआ, जो 15 तारीख की समय-सीमा के बाद है। ₹31,450 ब्याज सहित जमा करें।"
      : "Your EPF electronic challan was filed on the 24th, past the 15th deadline. Remit 31,450 rupees with interest.";
  if (/inspect|निरीक्षण/.test(s))
    return lang === "hi"
      ? "आपका अंतिम निरीक्षण 14 अगस्त 2024 को हुआ था। उच्च जोखिम के कारण आप प्राथमिकता सूची में हैं।"
      : "Your last inspection was on 14 August 2024. Because your risk is high, you are on the priority facilitation queue.";
  return lang === "hi"
    ? `आपका अनुपालन स्कोर ${est.score} में से 100 है, जोखिम उच्च है, और तीन वैधानिक समस्याएँ लंबित हैं।`
    : `Your compliance score is ${est.score} out of 100, the risk level is high, and three statutory issues are open.`;
}

function VoicePage() {
  const { lang, speak, t } = usePortal();
  const stt = useSpeechRecognition(lang);
  const [typed, setTyped] = useState("");
  const [log, setLog] = useState<{ role: "user" | "sathi"; text: string }[]>([]);
  const [smsStep, setSmsStep] = useState(0);
  const [ivrNode, setIvrNode] = useState<string | null>(null);

  const script = SMS_SCRIPTS[lang === "hi" ? "hi" : "en"]!;
  const node = ivrNode ? IVR_TREE[ivrNode] : null;

  const ask = (question: string) => {
    if (!question.trim()) return;
    const reply = answerFor(question, lang);
    setLog((l) => [...l, { role: "user", text: question }, { role: "sathi", text: reply }]);
    speak(reply);
    setTyped("");
    stt.setTranscript("");
  };

  const dial = () => {
    setIvrNode("root");
    speak(lang === "hi" ? IVR_TREE["root"]!.promptHi : IVR_TREE["root"]!.prompt);
    toast.success("Call connected", { description: "1800-SHRAM-SATHI · toll-free, 24x7, 8 languages" });
  };

  const press = (key: string) => {
    const next = node?.options.find((o) => o.key === key)?.next;
    if (!next) return;
    const target = IVR_TREE[next];
    if (!target) return;
    setIvrNode(next);
    speak(lang === "hi" ? target.promptHi : target.prompt);
  };

  return (
    <>
      <PageHero
        eyebrow="PS-06 · Module 4 · Core accessibility layer"
        title="Bolo Shram Sathi - Inclusive Voice & Low-Tech Suite"
        titleHi="बोलो श्रम साथी - समावेशी वाणी एवं लो-टेक सुविधा"
        description="Real browser speech synthesis and speech recognition, not a mock-up. Ask about your compliance status in Hindi or English, hear findings read aloud, and reach the same intelligence over SMS and IVR on a ₹800 feature phone."
      />

      <Section>
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t("askSathi")}</CardTitle>
              <CardDescription>
                Try: “Mera compliance score kya hai?” · “What are my safety flags?” · “EPF late filing?”
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  onClick={() => {
                    if (stt.listening) {
                      stt.stop();
                      if (stt.transcript) ask(stt.transcript);
                      return;
                    }
                    const ok = stt.start();
                    if (!ok) toast.error("Speech recognition unavailable", { description: "Use Chrome or Edge, or type the question below." });
                  }}
                  className={cn("gap-1.5 min-h-11", stt.listening && "bg-risk-high text-white hover:bg-risk-high/90")}
                  aria-label={stt.listening ? "Stop listening and send" : "Start voice question"}
                >
                  {stt.listening ? <MicOff className="size-4" aria-hidden /> : <Mic className="size-4" aria-hidden />}
                  {stt.listening ? "Listening… tap to send" : "Speak your question"}
                </Button>
                <Badge variant="outline">{stt.supported ? "Speech recognition ready" : "Typing fallback active"}</Badge>
              </div>
              {stt.transcript ? <p className="rounded-lg bg-secondary p-2 text-sm italic">“{stt.transcript}”</p> : null}
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  ask(typed);
                }}
              >
                <Input value={typed} onChange={(e) => setTyped(e.target.value)} placeholder="Type your question" aria-label="Type your question" />
                <Button type="submit" size="icon" className="min-h-11 min-w-11" aria-label="Send question">
                  <Send className="size-4" aria-hidden />
                </Button>
              </form>
              <div className="max-h-72 space-y-2 overflow-y-auto" aria-live="polite">
                {log.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Answers are spoken aloud in the selected portal language and shown here as text for deaf and hard-of-hearing users.
                  </p>
                ) : null}
                {log.map((m, i) => (
                  <div
                    key={i}
                    className={cn(
                      "animate-rise rounded-lg p-3 text-sm",
                      m.role === "user" ? "ml-8 bg-primary text-primary-foreground" : "mr-8 border bg-card",
                    )}
                  >
                    {m.text}
                    {m.role === "sathi" ? <SpeakButton className="mt-2" text={m.text} /> : null}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Smartphone className="size-4 text-primary" aria-hidden /> SMS alerts on a feature phone
              </CardTitle>
              <CardDescription>Automated advisories sent to employers and workers without smartphones or data.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mx-auto w-full max-w-xs rounded-[2rem] border-8 border-primary bg-background p-3 shadow-lg">
                <div className="mb-2 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>Airtel 2G</span>
                  <span>SHRAM SATHI</span>
                  <span>96%</span>
                </div>
                <div className="min-h-64 space-y-2">
                  {script.slice(0, smsStep).map((m, i) => (
                    <div
                      key={i}
                      className={cn(
                        "animate-rise rounded-lg p-2 text-[11px] leading-snug",
                        m.from === "You" || m.from === "आप"
                          ? "ml-6 bg-india-green text-india-green-foreground"
                          : "mr-4 bg-secondary",
                      )}
                    >
                      <p className="mb-0.5 font-semibold opacity-80">{m.from}</p>
                      {m.body}
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => setSmsStep((s) => Math.min(script.length, s + 1))}
                    disabled={smsStep >= script.length}
                  >
                    {smsStep === 0 ? "Send alert" : smsStep >= script.length ? "Thread complete" : "Next message"}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setSmsStep(0)}>
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section
        title="IVR simulator - 1800-SHRAM-SATHI"
        subtitle="Call, hear the prompt spoken aloud in your language, and press keypad numbers exactly as a worker would on a landline."
      >
        <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center font-display text-lg font-bold">1800-SHRAM-SATHI</p>
              <p className="mb-4 text-center text-xs text-muted-foreground">1800-747-262-7284 · toll-free</p>
              <div className="grid grid-cols-3 gap-2">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((k) => {
                  const active = Boolean(node?.options.some((o) => o.key === k));
                  return (
                    <button
                      key={k}
                      onClick={() => press(k)}
                      disabled={!node}
                      aria-label={`Press ${k}`}
                      className={cn(
                        "min-h-12 rounded-lg border text-lg font-semibold transition-all",
                        active ? "border-india-green bg-india-green/15 text-india-green" : "bg-secondary",
                        !node && "opacity-50",
                      )}
                    >
                      {k}
                    </button>
                  );
                })}
              </div>
              <div className="mt-4">
                {ivrNode ? (
                  <Button
                    variant="destructive"
                    className="w-full gap-1.5"
                    onClick={() => {
                      setIvrNode(null);
                      toast.info("Call ended", { description: "Duration 00:42 · recording encrypted (AES-256)" });
                    }}
                  >
                    <PhoneOff className="size-4" aria-hidden /> End call
                  </Button>
                ) : (
                  <Button className="w-full gap-1.5 bg-india-green text-india-green-foreground hover:bg-india-green/90" onClick={dial}>
                    <Phone className="size-4" aria-hidden /> Call now
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Live call transcript</CardTitle>
              <CardDescription>Prompts play through the browser's speech engine in the selected language.</CardDescription>
            </CardHeader>
            <CardContent>
              {node ? (
                <>
                  <p className="rounded-lg border-l-4 border-l-saffron bg-secondary p-3 text-sm">
                    {lang === "hi" ? node.promptHi : node.prompt}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {node.options.map((o) => (
                      <li key={o.key}>
                        <button
                          onClick={() => press(o.key)}
                          className="flex w-full min-h-11 items-center gap-3 rounded-lg border px-3 text-left text-sm transition-colors hover:bg-secondary"
                        >
                          <span className="grid size-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                            {o.key}
                          </span>
                          {lang === "hi" ? o.labelHi : o.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <SpeakButton className="mt-3" text={lang === "hi" ? node.promptHi : node.prompt} label="Replay prompt" />
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Press <strong>Call now</strong> to begin. The IVR mirrors the exact findings shown in the scorecard, so a
                  worker with no smartphone gets identical information.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}
