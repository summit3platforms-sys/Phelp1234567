import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [
    totalArticles,
    publishedArticles,
    draftArticles,
    brandsCount,
    categoriesCount
  ] = await Promise.all([
    prisma.article.count(),
    prisma.article.count({ where: { status: 'published' } }),
    prisma.article.count({ where: { status: 'draft' } }),
    prisma.brand.count(),
    prisma.category.count(),
  ]);

  const statBoxStyle = {
    padding: '1.5rem',
    background: '#fff',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    textAlign: 'center' as const,
  };

  const statNumberStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'var(--primary-color)',
    marginTop: '0.5rem'
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Dashboard Overview</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <div style={statBoxStyle}>
          <h3>Total Articles</h3>
          <div style={statNumberStyle}>{totalArticles}</div>
        </div>
        <div style={statBoxStyle}>
          <h3>Published</h3>
          <div style={statNumberStyle}>{publishedArticles}</div>
        </div>
        <div style={statBoxStyle}>
          <h3>Drafts</h3>
          <div style={statNumberStyle}>{draftArticles}</div>
        </div>
        <div style={statBoxStyle}>
          <h3>Brands</h3>
          <div style={statNumberStyle}>{brandsCount}</div>
        </div>
        <div style={statBoxStyle}>
          <h3>Categories</h3>
          <div style={statNumberStyle}>{categoriesCount}</div>
        </div>
      </div>
    </div>
  );
}
