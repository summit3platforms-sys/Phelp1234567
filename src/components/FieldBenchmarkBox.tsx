import React from 'react';
import { getArticleBenchmark } from '@/lib/benchmarkMetrics';

interface FieldBenchmarkBoxProps {
  slug?: string | null;
  title?: string | null;
  categorySlug?: string | null;
  categoryName?: string | null;
  brandName?: string | null;
  printerModel?: string | null;
  errorCode?: string | null;
  difficulty?: string | null;
  timeToFix?: string | null;
  wordCount?: number | null;
}

export default function FieldBenchmarkBox({
  slug,
  title,
  categorySlug,
  categoryName,
  brandName = 'Universal',
  printerModel,
  errorCode,
  difficulty,
  timeToFix,
  wordCount,
}: FieldBenchmarkBoxProps) {
  const metrics = getArticleBenchmark({
    slug,
    title,
    categorySlug,
    categoryName,
    brandName,
    printerModel,
    errorCode,
    difficultyLevel: difficulty,
    timeToFix,
    wordCount,
  });

  return (
    <div
      className="field-benchmark-box"
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '1.25rem',
        marginTop: '1rem',
        marginBottom: '1.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontSize: '1.1rem' }}>🔬</span>
          <span style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#475569' }}>
            Technician Field Telemetry & Lab Benchmark
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', color: '#64748b', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
          Sample: {metrics.sampleSize} Bench Tests
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
        {/* Metric 1: Resolution Rate */}
        <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', border: '1px solid #edf2f7' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600', marginBottom: '0.2rem' }}>Resolution Rate</div>
          <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#059669' }}>{metrics.resolutionRate}</div>
          <div style={{ fontSize: '0.7rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={metrics.resolutionSubtext}>
            {metrics.resolutionSubtext}
          </div>
        </div>

        {/* Metric 2: Avg Bench Time */}
        <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', border: '1px solid #edf2f7' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600', marginBottom: '0.2rem' }}>Avg. Bench Time</div>
          <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0284c7' }}>{metrics.benchTime}</div>
          <div style={{ fontSize: '0.7rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={metrics.benchTimeSubtext}>
            {metrics.benchTimeSubtext}
          </div>
        </div>

        {/* Metric 3: Estimated DIY Savings */}
        <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', border: '1px solid #edf2f7' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600', marginBottom: '0.2rem' }}>Estimated DIY Savings</div>
          <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#7c3aed' }}>{metrics.diySavings}</div>
          <div style={{ fontSize: '0.7rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={metrics.savingsSubtext}>
            {metrics.savingsSubtext}
          </div>
        </div>

        {/* Metric 4: Target Hardware */}
        <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', border: '1px solid #edf2f7' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600', marginBottom: '0.2rem' }}>Target Hardware</div>
          <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {brandName}
          </div>
          <div style={{ fontSize: '0.7rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={printerModel || (errorCode ? `Code ${errorCode}` : 'All Models')}>
            {printerModel || (errorCode ? `Code ${errorCode}` : 'All Models')}
          </div>
        </div>
      </div>
    </div>
  );
}
