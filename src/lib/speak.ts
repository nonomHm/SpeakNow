// Browser-only English TTS using the Web Speech API.
// Free, no API key required. Uses the device's built-in English voice.

let englishVoice: SpeechSynthesisVoice | null = null;

function pickEnglishVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  return voices.find((v) => v.lang?.toLowerCase().startsWith("en")) ?? null;
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  englishVoice = pickEnglishVoice();
  window.speechSynthesis.onvoiceschanged = () => {
    englishVoice = pickEnglishVoice();
  };
}

export async function speakEnglish(text: string) {
  if (!text) return;
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    console.warn("Speech synthesis not supported in this browser.");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 1;
  utterance.pitch = 1;

  const voice = englishVoice ?? pickEnglishVoice();
  if (voice) utterance.voice = voice;

  window.speechSynthesis.speak(utterance);
}

// Backwards-compatible alias (was Arabic before)
export const speakArabic = speakEnglish;
