// /sitemap-articles.xml — Redirects to /sitemap-articles-1.xml
// This ensures the sitemap index entry always works even though the
// actual content is served from the paginated dynamic route.

import { BASE_URL } from '@/lib/sitemap-utils';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export function GET(): never {
  redirect(`${BASE_URL}/sitemap-articles-1.xml`);
}
