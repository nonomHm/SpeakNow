import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div
      dir="rtl"
      lang="ar"
      className="resonant-sanctuary-gradient bg-surface text-on-surface min-h-screen flex flex-col items-center justify-between overflow-hidden font-body"
    >
      <main className="flex-grow flex flex-col items-center justify-center px-8 w-full max-w-2xl text-center space-y-12 pt-12">
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="absolute inset-0 bg-primary-fixed opacity-30 blur-3xl rounded-full" />
          <div className="relative z-10 bg-surface-container-lowest p-8 rounded-[3rem] soft-elevation border border-outline-variant/20">
            <div className="flex items-center justify-center gap-1.5 h-32 w-48">
              <div className="w-3 h-8 bg-primary rounded-full opacity-30" />
              <div className="w-3 h-16 bg-primary-container rounded-full" />
              <div className="w-3 h-24 bg-primary rounded-full" />
              <div className="w-3 h-32 bg-primary-container rounded-full" />
              <div className="w-3 h-24 bg-primary rounded-full" />
              <div className="w-3 h-16 bg-primary-container rounded-full" />
              <div className="w-3 h-8 bg-primary rounded-full opacity-30" />
            </div>
            <div className="mt-4 flex justify-center">
              <span className="material-symbols-outlined icon-fill text-primary text-5xl">favorite</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-on-surface font-headline font-extrabold text-5xl md:text-6xl tracking-tight leading-tight">
            SpeakNow
          </h1>
          <h2 className="text-primary-container font-headline font-bold text-4xl md:text-5xl tracking-normal font-arabic">
            انطق الآن
          </h2>
          <div className="pt-6 max-w-sm mx-auto">
            <p className="text-on-surface-variant text-lg leading-relaxed font-light">
              Your voice, amplified. A modern space designed to help you communicate with ease and confidence.
            </p>
          </div>
        </div>

        <div className="w-full bg-surface-container-low rounded-[2.5rem] p-6 text-right">
          <div className="flex items-center gap-4 justify-end">
            <div>
              <h3 className="text-primary font-bold text-lg font-arabic">أهلاً بك</h3>
              <p className="text-on-surface-variant text-sm font-arabic">مساحتك الخاصة للتعبير</p>
            </div>
            <div className="bg-secondary-container text-on-secondary-container p-3 rounded-2xl">
              <span className="material-symbols-outlined">auto_awesome</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full max-w-md px-8 pb-16 pt-8 space-y-6">
        <button
          onClick={() => navigate("/app")}
          className="w-full py-6 px-8 bg-primary text-on-primary rounded-xl font-headline font-bold text-xl asymmetric-pulse flex items-center justify-between shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined text-2xl">arrow_forward</span>
          <span className="flex-grow text-center">Get Started</span>
          <span className="material-symbols-outlined text-2xl opacity-0">arrow_forward</span>
        </button>
        <div className="flex items-center justify-center gap-8 text-on-surface-variant">
          <button className="text-sm font-medium hover:text-primary transition-colors">Privacy Policy</button>
          <div className="w-1.5 h-1.5 bg-outline-variant rounded-full" />
          <button className="text-sm font-medium hover:text-primary transition-colors">Language Settings</button>
        </div>
      </footer>

      <div className="fixed -top-20 -left-20 w-96 h-96 bg-secondary-container/30 rounded-full blur-[100px] -z-10" />
      <div className="fixed top-1/2 -right-40 w-80 h-80 bg-tertiary-container/20 rounded-full blur-[120px] -z-10" />
    </div>
  );
};

export default Index;
