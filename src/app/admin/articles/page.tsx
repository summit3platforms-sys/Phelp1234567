import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteArticle } from "./actions";

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      brand: true,
      category: true,
    }
  });

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Manage Articles</h1>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', border: '1px solid var(--border-color)' }}>
        <thead>
          <tr style={{ background: 'var(--secondary-color)', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ padding: '1rem' }}>Title</th>
            <th style={{ padding: '1rem' }}>Brand</th>
            <th style={{ padding: '1rem' }}>Category</th>
            <th style={{ padding: '1rem' }}>Status</th>
            <th style={{ padding: '1rem' }}>Date</th>
            <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '1rem' }}>{article.title}</td>
              <td style={{ padding: '1rem' }}>{article.brand.name}</td>
              <td style={{ padding: '1rem' }}>{article.category.name}</td>
              <td style={{ padding: '1rem' }}>
                <span style={{ 
                  background: article.status === 'published' ? '#e8f5e9' : '#fff3e0',
                  color: article.status === 'published' ? '#2e7d32' : '#e65100',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.85rem'
                }}>
                  {article.status}
                </span>
              </td>
              <td style={{ padding: '1rem' }}>{new Date(article.createdAt).toLocaleDateString()}</td>
              <td style={{ padding: '1rem', textAlign: 'right' }}>
                <Link href={`/admin/articles/${article.id}/edit`} style={{ marginRight: '1rem', color: 'var(--primary-color)' }}>
                  Edit
                </Link>
                <form action={async () => { "use server"; await deleteArticle(article.id); }} style={{ display: 'inline' }}>
                  <button type="submit" style={{ background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer', textDecoration: 'underline' }}>
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
          {articles.length === 0 && (
            <tr>
              <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                No articles found. Use the AI prompt system to add some!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
