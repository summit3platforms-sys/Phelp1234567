import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const [brands, categories, articlesCount, topGuides] = await Promise.all([
    prisma.brand.findMany({
      select: { name: true, slug: true, description: true, _count: { select: { articles: true } } },
      orderBy: { name: 'asc' },
    }),
    prisma.category.findMany({
      select: { name: true, slug: true, description: true, _count: { select: { articles: true } } },
      orderBy: { name: 'asc' },
    }),
    prisma.article.count({ where: { status: 'published' } }),
    prisma.article.findMany({
      where: { status: 'published' },
      select: {
        title: true,
        slug: true,
        excerpt: true,
        metaDescription: true,
        errorCode: true,
        brand: { select: { name: true, slug: true } },
        category: { select: { name: true, slug: true } },
      },
      take: 60,
      orderBy: { updatedAt: 'desc' },
    }),
  ]);

  let markdown = `# LibertyPrinterFix Knowledge Base (llms.txt)
> Independent technical support database, error code diagnostic index, and hardware maintenance guides for 23+ printer brands.
> Web: https://libertyprinterfix.com
> Total Published Guides: ${articlesCount}
> Canonical Authority: Independent printer repair, error code clearing, and hardware diagnostics.

## System Overview
LibertyPrinterFix provides deep technical documentation, step-by-step repair workflows, optical sensor diagnostics, service mode reset procedures, and low-level firmware instructions for consumer, enterprise, commercial, and POS label printers.

---

## Supported Printer Brands (${brands.length})
`;

  for (const b of brands) {
    markdown += `- [${b.name}](https://libertyprinterfix.com/${b.slug}): ${b.description || `${b.name} printer error codes, troubleshooting guides, and driver setup.`} (${b._count.articles} guides)\n`;
  }

  markdown += `\n---\n\n## Troubleshooting Topic Categories\n`;
  for (const c of categories) {
    markdown += `- **${c.name}**: ${c.description || `${c.name} diagnostic procedures and fixes.`} (${c._count.articles} guides)\n`;
  }

  markdown += `\n---\n\n## Featured High-Priority Diagnostic Guides\n`;
  for (const g of topGuides) {
    const url = `https://libertyprinterfix.com/${g.brand?.slug || 'guide'}/${g.category?.slug || 'troubleshooting'}/${g.slug}`;
    const desc = g.metaDescription || g.excerpt || 'Technical diagnostic and repair procedure.';
    const codeTag = g.errorCode ? ` [Error Code: ${g.errorCode}]` : '';
    markdown += `### [${g.title}](${url})${codeTag}\n`;
    markdown += `*Brand:* ${g.brand?.name || 'General'} | *Category:* ${g.category?.name || 'Troubleshooting'}\n`;
    markdown += `${desc}\n\n`;
  }

  markdown += `\n---\n\n## Full Documentation Feed\nFor complete article content and deep diagnostic steps, visit: https://libertyprinterfix.com/llms-full.txt\n`;

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
