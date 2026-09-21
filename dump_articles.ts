import { prisma } from './src/lib/prisma';
import fs from 'fs';

async function main() {
  const slugs = ["instax-square-link-wide-errors-film-loading-guide", "bixolon-xd3-40-label-printer-error", "brother-printer-error-46-unable-to-clean", "canon-imageclass-mf-toner-error", "hp-sprocket-select-vs-sprocket-200-difference"];
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  for (const article of articles) {
    fs.writeFileSync(`${article.slug}.html`, article.content);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
