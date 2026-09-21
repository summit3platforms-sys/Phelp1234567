import { prisma } from './src/lib/prisma';
import fs from 'fs';
async function main() {
  const slugs = ["instax-mini-link-blank-overexposed-dark-prints-fix", "star-micronics-cutter-locked-paper-jam-cover-wont-open", "fix-pantum-output-bin-errors-wont-turn-on-factory-reset", "hp-envy-6455e-setup-problems", "fix-citizen-faded-print-streaky-lines-ribbon-tension"];
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } },
    select: { slug: true, content: true }
  });
  
  for (const a of articles) {
    fs.writeFileSync(`article_${a.slug}.html`, a.content);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
