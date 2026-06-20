import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  // Get total count of brands
  const totalBrandsCount = await prisma.brand.count();

  // Fetch only the first 9 brands for homepage display
  const brands = await prisma.brand.findMany({
    orderBy: { name: 'asc' },
    take: 9
  });

  // Fetch categories
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
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

  const categoryDescriptions: Record<string, string> = {
    "Connectivity Issues": "Resolve Wi-Fi, network, offline printer, and connection-related problems to restore seamless communication between your printer and devices.",
    "Printing Problems": "Get solutions for print failures, incomplete print jobs, slow printing, and other document output issues.",
    "Paper Handling Issues": "Find fixes for paper jams, feeding errors, paper detection problems, and other paper-related concerns.",
    "Ink & Toner Issues": "Learn how to troubleshoot cartridge recognition, low ink warnings, toner errors, and replacement guidance.",
    "Print Quality Issues": "Improve print results by resolving faded prints, streaks, color inconsistencies, blurry text, and image quality issues.",
    "Scanning Issues": "Troubleshoot scanning failures, scan quality problems, document feeder issues, and scan destination errors.",
    "Drivers, Software & Firmware": "Access guidance for driver installation, software configuration, compatibility issues, and firmware updates.",
    "Mobile & Cloud Printing": "Set up and troubleshoot printing from smartphones, tablets, cloud services, and mobile applications.",
    "Error Codes & Alerts": "Quickly identify printer error messages, warning lights, and diagnostic codes with step-by-step solutions.",
    "Hardware & Maintenance": "Maintain printer performance with troubleshooting for hardware failures, cleaning procedures, and routine maintenance.",
    "Setup & Installation": "Get assistance with initial printer setup, configuration, device registration, and first-time installation."
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
        <div className="section-title-container" style={{ alignItems: 'center' }}>
          <div>
            <h2 className="section-title">Browse by Brand</h2>
            <p className="section-desc">Select your printer manufacturer to find specific solutions.</p>
          </div>
          <div style={{ background: 'rgba(79, 70, 229, 0.08)', color: 'var(--primary-color)', padding: '0.4rem 1rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 'bold' }}>
            {totalBrandsCount} Brands Supported
          </div>
        </div>
        <div className="brand-grid">
          {brands.map(brand => (
            <Link href={`/brand/${brand.slug}`} key={brand.id}>
              <div className="card" style={{ padding: '1.25rem 1.5rem' }}>
                <div className="card-emoji" style={{ width: '40px', height: '40px', fontSize: '1.35rem', borderRadius: 'var(--radius-sm)' }}>
                  {getBrandEmoji(brand.name)}
                </div>
                <div className="card-info">
                  <h3 className="card-title" style={{ fontSize: '1.05rem', margin: 0 }}>{brand.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {totalBrandsCount > 9 && (
          <div style={{ textAlign: 'center', marginTop: '-2rem', marginBottom: '2rem' }}>
            <Link href="/brands" className="view-all-link" style={{ display: 'inline-flex', background: 'white', border: '1px solid var(--border-color)', padding: '0.75rem 2rem', borderRadius: 'var(--radius-md)', transition: 'all var(--transition-fast)' }}>
              View All {totalBrandsCount} Brands ➔
            </Link>
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section style={{ marginBottom: '4rem' }}>
        <div className="section-title-container">
          <div>
            <h2 className="section-title">Common Topics & Categories</h2>
            <p className="section-desc">Explore help guides grouped by typical printer issues.</p>
          </div>
        </div>
        <div className="category-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
          {categories.map(category => (
            <Link href={`/search?q=${encodeURIComponent(category.name)}`} key={category.id}>
              <div className="card category-card" style={{ height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className="card-emoji" style={{ width: '44px', height: '44px', fontSize: '1.4rem' }}>{getCategoryEmoji(category.name)}</div>
                  <h3 className="card-title" style={{ margin: 0 }}>{category.name}</h3>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem', lineHeight: '1.5' }}>
                  {categoryDescriptions[category.name] || "Find solutions, error guides, and setup steps for this topic."}
                </p>
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
