import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Printer Troubleshooting & Error Codes Knowledge Base",
  description: "Find solutions, error codes, and troubleshooting steps for all major printer brands including HP, Canon, Epson, and Brother.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="container">
            <Link href="/" className="logo">
              <span className="logo-emoji">🖨️</span>
              <span>PrinterFix<span style={{ color: 'var(--accent-color)' }}>.db</span></span>
            </Link>
            <nav className="nav-links">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/privacy-policy" className="nav-link">Privacy Policy</Link>
              <Link href="/about" className="nav-link">About</Link>
              <Link href="/contact" className="nav-link">Contact</Link>
            </nav>
          </div>
        </header>

        <main className="main-content container">
          {children}
        </main>

        <footer className="footer">
          <div className="container footer-content">
            <div className="logo" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              <span className="logo-emoji">🖨️</span>
              <span>PrinterFix<span style={{ color: 'var(--accent-color)' }}>.db</span></span>
            </div>
            <p className="footer-text">&copy; {new Date().getFullYear()} Printer Troubleshooting DB. Real-time solutions for printer errors.</p>
            <div className="footer-links" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="/" className="footer-link">Home</Link>
              <Link href="/search" className="footer-link">Search Guides</Link>
              <Link href="/privacy-policy" className="footer-link">Privacy Policy</Link>
              <Link href="/about" className="footer-link">About Us</Link>
              <Link href="/contact" className="footer-link">Contact Us</Link>
              <a href="/sitemap.xml" className="footer-link">Sitemap</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
