import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ brandSlug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const brand = await prisma.brand.findUnique({ where: { slug: resolvedParams.brandSlug } });
  if (!brand) return { title: 'Not Found' };
  
  return {
    title: `${brand.name} Printer Troubleshooting & Error Codes`,
    description: brand.description || `Find solutions for ${brand.name} printer errors, setup issues, and offline problems.`,
  };
}

export default async function BrandPage({ params }: { params: Promise<{ brandSlug: string }> }) {
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

  // Group articles by category
  const categorizedArticles = brand.articles.reduce((acc, article) => {
    const catName = article.category.name;
    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(article);
    return acc;
  }, {} as Record<string, typeof brand.articles>);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>{brand.name} Printers</h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>{brand.description || `Troubleshooting guides and error codes for ${brand.name} printers.`}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {Object.entries(categorizedArticles).map(([categoryName, articles]) => (
          <section key={categoryName} style={{ background: '#fff', padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <h2 style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
              {categoryName}
            </h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {articles.map(article => (
                <li key={article.id} style={{ marginBottom: '0.8rem' }}>
                  <Link href={`/${brand.slug}/${article.category.slug}/${article.slug}`} style={{ fontWeight: 'bold' }}>
                    {article.title}
                  </Link>
                  {article.errorCode && (
                    <span style={{ marginLeft: '1rem', background: '#fce4ec', color: '#c2185b', padding: '0.1rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' }}>
                      Code: {article.errorCode}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
