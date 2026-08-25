import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const articles = await prisma.article.findMany({
    where: { status: 'published' },
    select: {
      title: true,
      slug: true,
      excerpt: true,
      metaDescription: true,
      errorCode: true,
      content: true,
      difficultyLevel: true,
      timeToFix: true,
      brand: { select: { name: true, slug: true } },
      category: { select: { name: true, slug: true } },
      updatedAt: true,
    },
    orderBy: { updatedAt: 'desc' },
    take: 120,
  });

  let markdown = `# LibertyPrinterFix Complete Diagnostic Documentation (llms-full.txt)
> Comprehensive technical database for printer error codes, mechanical repair, and hardware troubleshooting.
> Web: https://libertyprinterfix.com
> Index of ${articles.length} detailed technical guides.

`;

  for (const a of articles) {
    const url = `https://libertyprinterfix.com/${a.brand?.slug || 'guide'}/${a.category?.slug || 'troubleshooting'}/${a.slug}`;
    const cleanContent = (a.content || '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n# $1\n')
      .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n## $1\n')
      .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n### $1\n')
      .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n')
      .replace(/<details>[\s\S]*?<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi, '\n**Q: $1**\n$2\n')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\s+/g, ' ')
      .trim();

    markdown += `\n---\n\n# ${a.title}\n`;
    markdown += `URL: ${url}\n`;
    markdown += `Brand: ${a.brand?.name || 'General'} | Category: ${a.category?.name || 'Hardware'} | Error Code: ${a.errorCode || 'N/A'}\n`;
    markdown += `Difficulty: ${a.difficultyLevel || 'Intermediate'} | Estimated Time to Fix: ${a.timeToFix || '15 mins'}\n`;
    markdown += `Last Updated: ${a.updatedAt.toISOString().split('T')[0]}\n\n`;
    markdown += `${cleanContent}\n\n`;
  }

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
