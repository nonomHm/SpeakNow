// Arabic text-to-speech using the Web Speech API (no backend required).
let cachedVoice: SpeechSynthesisVoice | null = null;

function pickArabicVoice(): SpeechSynthesisVoice | null {
  if (cachedVoice) return cachedVoice;
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  const arabic = voices.find((v) => v.lang?.toLowerCase().startsWith("ar"));
  cachedVoice = arabic ?? null;
  return cachedVoice;
}

// Warm up voices (some browsers load them async)
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoice = null;
    pickArabicVoice();
  };
}

export function speakArabic(text: string) {
  if (!text) return;
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    console.warn("Speech synthesis not supported");
    return;
  }
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ar-SA";
  utter.rate = 0.95;
  utter.pitch = 1;
  const voice = pickArabicVoice();
  if (voice) utter.voice = voice;
  window.speechSynthesis.speak(utter);
}
