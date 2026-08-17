import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const sourceDir = '/Users/agentkuldeep/.gemini/antigravity/brain/3ac9eeeb-02cb-4176-b1a6-586aed1faecc';
const targetDir = '/Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/public/images/articles';

const updates = [
  { slug: 'hp-neverstop-printer-error-light-decoded', filePattern: 'hp_neverstop_error_light', alt: 'HP Neverstop laser printer with glowing red error exclamation light', caption: 'Decoding the HP Neverstop error light' },
  { slug: 'bixolon-printer-self-test', filePattern: 'bixolon_self_test', alt: 'Bixolon receipt printer printing a diagnostic self-test', caption: 'Running a self-test on a Bixolon printer' }
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
