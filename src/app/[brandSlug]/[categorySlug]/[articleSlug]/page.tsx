import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

type PageParams = { params: Promise<{ brandSlug: string; categorySlug: string; articleSlug: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await prisma.article.findUnique({
    where: { slug: resolvedParams.articleSlug },
    include: { brand: true }
  });

  if (!article || article.brand.slug !== resolvedParams.brandSlug || article.status !== 'published') {
    return { title: 'Not Found' };
  }

  return {
    title: article.seoTitle || `${article.title} - ${article.brand.name} Support`,
    description: article.metaDescription || `Troubleshooting guide for ${article.title}.`,
  };
}

export default async function ArticlePage({ params }: PageParams) {
  const resolvedParams = await params;
  const article = await prisma.article.findUnique({
    where: { slug: resolvedParams.articleSlug },
    include: {
      brand: true,
      category: true,
    }
  });

  if (!article || article.brand.slug !== resolvedParams.brandSlug || article.category.slug !== resolvedParams.categorySlug || article.status !== 'published') {
    notFound();
  }

  // Schema.org JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://libertyprinterfix.com/" },
          { "@type": "ListItem", "position": 2, "name": article.brand.name, "item": `https://libertyprinterfix.com/brand/${article.brand.slug}/` },
          { "@type": "ListItem", "position": 3, "name": article.category.name, "item": `https://libertyprinterfix.com/brand/${article.brand.slug}/` },
          { "@type": "ListItem", "position": 4, "name": article.title, "item": `https://libertyprinterfix.com/${article.brand.slug}/${article.category.slug}/${article.slug}/` }
        ]
      },
      {
        "@type": "Article",
        "headline": article.title,
        "datePublished": article.publishedAt?.toISOString(),
        "dateModified": article.updatedAt.toISOString(),
        "author": {
          "@type": "Organization",
          "name": "LibertyPrinterFix"
        }
      }
    ]
  };

  return (
    <article style={{ background: '#fff', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        <Link href="/">Home</Link> &gt; 
        <Link href={`/brand/${article.brand.slug}`}> {article.brand.name}</Link> &gt; 
        <span> {article.category.name}</span>
      </nav>

      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{article.title}</h1>
        <div style={{ color: '#666', fontSize: '0.9rem', display: 'flex', gap: '1rem' }}>
          <span>Updated: {new Date(article.updatedAt).toLocaleDateString()}</span>
          {article.errorCode && <span>Error Code: <strong style={{ color: '#c2185b' }}>{article.errorCode}</strong></span>}
          {article.printerModel && <span>Model: <strong>{article.printerModel}</strong></span>}
        </div>
      </header>

      {article.featuredImage && (
        <div style={{ marginBottom: '2rem' }}>
          <img src={article.featuredImage} alt={article.title} style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
        </div>
      )}

      <div 
        className="article-content"
        dangerouslySetInnerHTML={{ __html: article.content }} 
        style={{ fontSize: '1.1rem', lineHeight: '1.8' }}
      />
    </article>
  );
}
