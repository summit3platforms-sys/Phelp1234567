import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';
const prisma = new PrismaClient();

async function main() {
  const slugs = [
    'dymo-labelwriter-printing-blank-labels-skipping',
    'fix-xerox-024-toner-codes-third-party-chips-developer-errors',
    'zebra-label-roll-guides-fanfold-linerless-printing-setup',
    'instax-link-wont-turn-on-charge-battery-fix'
  ];
  for (const slug of slugs) {
    console.log(`\n=== ${slug} ===`);
    const a = await prisma.article.findFirst({ where: { slug }, select: { content: true } });
    if (a) {
      const $ = cheerio.load(a.content);
      $('ol li').each((i, el) => {
        console.log(`Step ${i+1}:`, $(el).html()?.substring(0, 150));
      });
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
