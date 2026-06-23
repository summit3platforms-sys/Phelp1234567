import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

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

  // Fetch categories with active guides for this brand
  const brandCategories = await prisma.category.findMany({
    include: {
      articles: {
        where: {
          brandId: article.brandId,
          status: 'published'
        },
        select: { id: true }
      }
    }
  });
  const activeBrandCategories = brandCategories.filter(cat => cat.articles.length > 0);

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

          {/* Author Biography Card below Article */}
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
          {/* Sidebar Author Box (optional short bio) */}
          {article.author && (
            <div className="sidebar-widget" style={{ textAlign: 'center' }}>
              <h3 className="widget-title">About The Author</h3>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                {article.author.image ? (
                  <img src={article.author.image} alt={article.author.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--border-color)' }} />
                ) : (
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '2rem', color: '#fff', border: '3px solid var(--border-color)' }}>
                    {article.author.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{article.author.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>{article.author.role}</div>
                </div>
                {article.author.bio && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                    {article.author.bio.length > 90 ? `${article.author.bio.substring(0, 90)}...` : article.author.bio}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Categories Widget */}
          <div className="sidebar-widget">
            <h3 className="widget-title">{article.brand.name} Categories</h3>
            <ul className="widget-list">
              {activeBrandCategories.map(cat => (
                <li key={cat.id} className="widget-list-item">
                  <Link href={`/${article.brand.slug}/${cat.slug}`} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <span>{cat.name}</span>
                    <span className="widget-count-badge">{cat.articles.length}</span>
                  </Link>
                </li>
              ))}
            </ul>
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

          {/* Quick Help CTA Widget */}
          <div className="sidebar-widget" style={{ background: 'linear-gradient(135deg, #002d62 0%, #001a3a 100%)', color: '#fff', border: 'none', textAlign: 'center', padding: '2rem 1.5rem' }}>
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>🛠️</span>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Need Expert Help?</h4>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.5', marginBottom: '1.5rem' }}>
              If you can't resolve your printer error, submit details and our technicians will assist you.
            </p>
            <Link href="/" style={{ display: 'inline-block', background: '#fff', color: 'var(--primary-color)', width: 'auto', padding: '0.6rem 1.25rem', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 'bold', textDecoration: 'none' }}>
              Get Support Now
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
