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
      
      <form action={handleSubmit} encType="multipart/form-data" style={{ background: '#fff', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
        <div>
          <label style={labelStyle}>Title</label>
          <input type="text" name="title" defaultValue={article.title} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>URL Slug</label>
          <input type="text" name="slug" defaultValue={article.slug} required style={inputStyle} placeholder="e.g. bixolon-printer-error-codes" />
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
          <label style={labelStyle}>Featured Image (Thumbnail)</label>
          {article.featuredImage && (
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.3rem' }}>Current Image Preview:</p>
              <img src={article.featuredImage} alt="Current Featured Image" style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'contain', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', fontWeight: 'normal', fontSize: '0.9rem', color: '#dc2626', cursor: 'pointer' }}>
                <input type="checkbox" name="removeFeaturedImage" value="true" />
                Remove current image
              </label>
            </div>
          )}
          <input 
            type="text" 
            name="featuredImage" 
            defaultValue={article.featuredImage && article.featuredImage.startsWith('data:') ? '' : (article.featuredImage || '')} 
            placeholder="Or enter Image URL/Path (e.g. /bixolon-error-codes.jpg)" 
            style={inputStyle} 
          />
          <label style={{ ...labelStyle, fontSize: '0.85rem', color: '#555', marginTop: '0.3rem' }}>Upload New Image:</label>
          <input 
            type="file" 
            name="featuredImageFile" 
            accept="image/*" 
            style={{ ...inputStyle, padding: '0.5rem' }} 
          />
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
