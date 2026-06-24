import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

type PageParams = { params: Promise<{ brandSlug: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const resolvedParams = await params;
  const brand = await prisma.brand.findUnique({ where: { slug: resolvedParams.brandSlug } });
  if (!brand) return { title: 'Not Found' };
  
  return {
    title: `${brand.name} Printer Troubleshooting & Error Codes`,
    description: brand.description || `Find solutions for ${brand.name} printer errors, setup issues, and offline problems.`,
  };
}

export default async function BrandPage({ params }: PageParams) {
  const resolvedParams = await params;
  const brand = await prisma.brand.findUnique({
    where: { slug: resolvedParams.brandSlug },
    include: {
      articles: {
        where: { status: 'published' },
        orderBy: { publishedAt: 'desc' },
        include: { category: true }
      }
    }
  });

  if (!brand) {
    notFound();
  }

  // Group articles by category slug/object
  const categoriesMap = new Map<string, { name: string; slug: string; articles: typeof brand.articles }>();
  brand.articles.forEach(article => {
    const cat = article.category;
    if (!categoriesMap.has(cat.slug)) {
      categoriesMap.set(cat.slug, { name: cat.name, slug: cat.slug, articles: [] });
    }
    categoriesMap.get(cat.slug)!.articles.push(article);
  });

  const categories = Array.from(categoriesMap.values());

  return (
    <div className="container page-top">
      {/* Automatic Breadcrumbs */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        <Link href="/">Home</Link> &gt; 
        <span style={{ color: 'var(--text-muted)' }}> {brand.name}</span>
      </nav>

      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-color)', marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>
          {brand.name} Printer Help & Support
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
          {brand.description || `Troubleshooting guides, error codes, and step-by-step solutions for ${brand.name} printers.`}
        </p>
      </div>

      {categories.length === 0 ? (
        <div style={{ padding: '3rem', textAlign: 'center', background: '#fff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-muted)' }}>No troubleshooting guides available for {brand.name} printers at the moment.</p>
          <Link href="/" className="nav-btn" style={{ display: 'inline-block', marginTop: '1.5rem', marginLeft: 0 }}>Back to Home</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {categories.map(category => (
            <section key={category.slug} style={{ background: '#fff', padding: '2rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
                  <Link href={`/${brand.slug}/${category.slug}`} className="brand-category-heading-link">
                    {category.name}
                  </Link>
                </h2>
                <Link href={`/${brand.slug}/${category.slug}`} style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary-color)' }}>
                  View All ({category.articles.length}) ➔
                </Link>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                {category.articles.slice(0, 6).map(article => (
                  <li key={article.id} className="brand-article-list-item">
                    <Link href={`/${brand.slug}/${category.slug}/${article.slug}`} style={{ fontWeight: '700', color: 'var(--text-color)', fontSize: '1.05rem', lineHeight: '1.4' }}>
                      {article.title}
                    </Link>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.25rem' }}>
                      {article.errorCode && (
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '4px', background: '#fee2e2', color: '#ef4444' }}>
                          Code: {article.errorCode}
                        </span>
                      )}
                      {article.printerModel && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Model: <strong>{article.printerModel}</strong>
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
