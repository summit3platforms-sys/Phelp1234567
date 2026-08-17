import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const sourceDir = '/Users/agentkuldeep/.gemini/antigravity/brain/3ac9eeeb-02cb-4176-b1a6-586aed1faecc';
const targetDir = '/Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/public/images/articles';

const updates = [
  { slug: 'bixolon-spp-r310-not-connecting', filePattern: 'bixolon_r310_bluetooth', alt: 'Bixolon SPP-R310 next to a smartphone showing a Bluetooth pairing error', caption: 'Fixing Bixolon SPP-R310 Bluetooth connection issues' },
  { slug: 'how-to-update-bixolon-printer-firmware', filePattern: 'bixolon_firmware_update', alt: 'Bixolon printer connected to laptop updating firmware', caption: 'Updating Bixolon printer firmware' },
  { slug: 'munbyn-printer-red-light-stays-on-not-printing', filePattern: 'munbyn_red_light_solid', alt: 'Munbyn label printer with solid red warning light', caption: 'Munbyn printer showing a solid red light' },
  { slug: 'munbyn-printer-red-light-blinking-fix', filePattern: 'munbyn_red_light_blinking', alt: 'Munbyn label printer with flashing red warning light', caption: 'Munbyn printer blinking red light error' },
  { slug: 'munbyn-chromebook-extension-not-printing', filePattern: 'munbyn_chromebook_error', alt: 'Chromebook displaying Munbyn extension error', caption: 'Fixing Munbyn Chromebook extension issues' },
  { slug: 'hp-printer-double-feeding-adf', filePattern: 'hp_double_feed_adf', alt: 'HP printer ADF pulling two sheets of paper simultaneously', caption: 'HP printer ADF double-feeding issue' },
  { slug: 'hp-envy-photo-7855-paper-jam-error', filePattern: 'hp_envy_7855_paper_jam', alt: 'HP Envy Photo 7855 with crumpled paper jammed in the tray', caption: 'HP Envy Photo 7855 paper jam' },
  { slug: 'munbyn-itpp941-troubleshooting', filePattern: 'munbyn_itpp941_troubleshoot', alt: 'Technician examining a Munbyn ITPP941 printer', caption: 'Troubleshooting the Munbyn ITPP941' },
  { slug: 'munbyn-printer-driver-wont-install-windows', filePattern: 'munbyn_windows_driver', alt: 'Windows 10 showing a failed Munbyn driver installation', caption: 'Munbyn driver installation failure on Windows' },
  { slug: 'munbyn-label-misaligned-printing', filePattern: 'munbyn_misaligned_label', alt: 'Munbyn printer printing misaligned text off the edge of a label', caption: 'Fixing misaligned Munbyn label printing' }
];

async function main() {
  const files = fs.readdirSync(sourceDir);
  
  for (const update of updates) {
    const matchedFile = files.find(f => f.startsWith(update.filePattern + '_') && f.endsWith('.jpg'));
    
    if (matchedFile) {
      const sourcePath = path.join(sourceDir, matchedFile);
      const targetFileName = `${update.slug}.jpg`;
      const targetPath = path.join(targetDir, targetFileName);
      
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied ${matchedFile} to ${targetFileName}`);
      
      try {
        await prisma.article.update({
          where: { slug: update.slug },
          data: {
            featuredImage: `/images/articles/${targetFileName}`,
            featuredImageAlt: update.alt,
            featuredImageCaption: update.caption
          }
        });
        console.log(`✅ Updated DB for: ${update.slug}`);
      } catch (e: any) {
        console.log(`⚠️ Failed to update DB for ${update.slug}:`, e.message);
      }
    } else {
      console.log(`❌ Could not find generated image for ${update.slug} matching pattern ${update.filePattern}`);
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
