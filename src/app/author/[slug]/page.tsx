import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

type PageParams = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const resolvedParams = await params;
  const author = await prisma.author.findUnique({ where: { slug: resolvedParams.slug } });
  if (!author) return { title: 'Author Not Found' };
  return {
    title: `${author.name} - ${author.role || 'Author'} | Liberty Printer Fix`,
    description: author.bio || `Articles and troubleshooting guides by ${author.name}.`,
    alternates: { canonical: `https://libertyprinterfix.com/author/${author.slug}` },
  };
}

export default async function AuthorPage({ params }: PageParams) {
  const resolvedParams = await params;
  const author = await prisma.author.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      articles: {
        where: { status: 'published' },
        orderBy: { publishedAt: 'desc' },
        take: 50,
        include: { brand: true, category: true }
      }
    }
  });

  if (!author) {
    notFound();
  }

  // Build sameAs array for Person schema
  const sameAs: string[] = [];
  if ((author as any).linkedinUrl) sameAs.push((author as any).linkedinUrl);
  if ((author as any).twitterUrl) sameAs.push((author as any).twitterUrl);
  if ((author as any).credentialsUrl) sameAs.push((author as any).credentialsUrl);

  // JSON-LD graph (BreadcrumbList + Person) for E-E-A-T
  const authorJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://libertyprinterfix.com/" },
          { "@type": "ListItem", "position": 2, "name": "About", "item": "https://libertyprinterfix.com/about" },
          { "@type": "ListItem", "position": 3, "name": author.name, "item": `https://libertyprinterfix.com/author/${author.slug}` }
        ]
      },
      {
        "@type": "Person",
        "name": author.name,
        "url": `https://libertyprinterfix.com/author/${author.slug}`,
        "jobTitle": author.role || "Technical Expert",
        "description": author.bio || `Technical writer and printer support specialist at LibertyPrinterFix.`,
        "worksFor": {
          "@type": "Organization",
          "@id": "https://libertyprinterfix.com/#organization",
          "name": "LibertyPrinterFix"
        },
        ...(author.image ? { "image": author.image } : {}),
        ...(sameAs.length > 0 ? { "sameAs": sameAs } : {}),
        ...(author.experienceYears ? { "knowsAbout": ["Printer Troubleshooting", "Technical Support", "Hardware Diagnostics"] } : {})
      }
    ]
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        <Link href="/">Home</Link> &gt; 
        <Link href="/about"> About</Link> &gt; 
        <span style={{ color: '#64748b' }}> {author.name}</span>
      </nav>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
        {author.image ? (
          <Image
            src={author.image}
            alt={`${author.name} - ${author.role || 'Author'}`}
            width={150}
            height={150}
            style={{ borderRadius: '50%', objectFit: 'cover', border: '4px solid #f8fafc', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
        ) : (
          <div style={{ width: '150px', height: '150px', borderRadius: '50%', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 'bold', color: '#fff' }}>
            {author.name.charAt(0)}
          </div>
        )}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#0f172a' }}>{author.name}</h1>
          <p style={{ fontSize: '1.1rem', color: '#0ea5e9', fontWeight: '600', marginBottom: '0.5rem' }}>
            {author.role} {author.experienceYears ? `• ${author.experienceYears}+ Years Experience` : ''}
          </p>
          {author.bio && (
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: '1.6', marginBottom: '0.75rem' }}>
              {author.bio}
            </p>
          )}
          {/* Social / Credential Links */}
          {sameAs.length > 0 && (
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {(author as any).linkedinUrl && (
                <a href={(author as any).linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: '#0077b5', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  🔗 LinkedIn Profile
                </a>
              )}
              {(author as any).twitterUrl && (
                <a href={(author as any).twitterUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: '#1da1f2', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  🐦 Twitter / X
                </a>
              )}
              {(author as any).credentialsUrl && (
                <a href={(author as any).credentialsUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  🏅 Credentials
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <h2 style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1.5rem', color: '#1e293b' }}>
        Guides by {author.name} ({author.articles.length})
      </h2>

      {author.articles.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {author.articles.map((article) => (
            <li key={article.id} style={{ marginBottom: '1rem' }}>
              <Link href={`/${article.brand?.slug || 'unknown'}/${article.category?.slug || 'uncategorized'}/${article.slug}`} style={{ textDecoration: 'none', color: '#0ea5e9', fontSize: '1.1rem', fontWeight: '500' }}>
                {article.title}
              </Link>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>
                {article.brand?.name || 'General'} • {new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: '#64748b' }}>No published guides yet.</p>
      )}
    </div>
  );
}
