import { supabase } from "@/integrations/supabase/client";

const cache = new Map<string, string>(); // text -> object URL
let currentAudio: HTMLAudioElement | null = null;

function browserFallback(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ar-SA";
  window.speechSynthesis.speak(u);
}

export async function speakArabic(text: string) {
  if (!text) return;
  try {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }

    let url = cache.get(text);
    if (!url) {
      const { data, error } = await supabase.functions.invoke("tts", {
        body: { text },
      });
      if (error) throw error;

      // Edge function returns binary audio; supabase-js gives us a Blob
      const blob =
        data instanceof Blob ? data : new Blob([data as ArrayBuffer], { type: "audio/mpeg" });
      url = URL.createObjectURL(blob);
      cache.set(text, url);
    }

    const audio = new Audio(url);
    currentAudio = audio;
    await audio.play();
  } catch (err) {
    console.error("speakArabic failed, falling back to browser TTS:", err);
    browserFallback(text);
  }
}
