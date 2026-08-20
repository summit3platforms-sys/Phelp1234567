import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const updates = [
  {
    slug: 'kodak-printer-ink-cartridge-not-recognized',
    image: '/images/articles/kodak-printer-ink-cartridge-not-recognized.jpg',
    alt: 'A close-up photograph of a finger inserting a clean black Kodak 30XL ink cartridge into the carriage slot of an inkjet printer',
    caption: 'Installing a new ink cartridge in a Kodak printer'
  },
  {
    slug: 'kodak-printer-printing-blank-pages',
    image: '/images/articles/kodak-printer-printing-blank-pages.jpg',
    alt: 'A photograph of a person holding up a completely blank printed sheet of paper coming out of a Kodak printer',
    caption: 'Troubleshooting a Kodak printer printing blank pages'
  },
  {
    slug: 'kodak-printer-offline-windows-11',
    image: '/images/articles/kodak-printer-offline-windows-11.jpg',
    alt: 'A close-up photo of a computer screen showing the Windows 11 printer queue settings page with a Kodak printer labeled offline',
    caption: 'Checking Kodak printer offline status in Windows 11'
  },
  {
    slug: 'kodak-step-printer-orange-light-flashing',
    image: '/images/articles/kodak-step-printer-orange-light-flashing.jpg',
    alt: 'A close-up photograph of a white Kodak Step instant mobile printer with its orange status LED blinking',
    caption: 'Resolving Kodak Step orange light flashing errors'
  },
  {
    slug: 'kodak-printer-calibration-sheet-error',
    image: '/images/articles/kodak-printer-calibration-sheet-error.jpg',
    alt: 'A photo of a person inserting the blue barcode calibration sheet into a Kodak photo printer dock tray',
    caption: 'Correct loading of the ZINK calibration Smart Sheet'
  },
  {
    slug: 'kodak-photo-printer-bluetooth-pairing-failed',
    image: '/images/articles/kodak-photo-printer-bluetooth-pairing-failed.jpg',
    alt: 'A photo of a smartphone screen showing Bluetooth pairing failed message next to a Kodak photo printer dock',
    caption: 'Pairing failure troubleshooting for Kodak mobile printers'
  },
  {
    slug: 'how-to-clean-kodak-printhead-clogged',
    image: '/images/articles/how-to-clean-kodak-printhead-clogged.jpg',
    alt: 'A close-up photo of a printhead unit being wiped with a dry microfiber cloth, showing the gold contact pins',
    caption: 'Wiping electrical contacts on the back of a Kodak printhead'
  }
];

async function main() {
  for (const update of updates) {
    try {
      const result = await prisma.article.update({
        where: { slug: update.slug },
        data: {
          featuredImage: update.image,
          featuredImageAlt: update.alt,
          featuredImageCaption: update.caption
        }
      });
      console.log(`✅ Backfilled Image for: "${result.title}"`);
    } catch (e: any) {
      console.log(`⚠️ Error backfilling "${update.slug}": ${e.message}`);
    }
  }
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
