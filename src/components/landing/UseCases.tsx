import Link from 'next/link';

const cases = [
  {
    title: 'Severance Shortfall',
    description: 'You were offered less severance than your tenure warrants. Industry standard is 1–2 weeks per year of service.',
    example: '16 years of service → offered 14 weeks → 2+ weeks shortfall',
    color: 'blue',
  },
  {
    title: 'Age Discrimination (ADEA)',
    description: 'Workers 40+ are protected by the Age Discrimination in Employment Act. A pretextual layoff may be actionable.',
    example: 'Long-tenured employee, 40+, terminated under vague "restructuring"',
    color: 'indigo',
  },
  {
    title: 'Benefits Continuation Shortfall',
    description: 'Health, dental, and life insurance continuation (COBRA) should typically mirror your severance period.',
    example: '16 years employed → offered 12 weeks benefits → 4+ weeks gap',
    color: 'violet',
  },
  {
    title: 'Unpaid Wages & Timecard Issues',
    description: 'Manipulated timecards, denied overtime, or unpaid final wages are wage theft — recoverable under federal and state law.',
    example: 'Hours reduced in system, overtime denied, last check withheld',
    color: 'purple',
  },
  {
    title: 'WARN Act Violations',
    description: 'Companies with 100+ employees must give 60 days notice before mass layoffs. Failure means up to 60 days back pay.',
    example: 'Mass layoff with no advance notice from large employer',
    color: 'blue',
  },
  {
    title: 'Custom Situation',
    description: 'Your situation doesn\'t fit neatly into one category. Describe what happened — LawIQ will identify your strongest claims.',
    example: 'Retaliation, contract breach, or multiple overlapping violations',
    color: 'indigo',
  },
];

const colorMap: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-700 ring-blue-200',
  indigo: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
  violet: 'bg-violet-50 text-violet-700 ring-violet-200',
  purple: 'bg-purple-50 text-purple-700 ring-purple-200',
};

export default function UseCases() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Situations We Cover</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            LawIQ is built for employment termination disputes — the situations where employers count on you not knowing your rights.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <div key={c.title} className="rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-100 hover:ring-gray-200 transition">
              <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 mb-4 ${colorMap[c.color]}`}>
                {c.title}
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">{c.description}</p>
              <p className="text-xs text-gray-500 italic">{c.example}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/cases/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
          >
            Start My Case — It's Free
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="mt-3 text-sm text-gray-500">No credit card. No attorney needed. Just answers.</p>
        </div>
      </div>
    </section>
  );
}
