import { prisma } from "@/lib/prisma";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { articles: true } } }
  });

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Manage Categories</h1>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', border: '1px solid var(--border-color)' }}>
        <thead>
          <tr style={{ background: 'var(--secondary-color)', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ padding: '1rem' }}>Name</th>
            <th style={{ padding: '1rem' }}>Slug</th>
            <th style={{ padding: '1rem' }}>Total Articles</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '1rem', fontWeight: 'bold' }}>{category.name}</td>
              <td style={{ padding: '1rem' }}>{category.slug}</td>
              <td style={{ padding: '1rem' }}>{category._count.articles}</td>
            </tr>
          ))}
          {categories.length === 0 && (
            <tr>
              <td colSpan={3} style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
