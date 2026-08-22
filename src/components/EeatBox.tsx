import React from 'react';
import Image from 'next/image';

interface AuthorProps {
  name: string;
  slug: string;
  role: string | null;
  experienceYears: number | null;
  image: string | null;
}

interface EeatBoxProps {
  author: AuthorProps | null;
  reviewer: AuthorProps | null;
  reviewedAt: Date | null;
  difficultyLevel: string | null;
  timeToFix: string | null;
  brandName: string | null;
  printerModel: string | null;
  wordCount: number | null;
}

export default function EeatBox({
  author,
  reviewer,
  reviewedAt,
  difficultyLevel,
  timeToFix,
  brandName,
  printerModel,
  wordCount,
}: EeatBoxProps) {
  // Calculate reading time (assuming 200 words per minute)
  const readingTime = Math.max(1, Math.ceil((wordCount || 500) / 200));

  return (
    <div
      className="eeat-box"
      style={{
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '1.5rem',
        backgroundColor: '#f8fafc',
        marginBottom: '2rem',
        marginTop: '1.5rem',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Header / Trust Statement */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0, marginTop: '2px' }}
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
        <p style={{ margin: 0, fontSize: '0.95rem', color: '#334155', lineHeight: '1.5' }}>
          <strong>About This Guide:</strong> This guide is based on real-world printer troubleshooting experience and is regularly reviewed for accuracy.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        
        {/* Left Column: Author & Reviewer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Author */}
          {author && (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {author.image ? (
                <Image
                  src={author.image}
                  alt={author.name}
                  width={48}
                  height={48}
                  style={{ borderRadius: '50%', objectFit: 'cover', border: '2px solid #e2e8f0' }}
                />
              ) : (
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>
                  {author.name.charAt(0)}
                </div>
              )}
              <div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Written by</p>
                <p style={{ margin: '0.1rem 0', fontWeight: '600', color: '#0f172a' }}>
                  <a href={`/author/${author.slug}`} style={{ color: '#0ea5e9', textDecoration: 'none' }}>
                    {author.name}
                  </a>
                </p>
                {(author.role || author.experienceYears) && (
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                    {author.role} {author.experienceYears ? `• ${author.experienceYears}+ Yrs Exp.` : ''}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Reviewer */}
          {reviewer && (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {reviewer.image ? (
                <Image
                  src={reviewer.image}
                  alt={reviewer.name}
                  width={48}
                  height={48}
                  style={{ borderRadius: '50%', objectFit: 'cover', border: '2px solid #e2e8f0' }}
                />
              ) : (
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>
                  {reviewer.name.charAt(0)}
                </div>
              )}
              <div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Reviewed by</p>
                <p style={{ margin: '0.1rem 0', fontWeight: '600', color: '#0f172a' }}>
                  <a href={`/author/${reviewer.slug}`} style={{ color: '#0ea5e9', textDecoration: 'none' }}>
                    {reviewer.name}
                  </a>
                </p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                  {reviewedAt ? `Updated ${reviewedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}` : reviewer.role}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Meta Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            background: '#ffffff',
            padding: '1rem',
            borderRadius: '6px',
            border: '1px solid #e2e8f0'
          }}
        >
          {/* Difficulty */}
          <div>
            <p style={{ margin: 0, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', fontWeight: 'bold' }}>Difficulty</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.3rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              <span style={{ fontSize: '0.9rem', fontWeight: '500', color: '#334155' }}>{difficultyLevel || 'Intermediate'}</span>
            </div>
          </div>

          {/* Time to Fix */}
          <div>
            <p style={{ margin: 0, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', fontWeight: 'bold' }}>Time to Fix</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.3rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span style={{ fontSize: '0.9rem', fontWeight: '500', color: '#334155' }}>{timeToFix || '15 mins'}</span>
            </div>
          </div>

          {/* Reading Time */}
          <div>
            <p style={{ margin: 0, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', fontWeight: 'bold' }}>Read Time</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.3rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              <span style={{ fontSize: '0.9rem', fontWeight: '500', color: '#334155' }}>{readingTime} min</span>
            </div>
          </div>

          {/* Compatible */}
          <div>
            <p style={{ margin: 0, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', fontWeight: 'bold' }}>Tested On</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.3rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span style={{ fontSize: '0.9rem', fontWeight: '500', color: '#334155' }}>
                {brandName ? (
                  <span style={{ display: 'inline-block', background: '#e0f2fe', color: '#0369a1', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', marginRight: '4px' }}>
                    {brandName.toUpperCase()}
                  </span>
                ) : null}
                {printerModel ? printerModel : 'Most Models'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
