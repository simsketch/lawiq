'use client';

import { calculateExpectedSeverance, calculateExpectedBenefits, hasAdea } from '@/lib/calculations';
import type { FormData } from './WizardShell';

interface Props {
  form: FormData;
  update: (patch: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2Severance({ form, update, onNext, onBack }: Props) {
  const years = parseFloat(form.yearsEmployed) || 0;
  const expectedSev = calculateExpectedSeverance(years);
  const expectedBen = calculateExpectedBenefits(years);
  const offeredSev = parseFloat(form.severanceWeeksOffered) || 0;
  const offeredBen = parseFloat(form.benefitsWeeksOffered) || 0;
  const sevShortfall = Math.max(0, expectedSev - offeredSev);
  const benShortfall = Math.max(0, expectedBen - offeredBen);
  const age = parseInt(form.ageAtTermination) || 0;
  const adeaApplies = hasAdea(age);

  const canContinue = form.severanceWeeksOffered !== '' && form.benefitsWeeksOffered !== '';

  return (
    <div className="glass-card rounded-2xl p-8 animate-fade-up">
      <div className="mb-8">
        <h2 className="font-display text-3xl font-light mb-2" style={{ color: 'var(--text-1)' }}>Severance &amp; Benefits</h2>
        <p style={{ color: 'var(--text-2)' }}>What were you offered vs. what you may be entitled to?</p>
      </div>

      {/* Expected values callout */}
      <div className="mb-6 rounded-xl p-5" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)' }}>
        <p className="text-sm font-semibold mb-3" style={{ color: '#93c5fd' }}>
          Based on {years} years at {form.companyName || 'your company'}:
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs mb-0.5" style={{ color: '#60a5fa' }}>Standard severance</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>{expectedSev} <span className="text-sm font-normal" style={{ color: 'var(--text-2)' }}>weeks</span></p>
            <p className="text-xs" style={{ color: 'var(--text-3)' }}>(1 week per year of service)</p>
          </div>
          <div>
            <p className="text-xs mb-0.5" style={{ color: '#60a5fa' }}>Benefits continuation</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>{expectedBen} <span className="text-sm font-normal" style={{ color: 'var(--text-2)' }}>weeks</span></p>
            <p className="text-xs" style={{ color: 'var(--text-3)' }}>(matches severance period)</p>
          </div>
        </div>
        {adeaApplies && (
          <div className="mt-4 flex items-start gap-2 rounded-lg p-3" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)' }}>
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#fbbf24' }}>
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <p className="text-xs" style={{ color: '#fcd34d' }}>
              <strong>ADEA may apply.</strong> You were {age} at termination — workers 40+ have additional age discrimination protections under federal law.
            </p>
          </div>
        )}
      </div>

      <div className="space-y-5">
        <div>
          <label className="form-label">Severance weeks offered *</label>
          <input
            type="number"
            min="0"
            step="0.5"
            value={form.severanceWeeksOffered}
            onChange={(e) => update({ severanceWeeksOffered: e.target.value })}
            placeholder="14"
            className="glass-input"
          />
          {sevShortfall > 0 && form.severanceWeeksOffered && (
            <p className="mt-1.5 text-sm font-medium" style={{ color: '#f87171' }}>
              ↓ {sevShortfall} week{sevShortfall !== 1 ? 's' : ''} below standard
            </p>
          )}
        </div>

        <div>
          <label className="form-label">Benefits continuation weeks offered *</label>
          <input
            type="number"
            min="0"
            step="0.5"
            value={form.benefitsWeeksOffered}
            onChange={(e) => update({ benefitsWeeksOffered: e.target.value })}
            placeholder="12"
            className="glass-input"
          />
          {benShortfall > 0 && form.benefitsWeeksOffered && (
            <p className="mt-1.5 text-sm font-medium" style={{ color: '#f87171' }}>
              ↓ {benShortfall} week{benShortfall !== 1 ? 's' : ''} below standard
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button onClick={onBack} className="btn btn-glass">← Back</button>
        <button onClick={onNext} disabled={!canContinue} className="btn btn-primary">Continue →</button>
      </div>
    </div>
  );
}
