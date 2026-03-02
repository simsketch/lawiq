'use client';

import type { FormData } from './WizardShell';

interface Props {
  form: FormData;
  update: (patch: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step4Narrative({ form, update, onNext, onBack }: Props) {
  return (
    <div className="glass-card rounded-2xl p-8 animate-fade-up">
      <div className="mb-8">
        <h2 className="font-display text-3xl font-light mb-2" style={{ color: 'var(--text-1)' }}>Your Story</h2>
        <p style={{ color: 'var(--text-2)' }}>
          Tell us what happened in your own words. This helps personalize your demand letter.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="form-label">
            What happened? <span className="normal-case font-normal" style={{ color: 'var(--text-4)' }}>(optional but recommended)</span>
          </label>
          <textarea
            rows={7}
            value={form.narrative}
            onChange={(e) => update({ narrative: e.target.value })}
            placeholder="E.g., I was a loyal employee for 16 years, consistently received excellent performance reviews, and was never given any warning. I was called into HR on a Tuesday and told my position was being 'eliminated.' Two weeks later I found out younger colleagues were not laid off and my role was quietly backfilled..."
            className="glass-input"
          />
          <p className="mt-1.5 text-xs" style={{ color: 'var(--text-3)' }}>
            Include anything that felt unfair or suspicious. The AI will use this to write a stronger letter.
          </p>
        </div>

        <div>
          <label className="form-label">
            Who should the letter be addressed to? <span className="normal-case font-normal" style={{ color: 'var(--text-4)' }}>(optional)</span>
          </label>
          <input
            type="text"
            value={form.emailTo}
            onChange={(e) => update({ emailTo: e.target.value })}
            placeholder="HR Director, Legal Department, or a specific name"
            className="glass-input"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button onClick={onBack} className="btn btn-glass">← Back</button>
        <button onClick={onNext} className="btn btn-primary">Continue →</button>
      </div>
    </div>
  );
}
