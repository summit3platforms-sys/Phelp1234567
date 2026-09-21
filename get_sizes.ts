import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const slugs = [
  "hp-printer-not-showing-up-on-macos-sequoia",
  "star-micronics-tsp650-vs-tsp700-which-pos-models-buy",
  "hp-printer-driver-missing-after-windows-update",
  "phomemo-m02-vs-m02-pro-t02-comparison-m02s-fixes",
  "hp-plus-third-party-ink-blocked-after-update"
];

async function main() {
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } },
    select: { slug: true, content: true }
  });
  articles.forEach(a => console.log(a.slug, a.content.length, "chars"));
}
main().catch(console.error).finally(() => prisma.$disconnect());
