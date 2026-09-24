export interface FireInputs {
  currentAge: number;
  targetRetireAge: number;
  currentNetWorth: number;
  monthlyIncome: number;
  monthlyExpense: number;
  retirementMonthlyExpense: number;
  annualReturnRate: number; // percentage, e.g. 7
  inflationRate: number; // percentage, e.g. 2.5
  withdrawalRate: number; // percentage, e.g. 4
  baristaIncome?: number; // optional monthly side income during retirement
}

export interface FireTargets {
  regular: number;
  lean: number;
  fat: number;
  barista: number;
  coast: number;
}

export interface MilestoneResult {
  fireType: 'regular' | 'lean' | 'fat' | 'barista' | 'coast';
  targetAmount: number;
  achievedAge: number | null; // null if not achieved within max age (e.g., 100)
  yearsNeeded: number | null;
  achievedYear: number | null;
  isAchievedNow: boolean;
}

export interface YearProjection {
  age: number;
  year: number;
  netWorth: number;
  annualSavings: number;
  investmentReturns: number;
  isRetired: boolean;
  regularTarget: number;
  leanTarget: number;
  fatTarget: number;
}

export interface SimulationResult {
  inputs: FireInputs;
  annualSavings: number;
  savingsRate: number; // percentage
  targets: FireTargets;
  milestones: Record<string, MilestoneResult>;
  yearlyProjections: YearProjection[];
  regularFireAge: number | null;
  regularFireYear: number | null;
  monteCarloSuccessRate: number; // percentage, e.g. 92.5
}

export const PRESET_PROFILES: Record<string, { name: string; description: string; inputs: FireInputs }> = {
  office_worker: {
    name: '普通上班族 (小資族)',
    description: '月收 5 萬、月支出 3 萬，希望逐步邁向 50 歲財務自由',
    inputs: {
      currentAge: 28,
      targetRetireAge: 50,
      currentNetWorth: 500000,
      monthlyIncome: 50000,
      monthlyExpense: 30000,
      retirementMonthlyExpense: 35000,
      annualReturnRate: 7,
      inflationRate: 2.5,
      withdrawalRate: 4,
      baristaIncome: 15000,
    },
  },
  tech_engineer: {
    name: '高薪科技族 (FIRE衝刺族)',
    description: '月收 12 萬，高儲蓄率，目標 42 歲前極速退休',
    inputs: {
      currentAge: 30,
      targetRetireAge: 42,
      currentNetWorth: 2500000,
      monthlyIncome: 120000,
      monthlyExpense: 45000,
      retirementMonthlyExpense: 50000,
      annualReturnRate: 8,
      inflationRate: 2.5,
      withdrawalRate: 4,
      baristaIncome: 20000,
    },
  },
  freelancer: {
    name: '斜槓/自由工作者 (Barista FIRE)',
    description: '追求生活工作平衡，退休後維持部分微利兼職收入',
    inputs: {
      currentAge: 32,
      targetRetireAge: 45,
      currentNetWorth: 1200000,
      monthlyIncome: 65000,
      monthlyExpense: 35000,
      retirementMonthlyExpense: 38000,
      annualReturnRate: 6.5,
      inflationRate: 2.5,
      withdrawalRate: 4,
      baristaIncome: 20000,
    },
  },
};

