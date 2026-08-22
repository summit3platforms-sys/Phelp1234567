// Sitemap utilities — shared across all sitemap route handlers
// UTF-8, sitemaps.org compliant, with optional Google Image Sitemap extension

export const BASE_URL = 'https://libertyprinterfix.com';
export const CHUNK_SIZE = 5000; // max URLs per sitemap file

// ---------------------------------------------------------------------------
// XML helpers
// ---------------------------------------------------------------------------

/** Escape special XML characters so URLs are safe to embed in XML. */
export function escapeXml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Format a Date (or string) as ISO-8601 date (YYYY-MM-DD). */
export function toIso(date: Date | string): string {
  const d = date instanceof Date ? date : new Date(date);
  return d.toISOString().split('T')[0];
}

// ---------------------------------------------------------------------------
// URL entry builder — Google requires only <loc> and <lastmod> (+ optional <image:image>)
// ---------------------------------------------------------------------------

export interface SitemapUrl {
  loc: string;
  lastmod: Date | string;
  image?: {
    loc: string;
    title?: string;
  };
}

export function buildUrlEntry({ loc, lastmod, image }: SitemapUrl): string {
  let entry = `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${toIso(lastmod)}</lastmod>`;
  if (image && image.loc) {
    entry += `\n    <image:image>\n      <image:loc>${escapeXml(image.loc)}</image:loc>`;
    if (image.title) {
      entry += `\n      <image:title>${escapeXml(image.title)}</image:title>`;
    }
    entry += `\n    </image:image>`;
  }
  entry += `\n  </url>`;
  return entry;
}

// ---------------------------------------------------------------------------
// Sitemap document builders
// ---------------------------------------------------------------------------

/** Wraps URL entries in a <urlset> document with Google Image extension namespace. */
export function buildSitemapXml(urls: SitemapUrl[]): string {
  const entries = urls.map(buildUrlEntry).join('\n');
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
    entries +
    `\n</urlset>`
  );
}

// ---------------------------------------------------------------------------
// Sitemap index builder
// ---------------------------------------------------------------------------

export interface SitemapIndexEntry {
  loc: string;
  lastmod: Date | string;
}

/** Wraps sitemap <loc> entries in a <sitemapindex> document. */
export function buildSitemapIndexXml(entries: SitemapIndexEntry[]): string {
  const items = entries
    .map(
      ({ loc, lastmod }) =>
        `  <sitemap>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${toIso(lastmod)}</lastmod>\n  </sitemap>`
    )
    .join('\n');
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    items +
    `\n</sitemapindex>`
  );
}

// ---------------------------------------------------------------------------
// HTTP response helper
// ---------------------------------------------------------------------------

/** Wrap an XML string in a proper Response with correct headers. */
export function xmlResponse(xml: string): Response {
  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
