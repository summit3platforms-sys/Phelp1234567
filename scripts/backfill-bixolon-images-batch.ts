import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const updates = [
  {
    slug: 'bixolon-printer-driver-not-installing',
    sourceImg: 'bixolon_driver_install',
    destImg: 'bixolon-printer-driver-not-installing.jpg'
  },
  {
    slug: 'bixolon-printer-printing-blank-receipts',
    sourceImg: 'bixolon_blank_receipt',
    destImg: 'bixolon-printer-printing-blank-receipts.jpg'
  },
  {
    slug: 'how-to-calibrate-a-bixolon-label-printer',
    sourceImg: 'bixolon_calibrate_label',
    destImg: 'how-to-calibrate-a-bixolon-label-printer.jpg'
  },
  {
    slug: 'bixolon-printer-driver-for-windows-11',
    sourceImg: 'bixolon_win11_driver',
    destImg: 'bixolon-printer-driver-for-windows-11.jpg'
  },
  {
    slug: 'bixolon-printer-usb-not-detected',
    sourceImg: 'bixolon_usb_not_detected',
    destImg: 'bixolon-printer-usb-not-detected.jpg'
  },
  {
    slug: 'bixolon-network-printer-offline',
    sourceImg: 'bixolon_network_offline',
    destImg: 'bixolon-network-printer-offline.jpg'
  },
  {
    slug: 'how-to-clean-bixolon-print-head',
    sourceImg: 'bixolon_clean_printhead',
    destImg: 'how-to-clean-bixolon-print-head.jpg'
  },
  {
    slug: 'bixolon-sdk-printer-open-error',
    sourceImg: 'bixolon_sdk_printer_open',
    destImg: 'bixolon-sdk-printer-open-error.jpg'
  },
  {
    slug: 'bixolon-printer-wont-connect-to-wi-fi',
    sourceImg: 'bixolon_wifi_connect',
    destImg: 'bixolon-printer-wont-connect-to-wi-fi.jpg'
  },
  {
    slug: 'bixolon-xd3-40-label-printer-error',
    sourceImg: 'bixolon_xd3_error',
    destImg: 'bixolon-xd3-40-label-printer-error.jpg'
  },
  {
    slug: 'bixolon-xd5-40-troubleshooting',
    sourceImg: 'bixolon_xd5_troubleshoot',
    destImg: 'bixolon-xd5-40-troubleshooting.jpg'
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
