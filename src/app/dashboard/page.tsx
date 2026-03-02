import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { cases } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import CaseCard from '@/components/dashboard/CaseCard';
import OrbBackground from '@/components/OrbBackground';
import LogoMark from '@/components/LogoMark';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const userCases = await db
    .select()
    .from(cases)
    .where(eq(cases.userId, userId))
    .orderBy(desc(cases.createdAt));

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <OrbBackground />

      {/* Nav */}
      <nav className="glass-nav sticky top-0 z-50 px-6 py-4">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <LogoMark size={32} />
            <span className="font-bold text-white text-lg tracking-tight">LawIQ</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/cases/new" className="btn btn-primary" style={{ fontSize: '0.875rem', padding: '0.5rem 1.25rem' }}>
              + New Case
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-light" style={{ color: 'var(--text-1)' }}>My Cases</h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--text-3)' }}>
            {userCases.length === 0
              ? 'No cases yet — start your first one below.'
              : `${userCases.length} case${userCases.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {userCases.length === 0 ? (
          <div className="glass-card flex flex-col items-center justify-center rounded-2xl py-24 text-center">
            <svg className="w-12 h-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} style={{ color: 'var(--text-4)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
            </svg>
            <p className="font-medium mb-2" style={{ color: 'var(--text-2)' }}>No cases yet</p>
            <p className="text-sm mb-6" style={{ color: 'var(--text-3)' }}>Start by entering your situation — takes about 5 minutes.</p>
            <Link href="/cases/new" className="btn btn-primary">
              Start My First Case
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {userCases.map((c) => (
              <CaseCard key={c.id} c={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
