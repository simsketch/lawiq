'use client';

import type { FormData } from './WizardShell';

interface Props {
  form: FormData;
  update: (patch: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step1Employment({ form, update, onNext }: Props) {
  const canContinue = form.companyName && form.yearsEmployed && form.ageAtTermination && form.terminationReason;

  return (
    <div className="glass-card rounded-2xl p-8 animate-fade-up">
      <div className="mb-8">
        <h2 className="font-display text-3xl font-light mb-2" style={{ color: 'var(--text-1)' }}>Your Employment</h2>
        <p style={{ color: 'var(--text-2)' }}>Tell us about your job and how it ended.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="form-label">Company name *</label>
          <input
            type="text"
            value={form.companyName}
            onChange={(e) => update({ companyName: e.target.value })}
            placeholder="Acme Corporation"
            className="glass-input"
          />
        </div>

        <div>
          <label className="form-label">Your job title</label>
          <input
            type="text"
            value={form.jobTitle}
            onChange={(e) => update({ jobTitle: e.target.value })}
            placeholder="Senior Engineer"
            className="glass-input"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Years employed *</label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={form.yearsEmployed}
              onChange={(e) => update({ yearsEmployed: e.target.value })}
              placeholder="16"
              className="glass-input"
            />
          </div>
          <div>
            <label className="form-label">Age at termination *</label>
            <input
              type="number"
              min="18"
              max="100"
              value={form.ageAtTermination}
              onChange={(e) => update({ ageAtTermination: e.target.value })}
              placeholder="58"
              className="glass-input"
            />
          </div>
        </div>

        <div>
          <label className="form-label">Reason given for termination *</label>
          <select
            value={form.terminationReason}
            onChange={(e) => update({ terminationReason: e.target.value })}
            className="glass-input"
          >
            <option value="">Select a reason...</option>
            <option value="layoff / reduction in force">Layoff / Reduction in Force</option>
            <option value="restructuring">Restructuring</option>
            <option value="performance">Performance</option>
            <option value="position eliminated">Position Eliminated</option>
            <option value="mutual separation">Mutual Separation</option>
            <option value="no reason given">No Reason Given</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button onClick={onNext} disabled={!canContinue} className="btn btn-primary">
          Continue →
        </button>
      </div>
    </div>
  );
}
