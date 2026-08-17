import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const sourceDir = '/Users/agentkuldeep/.gemini/antigravity/brain/3ac9eeeb-02cb-4176-b1a6-586aed1faecc';
const targetDir = '/Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/public/images/articles';

const updates = [
  { slug: 'bixolon-printer-not-showing-up-in-devices', filePattern: 'bixolon_not_showing', alt: 'Laptop screen displaying broken connection icon next to Bixolon printer', caption: 'Fixing a Bixolon printer not showing up in devices' },
  { slug: 'hp-laserjet-m209dwe-keeps-going-offline', filePattern: 'hp_m209dwe_offline', alt: 'HP LaserJet printer with red Wi-Fi disconnected icon', caption: 'HP LaserJet M209dwe offline issue' },
  { slug: 'munbyn-printer-prints-half-label-then-stops', filePattern: 'munbyn_half_label', alt: 'Thermal label printer stopped halfway through printing a shipping label', caption: 'Munbyn printer stuck printing half a label' },
  { slug: 'hp-deskjet-3755-wifi-setup-without-app', filePattern: 'hp_deskjet_3755_wifi', alt: 'HP DeskJet 3755 printer with glowing Wi-Fi setup buttons', caption: 'Setting up HP DeskJet 3755 Wi-Fi manually' },
  { slug: 'bixolon-printer-overheating', filePattern: 'bixolon_overheating', alt: 'Thermal receipt printer with red warning lights and heat waves', caption: 'Bixolon printer overheating warning' },
  { slug: 'bixolon-printer-power-light-blinking-wont-turn-on', filePattern: 'bixolon_wont_turn_on', alt: 'POS receipt printer with blinking red power light', caption: 'Bixolon printer showing power errors' },
  { slug: 'hp-laserjet-pro-m404dn-fuser-error', filePattern: 'hp_m404dn_fuser', alt: 'HP LaserJet Pro with open back panel showing fuser unit', caption: 'HP LaserJet Pro M404dn fuser error' },
  { slug: 'hp-deskjet-3755-flashing-lights-meaning', filePattern: 'hp_3755_flashing_lights', alt: 'Close up of HP DeskJet 3755 control panel with flashing warning lights', caption: 'Deciphering HP DeskJet 3755 flashing lights' },
  { slug: 'hp-printer-driver-unavailable-windows-11', filePattern: 'hp_driver_unavailable', alt: 'Windows 11 computer screen showing printer driver error', caption: 'Resolving driver unavailable error in Windows 11' },
  { slug: 'munbyn-printer-not-showing-up-on-mac', filePattern: 'munbyn_mac_not_showing', alt: 'Thermal label printer plugged into MacBook with broken connection symbol', caption: 'Troubleshooting Munbyn printer connection on macOS' }
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
