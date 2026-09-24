import type { FC } from 'react';
import type { FireInputs } from '../utils/fireCalculator';
import { PRESET_PROFILES } from '../utils/fireCalculator';
import { User, DollarSign, TrendingUp, Percent, Sparkles } from 'lucide-react';

interface InputPanelProps {
  inputs: FireInputs;
  onChange: (inputs: FireInputs) => void;
  onApplyPreset: (presetKey: string) => void;
}

export const InputPanel: FC<InputPanelProps> = ({ inputs, onChange, onApplyPreset }) => {
  const handleInputChange = (field: keyof FireInputs, value: number) => {
    onChange({
      ...inputs,
      [field]: isNaN(value) ? 0 : value,
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-100 dark:border-slate-700/60 transition-all">
      {/* Preset Profiles Selector */}
      <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-700/60">
        <label className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
          <Sparkles className="w-4 h-4" />
          快速載入範例情境 (Presets)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {Object.entries(PRESET_PROFILES).map(([key, profile]) => (
            <button
              key={key}
              type="button"
              onClick={() => onApplyPreset(key)}
              className="text-left p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 transition-all text-xs"
            >
              <div className="font-bold text-slate-800 dark:text-slate-100">{profile.name}</div>
              <div className="text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{profile.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {/* Section 1: 基本個人資料 */}
        <div>
          <h3 className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 mb-4 text-base">
            <User className="w-4 h-4 text-indigo-500" />
            1. 個人年齡與目標
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                目前年齡 (歲)
              </label>
              <input
                type="number"
                min={18}
                max={90}
                value={inputs.currentAge}
                onChange={(e) => handleInputChange('currentAge', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                預計退休年齡 (歲)
              </label>
              <input
                type="number"
                min={inputs.currentAge + 1}
                max={100}
                value={inputs.targetRetireAge}
                onChange={(e) => handleInputChange('targetRetireAge', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: 現有財務狀況 */}
        <div>
          <h3 className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 mb-4 text-base">
            <DollarSign className="w-4 h-4 text-emerald-500" />
            2. 目前收支與資產 (NT$)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                目前總淨資產 (Current Net Worth)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-xs">$</span>
                <input
                  type="number"
                  step={10000}
                  value={inputs.currentNetWorth}
                  onChange={(e) => handleInputChange('currentNetWorth', parseFloat(e.target.value) || 0)}
                  className="w-full pl-7 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                現階段每月平均總收入
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-xs">$</span>
                <input
                  type="number"
                  step={1000}
                  value={inputs.monthlyIncome}
                  onChange={(e) => handleInputChange('monthlyIncome', parseFloat(e.target.value) || 0)}
                  className="w-full pl-7 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                現階段每月平均總支出
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-xs">$</span>
                <input
                  type="number"
                  step={1000}
                  value={inputs.monthlyExpense}
                  onChange={(e) => handleInputChange('monthlyExpense', parseFloat(e.target.value) || 0)}
                  className="w-full pl-7 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: 退休預期支出與投資參數 */}
        <div>
          <h3 className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 mb-4 text-base">
            <TrendingUp className="w-4 h-4 text-amber-500" />
            3. 退休需求與投資假設
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                預計退休後每月開銷
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-xs">$</span>
                <input
                  type="number"
                  step={1000}
                  value={inputs.retirementMonthlyExpense}
                  onChange={(e) => handleInputChange('retirementMonthlyExpense', parseFloat(e.target.value) || 0)}
                  className="w-full pl-7 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Barista/斜槓退休月兼職收入
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-xs">$</span>
                <input
                  type="number"
                  step={1000}
                  value={inputs.baristaIncome ?? 15000}
                  onChange={(e) => handleInputChange('baristaIncome', parseFloat(e.target.value) || 0)}
                  className="w-full pl-7 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                <span>預期年化投資報酬率 (% / 年)</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">{inputs.annualReturnRate}%</span>
              </label>
              <input
                type="range"
                min={1}
                max={15}
                step={0.5}
                value={inputs.annualReturnRate}
                onChange={(e) => handleInputChange('annualReturnRate', parseFloat(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <label className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                <span>預估通貨膨脹率 (% / 年)</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">{inputs.inflationRate}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={8}
                step={0.5}
                value={inputs.inflationRate}
                onChange={(e) => handleInputChange('inflationRate', parseFloat(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                <span className="flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5 text-slate-400" />
                  安全提款率 SWR (預設 4% 法則)
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{inputs.withdrawalRate}%</span>
              </label>
              <input
                type="range"
                min={2}
                max={6}
                step={0.25}
                value={inputs.withdrawalRate}
                onChange={(e) => handleInputChange('withdrawalRate', parseFloat(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
