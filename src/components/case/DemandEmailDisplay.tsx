'use client';

import { useState, useRef } from 'react';

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
    <div className="space-y-5">
      {/* Status + controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="font-display text-2xl font-light" style={{ color: 'var(--text-1)' }}>Demand Letter</h2>
          {status === 'complete' && (
            <span className="badge badge-ready">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              Ready
            </span>
          )}
          {status === 'analyzing' && (
            <span className="badge badge-generating">
              <svg className="w-3 h-3 animate-spin-slow" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating...
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {status === 'complete' && email && (
            <button onClick={copyToClipboard} className="btn btn-glass" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: '#4ade80' }}>
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
            className="btn btn-primary"
            style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
          >
            {generating ? (
              <>
                <svg className="w-4 h-4 animate-spin-slow" fill="none" viewBox="0 0 24 24">
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
        <div className="rounded-xl p-4 text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}>
          {error}
        </div>
      )}

      {/* Letter display */}
      {(email || generating) ? (
        <div className="glass-card rounded-2xl overflow-hidden">
          <pre
            ref={textareaRef}
            className="w-full p-6 text-sm leading-relaxed whitespace-pre-wrap font-sans min-h-[400px] max-h-[600px] overflow-y-auto"
            style={{ color: 'var(--text-1)', fontFamily: 'var(--font-body), system-ui, sans-serif' }}
          >
            {email}
            {generating && (
              <span className="inline-block w-1.5 h-4 ml-0.5 align-text-bottom animate-blink" style={{ background: '#60a5fa' }} />
            )}
          </pre>
        </div>
      ) : (
        <div className="glass-card flex flex-col items-center justify-center rounded-2xl py-20 text-center">
          <svg className="w-10 h-10 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} style={{ color: 'var(--text-4)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          <p className="font-medium mb-1" style={{ color: 'var(--text-2)' }}>Your demand letter will appear here</p>
          <p className="text-sm" style={{ color: 'var(--text-3)' }}>Click &ldquo;Generate Letter&rdquo; to create your personalized demand</p>
        </div>
      )}
    </div>
  );
}
