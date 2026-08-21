import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const updates = [
  {
    slug: 'kodak-printer-error-6102',
    sourceImg: 'kodak_error_6102_1787299076772.jpg',
    destImg: 'kodak-printer-error-6102.jpg',
    alt: 'Jammed document in a Kodak scanner automatic document feeder',
    caption: 'Carefully removing a jammed document from the ADF on top of the printer'
  },
  {
    slug: 'kodak-printer-loading-paper-error',
    sourceImg: 'kodak_loading_paper_1787299093798.jpg',
    destImg: 'kodak-printer-loading-paper-error.jpg',
    alt: 'Loading photo paper into a Kodak printer tray',
    caption: 'Correctly aligning a stack of photo paper with the guides in the paper tray'
  }
];

async function main() {
  const sourceDir = '/Users/agentkuldeep/.gemini/antigravity/brain/57b50704-b9a0-48c2-adcb-6f794962c346';
  const destDir = '/Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/public/images/articles';

  for (const update of updates) {
    const sourcePath = path.join(sourceDir, update.sourceImg);
    const destPath = path.join(destDir, update.destImg);

    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
      console.log('Copied image to ' + destPath);

      await prisma.article.updateMany({
        where: { slug: update.slug },
        data: {
          featuredImage: '/images/articles/' + update.destImg,
          featuredImageAlt: update.alt,
          featuredImageCaption: update.caption
        }
      });
      console.log('Updated database for ' + update.slug);
    } else {
      console.log('Source image not found: ' + sourcePath);
    }
  }
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
