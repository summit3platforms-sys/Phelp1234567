import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const updates = [
  {
    slug: 'munbyn-barcode-not-scanning',
    sourceImg: 'munbyn_barcode_scanning',
    destImg: 'munbyn-barcode-not-scanning.jpg'
  },
  {
    slug: 'munbyn-labels-printing-too-light',
    sourceImg: 'munbyn_labels_too_light',
    destImg: 'munbyn-labels-printing-too-light.jpg'
  },
  {
    slug: 'munbyn-printer-shipstation-setup',
    sourceImg: 'munbyn_shipstation_setup',
    destImg: 'munbyn-printer-shipstation-setup.jpg'
  },
  {
    slug: 'munbyn-printer-self-test-page',
    sourceImg: 'munbyn_self_test_page',
    destImg: 'munbyn-printer-self-test-page.jpg'
  },
  {
    slug: 'munbyn-printer-skipping-labels',
    sourceImg: 'munbyn_skipping_labels',
    destImg: 'munbyn-printer-skipping-labels.jpg'
  },
  {
    slug: 'munbyn-printer-offline-windows-11',
    sourceImg: 'munbyn_offline_win11',
    destImg: 'munbyn-printer-offline-windows-11.jpg'
  },
  {
    slug: 'munbyn-rw402b-not-printing',
    sourceImg: 'munbyn_rw402b_not_printing',
    destImg: 'munbyn-rw402b-not-printing.jpg'
  },
  {
    slug: 'munbyn-p44s-bluetooth-pairing-problem',
    sourceImg: 'munbyn_p44s_bluetooth',
    destImg: 'munbyn-p44s-bluetooth-pairing-problem.jpg'
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

    const updated = await prisma.article.updateMany({
      where: { slug: item.slug },
      data: {
        featuredImage: `/images/articles/${item.destImg}`
      }
    });

    console.log(`✅ Updated ${item.slug} (count: ${updated.count})`);
  }
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
