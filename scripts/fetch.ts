import { prisma } from '../src/lib/prisma';
import * as fs from 'fs';

async function main() {
  const slugs = ["bixolon-printer-printing-garbled-text", "hp-printer-keeps-disconnecting-from-wifi", "polaroid-hi-print-streaky-lines-wrong-colors-fix", "printer-not-printing", "kodak-scan-to-email-not-working"];
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  
  fs.writeFileSync('articles.json', JSON.stringify(articles.map(a => ({slug: a.slug, content: a.content})), null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
