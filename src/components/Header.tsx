import React, { useState } from 'react';
import { Flame, Moon, Sun, BookOpen, X, Info } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, onToggleDarkMode }) => {
  const [showGuideModal, setShowGuideModal] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-black text-lg sm:text-xl text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
              FIRE 財務自由試算器
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                Pro
              </span>
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              Financial Independence, Retire Early Calculator
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowGuideModal(true)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span className="hidden sm:inline">FIRE 懶人包教學</span>
          </button>

          <button
            onClick={onToggleDarkMode}
            aria-label="Toggle dark mode"
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>
      </div>

      {/* FIRE Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowGuideModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold mb-4">
              <Info className="w-5 h-5" />
              <h2 className="text-xl text-slate-800 dark:text-slate-100">什麼是 FIRE 運動？</h2>
            </div>

            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                <strong>FIRE (Financial Independence, Retire Early)</strong> 意指「財務獨立、提早退休」。核心概念是透過提高儲蓄率與複利投資，累積到足夠的資產後，依靠資產產生的被動收益支應生活開銷，實現選擇生活的自由。
              </p>

              <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-xs uppercase tracking-wider text-indigo-500">
                  4% 提款法則 (4% Rule)
                </h3>
                <p className="text-xs">
                  源自美國 Trinity Study 研究：若將資產投資於全球股票與債券指數，每年提領 4% 作為生活費，長期來看資產將永續用不完。
                  <br />
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    FIRE 目標金額 = 退休後年支出 × 25 倍
                  </span>
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-slate-800 dark:text-slate-100">常見的五大 FIRE 模式：</h3>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li><strong>Regular FIRE:</strong> 標準型 FIRE，維持退休前的生活品質。</li>
                  <li><strong>Lean FIRE:</strong> 簡約型 FIRE，降低開銷，以較低的金額提早實現自由。</li>
                  <li><strong>Fat FIRE:</strong> 富足型 FIRE，追求優質奢華的退休生活品質。</li>
                  <li><strong>Barista FIRE:</strong> 斜槓/兼職型，退休後仍保持兼職或愛好收入以補充開銷。</li>
                  <li><strong>Coast FIRE:</strong> 躺平型，年輕時先存夠退休本金，之後只需工作負擔當前生活，讓本金靠複利自動達標。</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setShowGuideModal(false)}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-all shadow-md"
              >
                我瞭解了！開始試算
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
