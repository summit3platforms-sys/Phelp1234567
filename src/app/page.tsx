import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const brands = await prisma.brand.findMany({
    orderBy: { name: 'asc' }
  });

  const recentArticles = await prisma.article.findMany({
    where: { status: 'published' },
    orderBy: { publishedAt: 'desc' },
    take: 10,
    include: {
      brand: true,
      category: true
    }
  });

  return (
    <div>
      <section style={{ marginBottom: '3rem', textAlign: 'center', padding: '3rem 0', background: 'var(--secondary-color)', borderRadius: '8px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Printer Troubleshooting Knowledge Base</h1>
        <p style={{ fontSize: '1.2rem', color: '#555' }}>Find step-by-step solutions for printer errors, setup issues, and offline problems.</p>
        <div style={{ marginTop: '2rem' }}>
          <Link href="/search" style={{ background: 'var(--primary-color)', color: 'white', padding: '0.8rem 2rem', borderRadius: '4px', fontSize: '1.1rem' }}>
            Search Error Codes
          </Link>
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div>
          <h2 style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Browse by Brand</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {brands.map(brand => (
              <li key={brand.id} style={{ marginBottom: '0.5rem' }}>
                <Link href={`/brand/${brand.slug}`} style={{ display: 'block', padding: '0.5rem', background: 'var(--secondary-color)', borderRadius: '4px' }}>
                  {brand.name} Printers
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Recent Articles</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {recentArticles.map(article => (
              <li key={article.id} style={{ marginBottom: '1rem' }}>
                <Link href={`/${article.brand.slug}/${article.category.slug}/${article.slug}`} style={{ fontWeight: 'bold' }}>
                  {article.title}
                </Link>
                <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.2rem' }}>
                  {article.brand.name} &bull; {article.category.name}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
