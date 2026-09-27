import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';
const prisma = new PrismaClient();

async function main() {
  const slug = 'dascom-pos-printer-cash-drawer-not-opening';
  const a = await prisma.article.findFirst({ where: { slug }, select: { content: true } });
  if (a) {
    const $ = cheerio.load(a.content);
    $('h2, h3').each((_, el) => {
      console.log($(el).prop('tagName'), $(el).text());
    });
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
