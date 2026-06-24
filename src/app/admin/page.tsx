import { prisma } from "@/lib/prisma";
import Link from "next/link";

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
        <Link href="/admin/articles" className="admin-dashboard-card">
          <h3>Total Articles</h3>
          <div style={statNumberStyle}>{totalArticles}</div>
        </Link>
        <Link href="/admin/articles?status=published" className="admin-dashboard-card">
          <h3>Published</h3>
          <div style={statNumberStyle}>{publishedArticles}</div>
        </Link>
        <Link href="/admin/articles?status=draft" className="admin-dashboard-card">
          <h3>Drafts</h3>
          <div style={statNumberStyle}>{draftArticles}</div>
        </Link>
        <Link href="/admin/brands" className="admin-dashboard-card">
          <h3>Brands</h3>
          <div style={statNumberStyle}>{brandsCount}</div>
        </Link>
        <Link href="/admin/categories" className="admin-dashboard-card">
          <h3>Categories</h3>
          <div style={statNumberStyle}>{categoriesCount}</div>
        </Link>
      </div>
    </div>
  );
}

