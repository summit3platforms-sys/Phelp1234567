import { prisma } from './src/lib/prisma';
import fs from 'fs';
async function main() {
  const slugs = ["canon-printer-support-code-306", "hp-printer-error-codes", "instax-mini-link-vs-mini-link-2-vs-square-link-comparison", "zebra-printer-faded-print-darkness-setting-too-light-fix", "brother-printer-error-51-laser-unit"];
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  articles.forEach(a => {
    fs.writeFileSync(a.slug + '.html', a.content);
  });
}
main().catch(console.error).finally(() => prisma.$disconnect());
