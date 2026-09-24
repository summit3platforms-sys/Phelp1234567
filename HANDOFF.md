# Technical Handover: Article Sitemap Architecture & Reliability Fix

**Date**: 2026-09-24  
**Commit Target**: `main`  
**Site**: `https://libertyprinterfix.com`  

---

## 1. Summary of Changes (Sitemap Reliability)

- **Direct Article Sitemap (`/sitemap-articles.xml`)**:
  - Replaced the redirect/paginated approach with a direct, single `<urlset>` containing all 630 published, indexable articles.
  - Eliminated the 307 temporary redirect to `/sitemap-articles-1.xml`.
  - Configured `export const revalidate = 3600;` (ISR) for optimal edge caching without server load.
  - Excluded drafts, non-indexable articles, and any redirected URLs.
  - Each `<loc>` strictly matches the canonical URL formula `https://libertyprinterfix.com/{brand}/{category}/{slug}` (lowercase, no trailing slash, apex domain).
- **Sitemap Index (`/sitemap.xml`)**:
  - Lists the 4 child sitemaps directly: `sitemap-pages.xml`, `sitemap-brands.xml`, `sitemap-categories.xml`, and `sitemap-articles.xml` (no `-1` suffix).
  - Child sitemaps now report authentic `lastmod` timestamps based on real content updates rather than build/request time or raw DB write timestamps.
- **Brand Route Guard (`src/app/[brandSlug]/page.tsx`)**:
  - Added early guard `if (resolvedParams.brandSlug.includes('.')) notFound();` in both `generateMetadata` and `BrandPage` before any database query or redirect check.
- **Static Pages Sitemap (`/sitemap-pages.xml`)**:
  - Removed artificial `'2025-01-01'` placeholder dates for static pages (`/brands`, `/about`, `/contact`, `/privacy-policy`). Only real dates are reported (`homepage` uses newest published article date; others omit `<lastmod>`).
- **Brand & Category Sitemaps (`/sitemap-brands.xml`, `/sitemap-categories.xml`)**:
  - Calculated `lastmod` strictly from `getArticleEffectiveDates(article)` rather than raw Prisma `updatedAt` to avoid bulk deploy date inflation.
- **Removed Temporary Bridging & Cleaned Config**:
  - Removed temporary route `/api/sitemaps/articles/route.ts` and `src/lib/sitemap-articles.ts`.
  - Cleaned `next.config.ts` (removed rewrites).
  - *Note on why the earlier rewrite initially showed `x-matched-path: /[brandSlug]`*: The first curl was issued while Vercel's build was still queued/in-flight, serving the previous deployment; once Vercel completed deployment, the rewrite executed, but serving `/sitemap-articles.xml` directly eliminates rewrite overhead entirely.

---

## 2. Navigation Link Optimization (Eliminate `/search?q=` Links)

- **Homepage Hub Grid**:
  - Replaced the generic category cards linking to `/search?q=...` with the **top 12 brand×category hubs** by published article count.
  - Anchor text format: `"{Brand} {Category} ({n} guides)"` dynamically pulled from a live query (`_count: { id: 'desc' }`).
  - Section heading: `"Most-used troubleshooting hubs"`.
- **Homepage Quick Tags**:
  - Updated all 4 quick tags to point to specific canonical hubs matching their labels:
    - `"HP error codes"` → `/hp/error-codes-alerts`
    - `"HP printer offline"` → `/hp/connectivity-issues`
    - `"HP Wi-Fi setup"` → `/hp/setup-installation`
    - `"HP paper jams"` → `/hp/paper-handling-issues`
- **View All Link**:
  - Changed `"All Articles ➔"` linking to `/search?q=` to `"All brands ➔"` linking to `/brands`.
- **Footer Cleanup (Option B)**:
  - Removed the `"Common Topics"` footer column entirely to avoid linking to `/search?q=...` URLs.
  - Adjusted `.footer-grid` in `src/app/globals.css` to `grid-template-columns: 2fr 1fr 1fr;` for a balanced 3-column desktop layout.
  - Preserved utility link `"Search Guides"` pointing to `/search`.
- **Accessibility on Article Cards**:
  - Added `aria-label={article.title}` to thumbnail image links.
  - Added `aria-label={`Read guide: ${article.title}`}` to "Read Guide ➔" links.

---

## 3. Files Modified & Deleted

