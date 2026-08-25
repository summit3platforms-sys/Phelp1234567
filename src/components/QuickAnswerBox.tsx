import React from 'react';

interface QuickAnswerBoxProps {
  title: string;
  brandName?: string | null;
  errorCode?: string | null;
  summary?: string | null;
  quickSteps?: string[] | null;
  timeToFix?: string | null;
  difficulty?: string | null;
}

export default function QuickAnswerBox({
  title,
  brandName,
  errorCode,
  summary,
  quickSteps,
  timeToFix = '10-15 mins',
  difficulty = 'Intermediate',
}: QuickAnswerBoxProps) {
  // If no custom summary is provided, generate a crisp, highly authoritative default answer
  const displaySummary = summary || `To fix ${title}, inspect the primary sensor or component, disconnect AC power for 60 seconds to reset logic board capacitors, clean contact terminals or rollers with 99% isopropyl alcohol, and restart in normal mode.`;

  return (
    <div
      className="quick-answer-box"
      style={{
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        border: '1.5px solid #38bdf8',
        borderRadius: '10px',
        padding: '1.25rem 1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 2px 8px rgba(14, 165, 233, 0.08)',
        fontFamily: 'inherit',
      }}
    >
      {/* Header Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.2rem' }}>⚡</span>
          <h2
            style={{
              margin: 0,
              fontSize: '1rem',
              fontWeight: '700',
              color: '#0369a1',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            Quick Fix / Direct Diagnostic Summary
          </h2>
        </div>
        
        {/* Meta badges for GEO Signals */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {errorCode && (
            <span
              style={{
                background: '#0284c7',
                color: '#ffffff',
                padding: '0.2rem 0.6rem',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: '700',
                letterSpacing: '0.03em',
              }}
            >
              CODE: {errorCode}
            </span>
          )}
          <span
            style={{
              background: '#e0f2fe',
              color: '#0369a1',
              border: '1px solid #bae6fd',
              padding: '0.2rem 0.5rem',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: '600',
            }}
          >
            ⏱️ {timeToFix || '15 mins'}
          </span>
          <span
            style={{
              background: '#e0f2fe',
              color: '#0369a1',
              border: '1px solid #bae6fd',
              padding: '0.2rem 0.5rem',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: '600',
            }}
          >
            🔧 {difficulty || 'DIY Fix'}
          </span>
        </div>
      </div>

      {/* Direct Answer Paragraph - Speakable Selector Target */}
      <p
        className="direct-answer-summary"
        style={{
          margin: '0 0 0.75rem 0',
          fontSize: '0.975rem',
          lineHeight: '1.6',
          color: '#0f172a',
          fontWeight: '500',
        }}
      >
        {displaySummary}
      </p>

      {/* 30-Second Actionable Bullet Steps for RAG Extractor */}
      {quickSteps && quickSteps.length > 0 && (
        <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #bae6fd' }}>
          <p style={{ margin: '0 0 0.4rem 0', fontSize: '0.85rem', fontWeight: '700', color: '#0369a1' }}>
            FAST RESOLUTION WORKFLOW:
          </p>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#1e293b', fontSize: '0.9rem', lineHeight: '1.5' }}>
            {quickSteps.map((step, idx) => (
              <li key={idx} style={{ marginBottom: '0.25rem' }}>
                {step}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
