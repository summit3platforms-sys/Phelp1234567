import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

type PageParams = { params: Promise<{ brandSlug: string; categorySlug: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const resolvedParams = await params;
  const brand = await prisma.brand.findUnique({ where: { slug: resolvedParams.brandSlug } });
  const category = await prisma.category.findUnique({ where: { slug: resolvedParams.categorySlug } });
  
  if (!brand || !category) return { title: 'Not Found' };
  
  return {
    title: `${brand.name} Printer ${category.name} - Troubleshooting Guides`,
    description: `Resolve ${brand.name} printer issues related to ${category.name.toLowerCase()}. Find step-by-step guides, error code solutions, and help.`,
  };
}

export default async function BrandCategoryPage({ params }: PageParams) {
  const resolvedParams = await params;
  const brand = await prisma.brand.findUnique({
    where: { slug: resolvedParams.brandSlug }
  });

  const category = await prisma.category.findUnique({
    where: { slug: resolvedParams.categorySlug }
  });

  if (!brand || !category) {
    notFound();
  }

  const articles = await prisma.article.findMany({
    where: {
      brandId: brand.id,
      categoryId: category.id,
      status: 'published'
    },
    orderBy: { publishedAt: 'desc' }
  });

  return (
    <div className="container page-top">
      {/* Automatic Breadcrumbs: Home → Brand → Category */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        <Link href="/">Home</Link> &gt; 
        <Link href={`/${brand.slug}`}> {brand.name}</Link> &gt; 
        <span style={{ color: 'var(--text-muted)' }}> {category.name}</span>
      </nav>

      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-color)', marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>
          {brand.name} Printer: {category.name}
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
          Browse all troubleshooting articles and solutions for {brand.name} printers under the {category.name.toLowerCase()} category.
        </p>
      </div>

      {articles.length === 0 ? (
        <div style={{ padding: '3rem', textAlign: 'center', background: '#fff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-muted)' }}>No articles found for {brand.name} in this category yet.</p>
          <Link href={`/${brand.slug}`} className="nav-btn" style={{ display: 'inline-block', marginTop: '1.5rem', marginLeft: 0 }}>Back to {brand.name} Support</Link>
        </div>
      ) : (
        <div className="articles-section" style={{ padding: '2rem' }}>
          <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--text-color)' }}>
              Guides & Solutions ({articles.length})
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {articles.map(article => (
              <div key={article.id} className="article-item" style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  {article.errorCode && (
                    <span className="meta-badge badge-error" style={{ fontSize: '0.75rem' }}>
                      Code: {article.errorCode}
                    </span>
                  )}
                  {article.printerModel && (
                    <span className="meta-badge badge-brand" style={{ fontSize: '0.75rem', background: 'rgba(0, 45, 98, 0.05)', color: 'var(--primary-color)' }}>
                      Model: {article.printerModel}
                    </span>
                  )}
                </div>
                <Link href={`/${brand.slug}/${category.slug}/${article.slug}`} style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-color)', lineHeight: '1.4', marginBottom: '0.75rem', display: 'block' }}>
                  {article.title}
                </Link>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1.5rem', flexGrow: 1 }}>
                  {article.metaDescription || `Troubleshooting and fixing guide for ${article.title}.`}
                </p>
                <div className="article-footer" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <span className="article-date" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Updated: {new Date(article.updatedAt).toLocaleDateString()}
                  </span>
                  <Link href={`/${brand.slug}/${category.slug}/${article.slug}`} className="read-more" style={{ fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    Read Guide ➔
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
