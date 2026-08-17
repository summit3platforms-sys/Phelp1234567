import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const updates = [
  {
    slug: 'hp-printer-grinding-noise-when-printing',
    imageFile: 'hp_printer_grinding_noise_1785846778927.jpg',
    title: 'HP Printer Grinding Noise',
    alt: 'Inside an HP inkjet printer showing paper path and rollers'
  },
  {
    slug: 'hp-deskjet-4155e-wifi-setup-guide',
    imageFile: 'hp_deskjet_wifi_router_1785846808295.jpg',
    title: 'HP DeskJet 4155e Wi-Fi Setup',
    alt: 'HP DeskJet printer next to a Wi-Fi router with glowing blue and purple lights'
  },
  {
    slug: 'hp-officejet-pro-9130e-error-fix',
    imageFile: 'hp_officejet_error_panel_1785846821019.jpg',
    title: 'HP OfficeJet Pro Error Panel',
    alt: 'Close-up of an HP OfficeJet control panel showing an error code'
  },
  {
    slug: 'hp-envy-6455e-setup-problems',
    imageFile: 'hp_envy_bluetooth_setup_1785846873104.jpg',
    title: 'HP Envy Bluetooth Setup',
    alt: 'HP Envy printer and a smartphone showing a Bluetooth connection icon on a desk'
  },
  {
    slug: 'hp-officejet-200-mobile-printer-not-charging',
    imageFile: 'hp_officejet_mobile_charging_1785846883365.jpg',
    title: 'HP OfficeJet 200 Mobile Printer Charging',
    alt: 'HP OfficeJet mobile printer plugged into a wall outlet'
  },
  {
    slug: 'hp-toner-streaking-down-page',
    imageFile: 'hp_toner_streaking_1785846893639.jpg',
    title: 'HP Toner Streaking Output',
    alt: 'A laser printer printing a page with faint vertical toner streaks'
  },
  {
    slug: 'hp-printer-ghosting-duplicate-faint-image',
    imageFile: 'hp_printer_ghosting_1785846919867.jpg',
    title: 'HP Printer Ghosting Effect',
    alt: 'A piece of paper with faint ghosted duplicate text out of a laser printer'
  },
  {
    slug: 'hp-printer-banding-horizontal-stripes',
    imageFile: 'hp_printer_banding_1785846930882.jpg',
    title: 'HP Printer Horizontal Banding',
    alt: 'An inkjet printout with distinct horizontal banding lines across an image'
  },
  {
    slug: 'hp-borderless-printing-grayed-out',
    imageFile: 'hp_borderless_grayed_out_1785846941150.jpg',
    title: 'HP Borderless Printing Grayed Out',
    alt: 'Computer monitor displaying a print dialog with a borderless printing option'
  }
];

const sourceDir = '/Users/agentkuldeep/.gemini/antigravity/brain/3ac9eeeb-02cb-4176-b1a6-586aed1faecc';
const targetDir = '/Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/public/images/articles';

(async () => {
  for (const update of updates) {
    const sourcePath = path.join(sourceDir, update.imageFile);
    const targetFilename = update.imageFile.replace(/_\d+\.jpg$/, '.jpg'); // clean up timestamp
    const targetPath = path.join(targetDir, targetFilename);

    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, targetPath);
      const relativePath = '/images/articles/' + targetFilename;

      await prisma.article.update({
        where: { slug: update.slug },
        data: {
          featuredImage: relativePath,
          featuredImageAlt: update.alt,
          featuredImageTitle: update.title
        }
      });
      console.log('✅ Updated ' + update.slug);
    } else {
      console.log('❌ Image not found: ' + sourcePath);
    }
  }
  await prisma.$disconnect();
})();
