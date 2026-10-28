import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service - Liberty Printer Fix",
  description: "Read the Terms of Service for Liberty Printer Fix governing the use of our independent technical knowledge base, printer guides, and online resources.",
  alternates: {
    canonical: "https://libertyprinterfix.com/terms",
  },
};

export default function TermsPage() {
  const headingStyle = { fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem', letterSpacing: '-0.02em' };
  const subHeadingStyle = { fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' };
  const paragraphStyle = { color: '#334155', lineHeight: '1.75', marginBottom: '1.25rem' };
  const listStyle = { color: '#334155', lineHeight: '1.75', paddingLeft: '1.5rem', marginBottom: '1.25rem' };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1rem' }}>
      {/* Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://libertyprinterfix.com/" },
            { "@type": "ListItem", "position": 2, "name": "Terms of Service", "item": "https://libertyprinterfix.com/terms" }
          ]
        }) }}
      />

      <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        <Link href="/">Home</Link> &gt; 
        <span style={{ color: 'var(--text-muted)' }}> Terms of Service</span>
      </nav>

      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.03em', color: '#0f172a' }}>
        Terms of Service
      </h1>
      <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2rem' }}>
        <strong>Last Updated: October 28, 2026</strong>
      </p>

      <p style={paragraphStyle}>
        Welcome to Liberty Printer Fix (the &ldquo;Website&rdquo; or &ldquo;Service&rdquo;), owned and operated by Liberty Printer Fix (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), an independent technical resource operating in the State of Florida, United States.
      </p>

      <p style={paragraphStyle}>
        Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully before using our Website. By accessing, browsing, or using any part of Liberty Printer Fix, you agree to be bound by these Terms and our <Link href="/privacy-policy" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>Privacy Policy</Link>. If you do not agree to all of these Terms, you must immediately discontinue use of the Website.
      </p>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '2rem 0' }} />

      <h2 style={headingStyle}>1. Independent Informational Publisher Disclaimer</h2>
      <p style={paragraphStyle}>
        <strong>Liberty Printer Fix is an independent informational technical publisher and knowledge base.</strong> We are not affiliated with, authorized by, sponsored by, or an official service agent of Hewlett-Packard (HP), Canon, Epson, Brother, Lexmark, Zebra, Bixolon, Dymo, Rollo, or any other printer or hardware manufacturer.
      </p>
      <p style={paragraphStyle}>
        All trademarks, brand names, service marks, model numbers, and trade names referenced on this Website are the exclusive property of their respective owners. They are used on this Website strictly under the doctrine of <em>nominative fair use</em> for identification, reference, and informational troubleshooting purposes only.
      </p>

      <h2 style={headingStyle}>2. Educational and Informational Purpose Only (&ldquo;As-Is&rdquo;)</h2>
      <p style={paragraphStyle}>
        All content provided on Liberty Printer Fix—including step-by-step repair guides, diagnostic error decoders, setup instructions, hardware disassembly walkthroughs, and maintenance tutorials—is published solely for general educational, diagnostic, and informational purposes.
      </p>
      <p style={paragraphStyle}>
        <strong>Hardware Risk Acknowledgment:</strong> Troubleshooting and repairing electrical equipment, mechanical paper transports, high-voltage laser printer fusers, and electronic logic boards carry inherent risks, including but not limited to equipment damage, personal electrical shock, voiding manufacturer warranties, or permanent device failure.
      </p>
      <p style={paragraphStyle}>
        Any action you take based on the information found on this Website is strictly at your own discretion and risk. You are solely responsible for ensuring equipment is safely disconnected from electrical sources before undertaking maintenance and for adhering to the official safety warnings of the equipment manufacturer.
      </p>

      <h2 style={headingStyle}>3. Intellectual Property Rights</h2>
      <p style={paragraphStyle}>
        Unless otherwise stated, all original content on this Website—including text, diagnostic diagrams, organizational structure, graphics, benchmarks, research data, custom algorithms, and software code—is the proprietary property of Liberty Printer Fix and is protected by United States and international copyright, trademark, and intellectual property laws.
      </p>
      <p style={paragraphStyle}>
        You are granted a limited, non-exclusive, non-transferable license to access and view the content on your personal device for non-commercial, personal use. You may not republish, distribute, scrape, frame, mirror, or create derivative works from our articles without our prior written consent.
      </p>

      <h2 style={headingStyle}>4. Prohibited Uses</h2>
      <p style={paragraphStyle}>You agree that you will not use this Website for any purpose that is unlawful or prohibited by these Terms, including but not limited to:</p>
      <ul style={listStyle}>
        <li>Using any automated system, spider, robot, scraper, or data mining tool to extract content, articles, or data without express written authorization;</li>
        <li>Attempting to interfere with, compromise the system integrity of, or decipher any transmissions to or from our hosting servers;</li>
        <li>Impersonating any person or entity, or falsely stating or misrepresenting your affiliation with any person or organization;</li>
        <li>Introducing any malicious code, trojans, worms, or other harmful technological material to the Website;</li>
        <li>Using the Website in any manner that could disable, overburden, damage, or impair the site or interfere with any other party&apos;s use.</li>
      </ul>

      <h2 style={headingStyle}>5. User Communications &amp; Submissions</h2>
      <p style={paragraphStyle}>
        If you submit inquiries, feedback, corrections, technical notes, or comments through our contact forms or email channels, you grant us an unrestricted, royalty-free, perpetual license to use, reproduce, modify, and publish that information for editorial improvement, user assistance, and website operation. We will handle all personal contact details in accordance with our <Link href="/privacy-policy" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>Privacy Policy</Link>.
      </p>

      <h2 style={headingStyle}>6. Third-Party Links &amp; External Services</h2>
      <p style={paragraphStyle}>
        Our Website may contain hyperlinks to third-party websites, official manufacturer support portals, driver download pages, or third-party tools that are not owned or controlled by Liberty Printer Fix.
      </p>
      <p style={paragraphStyle}>
        We have no control over, and assume no responsibility for, the content, privacy policies, software downloads, or practices of any third-party websites. Inclusion of any link does not imply endorsement by Liberty Printer Fix. We encourage you to review the terms and privacy statements of any external site you visit.
      </p>

      <h2 style={headingStyle}>7. Disclaimer of Warranties</h2>
      <p style={paragraphStyle}>
        THE WEBSITE AND ALL CONTENT, ARTICLES, GUIDES, AND SERVICES PROVIDED ON OR THROUGH THE WEBSITE ARE PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
      </p>
      <p style={paragraphStyle}>
        LIBERTY PRINTER FIX EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, WORKMANSHIP, TITLE, ACCURACY, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE WEBSITE WILL BE UNINTERRUPTED, TIMELY, SECURE, ERROR-FREE, OR THAT ANY DEFECTS WILL BE CORRECTED.
      </p>

      <h2 style={headingStyle}>8. Limitation of Liability</h2>
      <p style={paragraphStyle}>
        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL LIBERTY PRINTER FIX, ITS FOUNDERS, EMPLOYEES, CONTRACTORS, AUTHORS, OR AGENTS BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES (INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF PROFITS, DATA, USE, GOODWILL, EQUIPMENT BREAKAGE, OR OTHER INTANGIBLE LOSSES) ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF, OR INABILITY TO USE, THIS WEBSITE OR ANY INFORMATION PUBLISHED HEREIN.
      </p>

      <h2 style={headingStyle}>9. Indemnification</h2>
      <p style={paragraphStyle}>
        You agree to defend, indemnify, and hold harmless Liberty Printer Fix, its officers, directors, contractors, and employees from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys&apos; fees) arising out of or relating to your violation of these Terms or your use of the Website.
      </p>

      <h2 style={headingStyle}>10. Governing Law &amp; Jurisdiction</h2>
      <p style={paragraphStyle}>
        These Terms shall be governed by and construed in accordance with the laws of the State of Florida, United States, without regard to its conflict of law provisions. Any legal suit, action, or proceeding arising out of or related to these Terms or the Website shall be instituted exclusively in the federal or state courts located in Florida.
      </p>

      <h2 style={headingStyle}>11. Modifications to Terms</h2>
      <p style={paragraphStyle}>
        We reserve the right, at our sole discretion, to modify, update, or replace these Terms at any time. When changes are made, we will revise the &ldquo;Last Updated&rdquo; date at the top of this page. Your continued use of the Website following the posting of any changes constitutes acceptance of those revisions.
      </p>

      <h2 style={headingStyle}>12. Contact Information</h2>
      <p style={paragraphStyle}>
        If you have any questions, legal notices, or inquiries regarding these Terms of Service, please contact us:
      </p>
      <ul style={listStyle}>
        <li><strong>By Email:</strong> <a href="mailto:legal@libertyprinterfix.com" style={{ color: 'var(--primary-color)' }}>legal@libertyprinterfix.com</a></li>
        <li><strong>General Support &amp; Editorial:</strong> <a href="mailto:info@libertyprinterfix.com" style={{ color: 'var(--primary-color)' }}>info@libertyprinterfix.com</a></li>
        <li><strong>Via Website:</strong> <Link href="/contact" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>https://libertyprinterfix.com/contact</Link></li>
        <li><strong>Jurisdiction:</strong> State of Florida, United States</li>
      </ul>
    </div>
  );
}
