'use client';

import { useState, useEffect, useRef } from 'react';

interface Props {
  caseId: string;
  initialEmail?: string | null;
  initialStatus?: string | null;
}

export default function DemandEmailDisplay({ caseId, initialEmail, initialStatus }: Props) {
  const [email, setEmail] = useState(initialEmail ?? '');
  const [status, setStatus] = useState(initialStatus ?? 'draft');
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLPreElement>(null);

  const generate = async () => {
    setGenerating(true);
    setEmail('');
    setError(null);
    setStatus('analyzing');

    try {
      const res = await fetch(`/api/cases/${caseId}/generate`, { method: 'POST' });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? 'Generation failed');
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        setEmail(buffer);
        // Auto-scroll
        if (textareaRef.current) {
          textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
        }
      }

      setStatus('complete');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('draft');
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Status + controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-gray-900">Demand Letter</h2>
          {status === 'complete' && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-green-200">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Ready
            </span>
          )}
          {status === 'analyzing' && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-200">
              <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating...
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {status === 'complete' && email && (
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Letter
                </>
              )}
            </button>
          )}
          <button
            onClick={generate}
            disabled={generating}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {generating ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating...
              </>
            ) : status === 'complete' ? (
              'Regenerate'
            ) : (
              'Generate Letter'
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Letter display */}
      {(email || generating) ? (
        <div className="relative">
          <pre
            ref={textareaRef}
            className="w-full rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap font-sans min-h-[400px] max-h-[600px] overflow-y-auto shadow-sm"
          >
            {email}
            {generating && (
              <span className="inline-block w-1.5 h-4 bg-blue-500 animate-pulse ml-0.5 align-text-bottom" />
            )}
          </pre>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 py-20 text-center">
          <svg className="w-10 h-10 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          <p className="text-gray-500 font-medium">Your demand letter will appear here</p>
          <p className="text-sm text-gray-400 mt-1">Click "Generate Letter" to create your personalized demand</p>
        </div>
      )}
    </div>
  );
}
