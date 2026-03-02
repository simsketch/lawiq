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
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="px-5 py-4" style={{ borderBottom: '1px solid var(--glass-border)' }}>
        <h3 className="form-label mb-0">Case Details</h3>
      </div>
      <div>
        {rows.map(({ label, value }) => (
          <div key={label} className="flex justify-between px-5 py-3 text-sm" style={{ borderBottom: '1px solid var(--glass-border)' }}>
            <span style={{ color: 'var(--text-3)' }}>{label}</span>
            <span className="font-medium text-right ml-4 max-w-[160px] truncate" style={{ color: 'var(--text-1)' }}>{String(value)}</span>
          </div>
        ))}
      </div>

      {demands && (
        <>
          <div className="px-5 py-4" style={{ borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
            <h3 className="form-label mb-0">Your Demands</h3>
          </div>
          <div>
            {demands.severanceWeeks != null && (
              <div className="flex justify-between px-5 py-3 text-sm" style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <span style={{ color: 'var(--text-3)' }}>Severance</span>
                <span className="font-medium" style={{ color: '#93c5fd' }}>{demands.severanceWeeks} weeks</span>
              </div>
            )}
            {demands.benefitsWeeks != null && (
              <div className="flex justify-between px-5 py-3 text-sm" style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <span style={{ color: 'var(--text-3)' }}>Benefits</span>
                <span className="font-medium" style={{ color: '#93c5fd' }}>{demands.benefitsWeeks} weeks</span>
              </div>
            )}
            {demands.backPay && (
              <div className="flex justify-between px-5 py-3 text-sm" style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <span style={{ color: 'var(--text-3)' }}>Back Pay</span>
                <span className="font-medium" style={{ color: '#93c5fd' }}>{demands.backPay}</span>
              </div>
            )}
            {demands.other && (
              <div className="flex justify-between px-5 py-3 text-sm" style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <span style={{ color: 'var(--text-3)' }}>Other</span>
                <span className="font-medium" style={{ color: '#93c5fd' }}>{demands.other}</span>
              </div>
            )}
          </div>
        </>
      )}

      {c.hasWageConcerns && (
        <div className="px-5 py-3" style={{ borderTop: '1px solid var(--glass-border)', background: 'rgba(245,158,11,0.08)' }}>
          <p className="text-xs font-medium" style={{ color: '#fcd34d' }}>⚠ Wage concerns included in demand</p>
        </div>
      )}
    </div>
  );
}
