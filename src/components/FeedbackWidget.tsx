'use client';

import React, { useState } from 'react';
import LeadCaptureForm from './LeadCaptureForm';

export default function FeedbackWidget() {
  const [feedbackState, setFeedbackState] = useState<'idle' | 'yes' | 'no'>('idle');

  const handleFeedback = (type: 'yes' | 'no') => {
    console.log(`User feedback: ${type}`);
    setFeedbackState(type);
  };

  if (feedbackState === 'yes') {
    return (
      <div style={{
        marginTop: '2.5rem',
        padding: '1.5rem',
        background: '#f0fdf4',
        borderRadius: '8px',
        textAlign: 'center',
        border: '1px solid #bbf7d0',
        animation: 'fadeIn 0.5s ease-in'
      }}>
        <h4 style={{ margin: '0 0 0.5rem', color: '#166534' }}>Thanks for the feedback!</h4>
        <p style={{ margin: 0, color: '#15803d', fontSize: '0.95rem' }}>We're glad this article helped you resolve your issue.</p>
      </div>
    );
  }

  if (feedbackState === 'no') {
    return (
      <div style={{ marginTop: '2.5rem', animation: 'fadeIn 0.5s ease-in' }}>
        <LeadCaptureForm />
      </div>
    );
  }

  return (
    <div style={{
      marginTop: '2.5rem',
      padding: '1.5rem',
      background: '#fff',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <h4 style={{ margin: 0, color: '#1e293b', fontSize: '1.1rem' }}>Was this article helpful?</h4>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button 
          onClick={() => handleFeedback('yes')}
          style={{
            padding: '0.6rem 1.5rem',
            background: 'var(--primary-color, #002d62)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'opacity 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
        >
          👍 Yes
        </button>
        <button 
          onClick={() => handleFeedback('no')}
          style={{
            padding: '0.6rem 1.5rem',
            background: '#e2e8f0',
            color: '#475569',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#cbd5e1'}
          onMouseOut={(e) => e.currentTarget.style.background = '#e2e8f0'}
        >
          👎 No
        </button>
      </div>
    </div>
  );
}
