import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteArticle } from "./actions";

type PageProps = {
  searchParams: Promise<{
    q?: string;
    page?: string;
    status?: string;
  }>;
};

export default async function AdminArticlesPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q || "";
  const page = parseInt(resolvedParams.page || "1", 10);
  const status = resolvedParams.status || "all";

  const pageSize = 20;

  const whereClause: any = {};
  if (status !== 'all') {
    whereClause.status = status;
  }

  if (q) {
    whereClause.OR = [
      { title: { contains: q, mode: 'insensitive' } },
      { content: { contains: q, mode: 'insensitive' } },
      { errorCode: { contains: q, mode: 'insensitive' } },
      { printerModel: { contains: q, mode: 'insensitive' } },
      { brand: { name: { contains: q, mode: 'insensitive' } } },
      { category: { name: { contains: q, mode: 'insensitive' } } },
    ];
  }

  const totalCount = await prisma.article.count({ where: whereClause });
  const totalPages = Math.ceil(totalCount / pageSize);
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));

  const articles = await prisma.article.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
    include: {
      brand: true,
      category: true,
    },
    skip: (currentPage - 1) * pageSize,
    take: pageSize
  });

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", margin: 0 }}>Manage Articles</h1>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link href="/admin/articles/import" style={{
            display: "inline-block",
            padding: "0.6rem 1.2rem",
            background: "#0070f3",
            color: "#fff",
            borderRadius: "6px",
            fontSize: "0.95rem",
            fontWeight: "500",
            textDecoration: "none"
          }}>
            + Import From File
          </Link>
        </div>
      </div>

      {/* Search and Filter Form */}
      <form action="/admin/articles" method="GET" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input 
          type="text" 
          name="q" 
          defaultValue={q} 
          placeholder="Search articles by title, content, brand, category..." 
          style={{ flex: 1, minWidth: '250px', padding: '0.6rem 1rem', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.95rem' }}
        />
        <select 
          name="status" 
          defaultValue={status} 
          style={{ padding: '0.6rem 1rem', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.95rem', background: '#fff' }}
        >
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
          <option value="needs_review">Needs Review</option>
        </select>
        <button type="submit" className="nav-btn" style={{ margin: 0, padding: '0.6rem 1.5rem' }}>
          Search
        </button>
        {(q || status !== 'all') && (
          <Link href="/admin/articles" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'underline' }}>
            Clear Filters
          </Link>
        )}
      </form>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', border: '1px solid var(--border-color)' }}>
        <thead>
          <tr style={{ background: 'var(--secondary-color)', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ padding: '1rem' }}>Title</th>
            <th style={{ padding: '1rem' }}>Brand</th>
            <th style={{ padding: '1rem' }}>Category</th>
            <th style={{ padding: '1rem' }}>Status</th>
            <th style={{ padding: '1rem' }}>Date &amp; Time</th>
            <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => {
            const formattedDateTime = new Date(article.createdAt).toLocaleString('en-US', {
              dateStyle: 'medium',
              timeStyle: 'short'
            });
            return (
              <tr key={article.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem' }}>{article.title}</td>
                <td style={{ padding: '1rem' }}>{article.brand?.name || <span style={{ color: "#aaa", fontStyle: "italic" }}>Uncategorized</span>}</td>
                <td style={{ padding: '1rem' }}>{article.category?.name || <span style={{ color: "#aaa", fontStyle: "italic" }}>Uncategorized</span>}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    background: article.status === 'published' ? '#e8f5e9' : article.status === 'needs_review' ? '#eef2f6' : '#fff3e0',
                    color: article.status === 'published' ? '#2e7d32' : article.status === 'needs_review' ? '#475569' : '#e65100',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.85rem'
                  }}>
                    {article.status}
                  </span>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.9rem', color: '#555', whiteSpace: 'nowrap' }}>
                  {formattedDateTime}
                </td>
                <td style={{ padding: '1rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
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
            );
          })}
          {articles.length === 0 && (
            <tr>
              <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                No articles found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
          {currentPage > 1 ? (
            <Link 
              href={`/admin/articles?page=${currentPage - 1}${q ? `&q=${encodeURIComponent(q)}` : ''}${status !== 'all' ? `&status=${status}` : ''}`}
              className="admin-pagination-btn"
            >
              &larr; Previous
            </Link>
          ) : (
            <span style={{ color: 'var(--text-muted)', padding: '0.5rem 1rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: '#f1f5f9', cursor: 'not-allowed' }}>
              &larr; Previous
            </span>
          )}
          
          <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>
            Page {currentPage} of {totalPages} ({totalCount} total)
          </span>
          
          {currentPage < totalPages ? (
            <Link 
              href={`/admin/articles?page=${currentPage + 1}${q ? `&q=${encodeURIComponent(q)}` : ''}${status !== 'all' ? `&status=${status}` : ''}`}
              className="admin-pagination-btn"
            >
              Next &rarr;
            </Link>
          ) : (
            <span style={{ color: 'var(--text-muted)', padding: '0.5rem 1rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: '#f1f5f9', cursor: 'not-allowed' }}>
              Next &rarr;
            </span>
          )}
        </div>
      )}
    </div>
  );
}

