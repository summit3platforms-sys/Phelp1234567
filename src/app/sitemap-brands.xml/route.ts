// /sitemap-brands.xml — Brand landing pages
// Only brands with at least one published article.
// lastmod = MAX real content date (getArticleEffectiveDates) of articles for that brand.

import { prisma } from '@/lib/prisma';
import {
  BASE_URL,
  buildSitemapXml,
  SitemapUrl,
  xmlResponse,
} from '@/lib/sitemap-utils';
import { getArticleEffectiveDates } from '@/lib/article-date';

export const revalidate = 3600;

export async function GET(): Promise<Response> {
  const [brands, articles] = await Promise.all([
    prisma.brand.findMany({ select: { id: true, slug: true } }),
    prisma.article.findMany({
      where: {
        status: 'published',
        brandId: { not: null },
      },
      select: {
        brandId: true,
        createdAt: true,
        publishedAt: true,
        reviewedAt: true,
        revisions: { select: { createdAt: true }, orderBy: { createdAt: 'desc' }, take: 1 },
      },
    }),
  ]);

  // Compute maximum real content date per brand
  const brandLatestDate = new Map<string, Date>();
  for (const article of articles) {
    if (!article.brandId) continue;
    const { modifiedDate } = getArticleEffectiveDates(article);
    const existing = brandLatestDate.get(article.brandId);
    if (!existing || modifiedDate.getTime() > existing.getTime()) {
      brandLatestDate.set(article.brandId, modifiedDate);
    }
  }

  const brandMap = new Map(brands.map((b) => [b.id, b.slug]));

  const urls: SitemapUrl[] = [];
  for (const [brandId, lastmod] of brandLatestDate.entries()) {
    const slug = brandMap.get(brandId);
    if (!slug) continue;
    urls.push({
      loc: `${BASE_URL}/${slug.toLowerCase()}`,
      lastmod,
    });
  }

  // Sort by loc for deterministic output
  urls.sort((a, b) => a.loc.localeCompare(b.loc));

  return xmlResponse(buildSitemapXml(urls));
}
