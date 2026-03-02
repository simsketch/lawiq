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
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Severance & Benefits</h2>
        <p className="mt-2 text-gray-600">What were you offered vs. what you may be entitled to?</p>
      </div>

      {/* Expected values callout */}
      <div className="mb-6 rounded-xl bg-blue-50 p-5 ring-1 ring-blue-200">
        <p className="text-sm font-semibold text-blue-800 mb-3">
          Based on {years} years at {form.companyName || 'your company'}:
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-blue-600 mb-0.5">Standard severance</p>
            <p className="text-2xl font-bold text-blue-900">{expectedSev} <span className="text-sm font-normal">weeks</span></p>
            <p className="text-xs text-blue-500">(1 week per year of service)</p>
          </div>
          <div>
            <p className="text-xs text-blue-600 mb-0.5">Benefits continuation</p>
            <p className="text-2xl font-bold text-blue-900">{expectedBen} <span className="text-sm font-normal">weeks</span></p>
            <p className="text-xs text-blue-500">(matches severance period)</p>
          </div>
        </div>
        {adeaApplies && (
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 p-3">
            <svg className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-amber-800">
              <strong>ADEA may apply.</strong> You were {age} at termination — workers 40+ have additional age discrimination protections under federal law.
            </p>
          </div>
        )}
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Severance weeks offered *
          </label>
          <input
            type="number"
            min="0"
            step="0.5"
            value={form.severanceWeeksOffered}
            onChange={(e) => update({ severanceWeeksOffered: e.target.value })}
            placeholder="14"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {sevShortfall > 0 && form.severanceWeeksOffered && (
            <p className="mt-1.5 text-sm text-red-600 font-medium">
              ↓ {sevShortfall} week{sevShortfall !== 1 ? 's' : ''} below standard
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Benefits continuation weeks offered *
          </label>
          <input
            type="number"
            min="0"
            step="0.5"
            value={form.benefitsWeeksOffered}
            onChange={(e) => update({ benefitsWeeksOffered: e.target.value })}
            placeholder="12"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {benShortfall > 0 && form.benefitsWeeksOffered && (
            <p className="mt-1.5 text-sm text-red-600 font-medium">
              ↓ {benShortfall} week{benShortfall !== 1 ? 's' : ''} below standard
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button onClick={onBack} className="rounded-xl border border-gray-200 px-6 py-3 font-medium text-gray-600 transition hover:bg-gray-50">
          ← Back
        </button>
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
