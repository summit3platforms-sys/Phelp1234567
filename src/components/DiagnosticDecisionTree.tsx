import React from 'react';

interface DecisionNode {
  condition: string;
  rootCause: string;
  action: string;
}

interface DiagnosticDecisionTreeProps {
  title: string;
  brandName?: string | null;
  errorCode?: string | null;
  nodes?: DecisionNode[];
}

export default function DiagnosticDecisionTree({
  title,
  brandName,
  errorCode,
  nodes,
}: DiagnosticDecisionTreeProps) {
  // Default conditional branching nodes if custom ones aren't provided
  const defaultNodes: DecisionNode[] = nodes && nodes.length > 0 ? nodes : [
    {
      condition: 'Error occurs immediately upon powering on (0–5 seconds)',
      rootCause: 'Optical sensor blockage, carriage physical latch bind, or high-voltage board short.',
      action: 'Perform a 30-minute complete AC power drain; inspect physical carriage rails for foreign debris.',
    },
    {
      condition: 'Error triggers only when a print job begins spooling',
      rootCause: 'Driver spooler corruption, WSD port timeout, or corrupt raster image payload.',
      action: 'Switch Windows printer port from WSD to Standard TCP/IP; clear pending .SPL files in spool folder.',
    },
    {
      condition: 'Error flashes after paper feeds halfway through the rollers',
      rootCause: 'Line feed (LF) optical timing disc dust or glazed rubber transport rollers.',
      action: 'Clean circular encoder disc and wipe rubber roller surfaces with 99% isopropyl alcohol.',
    },
  ];

  return (
    <div
      className="diagnostic-decision-tree"
      style={{
        background: '#ffffff',
        border: '1.5px solid #cbd5e1',
        borderRadius: '10px',
        padding: '1.5rem',
        margin: '2rem 0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <span style={{ fontSize: '1.25rem' }}>🔀</span>
        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '700', color: '#0f172a' }}>
          Diagnostic Decision Tree: {title}
        </h3>
      </div>
      <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#64748b' }}>
        Use this conditional logic tree to isolate the exact component failure based on real-time hardware symptoms:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {defaultNodes.map((node, idx) => (
          <div
            key={idx}
            style={{
              background: '#f8fafc',
              borderLeft: '4px solid #0284c7',
              borderRadius: '0 6px 6px 0',
              padding: '0.9rem 1.1rem',
              fontSize: '0.9rem',
            }}
          >
            <div style={{ fontWeight: '700', color: '#0369a1', marginBottom: '0.3rem' }}>
              IF: <span style={{ color: '#0f172a', fontWeight: '600' }}>{node.condition}</span>
            </div>
            <div style={{ color: '#475569', marginBottom: '0.25rem', fontSize: '0.85rem' }}>
              <strong>Probable Root Cause:</strong> {node.rootCause}
            </div>
            <div style={{ color: '#059669', fontWeight: '600', fontSize: '0.875rem' }}>
              <strong>Required Action:</strong> {node.action}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
