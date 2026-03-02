export function calculateExpectedSeverance(yearsEmployed: number): number {
  return Math.ceil(yearsEmployed); // 1 week per year, round up
}

export function calculateExpectedBenefits(yearsEmployed: number): number {
  return Math.ceil(yearsEmployed); // matches severance by default
}

export function hasAdea(age: number): boolean {
  return age >= 40;
}

export function hasPotentialWarnAct(terminationReason: string): boolean {
  const layoffKeywords = ['layoff', 'lay off', 'laid off', 'reduction', 'rif', 'restructur', 'downsiz'];
  const lower = terminationReason.toLowerCase();
  return layoffKeywords.some((k) => lower.includes(k));
}

export interface EntitlementSummary {
  severanceWeeksExpected: number;
  benefitsWeeksExpected: number;
  severanceShortfall: number;
  benefitsShortfall: number;
  hasAdea: boolean;
  hasPotentialWarnAct: boolean;
}

export function calculateEntitlements(params: {
  yearsEmployed: number;
  ageAtTermination: number;
  terminationReason: string;
  severanceWeeksOffered: number;
  benefitsWeeksOffered: number;
}): EntitlementSummary {
  const severanceWeeksExpected = calculateExpectedSeverance(params.yearsEmployed);
  const benefitsWeeksExpected = calculateExpectedBenefits(params.yearsEmployed);
  return {
    severanceWeeksExpected,
    benefitsWeeksExpected,
    severanceShortfall: Math.max(0, severanceWeeksExpected - params.severanceWeeksOffered),
    benefitsShortfall: Math.max(0, benefitsWeeksExpected - params.benefitsWeeksOffered),
    hasAdea: hasAdea(params.ageAtTermination),
    hasPotentialWarnAct: hasPotentialWarnAct(params.terminationReason),
  };
}
