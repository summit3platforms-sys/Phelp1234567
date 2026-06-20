import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Printer Errors - PrinterFix DB",
  description: "Search our database for printer error codes, models, and troubleshooting steps.",
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q || "";

  let results: any[] = [];

  if (q) {
    results = await prisma.article.findMany({
      where: {
        status: 'published',
        OR: [
          { title: { contains: q } },
          { content: { contains: q } },
          { errorCode: { contains: q } },
          { printerModel: { contains: q } },
          { brand: { name: { contains: q } } },
        ]
      },
      include: {
        brand: true,
        category: true
      },
      take: 20
    });
  }

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Search Knowledge Base</h1>
      
      <form action="/search" method="GET" style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem' }}>
        <input 
          type="text" 
          name="q" 
          defaultValue={q} 
          placeholder="Search for error codes (e.g. 5100), brands, or problems..." 
          style={{ flex: 1, padding: '0.8rem', fontSize: '1rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}
        />
        <button type="submit" style={{ padding: '0.8rem 2rem', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}>
          Search
        </button>
      </form>

      {q && (
        <div style={{ marginBottom: '1rem', color: '#666' }}>
          Showing results for "{q}"
        </div>
      )}

      {q && results.length === 0 && (
        <div style={{ padding: '2rem', background: '#f9f9f9', borderRadius: '4px', textAlign: 'center' }}>
          No results found for "{q}". Please try different keywords.
        </div>
      )}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {results.map(article => (
          <li key={article.id} style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px', background: '#fff' }}>
            <Link href={`/${article.brand.slug}/${article.category.slug}/${article.slug}`} style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              {article.title}
            </Link>
            <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
              {article.brand.name} &bull; {article.category.name}
              {article.errorCode && <span style={{ marginLeft: '1rem', color: '#c2185b' }}>Error Code: {article.errorCode}</span>}
            </div>
            <p style={{ color: '#444', fontSize: '0.95rem' }}>
              {article.metaDescription || article.content.substring(0, 150).replace(/<[^>]+>/g, '') + '...'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
