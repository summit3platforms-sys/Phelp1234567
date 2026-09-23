// /sitemap-categories.xml — Category pages per brand
// Only (brand, category) combos with at least one published article.
// lastmod = MAX real content date (getArticleEffectiveDates) of articles in that combo.

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
  const [brands, categories, articles] = await Promise.all([
    prisma.brand.findMany({ select: { id: true, slug: true } }),
    prisma.category.findMany({ select: { id: true, slug: true } }),
    prisma.article.findMany({
      where: {
        status: 'published',
        brandId: { not: null },
        categoryId: { not: null },
      },
      select: {
        brandId: true,
        categoryId: true,
        createdAt: true,
        publishedAt: true,
        reviewedAt: true,
        revisions: { select: { createdAt: true }, orderBy: { createdAt: 'desc' }, take: 1 },
      },
    }),
  ]);

  const brandMap = new Map(brands.map((b) => [b.id, b.slug.toLowerCase()]));
  const categoryMap = new Map(categories.map((c) => [c.id, c.slug.toLowerCase()]));

  // Compute maximum real content date per (brandId, categoryId)
  const comboLatestDate = new Map<string, Date>();
  for (const article of articles) {
    if (!article.brandId || !article.categoryId) continue;
    const key = `${article.brandId}:${article.categoryId}`;
    const { modifiedDate } = getArticleEffectiveDates(article);
    const existing = comboLatestDate.get(key);
    if (!existing || modifiedDate.getTime() > existing.getTime()) {
      comboLatestDate.set(key, modifiedDate);
    }
  }

  const urls: SitemapUrl[] = [];
  for (const [key, lastmod] of comboLatestDate.entries()) {
    const [brandId, categoryId] = key.split(':');
    const brandSlug = brandMap.get(brandId);
    const categorySlug = categoryMap.get(categoryId);
    if (!brandSlug || !categorySlug) continue;

    urls.push({
      loc: `${BASE_URL}/${brandSlug}/${categorySlug}`,
      lastmod,
    });
  }

  // Sort by loc for deterministic output
  urls.sort((a, b) => a.loc.localeCompare(b.loc));

  return xmlResponse(buildSitemapXml(urls));
}
