import type { FC } from 'react';
import type { SimulationResult } from '../utils/fireCalculator';
import { formatCurrency } from '../utils/fireCalculator';
import { Flame, Target, PiggyBank, Calendar, Award, ShieldCheck, Zap } from 'lucide-react';

interface SummaryCardsProps {
  simulation: SimulationResult;
}

export const SummaryCards: FC<SummaryCardsProps> = ({ simulation }) => {
  const { targets, milestones, regularFireAge, regularFireYear, savingsRate, monteCarloSuccessRate, inputs } = simulation;
  const regularMilestone = milestones.regular;

  return (
    <div className="space-y-6">
      {/* Primary Key Metric Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* FIRE Target Amount */}
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-5 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute right-2 bottom-2 text-indigo-500/20">
            <Target className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-2 text-indigo-200 text-xs font-semibold mb-1">
            <Flame className="w-4 h-4 text-orange-400" />
            標準 FIRE 目標數字
          </div>
          <div className="text-3xl font-black tracking-tight my-2">
            NT$ {formatCurrency(targets.regular)}
          </div>
          <div className="text-xs text-indigo-100 flex items-center gap-1">
            <span>依據年支出 {formatCurrency(inputs.retirementMonthlyExpense * 12)} / {inputs.withdrawalRate}% 提款率</span>
          </div>
        </div>

        {/* FIRE Reached Age & Year */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-800 text-white p-5 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute right-2 bottom-2 text-teal-500/20">
            <Calendar className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-2 text-teal-200 text-xs font-semibold mb-1">
            <Award className="w-4 h-4 text-amber-300" />
            預計財務自由時間
          </div>
          <div className="text-3xl font-black tracking-tight my-2">
            {regularFireAge !== null ? (
              <span>{regularFireAge} 歲 <span className="text-lg font-normal text-teal-200">({regularFireYear}年)</span></span>
            ) : (
              <span className="text-2xl">尚需調整試算</span>
            )}
          </div>
          <div className="text-xs text-teal-100 font-medium">
            {regularMilestone.isAchievedNow ? (
              <span className="text-amber-300 font-bold">恭喜！您目前資產已達成 FIRE 目標！</span>
            ) : regularMilestone.yearsNeeded !== null ? (
              <span>倒數 <strong className="text-amber-300">{regularMilestone.yearsNeeded} 年</strong> 即將達成自由！</span>
            ) : (
              <span>依目前進度無法在 85 歲前達成，建議提高儲蓄或報酬率</span>
            )}
          </div>
        </div>

        {/* Monthly Savings & Monte Carlo Success Rate */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-5 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute right-2 bottom-2 text-slate-700/40">
            <ShieldCheck className="w-24 h-24" />
          </div>
          <div className="flex items-center justify-between text-slate-300 text-xs font-semibold mb-1">
            <span className="flex items-center gap-1">
              <PiggyBank className="w-4 h-4 text-indigo-400" />
              儲蓄率 & 壓力測試
            </span>
            <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold">
              Monte Carlo {monteCarloSuccessRate}%
            </span>
          </div>
          <div className="text-3xl font-black tracking-tight my-2 text-indigo-400">
            {savingsRate.toFixed(1)}% <span className="text-xs text-slate-400 font-normal">每月儲蓄率</span>
          </div>
          <div className="text-xs text-slate-300 flex items-center justify-between">
            <span>每月儲蓄: NT$ {formatCurrency(Math.max(0, inputs.monthlyIncome - inputs.monthlyExpense))}</span>
            <span>蒙地卡羅成功率: {monteCarloSuccessRate}%</span>
          </div>
        </div>
      </div>

      {/* Grid of FIRE Types Comparison */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-100 dark:border-slate-700/60">
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          五大 FIRE 模式試算對比 (FIRE Strategy Comparison)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Lean FIRE */}
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400">Lean FIRE (簡約)</div>
              <div className="text-lg font-black text-slate-800 dark:text-slate-100 mt-1">
                {formatCurrency(targets.lean)}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">極簡生活 75% 預算</div>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {milestones.lean.achievedAge ? `${milestones.lean.achievedAge} 歲達成` : '未達成'}
            </div>
          </div>

          {/* Regular FIRE */}
          <div className="bg-indigo-50/60 dark:bg-indigo-950/40 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">Regular FIRE (標準)</div>
              <div className="text-lg font-black text-indigo-900 dark:text-indigo-200 mt-1">
                {formatCurrency(targets.regular)}
              </div>
              <div className="text-[11px] text-indigo-600/70 dark:text-indigo-400/70 mt-1">維持目前生活品質</div>
            </div>
            <div className="mt-3 pt-2 border-t border-indigo-100 dark:border-indigo-900 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              {milestones.regular.achievedAge ? `${milestones.regular.achievedAge} 歲達成` : '未達成'}
            </div>
          </div>

          {/* Fat FIRE */}
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400">Fat FIRE (富足)</div>
              <div className="text-lg font-black text-slate-800 dark:text-slate-100 mt-1">
                {formatCurrency(targets.fat)}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">品質生活 135% 預算</div>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-semibold text-purple-600 dark:text-purple-400">
              {milestones.fat.achievedAge ? `${milestones.fat.achievedAge} 歲達成` : '未達成'}
            </div>
          </div>

          {/* Barista FIRE */}
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400">Barista FIRE (半退休)</div>
              <div className="text-lg font-black text-slate-800 dark:text-slate-100 mt-1">
                {formatCurrency(targets.barista)}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">配合月兼職 {formatCurrency(inputs.baristaIncome || 15000)}</div>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-semibold text-amber-600 dark:text-amber-400">
              {milestones.barista.achievedAge ? `${milestones.barista.achievedAge} 歲達成` : '未達成'}
            </div>
          </div>

          {/* Coast FIRE */}
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400">Coast FIRE (躺平)</div>
              <div className="text-lg font-black text-slate-800 dark:text-slate-100 mt-1">
                {formatCurrency(targets.coast)}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">只需本金靠複利滾動</div>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
              {inputs.currentNetWorth >= targets.coast ? '現已達標！' : milestones.coast.achievedAge ? `${milestones.coast.achievedAge} 歲達成` : '未達成'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
