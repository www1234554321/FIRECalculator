import { describe, it, expect } from 'vitest';
import { calculateFire, PRESET_PROFILES, formatCurrency } from './fireCalculator';

describe('FIRE Calculator Engine', () => {
  it('calculates regular FIRE target accurately based on 4% SWR', () => {
    const inputs = {
      currentAge: 30,
      targetRetireAge: 50,
      currentNetWorth: 1000000,
      monthlyIncome: 60000,
      monthlyExpense: 30000,
      retirementMonthlyExpense: 40000,
      annualReturnRate: 7,
      inflationRate: 2,
      withdrawalRate: 4,
    };

    const result = calculateFire(inputs);
    // 40000 * 12 = 480,000 / 0.04 = 12,000,000
    expect(result.targets.regular).toBe(12000000);
    expect(result.targets.lean).toBe(9000000); // 75% of regular
    expect(result.targets.fat).toBe(16200000); // 135% of regular
    expect(result.savingsRate).toBe(50); // (30,000 / 60,000) * 100
  });

  it('handles preset profiles without error', () => {
    Object.values(PRESET_PROFILES).forEach((profile) => {
      const result = calculateFire(profile.inputs);
      expect(result.targets.regular).toBeGreaterThan(0);
      expect(result.yearlyProjections.length).toBeGreaterThan(0);
      expect(result.monteCarloSuccessRate).toBeGreaterThanOrEqual(0);
      expect(result.monteCarloSuccessRate).toBeLessThanOrEqual(100);
    });
  });

  it('formats currency numbers intuitively', () => {
    expect(formatCurrency(12000000)).toBe('1,200 萬');
    expect(formatCurrency(150000000)).toBe('1.50 億');
    expect(formatCurrency(5000)).toBe('5,000');
  });
});
