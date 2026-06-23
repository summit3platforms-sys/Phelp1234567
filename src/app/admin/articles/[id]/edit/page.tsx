import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { updateArticle } from "../../actions";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const article = await prisma.article.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!article) {
    notFound();
  }

  const authors = await prisma.author.findMany({
    orderBy: { name: 'asc' },
  });

  async function handleSubmit(formData: FormData) {
    "use server";
    await updateArticle(resolvedParams.id, formData);
    redirect("/admin/articles");
  }

  const inputStyle = { width: '100%', padding: '0.8rem', marginBottom: '1rem', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '1rem' };
  const labelStyle = { display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Edit Article</h1>
      
      <form action={handleSubmit} style={{ background: '#fff', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
        <div>
          <label style={labelStyle}>Title</label>
          <input type="text" name="title" defaultValue={article.title} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Status</label>
          <select name="status" defaultValue={article.status} style={inputStyle}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Author</label>
          <select name="authorId" defaultValue={article.authorId || ''} style={inputStyle}>
            <option value="">No Author</option>
            {authors.map(author => (
              <option key={author.id} value={author.id}>{author.name} ({author.role})</option>
            ))}
          </select>
        </div>

        <div>
          <label style={labelStyle}>SEO Title</label>
          <input type="text" name="seoTitle" defaultValue={article.seoTitle || ''} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Meta Description</label>
          <textarea name="metaDescription" defaultValue={article.metaDescription || ''} rows={3} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Content (HTML)</label>
          <textarea name="content" defaultValue={article.content} rows={15} required style={inputStyle} />
        </div>

        <button type="submit" style={{ padding: '0.8rem 2rem', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}>
          Save Changes
        </button>
      </form>
    </div>
  );
}
