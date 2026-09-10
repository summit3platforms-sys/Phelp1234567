'use client';

import { useState } from 'react';

export default function LeadCaptureForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    issueDescription: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', issueDescription: '' });
      } else {
        const errorData = await response.json();
        setStatus('error');
        setMessage(errorData.error || 'Failed to submit request.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred while submitting. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="lead-capture-form success-state" style={{ padding: '1.5rem', borderRadius: '12px' }}>
        <div className="success-icon">✅</div>
        <h2 style={{ fontSize: '1.4rem' }}>Request Received!</h2>
        <p>Our experts will contact you shortly to help resolve your printer issues.</p>
        <button onClick={() => setStatus('idle')} className="submit-btn outline">
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="lead-capture-form" style={{ padding: '1.5rem', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', backgroundColor: 'white', border: '1px solid #e2e8f0' }}>
      <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: '#0f172a', fontWeight: 'bold' }}>Get Expert Printer Assistance in 10 Minutes</h2>
      <p className="lead-subtitle" style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem', lineHeight: '1.4' }}>Having trouble with your printer? Tell us about your issue and receive step-by-step guidance.</p>
      
      <form onSubmit={handleSubmit} className="lead-form-grid" style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr' }}>
        <div className="form-group" style={{ marginBottom: '0' }}>
          <label htmlFor="name" style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '0.25rem' }}>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
            style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
          />
        </div>
        
        <div className="form-group" style={{ marginBottom: '0' }}>
          <label htmlFor="email" style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '0.25rem' }}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
            style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '0' }}>
          <label htmlFor="phone" style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '0.25rem' }}>Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="(555) 123-4567"
            style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '0' }}>
          <label htmlFor="issueDescription" style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '0.25rem' }}>Issue</label>
          <textarea
            id="issueDescription"
            name="issueDescription"
            value={formData.issueDescription}
            onChange={handleChange}
            required
            placeholder="e.g. Printer won't turn on..."
            rows={2}
            style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', resize: 'vertical' }}
          />
        </div>

        {status === 'error' && <p className="error-message" style={{ color: '#ef4444', fontSize: '0.85rem', margin: '0' }}>{message}</p>}

        <button type="submit" disabled={status === 'loading'} className="submit-btn" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#002d62', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer', marginTop: '0.5rem' }}>
          {status === 'loading' ? 'Submitting...' : '🟦 Get Help Now'}
        </button>
      </form>
    </div>
  );
}
