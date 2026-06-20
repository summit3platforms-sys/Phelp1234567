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
            <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
              PrinterFix DB
            </Link>
            <nav>
              <Link href="/search" style={{ marginLeft: '1rem' }}>Search</Link>
            </nav>
          </div>
        </header>

        <main className="main-content container">
          {children}
        </main>

        <footer className="footer">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} Printer Troubleshooting DB. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
