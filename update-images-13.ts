import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const updates = [
  { slug: 'star-micronics-cutter-locked-paper-jam-cover-wont-open', file: 'star-micronics-cutter-locked-paper-jam-cover-wont-open.jpg' },
  { slug: 'pantum-p2500w-m6600nw-blinking-lights-wifi-error-05', file: 'pantum-p2500w-m6600nw-blinking-lights-wifi-error-05.jpg' },
  { slug: 'primera-robotic-arm-stuck-adl-max-not-picking-discs-tray-ejects', file: 'primera-robotic-arm-stuck-adl-max-not-picking-discs-tray-ejects.jpg' },
  { slug: 'instax-link-multiple-phones-pairing-guide', file: 'instax-link-multiple-phones-pairing-guide.jpg' },
  { slug: 'niimbot-general-setup-factory-reset-cables-business-pricing', file: 'niimbot-general-setup-factory-reset-cables-business-pricing.jpg' },
  { slug: 'seiko-slp-self-test-calibration-flashing-light-error', file: 'seiko-slp-self-test-calibration-flashing-light-error.jpg' },
  { slug: 'instax-link-factory-reset-stuck-firmware-update-overheating', file: 'instax-link-factory-reset-stuck-firmware-update-overheating.jpg' },
  { slug: 'xerox-maintenance-kits-fuser-replacement-transfer-rollers', file: 'xerox-maintenance-kits-fuser-replacement-transfer-rollers.jpg' },
  { slug: 'instax-mini-link-blank-overexposed-dark-prints-fix', file: 'instax-mini-link-blank-overexposed-dark-prints-fix.jpg' },
  { slug: 'lexmark-model-setup-errors-mx632-mx521-cs510-mx910', file: 'lexmark-model-setup-errors-mx632-mx521-cs510-mx910.jpg' }
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
