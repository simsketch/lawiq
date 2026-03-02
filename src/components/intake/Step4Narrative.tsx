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
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Your Story</h2>
        <p className="mt-2 text-gray-600">
          Tell us what happened in your own words. This helps personalize your demand letter.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            What happened? <span className="text-gray-400 font-normal">(optional but recommended)</span>
          </label>
          <textarea
            rows={7}
            value={form.narrative}
            onChange={(e) => update({ narrative: e.target.value })}
            placeholder="E.g., I was a loyal employee for 16 years, consistently received excellent performance reviews, and was never given any warning. I was called into HR on a Tuesday and told my position was being 'eliminated.' Two weeks later I found out younger colleagues were not laid off and my role was quietly backfilled..."
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
          />
          <p className="mt-1.5 text-xs text-gray-500">
            Include anything that felt unfair or suspicious. The AI will use this to write a stronger letter.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Who should the letter be addressed to? <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={form.emailTo}
            onChange={(e) => update({ emailTo: e.target.value })}
            placeholder="HR Director, Legal Department, or a specific name"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button onClick={onBack} className="rounded-xl border border-gray-200 px-6 py-3 font-medium text-gray-600 transition hover:bg-gray-50">
          ← Back
        </button>
        <button
          onClick={onNext}
          className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
