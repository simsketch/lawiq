import Link from 'next/link';
import type { Case } from '@/db/schema';

const statusConfig = {
  complete: { label: 'Ready', classes: 'bg-green-50 text-green-700 ring-green-200' },
  analyzing: { label: 'Generating…', classes: 'bg-blue-50 text-blue-700 ring-blue-200' },
  draft: { label: 'Draft', classes: 'bg-gray-100 text-gray-600 ring-gray-200' },
};

interface Props {
  c: Case;
}

export default function CaseCard({ c }: Props) {
  const cfg = statusConfig[c.status as keyof typeof statusConfig] ?? statusConfig.draft;

  return (
    <Link
      href={`/cases/${c.id}`}
      className="block rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {c.companyName ?? 'Untitled Case'}
          </h3>
          {c.jobTitle && (
            <p className="mt-0.5 text-sm text-gray-500 truncate">{c.jobTitle}</p>
          )}
        </div>
        <span className={`flex-shrink-0 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${cfg.classes}`}>
          {cfg.label}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
        {c.yearsEmployed && (
          <div>
            <p className="text-gray-500 text-xs">Tenure</p>
            <p className="font-medium text-gray-900">{c.yearsEmployed} yrs</p>
          </div>
        )}
        {c.severanceWeeksOffered && (
          <div>
            <p className="text-gray-500 text-xs">Sev. offered</p>
            <p className="font-medium text-gray-900">{c.severanceWeeksOffered} wks</p>
          </div>
        )}
        {c.severanceWeeksExpected && (
          <div>
            <p className="text-gray-500 text-xs">Sev. expected</p>
            <p className={`font-medium ${
              parseFloat(String(c.severanceWeeksOffered ?? '0')) < parseFloat(String(c.severanceWeeksExpected))
                ? 'text-red-600'
                : 'text-green-600'
            }`}>
              {c.severanceWeeksExpected} wks
            </p>
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-gray-400">
        {c.createdAt ? new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
      </p>
    </Link>
  );
}
