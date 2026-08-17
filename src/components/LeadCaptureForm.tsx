'use client';

import { useState } from 'react';

export default function LeadCaptureForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    printerBrand: '',
    country: '',
    issueDescription: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        setFormData({ name: '', email: '', phone: '', printerBrand: '', country: '', issueDescription: '' });
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
      <div className="lead-capture-form success-state">
        <div className="success-icon">✅</div>
        <h2>Request Received!</h2>
        <p>Our experts will contact you shortly to help resolve your printer issues.</p>
        <button onClick={() => setStatus('idle')} className="submit-btn outline">
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="lead-capture-form">
      <h2>Get Expert Printer Assistance</h2>
      <p className="lead-subtitle">Having trouble with your printer? Tell us about your issue and receive step-by-step guidance.</p>
      
      <form onSubmit={handleSubmit} className="lead-form-grid">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="(555) 123-4567"
          />
        </div>

        <div className="form-group">
          <label htmlFor="printerBrand">Printer Brand</label>
          <select
            id="printerBrand"
            name="printerBrand"
            value={formData.printerBrand}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select your brand...</option>
            <option value="HP">HP</option>
            <option value="Canon">Canon</option>
            <option value="Epson">Epson</option>
            <option value="Brother">Brother</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select your country...</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="IN">India</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label htmlFor="issueDescription">Issue Description (in a few words)</label>
          <textarea
            id="issueDescription"
            name="issueDescription"
            value={formData.issueDescription}
            onChange={handleChange as any}
            required
            placeholder="e.g. Printer won't turn on, or paper jam error..."
            rows={3}
          />
        </div>

        {status === 'error' && <p className="error-message">{message}</p>}

        <button type="submit" disabled={status === 'loading'} className="submit-btn">
          {status === 'loading' ? 'Submitting...' : '🟦 Get Help Now'}
        </button>
      </form>
    </div>
  );
}
