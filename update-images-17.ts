import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const updates = [
  { slug: 'polaroid-hi-print-wont-turn-on-charge-port-fix', file: 'polaroid-hi-print-wont-turn-on-charge-port-fix.jpg' },
  { slug: 'primera-printer-offline-error-state-ptstatus-wont-open', file: 'primera-printer-offline-error-state-ptstatus-wont-open.jpg' },
  { slug: 'primera-bravo-printhead-cartridge-defective-4100-replacement', file: 'primera-bravo-printhead-cartridge-defective-4100-replacement.jpg' },
  { slug: 'polaroid-hi-print-gen-2-vs-gen-1-instax-mini-link-comparison', file: 'polaroid-hi-print-gen-2-vs-gen-1-instax-mini-link-comparison.jpg' },
  { slug: 'fix-citizen-printer-wont-turn-on-factory-reset-guide', file: 'fix-citizen-printer-wont-turn-on-factory-reset-guide.jpg' },
  { slug: 'phomemo-printer-connected-wont-print-app-crashing-fix', file: 'phomemo-printer-connected-wont-print-app-crashing-fix.jpg' },
  { slug: 'fix-pantum-toner-not-recognized-chip-resets-spring-contacts', file: 'fix-pantum-toner-not-recognized-chip-resets-spring-contacts.jpg' },
  { slug: 'fix-citizen-paper-cover-open-print-head-alarm-lever', file: 'fix-citizen-paper-cover-open-print-head-alarm-lever.jpg' },
  { slug: 'polaroid-hi-print-sticker-backing-peeling-storage-tips', file: 'polaroid-hi-print-sticker-backing-peeling-storage-tips.jpg' },
  { slug: 'niimbot-b1-vs-b21-b3s-b4-comparison-troubleshooting', file: 'niimbot-b1-vs-b21-b3s-b4-comparison-troubleshooting.jpg' }
];

async function main() {
  await Promise.all(updates.map(update => 
    prisma.article.update({
      where: { slug: update.slug },
      data: { featuredImage: `/images/articles/${update.file}` }
    })
  ));
  console.log("Updated all 10.");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
