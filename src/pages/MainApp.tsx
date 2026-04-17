import { useState } from "react";
import { speakEnglish } from "@/lib/speak";

const MainApp = () => {
  const [sentence, setSentence] = useState<string[]>(["I want"]);

  // Add a word to the sentence and speak the running phrase
  const addWord = (word: string) => {
    const next = [...sentence, word];
    setSentence(next);
    speakEnglish(next.join(" "));
  };

  // Speak a standalone word/phrase without modifying the sentence
  const speakOnly = (text: string) => {
    speakEnglish(text);
  };

  const speakSentence = () => {
    if (sentence.length) speakEnglish(sentence.join(" "));
  };

  const backspace = () => {
    setSentence((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const tile = (
    word: string,
    icon: string,
    bg: string,
    fg: string,
    onClick: () => void,
    iconColor?: string,
    fill = true,
  ) => (
    <button
      key={word}
      onClick={onClick}
      className={`${bg} ${fg} p-6 rounded-[2rem] flex flex-col items-center justify-center gap-3 text-center transition-all duration-300 hover:brightness-105 active:scale-95`}
    >
      <span
        className={`material-symbols-outlined text-5xl ${iconColor ?? ""} ${fill ? "icon-fill" : ""}`}
      >
        {icon}
      </span>
      <span className="text-2xl font-bold">{word}</span>
    </button>
  );

  return (
    <div lang="en" className="bg-surface text-on-surface min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="bg-surface/80 backdrop-blur-3xl fixed top-0 w-full z-50">
        <div className="flex items-center justify-between px-6 py-4 w-full">
          <button className="hover:bg-surface-container-highest rounded-full p-2 transition active:scale-95">
            <span className="material-symbols-outlined text-primary text-3xl">account_circle</span>
          </button>
          <h1 className="font-headline font-bold text-2xl tracking-tight text-primary">SpeakNow</h1>
          <button className="hover:bg-surface-container-highest rounded-full p-2 transition active:scale-95">
            <span className="material-symbols-outlined text-primary text-3xl">settings</span>
          </button>
        </div>
      </header>

      <main className="flex-grow pt-24 pb-32 px-6">
        {/* Sentence builder */}
        <div className="mb-10 max-w-4xl mx-auto">
          <div className="bg-surface-container-highest rounded-3xl p-6 min-h-[120px] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-container/10 to-transparent opacity-50" />
            <div className="flex flex-wrap gap-3 items-center justify-center relative z-10 pr-20">
              {sentence.map((w, i) => (
                <span
                  key={`${w}-${i}`}
                  className="bg-primary text-on-primary px-5 py-2 rounded-2xl shadow-md text-2xl font-bold"
                >
                  {w}
                </span>
              ))}
              {sentence.length === 1 && (
                <span className="text-on-surface-variant font-medium text-3xl animate-pulse">...</span>
              )}
            </div>
            <button
              onClick={speakSentence}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-secondary text-on-secondary p-4 rounded-full shadow-lg active:scale-90 transition-transform"
              aria-label="Speak sentence"
            >
              <span className="material-symbols-outlined icon-fill text-3xl">volume_up</span>
            </button>
          </div>
        </div>

        {/* Communication grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Primary intent */}
          <div className="col-span-2 row-span-1">
            <button
              onClick={() => speakOnly("I want")}
              className="w-full h-full bg-primary-container text-on-primary-container p-8 rounded-[2rem] flex items-center gap-6 text-left transition-all duration-300 hover:brightness-110 active:scale-95 shadow-md"
            >
              <div className="bg-white/20 p-5 rounded-3xl">
                <span className="material-symbols-outlined icon-fill text-6xl">front_hand</span>
              </div>
              <div>
                <p className="text-on-primary-container/70 text-lg font-medium mb-1">Verb</p>
                <h2 className="text-4xl font-extrabold">I want</h2>
              </div>
            </button>
          </div>

          {/* Yes / No: speak directly, do NOT append to sentence */}
          {tile("Yes", "check_circle", "bg-secondary-container", "text-on-secondary-container", () => speakOnly("Yes"), "text-secondary")}
          {tile("No", "cancel", "bg-error-container", "text-on-error-container", () => speakOnly("No"), "text-destructive")}

          {/* Food / Water: append, then speaks "I want Food" / "I want Water" */}
          <button
            onClick={() => addWord("Food")}
            className="bg-surface-container-low text-on-surface p-8 rounded-[2rem] flex flex-col items-start gap-4 transition-all duration-300 hover:bg-surface-container-high active:scale-95"
          >
            <div className="bg-tertiary-container/40 p-4 rounded-2xl">
              <span className="material-symbols-outlined text-5xl text-tertiary">restaurant</span>
            </div>
            <span className="text-2xl font-bold">Food</span>
          </button>
          <button
            onClick={() => addWord("Water")}
            className="bg-surface-container-low text-on-surface p-8 rounded-[2rem] flex flex-col items-start gap-4 transition-all duration-300 hover:bg-surface-container-high active:scale-95"
          >
            <div className="bg-primary-fixed p-4 rounded-2xl">
              <span className="material-symbols-outlined text-5xl text-primary">water_drop</span>
            </div>
            <span className="text-2xl font-bold">Water</span>
          </button>

          <div className="col-span-2">
            <button
              onClick={() => speakOnly("I need help")}
              className="w-full bg-tertiary-container text-on-tertiary-container p-8 rounded-[2rem] flex items-center justify-between transition-all duration-300 hover:brightness-110 active:scale-95 border-4 border-tertiary/20"
            >
              <div className="flex items-center gap-6">
                <span className="material-symbols-outlined text-6xl">sos</span>
                <span className="text-4xl font-extrabold">Help</span>
              </div>
              <span className="material-symbols-outlined text-4xl opacity-50">priority_high</span>
            </button>
          </div>

          {tile("Good", "mood", "bg-surface-container-low", "text-on-surface", () => speakOnly("I feel good"), "", false)}
          {tile("Pain", "sentiment_very_dissatisfied", "bg-surface-container-low", "text-on-surface", () => speakOnly("I have pain"), "", false)}
        </div>
      </main>

      {/* Bottom nav */}
      <nav className="bg-surface/80 backdrop-blur-3xl fixed bottom-0 left-0 w-full h-24 flex justify-around items-center px-4 pb-4 z-50 border-t border-outline-variant/30 shadow-[0_-4px_32px_hsl(var(--on-surface)/0.06)]">
        <button className="flex flex-col items-center justify-center bg-primary text-on-primary rounded-2xl px-6 py-2 transition-all duration-300 scale-105">
          <span className="material-symbols-outlined icon-fill">record_voice_over</span>
          <span className="font-headline font-medium text-sm">Speak</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface-variant px-6 py-2 hover:bg-surface-container-highest rounded-xl transition">
          <span className="material-symbols-outlined">grid_view</span>
          <span className="font-headline font-medium text-sm">Categories</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface-variant px-6 py-2 hover:bg-surface-container-highest rounded-xl transition">
          <span className="material-symbols-outlined">history</span>
          <span className="font-headline font-medium text-sm">History</span>
        </button>
        <button
          onClick={speakSentence}
          className="flex flex-col items-center justify-center text-on-surface-variant px-6 py-2 hover:bg-surface-container-highest rounded-xl transition"
        >
          <span className="material-symbols-outlined">volume_up</span>
          <span className="font-headline font-medium text-sm">Voice</span>
        </button>
      </nav>

      {/* FAB - backspace */}
      <div className="fixed bottom-28 left-6 z-40">
        <button
          onClick={backspace}
          className="bg-surface-container-highest text-on-surface-variant p-5 rounded-2xl shadow-xl active:scale-90 transition"
          aria-label="Delete last word"
        >
          <span className="material-symbols-outlined text-3xl">backspace</span>
        </button>
      </div>
    </div>
  );
};

export default MainApp;
