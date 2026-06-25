import { prisma } from "@/lib/prisma";
import { notFound, permanentRedirect } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import LeadCaptureForm from "@/components/LeadCaptureForm";

type PageParams = { params: Promise<{ brandSlug: string; categorySlug: string; articleSlug: string }> };

// Helper function to dynamically add heading IDs and extract headings list for TOC
function addHeadingIdsAndExtractToc(html: string) {
  const toc: { text: string; id: string; level: number }[] = [];
  let idCounter = 1;
  
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/<[^>]*>/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const headingRegex = /<(h2|h3)([^>]*)>([\s\S]*?)<\/\1>/gi;
  
  const newHtml = html.replace(headingRegex, (match, tag, attrs, text) => {
    const cleanText = text.replace(/<[^>]*>/g, "").trim();
    let headingId = slugify(cleanText);
    if (!headingId) {
      headingId = `heading-${idCounter++}`;
    }
    
    toc.push({ text: cleanText, id: headingId, level: tag === "h2" ? 2 : 3 });
    
    if (attrs.includes('id=')) {
      return match;
    }
    return `<${tag}${attrs} id="${headingId}">${text}</${tag}>`;
  });
  
  return { newHtml, toc };
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await prisma.article.findUnique({
    where: { slug: resolvedParams.articleSlug },
    include: { brand: true, category: true }
  });

  const currentPath = `/${resolvedParams.brandSlug}/${resolvedParams.categorySlug}/${resolvedParams.articleSlug}`;

  // If article not found or wrong path slugs, check Redirect table first
  if (!article || article.brand?.slug !== resolvedParams.brandSlug || article.category?.slug !== resolvedParams.categorySlug || article.status !== 'published') {
    const redir = await prisma.redirect.findUnique({ where: { oldUrl: currentPath } });
    if (redir) {
      return { title: 'Redirecting...' };
    }
    return { title: 'Not Found' };
  }

  return {
    title: article.seoTitle || `${article.title} - ${article.brand?.name || "Support"}`,
    description: article.metaDescription || `Troubleshooting guide for ${article.title}.`,
    alternates: article.canonicalUrl ? { canonical: article.canonicalUrl } : undefined,
  };
}

