import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const slugs = [
    "phomemo-printer-feeds-prints-blank-paper-orientation",
    "zebra-zpl-vs-epl-difference-configuration-format-guide",
    "hp-laserjet-m15w-fuser-error",
    "canon-print-app-not-detecting-printer",
    "hp-laserjet-m111w-offline-fix"
  ];
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } },
    select: { slug: true, content: true }
  });
  fs.writeFileSync('articles_5.json', JSON.stringify(articles, null, 2));
  console.log("Saved to articles_5.json");
}

main().catch(console.error).finally(() => prisma.$disconnect());
