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
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Wage Issues</h2>
        <p className="mt-2 text-gray-600">
          Were there any problems with how your time or pay was handled?
        </p>
      </div>

      <div className="space-y-5">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-start gap-4">
            <button
              role="checkbox"
              aria-checked={form.hasWageConcerns}
              onClick={() => update({ hasWageConcerns: !form.hasWageConcerns })}
              className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition ${
                form.hasWageConcerns
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-gray-300 bg-white'
              }`}
            >
              {form.hasWageConcerns && (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <div>
              <p className="font-medium text-gray-900">I have wage or timecard concerns</p>
              <p className="text-sm text-gray-500 mt-1">
                Manipulated hours, denied overtime, missing final paycheck, or other pay discrepancies.
              </p>
            </div>
          </div>
        </div>

        {form.hasWageConcerns && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Describe the wage issue
            </label>
            <textarea
              rows={4}
              value={form.wageConcernsDescription}
              onChange={(e) => update({ wageConcernsDescription: e.target.value })}
              placeholder="E.g., My manager reduced my hours in the system, I was regularly asked to work off the clock, my final paycheck didn't include accrued PTO..."
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            />
          </div>
        )}

        {!form.hasWageConcerns && (
          <p className="text-sm text-gray-500 text-center py-4">
            No wage issues? That's fine — most cases focus on severance shortfalls.
          </p>
        )}
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