export default async function ArticlePage({ params }: PageParams) {
  const resolvedParams = await params;
  const currentPath = `/${resolvedParams.brandSlug}/${resolvedParams.categorySlug}/${resolvedParams.articleSlug}`;

  const article = await prisma.article.findUnique({
    where: { slug: resolvedParams.articleSlug },
    include: {
      brand: true,
      category: true,
      author: true,
    }
  });

  // Redirect check if article not found or slugs mismatch
  if (!article || article.brand?.slug !== resolvedParams.brandSlug || article.category?.slug !== resolvedParams.categorySlug || article.status !== 'published') {
    const redir = await prisma.redirect.findUnique({ where: { oldUrl: currentPath } });
    if (redir) {
      permanentRedirect(redir.newUrl);
    }
    notFound();
  }

  // Fetch related articles (same brand, excluding current guide)
  const relatedArticles = await prisma.article.findMany({
    where: {
      brandId: article.brandId,
      status: 'published',
      NOT: { id: article.id }
    },
    orderBy: { publishedAt: 'desc' },
    take: 5,
    include: { category: true }
  });

  // Calculate dynamic reading time
  const wordCount = article.wordCount || 300;
  const readingTime = Math.ceil(wordCount / 200);

  // Add IDs to Headings and Extract TOC
  const { newHtml: processedContent, toc } = addHeadingIdsAndExtractToc(article.content);

  // FAQ parsing
  let faqsArray: { question: string; answer: string }[] = [];
  if (article.faqs) {
    try {
      faqsArray = JSON.parse(article.faqs);
    } catch (e) {
      faqsArray = [];
    }
  }

  // Schema.org JSON-LD Structured Data
  const jsonLdGraph: any[] = [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://libertyprinterfix.com/" },
        { "@type": "ListItem", "position": 2, "name": article.brand?.name || "Brand", "item": `https://libertyprinterfix.com/${article.brand?.slug || "uncategorized"}` },
        { "@type": "ListItem", "position": 3, "name": article.category?.name || "Category", "item": `https://libertyprinterfix.com/${article.brand?.slug || "uncategorized"}/${article.category?.slug || "uncategorized"}` },
        { "@type": "ListItem", "position": 4, "name": article.title, "item": `https://libertyprinterfix.com/${article.brand?.slug || "uncategorized"}/${article.category?.slug || "uncategorized"}/${article.slug}` }
      ]
    },
    {
      "@type": "Article",
      "headline": article.title,
      "description": article.metaDescription || article.excerpt,
      "image": article.featuredImage ? [article.featuredImage] : [],
      "datePublished": article.publishedAt?.toISOString(),
      "dateModified": article.updatedAt.toISOString(),
      "author": {
        "@type": "Person",
        "name": article.author?.name || "Technical Expert",
        "jobTitle": article.author?.role || "Printer Support Specialist"
      },
      "publisher": {
        "@type": "Organization",
        "name": "LibertyPrinterFix",
        "logo": {
          "@type": "ImageObject",
          "url": "https://libertyprinterfix.com/logo.png"
        }
      }
    }
  ];

  if (faqsArray.length > 0) {
    jsonLdGraph.push({
      "@type": "FAQPage",
      "mainEntity": faqsArray.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": jsonLdGraph
  };

  return (
    <div className="container page-top">
      {/* Dynamic styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .toc-container {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 1.25rem 1.5rem;
          margin-bottom: 2rem;
        }
        .toc-title {
          font-weight: 700;
          font-size: 1.1rem;
          margin: 0 0 0.75rem;
          color: #0f172a;
        }
        .toc-list {
          list-style-type: none;
          padding-left: 0;
          margin: 0;
        }
        .toc-item-l2 {
          margin-bottom: 0.5rem;
          font-weight: 600;
          font-size: 0.95rem;
        }
        .toc-item-l3 {
          margin-bottom: 0.4rem;
          padding-left: 1.25rem;
          font-size: 0.9rem;
          color: #64748b;
        }
        .toc-item-l2 a {
          color: var(--primary-color);
          text-decoration: none;
        }
        .toc-item-l2 a:hover {
          text-decoration: underline;
        }
        .toc-item-l3 a {
          color: #475569;
          text-decoration: none;
        }
        .toc-item-l3 a:hover {
          color: var(--primary-color);
          text-decoration: underline;
        }

        .featured-snippet-box {
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          border-left: 4px solid #2563eb;
          border-radius: 0 8px 8px 0;
          padding: 1.25rem 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
        .featured-snippet-title {
          font-weight: 800;
          font-size: 0.85rem;
          color: #1e40af;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.4rem;
        }
        .featured-snippet-text {
          font-size: 1rem;
          line-height: 1.6;
          color: #1e3a8a;
          margin: 0;
          font-style: italic;
        }

        .accordion-group {
          margin-top: 2.5rem;
          border-top: 1px solid #e2e8f0;
          padding-top: 2rem;
        }
        .accordion-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 1.5rem;
        }
        .faq-disclosure {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          margin-bottom: 0.75rem;
          background: white;
          overflow: hidden;
          transition: border-color 0.15s;
        }
        .faq-disclosure[open] {
          border-color: #cbd5e1;
        }
        .faq-summary {
          padding: 1rem 1.25rem;
          font-weight: 600;
          font-size: 1.05rem;
          color: #0f172a;
          cursor: pointer;
          user-select: none;
          background: #f8fafc;
          list-style: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .faq-summary::-webkit-details-marker {
          display: none;
        }
        .faq-summary::after {
          content: '▼';
          font-size: 0.75rem;
          color: #64748b;
          transition: transform 0.15s;
        }
        .faq-disclosure[open] .faq-summary::after {
          transform: rotate(180deg);
        }
        .faq-answer {
          padding: 1.25rem;
          font-size: 0.95rem;
          line-height: 1.6;
          color: #334155;
          border-top: 1px solid #e2e8f0;
          background: white;
        }
      ` }} />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        <Link href="/">Home</Link> &gt; 
        <Link href={`/${article.brand?.slug || "uncategorized"}`}> {article.brand?.name || "Brand"}</Link> &gt; 
        <Link href={`/${article.brand?.slug || "uncategorized"}/${article.category?.slug || "uncategorized"}`}> {article.category?.name || "Category"}</Link> &gt; 
        <span style={{ color: 'var(--text-muted)' }}> {article.title}</span>
      </nav>

      {/* WordPress-style Layout Grid */}
      <div className="article-layout-grid">
        {/* Main Column */}
        <div className="article-main-col">
          <article className="article-page-container" style={{ margin: 0 }}>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            
            <header style={{ marginBottom: '2rem' }}>
              <h1 className="article-page-title">{article.title}</h1>
              <div style={{ color: '#666', fontSize: '0.9rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                {article.author && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {article.author.image ? (
                      <img src={article.author.image} alt={article.author.name} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem', color: '#fff' }}>
                        {article.author.name.charAt(0)}
                      </div>
                    )}
                    <span>By <strong>{article.author.name}</strong></span>
                  </div>
                )}
                <span>Updated: {new Date(article.updatedAt).toLocaleDateString()}</span>
                <span>Reading Time: <strong>{readingTime} min read</strong></span>
                {article.errorCode && <span>Error Code: <strong style={{ color: '#c2185b' }}>{article.errorCode}</strong></span>}
                {article.printerModel && <span>Model: <strong>{article.printerModel}</strong></span>}
              </div>
            </header>

            {/* Featured Image display */}
            {article.featuredImage && (
              <div style={{ margin: '0 0 2rem 0', textAlign: 'center' }}>
                <img 
                  src={article.featuredImage} 
                  alt={article.featuredImageAlt || article.title} 
                  title={article.featuredImageTitle || undefined}
                  style={{ maxWidth: '100%', maxHeight: '420px', objectFit: 'contain', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                {article.featuredImageCaption && (
                  <figcaption style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem', textAlign: 'center' }}>
                    {article.featuredImageCaption}
                  </figcaption>
                )}
              </div>
            )}

            {/* Table of Contents Container */}
            {toc.length > 0 && (
              <div className="toc-container">
                <div className="toc-title">Table of Contents</div>
                <ul className="toc-list">
                  {toc.map((item, index) => (
                    <li key={index} className={`toc-item-l${item.level}`}>
                      <a href={`#${item.id}`}>{item.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Featured SEO Snippet Box */}
            {article.featuredSnippet && (
              <div className="featured-snippet-box">
                <div className="featured-snippet-title">Quick Answer Summary</div>
                <p className="featured-snippet-text">{article.featuredSnippet}</p>
              </div>
            )}

            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ __html: processedContent }} 
              style={{ fontSize: '1.1rem', lineHeight: '1.8' }}
            />

            {/* FAQ Accordion Section */}
            {faqsArray.length > 0 && (
              <div className="accordion-group">
                <h3 className="accordion-title">Frequently Asked Questions</h3>
                {faqsArray.map((faq, index) => (
                  <details className="faq-disclosure" name="faq-accordion" key={index}>
                    <summary className="faq-summary">
                      {faq.question}
                    </summary>
                    <div className="faq-answer">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            )}
          </article>

          {/* Author Biography Box below Article */}
          {article.author && (
            <div className="author-bio-card">
              <div className="author-bio-header">
                {article.author.image ? (
                  <img src={article.author.image} alt={article.author.name} className="author-avatar" />
                ) : (
                  <div className="author-avatar-fallback">
                    {article.author.name.charAt(0)}
                  </div>
                )}
                <div className="author-info">
                  <h4 className="author-name">{article.author.name}</h4>
                  <p className="author-role">{article.author.role}</p>
                </div>
              </div>
              {article.author.bio && <p className="author-bio-text">{article.author.bio}</p>}
            </div>
          )}
        </div>

        {/* Sidebar Column */}
        <aside className="article-sidebar-col">
          {/* Lead Capture Form Widget */}
          <div style={{ width: '100%' }}>
            <LeadCaptureForm />
          </div>

          {/* Related Guides Widget */}
          <div className="sidebar-widget">
            <h3 className="widget-title">Related Guides</h3>
            <ul className="widget-list">
              {relatedArticles.map(rel => (
                <li key={rel.id} className="widget-list-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.2rem' }}>
                  <Link href={`/${article.brand?.slug || "uncategorized"}/${rel.category?.slug || "uncategorized"}/${rel.slug}`} style={{ fontWeight: '600', lineHeight: '1.4' }}>
                    {rel.title}
                  </Link>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {rel.category?.name || "General"}
                  </span>
                </li>
              ))}
              {relatedArticles.length === 0 && (
                <li style={{ color: 'var(--text-muted)', fontSize: '0.9rem', padding: '0.5rem 0' }}>No other guides for {article.brand?.name || "this brand"}.</li>
              )}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
