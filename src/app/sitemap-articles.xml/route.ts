// /sitemap-articles.xml — Directly serves published articles sitemap (Page 1)
// compliant with sitemaps.org, no redirects

import { generateArticlesSitemap } from '@/lib/sitemap-articles';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<Response> {
  return generateArticlesSitemap(1);
}
