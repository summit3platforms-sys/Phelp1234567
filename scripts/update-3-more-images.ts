import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const updates = [
  {
    slug: 'hp-printer-printing-very-slowly',
    imageFile: 'hp_printer_slow_1785847720713.jpg',
    title: 'HP Printer Printing Slowly',
    alt: 'A clock morphing into an HP printer, showing slow print speed concept'
  },
  {
    slug: 'hp-printer-paper-curling-out-of-tray',
    imageFile: 'hp_paper_curling_1785847731073.jpg',
    title: 'HP Printer Paper Curling',
    alt: 'A piece of paper curling excessively as it exits a modern HP laser printer'
  },
  {
    slug: 'hp-printer-vibrating-or-shaking',
    imageFile: 'hp_printer_vibrating_1785847743643.jpg',
    title: 'HP Printer Vibrating',
    alt: 'An HP printer vibrating strongly on a wooden desk with motion blur effect'
  }
];

const sourceDir = '/Users/agentkuldeep/.gemini/antigravity/brain/3ac9eeeb-02cb-4176-b1a6-586aed1faecc';
const targetDir = '/Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/public/images/articles';

(async () => {
  for (const update of updates) {
    const sourcePath = path.join(sourceDir, update.imageFile);
    const targetFilename = update.imageFile.replace(/_\d+\.jpg$/, '.jpg');
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
