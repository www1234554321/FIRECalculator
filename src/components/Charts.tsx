import { useState, type FC } from 'react';
import type { SimulationResult } from '../utils/fireCalculator';
import { formatCurrency } from '../utils/fireCalculator';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { LineChart as LineIcon, PieChart as PieIcon, Layers } from 'lucide-react';

interface ChartsProps {
  simulation: SimulationResult;
}

export const Charts: FC<ChartsProps> = ({ simulation }) => {
  const [activeTab, setActiveTab] = useState<'accumulation' | 'composition'>('accumulation');

  const chartData = simulation.yearlyProjections.map((item) => ({
    age: `${item.age}歲`,
    year: item.year,
    netWorth: item.netWorth,
    annualSavings: item.annualSavings,
    investmentReturns: item.investmentReturns,
    regularTarget: item.regularTarget,
    leanTarget: item.leanTarget,
    fatTarget: item.fatTarget,
    isRetired: item.isRetired,
  }));

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-100 dark:border-slate-700/60">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <LineIcon className="w-5 h-5 text-indigo-500" />
            資產累積與增長走勢模擬 (Asset Projections)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            複利滾動效應與退休目標線走勢圖
          </p>
        </div>

        {/* Tab switcher */}
        <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-900 rounded-xl">
          <button
            onClick={() => setActiveTab('accumulation')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'accumulation'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            總資產走勢
          </button>
          <button
            onClick={() => setActiveTab('composition')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'composition'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5" />
            每年增長來源 (儲蓄 vs 投資)
          </button>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {activeTab === 'accumulation' ? (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="netWorthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="age" tick={{ fontSize: 11 }} />
              <YAxis
                tick={{ fontSize: 11 }}
                tickFormatter={(value) => `${(value / 10000).toFixed(0)}萬`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1.5 border border-slate-700">
                        <div className="font-bold border-b border-slate-800 pb-1 text-slate-300">
                          {label} ({data.year}年) {data.isRetired ? '🎉 已退休' : '💼 累積中'}
                        </div>
                        <div className="text-indigo-400 font-extrabold text-sm">
                          總淨資產: NT$ {formatCurrency(data.netWorth)}
                        </div>
                        <div className="text-emerald-400">
                          年度儲蓄入帳: NT$ {formatCurrency(data.annualSavings)}
                        </div>
                        <div className="text-amber-400">
                          年度投資複利: NT$ {formatCurrency(data.investmentReturns)}
                        </div>
                        <div className="text-slate-400 text-[10px] pt-1">
                          標準 FIRE 目標: NT$ {formatCurrency(data.regularTarget)}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine
                y={simulation.targets.regular}
                label={{ value: 'FIRE 目標線', fill: '#ef4444', fontSize: 11, position: 'insideTopLeft' }}
                stroke="#ef4444"
                strokeDasharray="4 4"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="netWorth"
                stroke="#6366f1"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#netWorthGrad)"
                name="總淨資產"
              />
            </AreaChart>
          ) : (
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="age" tick={{ fontSize: 11 }} />
              <YAxis
                tick={{ fontSize: 11 }}
                tickFormatter={(value) => `${(value / 10000).toFixed(0)}萬`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1 border border-slate-700">
                        <div className="font-bold border-b border-slate-800 pb-1">{label} ({data.year}年)</div>
                        <div className="text-emerald-400">年度本金儲蓄: NT$ {formatCurrency(data.annualSavings)}</div>
                        <div className="text-amber-400">年度複利收益: NT$ {formatCurrency(data.investmentReturns)}</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="annualSavings" name="主動儲蓄 (Savings)" fill="#10b981" stackId="a" radius={[0, 0, 0, 0]} />
              <Bar dataKey="investmentReturns" name="投資複利 (Returns)" fill="#f59e0b" stackId="a" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
