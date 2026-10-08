'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function LandingPageFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    printerBrand: '',
    issueDescription: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [trackingInfo, setTrackingInfo] = useState('');

  useEffect(() => {
    // Extract Google Ads / UTM parameters if present
    const utmSource = searchParams.get('utm_source');
    const utmCampaign = searchParams.get('utm_campaign');
    const gclid = searchParams.get('gclid');
    const parts: string[] = [];
    if (gclid) parts.push(`gclid: ${gclid}`);
    if (utmCampaign) parts.push(`campaign: ${utmCampaign}`);
    if (utmSource) parts.push(`source: ${utmSource}`);
    if (parts.length > 0) {
      setTrackingInfo(parts.join(' | '));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || 'Not provided',
        printerBrand: formData.printerBrand.trim() || 'General / Unknown',
        issueDescription: trackingInfo
          ? `${formData.issueDescription.trim()} [Tracking: ${trackingInfo}]`
          : formData.issueDescription.trim(),
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit your request. Please try again.');
      }

      // Fire Google Ads conversion / analytics events if gtag is initialized
      if (typeof window !== 'undefined' && (window as any).gtag) {
        try {
          (window as any).gtag('event', 'generate_lead', {
            event_category: 'Google Ads Landing Page',
            event_label: formData.printerBrand || 'General',
          });
        } catch (gtagErr) {
          console.warn('gtag tracking failed', gtagErr);
        }
      }

      // Redirect immediately to the thank you page for Google Ads conversion tracking
      router.push('/landingpage/thank-you');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again or use Live Chat.');
    }
  };

  return (
    <div className="lp-form-card" id="lead-form">
      <div className="lp-form-header">
        <div className="lp-form-badge">⚡ PRIORITY DISPATCH</div>
        <h3 className="lp-form-title">Request Expert Printer Assistance</h3>
        <p className="lp-form-subtitle">
          Submit your issue below. A technician will review your printer model and respond within 10 minutes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="lp-form">
        {/* Name */}
        <div className="lp-form-group">
          <label htmlFor="lp-name" className="lp-label">
            Your Full Name <span className="lp-required">*</span>
          </label>
          <input
            type="text"
            id="lp-name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Michael Smith"
            className="lp-input"
            autoComplete="name"
          />
        </div>

        {/* Email & Phone in 2 cols */}
        <div className="lp-form-row">
          <div className="lp-form-group">
            <label htmlFor="lp-email" className="lp-label">
              Email Address <span className="lp-required">*</span>
            </label>
            <input
              type="email"
              id="lp-email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="michael@example.com"
              className="lp-input"
              autoComplete="email"
            />
          </div>

          <div className="lp-form-group">
            <label htmlFor="lp-phone" className="lp-label">
              Phone Number <span className="lp-required">*</span>
            </label>
            <input
              type="tel"
              id="lp-phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="(555) 234-5678"
              className="lp-input"
              autoComplete="tel"
            />
          </div>
        </div>

        {/* Printer Brand */}
        <div className="lp-form-group">
          <label htmlFor="lp-printerBrand" className="lp-label">
            Printer Brand <span className="lp-required">*</span>
          </label>
          <select
            id="lp-printerBrand"
            name="printerBrand"
            required
            value={formData.printerBrand}
            onChange={handleChange}
            className="lp-select"
          >
            <option value="">Select your printer brand...</option>
            <option value="HP">HP (Hewlett-Packard)</option>
            <option value="Canon">Canon</option>
            <option value="Epson">Epson</option>
            <option value="Brother">Brother</option>
            <option value="Munbyn">Munbyn (Thermal/Shipping)</option>
            <option value="Rollo">Rollo</option>
            <option value="Zebra">Zebra Technologies</option>
            <option value="DYMO">DYMO</option>
            <option value="Xerox">Xerox</option>
            <option value="Ricoh">Ricoh / Savin</option>
            <option value="Lexmark">Lexmark</option>
            <option value="Pantum">Pantum</option>
            <option value="Other">Other / Not Listed</option>
          </select>
        </div>

        {/* Issue Description */}
        <div className="lp-form-group">
          <label htmlFor="lp-issueDescription" className="lp-label">
            Describe the Issue or Error Code <span className="lp-required">*</span>
          </label>
          <textarea
            id="lp-issueDescription"
            name="issueDescription"
            required
            rows={3}
            value={formData.issueDescription}
            onChange={handleChange}
            placeholder="e.g. Printer is offline in Windows 11, blinking orange error light, paper jam error but no paper inside..."
            className="lp-textarea"
          />
        </div>

        {/* Error message alert */}
        {status === 'error' && (
          <div className="lp-error-alert" role="alert">
            <span>⚠️</span> {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="lp-submit-button"
        >
          {status === 'loading' ? (
            <span className="lp-btn-loading">
              <span className="lp-spinner" /> Processing Request...
            </span>
          ) : (
            <span>Get Immediate Diagnostic Help ➔</span>
          )}
        </button>

        {/* Trust & Guarantee Notes */}
        <div className="lp-form-trust">
          <div className="lp-trust-item">
            <span>⚡</span>
            <span>Average 10-min response</span>
          </div>
          <div className="lp-trust-item">
            <span>🔒</span>
            <span>100% Private &amp; Secure</span>
          </div>
          <div className="lp-trust-item">
            <span>🎯</span>
            <span>No obligation</span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function LandingPageForm() {
  return (
    <Suspense fallback={<div className="lp-form-card" style={{ minHeight: '400px' }}>Loading form...</div>}>
      <LandingPageFormContent />
    </Suspense>
  );
}
