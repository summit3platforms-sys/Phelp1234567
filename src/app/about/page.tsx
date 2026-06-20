import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - PrinterFix DB",
  description: "Learn more about PrinterFix DB, your ultimate knowledge base for printer troubleshooting, setup, and error codes.",
};

export default function AboutPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
        About PrinterFix.db
      </h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#334155', lineHeight: '1.75' }}>
        <p>
          Welcome to <strong>PrinterFix.db</strong>, the internet's premier independent repository for printer troubleshooting, setup guides, and error code solutions. Our goal is to make printer repairs accessible, clear, and actionable for everyone.
        </p>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginTop: '1rem' }}>Our Mission</h2>
        <p>
          Printers are essential tools for homes and offices alike, but they are notoriously prone to errors, connectivity drops, and hardware jams. Getting professional technical support can be time-consuming and expensive. We exist to close that gap by providing step-by-step guides that allow users to resolve complex issues themselves.
        </p>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginTop: '1rem' }}>What We Offer</h2>
        <ul>
          <li><strong>Error Code Breakdown</strong>: Clear definitions of cryptic error codes (e.g. 0x6100004a, 5100) and step-by-step resolution steps.</li>
          <li><strong>Step-by-Step Setup Guides</strong>: Seamless guides to connect your brand-new printer to Wi-Fi, install correct drivers, and configure software.</li>
          <li><strong>Independent Advice</strong>: Covering all major brands including HP, Canon, Epson, Brother, Lexmark, and more.</li>
        </ul>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginTop: '1rem' }}>Independent Support</h2>
        <p>
          Please note that PrinterFix.db is an independent resource and is not affiliated, endorsed, or partnered with any printer manufacturers mentioned on our site. All brand names, logos, and trademarks remain the property of their respective owners and are used purely for informational and reference purposes.
        </p>
      </div>
    </div>
  );
}
