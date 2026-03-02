import { auth } from '@clerk/nextjs/server';
import { notFound, redirect } from 'next/navigation';
import { db } from '@/db';
import { cases } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import DemandEmailDisplay from '@/components/case/DemandEmailDisplay';
import CaseSidebar from '@/components/case/CaseSidebar';
import OrbBackground from '@/components/OrbBackground';
import LogoMark from '@/components/LogoMark';
import Link from 'next/link';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CaseDetailPage({ params }: Props) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const { id } = await params;

  const [c] = await db
    .select()
    .from(cases)
    .where(and(eq(cases.id, id), eq(cases.userId, userId)));

  if (!c) notFound();

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <OrbBackground />

      {/* Nav */}
      <nav className="glass-nav sticky top-0 z-50 px-6 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 text-sm transition hover:opacity-100" style={{ color: 'var(--text-3)' }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Dashboard
            </Link>
            <span style={{ color: 'var(--text-4)' }}>/</span>
            <div className="flex items-center gap-2">
              <LogoMark size={28} />
              <span className="font-bold text-white">LawIQ</span>
            </div>
          </div>
          <Link href="/cases/new" className="btn btn-primary" style={{ fontSize: '0.875rem', padding: '0.5rem 1.25rem' }}>
            New Case
          </Link>
        </div>
      </nav>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-light" style={{ color: 'var(--text-1)' }}>
            Case: {c.companyName ?? 'Untitled'}
          </h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--text-3)' }}>
            Created {c.createdAt ? new Date(c.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main: email */}
          <div className="min-w-0">
            <DemandEmailDisplay
              caseId={c.id}
              initialEmail={c.generatedEmail}
              initialStatus={c.status}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <CaseSidebar c={c} />
          </div>
        </div>
      </div>
    </div>
  );
}
