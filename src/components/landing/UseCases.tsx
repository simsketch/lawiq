import Link from 'next/link';

const cases = [
  {
    title: 'Severance Shortfall',
    description: 'You were offered less severance than your tenure warrants. Industry standard is 1–2 weeks per year of service.',
    example: '16 years of service → offered 14 weeks → 2+ weeks shortfall',
    accent: 'rgba(59,130,246,0.25)',
    accentText: '#93c5fd',
  },
  {
    title: 'Age Discrimination (ADEA)',
    description: 'Workers 40+ are protected by the Age Discrimination in Employment Act. A pretextual layoff may be actionable.',
    example: 'Long-tenured employee, 40+, terminated under vague "restructuring"',
    accent: 'rgba(139,92,246,0.25)',
    accentText: '#c4b5fd',
  },
  {
    title: 'Benefits Continuation Shortfall',
    description: 'Health, dental, and life insurance continuation (COBRA) should typically mirror your severance period.',
    example: '16 years employed → offered 12 weeks benefits → 4+ weeks gap',
    accent: 'rgba(6,182,212,0.22)',
    accentText: '#67e8f9',
  },
  {
    title: 'Unpaid Wages & Timecard Issues',
    description: 'Manipulated timecards, denied overtime, or unpaid final wages are wage theft — recoverable under federal and state law.',
    example: 'Hours reduced in system, overtime denied, last check withheld',
    accent: 'rgba(239,68,68,0.2)',
    accentText: '#fca5a5',
  },
  {
    title: 'WARN Act Violations',
    description: 'Companies with 100+ employees must give 60 days notice before mass layoffs. Failure means up to 60 days back pay.',
    example: 'Mass layoff with no advance notice from large employer',
    accent: 'rgba(59,130,246,0.25)',
    accentText: '#93c5fd',
  },
  {
    title: 'Custom Situation',
    description: "Your situation doesn't fit neatly into one category. Describe what happened — LawIQ will identify your strongest claims.",
    example: 'Retaliation, contract breach, or multiple overlapping violations',
    accent: 'rgba(255,255,255,0.08)',
    accentText: 'var(--text-3)',
  },
];

export default function UseCases() {
  return (
    <section className="py-20 sm:py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-light mb-4" style={{ color: 'var(--text-1)' }}>Situations We Cover</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-2)' }}>
            LawIQ is built for employment termination disputes — the situations where employers count on you not knowing your rights.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <div key={c.title} className="glass-card rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01]">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold mb-4" style={{ background: c.accent, color: c.accentText }}>
                {c.title}
              </span>
              <p className="leading-relaxed mb-3" style={{ color: 'var(--text-2)' }}>{c.description}</p>
              <p className="text-xs italic" style={{ color: 'var(--text-3)' }}>{c.example}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link href="/cases/new" className="btn btn-primary text-base gap-2">
            Start My Case — It&apos;s Free
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="mt-3 text-sm" style={{ color: 'var(--text-3)' }}>No credit card. No attorney needed. Just answers.</p>
        </div>
      </div>
    </section>
  );
}
