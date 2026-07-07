// /sitemap-categories.xml — Category pages per brand
// Only (brand, category) combos with at least one published article.
// lastmod = MAX(updatedAt) of published articles in that brand+category.

import { prisma } from '@/lib/prisma';
import {
  BASE_URL,
  buildSitemapXml,
  SitemapUrl,
  xmlResponse,
} from '@/lib/sitemap-utils';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<Response> {
  // Group by brand+category, get max updatedAt per combo
  const stats = await prisma.article.groupBy({
    by: ['brandId', 'categoryId'],
    where: {
      status: 'published',
      brandId: { not: null },
      categoryId: { not: null },
    },
    _max: { updatedAt: true },
  });

  if (stats.length === 0) {
    return xmlResponse(buildSitemapXml([]));
  }

  // Collect unique brandIds and categoryIds for batch lookup
  const brandIds = [
    ...new Set(stats.map((s) => s.brandId).filter((id): id is string => id !== null)),
  ];
  const categoryIds = [
    ...new Set(stats.map((s) => s.categoryId).filter((id): id is string => id !== null)),
  ];

  const [brands, categories] = await Promise.all([
    prisma.brand.findMany({
      where: { id: { in: brandIds } },
      select: { id: true, slug: true },
    }),
    prisma.category.findMany({
      where: { id: { in: categoryIds } },
      select: { id: true, slug: true },
    }),
  ]);

  const brandSlugMap = new Map(brands.map((b) => [b.id, b.slug]));
  const categorySlugMap = new Map(categories.map((c) => [c.id, c.slug]));

  const urls: SitemapUrl[] = stats.flatMap((stat) => {
    const brandSlug = brandSlugMap.get(stat.brandId!);
    const categorySlug = categorySlugMap.get(stat.categoryId!);
    if (!brandSlug || !categorySlug) return []; // orphaned data — skip
    const entry: SitemapUrl = {
      loc: `${BASE_URL}/${brandSlug}/${categorySlug}`,
      lastmod: stat._max.updatedAt ?? new Date(),
    };
    return [entry];
  });

  return xmlResponse(buildSitemapXml(urls));
}
