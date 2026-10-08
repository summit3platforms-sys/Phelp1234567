import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Thank You - Request Received | LibertyPrinterFix',
  description: 'Your printer troubleshooting request has been received. Our technician will contact you shortly.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function ThankYouPage() {
  return (
    <div className="lp-thankyou-wrapper">
      <div className="lp-thankyou-card">
        {/* Animated Success Icon */}
        <div className="lp-thankyou-icon-circle">
          <svg
            className="lp-thankyou-check"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <span className="lp-thankyou-pill">REQUEST CONFIRMED</span>
        <h1 className="lp-thankyou-title">Thank You! We Have Received Your Request.</h1>
        <p className="lp-thankyou-desc">
          Your printer problem details have been submitted directly to our technical support queue. A specialist is reviewing your printer model and symptoms right now.
        </p>

        {/* Next Steps Card */}
        <div className="lp-thankyou-steps">
          <div className="lp-step-item">
            <div className="lp-step-num">1</div>
            <div className="lp-step-info">
              <strong>Case Created</strong>
              <p>Your issue has been assigned priority triage in our dispatch queue.</p>
            </div>
          </div>
          <div className="lp-step-item">
            <div className="lp-step-num">2</div>
            <div className="lp-step-info">
              <strong>Diagnostic Review</strong>
              <p>Our technician identifies the specific driver, firmware, or hardware error pattern.</p>
            </div>
          </div>
          <div className="lp-step-item">
            <div className="lp-step-num">3</div>
            <div className="lp-step-info">
              <strong>Fast Response (~10 mins)</strong>
              <p>We will contact you via email or phone with clear, step-by-step instructions.</p>
            </div>
          </div>
        </div>

        {/* Urgent Live Chat Callout */}
        <div className="lp-thankyou-chat-box">
          <div className="lp-thankyou-chat-text">
            <strong>Need instant assistance without waiting?</strong>
            <p>Our specialist Cathy is online and ready to assist you in real time.</p>
          </div>
          <a
            href="https://vm.providesupport.com/0hfjufu6eccq70z7w7kmktp1rf"
            target="_blank"
            rel="noopener noreferrer"
            className="lp-thankyou-chat-btn"
          >
            <span>💬</span> Talk to Cathy on Live Chat
          </a>
        </div>

        <div className="lp-thankyou-actions">
          <Link href="/" className="lp-thankyou-home-btn">
            Return to Homepage ➔
          </Link>
        </div>
      </div>
    </div>
  );
}
