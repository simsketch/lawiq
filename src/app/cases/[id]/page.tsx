import { auth } from '@clerk/nextjs/server';
import { notFound, redirect } from 'next/navigation';
import { db } from '@/db';
import { cases } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import DemandEmailDisplay from '@/components/case/DemandEmailDisplay';
import CaseSidebar from '@/components/case/CaseSidebar';
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
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Dashboard
            </Link>
            <span className="text-gray-300">/</span>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs">LQ</div>
              <span className="font-bold text-gray-900">LawIQ</span>
            </div>
          </div>
          <Link
            href="/cases/new"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            New Case
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Case: {c.companyName ?? 'Untitled'}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
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
