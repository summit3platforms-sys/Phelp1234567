'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    printerBrand: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to send your message. Please try again.');
      }

      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      printerBrand: '',
      message: '',
    });
    setStatus('idle');
    setErrorMessage('');
  };

  if (status === 'success') {
    return (
      <div
        style={{
          background: 'white',
          padding: '2.5rem 2rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid #bbf7d0',
          boxShadow: 'var(--shadow-md)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            background: '#dcfce7',
            color: '#16a34a',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            margin: '0 auto 1.25rem',
          }}
        >
          ✓
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#166534', marginBottom: '0.75rem' }}>
          Message Received!
        </h2>
        <p style={{ color: '#475569', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem', maxWidth: '440px', margin: '0 auto 1.5rem' }}>
          Thank you, <strong>{formData.name}</strong>. Your message has been saved into our support queue. A specialist will review your inquiry and follow up shortly at <strong>{formData.email}</strong>.
        </p>
        <button
          onClick={handleReset}
          style={{
            background: 'transparent',
            color: 'var(--primary-color)',
            border: '1px solid var(--primary-color)',
            padding: '0.75rem 1.5rem',
            fontSize: '0.95rem',
            fontWeight: 600,
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
          }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        background: 'white',
        padding: '2rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      {/* Name */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <label htmlFor="name" style={{ fontWeight: 600, fontSize: '0.9rem', color: '#334155' }}>
          Your Name <span style={{ color: 'var(--accent-color)' }}>*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
          style={{
            padding: '0.75rem',
            fontSize: '1rem',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            outline: 'none',
            fontFamily: 'var(--font-family)',
          }}
        />
      </div>

      {/* Email */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <label htmlFor="email" style={{ fontWeight: 600, fontSize: '0.9rem', color: '#334155' }}>
          Email Address <span style={{ color: 'var(--accent-color)' }}>*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          required
          style={{
            padding: '0.75rem',
            fontSize: '1rem',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            outline: 'none',
            fontFamily: 'var(--font-family)',
          }}
        />
      </div>

      {/* Phone Number (Optional) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <label htmlFor="phone" style={{ fontWeight: 600, fontSize: '0.9rem', color: '#334155' }}>
          Phone Number <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 400 }}>(Optional, for callback)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(555) 123-4567"
          style={{
            padding: '0.75rem',
            fontSize: '1rem',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            outline: 'none',
            fontFamily: 'var(--font-family)',
          }}
        />
      </div>

      {/* Printer Brand / Topic */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <label htmlFor="printerBrand" style={{ fontWeight: 600, fontSize: '0.9rem', color: '#334155' }}>
          Printer Brand or Topic <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 400 }}>(Optional)</span>
        </label>
        <select
          id="printerBrand"
          name="printerBrand"
          value={formData.printerBrand}
          onChange={handleChange}
          style={{
            padding: '0.75rem',
            fontSize: '1rem',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            outline: 'none',
            fontFamily: 'var(--font-family)',
            backgroundColor: 'white',
            color: formData.printerBrand ? '#0f172a' : '#64748b',
          }}
        >
          <option value="">Select a brand or inquiry type...</option>
          <option value="HP">HP (Hewlett-Packard)</option>
          <option value="Canon">Canon</option>
          <option value="Epson">Epson</option>
          <option value="Brother">Brother</option>
          <option value="DYMO">DYMO</option>
          <option value="Zebra">Zebra Technologies</option>
          <option value="Rollo">Rollo</option>
          <option value="Munbyn">Munbyn</option>
          <option value="Primera">Primera Technology</option>
          <option value="General Inquiry">General Question / Other</option>
        </select>
      </div>

      {/* Message */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <label htmlFor="message" style={{ fontWeight: 600, fontSize: '0.9rem', color: '#334155' }}>
          Your Message <span style={{ color: 'var(--accent-color)' }}>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Describe the issue, error code, or question you have in detail..."
          required
          style={{
            padding: '0.75rem',
            fontSize: '1rem',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            outline: 'none',
            fontFamily: 'var(--font-family)',
            resize: 'vertical',
          }}
        />
      </div>

      {/* Error Banner */}
      {status === 'error' && (
        <div
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: '#fee2e2',
            border: '1px solid #fca5a5',
            borderRadius: 'var(--radius-sm)',
            color: '#b91c1c',
            fontSize: '0.9rem',
          }}
        >
          {errorMessage}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        style={{
          background: 'var(--primary-gradient)',
          color: 'white',
          border: 'none',
          padding: '1rem',
          fontSize: '1rem',
          fontWeight: 700,
          borderRadius: 'var(--radius-md)',
          cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
          boxShadow: 'var(--shadow-sm)',
          opacity: status === 'submitting' ? 0.7 : 1,
          transition: 'opacity var(--transition-fast)',
        }}
      >
        {status === 'submitting' ? 'Sending Message...' : 'Send Message'}
      </button>
    </form>
  );
}
