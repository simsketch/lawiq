import type { Case } from '@/db/schema';

export const SYSTEM_PROMPT = `You are a legal document specialist helping individuals assert their employment rights.
You write professional, firm, and strategic demand letters that protect the client's interests without requiring attorney representation. Your letters are:
- Polite but unambiguous about the seriousness of the situation
- Factually precise, referencing specific figures and dates
- Strategically worded to suggest legal awareness without making explicit legal threats
- Formatted for professional correspondence

Write the full demand letter only — no preamble, no explanation, just the letter itself starting with the date line.
Use plain text formatting only. Do NOT use markdown, asterisks, pound signs, or any other markup. Section headers should be written in ALL CAPS followed by a colon, e.g. "SEVERANCE AND BENEFITS DISCREPANCIES:".`;

export function buildUserPrompt(c: Case): string {
  const demands = c.finalDemands as {
    severanceWeeks?: number;
    benefitsWeeks?: number;
    backPay?: string;
    other?: string;
  } | null;

  const lines: string[] = [
    `Company: ${c.companyName ?? 'Unknown Company'}`,
    `Job Title: ${c.jobTitle ?? 'Unknown'}`,
    `Years Employed: ${c.yearsEmployed ?? '?'}`,
    `Age at Termination: ${c.ageAtTermination ?? '?'}`,
    `Termination Reason Given: ${c.terminationReason ?? 'Not specified'}`,
    ``,
    `Severance Offered: ${c.severanceWeeksOffered ?? 0} weeks`,
    `Severance Expected (based on tenure): ${c.severanceWeeksExpected ?? 0} weeks`,
    `Benefits Offered: ${c.benefitsWeeksOffered ?? 0} weeks`,
    `Benefits Expected: ${c.benefitsWeeksExpected ?? 0} weeks`,
  ];

  if (c.hasWageConcerns && c.wageConcernsDescription) {
    lines.push(``, `Wage Concerns: ${c.wageConcernsDescription}`);
  }

  if (c.narrative) {
    lines.push(``, `Employee's Account: ${c.narrative}`);
  }

  if (demands) {
    lines.push(``, `Final Demands:`);
    if (demands.severanceWeeks) lines.push(`  - Severance: ${demands.severanceWeeks} weeks`);
    if (demands.benefitsWeeks) lines.push(`  - Benefits continuation: ${demands.benefitsWeeks} weeks`);
    if (demands.backPay) lines.push(`  - Back pay: ${demands.backPay}`);
    if (demands.other) lines.push(`  - Other: ${demands.other}`);
  }

  if (c.emailTo) {
    lines.push(``, `Address letter to: ${c.emailTo}`);
  }

  lines.push(``, `Write a professional demand letter on behalf of the employee to send to HR/Legal at ${c.companyName ?? 'the company'}. The letter should assert the shortfalls clearly, reference applicable employment protections where relevant (ADEA if applicable, WARN Act if applicable, state wage and hour laws), and demand resolution within 10 business days.`);

  return lines.join('\n');
}
