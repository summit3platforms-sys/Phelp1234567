import { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us - LibertyPrinterFix",
  description: "Get in touch with the team at LibertyPrinterFix for technical support, feedback, or printer repair inquiries.",
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
        "description": "Get in touch with the team at LibertyPrinterFix for technical support, feedback, or printer repair inquiries.",
        "mainEntity": {
          "@type": "Organization",
          "@id": "https://libertyprinterfix.com/#organization"
        }
      }
    ]
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '2rem 1rem' }}>
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
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.05rem', lineHeight: '1.5' }}>
        Have feedback, questions, or an unresolved printer error? Send us a message and our technical support specialists will get back to you.
      </p>

      <ContactForm />
    </div>
  );
}
