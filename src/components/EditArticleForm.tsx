"use client";

import React, { useState, useRef, useEffect } from 'react';
import ImageUploadSection from './ImageUploadSection';

type ArticleData = {
  id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage: string | null;
  seoTitle: string | null;
  metaDescription: string | null;
  status: string;
  authorId: string | null;
};

type Author = {
  id: string;
  name: string;
  role: string | null;
};

type EditArticleFormProps = {
  article: ArticleData;
  authors: Author[];
  updateAction: (id: string, formData: FormData) => Promise<void>;
};

export default function EditArticleForm({ article, authors, updateAction }: EditArticleFormProps) {
  const [content, setContent] = useState<string>(article.content);
  const [embeddedImages, setEmbeddedImages] = useState<string[]>([]);
  const [isInserting, setIsInserting] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bodyFileInputRef = useRef<HTMLInputElement>(null);

  // Extract all embedded images from content HTML
  useEffect(() => {
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
    const matches: string[] = [];
    let match;
    while ((match = imgRegex.exec(content)) !== null) {
      if (match[1]) {
        matches.push(match[1]);
      }
    }
    // De-duplicate matches
    setEmbeddedImages(Array.from(new Set(matches)));
  }, [content]);

  const handleInsertImage = (e: React.MouseEvent) => {
    e.preventDefault();
    const file = bodyFileInputRef.current?.files?.[0];
    if (!file) {
      setUploadError("Please select an image file to insert.");
      return;
    }

    setIsInserting(true);
    setUploadError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas for client-side resizing/compression
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Max dimensions for inline article images (e.g. 800px max width)
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Compress to JPEG with 70% quality
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);

          // Insert into textarea at cursor position
          const textarea = textareaRef.current;
          if (textarea) {
            const startPos = textarea.selectionStart;
            const endPos = textarea.selectionEnd;
            const text = textarea.value;
            
            const imageTag = `\n<div style="margin: 2rem 0; text-align: center;">\n  <img src="${compressedDataUrl}" alt="Article Illustration" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-sm);" />\n</div>\n`;
            
            const newText = text.substring(0, startPos) + imageTag + text.substring(endPos);
            setContent(newText);

            // Refocus and place cursor after inserted text
            setTimeout(() => {
              textarea.focus();
              textarea.selectionStart = textarea.selectionEnd = startPos + imageTag.length;
            }, 50);
          }

          setIsInserting(false);
          if (bodyFileInputRef.current) {
            bodyFileInputRef.current.value = ''; // Clear file input
          }
        } else {
          setUploadError("Failed to draw image to canvas.");
          setIsInserting(false);
        }
      };
      img.onerror = () => {
        setUploadError("Invalid image file.");
        setIsInserting(false);
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      setUploadError("Failed to read file.");
      setIsInserting(false);
    };
    reader.readAsDataURL(file);
  };

  const handleCopyTag = (e: React.MouseEvent, imgSrc: string) => {
    e.preventDefault();
    const tag = `<img src="${imgSrc}" alt="Article Image" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />`;
    navigator.clipboard.writeText(tag).then(() => {
      alert("HTML Image Tag copied to clipboard!");
    });
  };

  const inputStyle = { width: '100%', padding: '0.8rem', marginBottom: '1rem', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '1rem' };
  const labelStyle = { display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'start' }}>
      
      {/* Left Column: Form inputs */}
      <form action={async (formData) => {
        // Form submits to Server Action
        await updateAction(article.id, formData);
      }} style={{ background: '#fff', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
        
        <div>
          <label style={labelStyle}>Title</label>
          <input type="text" name="title" defaultValue={article.title} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>URL Slug</label>
          <input type="text" name="slug" defaultValue={article.slug} required style={inputStyle} placeholder="e.g. bixolon-printer-error-codes" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
        </div>

        {/* Featured Thumbnail component */}
        <ImageUploadSection initialValue={article.featuredImage} />

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
          <textarea 
            ref={textareaRef}
            name="content" 
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            rows={20} 
            required 
            style={{ ...inputStyle, fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.5' }} 
          />
        </div>

        <button type="submit" style={{ padding: '0.8rem 2.5rem', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: 600 }}>
          Save Article Changes
        </button>
      </form>

      {/* Right Column: Inline Images Uploader and Library sidebar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Upload Inline Image Card */}
        <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>Insert Body Image</h3>
          
          <p style={{ fontSize: '0.8rem', color: '#666', lineHeight: '1.4', margin: '0 0 1rem 0' }}>
            Choose an image to compress and insert directly into the text editor at your cursor position.
          </p>

          <input 
            type="file" 
            ref={bodyFileInputRef}
            accept="image/*" 
            style={{ width: '100%', padding: '0.25rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.8rem', marginBottom: '0.75rem', background: '#fff' }} 
          />

          <button 
            onClick={handleInsertImage}
            disabled={isInserting}
            style={{ width: '100%', padding: '0.5rem', background: '#0f172a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
          >
            {isInserting ? 'Processing...' : 'Upload & Insert Image'}
          </button>

          {uploadError && (
            <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.5rem', marginBottom: 0 }}>
              {uploadError}
            </p>
          )}
        </div>

        {/* Embedded Images list */}
        <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)', maxHeight: '500px', overflowY: 'auto' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
            Embedded Images ({embeddedImages.length})
          </h3>
          <p style={{ fontSize: '0.75rem', color: '#666', margin: '0 0 1rem 0', lineHeight: '1.3' }}>
            These are the images currently embedded inside the HTML content editor.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {embeddedImages.map((imgSrc, idx) => {
              const isBase64 = imgSrc.startsWith('data:');
              return (
                <div key={idx} style={{ padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: '#f8fafc' }}>
                  <img 
                    src={imgSrc} 
                    alt={`Embedded ${idx}`} 
                    style={{ width: '100%', height: '100px', objectFit: 'contain', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '4px', marginBottom: '0.5rem' }} 
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem', color: '#475569', fontWeight: 500 }}>
                      {isBase64 ? 'Compressed Base64' : 'URL Link'}
                    </span>
                    <button
                      onClick={(e) => handleCopyTag(e, imgSrc)}
                      style={{ padding: '0.25rem 0.5rem', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 600 }}
                    >
                      Copy Tag
                    </button>
                  </div>
                </div>
              );
            })}

            {embeddedImages.length === 0 && (
              <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem', padding: '1rem 0' }}>
                No embedded images found in the editor text.
              </p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
