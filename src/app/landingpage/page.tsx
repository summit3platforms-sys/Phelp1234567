import { Metadata } from 'next';
import LandingPageForm from '@/components/LandingPageForm';

export const metadata: Metadata = {
  title: 'Printer Troubleshooting & Technical Support | LibertyPrinterFix',
  description:
    'Fast, expert technical troubleshooting for HP, Canon, Epson, Brother & thermal printers. Fix offline errors, paper jams, blinking error codes, and driver issues.',
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
  const brands = [
    { name: 'HP', desc: 'LaserJet, OfficeJet, DeskJet, Envy' },
    { name: 'Canon', desc: 'PIXMA, imageCLASS, MAXIFY' },
    { name: 'Epson', desc: 'EcoTank, WorkForce, Expression' },
    { name: 'Brother', desc: 'HL, MFC, DCP, PocketJet' },
    { name: 'Munbyn', desc: 'ITPP941, ITPP130, RealWriter' },
    { name: 'Rollo', desc: 'Wireless & USB Thermal' },
    { name: 'Zebra', desc: 'ZD420, ZD620, GX420, GK420' },
    { name: 'DYMO', desc: 'LabelWriter 450, 550, 4XL' },
    { name: 'Xerox', desc: 'Phaser, VersaLink, AltaLink' },
    { name: 'Lexmark', desc: 'MS, MX, CS, CX series' },
  ];

  const commonIssues = [
    {
      icon: '📴',
      title: 'Printer Shows "Offline" or Disconnected',
      desc: 'Fix Windows 11/10 and macOS offline status, SNMP port conflicts, WSD port drift, and router WiFi reconnect issues.',
    },
    {
      icon: '🚨',
      title: 'Blinking Error Lights & Error Codes',
      desc: 'Decode flashing orange/amber lights, Canon B200/5100, HP 59.F0/50.4, Epson 0x97, and continuous paper sensor errors.',
    },
    {
      icon: '📄',
      title: 'Faded, Streaked, or Blank Pages',
      desc: 'Clear stubborn dried printhead nozzles, adjust thermal density, fix roller slipping, and restore sharp text alignment.',
    },
    {
      icon: '⚙️',
      title: 'Driver Installs & Spooler Crashes',
      desc: 'Resolve Windows Print Spooler service shutdowns, corrupt driver packages, USB communication errors, and generic driver setup.',
    },
  ];

  const testimonials = [
    {
      quote:
        'My HP LaserJet was stuck in Offline mode for two straight days right before payroll. The specialist identified our router IP conflict within 5 minutes. Amazing service!',
      author: 'Mark T.',
      role: 'Small Business Owner, Chicago, IL',
      rating: '★★★★★',
    },
    {
      quote:
        'Our Munbyn shipping printer started spitting blank labels right in the middle of our holiday Etsy rush. The calibration and sensor instructions saved our shipping day.',
      author: 'Amanda R.',
      role: 'E-Commerce Seller, Austin, TX',
      rating: '★★★★★',
    },
    {
      quote:
        'Canon support told me my PIXMA B200 error meant buying a brand new printer. LibertyPrinterFix showed me the carriage reset trick that brought it right back to life.',
      author: 'Greg S.',
      role: 'Freelance Graphic Designer, Seattle, WA',
      rating: '★★★★★',
    },
  ];

  const faqs = [
    {
      q: 'How fast will I receive assistance after submitting the form?',
      a: 'Our dispatch team reviews submissions immediately. In most cases, a printer specialist will follow up via email or phone within 10 minutes during active support hours.',
    },
    {
      q: 'Can you help with both Windows and Mac operating systems?',
      a: 'Yes. We support Windows 11, Windows 10, macOS (including macOS Sequoia and Sonoma), ChromeOS, iOS AirPrint, and Android printing environments.',
    },
    {
      q: 'What types of printers do you handle?',
      a: 'We troubleshoot consumer and commercial inkjets, color and monochrome laser printers, all-in-one multifunction units, and 4x6 thermal shipping/barcode label printers.',
    },
    {
      q: 'What if I need immediate help without waiting?',
      a: 'You can launch our Live Chat with Cathy directly using the chat button in the top menu or on the page to speak with a technician in real time.',
    },
  ];

  return (
    <div className="lp-container">
      {/* HERO SECTION */}
      <section className="lp-hero-section">
        <div className="lp-hero-content">
          <div className="lp-pill-badge">
            <span className="lp-pill-dot" /> FAST PRINTER DIAGNOSTICS &amp; REPAIR ASSISTANCE
          </div>

          <h1 className="lp-hero-headline">
            Printer Offline, Jammed, or Showing Error Codes?
          </h1>

          <p className="lp-hero-subhead">
            Connect with experienced printer technical specialists for fast, accurate diagnosis. We resolve driver conflicts, network dropouts, paper feed errors, and cryptic blinking lights across all major printer brands.
          </p>

          <div className="lp-hero-features">
            <div className="lp-feature-item">
              <span className="lp-check-icon">✓</span>
              <span><strong>Average 10-Minute Response:</strong> Prompt expert review of your printer problem.</span>
            </div>
            <div className="lp-feature-item">
              <span className="lp-check-icon">✓</span>
              <span><strong>Hardware &amp; Network Coverage:</strong> WiFi drops, IP conflicts, printhead clogs &amp; error codes.</span>
            </div>
            <div className="lp-feature-item">
              <span className="lp-check-icon">✓</span>
              <span><strong>All Major Brands:</strong> HP, Canon, Epson, Brother, Munbyn, Rollo, Zebra &amp; more.</span>
            </div>
            <div className="lp-feature-item">
              <span className="lp-check-icon">✓</span>
              <span><strong>No-Obligation Diagnostic:</strong> Clear, human guidance tailored to your specific model.</span>
            </div>
          </div>

          {/* Real-time chat alternative card */}
          <div className="lp-chat-alternative">
            <div className="lp-chat-alt-avatar">
              👩‍💻
              <span className="lp-chat-alt-pulse" />
            </div>
            <div className="lp-chat-alt-text">
              <strong>Prefer live assistance right now?</strong>
              <p>You can talk to Cathy on Live Chat for real-time troubleshooting.</p>
            </div>
            <a
              href="https://vm.providesupport.com/0hfjufu6eccq70z7w7kmktp1rf"
              target="_blank"
              rel="noopener noreferrer"
              className="lp-chat-alt-btn"
            >
              <span>💬</span> Live Chat
            </a>
          </div>

          {/* Social Proof Stats */}
          <div className="lp-social-stats">
            <div className="lp-stat-box">
              <span className="lp-stat-number">15,000+</span>
              <span className="lp-stat-label">Printer Issues Resolved</span>
            </div>
            <div className="lp-stat-divider" />
            <div className="lp-stat-box">
              <span className="lp-stat-number">4.9 / 5</span>
              <span className="lp-stat-label">★★★★★ Customer Rating</span>
            </div>
            <div className="lp-stat-divider" />
            <div className="lp-stat-box">
              <span className="lp-stat-number">&lt; 10 min</span>
              <span className="lp-stat-label">Average Response Time</span>
            </div>
          </div>
        </div>

        {/* Lead Capture Form Card */}
        <div className="lp-hero-form-wrapper">
          <LandingPageForm />
        </div>
      </section>

      {/* SUPPORTED BRANDS TICKER/GRID */}
      <section className="lp-brands-section">
        <h2 className="lp-section-subtitle">COMPREHENSIVE SUPPORT ACROSS ALL MAJOR BRANDS</h2>
        <div className="lp-brands-grid">
          {brands.map((b) => (
            <div key={b.name} className="lp-brand-card">
              <strong className="lp-brand-name">{b.name}</strong>
              <span className="lp-brand-models">{b.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* COMMON ISSUES SECTION */}
      <section className="lp-issues-section">
        <div className="lp-section-header">
          <span className="lp-section-tag">COMMON PRINTER FAILURES</span>
          <h2 className="lp-section-title">Common Printer Problems We Help You Solve</h2>
          <p className="lp-section-desc">
            Whether your printer stopped working after an operating system update or refuses to feed paper, our technicians diagnose the root cause immediately.
          </p>
        </div>

        <div className="lp-issues-grid">
          {commonIssues.map((issue) => (
            <div key={issue.title} className="lp-issue-card">
              <div className="lp-issue-icon">{issue.icon}</div>
              <h3 className="lp-issue-title">{issue.title}</h3>
              <p className="lp-issue-desc">{issue.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3-STEP RESOLUTION PROCESS */}
      <section className="lp-process-section">
        <div className="lp-section-header">
          <span className="lp-section-tag">FAST &amp; SIMPLE PROCESS</span>
          <h2 className="lp-section-title">How Our Diagnostic Service Works</h2>
        </div>

        <div className="lp-process-grid">
          <div className="lp-process-card">
            <div className="lp-process-badge">STEP 1</div>
            <h3 className="lp-process-title">Submit Your Problem</h3>
            <p className="lp-process-desc">
              Fill out the short form with your printer model, connection type (USB or WiFi), and symptoms.
            </p>
          </div>

          <div className="lp-process-card">
            <div className="lp-process-badge">STEP 2</div>
            <h3 className="lp-process-title">Specialist Triage</h3>
            <p className="lp-process-desc">
              A certified technician examines the error profile, known driver bugs, and hardware sensor telemetry.
            </p>
          </div>

          <div className="lp-process-card">
            <div className="lp-process-badge">STEP 3</div>
            <h3 className="lp-process-title">Step-by-Step Fix</h3>
            <p className="lp-process-desc">
              Receive verified, actionable instructions via email or phone, or connect with our support agents for interactive guidance.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="lp-testimonials-section">
        <div className="lp-section-header">
          <span className="lp-section-tag">REAL CUSTOMER FEEDBACK</span>
          <h2 className="lp-section-title">Trusted by Home Offices &amp; Businesses</h2>
        </div>

        <div className="lp-testimonials-grid">
          {testimonials.map((t, idx) => (
            <div key={idx} className="lp-testimonial-card">
              <div className="lp-stars">{t.rating}</div>
              <p className="lp-quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="lp-author-info">
                <strong>{t.author}</strong>
                <span>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="lp-faq-section">
        <div className="lp-section-header">
          <span className="lp-section-tag">ANSWERS TO COMMON QUESTIONS</span>
          <h2 className="lp-section-title">Frequently Asked Questions</h2>
        </div>

        <div className="lp-faq-grid">
          {faqs.map((f, idx) => (
            <div key={idx} className="lp-faq-card">
              <h3 className="lp-faq-question">{f.q}</h3>
              <p className="lp-faq-answer">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECONDARY BOTTOM CTA */}
      <section className="lp-bottom-cta">
        <div className="lp-bottom-cta-content">
          <h2 className="lp-bottom-cta-title">Ready to Get Your Printer Back Online?</h2>
          <p className="lp-bottom-cta-desc">
            Don&apos;t spend another hour wrestling with driver errors or flashing lights. Submit your issue now or launch Live Chat with Cathy.
          </p>
          <div className="lp-bottom-cta-buttons">
            <a href="#lead-form" className="lp-bottom-btn-primary">
              Submit Your Printer Issue ➔
            </a>
            <a
              href="https://vm.providesupport.com/0hfjufu6eccq70z7w7kmktp1rf"
              target="_blank"
              rel="noopener noreferrer"
              className="lp-bottom-btn-chat"
            >
              <span>💬</span> Talk to Cathy Live
            </a>
          </div>
        </div>
      </section>

      {/* GOOGLE ADS LEGAL & INDEPENDENT THIRD-PARTY NOTICE */}
      <section className="lp-compliance-section">
        <div className="lp-compliance-card">
          <h4>Consumer Protection Notice &amp; Disclaimer of Non-Affiliation</h4>
          <p>
            LibertyPrinterFix is an independent provider of technical support diagnostic guides, software troubleshooting tutorials, and customer assistance. We are <strong>not affiliated with, endorsed by, sponsored by, or an authorized representative of</strong> Hewlett-Packard (HP), Canon Inc., Seiko Epson Corporation, Brother Industries, Zebra Technologies, Munbyn, Rollo, DYMO, or any other original equipment manufacturer (OEM). All brand names, trademarks, logos, and model designations mentioned on this page are used strictly for nominative, descriptive, and identification purposes under fair use.
          </p>
        </div>
      </section>
    </div>
  );
}
