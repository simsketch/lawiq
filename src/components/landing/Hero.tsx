import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative pt-24 pb-32 sm:pt-32 sm:pb-40 px-6 text-center">
      <div className="mx-auto max-w-4xl">
        {/* Badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium mb-10" style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)', color: '#93c5fd' }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-blue-400" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
          </span>
          Employment Rights Calculator
        </div>

        <h1 className="animate-fade-up delay-100 font-display text-5xl sm:text-7xl font-light tracking-tight leading-[1.1] mb-8" style={{ color: 'var(--text-1)' }}>
          Your employer may owe you{' '}
          <span className="text-gradient font-semibold">
            more than they offered.
          </span>
        </h1>

        <p className="animate-fade-up delay-200 text-xl leading-relaxed mb-12 max-w-2xl mx-auto" style={{ color: 'var(--text-2)' }}>
          LawIQ calculates what you&apos;re legally entitled to — severance, benefits, back pay — and generates a firm, professional demand letter you can send directly to HR. No attorney required.
        </p>

        <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/cases/new" className="btn btn-primary text-base gap-2">
            Calculate What I&apos;m Owed
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <a href="#how-it-works" className="btn btn-glass text-base">
            See How It Works
          </a>
        </div>

        <p className="animate-fade-up delay-400 mt-8 text-sm" style={{ color: 'var(--text-3)' }}>
          Covers severance shortfalls · age discrimination · unpaid wages · WARN Act violations
        </p>
      </div>
    </section>
  );
}
