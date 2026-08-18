import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const sourceDir = '/Users/agentkuldeep/.gemini/antigravity/brain/3ac9eeeb-02cb-4176-b1a6-586aed1faecc';
const targetDir = '/Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/public/images/articles';

const updates = [
  { slug: 'hp-laserjet-50-2-fuser-error-fix', filePattern: 'hp_laserjet_fuser_error', alt: 'HP LaserJet printer displaying a 50.2 fuser error code on its control panel', caption: 'How to fix HP LaserJet 50.2 fuser error' },
  { slug: 'bixolon-printer-stuck-on-yellow-light', filePattern: 'bixolon_yellow_light', alt: 'Bixolon receipt printer with a solid yellow status light illuminated in an office', caption: 'Bixolon printer stuck on yellow light' },
  { slug: 'how-to-reset-a-bixolon-printer', filePattern: 'bixolon_reset', alt: 'Finger pressing the reset button on a Bixolon receipt printer', caption: 'Performing a soft reset on a Bixolon printer' },
  { slug: 'bixolon-spp-r200-error', filePattern: 'bixolon_spp_r200_error', alt: 'Bixolon SPP-R200 mobile printer showing an error status', caption: 'Bixolon SPP-R200 error troubleshooting' },
  { slug: 'bixolon-printer-cuts-paper-but-wont-print', filePattern: 'bixolon_cuts_not_printing', alt: 'Bixolon receipt printer cutting a blank piece of receipt paper', caption: 'Bixolon printer cuts paper but will not print text' },
  { slug: 'munbyn-label-printer-keeps-beeping', filePattern: 'munbyn_beeping', alt: 'Pink Munbyn label printer with a glowing red error light', caption: 'Munbyn label printer beeping error' },
  { slug: 'hp-laserjet-m1136-driver-windows-11', filePattern: 'hp_m1136_windows_11', alt: 'HP LaserJet M1136 printer connected to a Windows 11 laptop', caption: 'HP LaserJet M1136 driver for Windows 11' },
  { slug: 'hp-envy-6055e-blinking-purple-light', filePattern: 'hp_envy_6055e_purple', alt: 'HP Envy 6055e printer with its edge lighting glowing purple', caption: 'HP Envy 6055e blinking purple light' },
  { slug: 'bixolon-printer-toast-pos-error', filePattern: 'bixolon_toast_pos', alt: 'Bixolon receipt printer placed next to a Toast POS terminal', caption: 'Bixolon printer Toast POS setup and errors' }
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
