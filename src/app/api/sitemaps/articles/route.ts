import { generateArticlesSitemap } from '@/lib/sitemap-articles';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest): Promise<Response> {
  const page = req.nextUrl.searchParams.get('page') ?? '1';
  return generateArticlesSitemap(page);
}
