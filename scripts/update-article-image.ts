import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function updateImage() {
  const imagePath = './public/images/hp-officejet-6500-wireless-setup-windows-11.jpg';
  const data = fs.readFileSync(imagePath);
  const base64 = 'data:image/jpeg;base64,' + data.toString('base64');

  const updated = await prisma.article.update({
    where: { slug: 'hp-officejet-6500-wireless-setup-windows-11' },
    data: {
      featuredImage: base64,
      featuredImageAlt: 'HP OfficeJet 6500 printer connected wirelessly to a Windows 11 laptop with Wi-Fi signal arcs',
      featuredImageTitle: 'HP OfficeJet 6500 Wireless Setup on Windows 11',
      featuredImageCaption: 'The HP OfficeJet 6500 connecting to a Windows 11 laptop over Wi-Fi — no official HP driver required.',
    }
  });

  console.log('Updated:', updated.title);
  console.log('Image length:', updated.featuredImage?.length ?? 0);
}

updateImage()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
