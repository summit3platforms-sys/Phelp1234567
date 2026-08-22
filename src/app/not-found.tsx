import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | LibertyPrinterFix",
  description: "The printer troubleshooting guide you are looking for has moved or does not exist. Search our database of error codes.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="container page-top" style={{ maxWidth: '800px', textAlign: 'center', padding: '4rem 1rem' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🖨️⚠️</div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
        404 - Guide Not Found
      </h1>
      <p style={{ fontSize: '1.15rem', color: '#64748b', lineHeight: '1.6', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
        The printer troubleshooting article or error code guide you are looking for might have been updated, renamed, or moved.
      </p>

      {/* Search Bar for Recovery */}
      <form action="/search" method="GET" className="search-form" style={{ maxWidth: '550px', margin: '0 auto 3rem auto' }}>
        <div className="search-icon">🔍</div>
        <input 
          type="text" 
          name="q" 
          placeholder="Search by error code (e.g., 5100, 0x6100004a) or brand..." 
          className="search-input"
          required
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {/* Quick Brand Links */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '2rem', textAlign: 'left' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', textAlign: 'center' }}>
          Or Browse Solutions by Printer Brand
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
          {[
            { name: "HP Support", href: "/hp", emoji: "🖨️" },
            { name: "Canon Support", href: "/canon", emoji: "📷" },
            { name: "Epson Support", href: "/epson", emoji: "🎨" },
            { name: "Brother Support", href: "/brother", emoji: "🏢" },
            { name: "DYMO Support", href: "/dymo", emoji: "🏷️" },
            { name: "Dascom Support", href: "/dascom", emoji: "⚡" },
          ].map((item, idx) => (
            <Link 
              key={idx} 
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontWeight: 600,
                color: '#0f172a',
                fontSize: '0.9rem',
                textDecoration: 'none',
                transition: 'border-color 0.15s',
              }}
            >
              <span>{item.emoji}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link href="/" className="nav-btn" style={{ display: 'inline-block', marginLeft: 0 }}>
            Back to Homepage ➔
          </Link>
        </div>
      </div>
    </div>
  );
}
