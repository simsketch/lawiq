'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Step1Employment from './Step1Employment';
import Step2Severance from './Step2Severance';
import Step3Wages from './Step3Wages';
import Step4Narrative from './Step4Narrative';
import Step5ReviewDemands from './Step5ReviewDemands';
import { calculateExpectedSeverance, calculateExpectedBenefits } from '@/lib/calculations';
import LogoMark from '@/components/LogoMark';

export interface FormData {
  // Step 1
  companyName: string;
  jobTitle: string;
  yearsEmployed: string;
  ageAtTermination: string;
  terminationReason: string;
  // Step 2
  severanceWeeksOffered: string;
  benefitsWeeksOffered: string;
  // Step 3
  hasWageConcerns: boolean;
  wageConcernsDescription: string;
  // Step 4
  narrative: string;
  // Step 5
  finalDemands: {
    severanceWeeks: number;
    benefitsWeeks: number;
    backPay: string;
    other: string;
  };
  emailTo: string;
}

const INITIAL_FORM: FormData = {
  companyName: '',
  jobTitle: '',
  yearsEmployed: '',
  ageAtTermination: '',
  terminationReason: '',
  severanceWeeksOffered: '',
  benefitsWeeksOffered: '',
  hasWageConcerns: false,
  wageConcernsDescription: '',
  narrative: '',
  finalDemands: {
    severanceWeeks: 0,
    benefitsWeeks: 0,
    backPay: '',
    other: '',
  },
  emailTo: '',
};

const STEPS = [
  'Employment',
  'Severance',
  'Wages',
  'Your Story',
  'Review & Generate',
];

export default function WizardShell() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const update = (patch: Partial<FormData>) => setForm((f) => ({ ...f, ...patch }));

  const next = () => {
    if (step === 2) {
      // Auto-fill expected values and set default demands
      const years = parseFloat(form.yearsEmployed) || 0;
      const expectedSev = calculateExpectedSeverance(years);
      const expectedBen = calculateExpectedBenefits(years);
      update({
        finalDemands: {
          ...form.finalDemands,
          severanceWeeks: expectedSev,
          benefitsWeeks: expectedBen,
        },
      });
    }
    setStep((s) => Math.min(s + 1, STEPS.length));
  };

  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleGenerate = async () => {
    setSubmitting(true);
    try {
      const years = parseFloat(form.yearsEmployed) || 0;
      const res = await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          severanceWeeksExpected: String(calculateExpectedSeverance(years)),
          benefitsWeeksExpected: String(calculateExpectedBenefits(years)),
        }),
      });
      if (!res.ok) throw new Error('Failed to create case');
      const { id } = await res.json();
      router.push(`/cases/${id}`);
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  const stepProps = { form, update, onNext: next, onBack: back };

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--bg-base)' }}>
      <div className="orb-field">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="orb orb-c" />
      </div>

      {/* Header */}
      <div className="glass-nav sticky top-0 z-50 px-6 py-4">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center gap-2.5 mb-4">
            <LogoMark size={28} />
            <span className="font-bold text-white">LawIQ</span>
          </div>
          {/* Progress bar */}
          <div className="flex items-center gap-2">
            {STEPS.map((label, i) => {
              const num = i + 1;
              const isComplete = num < step;
              const isCurrent = num === step;
              return (
                <div key={label} className="flex items-center gap-2 flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1 min-w-0">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${isCurrent ? 'ring-2 ring-blue-500' : ''}`}
                      style={{
                        background: isComplete
                          ? 'linear-gradient(135deg, #2563eb, #4f46e5)'
                          : isCurrent
                          ? 'rgba(59,130,246,0.15)'
                          : 'rgba(255,255,255,0.06)',
                        color: isComplete ? '#fff' : isCurrent ? '#93c5fd' : 'var(--text-4)',
                      }}
                    >
                      {isComplete ? '✓' : num}
                    </div>
                    <span className={`text-xs hidden sm:block truncate ${isCurrent ? 'font-medium' : ''}`} style={{ color: isCurrent ? '#93c5fd' : 'var(--text-4)' }}>
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="h-px flex-1 mt-[-14px] rounded" style={{ background: num < step ? 'linear-gradient(90deg, #2563eb, #4f46e5)' : 'var(--glass-border)' }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="relative z-10 mx-auto max-w-2xl px-6 py-10">
        {step === 1 && <Step1Employment {...stepProps} />}
        {step === 2 && <Step2Severance {...stepProps} />}
        {step === 3 && <Step3Wages {...stepProps} />}
        {step === 4 && <Step4Narrative {...stepProps} />}
        {step === 5 && (
          <Step5ReviewDemands
            {...stepProps}
            onGenerate={handleGenerate}
            submitting={submitting}
          />
        )}
      </div>
    </div>
  );
}
