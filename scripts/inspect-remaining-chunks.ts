import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';
const prisma = new PrismaClient();

async function main() {
  const slugs = [
    'fix-seiko-slp-manager-software-printer-not-responding-stuck',
    'seiko-slp-advanced-driver-fixes-registry-idle-polling-silent-install',
    'fix-citizen-printer-cutter-lock-auto-cutter-errors',
    'fix-citizen-printer-overheating-cooling-pause-dense-text',
    'bixolon-printer-stopped-working-after-windows-update',
    'how-to-update-bixolon-printer-firmware'
  ];

  for (const slug of slugs) {
    const a = await prisma.article.findFirst({ where: { slug }, select: { content: true } });
    if (a) {
      const $ = cheerio.load(a.content);
      console.log(`\n=== ${slug} ===`);
      $('ol li').each((i, el) => {
        console.log(`Step ${i+1}:`, $(el).text().substring(0, 120));
      });
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
