import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  // Fetch brands with active articles count
  const brands = await prisma.brand.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: { articles: { where: { status: 'published' } } }
      }
    }
  });

  // Fetch categories with active articles count
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: { articles: { where: { status: 'published' } } }
      }
    }
  });

  // Fetch recent articles
  const recentArticles = await prisma.article.findMany({
    where: { status: 'published' },
    orderBy: { publishedAt: 'desc' },
    take: 6,
    include: {
      brand: true,
      category: true
    }
  });

  // Emojis mapping
  const getBrandEmoji = (name: string): string => {
    const key = name.toLowerCase();
    if (key.includes('hp')) return '🖨️';
    if (key.includes('canon')) return '📷';
    if (key.includes('epson')) return '🎨';
    if (key.includes('brother')) return '🏢';
    if (key.includes('lexmark')) return '💼';
    if (key.includes('xerox')) return '⚡';
    if (key.includes('kodak')) return '🖼️';
    if (key.includes('polaroid')) return '📸';
    if (key.includes('fujifilm')) return '📷';
    if (key.includes('dymo') || key.includes('rollo') || key.includes('munbyn') || key.includes('nelko') || key.includes('phomemo') || key.includes('niimbot') || key.includes('bixolon')) return '🏷️';
    if (key.includes('zebra')) return '🦓';
    if (key.includes('star')) return '⭐';
    if (key.includes('citizen')) return '🏙️';
    if (key.includes('seiko')) return '⌚';
    if (key.includes('primera')) return '💿';
    if (key.includes('samsung')) return '📱';
    return '🖨️';
  };

  const getCategoryEmoji = (name: string): string => {
    const key = name.toLowerCase();
    if (key.includes('error') || key.includes('alert')) return '⚠️';
    if (key.includes('wifi') || key.includes('wireless') || key.includes('connect')) return '📶';
    if (key.includes('paper') || key.includes('jam')) return '📄';
    if (key.includes('driver') || key.includes('software') || key.includes('firmware')) return '⚙️';
    if (key.includes('ink') || key.includes('toner') || key.includes('cartridge')) return '💧';
    if (key.includes('quality')) return '🎨';
    if (key.includes('setup') || key.includes('install')) return '🔌';
    if (key.includes('scan')) return '🔍';
    if (key.includes('mobile') || key.includes('cloud')) return '☁️';
    if (key.includes('hardware') || key.includes('maintenance')) return '🔧';
    if (key.includes('print')) return '🖨️';
    return '🛠️';
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-badge">
          <span>✨</span> Smart Troubleshooting Database
        </div>
        <h1 className="hero-title">
          Solve Your <span>Printer Errors</span> in Seconds
        </h1>
        <p className="hero-subtitle">
          Access step-by-step troubleshooting guides, fix error codes, and get your printer back online.
        </p>

        {/* Hero Search Bar */}
        <form action="/search" method="GET" className="search-form">
          <div className="search-icon">🔍</div>
          <input 
            type="text" 
            name="q" 
            placeholder="Enter printer error code (e.g. 0x6100004a) or search keywords..." 
            className="search-input"
            required
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        {/* Quick Tags */}
        <div className="quick-tags">
          <span className="quick-tag-label">Popular Searches:</span>
          <Link href="/search?q=0x6100004a" className="quick-tag">HP 0x6100004a</Link>
          <Link href="/search?q=offline" className="quick-tag">Printer Offline</Link>
          <Link href="/search?q=jam" className="quick-tag">Paper Jam</Link>
          <Link href="/search?q=setup" className="quick-tag">Wi-Fi Setup</Link>
        </div>
      </section>

      {/* Brands Section */}
      <section style={{ marginBottom: '4rem' }}>
        <div className="section-title-container">
          <div>
            <h2 className="section-title">Browse by Brand</h2>
            <p className="section-desc">Select your printer manufacturer to find specific solutions.</p>
          </div>
        </div>
        <div className="brand-grid">
          {brands.map(brand => (
            <Link href={`/brand/${brand.slug}`} key={brand.id}>
              <div className="card">
                <div className="card-emoji">{getBrandEmoji(brand.name)}</div>
                <div className="card-info">
                  <h3 className="card-title">{brand.name} Printers</h3>
                  <p className="card-count">{brand._count.articles} troubleshooting guides</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ marginBottom: '4rem' }}>
        <div className="section-title-container">
          <div>
            <h2 className="section-title">Common Topics & Categories</h2>
            <p className="section-desc">Explore help guides grouped by typical printer issues.</p>
          </div>
        </div>
        <div className="category-grid">
          {categories.map(category => (
            <Link href={`/search?q=${encodeURIComponent(category.name)}`} key={category.id}>
              <div className="card category-card">
                <div className="card-emoji">{getCategoryEmoji(category.name)}</div>
                <div className="card-info">
                  <h3 className="card-title">{category.name}</h3>
                  <p className="card-count">{category._count.articles} guides available</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Articles Section */}
      <section className="articles-section">
        <div className="section-title-container" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem', marginBottom: '2rem' }}>
          <div>
            <h2 className="section-title">Recently Published Guides</h2>
            <p className="section-desc">Our latest solutions to newly reported error codes and printer problems.</p>
          </div>
          <Link href="/search?q=" className="view-all-link">
            All Articles ➔
          </Link>
        </div>

        <div className="articles-grid">
          {recentArticles.map(article => (
            <div key={article.id} className="article-item">
              <div>
                <div className="article-meta">
                  <span className="meta-badge badge-brand">{article.brand.name}</span>
                  <span className="meta-badge badge-category">{article.category.name}</span>
                  {article.errorCode && (
                    <span className="meta-badge badge-error">Code: {article.errorCode}</span>
                  )}
                </div>
                <Link href={`/${article.brand.slug}/${article.category.slug}/${article.slug}`} className="article-link">
                  {article.title}
                </Link>
                <p className="article-desc">
                  {article.metaDescription || article.content.substring(0, 120).replace(/<[^>]+>/g, '') + '...'}
                </p>
              </div>
              <div className="article-footer">
                <span className="article-date">
                  {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}
                </span>
                <Link href={`/${article.brand.slug}/${article.category.slug}/${article.slug}`} className="read-more">
                  Read Guide ➔
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
