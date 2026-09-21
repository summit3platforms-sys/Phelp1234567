import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const slugs = [
    "polaroid-hi-print-firmware-update-factory-reset-guide",
    "kodak-portable-printer-overheating-fix",
    "dymo-label-software-wont-open-install",
    "hp-printer-error-codes",
    "bixolon-printer-bluetooth-pairing-failed"
  ];

  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  console.log(JSON.stringify(articles, null, 2));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
