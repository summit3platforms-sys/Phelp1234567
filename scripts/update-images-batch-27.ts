import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const sourceDir = '/Users/agentkuldeep/.gemini/antigravity/brain/3ac9eeeb-02cb-4176-b1a6-586aed1faecc';
const targetDir = '/Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/public/images/articles';

const updates = [
  { slug: 'bixolon-printer-cuts-paper-but-wont-print', filePattern: 'bixolon_cuts_not_printing', alt: 'Bixolon receipt printer cutting a blank piece of receipt paper', caption: 'Bixolon printer cuts paper but will not print text' },
  { slug: 'munbyn-printer-shopify-4x6-labels', filePattern: 'munbyn_shopify_labels', alt: 'Pink Munbyn label printer successfully printing 4x6 Shopify shipping labels', caption: 'Printing Shopify 4x6 labels on Munbyn printer' },
  { slug: 'munbyn-printer-printing-blank-labels', filePattern: 'munbyn_blank_labels', alt: 'Pink Munbyn label printer printing completely blank labels', caption: 'Munbyn printer spitting out blank labels' },
  { slug: 'munbyn-label-size-settings-4x6', filePattern: 'munbyn_4x6_settings', alt: 'Computer screen showing 4x6 label size settings with a Munbyn printer', caption: 'Configuring 4x6 label size settings for Munbyn' },
  { slug: 'hp-officejet-pro-6978-not-printing-black', filePattern: 'hp_6978_no_black', alt: 'HP OfficeJet Pro 6978 printing a test page where black text is missing', caption: 'HP OfficeJet Pro 6978 missing black ink' },
  { slug: 'bixolon-printer-printing-garbled-text', filePattern: 'bixolon_garbled_text', alt: 'Bixolon receipt printer printing a long receipt full of garbled random characters', caption: 'Bixolon printer printing garbled text and symbols' },
  { slug: 'hp-printer-burning-smell', filePattern: 'hp_burning_smell', alt: 'HP laser printer with faint wisps of smoke coming out of the vent', caption: 'HP printer emitting a burning smell or smoke' },
  { slug: 'hp-neverstop-laser-refill-not-printing', filePattern: 'hp_neverstop_refill', alt: 'HP Neverstop Laser printer with a refill toner kit inserted showing an error', caption: 'HP Neverstop Laser refill kit not printing' }
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
