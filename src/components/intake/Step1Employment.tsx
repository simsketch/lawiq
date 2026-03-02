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
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Your Employment</h2>
        <p className="mt-2 text-gray-600">Tell us about your job and how it ended.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Company name *</label>
          <input
            type="text"
            value={form.companyName}
            onChange={(e) => update({ companyName: e.target.value })}
            placeholder="Acme Corporation"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Your job title</label>
          <input
            type="text"
            value={form.jobTitle}
            onChange={(e) => update({ jobTitle: e.target.value })}
            placeholder="Senior Engineer"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Years employed *</label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={form.yearsEmployed}
              onChange={(e) => update({ yearsEmployed: e.target.value })}
              placeholder="16"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Age at termination *</label>
            <input
              type="number"
              min="18"
              max="100"
              value={form.ageAtTermination}
              onChange={(e) => update({ ageAtTermination: e.target.value })}
              placeholder="58"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Reason given for termination *
          </label>
          <select
            value={form.terminationReason}
            onChange={(e) => update({ terminationReason: e.target.value })}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
        <button
          onClick={onNext}
          disabled={!canContinue}
          className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
