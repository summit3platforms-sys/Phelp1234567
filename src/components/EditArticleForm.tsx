"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ImageUploadSection from "./ImageUploadSection";
import { getRevisions, rollbackRevision, updateArticle } from "@/app/admin/articles/actions";

type ArticleData = {
  id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage: string | null;
  featuredImageAlt: string | null;
  featuredImageTitle: string | null;
  featuredImageCaption: string | null;
  seoTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  wordCount: number | null;
  excerpt: string | null;
  featuredSnippet: string | null;
  faqs: string | null;
  status: string;
  brandId: string | null;
  categoryId: string | null;
  authorId: string | null;
  uploadedImages: string | null;
};

interface ImageItem {
  id: string;
  src: string;
  name: string;
  alt: string;
  caption: string;
}

type Author = {
  id: string;
  name: string;
  role: string | null;
};

type Brand = {
  id: string;
  name: string;
  slug: string;
};

type Category = {
  id: string;
  name: string;
  slug: string;
};

type RelatedArticle = {
  id: string;
  title: string;
  slug: string;
  brandId: string | null;
  categoryId: string | null;
  brand: { slug: string; name: string } | null;
  category: { slug: string; name: string } | null;
};

type EditArticleFormProps = {
  article: ArticleData;
  authors: Author[];
  brands: Brand[];
  categories: Category[];
  allArticles: RelatedArticle[];
  updateAction: (id: string, formData: FormData) => Promise<void>;
};

type BlockType = "paragraph" | "heading" | "image" | "raw";

type ImageAttrs = {
  src: string;
  alt: string;
  caption: string;
  align: "left" | "center" | "right";
  width: string;
};

type Block = {
  id: string;
  type: BlockType;
  text: string;
  html: string;
  headingLevel?: number;
  imageAttrs?: ImageAttrs;
  isEditingCode?: boolean;
};

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order?: number;
}

