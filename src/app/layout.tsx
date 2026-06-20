import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LibertyPrinterFix - Printer Troubleshooting & Error Codes",
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
              <span>Liberty<span style={{ color: 'var(--accent-color)' }}>PrinterFix</span></span>
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
          <div className="container">
            <div className="footer-grid">
              <div className="footer-col footer-info">
                <Link href="/" className="logo" style={{ marginBottom: '1rem' }}>
                  <span className="logo-emoji">🖨️</span>
                  <span>Liberty<span style={{ color: 'var(--accent-color)' }}>PrinterFix</span></span>
                </Link>
                <p className="footer-desc">
                  The ultimate independent database for printer troubleshooting, setup guides, ink/toner fixes, and diagnostic error codes.
                </p>
                <div className="footer-contact-list">
                  <div className="footer-contact-item">
                    <span>📍</span> Global Support Database
                  </div>
                  <div className="footer-contact-item">
                    <span>✉️</span> info@libertyprinterfix.com
                  </div>
                </div>
              </div>

              <div className="footer-col">
                <h4 className="footer-col-title">Popular Brands</h4>
                <div className="footer-col-links">
                  <Link href="/brand/hp">HP Printers</Link>
                  <Link href="/brand/canon">Canon Printers</Link>
                  <Link href="/brand/epson">Epson Printers</Link>
                  <Link href="/brand/brother">Brother Printers</Link>
                  <Link href="/brands" style={{ fontWeight: '600', color: 'var(--primary-color)' }}>View All Brands ➔</Link>
                </div>
              </div>

              <div className="footer-col">
                <h4 className="footer-col-title">Common Topics</h4>
                <div className="footer-col-links">
                  <Link href="/search?q=Connectivity%20Issues">Connectivity Issues</Link>
                  <Link href="/search?q=Setup%20%26%20Installation">Setup & Installation</Link>
                  <Link href="/search?q=Printing%20Problems">Printing Problems</Link>
                  <Link href="/search?q=Paper%20Handling%20Issues">Paper Handling</Link>
                  <Link href="/search?q=Ink%20%26%20Toner%20Issues">Ink & Toner</Link>
                </div>
              </div>

              <div className="footer-col">
                <h4 className="footer-col-title">Legal & Help</h4>
                <div className="footer-col-links">
                  <Link href="/privacy-policy">Privacy Policy</Link>
                  <Link href="/about">About Us</Link>
                  <Link href="/contact">Contact Us</Link>
                  <Link href="/search">Search Guides</Link>
                  <a href="/sitemap.xml">XML Sitemap</a>
                </div>
              </div>
            </div>

            <hr className="footer-divider" />

            <div className="footer-bottom">
              <p className="footer-copyright">
                &copy; {new Date().getFullYear()} libertyprinterfix.com. All rights reserved. Real-time solutions for printer errors.
              </p>
              <p className="footer-disclaimer">
                Not affiliated with HP, Canon, Epson, Brother, or any OEM printer manufacturer.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
