import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const updates = [
  {
    slug: 'hp-envy-5055-offline-but-connected',
    sourceImg: 'hp_envy_5055_offline_1788248442896.jpg',
    destImg: 'hp-envy-5055-offline-but-connected.jpg'
  },
  {
    slug: 'hp-smart-app-stuck-searching-for-printer',
    sourceImg: 'hp_smart_app_searching_178824857963.jpg', // let's check exact filename or match prefix
    destImg: 'hp-smart-app-stuck-searching-for-printer.jpg'
  },
  {
    slug: 'hp-printer-error-0xc19a0003-problem-with-printhead',
    sourceImg: 'hp_printhead_error_c19a_1788248475128.jpg',
    destImg: 'hp-printer-error-0xc19a0003-problem-with-printhead.jpg'
  },
  {
    slug: 'hp-smart-tank-5101-printhead-error',
    sourceImg: 'hp_smart_tank_5101_1788248493479.jpg',
    destImg: 'hp-smart-tank-5101-printhead-error.jpg'
  },
  {
    slug: 'hp-printer-troubleshooting',
    sourceImg: 'hp_troubleshooting_master_1788248510277.jpg',
    destImg: 'hp-printer-troubleshooting.jpg'
  },
  {
    slug: 'hp-printer-error-codes',
    sourceImg: 'hp_error_codes_master_1788248526245.jpg',
    destImg: 'hp-printer-error-codes.jpg'
  },
  {
    slug: 'hp-printer-error-messages',
    sourceImg: 'hp_error_messages_master_1788248544101.jpg',
    destImg: 'hp-printer-error-messages.jpg'
  },
  {
    slug: 'hp-printer-not-working-after-windows-update',
    sourceImg: 'hp_windows_update_master_1788248566767.jpg',
    destImg: 'hp-printer-not-working-after-windows-update.jpg'
  },
  {
    slug: 'hp-printer-driver-not-installing',
    sourceImg: 'hp_driver_not_installing_1788248585145.jpg',
    destImg: 'hp-printer-driver-not-installing.jpg'
  },
  {
    slug: 'hp-photosmart-c4780-troubleshooting',
    sourceImg: 'hp_c4780_troubleshooting_1788248603022.jpg',
    destImg: 'hp-photosmart-c4780-troubleshooting.jpg'
  },
  {
    slug: 'hp-officejet-pro-8025e-wifi-keeps-dropping',
    sourceImg: 'hp_officejet_8025e_wifi_1788248637417.jpg',
    destImg: 'hp-officejet-pro-8025e-wifi-keeps-dropping.jpg'
  },
  {
    slug: 'hp-deskjet-2755e-paper-jam-no-paper',
    sourceImg: 'hp_deskjet_2755e_jam_1788248658453.jpg',
    destImg: 'hp-deskjet-2755e-paper-jam-no-paper.jpg'
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
    // Find matching file by prefix if exact filename differs slightly
    const prefix = item.sourceImg.split('_1788')[0];
    const matchedFile = filesInBrain.find(f => f.startsWith(prefix) && f.endsWith('.jpg'));

    if (!matchedFile) {
      console.warn(`⚠️ Could not find source image matching prefix ${prefix}`);
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
