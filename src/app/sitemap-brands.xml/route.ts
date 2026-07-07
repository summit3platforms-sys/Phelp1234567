// /sitemap-brands.xml — Brand landing pages
// Only brands with at least one published article.
// lastmod = MAX(updatedAt) of published articles for that brand.

import { prisma } from '@/lib/prisma';
import {
  BASE_URL,
  buildSitemapXml,
  SitemapUrl,
  xmlResponse,
} from '@/lib/sitemap-utils';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<Response> {
  // Group published articles by brand, get max updatedAt per brand
  const brandStats = await prisma.article.groupBy({
    by: ['brandId'],
    where: {
      status: 'published',
      brandId: { not: null },
    },
    _max: { updatedAt: true },
  });

  if (brandStats.length === 0) {
    return xmlResponse(buildSitemapXml([]));
  }

  // Fetch brand slugs for the qualifying brandIds
  const brandIds = brandStats
    .map((s) => s.brandId)
    .filter((id): id is string => id !== null);

  const brands = await prisma.brand.findMany({
    where: { id: { in: brandIds } },
    select: { id: true, slug: true },
  });

  const brandSlugMap = new Map(brands.map((b) => [b.id, b.slug]));

  const urls: SitemapUrl[] = brandStats
    .flatMap((stat) => {
      const slug = brandSlugMap.get(stat.brandId!);
      if (!slug) return []; // skip if brand no longer exists
      const entry: SitemapUrl = {
        loc: `${BASE_URL}/${slug}`,
        lastmod: stat._max.updatedAt ?? new Date(),
      };
      return [entry];
    });

  return xmlResponse(buildSitemapXml(urls));
}
