'use client';

import type { FormData } from './WizardShell';

interface Props {
  form: FormData;
  update: (patch: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step3Wages({ form, update, onNext, onBack }: Props) {
  return (
    <div className="glass-card rounded-2xl p-8 animate-fade-up">
      <div className="mb-8">
        <h2 className="font-display text-3xl font-light mb-2" style={{ color: 'var(--text-1)' }}>Wage Issues</h2>
        <p style={{ color: 'var(--text-2)' }}>
          Were there any problems with how your time or pay was handled?
        </p>
      </div>

      <div className="space-y-5">
        <div className="rounded-xl p-5 cursor-pointer transition-all" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${form.hasWageConcerns ? 'rgba(59,130,246,0.4)' : 'var(--glass-border)'}` }}
          onClick={() => update({ hasWageConcerns: !form.hasWageConcerns })}>
          <div className="flex items-start gap-4">
            <div className={`glass-checkbox mt-0.5 flex-shrink-0 ${form.hasWageConcerns ? 'checked' : ''}`}>
              {form.hasWageConcerns && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <div>
              <p className="font-medium" style={{ color: 'var(--text-1)' }}>I have wage or timecard concerns</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>
                Manipulated hours, denied overtime, missing final paycheck, or other pay discrepancies.
              </p>
            </div>
          </div>
        </div>

        {form.hasWageConcerns && (
          <div>
            <label className="form-label">Describe the wage issue</label>
            <textarea
              rows={4}
              value={form.wageConcernsDescription}
              onChange={(e) => update({ wageConcernsDescription: e.target.value })}
              placeholder="E.g., My manager reduced my hours in the system, I was regularly asked to work off the clock, my final paycheck didn't include accrued PTO..."
              className="glass-input"
            />
          </div>
        )}

        {!form.hasWageConcerns && (
          <p className="text-sm text-center py-4" style={{ color: 'var(--text-3)' }}>
            No wage issues? That&apos;s fine — most cases focus on severance shortfalls.
          </p>
        )}
      </div>

      <div className="mt-8 flex justify-between">
        <button onClick={onBack} className="btn btn-glass">← Back</button>
        <button onClick={onNext} className="btn btn-primary">Continue →</button>
      </div>
    </div>
  );
}
