import type { Case } from '@/db/schema';

interface Props {
  c: Case;
}

export default function CaseSidebar({ c }: Props) {
  const demands = c.finalDemands as {
    severanceWeeks?: number;
    benefitsWeeks?: number;
    backPay?: string;
    other?: string;
  } | null;

  const rows = [
    { label: 'Company', value: c.companyName },
    { label: 'Job Title', value: c.jobTitle },
    { label: 'Years Employed', value: c.yearsEmployed },
    { label: 'Age at Termination', value: c.ageAtTermination },
    { label: 'Termination Reason', value: c.terminationReason },
    { label: 'Severance Offered', value: c.severanceWeeksOffered ? `${c.severanceWeeksOffered} weeks` : null },
    { label: 'Severance Expected', value: c.severanceWeeksExpected ? `${c.severanceWeeksExpected} weeks` : null },
    { label: 'Benefits Offered', value: c.benefitsWeeksOffered ? `${c.benefitsWeeksOffered} weeks` : null },
    { label: 'Benefits Expected', value: c.benefitsWeeksExpected ? `${c.benefitsWeeksExpected} weeks` : null },
  ].filter((r) => r.value != null);

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-700">Case Details</h3>
      </div>
      <div className="divide-y divide-gray-50">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex justify-between px-5 py-3 text-sm">
            <span className="text-gray-500">{label}</span>
            <span className="font-medium text-gray-900 text-right ml-4 max-w-[160px] truncate">{String(value)}</span>
          </div>
        ))}
      </div>

      {demands && (
        <>
          <div className="px-5 py-4 border-t border-b border-gray-100 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-700">Your Demands</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {demands.severanceWeeks != null && (
              <div className="flex justify-between px-5 py-3 text-sm">
                <span className="text-gray-500">Severance</span>
                <span className="font-medium text-blue-700">{demands.severanceWeeks} weeks</span>
              </div>
            )}
            {demands.benefitsWeeks != null && (
              <div className="flex justify-between px-5 py-3 text-sm">
                <span className="text-gray-500">Benefits</span>
                <span className="font-medium text-blue-700">{demands.benefitsWeeks} weeks</span>
              </div>
            )}
            {demands.backPay && (
              <div className="flex justify-between px-5 py-3 text-sm">
                <span className="text-gray-500">Back Pay</span>
                <span className="font-medium text-blue-700">{demands.backPay}</span>
              </div>
            )}
            {demands.other && (
              <div className="flex justify-between px-5 py-3 text-sm">
                <span className="text-gray-500">Other</span>
                <span className="font-medium text-blue-700">{demands.other}</span>
              </div>
            )}
          </div>
        </>
      )}

      {c.hasWageConcerns && (
        <div className="px-5 py-3 border-t border-gray-100 bg-amber-50">
          <p className="text-xs text-amber-700 font-medium">⚠ Wage concerns included in demand</p>
        </div>
      )}
    </div>
  );
}
