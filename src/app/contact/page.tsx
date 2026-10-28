import { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us - Liberty Printer Fix",
  description: "Get in touch with the editorial, research, and technical team at Liberty Printer Fix. Send guide feedback, corrections, or general inquiries.",
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
        "name": "Contact Liberty Printer Fix",
        "url": "https://libertyprinterfix.com/contact",
        "description": "Get in touch with Liberty Printer Fix for editorial feedback, guide corrections, technical inquiries, or general support.",
        "mainEntity": {
          "@type": "Organization",
          "@id": "https://libertyprinterfix.com/#organization",
          "name": "Liberty Printer Fix",
          "email": "info@libertyprinterfix.com"
        }
      }
    ]
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        <Link href="/">Home</Link> &gt; 
        <span style={{ color: 'var(--text-muted)' }}> Contact Us</span>
      </nav>

      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.03em', color: '#0f172a' }}>
        Contact Liberty Printer Fix
      </h1>
      <p style={{ color: '#475569', marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
        Have a question about one of our troubleshooting guides, an editorial correction, or feedback for our team? We are here to help. Reach out directly using our contact directory below or send a message using the form.
      </p>

      {/* Contact Channels Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
        {/* Editorial & General */}
        <div style={{ padding: '1.5rem', background: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✉️</div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.4rem 0' }}>Editorial &amp; Research</h3>
          <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5', margin: '0 0 0.75rem 0' }}>
            For guide feedback, firmware updates, or article corrections:
          </p>
          <a href="mailto:info@libertyprinterfix.com" style={{ color: 'var(--primary-color)', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}>
            info@libertyprinterfix.com
          </a>
        </div>

        {/* Legal & Privacy */}
        <div style={{ padding: '1.5rem', background: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚖️</div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.4rem 0' }}>Legal, Privacy &amp; DMCA</h3>
          <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5', margin: '0 0 0.75rem 0' }}>
            For trademark, copyright, or data privacy inquiries:
          </p>
          <a href="mailto:legal@libertyprinterfix.com" style={{ color: 'var(--primary-color)', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}>
            legal@libertyprinterfix.com
          </a>
        </div>

        {/* Location & Response Time */}
        <div style={{ padding: '1.5rem', background: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📍</div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.4rem 0' }}>Location &amp; Hours</h3>
          <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5', margin: '0 0 0.5rem 0' }}>
            Operating in Florida, United States.
          </p>
          <p style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: 600, margin: 0 }}>
            Response Time: 24–48 Business Hours (Mon–Fri)
          </p>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '2.5rem 0' }} />

      {/* Web Message Form */}
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
          Send a Message
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          Fill out the form below and our editorial and research staff will review your message.
        </p>

        <ContactForm />
      </div>
    </div>
  );
}