- `modified`: [`src/app/[brandSlug]/page.tsx`](file:///Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/src/app/[brandSlug]/page.tsx) (Brand guard)
- `modified`: [`src/app/sitemap.xml/route.ts`](file:///Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/src/app/sitemap.xml/route.ts) (Sitemap index & real lastmod)
- `modified`: [`src/app/sitemap-articles.xml/route.ts`](file:///Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/src/app/sitemap-articles.xml/route.ts) (Direct 630-article urlset, ISR)
- `modified`: [`src/app/sitemap-pages.xml/route.ts`](file:///Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/src/app/sitemap-pages.xml/route.ts) (Omit lastmod when no editorial date)
- `modified`: [`src/app/sitemap-brands.xml/route.ts`](file:///Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/src/app/sitemap-brands.xml/route.ts) (Real article content dates)
- `modified`: [`src/app/sitemap-categories.xml/route.ts`](file:///Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/src/app/sitemap-categories.xml/route.ts) (Real article content dates)
- `modified`: [`src/lib/sitemap-utils.ts`](file:///Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/src/lib/sitemap-utils.ts) (Optional lastmod support in `buildUrlEntry`)
- `modified`: [`src/app/page.tsx`](file:///Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/src/app/page.tsx) (Top 12 hubs, quick tags, aria-labels)
- `modified`: [`src/app/layout.tsx`](file:///Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/src/app/layout.tsx) (Footer cleanup)
- `modified`: [`src/app/globals.css`](file:///Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/src/app/globals.css) (Footer 3-column layout)
- `modified`: [`next.config.ts`](file:///Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/next.config.ts) (Cleaned up rewrites)
- `deleted`: `src/app/api/sitemaps/articles/route.ts`
- `deleted`: `src/lib/sitemap-articles.ts`

---

## 4. Acceptance Verification Results

1. **Check 1** (`curl -sI .../sitemap-articles.xml`): HTTP 200 OK, `Content-Type: application/xml; charset=utf-8`.
2. **Check 2** (`curl -s .../sitemap-articles.xml | grep -c "<loc>"`): Exactly 630 URLs (matching the 630 valid published articles from DB).
3. **Check 3** (`curl -sI .../sitemap-articles-1.xml`): HTTP 404 Not Found (blocked by brand guard without DB lookup).
4. **Check 4** (`curl -s .../sitemap.xml`): Index cleanly lists `https://libertyprinterfix.com/sitemap-articles.xml` with real lastmod `2026-09-22`.
5. **Check 5** (`xmllint --noout` on all 5 sitemaps): Exit code 0 for all 5 XML documents.
6. **Check 6** (5 Random Articles): All returned HTTP 200 with `<loc>` exactly matching `<link rel="canonical">`.
7. **Check 7** (No Artificial Dates): 0 articles contain today's date (`2026-09-24` or `2026-09-23`).
8. **Check 8** (`grep -o 'href="/search[^"]*"'` on Homepage): 0 links to `/search?q=` (only search form action `<form action="/search">` and footer utility link `/search` exist).
9. **Check 9** (Homepage Links Status & Sitemap Inclusion): All 12 hubs, 4 quick tags, and all-brands link return HTTP 200 and are present in `sitemap-categories.xml` / `sitemap-pages.xml`.

---

## 5. Real OEM Source Citations Architecture

- **Prisma Data Model (`ArticleSource`)**:
  - Added `SourceType` enum: `manual`, `support_article`, `driver_page`, `spec_sheet`, `official_community`.
  - Added `ArticleSource` model with required fields: `articleId`, `url`, `title`, `anchorText`, `publisher`, `sourceType`, `verifiedAt`, `httpStatus`.
  - Relation to `Article` with `onDelete: Cascade` and uniqueness constraint `@@unique([articleId, url])`.
- **Article Template (`src/app/[brandSlug]/[categorySlug]/[articleSlug]/page.tsx`)**:
  - Included `sources: { orderBy: { createdAt: 'asc' } }` in article query.
  - Renders `<h2>Sources</h2>` after the last troubleshooting step (`article-content`) and before the FAQ accordion.
  - Format: `<a href="{url}" target="_blank" rel="noopener">{anchorText}</a> – {publisher}, checked {Mon YYYY}`.
  - Plain editorial links (no `nofollow`/`sponsored`).
  - If an article has 0 sources, renders nothing (no empty heading or container).
- **Domain Allowlist Validation (`scripts/backfill-sources.ts`)**:
  - Strictly checks hostname against approved official OEM domains: `host === d || host.endsWith('.' + d)`.
  - Rejects any forums, Reddit, YouTube, retailers, or third-party content farms.
- **Verification Rules**:
  - Follows redirects and stores the final destination URL.
  - Verifies HTTP 200 status.
  - Extracts text from HTML or via `pdf-parse` (for PDF manuals) and verifies presence of the model number/series or error code.
  - Verifies page is not a generic homepage, search result, or login wall.
- **Scripts**:
  - `scripts/backfill-sources.ts`: Finds, verifies, and upserts OEM sources for articles; writes a comprehensive CSV report.
  - `scripts/check-sources.ts`: Re-fetches all stored sources, updates `httpStatus` and `verifiedAt`, and alerts on any non-200 status codes.
- **Verification Results**:
  - Initial 20 articles (6 Bixolon, 7 HP, 7 Epson) tested and backfilled with 100% verified OEM manuals and support guides.
  - Monthly health check `scripts/check-sources.ts` tested: 20/20 sources returned HTTP 200 OK.

