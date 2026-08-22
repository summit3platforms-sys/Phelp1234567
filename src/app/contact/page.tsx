import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us - LibertyPrinterFix",
  description: "Get in touch with the team at LibertyPrinterFix for support, feedback, or inquiries.",
  alternates: {
    canonical: "https://libertyprinterfix.com/contact",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://libertyprinterfix.com/" },
          { "@type": "ListItem", "position": 2, "name": "Contact Us", "item": "https://libertyprinterfix.com/contact" }
        ]
      },
      {
        "@type": "ContactPage",
        "name": "Contact LibertyPrinterFix",
        "url": "https://libertyprinterfix.com/contact",
        "description": "Get in touch with the team at LibertyPrinterFix for support, feedback, or inquiries.",
        "mainEntity": {
          "@type": "Organization",
          "@id": "https://libertyprinterfix.com/#organization"
        }
      }
    ]
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem 0' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        <Link href="/">Home</Link> &gt; 
        <span style={{ color: 'var(--text-muted)' }}> Contact Us</span>
      </nav>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>
        Contact Us
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.05rem' }}>
        Have feedback, questions, or a printer error code that we haven't covered yet? Get in touch with us!
      </p>

      <form 
        style={{
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.5rem',
          background: 'white',
          padding: '2rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="name" style={{ fontWeight: 600, fontSize: '0.9rem', color: '#334155' }}>Your Name</label>
          <input 
            type="text" 
            id="name" 
            placeholder="John Doe" 
            required 
            style={{
              padding: '0.75rem',
              fontSize: '1rem',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              outline: 'none',
              fontFamily: 'var(--font-family)'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="email" style={{ fontWeight: 600, fontSize: '0.9rem', color: '#334155' }}>Email Address</label>
          <input 
            type="email" 
            id="email" 
            placeholder="john@example.com" 
            required 
            style={{
              padding: '0.75rem',
              fontSize: '1rem',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              outline: 'none',
              fontFamily: 'var(--font-family)'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="message" style={{ fontWeight: 600, fontSize: '0.9rem', color: '#334155' }}>Your Message</label>
          <textarea 
            id="message" 
            rows={5} 
            placeholder="Describe the issue or error code you are encountering..." 
            required 
            style={{
              padding: '0.75rem',
              fontSize: '1rem',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              outline: 'none',
              fontFamily: 'var(--font-family)',
              resize: 'vertical'
            }}
          />
        </div>

        <button 
          type="submit" 
          style={{
            background: 'var(--primary-gradient)',
            color: 'white',
            border: 'none',
            padding: '1rem',
            fontSize: '1rem',
            fontWeight: 700,
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
            transition: 'opacity var(--transition-fast)'
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
