import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { LANGUAGES, speechLocale, t as translate, type LangCode, type STRINGS } from "./shram-i18n";

type PortalState = {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: (key: keyof typeof STRINGS) => string;
  textScale: number;
  bumpText: (delta: number) => void;
  resetText: () => void;
  highContrast: boolean;
  toggleContrast: () => void;
  dyslexia: boolean;
  toggleDyslexia: () => void;
  focusMode: boolean;
  toggleFocusMode: () => void;
  iconMode: boolean;
  toggleIconMode: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  highlightLinks: boolean;
  toggleHighlightLinks: () => void;
  reduceMotion: boolean;
  toggleReduceMotion: () => void;
  voiceOn: boolean;
  toggleVoice: () => void;
  speak: (text: string) => void;
  stopSpeaking: () => void;
  speaking: boolean;
  ttsSupported: boolean;
};

const PortalContext = createContext<PortalState | null>(null);

export function PortalProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<LangCode>("en");
  const [textScale, setTextScale] = useState(1);
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexia, setDyslexia] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [iconMode, setIconMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [ttsSupported, setTtsSupported] = useState(false);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setTtsSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("shram_theme");
      if (savedTheme === "dark") {
        setDarkMode(true);
      }
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--text-scale", String(textScale));
    root.dataset["contrast"] = highContrast ? "high" : "normal";
    root.dataset["dyslexia"] = dyslexia ? "on" : "off";
    root.dataset["focusMode"] = focusMode ? "on" : "off";
    root.dataset["highlightLinks"] = highlightLinks ? "on" : "off";
    root.dataset["reduceMotion"] = reduceMotion ? "on" : "off";
    root.classList.toggle("dark", darkMode);
    root.lang = lang;
    if (typeof window !== "undefined") {
      localStorage.setItem("shram_theme", darkMode ? "dark" : "light");
    }
  }, [textScale, highContrast, dyslexia, focusMode, highlightLinks, reduceMotion, darkMode, lang]);

  const stopSpeaking = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = speechLocale(lang);
      utter.rate = 0.95;
      const voices = window.speechSynthesis.getVoices();
      const match = voices.find((v) => v.lang?.toLowerCase() === utter.lang.toLowerCase());
      const loose = voices.find((v) => v.lang?.toLowerCase().startsWith(lang));
      if (match ?? loose) utter.voice = (match ?? loose) as SpeechSynthesisVoice;
      utter.onend = () => setSpeaking(false);
      utter.onerror = () => setSpeaking(false);
      utterRef.current = utter;
      setSpeaking(true);
      window.speechSynthesis.speak(utter);
    },
    [lang],
  );

  useEffect(() => () => stopSpeaking(), [stopSpeaking]);

  const value = useMemo<PortalState>(
    () => ({
      lang,
      setLang,
      t: (key) => translate(key, lang),
      textScale,
      bumpText: (delta) => setTextScale((s) => Math.min(1.5, Math.max(0.85, Math.round((s + delta) * 100) / 100))),
      resetText: () => setTextScale(1),
      highContrast,
      toggleContrast: () => setHighContrast((v) => !v),
      dyslexia,
      toggleDyslexia: () => setDyslexia((v) => !v),
      focusMode,
      toggleFocusMode: () => setFocusMode((v) => !v),
      iconMode,
      toggleIconMode: () => setIconMode((v) => !v),
      darkMode,
      toggleDarkMode: () => setDarkMode((v) => !v),
      highlightLinks,
      toggleHighlightLinks: () => setHighlightLinks((v) => !v),
      reduceMotion,
      toggleReduceMotion: () => setReduceMotion((v) => !v),
      voiceOn,
      toggleVoice: () => setVoiceOn((v) => !v),
      speak,
      stopSpeaking,
      speaking,
      ttsSupported,
    }),
    [
      lang,
      textScale,
      highContrast,
      dyslexia,
      focusMode,
      iconMode,
      darkMode,
      highlightLinks,
      reduceMotion,
      voiceOn,
      speak,
      stopSpeaking,
      speaking,
      ttsSupported,
    ],
  );

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>;
}

export function usePortal() {
  const ctx = useContext(PortalContext);
  if (!ctx) throw new Error("usePortal must be used inside PortalProvider");
  return ctx;
}

export { LANGUAGES };

/* ---------- Speech recognition (STT) ---------- */

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((e: unknown) => void) | null;
  onend: (() => void) | null;
};

export function useSpeechRecognition(lang: LangCode) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    const w = window as unknown as Record<string, unknown>;
    setSupported(Boolean(w["SpeechRecognition"] ?? w["webkitSpeechRecognition"]));
  }, []);

  const start = useCallback(() => {
    const w = window as unknown as Record<string, unknown>;
    const Ctor = (w["SpeechRecognition"] ?? w["webkitSpeechRecognition"]) as
      | (new () => SpeechRecognitionLike)
      | undefined;
    if (!Ctor) return false;
    const rec = new Ctor();
    rec.lang = speechLocale(lang);
    rec.continuous = false;
    rec.interimResults = true;
    rec.onresult = (e) => {
      let text = "";
      for (let i = 0; i < e.results.length; i++) {
        const alt = e.results[i]?.[0];
        if (alt) text += alt.transcript;
      }
      setTranscript(text.trim());
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recRef.current = rec;
    setTranscript("");
    setListening(true);
    rec.start();
    return true;
  }, [lang]);

  const stop = useCallback(() => {
    recRef.current?.stop();
    setListening(false);
  }, []);

  return { supported, listening, transcript, start, stop, setTranscript };
}
