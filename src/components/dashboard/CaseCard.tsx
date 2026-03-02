import Link from 'next/link';
import type { Case } from '@/db/schema';

const statusConfig = {
  complete: { label: 'Ready', className: 'badge-ready' },
  analyzing: { label: 'Generating…', className: 'badge-generating' },
  draft: { label: 'Draft', className: 'badge-draft' },
};

interface Props {
  c: Case;
}

export default function CaseCard({ c }: Props) {
  const cfg = statusConfig[c.status as keyof typeof statusConfig] ?? statusConfig.draft;

  return (
    <Link
      href={`/cases/${c.id}`}
      className="glass-card block rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold truncate" style={{ color: 'var(--text-1)' }}>
            {c.companyName ?? 'Untitled Case'}
          </h3>
          {c.jobTitle && (
            <p className="mt-0.5 text-sm truncate" style={{ color: 'var(--text-3)' }}>{c.jobTitle}</p>
          )}
        </div>
        <span className={`badge flex-shrink-0 ${cfg.className}`}>{cfg.label}</span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
        {c.yearsEmployed && (
          <div>
            <p className="text-xs" style={{ color: 'var(--text-4)' }}>Tenure</p>
            <p className="font-medium" style={{ color: 'var(--text-1)' }}>{c.yearsEmployed} yrs</p>
          </div>
        )}
        {c.severanceWeeksOffered && (
          <div>
            <p className="text-xs" style={{ color: 'var(--text-4)' }}>Sev. offered</p>
            <p className="font-medium" style={{ color: 'var(--text-1)' }}>{c.severanceWeeksOffered} wks</p>
          </div>
        )}
        {c.severanceWeeksExpected && (
          <div>
            <p className="text-xs" style={{ color: 'var(--text-4)' }}>Sev. expected</p>
            <p className="font-medium" style={{
              color: parseFloat(String(c.severanceWeeksOffered ?? '0')) < parseFloat(String(c.severanceWeeksExpected))
                ? '#f87171'
                : '#4ade80',
            }}>
              {c.severanceWeeksExpected} wks
            </p>
          </div>
        )}
      </div>

      <p className="mt-4 text-xs" style={{ color: 'var(--text-4)' }}>
        {c.createdAt ? new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
      </p>
    </Link>
  );
}
