import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

type PageParams = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const resolvedParams = await params;
  const author = await prisma.author.findUnique({ where: { slug: resolvedParams.slug } });
  if (!author) return { title: 'Author Not Found' };
  return {
    title: `${author.name} - ${author.role || 'Author'} | Liberty Printer Fix`,
    description: author.bio || `Articles and troubleshooting guides by ${author.name}.`,
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
        take: 20,
        include: { brand: true, category: true }
      }
    }
  });

  if (!author) {
    notFound();
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
        {author.image ? (
          <img
            src={author.image}
            alt={author.name}
            style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #f8fafc', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
        ) : (
          <div style={{ width: '150px', height: '150px', borderRadius: '50%', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 'bold', color: '#fff' }}>
            {author.name.charAt(0)}
          </div>
        )}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#0f172a' }}>{author.name}</h1>
          <p style={{ fontSize: '1.1rem', color: '#0ea5e9', fontWeight: '600', marginBottom: '1rem' }}>
            {author.role} {author.experienceYears ? `• ${author.experienceYears}+ Years Experience` : ''}
          </p>
          {author.bio && (
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: '1.6' }}>
              {author.bio}
            </p>
          )}
        </div>
      </div>

      <h2 style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1.5rem', color: '#1e293b' }}>
        Guides by {author.name}
      </h2>

      {author.articles.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {author.articles.map((article) => (
            <li key={article.id} style={{ marginBottom: '1rem' }}>
              <Link href={`/${article.brand?.slug || 'unknown'}/${article.category?.slug || 'uncategorized'}/${article.slug}`} style={{ textDecoration: 'none', color: '#0ea5e9', fontSize: '1.1rem', fontWeight: '500' }}>
                {article.title}
              </Link>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>
                {new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
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
