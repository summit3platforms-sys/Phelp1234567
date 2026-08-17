import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

const updates = [
  {
    slug: 'hp-color-laserjet-m283fdw-error-59',
    imgPath: '/Users/agentkuldeep/.gemini/antigravity/brain/3ac9eeeb-02cb-4176-b1a6-586aed1faecc/hp_m283fdw_error_59_1785499736286.jpg',
    alt: 'HP Color LaserJet Pro M283fdw printer displaying Error 59 on touchscreen panel in office',
    title: 'HP Color LaserJet M283fdw Error 59',
    caption: 'Error 59 on HP Color LaserJet M283fdw usually indicates a fuser motor or fuser transfer belt communication fault.'
  },
  {
    slug: 'hp-laserjet-pro-m15w-fuser-error',
    imgPath: '/Users/agentkuldeep/.gemini/antigravity/brain/3ac9eeeb-02cb-4176-b1a6-586aed1faecc/hp_m15w_fuser_error_1785499774663.jpg',
    alt: 'HP LaserJet Pro M15w printer displaying red warning error status light on home desk',
    title: 'HP LaserJet Pro M15w Fuser Error',
    caption: 'Fuser errors on compact HP LaserJet printers point to fuser element heating failure or power supply connection issue.'
  }
];

async function run() {
  for (const item of updates) {
    if (!fs.existsSync(item.imgPath)) {
      console.error(`File missing: ${item.imgPath}`);
      continue;
    }
    const data = fs.readFileSync(item.imgPath);
    const base64 = 'data:image/jpeg;base64,' + data.toString('base64');

    const updated = await prisma.article.update({
      where: { slug: item.slug },
      data: {
        featuredImage: base64,
        featuredImageAlt: item.alt,
        featuredImageTitle: item.title,
        featuredImageCaption: item.caption,
      }
    });

    console.log(`Updated: ${updated.title} (${base64.length} bytes)`);
  }
}

run()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
