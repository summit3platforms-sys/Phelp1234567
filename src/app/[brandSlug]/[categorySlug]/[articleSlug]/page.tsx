import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import LeadCaptureForm from "@/components/LeadCaptureForm";

type PageParams = { params: Promise<{ brandSlug: string; categorySlug: string; articleSlug: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await prisma.article.findUnique({
    where: { slug: resolvedParams.articleSlug },
    include: { brand: true }
  });

  if (!article || article.brand.slug !== resolvedParams.brandSlug || article.status !== 'published') {
    return { title: 'Not Found' };
  }

  return {
    title: article.seoTitle || `${article.title} - ${article.brand.name} Support`,
    description: article.metaDescription || `Troubleshooting guide for ${article.title}.`,
  };
}

export default async function ArticlePage({ params }: PageParams) {
  const resolvedParams = await params;
  const article = await prisma.article.findUnique({
    where: { slug: resolvedParams.articleSlug },
    include: {
      brand: true,
      category: true,
      author: true,
    }
  });

  if (!article || article.brand.slug !== resolvedParams.brandSlug || article.category.slug !== resolvedParams.categorySlug || article.status !== 'published') {
    notFound();
  }

  // Fetch related articles (same brand, excluding current guide)
  const relatedArticles = await prisma.article.findMany({
    where: {
      brandId: article.brandId,
      status: 'published',
      NOT: { id: article.id }
    },
    orderBy: { publishedAt: 'desc' },
    take: 5,
    include: { category: true }
  });

  // Schema.org JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://libertyprinterfix.com/" },
          { "@type": "ListItem", "position": 2, "name": article.brand.name, "item": `https://libertyprinterfix.com/${article.brand.slug}` },
          { "@type": "ListItem", "position": 3, "name": article.category.name, "item": `https://libertyprinterfix.com/${article.brand.slug}/${article.category.slug}` },
          { "@type": "ListItem", "position": 4, "name": article.title, "item": `https://libertyprinterfix.com/${article.brand.slug}/${article.category.slug}/${article.slug}` }
        ]
      },
      {
        "@type": "Article",
        "headline": article.title,
        "datePublished": article.publishedAt?.toISOString(),
        "dateModified": article.updatedAt.toISOString(),
        "author": {
          "@type": "Organization",
          "name": "LibertyPrinterFix"
        }
      }
    ]
  };

  return (
    <div className="container page-top">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        <Link href="/">Home</Link> &gt; 
        <Link href={`/${article.brand.slug}`}> {article.brand.name}</Link> &gt; 
        <Link href={`/${article.brand.slug}/${article.category.slug}`}> {article.category.name}</Link> &gt; 
        <span style={{ color: 'var(--text-muted)' }}> {article.title}</span>
      </nav>

      {/* WordPress-style Layout Grid */}
      <div className="article-layout-grid">
        {/* Main Column */}
        <div className="article-main-col">
          <article className="article-page-container" style={{ margin: 0 }}>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            
            <header style={{ marginBottom: '2rem' }}>
              <h1 className="article-page-title">{article.title}</h1>
              <div style={{ color: '#666', fontSize: '0.9rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                {article.author && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {article.author.image ? (
                      <img src={article.author.image} alt={article.author.name} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem', color: '#fff' }}>
                        {article.author.name.charAt(0)}
                      </div>
                    )}
                    <span>By <strong>{article.author.name}</strong></span>
                  </div>
                )}
                <span>Updated: {new Date(article.updatedAt).toLocaleDateString()}</span>
                {article.errorCode && <span>Error Code: <strong style={{ color: '#c2185b' }}>{article.errorCode}</strong></span>}
                {article.printerModel && <span>Model: <strong>{article.printerModel}</strong></span>}
              </div>
            </header>

            {article.featuredImage && (
              <div style={{ marginBottom: '2rem' }}>
                <img src={article.featuredImage} alt={article.title} style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
              </div>
            )}

            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content }} 
              style={{ fontSize: '1.1rem', lineHeight: '1.8' }}
            />
          </article>

          {/* Author Biography Box below Article */}
          {article.author && (
            <div className="author-bio-card">
              <div className="author-bio-header">
                {article.author.image ? (
                  <img src={article.author.image} alt={article.author.name} className="author-avatar" />
                ) : (
                  <div className="author-avatar-fallback">
                    {article.author.name.charAt(0)}
                  </div>
                )}
                <div className="author-info">
                  <h4 className="author-name">{article.author.name}</h4>
                  <p className="author-role">{article.author.role}</p>
                </div>
              </div>
              {article.author.bio && <p className="author-bio-text">{article.author.bio}</p>}
            </div>
          )}
        </div>

        {/* Sidebar Column */}
        <aside className="article-sidebar-col">
          {/* Lead Capture Form Widget */}
          <div style={{ width: '100%' }}>
            <LeadCaptureForm />
          </div>

          {/* Related Guides Widget */}
          <div className="sidebar-widget">
            <h3 className="widget-title">Related Guides</h3>
            <ul className="widget-list">
              {relatedArticles.map(rel => (
                <li key={rel.id} className="widget-list-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.2rem' }}>
                  <Link href={`/${article.brand.slug}/${rel.category.slug}/${rel.slug}`} style={{ fontWeight: '600', lineHeight: '1.4' }}>
                    {rel.title}
                  </Link>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {rel.category.name}
                  </span>
                </li>
              ))}
              {relatedArticles.length === 0 && (
                <li style={{ color: 'var(--text-muted)', fontSize: '0.9rem', padding: '0.5rem 0' }}>No other guides for {article.brand.name}.</li>
              )}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
