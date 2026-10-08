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
    printerBrand: 'HP',
    problemType: 'Won\'t print',
    details: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [trackingInfo, setTrackingInfo] = useState('');

  useEffect(() => {
    // Check if a problem was passed in URL (e.g. ?problem=offline)
    const problemParam = searchParams.get('problem');
    if (problemParam) {
      const mapping: Record<string, string> = {
        wont_print: 'Won\'t print',
        offline: 'Offline',
        wifi: 'Wi-Fi/connection problem',
        error: 'Error message',
        setup: 'Setup',
        cant_find: 'Offline',
      };
      if (mapping[problemParam]) {
        setFormData((prev) => ({ ...prev, problemType: mapping[problemParam] }));
      }
    }

    // Capture Google Ads tracking parameters
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
      const descriptionParts = [
        `Problem: ${formData.problemType}`,
      ];
      if (formData.details.trim()) {
        descriptionParts.push(`Details: ${formData.details.trim()}`);
      }
      if (trackingInfo) {
        descriptionParts.push(`[Tracking: ${trackingInfo}]`);
      }

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || 'Not provided',
        printerBrand: formData.printerBrand || 'Other',
        issueDescription: descriptionParts.join(' | '),
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Unable to submit your request. Please try again.');
      }

      // Fire Google Ads conversion tracking event if present
      if (typeof window !== 'undefined' && (window as any).gtag) {
        try {
          (window as any).gtag('event', 'generate_lead', {
            event_category: 'Google Ads Landing Page',
            event_label: formData.printerBrand,
          });
        } catch (gtagErr) {
          console.warn('gtag tracking failed', gtagErr);
        }
      }

      // Redirect to Thank-You conversion confirmation page
      router.push('/landingpage/thank-you');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(
        err.message || 'Something went wrong while submitting. Please check your information and try again.'
      );
    }
  };

  return (
    <div className="lead-sales-card" id="get-help-form">
      <div className="lead-sales-header">
        <h2 className="lead-sales-title">Get Help With Your Printer</h2>
        <p className="lead-sales-subtitle">
          Fill out this simple form and we will help you figure out what is wrong and how to fix it.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="lead-sales-form">
        {/* Printer Brand */}
        <div className="sales-field-group">
          <label htmlFor="printerBrand" className="sales-label">
            1. What brand is your printer? <span className="sales-req">*</span>
          </label>
          <select
            id="printerBrand"
            name="printerBrand"
            required
            value={formData.printerBrand}
            onChange={handleChange}
            className="sales-select"
          >
            <option value="HP">HP</option>
            <option value="Canon">Canon</option>
            <option value="Epson">Epson</option>
            <option value="Brother">Brother</option>
            <option value="Other">Other Brand</option>
          </select>
        </div>

        {/* What is the problem? */}
        <div className="sales-field-group">
          <label htmlFor="problemType" className="sales-label">
            2. What is the problem? <span className="sales-req">*</span>
          </label>
          <select
            id="problemType"
            name="problemType"
            required
            value={formData.problemType}
            onChange={handleChange}
            className="sales-select"
          >
            <option value="Won't print">Printer won&apos;t print</option>
            <option value="Offline">Printer says offline</option>
            <option value="Wi-Fi/connection problem">Wi-Fi or wireless connection problem</option>
            <option value="Error message">Error message or blinking warning light</option>
            <option value="Setup">New printer setup or computer connection</option>
            <option value="Other">Other printer problem</option>
          </select>
        </div>

        {/* Your Name */}
        <div className="sales-field-group">
          <label htmlFor="name" className="sales-label">
            3. Your Name <span className="sales-req">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Mary Johnson"
            className="sales-input"
            autoComplete="name"
          />
        </div>

        {/* Email Address */}
        <div className="sales-field-group">
          <label htmlFor="email" className="sales-label">
            4. Your Email Address <span className="sales-req">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. mary@example.com"
            className="sales-input"
            autoComplete="email"
          />
          <span className="sales-field-hint">
            We will send your straightforward troubleshooting steps to this email.
          </span>
        </div>

        {/* Phone Number (Optional) */}
        <div className="sales-field-group">
          <label htmlFor="phone" className="sales-label">
            5. Phone Number <span className="sales-optional">(Optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. (555) 123-4567"
            className="sales-input"
            autoComplete="tel"
          />
          <span className="sales-field-hint">
            Enter your phone number if you prefer a direct phone callback.
          </span>
        </div>

        {/* Optional Extra Notes */}
        <div className="sales-field-group">
          <label htmlFor="details" className="sales-label">
            6. What are you seeing? <span className="sales-optional">(Optional)</span>
          </label>
          <textarea
            id="details"
            name="details"
            rows={2}
            value={formData.details}
            onChange={handleChange}
            placeholder="Tell us what is on your screen, any error code, or what happens when you press print..."
            className="sales-textarea"
          />
        </div>

        {/* Error Alert */}
        {status === 'error' && (
          <div className="sales-error-box" role="alert">
            <p><strong>⚠️ Please check:</strong> {errorMessage}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="sales-submit-btn"
        >
          {status === 'loading' ? (
            <span>Sending your request...</span>
          ) : (
            <span>GET HELP NOW</span>
          )}
        </button>

        {/* What happens next clarification */}
        <div className="sales-guarantee-note">
          <p>
            <strong>What happens next:</strong> We review your printer details and reach out with simple, step-by-step guidance to help resolve your issue.
          </p>
          <p className="sales-privacy-text">
            🔒 Your information is private. We never sell your personal information.
          </p>
        </div>
      </form>
    </div>
  );
}

export default function LandingPageForm() {
  return (
    <Suspense fallback={<div className="lead-sales-card" style={{ minHeight: '420px', padding: '2rem' }}>Loading form...</div>}>
      <LandingPageFormContent />
    </Suspense>
  );
}
