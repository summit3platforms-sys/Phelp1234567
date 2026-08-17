import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const sourceDir = '/Users/agentkuldeep/.gemini/antigravity/brain/3ac9eeeb-02cb-4176-b1a6-586aed1faecc';
const targetDir = '/Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/public/images/articles';

const updates = [
  { slug: 'hp-printer-13-20-paper-jam-error-fix', filePattern: 'hp_13_20_jam', alt: 'Technician pointing to HP LaserJet screen with 13.20 paper jam error', caption: 'Diagnosing the HP 13.20 paper jam error' },
  { slug: 'hp-neverstop-toner-not-filling-correctly', filePattern: 'hp_neverstop_toner_fill', alt: 'Injecting a toner reload syringe into an HP Neverstop laser printer', caption: 'Fixing HP Neverstop toner refill issues' },
  { slug: 'hp-officejet-pro-8025e-not-printing-color', filePattern: 'hp_8025e_no_color', alt: 'HP OfficeJet Pro printing a color test page in black and white', caption: 'HP OfficeJet Pro 8025e color printing problems' },
  { slug: 'how-to-clean-munbyn-printer-head', filePattern: 'munbyn_clean_head', alt: 'Cleaning the thermal print head of a Munbyn label printer', caption: 'How to safely clean a Munbyn print head' },
  { slug: 'hp-wireless-direct-not-appearing-on-phone', filePattern: 'hp_wireless_direct_phone', alt: 'Smartphone showing Wi-Fi networks missing the HP printer connection', caption: 'HP Wireless Direct not showing on mobile' },
  { slug: 'hp-printer-error-79-service-error-real-fix', filePattern: 'hp_error_79', alt: 'HP LaserJet screen displaying Error 79 Service Error', caption: 'Resolving HP Error 79 Service Error' },
  { slug: 'bixolon-srp-e300-troubleshooting', filePattern: 'bixolon_srp_e300', alt: 'Bixolon SRP-E300 thermal printer next to a retail POS system', caption: 'Bixolon SRP-E300 troubleshooting in a retail setting' },
  { slug: 'hp-envy-7855-duplex-printing-not-working', filePattern: 'hp_envy_7855_duplex', alt: 'HP Envy 7855 attempting to print double-sided but printing on two pages', caption: 'HP Envy 7855 duplex printing failure' },
  { slug: 'hp-smart-tank-720-ink-not-flowing', filePattern: 'hp_smart_tank_720', alt: 'HP Smart Tank 720 with visible and partially empty ink reservoirs', caption: 'HP Smart Tank 720 ink flow issues' }
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
