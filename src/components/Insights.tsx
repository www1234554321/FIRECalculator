import type { FC } from 'react';
import type { SimulationResult } from '../utils/fireCalculator';
import { formatCurrency } from '../utils/fireCalculator';
import { Lightbulb, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react';

interface InsightsProps {
  simulation: SimulationResult;
}

export const Insights: FC<InsightsProps> = ({ simulation }) => {
  const { savingsRate, inputs, monteCarloSuccessRate } = simulation;

  const suggestions: { title: string; desc: string; type: 'success' | 'warning' | 'info' }[] = [];

  // Savings rate suggestion
  if (savingsRate < 20) {
    suggestions.push({
      title: '儲蓄率較低 (目前 ' + savingsRate.toFixed(1) + '%)',
      desc: '試著削減不必要的訂閱或非必要開支，若將每月儲蓄提升至收入的 30% 以上，達成 FIRE 的時間可大幅縮短 5~10 年！',
      type: 'warning',
    });
  } else if (savingsRate >= 50) {
    suggestions.push({
      title: '極佳的超高儲蓄率 (' + savingsRate.toFixed(1) + '%)',
      desc: '您的儲蓄能力非常頂尖！持續保持當前的投資紀律，複利效果將在未來 5 年內加速爆發。',
      type: 'success',
    });
  } else {
    suggestions.push({
      title: '穩健的儲蓄習慣 (' + savingsRate.toFixed(1) + '%)',
      desc: '當前儲蓄率相當健康，若能每年適度調升 1-2% 薪資儲蓄比例，自由目標將更近一步。',
      type: 'info',
    });
  }

  // Acceleration tip
  const extraSavingsPerMonth = 5000;
  suggestions.push({
    title: '加速自由小訣竅：每月多存 $' + formatCurrency(extraSavingsPerMonth),
    desc: `若每月額外多投入 ${formatCurrency(extraSavingsPerMonth)} 於指數型基金 (以 ${inputs.annualReturnRate}% 複利計算)，30 年後可多創造出約 NT$ ${formatCurrency(
      extraSavingsPerMonth * 12 * Math.pow(1 + (inputs.annualReturnRate - inputs.inflationRate) / 100, 30)
    )} 的資產！`,
    type: 'info',
  });

  // Monte carlo advice
  if (monteCarloSuccessRate < 80) {
    suggestions.push({
      title: '蒙地卡羅壓力測試提示 (' + monteCarloSuccessRate + '% 成功率)',
      desc: '在遭遇極端市場波動時可能面臨資金不足風險。建議考慮退休初期降低提款率 (例如由 4% 降至 3.5%)，或保留 1-2 年緊急預備金。',
      type: 'warning',
    });
  } else {
    suggestions.push({
      title: '安全提款極具韌性 (' + monteCarloSuccessRate + '% 成功率)',
      desc: '蒙地卡羅模擬顯示您的資產組合具有極高抗風險能力，幾乎可永續支應退休開銷。',
      type: 'success',
    });
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-100 dark:border-slate-700/60">
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-amber-500" />
        專屬財務自由優化建議 (Personalized FIRE Action Insights)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {suggestions.map((item, index) => {
          const bgClass =
            item.type === 'success'
              ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50'
              : item.type === 'warning'
              ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/50'
              : 'bg-indigo-50/70 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800/50';

          const Icon =
            item.type === 'success'
              ? Sparkles
              : item.type === 'warning'
              ? ShieldAlert
              : TrendingUp;

          const iconColor =
            item.type === 'success'
              ? 'text-emerald-500'
              : item.type === 'warning'
              ? 'text-amber-500'
              : 'text-indigo-500';

          return (
            <div key={index} className={`p-4 rounded-xl border ${bgClass} flex flex-col justify-between`}>
              <div>
                <div className="flex items-center gap-2 font-bold text-sm text-slate-800 dark:text-slate-100 mb-2">
                  <Icon className={`w-4 h-4 ${iconColor} shrink-0`} />
                  <span>{item.title}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
