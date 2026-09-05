import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const updates = [
  {
    slug: 'brother-printer-error-ts-01',
    sourceImg: 'brother_ts01_error',
    destImg: 'brother-printer-error-ts-01.jpg'
  },
  {
    slug: 'brother-printer-error-ts-02',
    sourceImg: 'brother_ts02_error',
    destImg: 'brother-printer-error-ts-02.jpg'
  },
  {
    slug: 'brother-printer-wont-connect-to-wlan-access-point',
    sourceImg: 'brother_wlan_setup',
    destImg: 'brother-printer-wont-connect-to-wlan-access-point.jpg'
  },
  {
    slug: 'brother-printer-network-configuration-page-how-to-print',
    sourceImg: 'brother_network_config_page',
    destImg: 'brother-printer-network-configuration-page-how-to-print.jpg'
  },
  {
    slug: 'brother-printer-error-ts-07',
    sourceImg: 'brother_ts07_error',
    destImg: 'brother-printer-error-ts-07.jpg'
  },
  {
    slug: 'brother-printer-mac-address-filter-router',
    sourceImg: 'brother_mac_filtering',
    destImg: 'brother-printer-mac-address-filter-router.jpg'
  },
  {
    slug: 'brother-printer-error-ts-04',
    sourceImg: 'brother_ts04_error',
    destImg: 'brother-printer-error-ts-04.jpg'
  },
  {
    slug: 'brother-printer-wps-button-not-connecting',
    sourceImg: 'brother_wps_button',
    destImg: 'brother-printer-wps-button-not-connecting.jpg'
  },
  {
    slug: 'brother-printer-error-ts-08',
    sourceImg: 'brother_ts08_error',
    destImg: 'brother-printer-error-ts-08.jpg'
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
