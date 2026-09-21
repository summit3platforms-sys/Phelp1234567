import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const articles = await prisma.article.findMany({
    where: {
      slug: {
        in: [
          'instax-square-link-wide-errors-film-loading-guide',
          'fix-citizen-printer-wont-turn-on-factory-reset-guide',
          'citizen-printer-network-reset-static-ip-configuration',
          'fix-citizen-printer-communication-errors-usb-not-detected',
          'seiko-slp-self-test-calibration-flashing-light-error'
        ]
      }
    },
    select: { slug: true, wordCount: true, content: true }
  });
  
  for (const article of articles) {
    console.log(`${article.slug}: ${article.wordCount} words (content length: ${article.content.length})`);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
