import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();
const slugs = [
  "hp-printer-wont-print-from-chromebook-2026", 
  "instax-mini-link-setup-guide-film-loading", 
  "hp-printer-printing-very-slowly", 
  "bixolon-printer-wont-connect-to-wi-fi", 
  "hp-officejet-3830-carriage-jam-fix"
];

async function main() {
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  
  let out = '';
  for (const article of articles) {
    out += `\n\n===SLUG: ${article.slug} ===\n`;
    out += article.content;
  }
  fs.writeFileSync('articles_dump.txt', out);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
