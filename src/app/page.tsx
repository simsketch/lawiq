import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import UseCases from '@/components/landing/UseCases';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="mx-auto max-w-6xl px-6 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
              LQ
            </div>
            <span className="font-bold text-gray-900 text-lg">LawIQ</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
            >
              Sign In
            </Link>
            <Link
              href="/cases/new"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <Hero />
      <HowItWorks />
      <UseCases />

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-600 text-white font-bold text-xs">
              LQ
            </div>
            <span className="font-semibold text-white">LawIQ</span>
          </div>
          <p className="text-sm text-center">
            LawIQ provides information and tools, not legal advice. For complex situations, consult a licensed attorney.
          </p>
        </div>
      </footer>
    </div>
  );
}
