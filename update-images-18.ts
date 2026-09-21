import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const updates = [
  { slug: 'niimbot-print-direction-template-size-match-self-test', file: 'niimbot-print-direction-template-size-match-self-test.jpg' },
  { slug: 'fix-pantum-0x000000709-communication-errors-bm2300-cover', file: 'fix-pantum-0x000000709-communication-errors-bm2300-cover.jpg' },
  { slug: 'rollo-wireless-printer-wifi-bluetooth-setup-guide', file: 'rollo-wireless-printer-wifi-bluetooth-setup-guide.jpg' },
  { slug: 'niimbot-d11-vs-d110-d101-setup-guides', file: 'niimbot-d11-vs-d110-d101-setup-guides.jpg' },
  { slug: 'rollo-printer-driver-download-install-guide', file: 'rollo-printer-driver-download-install-guide.jpg' },
  { slug: 'rollo-x1038-vs-x1040-wireless-models-comparison', file: 'rollo-x1038-vs-x1040-wireless-models-comparison.jpg' }
];

async function main() {
  await Promise.all(updates.map(update => 
    prisma.article.update({
      where: { slug: update.slug },
      data: { featuredImage: `/images/articles/${update.file}` }
    })
  ));
  console.log("Updated all 6.");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
