import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const updates = [
  { slug: 'primera-label-vertically-offset-skipping-size-not-recognized', file: 'primera-label-vertically-offset-skipping-size-not-recognized.jpg' },
  { slug: 'polaroid-hi-print-print-button-not-lighting-up-mid-print-stall', file: 'polaroid-hi-print-print-button-not-lighting-up-mid-print-stall.jpg' },
  { slug: 'primera-ptstatus-invalid-cartridge-missing-printhead-rfid-errors', file: 'primera-ptstatus-invalid-cartridge-missing-printhead-rfid-errors.jpg' },
  { slug: 'fix-pantum-blank-spots-faded-print-charging-roller-damage', file: 'fix-pantum-blank-spots-faded-print-charging-roller-damage.jpg' },
  { slug: 'instax-link-wont-turn-on-charge-battery-fix', file: 'instax-link-wont-turn-on-charge-battery-fix.jpg' },
  { slug: 'fix-star-micronics-printer-blank-receipts-faded-print-paper-errors', file: 'fix-star-micronics-printer-blank-receipts-faded-print-paper-errors.jpg' },
  { slug: 'rollo-printer-pirate-ship-shipstation-setup-guide', file: 'rollo-printer-pirate-ship-shipstation-setup-guide.jpg' },
  { slug: 'phomemo-m02-vs-m02-pro-t02-comparison-m02s-fixes', file: 'phomemo-m02-vs-m02-pro-t02-comparison-m02s-fixes.jpg' },
  { slug: 'phomemo-label-maker-comparison-m110-m120-m150-m221', file: 'phomemo-label-maker-comparison-m110-m120-m150-m221.jpg' },
  { slug: 'phomemo-status-light-colors-explained-flashing-red-fix', file: 'phomemo-status-light-colors-explained-flashing-red-fix.jpg' }
];

async function main() {
  for (const update of updates) {
    await prisma.article.update({
      where: { slug: update.slug },
      data: { featuredImage: `/images/articles/${update.file}` }
    });
    console.log(`Updated ${update.slug}`);
  }
}

main().finally(() => prisma.$disconnect());
