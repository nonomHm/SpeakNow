import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { speakEnglish } from "@/lib/speak";

type Word = { label: string; icon: string; color: string };
type Category = { id: string; name: string; words: Word[] };

const CATEGORIES: Category[] = [
  {
    id: "basics",
    name: "Basics",
    words: [
      { label: "Water", icon: "water_drop", color: "text-primary" },
      { label: "Sleep", icon: "bed", color: "text-tertiary" },
      { label: "Home", icon: "home", color: "text-secondary" },
      { label: "Bread", icon: "bakery_dining", color: "text-tertiary" },
      { label: "Help", icon: "sos", color: "text-primary" },
      { label: "Doctor", icon: "medical_services", color: "text-destructive" },
    ],
  },
  {
    id: "food",
    name: "Food",
    words: [
      { label: "Apple", icon: "nutrition", color: "text-destructive" },
      { label: "Bread", icon: "bakery_dining", color: "text-tertiary" },
      { label: "Rice", icon: "rice_bowl", color: "text-secondary" },
      { label: "Milk", icon: "local_drink", color: "text-primary" },
      { label: "Coffee", icon: "coffee", color: "text-tertiary" },
      { label: "Meat", icon: "kebab_dining", color: "text-destructive" },
    ],
  },
  {
    id: "feelings",
    name: "Feelings",
    words: [
      { label: "Happy", icon: "mood", color: "text-secondary" },
      { label: "Sad", icon: "sentiment_dissatisfied", color: "text-primary" },
      { label: "Tired", icon: "bedtime", color: "text-tertiary" },
      { label: "Pain", icon: "sentiment_very_dissatisfied", color: "text-destructive" },
      { label: "Cold", icon: "ac_unit", color: "text-primary" },
      { label: "Hot", icon: "local_fire_department", color: "text-destructive" },
    ],
  },
  {
    id: "places",
    name: "Places",
    words: [
      { label: "Home", icon: "home", color: "text-primary" },
      { label: "Hospital", icon: "local_hospital", color: "text-destructive" },
      { label: "School", icon: "school", color: "text-secondary" },
      { label: "Bathroom", icon: "bathtub", color: "text-primary" },
      { label: "Outside", icon: "park", color: "text-secondary" },
      { label: "Bedroom", icon: "king_bed", color: "text-tertiary" },
    ],
  },
  {
    id: "actions",
    name: "Actions",
    words: [
      { label: "Eat", icon: "restaurant", color: "text-tertiary" },
      { label: "Drink", icon: "local_drink", color: "text-primary" },
      { label: "Sleep", icon: "bed", color: "text-tertiary" },
      { label: "Walk", icon: "directions_walk", color: "text-secondary" },
      { label: "Read", icon: "menu_book", color: "text-primary" },
      { label: "Play", icon: "sports_esports", color: "text-secondary" },
    ],
  },
];

const Categories = () => {
  const navigate = useNavigate();
  const [activeCat, setActiveCat] = useState<string>("basics");
  const [sentence, setSentence] = useState<string[]>(["I want"]);

  const current = CATEGORIES.find((c) => c.id === activeCat) ?? CATEGORIES[0];

  const addWord = (word: string) => {
    const next = [...sentence, word];
    setSentence(next);
    speakEnglish(next.join(" "));
  };

  const speakSentence = () => {
    if (sentence.length) speakEnglish(sentence.join(" "));
  };

  const backspace = () => {
    setSentence((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  return (
    <div lang="en" className="bg-surface text-on-surface min-h-screen pb-32">
      {/* Top bar */}
      <header className="bg-surface/80 backdrop-blur-3xl fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/app")}
            className="hover:bg-surface-container-highest rounded-full p-2 transition active:scale-95"
            aria-label="Back"
          >
            <span className="material-symbols-outlined text-primary text-3xl">arrow_back</span>
          </button>
          <h1 className="font-headline font-bold text-2xl tracking-tight text-primary">SpeakNow</h1>
        </div>
        <button className="hover:bg-surface-container-highest rounded-full p-2 transition active:scale-95">
          <span className="material-symbols-outlined text-primary text-3xl">settings</span>
        </button>
      </header>

      <main className="pt-24 px-6 max-w-5xl mx-auto">
        {/* Sentence builder */}
        <section className="mb-10">
          <div className="bg-surface-container-highest rounded-3xl p-6 min-h-[120px] flex items-center gap-3 flex-wrap shadow-sm">
            {sentence.map((w, i) => (
              <span
                key={`${w}-${i}`}
                className="bg-primary text-on-primary px-5 py-2 rounded-2xl shadow-md text-xl font-bold"
              >
                {w}
              </span>
            ))}
            <div className="flex-grow flex justify-end">
              <button
                onClick={backspace}
                className="bg-error-container text-on-error-container p-3 rounded-full active:scale-90 transition"
                aria-label="Delete last word"
              >
                <span className="material-symbols-outlined">backspace</span>
              </button>
            </div>
          </div>
        </section>

        {/* Category tabs */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-6">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                activeCat === c.id
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Word grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {current.words.map((w) => (
            <button
              key={w.label}
              onClick={() => addWord(w.label)}
              className="bg-surface-container-low p-4 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-surface-container-high transition-all active:scale-95 group"
            >
              <div className="w-16 h-16 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <span className={`material-symbols-outlined text-3xl ${w.color}`}>{w.icon}</span>
              </div>
              <span className="text-on-surface font-bold text-lg">{w.label}</span>
            </button>
          ))}
        </div>

        {/* Speak button */}
        <section className="mt-12 flex justify-center">
          <button
            onClick={speakSentence}
            className="bg-gradient-to-br from-primary to-primary-container text-on-primary w-full max-w-md py-6 rounded-full shadow-xl flex items-center justify-center gap-4 active:scale-95 transition-all duration-300"
          >
            <span className="material-symbols-outlined icon-fill text-4xl">volume_up</span>
            <span className="text-2xl font-bold">Speak</span>
          </button>
        </section>
      </main>

      {/* Bottom nav */}
      <nav className="bg-surface/80 backdrop-blur-3xl fixed bottom-0 left-0 w-full h-24 flex justify-around items-center px-4 pb-4 z-50 border-t border-outline-variant/30">
        <button
          onClick={() => navigate("/app")}
          className="flex flex-col items-center justify-center text-on-surface-variant px-6 py-2 hover:bg-surface-container-highest rounded-xl transition"
        >
          <span className="material-symbols-outlined">record_voice_over</span>
          <span className="font-headline font-medium text-sm">Speak</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-primary text-on-primary rounded-2xl px-6 py-2 scale-105">
          <span className="material-symbols-outlined icon-fill">grid_view</span>
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
    </div>
  );
};

export default Categories;
