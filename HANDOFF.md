# Technical Handover: Article Sitemap Architecture & Reliability Fix

**Date**: 2026-09-24  
**Commit Target**: `main`  
**Site**: `https://libertyprinterfix.com`  

---

## 1. Summary of Changes

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

## 2. Files Modified & Deleted

- `modified`: [`src/app/[brandSlug]/page.tsx`](file:///Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/src/app/[brandSlug]/page.tsx) (Brand guard)
- `modified`: [`src/app/sitemap.xml/route.ts`](file:///Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/src/app/sitemap.xml/route.ts) (Sitemap index & real lastmod)
- `modified`: [`src/app/sitemap-articles.xml/route.ts`](file:///Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/src/app/sitemap-articles.xml/route.ts) (Direct 630-article urlset, ISR)
- `modified`: [`src/app/sitemap-pages.xml/route.ts`](file:///Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/src/app/sitemap-pages.xml/route.ts) (Omit lastmod when no editorial date)
- `modified`: [`src/app/sitemap-brands.xml/route.ts`](file:///Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/src/app/sitemap-brands.xml/route.ts) (Real article content dates)
- `modified`: [`src/app/sitemap-categories.xml/route.ts`](file:///Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/src/app/sitemap-categories.xml/route.ts) (Real article content dates)
- `modified`: [`src/lib/sitemap-utils.ts`](file:///Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/src/lib/sitemap-utils.ts) (Optional lastmod support in `buildUrlEntry`)
- `modified`: [`next.config.ts`](file:///Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/next.config.ts) (Cleaned up rewrites)
- `deleted`: `src/app/api/sitemaps/articles/route.ts`
- `deleted`: `src/lib/sitemap-articles.ts`

---

## 3. Acceptance Verification Results

1. **Check 1** (`curl -sI .../sitemap-articles.xml`): HTTP 200 OK, `Content-Type: application/xml; charset=utf-8`.
2. **Check 2** (`curl -s .../sitemap-articles.xml | grep -c "<loc>"`): Exactly 630 URLs (matching the 630 valid published articles from DB).
3. **Check 3** (`curl -sI .../sitemap-articles-1.xml`): HTTP 404 Not Found (blocked by brand guard without DB lookup).
4. **Check 4** (`curl -s .../sitemap.xml`): Index cleanly lists `https://libertyprinterfix.com/sitemap-articles.xml` with real lastmod `2026-09-22`.
5. **Check 5** (`xmllint --noout` on all 5 sitemaps): Exit code 0 for all 5 XML documents.
6. **Check 6** (5 Random Articles): All returned HTTP 200 with `<loc>` exactly matching `<link rel="canonical">`.
7. **Check 7** (No Artificial Dates): 0 articles contain today's date (`2026-09-24` or `2026-09-23`).
