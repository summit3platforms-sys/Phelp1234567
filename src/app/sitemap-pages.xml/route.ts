// /sitemap-pages.xml — Static pages
// Homepage lastmod = newest real article date.
// Other static pages omit <lastmod> as no real editorial date exists.

import { prisma } from '@/lib/prisma';
import {
  BASE_URL,
  buildSitemapXml,
  SitemapUrl,
  xmlResponse,
} from '@/lib/sitemap-utils';
import { getArticleEffectiveDates } from '@/lib/article-date';

export const revalidate = 3600;

const STATIC_PAGES = [
  '/brands',
  '/about',
  '/contact',
  '/privacy-policy',
];

export async function GET(): Promise<Response> {
  const latestArticle = await prisma.article.findFirst({
    where: { status: 'published' },
    select: {
      publishedAt: true,
      createdAt: true,
      reviewedAt: true,
      revisions: { select: { createdAt: true }, orderBy: { createdAt: 'desc' }, take: 1 },
    },
    orderBy: { publishedAt: 'desc' },
  });

  const homepageLastmod = latestArticle
    ? getArticleEffectiveDates(latestArticle).modifiedDate
    : undefined;

  const urls: SitemapUrl[] = [
    { loc: BASE_URL, lastmod: homepageLastmod },
    ...STATIC_PAGES.map((path) => ({
      loc: `${BASE_URL}${path}`,
      // omit lastmod rather than inventing placeholder dates
    })),
  ];

  return xmlResponse(buildSitemapXml(urls));
}
