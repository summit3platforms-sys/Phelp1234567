// /sitemap-articles-[page].xml — Paginated article sitemaps
// Page numbers are 1-indexed. Returns 404 if out of range.
// Only published articles with valid brand + category slugs are included.
// lastmod = article's own updatedAt timestamp.

import { prisma } from '@/lib/prisma';
import {
  BASE_URL,
  CHUNK_SIZE,
  buildSitemapXml,
  SitemapUrl,
  xmlResponse,
} from '@/lib/sitemap-utils';

export const dynamic = 'force-dynamic';

export async function GET(
  _req: Request,
  { params }: { params: Promise<Record<string, string>> }
): Promise<Response> {
  const resolved = await params;
  const pageParam = resolved['page'] ?? '1';

  // Parse and validate page number
  const page = parseInt(pageParam, 10);
  if (isNaN(page) || page < 1) {
    return new Response('Not Found', { status: 404 });
  }

  // Check total article count to validate page range
  const totalCount = await prisma.article.count({
    where: { status: 'published' },
  });

  const pageCount = Math.max(1, Math.ceil(totalCount / CHUNK_SIZE));

  if (page > pageCount) {
    return new Response('Not Found', { status: 404 });
  }

  // Fetch this page's articles — only published, with brand + category
  const articles = await prisma.article.findMany({
    where: {
      status: 'published',
      brandId: { not: null },
      categoryId: { not: null },
    },
    select: {
      slug: true,
      updatedAt: true,
      brand: { select: { slug: true } },
      category: { select: { slug: true } },
    },
    orderBy: { updatedAt: 'desc' },
    skip: (page - 1) * CHUNK_SIZE,
    take: CHUNK_SIZE,
  });

  const urls: SitemapUrl[] = articles
    .filter((a) => a.brand?.slug && a.category?.slug && a.slug)
    .map((a) => ({
      loc: `${BASE_URL}/${a.brand!.slug}/${a.category!.slug}/${a.slug}`,
      lastmod: a.updatedAt,
    }));

  return xmlResponse(buildSitemapXml(urls));
}
