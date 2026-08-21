import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const updates = [
  {
    slug: 'kodak-printer-error-3802',
    sourceImg: 'kodak_error_3802_1787298887626.jpg',
    destImg: 'kodak-printer-error-3802.jpg',
    alt: 'Kodak printer displaying error 3802 on LCD screen',
    caption: 'A Kodak all-in-one printer showing error 3802 on the control panel'
  },
  {
    slug: 'kodak-printer-error-code-105-3513',
    sourceImg: 'kodak_error_105_3513_1787298899202.jpg',
    destImg: 'kodak-printer-error-code-105-3513.jpg',
    alt: 'Empty printhead carriage inside a Kodak printer',
    caption: 'Inspecting the empty printhead carriage slot on a Kodak inkjet printer'
  },
  {
    slug: 'kodak-printer-printhead-error-fix',
    sourceImg: 'kodak_printhead_cleaning_1787298908442.jpg',
    destImg: 'kodak-printer-printhead-error-fix.jpg',
    alt: 'Cleaning golden electrical contacts of a Kodak printhead',
    caption: 'Gently cleaning the electrical contacts of the printhead to resolve recognition errors'
  },
  {
    slug: 'kodak-printer-error-code-3528',
    sourceImg: 'kodak_error_3528_1787298920539.jpg',
    destImg: 'kodak-printer-error-code-3528.jpg',
    alt: 'Jammed paper being pulled from the rear access panel of a Kodak printer',
    caption: 'Carefully removing jammed paper from the rear duplexer path'
  },
  {
    slug: 'kodak-printer-paper-feed-jam-fix',
    sourceImg: 'kodak_paper_rollers_1787298936078.jpg',
    destImg: 'kodak-printer-paper-feed-jam-fix.jpg',
    alt: 'Dusty rubber paper feed rollers inside a Kodak printer',
    caption: 'Paper feed rollers covered in paper dust can cause slipping and feed jams'
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
