import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-20 pb-24 sm:pt-28 sm:pb-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-full blur-3xl opacity-70" />
      </div>

      <div className="mx-auto max-w-4xl px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 ring-1 ring-blue-200 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          Employment Rights Calculator
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
          Your employer may owe you{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            more than they offered.
          </span>
        </h1>

        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          LawIQ calculates what you're legally entitled to — severance, benefits, back pay — and generates a firm, professional demand letter you can send directly to HR. No attorney required.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/cases/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 hover:shadow-blue-300"
          >
            Calculate What I'm Owed
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50"
          >
            See How It Works
          </a>
        </div>

        {/* Social proof */}
        <p className="mt-8 text-sm text-gray-500">
          Covers severance shortfalls, age discrimination, unpaid wages & WARN Act violations
        </p>
      </div>
    </section>
  );
}
