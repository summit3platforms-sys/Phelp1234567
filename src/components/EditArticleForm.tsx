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

type BlockType = 'paragraph' | 'heading' | 'image' | 'raw';

type ImageAttrs = {
  src: string;
  alt: string;
  caption: string;
  align: 'left' | 'center' | 'right';
  width: string;
};

type Block = {
  id: string;
  type: BlockType;
  text: string;
  html: string;
  headingLevel?: number;
  imageAttrs?: ImageAttrs;
  isEditingCode?: boolean; // For raw blocks
};

export default function EditArticleForm({ article, authors, updateAction }: EditArticleFormProps) {
  const [content, setContent] = useState<string>(article.content);
  const [editorMode, setEditorMode] = useState<'visual' | 'code'>('visual');
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [draggedBlockIndex, setDraggedBlockIndex] = useState<number | null>(null);
  
  const [embeddedImages, setEmbeddedImages] = useState<string[]>([]);
  const [isInserting, setIsInserting] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedFilePreview, setSelectedFilePreview] = useState<string | null>(null);
  
  const bodyFileInputRef = useRef<HTMLInputElement>(null);

  // Helper: Parse HTML into blocks
  const parseHtmlToBlocks = (htmlString: string): Block[] => {
    if (typeof window === 'undefined') return [];
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString || '', 'text/html');
    const parsedBlocks: Block[] = [];
    
    const children = Array.from(doc.body.childNodes);
    
    children.forEach((node) => {
      // Skip empty text nodes
      if (node.nodeType === Node.TEXT_NODE && !node.textContent?.trim()) {
        return;
      }

      // Check if node is an image container or img
      let imgEl: HTMLImageElement | null = null;
      let captionText = '';
      let align: 'left' | 'center' | 'right' = 'center';
      let width = '100%';

      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        if (el.tagName === 'IMG') {
          imgEl = el as HTMLImageElement;
        } else {
          // Check for wrapped image
          imgEl = el.querySelector('img');
          if (imgEl) {
            const textAlign = el.style.textAlign || el.getAttribute('align');
            if (textAlign === 'left' || textAlign === 'right' || textAlign === 'center') {
              align = textAlign as any;
            }
            
            // Look for caption divs or text
            const captionEl = el.querySelector('div, p, figcaption');
            if (captionEl) {
              captionText = captionEl.textContent?.trim() || '';
            }
          }
        }
      }

      if (imgEl) {
        const src = imgEl.getAttribute('src') || '';
        const alt = imgEl.getAttribute('alt') || '';
        const imgStyleWidth = imgEl.style.maxWidth || imgEl.style.width || imgEl.getAttribute('width') || '100%';
        
        parsedBlocks.push({
          id: 'block_' + Math.random().toString(36).substring(2, 9),
          type: 'image',
          text: '',
          html: '',
          imageAttrs: {
            src,
            alt,
            caption: captionText,
            align,
            width: imgStyleWidth
          }
        });
        return;
      }

      // Handle Headings
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        if (/^H[1-6]$/.test(el.tagName)) {
          parsedBlocks.push({
            id: 'block_' + Math.random().toString(36).substring(2, 9),
            type: 'heading',
            text: el.textContent || '',
            html: '',
            headingLevel: parseInt(el.tagName.substring(1))
          });
          return;
        }
        
        // Handle normal paragraphs
        if (el.tagName === 'P') {
          parsedBlocks.push({
            id: 'block_' + Math.random().toString(36).substring(2, 9),
            type: 'paragraph',
            text: el.textContent || '',
            html: ''
          });
          return;
        }
      }

      // Default: parse as raw HTML block
      const tempDiv = document.createElement('div');
      tempDiv.appendChild(node.cloneNode(true));
      parsedBlocks.push({
        id: 'block_' + Math.random().toString(36).substring(2, 9),
        type: 'raw',
        text: '',
        html: tempDiv.innerHTML,
        isEditingCode: false
      });
    });

    if (parsedBlocks.length === 0) {
      parsedBlocks.push({
        id: 'block_default',
        type: 'paragraph',
        text: '',
        html: ''
      });
    }

    return parsedBlocks;
  };

  // Helper: Serialize blocks to HTML
  const serializeBlocksToHtml = (blocksList: Block[]): string => {
    return blocksList.map((block) => {
      if (block.type === 'paragraph') {
        return `<p>${block.text}</p>`;
      }
      if (block.type === 'heading') {
        const tag = `h${block.headingLevel || 2}`;
        return `<${tag}>${block.text}</${tag}>`;
      }
      if (block.type === 'image' && block.imageAttrs) {
        const { src, alt, caption, align, width } = block.imageAttrs;
        const containerStyle = `margin: 2rem 0; text-align: ${align || 'center'};`;
        const imgStyle = `max-width: ${width || '100%'}; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); display: inline-block;`;
        const captionHtml = caption
          ? `\n  <div style="font-size: 0.85rem; color: #64748b; margin-top: 0.5rem; text-align: center;">${caption}</div>`
          : '';
        return `<div style="${containerStyle}">\n  <img src="${src}" alt="${alt || 'Article Illustration'}" style="${imgStyle}" />${captionHtml}\n</div>`;
      }
      if (block.type === 'raw') {
        return block.html;
      }
      return '';
    }).join('\n\n');
  };

  // Initialize blocks on mount
  useEffect(() => {
    const parsed = parseHtmlToBlocks(article.content);
    setBlocks(parsed);
  }, []);

  // Sync content whenever blocks change in visual mode
  useEffect(() => {
    if (editorMode === 'visual' && blocks.length > 0) {
      const html = serializeBlocksToHtml(blocks);
      setContent(html);
    }
  }, [blocks, editorMode]);

  // Extract all embedded images from content html to update list
  useEffect(() => {
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
    const matches: string[] = [];
    let match;
    while ((match = imgRegex.exec(content)) !== null) {
      if (match[1]) {
        matches.push(match[1]);
      }
    }
    setEmbeddedImages(Array.from(new Set(matches)));
  }, [content]);

  // Helper file loaders
  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  const compressImage = (dataUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
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
          resolve(canvas.toDataURL('image/jpeg', 0.75));
        } else {
          reject(new Error("Failed to get 2d context for compression"));
        }
      };
      img.onerror = () => reject(new Error("Invalid image format"));
      img.src = dataUrl;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      setSelectedFilePreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedFilePreview(event.target?.result as string);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleInsertImage = async (e: React.MouseEvent) => {
    e.preventDefault();
    const files = bodyFileInputRef.current?.files;
    if (!files || files.length === 0) {
      setUploadError("Please select an image file to insert.");
      return;
    }

    setIsInserting(true);
    setUploadError(null);

    try {
      const newBlocks: Block[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const dataUrl = await readFileAsDataURL(file);
        const compressed = await compressImage(dataUrl);
        
        newBlocks.push({
          id: `img_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          type: 'image',
          text: '',
          html: '',
          imageAttrs: {
            src: compressed,
            alt: file.name.split('.')[0] || 'Article Image',
            caption: '',
            align: 'center',
            width: '100%'
          }
        });
      }

      // Determine insertion index based on active block cursor tracking
      let insertIndex = blocks.length;
      if (activeBlockId) {
        const idx = blocks.findIndex(b => b.id === activeBlockId);
        if (idx !== -1) {
          insertIndex = idx + 1;
        }
      }

      const updatedBlocks = [...blocks];
      updatedBlocks.splice(insertIndex, 0, ...newBlocks);
      setBlocks(updatedBlocks);

      // Set the first new image block as active
      if (newBlocks.length > 0) {
        setActiveBlockId(newBlocks[0].id);
      }

      setSelectedFilePreview(null);
      if (bodyFileInputRef.current) {
        bodyFileInputRef.current.value = '';
      }
      setSuccessMessage(`Successfully inserted ${newBlocks.length} image(s)`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload image.");
    } finally {
      setIsInserting(false);
    }
  };

  const handleReplaceImageFile = async (e: React.ChangeEvent<HTMLInputElement>, blockId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsInserting(true);
      const dataUrl = await readFileAsDataURL(file);
      const compressed = await compressImage(dataUrl);

      setBlocks(prev => prev.map(b => {
        if (b.id === blockId && b.imageAttrs) {
          return {
            ...b,
            imageAttrs: {
              ...b.imageAttrs,
              src: compressed
            }
          };
        }
        return b;
      }));
      setSuccessMessage("Image replaced successfully.");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setUploadError(err.message || "Failed to replace image.");
    } finally {
      setIsInserting(false);
    }
  };

  const updateImageAttr = (blockId: string, attrName: keyof ImageAttrs, value: string) => {
    setBlocks(prev => prev.map(b => {
      if (b.id === blockId && b.imageAttrs) {
        return {
          ...b,
          imageAttrs: {
            ...b.imageAttrs,
            [attrName]: value
          }
        };
      }
      return b;
    }));
  };

  const deleteBlock = (blockId: string) => {
    if (!window.confirm("Are you sure you want to delete this block?")) {
      return;
    }
    setBlocks(prev => prev.filter(b => b.id !== blockId));
    if (activeBlockId === blockId) {
      setActiveBlockId(null);
    }
  };

  // Keyboard controls for paragraph splitting/backspacing
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, index: number) => {
    const block = blocks[index];
    if (e.key === 'Enter' && !e.shiftKey && block.type !== 'raw') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;

      const currentText = text.substring(0, start);
      const nextText = text.substring(end);

      const updated = [...blocks];
      updated[index] = { ...block, text: currentText };
      
      const newBlock: Block = {
        id: 'block_' + Math.random().toString(36).substring(2, 9),
        type: 'paragraph',
        text: nextText,
        html: ''
      };
      
      updated.splice(index + 1, 0, newBlock);
      setBlocks(updated);
      setActiveBlockId(newBlock.id);

      setTimeout(() => {
        const el = document.getElementById(`textarea-${newBlock.id}`) as HTMLTextAreaElement | null;
        if (el) {
          el.focus();
          el.selectionStart = el.selectionEnd = 0;
        }
      }, 20);

    } else if (e.key === 'Backspace' && e.currentTarget.selectionStart === 0 && e.currentTarget.selectionEnd === 0 && index > 0) {
      const prevBlock = blocks[index - 1];
      if (prevBlock.type === 'paragraph' || prevBlock.type === 'heading') {
        e.preventDefault();
        const prevTextLength = prevBlock.text.length;

        const updated = [...blocks];
        updated[index - 1] = {
          ...prevBlock,
          text: prevBlock.text + block.text
        };
        updated.splice(index, 1);
        setBlocks(updated);
        setActiveBlockId(prevBlock.id);

        setTimeout(() => {
          const el = document.getElementById(`textarea-${prevBlock.id}`) as HTMLTextAreaElement | null;
          if (el) {
            el.focus();
            el.selectionStart = el.selectionEnd = prevTextLength;
          }
        }, 20);
      }
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    setDraggedBlockIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const sourceStr = e.dataTransfer.getData('text/plain');
    if (sourceStr === '') return;
    const sourceIndex = parseInt(sourceStr);
    if (isNaN(sourceIndex) || sourceIndex === targetIndex) return;

    const updated = [...blocks];
    const [removed] = updated.splice(sourceIndex, 1);
    updated.splice(targetIndex, 0, removed);
    setBlocks(updated);
    setDraggedBlockIndex(null);
  };

  // Reorder buttons fallback
  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;

    const updated = [...blocks];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setBlocks(updated);
  };

  const addBlock = (type: BlockType, headingLevel?: number) => {
    const newBlock: Block = {
      id: 'block_' + Math.random().toString(36).substring(2, 9),
      type,
      text: '',
      html: type === 'raw' ? '<div>Raw HTML Element</div>' : '',
      headingLevel,
      isEditingCode: type === 'raw' ? true : false
    };

    let insertIndex = blocks.length;
    if (activeBlockId) {
      const idx = blocks.findIndex(b => b.id === activeBlockId);
      if (idx !== -1) {
        insertIndex = idx + 1;
      }
    }

    const updated = [...blocks];
    updated.splice(insertIndex, 0, newBlock);
    setBlocks(updated);
    setActiveBlockId(newBlock.id);

    setTimeout(() => {
      const el = document.getElementById(`textarea-${newBlock.id}`) as HTMLElement | null;
      el?.focus();
    }, 50);
  };

  const handleModeChange = (mode: 'visual' | 'code') => {
    if (mode === 'visual') {
      const parsed = parseHtmlToBlocks(content);
      setBlocks(parsed);
    }
    setEditorMode(mode);
  };

  const handleDeleteEmbeddedImage = (e: React.MouseEvent, imgSrc: string) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to remove this image from the article content?")) {
      return;
    }

    // In visual editor, filter out any image block matching this src
    if (editorMode === 'visual') {
      setBlocks(prev => prev.filter(b => !(b.type === 'image' && b.imageAttrs?.src === imgSrc)));
    } else {
      const escapedSrc = imgSrc.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const pattern = new RegExp(
        `(?:<div[^>]*>\\s*)?<img[^>]+src=["']${escapedSrc}["'][^>]*>(?:\\s*<\\/div>)?`,
        'g'
      );
      setContent(prev => prev.replace(pattern, ''));
    }
  };

  const handleCopyTag = (e: React.MouseEvent, imgSrc: string) => {
    e.preventDefault();
    const tag = `<img src="${imgSrc}" alt="Article Image" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />`;
    navigator.clipboard.writeText(tag).then(() => {
      alert("HTML Image Tag copied to clipboard!");
    });
  };

  const adjustTextAreaHeight = (el: HTMLTextAreaElement | null) => {
    if (el) {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    }
  };

  const inputStyle = { width: '100%', padding: '0.8rem', marginBottom: '1rem', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '1rem' };
  const labelStyle = { display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'start' }}>
      
      {/* Styles for visual blocks drag handle and overlays */}
      <style dangerouslySetInnerHTML={{ __html: `
        .editor-block-container {
          position: relative;
          padding: 0.5rem 0.5rem 0.5rem 2rem;
          border: 1px dashed transparent;
          border-radius: 6px;
          margin-bottom: 0.25rem;
          transition: all 0.25s ease;
          background: #fff;
        }
        .editor-block-container:hover {
          border-color: #cbd5e1;
          background-color: #f8fafc;
        }
        .editor-block-container.active {
          border-color: #3b82f6;
          background-color: #f0f7ff;
        }
        .editor-block-controls {
          opacity: 0;
          position: absolute;
          left: 4px;
          top: 8px;
          display: flex;
          align-items: center;
          gap: 2px;
          transition: opacity 0.2s ease;
          z-index: 10;
        }
        .editor-block-container:hover .editor-block-controls {
          opacity: 1;
        }
        .editor-block-container.active .editor-block-controls {
          opacity: 1;
        }
        .drag-handle {
          cursor: grab;
          font-size: 0.8rem;
          padding: 2px;
          border-radius: 3px;
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          color: #64748b;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
        }
        .drag-handle:active {
          cursor: grabbing;
        }
        .arrow-btn {
          cursor: pointer;
          font-size: 0.6rem;
          padding: 2px;
          border-radius: 3px;
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          color: #64748b;
          width: 18px;
          height: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .arrow-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
        }
        .delete-block-btn {
          cursor: pointer;
          font-size: 0.65rem;
          background: #fee2e2;
          color: #ef4444;
          border: 1px solid #fca5a5;
          border-radius: 3px;
          width: 18px;
          height: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .delete-block-btn:hover {
          background: #ef4444;
          color: white;
        }
        .block-type-tag {
          font-size: 0.6rem;
          padding: 1px 4px;
          background: #e2e8f0;
          border-radius: 3px;
          color: #475569;
          font-weight: bold;
          text-transform: uppercase;
        }
      ` }} />

      {/* Left Column: Form inputs */}
      <form action={async (formData) => {
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

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <label style={{ ...labelStyle, marginBottom: 0 }}>Content Body</label>
            
            {/* Editor mode toggler */}
            <div style={{ display: 'flex', background: '#f1f5f9', padding: '0.2rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
              <button
                type="button"
                onClick={() => handleModeChange('visual')}
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  border: 'none',
                  borderRadius: '4px',
                  background: editorMode === 'visual' ? '#fff' : 'transparent',
                  color: editorMode === 'visual' ? '#0f172a' : '#64748b',
                  boxShadow: editorMode === 'visual' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.1s ease'
                }}
              >
                ✏ Visual Editor
              </button>
              <button
                type="button"
                onClick={() => handleModeChange('code')}
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  border: 'none',
                  borderRadius: '4px',
                  background: editorMode === 'code' ? '#fff' : 'transparent',
                  color: editorMode === 'code' ? '#0f172a' : '#64748b',
                  boxShadow: editorMode === 'code' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.1s ease'
                }}
              >
                💻 HTML Code
              </button>
            </div>
          </div>

          {/* Hidden input keeping original content field in sync */}
          <input type="hidden" name="content" value={content} />

          {/* Mode 1: Visual Block Editor */}
          {editorMode === 'visual' && (
            <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', padding: '1rem', background: '#f8fafc', minHeight: '500px' }}>
              
              {/* Insert Block Floating Toolbar */}
              <div style={{ display: 'flex', gap: '0.5rem', background: '#fff', padding: '0.5rem', borderRadius: '6px', border: '1px solid #e2e8f0', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', alignSelf: 'center', fontWeight: 'bold', marginRight: '0.25rem' }}>+ Add Block:</span>
                <button type="button" onClick={() => addBlock('paragraph')} style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', background: '#f8fafc' }}>
                  ¶ Paragraph
                </button>
                <button type="button" onClick={() => addBlock('heading', 2)} style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', background: '#f8fafc', fontWeight: 'bold' }}>
                  H2 Heading
                </button>
                <button type="button" onClick={() => addBlock('heading', 3)} style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', background: '#f8fafc', fontWeight: 'bold' }}>
                  H3 Heading
                </button>
                <button type="button" onClick={() => addBlock('raw')} style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', background: '#f8fafc' }}>
                  💡 Custom HTML
                </button>
              </div>

              {/* Blocks list */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {blocks.map((block, idx) => {
                  const isActive = activeBlockId === block.id;
                  
                  return (
                    <div key={block.id}>
                      <div
                        draggable
                        onDragStart={(e) => handleDragStart(e, idx)}
                        onDragOver={(e) => handleDragOver(e, idx)}
                        onDrop={(e) => handleDrop(e, idx)}
                        className={`editor-block-container ${isActive ? 'active' : ''}`}
                        onClick={() => setActiveBlockId(block.id)}
                      >
                        {/* Hover controls on left */}
                        <div className="editor-block-controls">
                          <div className="drag-handle" title="Drag to reorder block">☰</div>
                          <button type="button" className="arrow-btn" onClick={() => moveBlock(idx, 'up')} title="Move Up" disabled={idx === 0}>▲</button>
                          <button type="button" className="arrow-btn" onClick={() => moveBlock(idx, 'down')} title="Move Down" disabled={idx === blocks.length - 1}>▼</button>
                          <button type="button" className="delete-block-btn" onClick={() => deleteBlock(block.id)} title="Delete Block">✕</button>
                          <span className="block-type-tag">{block.type}</span>
                        </div>

                        {/* Rendering blocks by type */}
                        {block.type === 'paragraph' && (
                          <textarea
                            id={`textarea-${block.id}`}
                            value={block.text}
                            onChange={(e) => {
                              const updated = [...blocks];
                              updated[idx] = { ...block, text: e.target.value };
                              setBlocks(updated);
                              adjustTextAreaHeight(e.target);
                            }}
                            ref={(el) => adjustTextAreaHeight(el)}
                            onKeyDown={(e) => handleKeyDown(e, idx)}
                            onFocus={() => setActiveBlockId(block.id)}
                            rows={1}
                            placeholder="Type a paragraph... (Press Enter for a new line, Backspace to merge)"
                            style={{
                              width: '100%',
                              background: 'transparent',
                              border: 'none',
                              outline: 'none',
                              resize: 'none',
                              fontSize: '1.1rem',
                              lineHeight: '1.6',
                              color: '#0f172a',
                              fontFamily: 'inherit',
                              overflow: 'hidden',
                              padding: '4px 0'
                            }}
                          />
                        )}

                        {block.type === 'heading' && (
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <select
                              value={block.headingLevel || 2}
                              onChange={(e) => {
                                const updated = [...blocks];
                                updated[idx] = { ...block, headingLevel: parseInt(e.target.value) };
                                setBlocks(updated);
                              }}
                              style={{ border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.7rem', padding: '0.1rem' }}
                            >
                              <option value={1}>H1</option>
                              <option value={2}>H2</option>
                              <option value={3}>H3</option>
                              <option value={4}>H4</option>
                            </select>
                            <textarea
                              id={`textarea-${block.id}`}
                              value={block.text}
                              onChange={(e) => {
                                const updated = [...blocks];
                                updated[idx] = { ...block, text: e.target.value };
                                setBlocks(updated);
                                adjustTextAreaHeight(e.target);
                              }}
                              ref={(el) => adjustTextAreaHeight(el)}
                              onKeyDown={(e) => handleKeyDown(e, idx)}
                              onFocus={() => setActiveBlockId(block.id)}
                              rows={1}
                              placeholder="Heading..."
                              style={{
                                width: '100%',
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                                resize: 'none',
                                fontSize: block.headingLevel === 1 ? '1.8rem' : block.headingLevel === 2 ? '1.4rem' : '1.15rem',
                                fontWeight: 'bold',
                                lineHeight: '1.4',
                                color: '#0f172a',
                                fontFamily: 'inherit',
                                overflow: 'hidden',
                                padding: '4px 0'
                              }}
                            />
                          </div>
                        )}

                        {block.type === 'image' && block.imageAttrs && (
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '0.5rem 0' }}>
                            {/* Visual Image container wrapper with alignment styling */}
                            <div style={{
                              display: 'flex',
                              justifyContent: block.imageAttrs.align === 'left' ? 'flex-start' : block.imageAttrs.align === 'right' ? 'flex-end' : 'center',
                              width: '100%'
                            }}>
                              <div style={{ width: block.imageAttrs.width || '100%', position: 'relative' }}>
                                <img
                                  src={block.imageAttrs.src}
                                  alt={block.imageAttrs.alt || "Article image"}
                                  style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                                />
                                
                                {/* Overlay Alignment indicator */}
                                <span style={{ position: 'absolute', top: '8px', right: '8px', padding: '0.2rem 0.4rem', background: 'rgba(15, 23, 42, 0.75)', color: 'white', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 'bold' }}>
                                  Scale: {block.imageAttrs.width} | Align: {block.imageAttrs.align}
                                </span>
                              </div>
                            </div>

                            {/* Caption Input Field */}
                            <input
                              type="text"
                              value={block.imageAttrs.caption || ''}
                              onChange={(e) => updateImageAttr(block.id, 'caption', e.target.value)}
                              placeholder="Write a caption under this image..."
                              style={{ width: '100%', border: 'none', borderBottom: '1px dashed #cbd5e1', outline: 'none', fontSize: '0.85rem', color: '#64748b', textAlign: 'center', marginTop: '0.5rem', background: 'transparent', padding: '4px 0' }}
                            />

                            {/* Image Controls toolbar panel */}
                            <div style={{ display: 'flex', gap: '0.4rem', background: '#0f172a', color: 'white', padding: '0.4rem', borderRadius: '6px', marginTop: '0.75rem', width: '100%', flexWrap: 'wrap', alignItems: 'center' }}>
                              
                              {/* Width Selector */}
                              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Size:</span>
                                <select
                                  value={block.imageAttrs.width}
                                  onChange={(e) => updateImageAttr(block.id, 'width', e.target.value)}
                                  style={{ background: '#334155', color: '#fff', border: '1px solid #475569', borderRadius: '4px', fontSize: '0.75rem', padding: '0.15rem 0.3rem', cursor: 'pointer' }}
                                >
                                  <option value="25%">25% (Small)</option>
                                  <option value="50%">50% (Medium)</option>
                                  <option value="75%">75% (Large)</option>
                                  <option value="100%">100% (Full)</option>
                                </select>
                              </div>

                              {/* Alignment Buttons */}
                              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', borderLeft: '1px solid #475569', paddingLeft: '4px' }}>
                                <span style={{ fontSize: '0.7rem', color: '#94a3b8', marginRight: '2px' }}>Align:</span>
                                <button
                                  type="button"
                                  onClick={() => updateImageAttr(block.id, 'align', 'left')}
                                  style={{ padding: '0.15rem 0.35rem', background: block.imageAttrs.align === 'left' ? '#3b82f6' : '#334155', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '0.75rem' }}
                                >
                                  L
                                </button>
                                <button
                                  type="button"
                                  onClick={() => updateImageAttr(block.id, 'align', 'center')}
                                  style={{ padding: '0.15rem 0.35rem', background: block.imageAttrs.align === 'center' ? '#3b82f6' : '#334155', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '0.75rem' }}
                                >
                                  C
                                </button>
                                <button
                                  type="button"
                                  onClick={() => updateImageAttr(block.id, 'align', 'right')}
                                  style={{ padding: '0.15rem 0.35rem', background: block.imageAttrs.align === 'right' ? '#3b82f6' : '#334155', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '0.75rem' }}
                                >
                                  R
                                </button>
                              </div>

                              {/* Alt Text Input */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1, minWidth: '120px', borderLeft: '1px solid #475569', paddingLeft: '4px' }}>
                                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Alt:</span>
                                <input
                                  type="text"
                                  value={block.imageAttrs.alt}
                                  onChange={(e) => updateImageAttr(block.id, 'alt', e.target.value)}
                                  placeholder="SEO Description..."
                                  style={{ background: '#334155', color: '#fff', border: '1px solid #475569', borderRadius: '4px', fontSize: '0.75rem', padding: '0.15rem 0.3rem', flex: 1, minWidth: '80px' }}
                                />
                              </div>

                              {/* Replace File Button */}
                              <label style={{ padding: '0.2rem 0.4rem', background: '#475569', border: '1px solid #64748b', color: 'white', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>
                                ↻ Replace
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleReplaceImageFile(e, block.id)}
                                  style={{ display: 'none' }}
                                />
                              </label>

                              {/* Block Delete */}
                              <button
                                type="button"
                                onClick={() => deleteBlock(block.id)}
                                style={{ padding: '0.2rem 0.4rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}
                              >
                                Delete
                              </button>

                            </div>
                          </div>
                        )}

                        {block.type === 'raw' && (
                          <div style={{ border: '1px solid #e2e8f0', borderRadius: '4px', background: '#fff', padding: '0.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.25rem' }}>
                              <span style={{ fontSize: '0.75rem', color: '#0f766e', fontWeight: 'bold' }}>💡 Custom HTML Element Preview:</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...blocks];
                                  updated[idx] = { ...block, isEditingCode: !block.isEditingCode };
                                  setBlocks(updated);
                                }}
                                style={{ padding: '0.15rem 0.35rem', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '3px', fontSize: '0.7rem', cursor: 'pointer' }}
                              >
                                {block.isEditingCode ? '✔ View Preview' : '✏ Edit Code'}
                              </button>
                            </div>
                            
                            {block.isEditingCode ? (
                              <textarea
                                id={`textarea-${block.id}`}
                                value={block.html}
                                onChange={(e) => {
                                  const updated = [...blocks];
                                  updated[idx] = { ...block, html: e.target.value };
                                  setBlocks(updated);
                                }}
                                rows={4}
                                style={{ width: '100%', fontFamily: 'monospace', fontSize: '0.8rem', padding: '0.25rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                              />
                            ) : (
                              <div 
                                dangerouslySetInnerHTML={{ __html: block.html }} 
                                style={{ padding: '0.5rem', background: '#fafafa', border: '1px dashed #e2e8f0', overflowX: 'auto' }}
                              />
                            )}
                          </div>
                        )}

                      </div>

                      {/* Visual caret marker: next inserted image indicator line */}
                      {isActive && (
                        <div style={{
                          margin: '0.5rem 0',
                          padding: '0.35rem 0',
                          borderTop: '2px dashed #3b82f6',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          color: '#3b82f6',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          background: '#eff6ff',
                          borderRadius: '4px',
                          animation: 'pulse 2.5s infinite'
                        }}>
                          <span>✔</span> Image will be inserted exactly here (after this block)
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* If cursor selection is at the end of the document */}
                {activeBlockId === null && (
                  <div style={{
                    margin: '1rem 0',
                    padding: '0.5rem',
                    border: '2px dashed #94a3b8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    color: '#475569',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    background: '#f1f5f9',
                    borderRadius: '6px'
                  }}>
                    <span>ℹ</span> Cursor is at the end. Next uploaded image will be placed at the bottom.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Mode 2: Code Editor */}
          {editorMode === 'code' && (
            <textarea 
              name="content" 
              value={content} 
              onChange={(e) => setContent(e.target.value)}
              rows={22} 
              required 
              style={{ ...inputStyle, fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.5' }} 
            />
          )}
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
            Choose one or more images to compress and insert directly into the text editor at your active marker position.
          </p>

          {selectedFilePreview && (
            <div style={{ marginBottom: '0.75rem', padding: '0.25rem', border: '1px dashed #cbd5e1', borderRadius: '4px', background: '#f8fafc' }}>
              <p style={{ fontSize: '0.7rem', color: '#666', margin: '0 0 0.25rem 0', fontWeight: 'bold' }}>Selected File Preview:</p>
              <img src={selectedFilePreview} alt="Selected Preview" style={{ width: '100%', maxHeight: '120px', objectFit: 'contain' }} />
            </div>
          )}

          <input 
            type="file" 
            ref={bodyFileInputRef}
            onChange={handleFileChange}
            accept="image/*" 
            multiple
            style={{ width: '100%', padding: '0.25rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.8rem', marginBottom: '0.75rem', background: '#fff' }} 
          />

          <button 
            onClick={handleInsertImage}
            disabled={isInserting}
            style={{ width: '100%', padding: '0.5rem', background: '#0f172a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
          >
            {isInserting ? 'Compressing & Inserting...' : 'Upload & Insert Image(s)'}
          </button>

          {uploadError && (
            <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.5rem', marginBottom: 0 }}>
              {uploadError}
            </p>
          )}

          {successMessage && (
            <p style={{ color: '#10b981', fontSize: '0.75rem', marginTop: '0.5rem', marginBottom: 0, fontWeight: 'bold' }}>
              {successMessage}
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
                      {isBase64 ? 'Base64 Data' : 'URL Link'}
                    </span>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      <button
                        onClick={(e) => handleCopyTag(e, imgSrc)}
                        style={{ padding: '0.25rem 0.5rem', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 600 }}
                      >
                        Copy
                      </button>
                      <button
                        onClick={(e) => handleDeleteEmbeddedImage(e, imgSrc)}
                        style={{ padding: '0.25rem 0.5rem', background: '#fee2e2', color: '#ef4444', border: '1px solid #fca5a5', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 600 }}
                      >
                        Delete
                      </button>
                    </div>
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
