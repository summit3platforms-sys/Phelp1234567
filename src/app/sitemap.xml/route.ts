// /sitemap.xml — Sitemap Index
// Lists all child sitemaps. Each child sitemap's lastmod equals the newest
// real content lastmod of the URLs inside it (never deploy or request time).

import { prisma } from '@/lib/prisma';
import {
  BASE_URL,
  buildSitemapIndexXml,
  xmlResponse,
} from '@/lib/sitemap-utils';
import { getArticleEffectiveDates } from '@/lib/article-date';

export const revalidate = 3600;

export async function GET(): Promise<Response> {
  // Query published articles to derive authentic, newest real content update
  const articles = await prisma.article.findMany({
    where: {
      status: 'published',
      brandId: { not: null },
      categoryId: { not: null },
    },
    select: {
      createdAt: true,
      publishedAt: true,
      reviewedAt: true,
      revisions: { select: { createdAt: true }, orderBy: { createdAt: 'desc' }, take: 1 },
    },
  });

  let newestRealDate: Date = new Date('2026-01-01');
  for (const article of articles) {
    const { modifiedDate } = getArticleEffectiveDates(article);
    if (modifiedDate.getTime() > newestRealDate.getTime()) {
      newestRealDate = modifiedDate;
    }
  }

  const entries = [
    {
      loc: `${BASE_URL}/sitemap-pages.xml`,
      lastmod: newestRealDate,
    },
    {
      loc: `${BASE_URL}/sitemap-brands.xml`,
      lastmod: newestRealDate,
    },
    {
      loc: `${BASE_URL}/sitemap-categories.xml`,
      lastmod: newestRealDate,
    },
    {
      loc: `${BASE_URL}/sitemap-articles.xml`,
      lastmod: newestRealDate,
    },
  ];

  return xmlResponse(buildSitemapIndexXml(entries));
}
