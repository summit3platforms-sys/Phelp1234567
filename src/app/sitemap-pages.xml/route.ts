// /sitemap-pages.xml — Static pages only
// Homepage lastmod = newest published article.
// Other pages use site launch date.

import { prisma } from '@/lib/prisma';
import {
  BASE_URL,
  buildSitemapXml,
  xmlResponse,
} from '@/lib/sitemap-utils';

export const dynamic = 'force-dynamic';

// Known static pages (only pages that actually exist in the app)
const STATIC_PAGES = [
  { path: '/about',          lastmodFixed: '2025-01-01' },
  { path: '/contact',        lastmodFixed: '2025-01-01' },
  { path: '/privacy-policy', lastmodFixed: '2025-01-01' },
];

export async function GET(): Promise<Response> {
  // Homepage lastmod = most recently published article date
  const latest = await prisma.article.aggregate({
    where: { status: 'published' },
    _max: { publishedAt: true },
  });

  const homepageLastmod = latest._max.publishedAt ?? new Date('2025-01-01');

  const urls = [
    // Homepage
    { loc: BASE_URL, lastmod: homepageLastmod },
    // Other static pages
    ...STATIC_PAGES.map(({ path, lastmodFixed }) => ({
      loc: `${BASE_URL}${path}`,
      lastmod: lastmodFixed,
    })),
  ];

  return xmlResponse(buildSitemapXml(urls));
}
