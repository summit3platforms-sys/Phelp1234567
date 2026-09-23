// /sitemap-articles.xml — Complete Published Articles Sitemap
// Serves the full article urlset directly (no redirect, no pagination).
// Conforms to sitemaps.org specification and Google Search Console requirements.

import { prisma } from '@/lib/prisma';
import {
  BASE_URL,
  buildSitemapXml,
  SitemapUrl,
  xmlResponse,
} from '@/lib/sitemap-utils';
import { getArticleEffectiveDates } from '@/lib/article-date';

export const revalidate = 3600; // ISR: cache for 1 hour

export async function GET(): Promise<Response> {
  // Query all active redirects to ensure redirected URLs are excluded
  const [redirects, articles] = await Promise.all([
    prisma.redirect.findMany({ select: { oldUrl: true } }),
    prisma.article.findMany({
      where: {
        status: 'published',
        brandId: { not: null },
        categoryId: { not: null },
        brand: { isNot: null },
        category: { isNot: null },
      },
      select: {
        title: true,
        slug: true,
        featuredImage: true,
        createdAt: true,
        publishedAt: true,
        updatedAt: true,
        reviewedAt: true,
        revisions: { select: { createdAt: true }, orderBy: { createdAt: 'desc' }, take: 1 },
        brand: { select: { slug: true } },
        category: { select: { slug: true } },
      },
      orderBy: { publishedAt: 'desc' },
    }),
  ]);

  const redirectSet = new Set(redirects.map((r) => r.oldUrl.toLowerCase()));

  const urls: SitemapUrl[] = articles
    .filter((a) => {
      if (!a.brand?.slug || !a.category?.slug || !a.slug) return false;
      const canonicalPath = `/${a.brand.slug.toLowerCase()}/${a.category.slug.toLowerCase()}/${a.slug.toLowerCase()}`;
      return !redirectSet.has(canonicalPath);
    })
    .map((a) => {
      const canonicalLoc = `${BASE_URL}/${a.brand!.slug.toLowerCase()}/${a.category!.slug.toLowerCase()}/${a.slug.toLowerCase()}`;
      const { modifiedDate } = getArticleEffectiveDates(a);
      return {
        loc: canonicalLoc,
        lastmod: modifiedDate,
        image: a.featuredImage
          ? {
              loc: a.featuredImage.startsWith('http')
                ? a.featuredImage
                : `${BASE_URL}${a.featuredImage}`,
              title: a.title,
            }
          : undefined,
      };
    });

  return xmlResponse(buildSitemapXml(urls));
}
