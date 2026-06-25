"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createArticle, importBulkArticles } from "../actions";

interface Brand {
  id: string;
  name: string;
  slug: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ImportFormProps {
  brands: Brand[];
  categories: Category[];
}

interface BulkQueueItem {
  id: string;
  fileName: string;
  title: string;
  content: string;
  status: "pending" | "saving" | "success" | "error";
  error?: string;
}

declare global {
  interface Window {
    mammoth: any;
    pdfjsLib: any;
    marked: any;
  }
}

export default function ImportForm({ brands, categories }: ImportFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  // Single file mode state
  const [singleFileMode, setSingleFileMode] = useState(false);
  const [articleData, setArticleData] = useState({
    title: "",
    slug: "",
    content: "",
    brandId: "",
    categoryId: "",
    excerpt: "",
    featuredSnippet: "",
    seoTitle: "",
    metaDescription: "",
    canonicalUrl: "",
    status: "draft"
  });

  // Bulk mode state
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkQueue, setBulkQueue] = useState<BulkQueueItem[]>([]);

  // Load CDN scripts client-side
  useEffect(() => {
    const scripts = [
      { id: "mammoth-script", src: "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js" },
      { id: "pdfjs-script", src: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js" },
      { id: "marked-script", src: "https://cdnjs.cloudflare.com/ajax/libs/marked/4.3.0/marked.min.js" }
    ];

    scripts.forEach(script => {
      if (!document.getElementById(script.id)) {
        const s = document.createElement("script");
        s.id = script.id;
        s.src = script.src;
        s.async = true;
        document.body.appendChild(s);
      }
    });
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const cleanTextFormatting = (text: string): string => {
    let clean = text;
    // Replace duplicate spaces
    clean = clean.replace(/[ \t]+/g, " ");
    // Merge broken line endings while maintaining paragraph breaks
    clean = clean.replace(/([^\n])\n([^\n])/g, "$1 $2");
    // Replace multiple empty lines with a single empty line
    clean = clean.replace(/\n{3,}/g, "\n\n");
    return clean.trim();
  };

  const cleanHtmlFormatting = (html: string): string => {
    let clean = html;
    // Remove duplicate spaces
    clean = clean.replace(/[ \t]+/g, " ");
    // Remove empty paragraphs
    clean = clean.replace(/<p>\s*<\/p>/gi, "");
    clean = clean.replace(/<p>&nbsp;<\/p>/gi, "");
    // Clean up text bullet markers converted to plain paragraphs
    clean = clean.replace(/<p>\s*[\*\-•]\s*(.*?)<\/p>/gi, "<li>$1</li>");
    // Wrap <li> inside <ul> if they aren't already
    clean = clean.replace(/(<li>[\s\S]*?<\/li>)/g, "<ul>$1</ul>");
    // Clean duplicate list closures
    clean = clean.replace(/<\/ul>\s*<ul>/g, "");
    return clean.trim();
  };

  const parseFileContent = async (file: File): Promise<{ title: string; content: string }> => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    
    if (ext === "txt") {
      const text = await file.text();
      const cleaned = cleanTextFormatting(text);
      // Format as HTML paragraphs
      const htmlContent = cleaned.split("\n\n").map(p => `<p>${p.replace(/\n/g, "<br />")}</p>`).join("");
      const title = file.name.replace(/\.[^/.]+$/, "");
      return { title, content: htmlContent };
    }

    if (ext === "md") {
      const text = await file.text();
      const cleaned = cleanTextFormatting(text);
      if (!window.marked) {
        throw new Error("Markdown parser is still loading, please wait.");
      }
      const htmlContent = window.marked.parse(cleaned);
      const title = file.name.replace(/\.[^/.]+$/, "");
      return { title, content: htmlContent };
    }

    if (ext === "docx") {
      if (!window.mammoth) {
        throw new Error("DOCX parser is still loading, please wait.");
      }
      const arrayBuffer = await file.arrayBuffer();
      const result = await window.mammoth.convertToHtml({ arrayBuffer });
      const htmlContent = cleanHtmlFormatting(result.value);
      const title = file.name.replace(/\.[^/.]+$/, "");
      return { title, content: htmlContent };
    }

    if (ext === "pdf") {
      if (!window.pdfjsLib) {
        throw new Error("PDF parser is still loading, please wait.");
      }
      const arrayBuffer = await file.arrayBuffer();
      const pdfjsLib = (window as any)["pdfjs-dist/build/pdf"];
      pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";
      
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      let fullText = "";
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(" ");
        fullText += pageText + "\n\n";
      }

      const cleaned = cleanTextFormatting(fullText);
      const htmlContent = cleaned.split("\n\n").map(p => `<p>${p}</p>`).join("");
      const title = file.name.replace(/\.[^/.]+$/, "");
      return { title, content: htmlContent };
    }

    throw new Error("Unsupported file type. Use PDF, DOCX, TXT, or MD.");
  };

  const handleFiles = async (files: File[]) => {
    setIsParsing(true);
    setParseError(null);

    if (files.length === 1) {
      // Single file mode
      try {
        const { title, content } = await parseFileContent(files[0]);
        // Strip brand name prefixes from slug if title has it
        const brandNames = brands.map(b => b.name.toLowerCase());
        let slugBase = title.toLowerCase();
        for (const brand of brandNames) {
          if (slugBase.startsWith(brand + "-") || slugBase.startsWith(brand + " ")) {
            slugBase = slugBase.replace(new RegExp(`^${brand}[-\\s]+`), "");
          }
        }
        
        // Generate excerpt (first 150 characters stripped of HTML)
        const textOnly = content.replace(/<[^>]*>/g, "");
        const excerpt = textOnly.substring(0, 150) + (textOnly.length > 150 ? "..." : "");

        setArticleData({
          title,
          slug: slugBase.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
          content,
          brandId: "",
          categoryId: "",
          excerpt,
          featuredSnippet: textOnly.substring(0, 200),
          seoTitle: title.substring(0, 60),
          metaDescription: textOnly.substring(0, 150),
          canonicalUrl: "",
          status: "draft"
        });
        setSingleFileMode(true);
        setBulkMode(false);
      } catch (err: any) {
        setParseError(err.message || "Failed to parse file.");
      }
    } else {
      // Bulk file mode
      setBulkMode(true);
      setSingleFileMode(false);
      const items: BulkQueueItem[] = [];
      for (const file of files) {
        try {
          const { title, content } = await parseFileContent(file);
          items.push({
            id: Math.random().toString(36).substr(2, 9),
            fileName: file.name,
            title,
            content,
            status: "pending"
          });
        } catch (err: any) {
          items.push({
            id: Math.random().toString(36).substr(2, 9),
            fileName: file.name,
            title: file.name,
            content: "",
            status: "error",
            error: err.message || "Failed to parse"
          });
        }
      }
      setBulkQueue(items);
    }
    setIsParsing(false);
  };

  const handleCleanCurrent = () => {
    // Clean current HTML content
    const cleaned = cleanHtmlFormatting(articleData.content);
    setArticleData(prev => ({ ...prev, content: cleaned }));
  };

  const handleSaveSingle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.entries(articleData).forEach(([key, val]) => {
        fd.append(key, val);
      });
      const created = await createArticle(fd);
      router.push(`/admin/articles/${created.id}/edit`);
    } catch (err: any) {
      alert(err.message || "Failed to save article");
    }
  };

  const handleSaveBulk = async () => {
    const validItems = bulkQueue.filter(item => item.status === "pending" || item.status === "error" && item.content);
    if (validItems.length === 0) return;

    // Update status to saving
    setBulkQueue(prev => prev.map(q => q.status === "pending" ? { ...q, status: "saving" } : q));

    try {
      const docs = validItems.map(item => ({
        title: item.title,
        content: item.content,
        excerpt: item.content.replace(/<[^>]*>/g, "").substring(0, 150) + "...",
      }));

      await importBulkArticles(docs);
      
      setBulkQueue(prev => prev.map(q => q.status === "saving" ? { ...q, status: "success" } : q));
      alert("Successfully imported all queue files as drafts. You can review them in the articles list!");
      router.push("/admin/articles");
    } catch (err: any) {
      setBulkQueue(prev => prev.map(q => q.status === "saving" ? { ...q, status: "error", error: err.message } : q));
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Dropzone Section */}
      {!singleFileMode && !bulkMode && (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: dragActive ? "2px dashed #0070f3" : "2px dashed #ccc",
            borderRadius: "12px",
            background: dragActive ? "rgba(0,112,243,0.05)" : "#fafafa",
            padding: "4rem 2rem",
            textAlign: "center",
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.docx,.txt,.md"
            onChange={handleFileInput}
            style={{ display: "none" }}
          />
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📂</div>
          <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.2rem", fontWeight: "600" }}>
            Drag & Drop Files Here
          </h3>
          <p style={{ margin: 0, color: "#666", fontSize: "0.95rem" }}>
            Supports PDF, DOCX, TXT, and Markdown (.md). Drop multiple files to bulk import.
          </p>
        </div>
      )}

      {isParsing && (
        <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
          Parsing file contents, please wait...
        </div>
      )}

      {parseError && (
        <div style={{ padding: "1rem", background: "#fef2f2", color: "#b91c1c", borderRadius: "8px", border: "1px solid #fee2e2" }}>
          {parseError}
        </div>
      )}

      {/* Single File Review Screen */}
      {singleFileMode && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          {/* Metadata Form */}
          <form onSubmit={handleSaveSingle} style={{ display: "flex", flexDirection: "column", gap: "1.25rem", background: "#fff", padding: "1.5rem", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
            <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.2rem", fontWeight: "600", borderBottom: "1px solid #eee", paddingBottom: "0.5rem" }}>
              Review Article Metadata
            </h3>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "500", color: "#444", marginBottom: "0.35rem" }}>Title</label>
              <input
                type="text"
                value={articleData.title}
                onChange={e => setArticleData(prev => ({ ...prev, title: e.target.value }))}
                required
                style={{ width: "100%", padding: "0.5rem 0.75rem", borderRadius: "4px", border: "1px solid var(--border-color)" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "500", color: "#444", marginBottom: "0.35rem" }}>URL Slug (No Brand Prefix)</label>
              <input
                type="text"
                value={articleData.slug}
                onChange={e => setArticleData(prev => ({ ...prev, slug: e.target.value }))}
                required
                style={{ width: "100%", padding: "0.5rem 0.75rem", borderRadius: "4px", border: "1px solid var(--border-color)" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "500", color: "#444", marginBottom: "0.35rem" }}>Brand</label>
                <select
                  value={articleData.brandId}
                  onChange={e => setArticleData(prev => ({ ...prev, brandId: e.target.value }))}
                  required
                  style={{ width: "100%", padding: "0.5rem 0.75rem", borderRadius: "4px", border: "1px solid var(--border-color)", background: "#fff" }}
                >
                  <option value="">Select Brand...</option>
                  {brands.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "500", color: "#444", marginBottom: "0.35rem" }}>Category</label>
                <select
                  value={articleData.categoryId}
                  onChange={e => setArticleData(prev => ({ ...prev, categoryId: e.target.value }))}
                  required
                  style={{ width: "100%", padding: "0.5rem 0.75rem", borderRadius: "4px", border: "1px solid var(--border-color)", background: "#fff" }}
                >
                  <option value="">Select Category...</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "500", color: "#444", marginBottom: "0.35rem" }}>Excerpt</label>
              <textarea
                value={articleData.excerpt}
                onChange={e => setArticleData(prev => ({ ...prev, excerpt: e.target.value }))}
                rows={3}
                style={{ width: "100%", padding: "0.5rem 0.75rem", borderRadius: "4px", border: "1px solid var(--border-color)" }}
              />
            </div>

            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <button
                type="submit"
                style={{
                  background: "#0070f3",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "0.6rem 1.5rem",
                  fontWeight: "500",
                  cursor: "pointer"
                }}
              >
                Save Draft &amp; Open Editor
              </button>
              <button
                type="button"
                onClick={() => { setSingleFileMode(false); setBulkMode(false); }}
                style={{
                  background: "transparent",
                  color: "#666",
                  border: "1px solid var(--border-color)",
                  borderRadius: "6px",
                  padding: "0.6rem 1.5rem",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
            </div>
          </form>

          {/* HTML Preview / Editor Body */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", background: "#fff", padding: "1.5rem", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eee", paddingBottom: "0.5rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "600" }}>Content Body</h3>
              <button
                type="button"
                onClick={handleCleanCurrent}
                style={{
                  padding: "0.4rem 0.8rem",
                  background: "#10b981",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  fontWeight: "500"
                }}
              >
                [ Clean Formatting ]
              </button>
            </div>

            <textarea
              value={articleData.content}
              onChange={e => setArticleData(prev => ({ ...prev, content: e.target.value }))}
              style={{
                width: "100%",
                height: "400px",
                padding: "1rem",
                borderRadius: "4px",
                border: "1px solid var(--border-color)",
                fontFamily: "monospace",
                fontSize: "0.85rem",
                resize: "none"
              }}
            />
          </div>
        </div>
      )}

      {/* Bulk Queue review screen */}
      {bulkMode && (
        <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid var(--border-color)", padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid #eee", paddingBottom: "0.5rem" }}>
            <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "600" }}>Bulk Import Review Queue</h3>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                type="button"
                onClick={handleSaveBulk}
                style={{
                  background: "#0070f3",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "0.5rem 1rem",
                  fontWeight: "500",
                  cursor: "pointer"
                }}
              >
                Import All Queue Drafts
              </button>
              <button
                type="button"
                onClick={() => { setBulkMode(false); setBulkQueue([]); }}
                style={{
                  background: "transparent",
                  color: "#666",
                  border: "1px solid var(--border-color)",
                  borderRadius: "4px",
                  padding: "0.5rem 1rem",
                  cursor: "pointer"
                }}
              >
                Clear Queue
              </button>
            </div>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ background: "#f9f9f9", borderBottom: "1px solid var(--border-color)", textAlign: "left" }}>
                <th style={{ padding: "0.75rem" }}>File Name</th>
                <th style={{ padding: "0.75rem" }}>Extracted Title</th>
                <th style={{ padding: "0.75rem" }}>Word Count</th>
                <th style={{ padding: "0.75rem" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {bulkQueue.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <td style={{ padding: "0.75rem" }}>{item.fileName}</td>
                  <td style={{ padding: "0.75rem" }}>
                    <input
                      type="text"
                      value={item.title}
                      onChange={e => setBulkQueue(prev => prev.map(q => q.id === item.id ? { ...q, title: e.target.value } : q))}
                      style={{ padding: "0.25rem 0.5rem", borderRadius: "4px", border: "1px solid var(--border-color)", width: "100%" }}
                    />
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    {item.content ? item.content.replace(/<[^>]*>/g, "").trim().split(/\s+/).filter(w => w.length > 0).length : 0} words
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    <span style={{
                      background: item.status === "success" ? "#e8f5e9" : item.status === "saving" ? "#e0f2fe" : item.status === "error" ? "#fef2f2" : "#f1f5f9",
                      color: item.status === "success" ? "#2e7d32" : item.status === "saving" ? "#0369a1" : item.status === "error" ? "#b91c1c" : "#475569",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "4px",
                      fontSize: "0.8rem"
                    }}>
                      {item.status} {item.error && `(${item.error})`}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
