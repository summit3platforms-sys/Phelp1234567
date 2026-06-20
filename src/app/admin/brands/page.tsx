import { prisma } from "@/lib/prisma";

export default async function AdminBrandsPage() {
  const brands = await prisma.brand.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { articles: true } } }
  });

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Manage Brands</h1>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', border: '1px solid var(--border-color)' }}>
        <thead>
          <tr style={{ background: 'var(--secondary-color)', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ padding: '1rem' }}>Name</th>
            <th style={{ padding: '1rem' }}>Slug</th>
            <th style={{ padding: '1rem' }}>Total Articles</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr key={brand.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '1rem', fontWeight: 'bold' }}>{brand.name}</td>
              <td style={{ padding: '1rem' }}>{brand.slug}</td>
              <td style={{ padding: '1rem' }}>{brand._count.articles}</td>
            </tr>
          ))}
          {brands.length === 0 && (
            <tr>
              <td colSpan={3} style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                No brands found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
