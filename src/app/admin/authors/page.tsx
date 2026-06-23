import { prisma } from "@/lib/prisma";
import { createAuthor, deleteAuthor } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminAuthorsPage() {
  const authors = await prisma.author.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { articles: true } } }
  });

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid var(--border-color)',
    borderRadius: '4px',
    fontSize: '0.95rem',
    background: '#f8fafc'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.4rem',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    color: '#334155'
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Manage Authors</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        {/* Authors List */}
        <div>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', border: '1px solid var(--border-color)' }}>
            <thead>
              <tr style={{ background: 'var(--secondary-color)', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '1rem', width: '60px' }}>Avatar</th>
                <th style={{ padding: '1rem' }}>Name</th>
                <th style={{ padding: '1rem' }}>Role</th>
                <th style={{ padding: '1rem' }}>Articles</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author) => (
                <tr key={author.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem' }}>
                    {author.image ? (
                      <img src={author.image} alt={author.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>
                        {author.name.charAt(0)}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 'bold' }}>{author.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{author.slug}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>{author.role}</td>
                  <td style={{ padding: '1rem' }}>{author._count.articles}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <form action={async () => { "use server"; await deleteAuthor(author.id); }} style={{ display: 'inline' }}>
                      <button type="submit" style={{ background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer', textDecoration: 'underline' }}>
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {authors.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                    No authors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Add Author Form */}
        <div>
          <div style={{ background: '#fff', padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <h3 style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', color: '#0f172a' }}>Add New Author</h3>
            <form action={createAuthor}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input type="text" name="name" required style={inputStyle} placeholder="e.g. Alex Carter" />
              </div>

              <div>
                <label style={labelStyle}>Role / Title</label>
                <input type="text" name="role" style={inputStyle} placeholder="e.g. Senior Printer Technician" />
              </div>

              <div>
                <label style={labelStyle}>Bio</label>
                <textarea name="bio" rows={4} style={{ ...inputStyle, fontFamily: 'inherit' }} placeholder="Brief biography about the author..." />
              </div>

              <div>
                <label style={labelStyle}>Image URL</label>
                <input type="url" name="image" style={inputStyle} placeholder="https://images.unsplash.com/..." />
              </div>

              <button type="submit" style={{ width: '100%', padding: '0.8rem', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.95rem' }}>
                Add Author
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
