import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const updates = [
  {
    slug: 'bixolon-printer-wont-switch-to-label-mode-fix',
    featuredImage: '/images/articles/bixolon-printer-wont-switch-to-label-mode-fix.jpg',
    featuredImageAlt: 'Technician configuring media sensor and feeding continuous label roll on Bixolon hybrid printer',
    featuredImageTitle: 'Bixolon Printer Label Mode Configuration and Media Calibration',
  },
  {
    slug: 'bixolon-printer-stuck-in-receipt-mode-fix',
    featuredImage: '/images/articles/bixolon-printer-stuck-in-receipt-mode-fix.jpg',
    featuredImageAlt: 'Bixolon desktop thermal printer with open cover showing receipt paper roll and mode switch settings',
    featuredImageTitle: 'Bixolon Thermal Receipt Printer Mode Setup and Configuration',
  },
  {
    slug: 'bixolon-printer-offline-after-windows-update-fix',
    featuredImage: '/images/articles/bixolon-printer-offline-after-windows-update-fix.jpg',
    featuredImageAlt: 'Windows 11 desktop showing printer settings alongside Bixolon POS receipt printer connected via USB',
    featuredImageTitle: 'Bixolon Printer Offline After Windows Update Troubleshooting',
  },
  {
    slug: 'bixolon-printer-offline-pos-system-fix',
    featuredImage: '/images/articles/bixolon-printer-offline-pos-system-fix.jpg',
    featuredImageAlt: 'Commercial retail POS touch terminal connected to Bixolon receipt printer showing offline alert',
    featuredImageTitle: 'Bixolon POS System Offline Troubleshooting and Port Link',
  },
  {
    slug: 'bixolon-mobile-printer-battery-draining-fast-fix',
    featuredImage: '/images/articles/bixolon-mobile-printer-battery-draining-fast-fix.jpg',
    featuredImageAlt: 'Compact mobile rugged thermal receipt printer resting on charging cradle with rechargeable battery pack',
    featuredImageTitle: 'Bixolon Mobile Thermal Printer Battery Maintenance and Charging',
  },
  {
    slug: 'bixolon-printer-shopify-pos-not-printing-fix',
    featuredImage: '/images/articles/bixolon-printer-shopify-pos-not-printing-fix.jpg',
    featuredImageAlt: 'Retail checkout iPad running Shopify POS connected to black thermal receipt printer',
    featuredImageTitle: 'Shopify POS Receipt Printing and Bixolon Setup',
  },
  {
    slug: 'bixolon-dot-matrix-printer-ribbon-not-feeding-fix',
    featuredImage: '/images/articles/bixolon-dot-matrix-printer-ribbon-not-feeding-fix.jpg',
    featuredImageAlt: 'Hands installing ink ribbon cassette into dot matrix kitchen receipt printer chassis gears',
    featuredImageTitle: 'Impact Dot Matrix Printer Ribbon Mechanism and Gear Assembly',
  },
  {
    slug: 'bixolon-dot-matrix-printer-faded-print-fix',
    featuredImage: '/images/articles/bixolon-dot-matrix-printer-faded-print-fix.jpg',
    featuredImageAlt: 'Commercial kitchen dot matrix printer producing 2-ply kitchen order ticket with replacement ribbon',
    featuredImageTitle: 'Dot Matrix Kitchen Printer Faded Text and Ribbon Replacement',
  },
  {
    slug: 'bixolon-printer-cutting-receipt-wrong-fix',
    featuredImage: '/images/articles/bixolon-printer-cutting-receipt-wrong-fix.jpg',
    featuredImageAlt: 'Thermal receipt printer with open hood showing metal guillotine autocutter blade mechanism and receipt paper',
    featuredImageTitle: 'Bixolon Thermal Receipt Printer Auto-Cutter Troubleshooting',
  },
  {
    slug: 'bixolon-printer-utility-not-detecting-printer-fix',
    featuredImage: '/images/articles/bixolon-printer-utility-not-detecting-printer-fix.jpg',
    featuredImageAlt: 'Laptop technician running receipt printer configuration utility connected via USB cable to printer',
    featuredImageTitle: 'Bixolon Unified Printer Utility Detection and Port Configuration',
  },
  {
    slug: 'bixolon-printer-chrome-os-not-detecting-fix',
    featuredImage: '/images/articles/bixolon-printer-chrome-os-not-detecting-fix.jpg',
    featuredImageAlt: 'Chromebook displaying ChromeOS printer settings next to thermal receipt printer on counter',
    featuredImageTitle: 'ChromeOS Chromebook Bixolon Printer Setup and Driverless CUPS Config',
  },
  {
    slug: 'bixolon-wristband-printer-not-printing-fix',
    featuredImage: '/images/articles/bixolon-wristband-printer-not-printing-fix.jpg',
    featuredImageAlt: 'Specialized desktop medical wristband printer printing vinyl patient barcode ID wristband at clinic desk',
    featuredImageTitle: 'Bixolon Healthcare Wristband Printer Troubleshooting and Calibration',
  },
  {
    slug: 'bixolon-printer-static-ip-not-connecting-fix',
    featuredImage: '/images/articles/bixolon-printer-static-ip-not-connecting-fix.jpg',
    featuredImageAlt: 'Rear panel of thermal receipt printer with blue Ethernet RJ45 network cable and router',
    featuredImageTitle: 'Bixolon Ethernet Printer Static IP Configuration and Network Setup',
  },
];

async function main() {
  console.log(`Starting update for ${updates.length} Bixolon articles...`);

  for (const item of updates) {
    const updated = await prisma.article.updateMany({
      where: { slug: item.slug },
      data: {
        featuredImage: item.featuredImage,
        featuredImageAlt: item.featuredImageAlt,
        featuredImageTitle: item.featuredImageTitle,
      },
    });

    console.log(`Updated ${item.slug}: ${updated.count} record(s) modified.`);
  }

  console.log('Finished updating Bixolon articles!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
