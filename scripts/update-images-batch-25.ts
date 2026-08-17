import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const sourceDir = '/Users/agentkuldeep/.gemini/antigravity/brain/3ac9eeeb-02cb-4176-b1a6-586aed1faecc';
const targetDir = '/Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/public/images/articles';

const updates = [
  { slug: 'hp-envy-4520-print-quality-lines', filePattern: 'hp_envy_4520_lines', alt: 'HP Envy 4520 printing a photograph with horizontal white streaks', caption: 'Fixing HP Envy 4520 printing lines' },
  { slug: 'hp-printer-static-ip-setup-guide', filePattern: 'hp_static_ip', alt: 'HP Embedded Web Server network settings page showing static IP configuration', caption: 'Setting a static IP for an HP printer' },
  { slug: 'hp-deskjet-2755e-cartridge-not-recognized', filePattern: 'hp_2755e_cartridge', alt: 'HP DeskJet 2755e with an open ink door and orange warning light', caption: 'HP DeskJet 2755e cartridge not recognized error' },
  { slug: 'munbyn-printer-stopped-working-after-chromebook-update', filePattern: 'munbyn_chromebook_update', alt: 'Chromebook showing a printer offline error next to a Munbyn printer', caption: 'Fixing Munbyn Chromebook connection after an update' },
  { slug: 'bixolon-printer-bluetooth-pairing-failed', filePattern: 'bixolon_pairing_failed', alt: 'Bixolon mobile printer next to an iPad showing a Bluetooth pairing failed error', caption: 'Bixolon Bluetooth pairing failed' },
  { slug: 'bixolon-printer-beeping', filePattern: 'bixolon_beeping', alt: 'Bixolon receipt printer emitting loud beeping error sounds', caption: 'Troubleshooting Bixolon printer beeping alerts' },
  { slug: 'bixolon-printer-paper-jam-fix', filePattern: 'bixolon_paper_jam', alt: 'Bixolon printer with a crumpled receipt paper jam inside', caption: 'How to fix a Bixolon paper jam' },
  { slug: 'munbyn-printer-error-code-list', filePattern: 'munbyn_error_codes', alt: 'Munbyn error codes manual next to a Munbyn label printer', caption: 'Munbyn printer error codes and their meanings' }
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
