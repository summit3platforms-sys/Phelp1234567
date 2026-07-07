// /sitemap.xml — Sitemap Index
// Lists all child sitemaps. Automatically adds sitemap-articles-N.xml
// entries when article count exceeds CHUNK_SIZE.

import { prisma } from '@/lib/prisma';
import {
  BASE_URL,
  CHUNK_SIZE,
  buildSitemapIndexXml,
  xmlResponse,
} from '@/lib/sitemap-utils';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<Response> {
  // -------------------------------------------------------------------------
  // Query for lastmod timestamps — one efficient query each
  // -------------------------------------------------------------------------
  const [articlesAggregate, brandsAggregate, categoriesAggregate, articleCount] =
    await Promise.all([
      // Latest article update (for articles sitemap lastmod)
      prisma.article.aggregate({
        where: { status: 'published' },
        _max: { updatedAt: true },
      }),
      // Latest article update across all brands (for brands sitemap lastmod)
      prisma.article.aggregate({
        where: { status: 'published', brandId: { not: null } },
        _max: { updatedAt: true },
      }),
      // Latest article update for category pages lastmod
      prisma.article.aggregate({
        where: {
          status: 'published',
          brandId: { not: null },
          categoryId: { not: null },
        },
        _max: { updatedAt: true },
      }),
      // Total published article count (for auto-splitting)
      prisma.article.count({ where: { status: 'published' } }),
    ]);

  const now = new Date();
  const articlesLastmod = articlesAggregate._max.updatedAt ?? now;
  const brandsLastmod = brandsAggregate._max.updatedAt ?? now;
  const categoriesLastmod = categoriesAggregate._max.updatedAt ?? now;

  // -------------------------------------------------------------------------
  // Static sitemaps
  // -------------------------------------------------------------------------
  const entries = [
    {
      loc: `${BASE_URL}/sitemap-pages.xml`,
      lastmod: articlesLastmod, // homepage lastmod = newest article
    },
    {
      loc: `${BASE_URL}/sitemap-brands.xml`,
      lastmod: brandsLastmod,
    },
    {
      loc: `${BASE_URL}/sitemap-categories.xml`,
      lastmod: categoriesLastmod,
    },
  ];

  // -------------------------------------------------------------------------
  // Dynamic article sitemaps (auto-split at CHUNK_SIZE)
  // -------------------------------------------------------------------------
  const pageCount = Math.max(1, Math.ceil(articleCount / CHUNK_SIZE));
  for (let page = 1; page <= pageCount; page++) {
    entries.push({
      loc: `${BASE_URL}/sitemap-articles-${page}.xml`,
      lastmod: articlesLastmod,
    });
  }

  return xmlResponse(buildSitemapIndexXml(entries));
}
