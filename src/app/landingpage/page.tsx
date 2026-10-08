import { Metadata } from 'next';
import LandingPageForm from '@/components/LandingPageForm';
import ProblemCards from '@/components/ProblemCards';
import MobileStickyCTA from '@/components/MobileStickyCTA';

export const metadata: Metadata = {
  title: 'Printer Not Working? Straightforward Printer Help | Liberty Printer Fix',
  description:
    'Having trouble printing, connecting to Wi-Fi, or getting your printer back online? Liberty Printer Fix provides independent, easy-to-understand printer assistance for HP, Canon, Epson, Brother and more.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://libertyprinterfix.com/landingpage',
  },
};

export default function LandingPage() {
  const faqs = [
    {
      q: 'Can you help if my printer is offline?',
      a: 'Yes. An "offline" status is one of the most common printer issues we handle. We help you check your connection, computer settings, and printer queue step-by-step so your computer can communicate with your printer again.',
    },
    {
      q: 'Can you help with HP, Canon, Epson and Brother printers?',
      a: 'Yes. We assist with all major consumer and office printer brands including HP, Canon, Epson, Brother, and many others, whether you have an inkjet, laser, or wireless model.',
    },
    {
      q: 'Do I need to know what is wrong with my printer?',
      a: 'Not at all. You do not need to be a technical expert. Just describe what you see happening—such as "nothing prints," "it says offline," or "a light is blinking"—and we will help you figure out what to do.',
    },
    {
      q: 'Can you help with Wi-Fi printer problems?',
      a: 'Yes. Wireless connection dropouts, router password changes, and new Wi-Fi setups are common. We guide you through reconnecting your printer to your home or office wireless network.',
    },
    {
      q: 'Can you help with Windows and Mac?',
      a: 'Yes. We assist users on Windows 11, Windows 10, Apple Mac (macOS), as well as iPads, iPhones, and Android devices.',
    },
    {
      q: 'Are you affiliated with HP, Canon, Epson or Brother?',
      a: 'No. Liberty Printer Fix is an independent printer assistance service. We are not the manufacturer, and we are not affiliated with or endorsed by HP, Canon, Epson, Brother, or any other printer brand. We provide third-party assistance to help users troubleshoot and resolve printer problems.',
    },
  ];

  return (
    <div className="landing-sales-page">
      {/* Trust bar at top of landing page */}
      <div className="landing-top-bar">
        <div className="landing-top-inner">
          <span className="landing-top-tag">🇺🇸 INDEPENDENT AMERICAN PRINTER ASSISTANCE</span>
          <span className="landing-top-divider">•</span>
          <span className="landing-top-phone">Simple, Human Help For Your Printer</span>
          <span className="landing-top-divider">•</span>
          <a
            href="https://vm.providesupport.com/0hfjufu6eccq70z7w7kmktp1rf"
            target="_blank"
            rel="noopener noreferrer"
            className="landing-top-chat-link"
          >
            💬 Talk to Cathy (Live Chat)
          </a>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="sales-hero-section">
        <div className="sales-hero-container">
          {/* Left Column: Reassuring Human Messaging */}
          <div className="sales-hero-left">
            <h1 className="sales-hero-headline">
              Printer Not Working? Let Us Help.
            </h1>

            <p className="sales-hero-lead">
              Having trouble printing, connecting to Wi-Fi, or getting your printer back online? Tell us what&apos;s happening and get straightforward help with your printer problem.
            </p>

            <div className="sales-hero-cta-block">
              <a href="#get-help-form" className="sales-btn-primary">
                GET HELP WITH MY PRINTER
              </a>
              <p className="sales-hero-reassurance">
                Fast response • Major printer brands • Independent printer assistance
              </p>
            </div>

            {/* Clear Independent Disclosure */}
            <div className="sales-hero-disclosure">
              <p>
                <strong>Please Note:</strong> Liberty Printer Fix is an independent printer assistance service and is not affiliated with HP, Canon, Epson, Brother, or other printer manufacturers.
              </p>
            </div>

            {/* Reassuring Key Points for 50+ Audience */}
            <div className="sales-hero-bullets">
              <div className="sales-bullet-item">
                <span className="sales-bullet-check">✓</span>
                <div>
                  <strong>No Technical Jargon:</strong> We explain things in plain, everyday English.
                </div>
              </div>
              <div className="sales-bullet-item">
                <span className="sales-bullet-check">✓</span>
                <div>
                  <strong>Patient, Human Assistance:</strong> We take the time to understand your specific issue.
                </div>
              </div>
              <div className="sales-bullet-item">
                <span className="sales-bullet-check">✓</span>
                <div>
                  <strong>All Common Issues:</strong> Offline status, Wi-Fi drops, paper jams, and error lights.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent, Simple Lead Form */}
          <div className="sales-hero-right">
            <LandingPageForm />
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="sales-problems-section">
        <div className="sales-section-container">
          <div className="sales-section-header">
            <h2 className="sales-section-title">What Problem Are You Having?</h2>
            <p className="sales-section-desc">
              Select the problem that best describes your situation, or fill out the form above to get help.
            </p>
          </div>

          <ProblemCards />

          <div className="sales-mid-cta">
            <a href="#get-help-form" className="sales-btn-secondary">
              GET HELP NOW
            </a>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="sales-steps-section">
        <div className="sales-section-container">
          <div className="sales-section-header">
            <h2 className="sales-section-title">How It Works</h2>
            <p className="sales-section-desc">
              Three simple steps to get your printer working properly again.
            </p>
          </div>

          <div className="sales-steps-grid">
            <div className="sales-step-card">
              <div className="sales-step-circle">1</div>
              <h3 className="sales-step-name">Tell Us What&apos;s Wrong</h3>
              <p className="sales-step-text">
                Choose your printer brand and describe the problem in a few words.
              </p>
            </div>

            <div className="sales-step-card">
              <div className="sales-step-circle">2</div>
              <h3 className="sales-step-name">Get Personalized Assistance</h3>
              <p className="sales-step-text">
                Get guidance based on your specific printer problem, model, and setup.
              </p>
            </div>

            <div className="sales-step-card">
              <div className="sales-step-circle">3</div>
              <h3 className="sales-step-name">Get Back to Printing</h3>
              <p className="sales-step-text">
                Follow the recommended steps to troubleshoot your printer without frustration.
              </p>
            </div>
          </div>

          <div className="sales-mid-cta">
            <a href="#get-help-form" className="sales-btn-primary">
              GET HELP WITH MY PRINTER
            </a>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="sales-trust-section">
        <div className="sales-section-container">
          <div className="sales-trust-box">
            <div className="sales-trust-content">
              <h2 className="sales-trust-title">
                Printer Help Without the Technical Jargon
              </h2>
              <p className="sales-trust-lead">
                You don&apos;t need to be a computer expert. Tell us what you&apos;re seeing and we&apos;ll help you understand what may be wrong and what to do next.
              </p>

              <div className="sales-trust-checklist">
                <div className="sales-trust-check-item">
                  <span className="sales-trust-check-icon">✓</span>
                  <span><strong>Easy-to-follow guidance</strong> step by step</span>
                </div>
                <div className="sales-trust-check-item">
                  <span className="sales-trust-check-icon">✓</span>
                  <span><strong>Help with common printer problems</strong> (offline, won&apos;t print, Wi-Fi)</span>
                </div>
                <div className="sales-trust-check-item">
                  <span className="sales-trust-check-icon">✓</span>
                  <span><strong>Major printer brands supported</strong> (HP, Canon, Epson, Brother &amp; more)</span>
                </div>
                <div className="sales-trust-check-item">
                  <span className="sales-trust-check-icon">✓</span>
                  <span><strong>Windows and Mac assistance</strong> for all modern operating systems</span>
                </div>
                <div className="sales-trust-check-item">
                  <span className="sales-trust-check-icon">✓</span>
                  <span><strong>Independent support</strong> focused entirely on solving your problem</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS SECTION */}
      <section className="sales-brands-section">
        <div className="sales-section-container">
          <div className="sales-section-header">
            <h2 className="sales-section-title">Help With Popular Printer Brands</h2>
            <p className="sales-section-desc">
              We assist with all major brands and models used in homes and offices across the United States.
            </p>
          </div>

          <div className="sales-brands-grid">
            <div className="sales-brand-box">
              <strong className="sales-brand-name">HP</strong>
              <span className="sales-brand-note">DeskJet, Envy, LaserJet, OfficeJet</span>
            </div>
            <div className="sales-brand-box">
              <strong className="sales-brand-name">Canon</strong>
              <span className="sales-brand-note">PIXMA, imageCLASS, MAXIFY</span>
            </div>
            <div className="sales-brand-box">
              <strong className="sales-brand-name">Epson</strong>
              <span className="sales-brand-note">EcoTank, WorkForce, Expression</span>
            </div>
            <div className="sales-brand-box">
              <strong className="sales-brand-name">Brother</strong>
              <span className="sales-brand-note">HL Series, MFC Series, DCP Series</span>
            </div>
          </div>

          <p className="sales-brands-other">
            And many other printer brands including Munbyn, Rollo, Zebra, Xerox, and Lexmark.
          </p>

          <p className="sales-brands-disclaimer">
            *All brand names, trademarks, and model numbers are the property of their respective owners and are used here solely to describe the printers we support. Liberty Printer Fix is an independent service provider and is not affiliated with these manufacturers.
          </p>
        </div>
      </section>

      {/* SERVICE / CONVERSION SECTION (before FAQ) */}
      <section className="sales-ready-section">
        <div className="sales-section-container">
          <div className="sales-ready-card">
            <h2 className="sales-ready-title">
              Ready to Get Your Printer Working Again?
            </h2>
            <p className="sales-ready-lead">
              Tell us what&apos;s happening with your printer and we&apos;ll help you determine the next step.
            </p>

            <div className="sales-ready-explanation">
              <h3>What Happens Next:</h3>
              <ol className="sales-ready-list">
                <li>You submit your printer brand and a brief note about what is happening.</li>
                <li>We review your issue against known fixes for your specific model and setup.</li>
                <li>You receive simple, straightforward troubleshooting guidance via email (or phone if requested).</li>
              </ol>
            </div>

            <a href="#get-help-form" className="sales-btn-primary sales-btn-large">
              GET HELP WITH MY PRINTER
            </a>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="sales-faq-section">
        <div className="sales-section-container">
          <div className="sales-section-header">
            <h2 className="sales-section-title">Frequently Asked Questions</h2>
            <p className="sales-section-desc">
              Clear answers to the most common questions from our visitors.
            </p>
          </div>

          <div className="sales-faq-list">
            {faqs.map((faq, idx) => (
              <div key={idx} className="sales-faq-item">
                <h3 className="sales-faq-q">{faq.q}</h3>
                <p className="sales-faq-a">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL SECTION */}
      <section className="sales-final-section">
        <div className="sales-section-container">
          <div className="sales-final-card">
            <h2 className="sales-final-title">Don&apos;t Let a Stubborn Printer Ruin Your Day</h2>
            <p className="sales-final-text">
              Whether your printer won&apos;t connect to Wi-Fi, refuses to print, or shows a confusing error message, let us help you get back on track.
            </p>
            <div className="sales-final-buttons">
              <a href="#get-help-form" className="sales-btn-primary sales-btn-large">
                GET HELP WITH MY PRINTER
              </a>
              <a
                href="https://vm.providesupport.com/0hfjufu6eccq70z7w7kmktp1rf"
                target="_blank"
                rel="noopener noreferrer"
                className="sales-btn-chat"
              >
                <span>💬</span> Talk to Cathy on Live Chat
              </a>
            </div>
          </div>

          {/* Prominent Legal Disclaimer Footer */}
          <div className="sales-legal-disclaimer">
            <h4>Important Notice of Independence:</h4>
            <p>
              Liberty Printer Fix is an independent technical assistance service provider. We are not affiliated with, endorsed by, sponsored by, or partnered with Hewlett-Packard (HP), Canon, Epson, Brother, or any other printer manufacturer. Any use of brand names or trademarks is strictly for descriptive and informational purposes to help users identify their printer model.
            </p>
          </div>
        </div>
      </section>

      {/* Mobile Sticky CTA Bar */}
      <MobileStickyCTA />
    </div>
  );
}
