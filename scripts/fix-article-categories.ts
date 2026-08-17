import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Comprehensive slug -> correct category slug mapping
const categoryMap: Record<string, string> = {
  // Error Codes & Alerts
  'hp-laserjet-p4015-error-49-4c02': 'error-codes-alerts',
  'hp-officejet-pro-9015e-error-0x610000f6': 'error-codes-alerts',
  'hp-envy-6055e-printhead-error': 'error-codes-alerts',
  'hp-laserjet-pro-m15w-fuser-error': 'error-codes-alerts',
  'hp-color-laserjet-m283fdw-error-59': 'error-codes-alerts',

  // Connectivity Issues
  'hp-printer-keeps-disconnecting-from-wifi': 'connectivity-issues',
  'hp-envy-5055-offline-but-connected': 'connectivity-issues',
  'hp-officejet-pro-8025e-wifi-keeps-dropping': 'connectivity-issues',
  'hp-wireless-direct-not-appearing-on-phone': 'connectivity-issues',
  'hp-printer-showing-two-devices-network': 'connectivity-issues',
  'hp-printer-static-ip-setup-guide': 'connectivity-issues',
  'hp-laserjet-m428fdw-scan-to-email-not-working': 'connectivity-issues',
  'hp-smart-app-scan-to-pc-not-showing': 'connectivity-issues',
  'hp-laserjet-m111w-offline-fix': 'connectivity-issues',

  // Setup & Installation
  'hp-plus-printer-stuck-on-setup-screen': 'setup-installation',
  'hp-smart-app-cant-find-printer-windows-11': 'setup-installation',
  'hp-envy-inspire-7255e-setup-stuck': 'setup-installation',
  'hp-deskjet-3755-wifi-setup-without-app': 'setup-installation',
  'hp-laserjet-m1136-driver-windows-11': 'setup-installation',
  'uninstall-hp-smart-app-without-breaking-printer': 'setup-installation',
  'hp-printer-not-showing-up-on-macos-sequoia': 'setup-installation',
  'hp-printer-wont-print-from-chromebook-2026': 'setup-installation',
  'hp-printer-driver-missing-after-windows-update': 'setup-installation',
  'hp-printer-scan-to-email-gmail-setup': 'setup-installation',
  'hp-photosmart-c4780-driver-windows-10': 'setup-installation',
  'hp-officejet-6500-wireless-setup-windows-11': 'setup-installation',

  // Scanning Issues
  'hp-officejet-4650-scanner-not-working-mac': 'scanning-issues',
  'hp-scanner-says-door-open-when-closed': 'scanning-issues',

  // Printing Problems
  'hp-officejet-pro-6978-not-printing-black': 'printing-problems',
  'hp-envy-7855-duplex-printing-not-working': 'printing-problems',
  'hp-tango-x-not-printing-color-correctly': 'printing-problems',
  'hp-smart-app-stuck-searching-for-printer': 'printing-problems',
  'hp-printer-fax-error-no-dial-tone': 'printing-problems',

  // Paper Handling Issues
  'hp-officejet-3830-carriage-jam-fix': 'paper-handling-issues',
  'hp-printer-double-feeding-adf': 'paper-handling-issues',

  // Print Quality Issues
  'hp-envy-4520-print-quality-lines': 'print-quality-issues',
  'hp-printhead-alignment-failed-repeatedly': 'print-quality-issues',

  // Ink & Toner Issues
  'hp-smart-tank-720-ink-not-flowing': 'ink-toner-issues',
  'hp-deskjet-2755e-cartridge-not-recognized': 'ink-toner-issues',
  'instant-ink-cartridge-shows-empty-but-full': 'ink-toner-issues',
  'hp-plus-third-party-ink-blocked-after-update': 'ink-toner-issues',
  'how-to-bypass-hp-plus-without-instant-ink': 'ink-toner-issues',
  'cancel-instant-ink-keep-printer-working': 'ink-toner-issues',

  // Hardware & Maintenance
  'hp-smart-tank-7602-fax-not-working': 'hardware-maintenance',
};

async function fixCategories() {
  const categories = await prisma.category.findMany();
  const catMap = new Map(categories.map(c => [c.slug, c.id]));

  let updated = 0;
  let notFound = 0;

  for (const [slug, categorySlug] of Object.entries(categoryMap)) {
    const categoryId = catMap.get(categorySlug);
    if (!categoryId) {
      console.log(`❌ Category not found in DB: ${categorySlug}`);
      notFound++;
      continue;
    }

    const result = await prisma.article.updateMany({
      where: { slug },
      data: { categoryId },
    });

    if (result.count > 0) {
      console.log(`✅ ${slug} -> ${categorySlug}`);
      updated++;
    } else {
      console.log(`⚠️  Article slug not found in DB: ${slug}`);
      notFound++;
    }
  }

  console.log(`\nDone! ✅ Updated: ${updated} | ⚠️  Not found: ${notFound}`);
}

fixCategories()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
