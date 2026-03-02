'use client';

import { calculateExpectedSeverance, calculateExpectedBenefits, hasAdea } from '@/lib/calculations';
import type { FormData } from './WizardShell';

interface Props {
  form: FormData;
  update: (patch: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  onGenerate: () => void;
  submitting: boolean;
}

export default function Step5ReviewDemands({ form, update, onBack, onGenerate, submitting }: Props) {
  const years = parseFloat(form.yearsEmployed) || 0;
  const expectedSev = calculateExpectedSeverance(years);
  const expectedBen = calculateExpectedBenefits(years);
  const offeredSev = parseFloat(form.severanceWeeksOffered) || 0;
  const offeredBen = parseFloat(form.benefitsWeeksOffered) || 0;
  const age = parseInt(form.ageAtTermination) || 0;
  const adeaFlag = hasAdea(age);

  const updateDemands = (patch: Partial<FormData['finalDemands']>) => {
    update({ finalDemands: { ...form.finalDemands, ...patch } });
  };

  return (
    <div className="glass-card rounded-2xl p-8 animate-fade-up">
      <div className="mb-8">
        <h2 className="font-display text-3xl font-light mb-2" style={{ color: 'var(--text-1)' }}>Review Your Demands</h2>
        <p style={{ color: 'var(--text-2)' }}>
          We&apos;ve calculated what you&apos;re likely owed. Adjust the amounts if needed, then generate your demand letter.
        </p>
      </div>

      {/* Summary */}
      <div className="mb-6 rounded-xl overflow-hidden" style={{ border: '1px solid var(--glass-border)' }}>
        <div className="px-5 py-4" style={{ borderBottom: '1px solid var(--glass-border)' }}>
          <h3 className="form-label mb-3">Situation Summary</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span style={{ color: 'var(--text-3)' }}>Company:</span>{' '}
              <span className="font-medium" style={{ color: 'var(--text-1)' }}>{form.companyName || '—'}</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-3)' }}>Years employed:</span>{' '}
              <span className="font-medium" style={{ color: 'var(--text-1)' }}>{years}</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-3)' }}>Severance offered:</span>{' '}
              <span className="font-medium" style={{ color: offeredSev < expectedSev ? '#f87171' : '#4ade80' }}>
                {offeredSev} wks (expected {expectedSev})
              </span>
            </div>
            <div>
              <span style={{ color: 'var(--text-3)' }}>Benefits offered:</span>{' '}
              <span className="font-medium" style={{ color: offeredBen < expectedBen ? '#f87171' : '#4ade80' }}>
                {offeredBen} wks (expected {expectedBen})
              </span>
            </div>
          </div>
          {adeaFlag && (
            <div className="mt-3 flex items-center gap-2 text-xs rounded-lg px-3 py-2" style={{ background: 'rgba(245,158,11,0.1)', color: '#fcd34d' }}>
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              ADEA applies (age {age} at termination)
            </div>
          )}
          {form.hasWageConcerns && (
            <div className="mt-2 flex items-center gap-2 text-xs rounded-lg px-3 py-2" style={{ background: 'rgba(239,68,68,0.1)', color: '#fca5a5' }}>
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              Wage concerns flagged — will be included in demand
            </div>
          )}
        </div>
      </div>

      {/* Adjustable demands */}
      <div className="space-y-4">
        <h3 className="form-label">Adjust Your Demands</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Demand: Severance weeks</label>
            <input
              type="number"
              min="0"
              value={form.finalDemands.severanceWeeks}
              onChange={(e) => updateDemands({ severanceWeeks: parseInt(e.target.value) || 0 })}
              className="glass-input"
            />
            <p className="mt-1 text-xs" style={{ color: 'var(--text-3)' }}>Suggested: {expectedSev} weeks</p>
          </div>
          <div>
            <label className="form-label">Demand: Benefits weeks</label>
            <input
              type="number"
              min="0"
              value={form.finalDemands.benefitsWeeks}
              onChange={(e) => updateDemands({ benefitsWeeks: parseInt(e.target.value) || 0 })}
              className="glass-input"
            />
            <p className="mt-1 text-xs" style={{ color: 'var(--text-3)' }}>Suggested: {expectedBen} weeks</p>
          </div>
        </div>

        <div>
          <label className="form-label">
            Back pay demand <span className="normal-case font-normal" style={{ color: 'var(--text-4)' }}>(optional)</span>
          </label>
          <input
            type="text"
            value={form.finalDemands.backPay}
            onChange={(e) => updateDemands({ backPay: e.target.value })}
            placeholder="E.g., $5,000 in unpaid overtime"
            className="glass-input"
          />
        </div>

        <div>
          <label className="form-label">
            Other demands <span className="normal-case font-normal" style={{ color: 'var(--text-4)' }}>(optional)</span>
          </label>
          <input
            type="text"
            value={form.finalDemands.other}
            onChange={(e) => updateDemands({ other: e.target.value })}
            placeholder="E.g., written apology, reference letter, equity vesting"
            className="glass-input"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <button onClick={onBack} className="btn btn-glass">← Back</button>
        <button onClick={onGenerate} disabled={submitting} className="btn btn-primary gap-2">
          {submitting ? (
            <>
              <svg className="w-4 h-4 animate-spin-slow" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Creating case...
            </>
          ) : (
            <>
              Generate Demand Letter
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
