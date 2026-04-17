// Browser-only Arabic TTS using the Web Speech API.
// Free, no API key required. Uses the device's built-in Arabic voice.

let arabicVoice: SpeechSynthesisVoice | null = null;

function pickArabicVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  // Prefer any Arabic voice (ar-SA, ar-EG, ar-XA, etc.)
  return voices.find((v) => v.lang?.toLowerCase().startsWith("ar")) ?? null;
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  arabicVoice = pickArabicVoice();
  // Voices often load asynchronously
  window.speechSynthesis.onvoiceschanged = () => {
    arabicVoice = pickArabicVoice();
  };
}

export async function speakArabic(text: string) {
  if (!text) return;
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    console.warn("Speech synthesis not supported in this browser.");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ar-SA";
  utterance.rate = 0.9;
  utterance.pitch = 1;

  const voice = arabicVoice ?? pickArabicVoice();
  if (voice) utterance.voice = voice;

  window.speechSynthesis.speak(utterance);
}
