const steps = [
  {
    number: '01',
    title: 'Tell Us What Happened',
    description: 'Enter your employment details, what you were offered, and what happened. Takes about 5 minutes.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'We Calculate Your Entitlements',
    description: "LawIQ applies standard employment law baselines to determine severance, benefits, and potential wage claims — showing you exactly where there's a shortfall.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.616 4.5 4.983V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.983c0-1.367-.807-2.283-1.907-2.41A41.146 41.146 0 0012 2.25z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Get a Demand Letter, Ready to Send',
    description: 'Review the calculations, adjust your demands, then generate a professional demand letter — firm, legally-aware, and ready to send directly to HR or Legal.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-light mb-4" style={{ color: 'var(--text-1)' }}>How It Works</h2>
          <p className="text-lg" style={{ color: 'var(--text-2)' }}>Three steps from intake to a demand that gets results.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.number} className={`glass-card rounded-2xl p-8 animate-fade-up delay-${(i + 1) * 200}`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: 'rgba(59,130,246,0.12)', color: '#93c5fd' }}>
                  {step.icon}
                </div>
                <span className="text-5xl font-black" style={{ color: 'var(--text-4)' }}>{step.number}</span>
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-1)' }}>{step.title}</h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-2)' }}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
