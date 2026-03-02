import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import UseCases from '@/components/landing/UseCases';
import OrbBackground from '@/components/OrbBackground';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <OrbBackground />

      {/* Nav */}
      <nav className="glass-nav sticky top-0 z-50 px-6 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg text-white font-bold text-sm shadow-lg" style={{ background: 'linear-gradient(135deg, #3b82f6, #4f46e5)' }}>
              LQ
            </div>
            <span className="font-bold text-white text-lg tracking-tight">LawIQ</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="text-sm font-medium transition hover:opacity-100"
              style={{ color: 'var(--text-2)' }}
            >
              Sign In
            </Link>
            <Link href="/cases/new" className="btn btn-primary" style={{ fontSize: '0.875rem', padding: '0.5rem 1.25rem' }}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative z-10">
        <Hero />
        <HowItWorks />
        <UseCases />
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-10" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg text-white font-bold text-xs" style={{ background: 'linear-gradient(135deg, #3b82f6, #4f46e5)' }}>
              LQ
            </div>
            <span className="font-semibold text-white">LawIQ</span>
          </div>
          <p className="text-sm text-center" style={{ color: 'var(--text-3)' }}>
            LawIQ provides information and tools, not legal advice. For complex situations, consult a licensed attorney.
          </p>
        </div>
      </footer>
    </div>
  );
}
