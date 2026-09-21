import { prisma } from './src/lib/prisma';
async function main() {
  const slugs = ["instax-mini-link-blank-overexposed-dark-prints-fix", "star-micronics-cutter-locked-paper-jam-cover-wont-open", "fix-pantum-output-bin-errors-wont-turn-on-factory-reset", "hp-envy-6455e-setup-problems", "fix-citizen-faded-print-streaky-lines-ribbon-tension"];
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } },
    select: { slug: true }
  });
  console.log(articles);
}
main().catch(console.error).finally(() => prisma.$disconnect());