export default function EditArticleForm({
  article,
  authors,
  brands,
  categories,
  allArticles,
  updateAction,
}: EditArticleFormProps) {
  const [activeMainTab, setActiveMainTab] = useState<"edit" | "preview">("edit");
  const [activeSidebarTab, setActiveSidebarTab] = useState<"seo" | "faqs" | "links" | "history" | "images">("seo");
  
  const [editorMode, setEditorMode] = useState<"visual" | "code">("visual");
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [copiedBlockId, setCopiedBlockId] = useState<string | null>(null);

  // Uploaded images list
  const [uploadedImages, setUploadedImages] = useState<ImageItem[]>(() => {
    try {
      return article.uploadedImages ? JSON.parse(article.uploadedImages) : [];
    } catch {
      return [];
    }
  });
  
  // Form fields
  const [title, setTitle] = useState(article.title);
  const [slug, setSlug] = useState(article.slug);
  const [content, setContent] = useState(article.content);
  const [status, setStatus] = useState(article.status);
  const [authorId, setAuthorId] = useState(article.authorId || "");
  const [brandId, setBrandId] = useState(article.brandId || "");
  const [categoryId, setCategoryId] = useState(article.categoryId || "");
  
  // SEO fields
  const [seoTitle, setSeoTitle] = useState(article.seoTitle || "");
  const [metaDescription, setMetaDescription] = useState(article.metaDescription || "");
  const [canonicalUrl, setCanonicalUrl] = useState(article.canonicalUrl || "");
  const [excerpt, setExcerpt] = useState(article.excerpt || "");
  const [featuredSnippet, setFeaturedSnippet] = useState(article.featuredSnippet || "");
  
  // Featured Image fields
  const [featuredImage, setFeaturedImage] = useState(article.featuredImage);
  const [featuredImageAlt, setFeaturedImageAlt] = useState(article.featuredImageAlt || "");
  const [featuredImageTitle, setFeaturedImageTitle] = useState(article.featuredImageTitle || "");
  const [featuredImageCaption, setFeaturedImageCaption] = useState(article.featuredImageCaption || "");

  // FAQs
  const [faqsList, setFaqsList] = useState<FAQItem[]>([]);
  const [newFaqQuestion, setNewFaqQuestion] = useState("");
  const [newFaqAnswer, setNewFaqAnswer] = useState("");
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [editingFaqQuestion, setEditingFaqQuestion] = useState("");
  const [editingFaqAnswer, setEditingFaqAnswer] = useState("");

  // Revisions & Autosave Status
  const [revisions, setRevisions] = useState<any[]>([]);
  const [isDirty, setIsDirty] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>("Saved");
  const [lastSavedTime, setLastSavedTime] = useState<string>("");

  // Link Assistant Search
  const [linkSearch, setLinkSearch] = useState("");

  // Selection tracking for link insertions
  const [focusedTextareaId, setFocusedTextareaId] = useState<string | null>(null);
  const [selectionStart, setSelectionStart] = useState<number>(0);
  const [selectionEnd, setSelectionEnd] = useState<number>(0);
  
  const [mainSelectionStart, setMainSelectionStart] = useState<number>(0);
  const [mainSelectionEnd, setMainSelectionEnd] = useState<number>(0);

  const textareaRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});
  const mainTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Parse HTML content string into block arrays for the visual editor
  const parseHtmlToBlocks = (htmlString: string): Block[] => {
    if (typeof window === "undefined") return [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString || "", "text/html");
    const parsedBlocks: Block[] = [];
    const children = Array.from(doc.body.childNodes);

    children.forEach((node) => {
      // Ignore empty text nodes
      if (node.nodeType === Node.TEXT_NODE && !node.textContent?.trim()) return;

      // Detect Image (either direct img or img wrapped in div/figure)
      let imgEl: HTMLImageElement | null = null;
      let divWrapper: HTMLElement | null = null;

      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        if (el.tagName === "IMG") {
          imgEl = el as HTMLImageElement;
        } else {
          imgEl = el.querySelector("img");
          if (imgEl) {
            divWrapper = el;
          }
        }
      }

      if (imgEl) {
        let align: "left" | "center" | "right" = "center";
        let width = "100%";
        let caption = "";

        if (divWrapper) {
          const styleAlign = divWrapper.style.textAlign;
          if (styleAlign === "left" || styleAlign === "right" || styleAlign === "center") {
            align = styleAlign;
          }
        }
        const styleWidth = imgEl.style.maxWidth || imgEl.style.width;
        if (styleWidth) {
          width = styleWidth;
        }

        // Try to get caption from next sibling if it looks like a caption, or placeholder
        parsedBlocks.push({
          id: "block_" + Math.random().toString(36).substring(2, 9),
          type: "image",
          text: "",
          html: "",
          imageAttrs: {
            src: imgEl.getAttribute("src") || "",
            alt: imgEl.getAttribute("alt") || "",
            caption: imgEl.getAttribute("title") || caption,
            align,
            width
          }
        });
        return;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        
        // Headings H1-H6
        if (/^H[1-6]$/.test(el.tagName)) {
          parsedBlocks.push({
            id: "block_" + Math.random().toString(36).substring(2, 9),
            type: "heading",
            text: el.textContent || "",
            html: "",
            headingLevel: parseInt(el.tagName.substring(1))
          });
          return;
        }

        // Paragraphs
        if (el.tagName === "P") {
          parsedBlocks.push({
            id: "block_" + Math.random().toString(36).substring(2, 9),
            type: "paragraph",
            text: el.innerHTML || el.textContent || "",
            html: ""
          });
          return;
        }
      }

      // Default fallback is raw html block
      const tempDiv = document.createElement("div");
      tempDiv.appendChild(node.cloneNode(true));
      parsedBlocks.push({
        id: "block_" + Math.random().toString(36).substring(2, 9),
        type: "raw",
        text: "",
        html: tempDiv.innerHTML,
        isEditingCode: false
      });
    });

    return parsedBlocks.length > 0 ? parsedBlocks : [{ id: "block_default", type: "paragraph", text: "", html: "" }];
  };

  // Convert blocks back into a clean HTML content string
  const serializeBlocksToHtml = (blocksList: Block[]): string => {
    return blocksList
      .map((block) => {
        if (block.type === "paragraph") {
          return `<p>${block.text}</p>`;
        }
        if (block.type === "heading") {
          const level = block.headingLevel || 2;
          return `<h${level}>${block.text}</h${level}>`;
        }
        if (block.type === "image" && block.imageAttrs) {
          const { src, alt, caption, align, width } = block.imageAttrs;
          const styleStr = `max-width: ${width}; width: 100%; height: auto; display: inline-block;`;
          const wrapperStyleStr = `text-align: ${align}; margin: 1.5rem 0;`;
          const imgHtml = `<img src="${src}" alt="${alt}"${caption ? ` title="${caption}"` : ""} style="${styleStr}" />`;
          const captionHtml = caption ? `<figcaption style="font-size: 0.85rem; color: #64748b; margin-top: 0.5rem; text-align: center;">${caption}</figcaption>` : "";
          
          return `<div style="${wrapperStyleStr}">\n  ${imgHtml}${captionHtml ? `\n  ${captionHtml}` : ""}\n</div>`;
        }
        if (block.type === "raw") {
          return block.html;
        }
        return "";
      })
      .join("\n\n");
  };

  // Initialize blocks and faqs
  useEffect(() => {
    const parsed = parseHtmlToBlocks(article.content);
    setBlocks(parsed);
    
    if (article.faqs) {
      try {
        setFaqsList(JSON.parse(article.faqs));
      } catch (e) {
        setFaqsList([]);
      }
    }
    
    loadRevisionsList();
    setLastSavedTime(new Date().toLocaleTimeString());
  }, []);

  const loadRevisionsList = async () => {
    try {
      const list = await getRevisions(article.id);
      setRevisions(list);
    } catch (e) {
      console.error("Failed to load revisions", e);
    }
  };

  // Calculate dynamic Word Count
  const getWordCount = () => {
    const rawText = editorMode === "visual" ? serializeBlocksToHtml(blocks) : content;
    const cleanText = rawText.replace(/<[^>]*>/g, " ");
    const words = cleanText.trim().split(/\s+/).filter(w => w.length > 0);
    return words.length;
  };

  const wordCount = getWordCount();

  // Track changes to make page dirty
  useEffect(() => {
    setIsDirty(true);
  }, [
    title, slug, content, status, authorId, brandId, categoryId,
    seoTitle, metaDescription, canonicalUrl, excerpt, featuredSnippet,
    featuredImage, featuredImageAlt, featuredImageTitle, featuredImageCaption,
    faqsList, uploadedImages
  ]);

  // Background Autosave trigger (Runs every 30 seconds if dirty)
  useEffect(() => {
    const interval = setInterval(() => {
      if (isDirty) {
        handleSaveInPlace();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [isDirty, title, slug, blocks, content, status, authorId, brandId, categoryId, seoTitle, metaDescription, canonicalUrl, excerpt, featuredSnippet, featuredImage, featuredImageAlt, featuredImageTitle, featuredImageCaption, faqsList, editorMode, uploadedImages]);

  // Compile data into FormData structure
  const compileFormData = (currentContent: string, currentStatus?: string): FormData => {
    const fd = new FormData();
    fd.append("title", title);
    fd.append("slug", slug);
    fd.append("content", currentContent);
    fd.append("status", currentStatus || status);
    fd.append("authorId", authorId);
    fd.append("brandId", brandId);
    fd.append("categoryId", categoryId);
    fd.append("seoTitle", seoTitle);
    fd.append("metaDescription", metaDescription);
    fd.append("canonicalUrl", canonicalUrl);
    fd.append("excerpt", excerpt);
    fd.append("featuredSnippet", featuredSnippet);
    fd.append("faqs", JSON.stringify(faqsList));
    fd.append("featuredImage", featuredImage || "");
    fd.append("featuredImageAlt", featuredImageAlt);
    fd.append("featuredImageTitle", featuredImageTitle);
    fd.append("featuredImageCaption", featuredImageCaption);
    fd.append("uploadedImages", JSON.stringify(uploadedImages));
    return fd;
  };

  // Perform in-place save without redirecting
  const handleSaveInPlace = async (newStatus?: string) => {
    setSaveStatus("Saving...");
    try {
      const finalContent = editorMode === "visual" ? serializeBlocksToHtml(blocks) : content;
      const fd = compileFormData(finalContent, newStatus);
      await updateArticle(article.id, fd);
      
      setIsDirty(false);
      setSaveStatus("Saved");
      setLastSavedTime(new Date().toLocaleTimeString());
      loadRevisionsList();
    } catch (err: any) {
      setSaveStatus("Save failed");
      console.error("Save error:", err);
    }
  };

  // Manual save and exit (submits form and redirects)
  const handleSaveAndExit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("Saving & exiting...");
    try {
      const finalContent = editorMode === "visual" ? serializeBlocksToHtml(blocks) : content;
      const fd = compileFormData(finalContent);
      await updateAction(article.id, fd);
    } catch (err: any) {
      if (err.message === "NEXT_REDIRECT" || err.message?.includes("NEXT_REDIRECT")) {
        throw err;
      }
      setSaveStatus("Save failed");
      alert(`Save error: ${err.message}`);
    }
  };

  // FAQ CRUD handlers
  const handleAddFaq = () => {
    if (!newFaqQuestion.trim() || !newFaqAnswer.trim()) return;
    const newItem: FAQItem = {
      id: "faq_" + Date.now(),
      question: newFaqQuestion.trim(),
      answer: newFaqAnswer.trim()
    };
    setFaqsList([...faqsList, newItem]);
    setNewFaqQuestion("");
    setNewFaqAnswer("");
  };

  const handleDeleteFaq = (id: string) => {
    setFaqsList(faqsList.filter((f) => f.id !== id));
  };

  const startEditFaq = (faq: FAQItem) => {
    setEditingFaqId(faq.id);
    setEditingFaqQuestion(faq.question);
    setEditingFaqAnswer(faq.answer);
  };

  const handleSaveEditFaq = () => {
    if (!editingFaqQuestion.trim() || !editingFaqAnswer.trim()) return;
    setFaqsList(
      faqsList.map((f) =>
        f.id === editingFaqId
          ? { ...f, question: editingFaqQuestion.trim(), answer: editingFaqAnswer.trim() }
          : f
      )
    );
    setEditingFaqId(null);
  };

  const moveFaq = (index: number, direction: "up" | "down") => {
    const updated = [...faqsList];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= updated.length) return;
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setFaqsList(updated);
  };

  // Block creation/deletion and alignment controls
  const addBlock = (type: BlockType, headingLevel?: number, afterBlockId?: string | null) => {
    const newBlock: Block = {
      id: "b_" + Date.now() + Math.random().toString(36).substring(2, 5),
      type,
      text: "",
      html: "",
      headingLevel,
      imageAttrs: type === "image" ? { src: "", alt: "", caption: "", align: "center", width: "100%" } : undefined,
      isEditingCode: type === "raw"
    };

    if (afterBlockId) {
      const idx = blocks.findIndex((b) => b.id === afterBlockId);
      if (idx !== -1) {
        const updated = [...blocks];
        updated.splice(idx + 1, 0, newBlock);
        setBlocks(updated);
        setActiveBlockId(newBlock.id);
        return;
      }
    }

    setBlocks([...blocks, newBlock]);
    setActiveBlockId(newBlock.id);
  };

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter((b) => b.id !== id));
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    const updated = [...blocks];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= updated.length) return;
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setBlocks(updated);
  };

  const handleModeChange = (mode: "visual" | "code") => {
    if (mode === "visual") {
      setBlocks(parseHtmlToBlocks(content));
    } else {
      setContent(serializeBlocksToHtml(blocks));
    }
    setEditorMode(mode);
  };

  // Track text cursor positions for insertions
  const handleTextareaBlur = (blockId: string, e: React.FocusEvent<HTMLTextAreaElement>) => {
    setFocusedTextareaId(blockId);
    setSelectionStart(e.target.selectionStart);
    setSelectionEnd(e.target.selectionEnd);
  };

  const handleMainTextareaBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setMainSelectionStart(e.target.selectionStart);
    setMainSelectionEnd(e.target.selectionEnd);
  };

  // Insert internal links at cursor caret position
  const handleInsertLink = (articleToLink: RelatedArticle) => {
    const brandSlug = articleToLink.brand?.slug || "uncategorized";
    const categorySlug = articleToLink.category?.slug || "uncategorized";
    const relativeUrl = `/${brandSlug}/${categorySlug}/${articleToLink.slug}`;
    const linkHtml = `<a href="${relativeUrl}">${articleToLink.title}</a>`;

    if (editorMode === "visual" && focusedTextareaId) {
      const updated = blocks.map((b) => {
        if (b.id === focusedTextareaId) {
          const textBefore = b.text.substring(0, selectionStart);
          const textAfter = b.text.substring(selectionEnd);
          const newText = textBefore + linkHtml + textAfter;
          
          // Re-adjust cursor offsets
          setTimeout(() => {
            const el = textareaRefs.current[b.id];
            if (el) {
              el.focus();
              const newPos = selectionStart + linkHtml.length;
              el.setSelectionRange(newPos, newPos);
            }
          }, 50);

          return { ...b, text: newText };
        }
        return b;
      });
      setBlocks(updated);
    } else if (editorMode === "code") {
      const textBefore = content.substring(0, mainSelectionStart);
      const textAfter = content.substring(mainSelectionEnd);
      const newContent = textBefore + linkHtml + textAfter;
      setContent(newContent);

      setTimeout(() => {
        if (mainTextareaRef.current) {
          mainTextareaRef.current.focus();
          const newPos = mainSelectionStart + linkHtml.length;
          mainTextareaRef.current.setSelectionRange(newPos, newPos);
        }
      }, 50);
    } else {
      alert("Please click inside a paragraph text field to position the cursor before inserting a link.");
    }
  };

  // Revision rollback action
  const handleRollback = async (rev: any) => {
    if (confirm(`Are you sure you want to rollback to revision #${rev.version}?`)) {
      try {
        setSaveStatus("Rolling back...");
        await rollbackRevision(article.id, rev.id);
        
        setTitle(rev.title);
        setContent(rev.content);
        const parsedBlocks = parseHtmlToBlocks(rev.content);
        setBlocks(parsedBlocks);
        
        setSeoTitle(rev.seoTitle || "");
        setMetaDescription(rev.metaDescription || "");
        setExcerpt(rev.excerpt || "");
        setFeaturedSnippet(rev.featuredSnippet || "");
        
        setFeaturedImage(rev.featuredImage);
        setFeaturedImageAlt(rev.featuredImageAlt || "");
        setFeaturedImageTitle(rev.featuredImageTitle || "");
        setFeaturedImageCaption(rev.featuredImageCaption || "");
        
        if (rev.faqs) {
          try {
            setFaqsList(JSON.parse(rev.faqs));
          } catch (e) {
            setFaqsList([]);
          }
        } else {
          setFaqsList([]);
        }

        if (rev.uploadedImages) {
          try {
            setUploadedImages(JSON.parse(rev.uploadedImages));
          } catch (e) {
            setUploadedImages([]);
          }
        } else {
          setUploadedImages([]);
        }
        
        await loadRevisionsList();
        setIsDirty(false);
        setSaveStatus("Saved");
        setLastSavedTime(new Date().toLocaleTimeString());
        alert(`Rolled back to revision #${rev.version} successfully!`);
      } catch (err: any) {
        alert(`Rollback failed: ${err.message}`);
        setSaveStatus("Rollback failed");
      }
    }
  };

  // Local client side image file upload & compression for blocks
  const handleBlockImageUpload = (blockId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        const MAX_WIDTH = 1000;
        const MAX_HEIGHT = 750;

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

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
          
          setBlocks((prev) =>
            prev.map((b) => {
              if (b.id === blockId) {
                return {
                  ...b,
                  imageAttrs: {
                    src: compressedDataUrl,
                    alt: "",
                    caption: "",
                    align: "center",
                    width: "100%"
                  }
                };
              }
              return b;
            })
          );
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSidebarImagesUpload = (files: FileList | null) => {
    if (!files) return;
    
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const MAX_WIDTH = 1000;
          const MAX_HEIGHT = 750;

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

          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
            
            const newImage: ImageItem = {
              id: "img_" + Date.now() + Math.random().toString(36).substring(2, 5),
              src: compressedDataUrl,
              name: file.name,
              alt: file.name.split('.')[0] || "Uploaded image",
              caption: ""
            };

            setUploadedImages((prev) => [...prev, newImage]);
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUpdateImageMeta = (id: string, field: "alt" | "caption", value: string) => {
    setUploadedImages((prev) =>
      prev.map((img) => {
        if (img.id === id) {
          const updated = { ...img, [field]: value };
          // If this image is currently the featured image, sync the parent featured fields!
          if (featuredImage === img.src) {
            if (field === "alt") setFeaturedImageAlt(value);
            if (field === "caption") setFeaturedImageCaption(value);
          }
          return updated;
        }
        return img;
      })
    );
  };

  const handleSetAsFeatured = (img: ImageItem) => {
    setFeaturedImage(img.src);
    setFeaturedImageAlt(img.alt || "");
    setFeaturedImageCaption(img.caption || "");
  };

  const handleDeleteUploadedImage = (id: string) => {
    const target = uploadedImages.find((img) => img.id === id);
    if (target && featuredImage === target.src) {
      setFeaturedImage(null);
      setFeaturedImageAlt("");
      setFeaturedImageCaption("");
    }
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleInsertImageToArticle = (img: ImageItem) => {
    const newBlock: Block = {
      id: "block_" + Math.random().toString(36).substring(2, 9),
      type: "image",
      text: "",
      html: "",
      imageAttrs: {
        src: img.src,
        alt: img.alt || "",
        caption: img.caption || "",
        align: "center",
        width: "100%"
      }
    };

    setBlocks((currentBlocks) => {
      if (activeBlockId) {
        const idx = currentBlocks.findIndex((b) => b.id === activeBlockId);
        if (idx !== -1) {
          const updated = [...currentBlocks];
          updated.splice(idx + 1, 0, newBlock);
          return updated;
        }
      }
      return [...currentBlocks, newBlock];
    });
    setActiveBlockId(newBlock.id);
  };

  // SEO Health calculation logic
  const calculateSeoHealth = () => {
    const checks = [
      {
        id: "meta-title",
        label: "Meta Title defined and ideal length (40 - 60 chars)",
        passed: seoTitle.length >= 40 && seoTitle.length <= 60,
        score: 10,
        current: `${seoTitle.length} chars`
      },
      {
        id: "meta-desc",
        label: "Meta Description defined and ideal length (120 - 160 chars)",
        passed: metaDescription.length >= 120 && metaDescription.length <= 160,
        score: 15,
        current: `${metaDescription.length} chars`
      },
      {
        id: "word-count",
        label: "Comprehensive Article Word Count (300+ target)",
        passed: wordCount >= 300,
        score: 15,
        current: `${wordCount} words`
      },
      {
        id: "canonical",
        label: "Canonical URL defined",
        passed: canonicalUrl.trim().length > 0,
        score: 10,
        current: canonicalUrl.trim() ? "defined" : "missing"
      },
      {
        id: "headings",
        label: "Heading Structure contains H2s",
        passed: editorMode === "visual" 
          ? blocks.some((b) => b.type === "heading" && b.headingLevel === 2)
          : content.includes("<h2>") || content.includes("<h2 "),
        score: 10,
        current: editorMode === "visual"
          ? `${blocks.filter(b => b.type === "heading" && b.headingLevel === 2).length} H2s`
          : "Checked"
      },
      {
        id: "faqs",
        label: "FAQ Accordion schema sections populated",
        passed: faqsList.length >= 1,
        score: 10,
        current: `${faqsList.length} FAQs`
      },
      {
        id: "internal-links",
        label: "Includes contextual internal hyperlinking",
        passed: editorMode === "visual"
          ? blocks.some(b => b.text.includes("<a href="))
          : content.includes("<a href="),
        score: 10,
        current: "Checked"
      },
      {
        id: "excerpt",
        label: "Snippet excerpt populated (50 - 150 chars)",
        passed: excerpt.length >= 50 && excerpt.length <= 150,
        score: 10,
        current: `${excerpt.length} chars`
      },
      {
        id: "featured-snippet",
        label: "Featured SEO Snippet Box",
        passed: featuredSnippet.trim().length > 0,
        score: 10,
        current: featuredSnippet.trim() ? "defined" : "missing"
      }
    ];

    const totalPossibleScore = checks.reduce((sum, item) => sum + item.score, 0);
    const earnedScore = checks.reduce((sum, item) => sum + (item.passed ? item.score : 0), 0);
    const scorePercentage = Math.round((earnedScore / totalPossibleScore) * 100);

    return {
      score: scorePercentage,
      checks
    };
  };

  const seoHealth = calculateSeoHealth();

  // Related internal link list search filter
  const filteredArticles = allArticles.filter((art) => {
    if (!linkSearch.trim()) return true;
    return art.title.toLowerCase().includes(linkSearch.toLowerCase()) || 
           art.slug.toLowerCase().includes(linkSearch.toLowerCase());
  });

  // Table of Contents rendering parser
  const getTableOfContents = () => {
    if (editorMode === "visual") {
      return blocks
        .filter((b) => b.type === "heading" && b.headingLevel === 2)
        .map((b) => b.text);
    }
    // Simple regex parser for markdown/HTML in code mode
    const h2s = [];
    const regex = /<h2[^>]*>(.*?)<\/h2>/gi;
    let match;
    while ((match = regex.exec(content)) !== null) {
      h2s.push(match[1].replace(/<[^>]*>/g, ""));
    }
    return h2s;
  };

  const tocHeadings = getTableOfContents();

  return (
    <div className="edit-form-container">
      {/* Dynamic Style injection */}
      <style>{`
        .edit-form-container {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          max-width: 1400px;
          margin: 0 auto;
          padding: 1.5rem;
          background-color: #f8fafc;
          color: #0f172a;
        }
        .header-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          padding: 1rem 1.5rem;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          margin-bottom: 1.5rem;
          border: 1px solid #e2e8f0;
        }
        .title-area {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .back-link {
          color: #64748b;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .back-link:hover {
          color: #0f172a;
        }
        .save-indicator {
          font-size: 0.85rem;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }
        .dot-saved { background-color: #10b981; }
        .dot-saving { background-color: #f59e0b; animation: pulse 1s infinite alternate; }
        .dot-failed { background-color: #ef4444; }

        @keyframes pulse {
          0% { opacity: 0.4; }
          100% { opacity: 1; }
        }

        .actions-row {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }
        .btn {
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.15s ease;
          border: 1px solid transparent;
        }
        .btn-outline {
          background: white;
          border-color: #cbd5e1;
          color: #475569;
        }
        .btn-outline:hover {
          background: #f1f5f9;
          border-color: #94a3b8;
          color: #0f172a;
        }
        .btn-primary {
          background: #3b82f6;
          color: white;
        }
        .btn-primary:hover {
          background: #2563eb;
        }
        .btn-success {
          background: #10b981;
          color: white;
        }
        .btn-success:hover {
          background: #059669;
        }

        .main-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media(min-width: 1024px) {
          .main-layout {
            grid-template-columns: 1fr 380px;
          }
        }

        .editor-section {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .sidebar-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .sidebar-tabs {
          display: flex;
          background: #e2e8f0;
          padding: 0.25rem;
          border-radius: 6px;
          gap: 0.25rem;
        }
        .sidebar-tab-btn {
          flex: 1;
          background: none;
          border: none;
          padding: 0.4rem 0.5rem;
          font-size: 0.8rem;
          font-weight: 600;
          border-radius: 4px;
          cursor: pointer;
          color: #475569;
          transition: background 0.15s;
        }
        .sidebar-tab-btn.active {
          background: white;
          color: #0f172a;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        .sidebar-panel {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 1.25rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          min-height: 400px;
        }

        .input-group {
          margin-bottom: 1rem;
        }
        .input-group label {
          display: block;
          font-weight: 600;
          font-size: 0.85rem;
          margin-bottom: 0.35rem;
          color: #475569;
        }
        .text-input {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 0.95rem;
          box-sizing: border-box;
          outline: none;
        }
        .text-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .tabs-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 0.5rem;
        }
        .tabs-toggle {
          display: flex;
          gap: 0.5rem;
        }
        .tab-btn {
          background: none;
          border: none;
          padding: 0.4rem 0.8rem;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          color: #64748b;
          border-bottom: 2px solid transparent;
        }
        .tab-btn.active {
          color: #3b82f6;
          border-bottom-color: #3b82f6;
        }

        .block-card {
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          margin-bottom: 1rem;
          background: #fff;
          transition: all 0.2s ease;
          overflow: hidden;
        }
        .block-card.active {
          border-color: #3b82f6;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.08);
        }
        .block-card-header {
          background: #f8fafc;
          padding: 0.5rem 0.75rem;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .block-type-badge {
          font-size: 0.75rem;
          font-weight: bold;
          text-transform: uppercase;
          color: #64748b;
          background: #e2e8f0;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
        }
        .block-controls {
          display: flex;
          gap: 0.25rem;
        }
        .block-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #64748b;
          padding: 0.25rem;
          border-radius: 4px;
          font-size: 0.8rem;
        }
        .block-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
        }
        .block-btn-danger:hover {
          background: #fee2e2;
          color: #ef4444;
        }
        .block-content {
          padding: 0.75rem;
        }
        .block-textarea {
          width: 100%;
          border: none;
          outline: none;
          resize: vertical;
          font-size: 0.95rem;
          line-height: 1.5;
          font-family: inherit;
          padding: 0;
          color: #0f172a;
          box-sizing: border-box;
          min-height: 60px;
        }

        .heading-select {
          padding: 0.25rem 0.5rem;
          font-size: 0.8rem;
          border: 1px solid #cbd5e1;
          border-radius: 4px;
          outline: none;
        }

        .image-block-uploader {
          padding: 1rem;
          border: 2px dashed #cbd5e1;
          border-radius: 6px;
          text-align: center;
          background: #f8fafc;
        }
        .image-block-preview-card {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .image-block-preview-img {
          max-height: 180px;
          object-fit: contain;
          border-radius: 4px;
          align-self: center;
          border: 1px solid #cbd5e1;
          background: #f1f5f9;
        }

        .block-insert-divider {
          height: 16px;
          margin: -0.5rem 0 0.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .block-insert-divider:hover {
          opacity: 1;
        }
        .block-insert-line {
          height: 1px;
          background: #e2e8f0;
          flex: 1;
        }
        .block-insert-btn-group {
          background: white;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          padding: 0.15rem 0.5rem;
          display: flex;
          gap: 0.25rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .block-insert-mini-btn {
          background: none;
          border: none;
          font-size: 0.7rem;
          font-weight: bold;
          color: #64748b;
          cursor: pointer;
          padding: 0.15rem 0.35rem;
          border-radius: 4px;
        }
        .block-insert-mini-btn:hover {
          background: #f1f5f9;
          color: #3b82f6;
        }

        .seo-score-widget {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }
        .seo-score-circle {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          font-weight: 800;
          color: white;
        }
        .score-good { background: #10b981; }
        .score-warn { background: #f59e0b; }
        .score-poor { background: #ef4444; }

        .checklist-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.8rem;
          margin-bottom: 0.65rem;
          line-height: 1.4;
        }
        .checklist-status {
          font-size: 1rem;
          line-height: 1;
          margin-top: -1px;
        }
        .checklist-status.passed { color: #10b981; }
        .checklist-status.failed { color: #cbd5e1; }

        .faq-item-card {
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 0.75rem;
          margin-bottom: 0.75rem;
          background: #f8fafc;
        }
        .faq-item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 0.5rem;
          margin-bottom: 0.4rem;
        }
        .faq-item-title {
          font-weight: 600;
          font-size: 0.85rem;
        }
        .faq-item-ans {
          font-size: 0.8rem;
          color: #475569;
        }

        .link-list-item {
          padding: 0.5rem;
          border-radius: 4px;
          border: 1px solid #f1f5f9;
          font-size: 0.8rem;
          cursor: pointer;
          background: #fff;
          transition: background 0.15s;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .link-list-item:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
        }

        .revision-row {
          padding: 0.6rem 0.5rem;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
        }
        .revision-meta {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        /* Live Preview Styles */
        .preview-pane {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 2.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          line-height: 1.7;
          color: #334155;
        }
        .preview-breadcrumbs {
          font-size: 0.85rem;
          color: #64748b;
          margin-bottom: 1rem;
        }
        .preview-title {
          font-size: 2.25rem;
          line-height: 1.2;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 1rem;
        }
        .preview-meta-row {
          font-size: 0.85rem;
          color: #64748b;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 1rem;
          margin-bottom: 1.5rem;
          display: flex;
          gap: 1.5rem;
        }
        .preview-toc {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 1.25rem;
          margin-bottom: 1.75rem;
        }
        .preview-toc-title {
          font-weight: 700;
          font-size: 1rem;
          color: #0f172a;
          margin-bottom: 0.75rem;
        }
        .preview-toc-list {
          padding-left: 1.25rem;
          margin: 0;
          font-size: 0.9rem;
          color: #2563eb;
        }
        .preview-toc-list li {
          margin-bottom: 0.35rem;
        }
        .preview-snippet {
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          border-left: 4px solid #3b82f6;
          border-radius: 0 8px 8px 0;
          padding: 1.25rem;
          margin-bottom: 1.75rem;
        }
        .preview-snippet-title {
          font-weight: 700;
          font-size: 0.95rem;
          color: #1d4ed8;
          margin-bottom: 0.35rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .preview-body h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
          margin: 2rem 0 1rem;
        }
        .preview-body h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin: 1.5rem 0 0.75rem;
        }
        .preview-body p {
          margin-bottom: 1.25rem;
        }
        .preview-body img {
          border-radius: 6px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .preview-faqs {
          margin-top: 3rem;
          border-top: 1px solid #e2e8f0;
          padding-top: 2rem;
        }
        .preview-faqs-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 1.5rem;
        }
        .preview-faq-item {
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          margin-bottom: 0.75rem;
          overflow: hidden;
        }
        .preview-faq-q {
          background: #f8fafc;
          padding: 0.85rem 1.25rem;
          font-weight: 600;
          font-size: 0.95rem;
          color: #0f172a;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .preview-faq-a {
          padding: 1rem 1.25rem;
          background: white;
          border-top: 1px solid #e2e8f0;
          font-size: 0.9rem;
          color: #475569;
        }

        .image-library-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
          margin-top: 1rem;
        }
        .image-library-card {
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 0.5rem;
          background: #f8fafc;
          display: flex;
          gap: 0.75rem;
          align-items: center;
          cursor: pointer;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .image-library-card:hover {
          border-color: #cbd5e1;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .image-library-card.active {
          border-color: #3b82f6;
          background: #f0f7ff;
        }
        .image-library-thumb {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 4px;
          border: 1px solid #cbd5e1;
          background: #f1f5f9;
        }
        .image-library-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .image-library-name {
          font-size: 0.8rem;
          font-weight: 600;
          color: #0f172a;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .image-library-actions {
          display: flex;
          gap: 0.35rem;
          margin-top: 0.15rem;
        }
        .image-library-btn {
          background: white;
          border: 1px solid #cbd5e1;
          padding: 0.15rem 0.35rem;
          font-size: 0.7rem;
          border-radius: 4px;
          cursor: pointer;
          color: #475569;
          font-weight: 500;
          transition: all 0.15s;
        }
        .image-library-btn:hover {
          background: #f1f5f9;
          border-color: #94a3b8;
          color: #0f172a;
        }
        .image-library-btn-danger {
          color: #ef4444;
          border-color: #fecaca;
        }
        .image-library-btn-danger:hover {
          background: #fee2e2;
          border-color: #fca5a5;
          color: #dc2626;
        }
      `}</style>

      {/* Header bar */}
      <div className="header-bar">
        <div className="title-area">
          <Link href="/admin/articles" className="back-link">
            ← Back
          </Link>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
            <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700 }}>
              Edit: {title || "Untitled Article"}
            </h2>
            <div className="save-indicator">
              <span className={`indicator-dot ${
                saveStatus === "Saving..." ? "dot-saving" : 
                saveStatus.startsWith("Saved") ? "dot-saved" : "dot-failed"
              }`} />
              <span>{saveStatus === "Saving..." ? "Saving changes..." : `${saveStatus} (Last save: ${lastSavedTime})`}</span>
            </div>
          </div>
        </div>
        
        <div className="actions-row">
          <button 
            type="button" 
            className="btn btn-outline" 
            onClick={() => handleSaveInPlace()}
            disabled={saveStatus === "Saving..."}
          >
            Save Draft
          </button>
          
          <button
            type="button"
            className={`btn ${status === "published" ? "btn-success" : "btn-primary"}`}
            onClick={async () => {
              const targetStatus = status === "published" ? "draft" : "published";
              if (targetStatus === "published") {
                const missing = seoHealth.checks.filter(c => !c.passed && c.score >= 10);
                if (missing.length > 0) {
                  const confirmPub = confirm(`Warning: This article is missing some recommended SEO features:\n\n` + 
                    missing.map(m => `• ${m.label}`).join("\n") + 
                    `\n\nDo you want to publish anyway?`);
                  if (!confirmPub) return;
                }
              }
              setStatus(targetStatus);
              await handleSaveInPlace(targetStatus);
            }}
          >
            {status === "published" ? "✓ Published" : "Publish Article"}
          </button>

          <button
            type="button"
            className="btn btn-outline"
            style={{ background: "#0f172a", color: "white", borderColor: "#0f172a" }}
            onClick={handleSaveAndExit}
          >
            Save & Exit
          </button>
        </div>
      </div>

      {/* Main editor area */}
      <div className="main-layout">
        
        {/* Left Side: Blocks / Code editor / Live Preview */}
        <div>
          <div className="tabs-header">
            <div className="tabs-toggle">
              <button 
                type="button" 
                className={`tab-btn ${activeMainTab === "edit" ? "active" : ""}`}
                onClick={() => setActiveMainTab("edit")}
              >
                Editor
              </button>
              <button 
                type="button" 
                className={`tab-btn ${activeMainTab === "preview" ? "active" : ""}`}
                onClick={() => setActiveMainTab("preview")}
              >
                Live Preview Tab
              </button>
            </div>
            
            {activeMainTab === "edit" && (
              <div style={{ display: "flex", gap: "0.25rem", background: "#f1f5f9", padding: "0.2rem", borderRadius: "6px" }}>
                <button
                  type="button"
                  style={{
                    border: "none", background: editorMode === "visual" ? "white" : "none",
                    padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "0.8rem", fontWeight: "bold", cursor: "pointer"
                  }}
                  onClick={() => handleModeChange("visual")}
                >
                  Visual Blocks
                </button>
                <button
                  type="button"
                  style={{
                    border: "none", background: editorMode === "code" ? "white" : "none",
                    padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "0.8rem", fontWeight: "bold", cursor: "pointer"
                  }}
                  onClick={() => handleModeChange("code")}
                >
                  HTML Code
                </button>
              </div>
            )}
          </div>

          {activeMainTab === "edit" ? (
            <div className="editor-section">
              {/* Common Metadata Fields */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                <div className="input-group">
                  <label>Article Title *</label>
                  <input 
                    type="text" 
                    className="text-input" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Enter article title..."
                  />
                </div>
                <div className="input-group">
                  <label>URL Slug *</label>
                  <input 
                    type="text" 
                    className="text-input" 
                    value={slug} 
                    onChange={(e) => setSlug(e.target.value)} 
                    placeholder="article-url-slug"
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                <div className="input-group">
                  <label>Brand Selection</label>
                  <select 
                    className="text-input" 
                    value={brandId} 
                    onChange={(e) => setBrandId(e.target.value)}
                  >
                    <option value="">-- Uncategorized Brand --</option>
                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>
                <div className="input-group">
                  <label>Category Selection</label>
                  <select 
                    className="text-input" 
                    value={categoryId} 
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option value="">-- Uncategorized Category --</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="input-group">
                  <label>Author</label>
                  <select 
                    className="text-input" 
                    value={authorId} 
                    onChange={(e) => setAuthorId(e.target.value)}
                  >
                    <option value="">-- No Author Assigned --</option>
                    {authors.map((a) => (
                      <option key={a.id} value={a.id}>{a.name} ({a.role || "Expert"})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Editor Modes */}
              {editorMode === "visual" ? (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b", fontWeight: "600" }}>
                      Click on a text field to insert images/links at the caret position.
                    </p>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button type="button" className="btn btn-outline" style={{ padding: "0.3rem 0.6rem", fontSize: "0.8rem" }} onClick={() => addBlock("paragraph")}>+ Add Text Block</button>
                      <button type="button" className="btn btn-outline" style={{ padding: "0.3rem 0.6rem", fontSize: "0.8rem" }} onClick={() => addBlock("heading", 2)}>+ Add Heading H2</button>
                      <button type="button" className="btn btn-outline" style={{ padding: "0.3rem 0.6rem", fontSize: "0.8rem" }} onClick={() => addBlock("image")}>+ Add Image Block</button>
                    </div>
                  </div>

                  {blocks.map((block, idx) => (
                    <div key={block.id}>
                      {/* Inter-block insert divider */}
                      {idx > 0 && (
                        <div className="block-insert-divider">
                          <div className="block-insert-line" />
                          <div className="block-insert-btn-group">
                            <button type="button" className="block-insert-mini-btn" onClick={() => addBlock("paragraph", undefined, blocks[idx-1].id)}>+ Paragraph</button>
                            <button type="button" className="block-insert-mini-btn" onClick={() => addBlock("heading", 2, blocks[idx-1].id)}>+ H2</button>
                            <button type="button" className="block-insert-mini-btn" onClick={() => addBlock("image", undefined, blocks[idx-1].id)}>+ Image</button>
                          </div>
                          <div className="block-insert-line" />
                        </div>
                      )}

                      <div className={`block-card ${activeBlockId === block.id ? "active" : ""}`} onClick={() => setActiveBlockId(block.id)}>
                        <div className="block-card-header">
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span className="block-type-badge">{block.type}</span>
                            {block.type === "heading" && (
                              <select
                                className="heading-select"
                                value={block.headingLevel || 2}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value);
                                  setBlocks(blocks.map(b => b.id === block.id ? { ...b, headingLevel: val } : b));
                                }}
                              >
                                <option value={2}>Heading H2</option>
                                <option value={3}>Heading H3</option>
                                <option value={4}>Heading H4</option>
                              </select>
                            )}
                          </div>
                          
                          <div className="block-controls">
                            <button type="button" className="block-btn" disabled={idx === 0} onClick={(e) => { e.stopPropagation(); moveBlock(idx, "up"); }}>▲</button>
                            <button type="button" className="block-btn" disabled={idx === blocks.length - 1} onClick={(e) => { e.stopPropagation(); moveBlock(idx, "down"); }}>▼</button>
                            <button type="button" className="block-btn block-btn-danger" onClick={(e) => { e.stopPropagation(); deleteBlock(block.id); }}>Delete</button>
                          </div>
                        </div>

                        <div className="block-content">
                          {block.type === "paragraph" || block.type === "heading" ? (
                            <textarea
                              ref={(el) => { textareaRefs.current[block.id] = el; }}
                              className="block-textarea"
                              value={block.text}
                              onChange={(e) => {
                                const val = e.target.value;
                                setBlocks(blocks.map(b => b.id === block.id ? { ...b, text: val } : b));
                              }}
                              onBlur={(e) => handleTextareaBlur(block.id, e)}
                              placeholder={block.type === "heading" ? "Heading text..." : "Start writing content here..."}
                              onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = "auto";
                                target.style.height = target.scrollHeight + "px";
                              }}
                              style={{ height: "auto" }}
                            />
                          ) : block.type === "image" && block.imageAttrs ? (
                            <div className="image-block-preview-card">
                              {block.imageAttrs.src ? (
                                <div style={{ display: "flex", gap: "1rem" }}>
                                  <img 
                                    src={block.imageAttrs.src} 
                                    alt={block.imageAttrs.alt || "Block Preview"} 
                                    className="image-block-preview-img"
                                  />
                                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                    <div className="input-group" style={{ marginBottom: "0.4rem" }}>
                                      <label style={{ fontSize: "0.75rem" }}>Alt Text (required for SEO)</label>
                                      <input 
                                        type="text" 
                                        className="text-input" 
                                        style={{ padding: "0.3rem", fontSize: "0.85rem" }}
                                        value={block.imageAttrs.alt}
                                        onChange={(e) => {
                                          const val = e.target.value;
                                          setBlocks(blocks.map(b => b.id === block.id ? {
                                            ...b,
                                            imageAttrs: { ...(b.imageAttrs || { src: "", alt: "", caption: "", align: "center", width: "100%" }), alt: val }
                                          } : b));
                                        }}
                                        placeholder="SEO description..."
                                      />
                                    </div>
                                    <div className="input-group" style={{ marginBottom: "0.4rem" }}>
                                      <label style={{ fontSize: "0.75rem" }}>Caption Text</label>
                                      <input 
                                        type="text" 
                                        className="text-input" 
                                        style={{ padding: "0.3rem", fontSize: "0.85rem" }}
                                        value={block.imageAttrs.caption}
                                        onChange={(e) => {
                                          const val = e.target.value;
                                          setBlocks(blocks.map(b => b.id === block.id ? {
                                            ...b,
                                            imageAttrs: { ...(b.imageAttrs || { src: "", alt: "", caption: "", align: "center", width: "100%" }), caption: val }
                                          } : b));
                                        }}
                                        placeholder="Caption displayed below image..."
                                      />
                                    </div>
                                    
                                    <div style={{ display: "flex", gap: "0.5rem" }}>
                                      <div style={{ flex: 1 }}>
                                        <label style={{ fontSize: "0.7rem", fontWeight: "bold", color: "#64748b" }}>Align</label>
                                        <select
                                          className="text-input"
                                          style={{ padding: "0.2rem", fontSize: "0.8rem", height: "auto" }}
                                          value={block.imageAttrs.align}
                                          onChange={(e) => {
                                            const val = e.target.value as any;
                                            setBlocks(blocks.map(b => b.id === block.id ? {
                                              ...b,
                                              imageAttrs: { ...(b.imageAttrs || { src: "", alt: "", caption: "", align: "center", width: "100%" }), align: val }
                                            } : b));
                                          }}
                                        >
                                          <option value="left">Left</option>
                                          <option value="center">Center</option>
                                          <option value="right">Right</option>
                                        </select>
                                      </div>
                                      
                                      <div style={{ flex: 1 }}>
                                        <label style={{ fontSize: "0.7rem", fontWeight: "bold", color: "#64748b" }}>Width</label>
                                        <select
                                          className="text-input"
                                          style={{ padding: "0.2rem", fontSize: "0.8rem", height: "auto" }}
                                          value={block.imageAttrs.width}
                                          onChange={(e) => {
                                            const val = e.target.value;
                                            setBlocks(blocks.map(b => b.id === block.id ? {
                                              ...b,
                                              imageAttrs: { ...(b.imageAttrs || { src: "", alt: "", caption: "", align: "center", width: "100%" }), width: val }
                                            } : b));
                                          }}
                                        >
                                          <option value="50%">50%</option>
                                          <option value="75%">75%</option>
                                          <option value="100%">100%</option>
                                        </select>
                                      </div>
                                    </div>

                                    <button
                                      type="button"
                                      className="btn btn-outline"
                                      style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem", alignSelf: "flex-start", marginTop: "0.5rem" }}
                                      onClick={() => {
                                        setBlocks(blocks.map(b => b.id === block.id ? {
                                          ...b,
                                          imageAttrs: { src: "", alt: "", caption: "", align: "center", width: "100%" }
                                        } : b));
                                      }}
                                    >
                                      Remove Photo
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="image-block-uploader">
                                  <p style={{ margin: "0 0 0.5rem", fontSize: "0.85rem", color: "#64748b" }}>Upload image block content:</p>
                                  <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", alignItems: "center" }}>
                                    <input 
                                      type="file" 
                                      accept="image/*" 
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) handleBlockImageUpload(block.id, file);
                                      }}
                                    />
                                    <span style={{ fontSize: "0.8rem", color: "#64748b" }}>or URL:</span>
                                    <input 
                                      type="text" 
                                      placeholder="https://image-url..." 
                                      className="text-input" 
                                      style={{ width: "200px", padding: "0.25rem" }}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          const val = (e.target as HTMLInputElement).value;
                                          setBlocks(blocks.map(b => b.id === block.id ? {
                                            ...b,
                                            imageAttrs: { src: val, alt: "", caption: "", align: "center", width: "100%" }
                                          } : b));
                                        }
                                      }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div>
                              <label style={{ fontSize: "0.75rem", fontWeight: "bold" }}>Raw HTML Code</label>
                              <textarea
                                className="block-textarea"
                                style={{ fontFamily: "monospace", fontSize: "0.85rem" }}
                                value={block.html}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setBlocks(blocks.map(b => b.id === block.id ? { ...b, html: val } : b));
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    type="button" 
                    className="btn btn-outline" 
                    style={{ width: "100%", borderStyle: "dashed", marginTop: "1rem" }}
                    onClick={() => addBlock("paragraph")}
                  >
                    + Add New Block
                  </button>
                </div>
              ) : (
                <div>
                  <div className="input-group">
                    <label>Article Content HTML Body</label>
                    <textarea
                      ref={mainTextareaRef}
                      className="text-input"
                      style={{ fontFamily: "monospace", fontSize: "0.9rem", minHeight: "500px" }}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      onBlur={handleMainTextareaBlur}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Live Preview Layout Rendering Pane */
            <div className="preview-pane">
              <div className="preview-breadcrumbs">
                Home &gt; {brands.find(b => b.id === brandId)?.name || "Uncategorized"} &gt; {categories.find(c => c.id === categoryId)?.name || "Uncategorized"}
              </div>
              
              <h1 className="preview-title">{title || "Untitled Article"}</h1>
              
              <div className="preview-meta-row">
                <span>By <strong>{authors.find(a => a.id === authorId)?.name || "Technical Expert"}</strong></span>
                <span>Published: {new Date().toLocaleDateString()}</span>
                <span>Reading Time: <strong>{Math.ceil(wordCount / 200)} min read</strong> ({wordCount} words)</span>
              </div>

              {featuredImage && (
                <div style={{ margin: "0 0 2rem", textAlign: "center" }}>
                  <img 
                    src={featuredImage} 
                    alt={featuredImageAlt || "Featured banner"} 
                    title={featuredImageTitle}
                    style={{ maxWidth: "100%", maxHeight: "400px", objectFit: "contain", borderRadius: "8px" }}
                  />
                  {featuredImageCaption && (
                    <figcaption style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "0.5rem" }}>
                      {featuredImageCaption}
                    </figcaption>
                  )}
                </div>
              )}

              {tocHeadings.length > 0 && (
                <div className="preview-toc">
                  <div className="preview-toc-title">Table of Contents</div>
                  <ol className="preview-toc-list">
                    {tocHeadings.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ol>
                </div>
              )}

              {featuredSnippet && (
                <div className="preview-snippet">
                  <div className="preview-snippet-title">Featured Snippet Summary</div>
                  <p style={{ margin: 0, fontSize: "0.95rem", color: "#1e3a8a", fontStyle: "italic" }}>
                    {featuredSnippet}
                  </p>
                </div>
              )}

              <div 
                className="preview-body"
                dangerouslySetInnerHTML={{ 
                  __html: editorMode === "visual" ? serializeBlocksToHtml(blocks) : content 
                }} 
              />

              {faqsList.length > 0 && (
                <div className="preview-faqs">
                  <h3 className="preview-faqs-title">Frequently Asked Questions</h3>
                  {faqsList.map((faq) => (
                    <div className="preview-faq-item" key={faq.id}>
                      <div className="preview-faq-q">
                        <span>{faq.question}</span>
                        <span>▼</span>
                      </div>
                      <div className="preview-faq-a">{faq.answer}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Tabbed panel (SEO checklist, Revisions, FAQs, Link Assistant) */}
        <div className="sidebar-section">
          
          <div className="sidebar-tabs">
            <button 
              type="button" 
              className={`sidebar-tab-btn ${activeSidebarTab === "seo" ? "active" : ""}`}
              onClick={() => setActiveSidebarTab("seo")}
            >
              SEO Checker
            </button>
            <button 
              type="button" 
              className={`sidebar-tab-btn ${activeSidebarTab === "faqs" ? "active" : ""}`}
              onClick={() => setActiveSidebarTab("faqs")}
            >
              FAQs
            </button>
            <button 
              type="button" 
              className={`sidebar-tab-btn ${activeSidebarTab === "links" ? "active" : ""}`}
              onClick={() => setActiveSidebarTab("links")}
            >
              Links
            </button>
            <button 
              type="button" 
              className={`sidebar-tab-btn ${activeSidebarTab === "images" ? "active" : ""}`}
              onClick={() => setActiveSidebarTab("images")}
            >
              Images
            </button>
            <button 
              type="button" 
              className={`sidebar-tab-btn ${activeSidebarTab === "history" ? "active" : ""}`}
              onClick={() => setActiveSidebarTab("history")}
            >
              Revisions
            </button>
          </div>

          <div className="sidebar-panel">
            
            {/* SEO Health Checker tab */}
            {activeSidebarTab === "seo" && (
              <div>
                <h3 style={{ margin: "0 0 1rem", fontSize: "1rem" }}>SEO Health Checker</h3>
                
                <div className="seo-score-widget">
                  <div className={`seo-score-circle ${
                    seoHealth.score >= 80 ? "score-good" :
                    seoHealth.score >= 50 ? "score-warn" : "score-poor"
                  }`}>
                    {seoHealth.score}%
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: "0.9rem" }}>SEO Score</h4>
                    <p style={{ margin: 0, fontSize: "0.75rem", color: "#64748b" }}>
                      Target at least 80% before publishing
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem", marginBottom: "1.5rem" }}>
                  {seoHealth.checks.map((check) => (
                    <div className="checklist-item" key={check.id}>
                      <span className={`checklist-status ${check.passed ? "passed" : "failed"}`}>
                        {check.passed ? "✓" : "○"}
                      </span>
                      <div>
                        <div style={{ fontWeight: check.passed ? "500" : "normal" }}>{check.label}</div>
                        <span style={{ fontSize: "0.75rem", color: check.passed ? "#10b981" : "#94a3b8" }}>
                          Current: {check.current}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional SEO Fields */}
                <h4 style={{ fontSize: "0.85rem", borderTop: "1px solid #e2e8f0", paddingTop: "1rem", margin: "1rem 0 0.5rem" }}>
                  SEO Metadata Overrides
                </h4>

                <div className="input-group">
                  <label>SEO Meta Title (Title Tag)</label>
                  <input 
                    type="text" 
                    className="text-input" 
                    value={seoTitle} 
                    onChange={(e) => setSeoTitle(e.target.value)} 
                    placeholder="Custom SEO Title..."
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "#64748b", marginTop: "0.2rem" }}>
                    <span>Ideal: 40-60 chars</span>
                    <span style={{ color: seoTitle.length >= 40 && seoTitle.length <= 60 ? "#10b981" : "#64748b" }}>
                      {seoTitle.length} chars
                    </span>
                  </div>
                </div>

                <div className="input-group">
                  <label>Meta Description</label>
                  <textarea 
                    className="text-input" 
                    style={{ fontSize: "0.85rem", minHeight: "60px" }}
                    value={metaDescription} 
                    onChange={(e) => setMetaDescription(e.target.value)} 
                    placeholder="Search results description snippet..."
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "#64748b", marginTop: "0.2rem" }}>
                    <span>Ideal: 120-160 chars</span>
                    <span style={{ color: metaDescription.length >= 120 && metaDescription.length <= 160 ? "#10b981" : "#64748b" }}>
                      {metaDescription.length} chars
                    </span>
                  </div>
                </div>

                <div className="input-group">
                  <label>Canonical URL</label>
                  <input 
                    type="text" 
                    className="text-input" 
                    value={canonicalUrl} 
                    onChange={(e) => setCanonicalUrl(e.target.value)} 
                    placeholder="https://example.com/canonical-source"
                  />
                </div>

                <div className="input-group">
                  <label>Featured Snippet Box Content</label>
                  <textarea 
                    className="text-input" 
                    style={{ fontSize: "0.85rem", minHeight: "60px" }}
                    value={featuredSnippet} 
                    onChange={(e) => setFeaturedSnippet(e.target.value)} 
                    placeholder="Summary sentence answering query immediately..."
                  />
                </div>

                <div className="input-group">
                  <label>Snippet Excerpt</label>
                  <textarea 
                    className="text-input" 
                    style={{ fontSize: "0.85rem", minHeight: "60px" }}
                    value={excerpt} 
                    onChange={(e) => setExcerpt(e.target.value)} 
                    placeholder="Short description for archive lists..."
                  />
                </div>
              </div>
            )}

            {/* FAQs Accordion Manager tab */}
            {activeSidebarTab === "faqs" && (
              <div>
                <h3 style={{ margin: "0 0 1rem", fontSize: "1rem" }}>FAQ Accordion Schema Manager</h3>
                
                {/* List FAQs */}
                <div style={{ marginBottom: "1.5rem" }}>
                  {faqsList.length === 0 ? (
                    <p style={{ fontStyle: "italic", fontSize: "0.8rem", color: "#64748b" }}>
                      No FAQs added to this article yet.
                    </p>
                  ) : (
                    faqsList.map((faq, idx) => (
                      <div className="faq-item-card" key={faq.id}>
                        {editingFaqId === faq.id ? (
                          <div>
                            <input 
                              type="text" 
                              className="text-input" 
                              style={{ marginBottom: "0.5rem", fontSize: "0.85rem", padding: "0.3rem" }} 
                              value={editingFaqQuestion}
                              onChange={(e) => setEditingFaqQuestion(e.target.value)}
                            />
                            <textarea 
                              className="text-input" 
                              style={{ marginBottom: "0.5rem", fontSize: "0.8rem", padding: "0.3rem", minHeight: "50px" }}
                              value={editingFaqAnswer}
                              onChange={(e) => setEditingFaqAnswer(e.target.value)}
                            />
                            <div style={{ display: "flex", gap: "0.25rem" }}>
                              <button type="button" className="btn btn-primary" style={{ padding: "0.2rem 0.5rem", fontSize: "0.75rem" }} onClick={handleSaveEditFaq}>Save</button>
                              <button type="button" className="btn btn-outline" style={{ padding: "0.2rem 0.5rem", fontSize: "0.75rem" }} onClick={() => setEditingFaqId(null)}>Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="faq-item-header">
                              <span className="faq-item-title">Q: {faq.question}</span>
                              <div style={{ display: "flex", gap: "0.2rem" }}>
                                <button type="button" style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.75rem" }} disabled={idx === 0} onClick={() => moveFaq(idx, "up")}>▲</button>
                                <button type="button" style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.75rem" }} disabled={idx === faqsList.length - 1} onClick={() => moveFaq(idx, "down")}>▼</button>
                                <button type="button" style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.75rem", color: "#3b82f6" }} onClick={() => startEditFaq(faq)}>Edit</button>
                                <button type="button" style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.75rem", color: "#ef4444" }} onClick={() => handleDeleteFaq(faq.id)}>✕</button>
                              </div>
                            </div>
                            <div className="faq-item-ans">A: {faq.answer}</div>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Add FAQ form */}
                <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "1rem" }}>
                  <h4 style={{ margin: "0 0 0.5rem", fontSize: "0.85rem" }}>Add New FAQ Question</h4>
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="text-input" 
                      placeholder="e.g. How do I clear red light error?" 
                      value={newFaqQuestion}
                      onChange={(e) => setNewFaqQuestion(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <textarea 
                      className="text-input" 
                      placeholder="e.g. Open the cover, remove jammed paper..." 
                      style={{ minHeight: "60px", fontSize: "0.85rem" }}
                      value={newFaqAnswer}
                      onChange={(e) => setNewFaqAnswer(e.target.value)}
                    />
                  </div>
                  <button type="button" className="btn btn-primary" style={{ width: "100%" }} onClick={handleAddFaq}>
                    + Insert FAQ Section
                  </button>
                </div>
              </div>
            )}

            {/* Link Assistant tab */}
            {activeSidebarTab === "links" && (
              <div>
                <h3 style={{ margin: "0 0 0.5rem", fontSize: "1rem" }}>Internal Link Assistant</h3>
                <p style={{ margin: "0 0 1rem", fontSize: "0.75rem", color: "#64748b" }}>
                  Click an article to insert a hyperlink at your cursor caret position in the block editor.
                </p>

                <div className="input-group">
                  <input 
                    type="text" 
                    className="text-input" 
                    placeholder="Search articles title or slug..." 
                    value={linkSearch}
                    onChange={(e) => setLinkSearch(e.target.value)}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", maxHeight: "400px", overflowY: "auto" }}>
                  {filteredArticles.length === 0 ? (
                    <p style={{ fontStyle: "italic", fontSize: "0.8rem", color: "#64748b" }}>
                      No matching articles found.
                    </p>
                  ) : (
                    filteredArticles.map((art) => (
                      <div 
                        className="link-list-item" 
                        key={art.id}
                        onClick={() => handleInsertLink(art)}
                      >
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem", width: "85%" }}>
                          <span style={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{art.title}</span>
                          <span style={{ fontSize: "0.7rem", color: "#64748b" }}>/{art.brand?.slug || "uncategorized"}/{art.category?.slug || "uncategorized"}/{art.slug}</span>
                        </div>
                        <span style={{ color: "#3b82f6", fontWeight: "bold" }}>+</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Images tab */}
            {activeSidebarTab === "images" && (
              <div>
                <h3 style={{ margin: "0 0 0.5rem", fontSize: "1rem" }}>Article Images</h3>
                <p style={{ margin: "0 0 1rem", fontSize: "0.75rem", color: "#64748b" }}>
                  Upload and manage images for this article.
                </p>

                {/* Upload Section */}
                <div className="image-block-uploader" style={{ padding: "1.25rem", borderStyle: "dashed", marginBottom: "1.5rem" }}>
                  <p style={{ margin: "0 0 0.5rem", fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>
                    Upload Images
                  </p>
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={(e) => {
                      handleSidebarImagesUpload(e.target.files);
                      e.target.value = "";
                    }}
                    style={{ fontSize: "0.8rem", width: "100%" }}
                  />
                  <p style={{ margin: "0.5rem 0 0", fontSize: "0.7rem", color: "#94a3b8" }}>
                    Select one or multiple files. Images will be compressed client-side.
                  </p>
                </div>

                {/* Uploaded Images List */}
                <h4 style={{ margin: "0 0 0.5rem", fontSize: "0.85rem", borderTop: "1px solid #e2e8f0", paddingTop: "1rem" }}>
                  Uploaded Images ({uploadedImages.length})
                </h4>
                
                <div className="image-library-grid" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {uploadedImages.length === 0 ? (
                    <p style={{ fontStyle: "italic", fontSize: "0.8rem", color: "#64748b" }}>
                      No images uploaded for this article yet.
                    </p>
                  ) : (
                    uploadedImages.map((img) => {
                      const isFeatured = featuredImage === img.src;
                      return (
                        <div 
                          className="image-library-card" 
                          key={img.id}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.75rem",
                            border: isFeatured ? "1.5px solid #3b82f6" : "1px solid #e2e8f0",
                            borderRadius: "6px",
                            padding: "0.75rem",
                            background: isFeatured ? "#f0f7ff" : "#f8fafc"
                          }}
                        >
                          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                            <img 
                              src={img.src} 
                              alt={img.alt || "thumbnail"} 
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "cover",
                                borderRadius: "4px",
                                border: "1px solid #cbd5e1"
                              }}
                            />
                            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                              <span 
                                style={{ 
                                  fontSize: "0.8rem", 
                                  fontWeight: 600, 
                                  overflow: "hidden", 
                                  textOverflow: "ellipsis", 
                                  whiteSpace: "nowrap",
                                  display: "block" 
                                }} 
                                title={img.name}
                              >
                                {img.name}
                              </span>
                              
                              <input 
                                type="text"
                                className="text-input"
                                placeholder="Alt Text (SEO)..."
                                style={{ padding: "0.25rem 0.4rem", fontSize: "0.75rem", height: "auto" }}
                                value={img.alt}
                                onChange={(e) => handleUpdateImageMeta(img.id, "alt", e.target.value)}
                              />
                              
                              <input 
                                type="text"
                                className="text-input"
                                placeholder="Caption..."
                                style={{ padding: "0.25rem 0.4rem", fontSize: "0.75rem", height: "auto" }}
                                value={img.caption}
                                onChange={(e) => handleUpdateImageMeta(img.id, "caption", e.target.value)}
                              />
                            </div>
                          </div>

                          <div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
                            <button
                              type="button"
                              className="image-library-btn"
                              style={{ flex: 1, minWidth: "100px" }}
                              onClick={() => handleInsertImageToArticle(img)}
                            >
                              Insert into Article
                            </button>
                            
                            {isFeatured ? (
                              <span 
                                style={{ 
                                  flex: 1, 
                                  minWidth: "90px", 
                                  textAlign: "center", 
                                  fontSize: "0.7rem", 
                                  fontWeight: "bold",
                                  color: "#3b82f6", 
                                  background: "#dbeafe", 
                                  padding: "0.15rem 0.35rem", 
                                  borderRadius: "4px",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center"
                                }}
                              >
                                ⭐ Featured
                              </span>
                            ) : (
                              <button
                                type="button"
                                className="image-library-btn"
                                style={{ flex: 1, minWidth: "90px" }}
                                onClick={() => handleSetAsFeatured(img)}
                              >
                                Set as Featured
                              </button>
                            )}
                            
                            <button
                              type="button"
                              className="image-library-btn image-library-btn-danger"
                              style={{ flex: "0 0 auto" }}
                              onClick={() => handleDeleteUploadedImage(img.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* Revision History panel tab */}
            {activeSidebarTab === "history" && (
              <div>
                <h3 style={{ margin: "0 0 1rem", fontSize: "1rem" }}>Revision History Rollback</h3>
                
                {revisions.length === 0 ? (
                  <p style={{ fontStyle: "italic", fontSize: "0.8rem", color: "#64748b" }}>
                    No prior saved revisions found for this article.
                  </p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {revisions.map((rev) => (
                      <div className="revision-row" key={rev.id}>
                        <div className="revision-meta">
                          <span style={{ fontWeight: "bold" }}>Revision #{rev.version}</span>
                          <span style={{ color: "#64748b", fontSize: "0.7rem" }}>
                            {new Date(rev.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <button
                          type="button"
                          className="btn btn-outline"
                          style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}
                          onClick={() => handleRollback(rev)}
                        >
                          Rollback
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