export function calculateFire(inputs: FireInputs): SimulationResult {
  const currentYear = new Date().getFullYear();
  const monthlySavings = Math.max(0, inputs.monthlyIncome - inputs.monthlyExpense);
  const annualSavings = monthlySavings * 12;
  const savingsRate = inputs.monthlyIncome > 0 ? (monthlySavings / inputs.monthlyIncome) * 100 : 0;

  const realReturnRate = Math.max(-0.05, (inputs.annualReturnRate - inputs.inflationRate) / 100);
  const swr = Math.max(0.01, inputs.withdrawalRate / 100);

  const annualRetirementExpense = inputs.retirementMonthlyExpense * 12;
  const baristaMonthlyIncome = inputs.baristaIncome || 15000;
  const baristaAnnualExpense = Math.max(0, inputs.retirementMonthlyExpense - baristaMonthlyIncome) * 12;

  // FIRE Target Numbers
  const regularTarget = annualRetirementExpense / swr;
  const leanTarget = (annualRetirementExpense * 0.75) / swr;
  const fatTarget = (annualRetirementExpense * 1.35) / swr;
  const baristaTarget = baristaAnnualExpense / swr;

  const yearsToTargetAge = Math.max(0, inputs.targetRetireAge - inputs.currentAge);
  const coastTarget = regularTarget / Math.pow(1 + realReturnRate, yearsToTargetAge);

  const targets: FireTargets = {
    regular: regularTarget,
    lean: leanTarget,
    fat: fatTarget,
    barista: baristaTarget,
    coast: coastTarget,
  };

  const maxAge = Math.max(85, inputs.currentAge + 40);
  const yearlyProjections: YearProjection[] = [];

  let currentWorth = inputs.currentNetWorth;
  let regularFireAge: number | null = currentWorth >= regularTarget ? inputs.currentAge : null;
  let leanFireAge: number | null = currentWorth >= leanTarget ? inputs.currentAge : null;
  let fatFireAge: number | null = currentWorth >= fatTarget ? inputs.currentAge : null;
  let baristaFireAge: number | null = currentWorth >= baristaTarget ? inputs.currentAge : null;
  let coastFireAge: number | null = currentWorth >= coastTarget ? inputs.currentAge : null;

  for (let age = inputs.currentAge; age <= maxAge; age++) {
    const year = currentYear + (age - inputs.currentAge);
    const isRetired = regularFireAge !== null ? age >= regularFireAge : age >= inputs.targetRetireAge;

    const returns = currentWorth * realReturnRate;
    const savings = isRetired ? 0 : annualSavings;

    // Check targets reached in this year
    if (regularFireAge === null && currentWorth >= regularTarget) {
      regularFireAge = age;
    }
    if (leanFireAge === null && currentWorth >= leanTarget) {
      leanFireAge = age;
    }
    if (fatFireAge === null && currentWorth >= fatTarget) {
      fatFireAge = age;
    }
    if (baristaFireAge === null && currentWorth >= baristaTarget) {
      baristaFireAge = age;
    }
    if (coastFireAge === null && currentWorth >= coastTarget) {
      coastFireAge = age;
    }

    yearlyProjections.push({
      age,
      year,
      netWorth: Math.round(currentWorth),
      annualSavings: Math.round(savings),
      investmentReturns: Math.round(returns),
      isRetired,
      regularTarget: Math.round(regularTarget),
      leanTarget: Math.round(leanTarget),
      fatTarget: Math.round(fatTarget),
    });

    if (isRetired) {
      currentWorth = currentWorth * (1 + realReturnRate) - annualRetirementExpense;
    } else {
      currentWorth = currentWorth * (1 + realReturnRate) + annualSavings;
    }
  }

  const createMilestone = (
    type: 'regular' | 'lean' | 'fat' | 'barista' | 'coast',
    target: number,
    achievedAge: number | null
  ): MilestoneResult => {
    const isAchievedNow = inputs.currentNetWorth >= target;
    const yearsNeeded = achievedAge !== null ? achievedAge - inputs.currentAge : null;
    const achievedYear = achievedAge !== null ? currentYear + yearsNeeded! : null;

    return {
      fireType: type,
      targetAmount: Math.round(target),
      achievedAge,
      yearsNeeded,
      achievedYear,
      isAchievedNow,
    };
  };

  const milestones: Record<string, MilestoneResult> = {
    regular: createMilestone('regular', regularTarget, regularFireAge),
    lean: createMilestone('lean', leanTarget, leanFireAge),
    fat: createMilestone('fat', fatTarget, fatFireAge),
    barista: createMilestone('barista', baristaTarget, baristaFireAge),
    coast: createMilestone('coast', coastTarget, coastFireAge),
  };

  const monteCarloSuccessRate = runMonteCarloSimulation(
    regularTarget,
    annualRetirementExpense,
    realReturnRate,
    0.14, // assumed std dev 14%
    30, // 30 years retirement
    1000 // 1000 simulations
  );

  return {
    inputs,
    annualSavings,
    savingsRate,
    targets,
    milestones,
    yearlyProjections,
    regularFireAge,
    regularFireYear: regularFireAge !== null ? currentYear + (regularFireAge - inputs.currentAge) : null,
    monteCarloSuccessRate,
  };
}

function randomNormal(mean: number, stdDev: number): number {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1 || 1e-10)) * Math.cos(2.0 * Math.PI * u2);
  return mean + z0 * stdDev;
}

export function runMonteCarloSimulation(
  initialPortfolio: number,
  annualWithdrawal: number,
  meanReturn: number,
  stdDevReturn: number,
  years = 30,
  simulations = 1000
): number {
  if (initialPortfolio <= 0) return 0;
  let successCount = 0;

  for (let i = 0; i < simulations; i++) {
    let portfolio = initialPortfolio;
    let failed = false;

    for (let y = 0; y < years; y++) {
      const returnRate = randomNormal(meanReturn, stdDevReturn);
      portfolio = portfolio * (1 + returnRate) - annualWithdrawal;
      if (portfolio <= 0) {
        failed = true;
        break;
      }
    }

    if (!failed) {
      successCount++;
    }
  }

  return Math.round((successCount / simulations) * 100);
}

export function formatCurrency(amount: number): string {
  if (Math.abs(amount) >= 100000000) {
    return `${(amount / 100000000).toFixed(2)} 億`;
  }
  if (Math.abs(amount) >= 10000) {
    const wan = Math.round(amount / 10000);
    return `${wan.toLocaleString('zh-TW')} 萬`;
  }
  return amount.toLocaleString('zh-TW');
}
