import { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import type { FireInputs } from './utils/fireCalculator';
import { PRESET_PROFILES, calculateFire } from './utils/fireCalculator';
import { Header } from './components/Header';
import { InputPanel } from './components/InputPanel';
import { SummaryCards } from './components/SummaryCards';
import { Charts } from './components/Charts';
import { Insights } from './components/Insights';
import { Heart, Share2, Check } from 'lucide-react';

export function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [inputs, setInputs] = useState<FireInputs>(PRESET_PROFILES.office_worker.inputs);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const simulation = useMemo(() => calculateFire(inputs), [inputs]);

  useEffect(() => {
    if (simulation.milestones.regular.isAchievedNow) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [simulation.milestones.regular.isAchievedNow]);

  const handleApplyPreset = (presetKey: string) => {
    if (PRESET_PROFILES[presetKey]) {
      setInputs(PRESET_PROFILES[presetKey].inputs);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
      <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 rounded-3xl shadow-xl">
          <div>
            <span className="inline-block px-3 py-1 bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 rounded-full text-xs font-semibold mb-2">
              🔥 掌控您的財富未來
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              試算您的提早退休與財務自由之路
            </h2>
            <p className="text-sm text-indigo-200 mt-1">
              微調您的月收入、儲蓄率與投資報酬，即時探索人生複利奇蹟。
            </p>
          </div>

          <button
            onClick={handleShare}
            className="self-start md:self-center px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            {copied ? '已複製連結！' : '分享計算結果'}
          </button>
        </div>

        <SummaryCards simulation={simulation} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <InputPanel
              inputs={inputs}
              onChange={setInputs}
              onApplyPreset={handleApplyPreset}
            />
          </div>

          <div className="lg:col-span-7 space-y-8">
            <Charts simulation={simulation} />
            <Insights simulation={simulation} />
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
        <p className="flex items-center justify-center gap-1">
          Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Financial Freedom Goals
        </p>
        <p className="mt-1">
          本計算工具僅供財務試算參考，不構成任何投資與決策建議。
        </p>
      </footer>
    </div>
  );
}

export default App;
