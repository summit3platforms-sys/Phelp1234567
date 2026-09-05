import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const updates = [
  {
    slug: 'kodak-dock-plus-flashing-lights-error-codes',
    sourceImg: 'kodak_dock_plus_flashing',
    destImg: 'kodak-dock-plus-flashing-lights-error-codes.jpg'
  },
  {
    slug: 'kodak-printer-lines-on-photos-printhead-cleaning',
    sourceImg: 'kodak_lines_on_photos',
    destImg: 'kodak-printer-lines-on-photos-printhead-cleaning.jpg'
  },
  {
    slug: 'kodak-mini-shot-shutter-stuck-black-photos',
    sourceImg: 'kodak_mini_shot_stuck',
    destImg: 'kodak-mini-shot-shutter-stuck-black-photos.jpg'
  },
  {
    slug: 'kodak-printer-spooler-error-windows',
    sourceImg: 'kodak_spooler_error',
    destImg: 'kodak-printer-spooler-error-windows.jpg'
  },
  {
    slug: 'kodak-printer-scanner-not-working',
    sourceImg: 'kodak_scanner_not_working',
    destImg: 'kodak-printer-scanner-not-working.jpg'
  }
];

async function main() {
  const sourceDir = '/Users/agentkuldeep/.gemini/antigravity/brain/57b50704-b9a0-48c2-adcb-6f794962c346';
  const destDir = '/Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/public/images/articles';

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const filesInBrain = fs.readdirSync(sourceDir);

  for (const item of updates) {
    const matchedFile = filesInBrain.find(f => f.startsWith(item.sourceImg) && f.endsWith('.jpg'));
    if (!matchedFile) {
      console.warn(`⚠️ Could not find source image matching prefix ${item.sourceImg}`);
      continue;
    }

    const sourcePath = path.join(sourceDir, matchedFile);
    const destPath = path.join(destDir, item.destImg);

    fs.copyFileSync(sourcePath, destPath);
    console.log(`📸 Copied ${matchedFile} -> ${item.destImg}`);

    await prisma.article.updateMany({
      where: { slug: item.slug },
      data: { featuredImage: `/images/articles/${item.destImg}` }
    });
    console.log(`✅ Updated ${item.slug}`);
  }
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
