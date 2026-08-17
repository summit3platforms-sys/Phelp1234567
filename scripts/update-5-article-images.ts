import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

const updates = [
  {
    slug: 'hp-plus-printer-stuck-on-setup-screen',
    imgPath: '/Users/agentkuldeep/.gemini/antigravity/brain/3ac9eeeb-02cb-4176-b1a6-586aed1faecc/hp_plus_stuck_setup_1785499351812.jpg',
    alt: 'HP+ printer stuck on setup screen loading loop on a desk',
    title: 'HP+ Printer Stuck on Setup Screen',
    caption: 'When an HP+ printer gets stuck during setup, the issue is often tied to smart account activation or cloud pairing prerequisites.'
  },
  {
    slug: 'hp-laserjet-p4015-error-49-4c02',
    imgPath: '/Users/agentkuldeep/.gemini/antigravity/brain/3ac9eeeb-02cb-4176-b1a6-586aed1faecc/hp_p4015_error_49_1785499382799.jpg',
    alt: 'HP LaserJet P4015 printer displaying Error 49.4C02 on control panel in office',
    title: 'HP LaserJet P4015 Error 49.4C02',
    caption: 'Error 49.4C02 on HP LaserJet P4015 printers usually indicates a print job communication or firmware processing error.'
  },
  {
    slug: 'hp-printer-keeps-disconnecting-from-wifi',
    imgPath: '/Users/agentkuldeep/.gemini/antigravity/brain/3ac9eeeb-02cb-4176-b1a6-586aed1faecc/hp_wifi_disconnecting_1785499414670.jpg',
    alt: 'HP printer with glowing red Wi-Fi warning icon on desk',
    title: 'HP Printer Keeps Disconnecting From Wi-Fi',
    caption: 'Frequent Wi-Fi disconnections on HP printers are commonly caused by dual-band Wi-Fi router switching or power-saving sleep modes.'
  },
  {
    slug: 'hp-officejet-pro-9015e-error-0x610000f6',
    imgPath: '/Users/agentkuldeep/.gemini/antigravity/brain/3ac9eeeb-02cb-4176-b1a6-586aed1faecc/hp_9015e_error_1785499447973.jpg',
    alt: 'HP OfficeJet Pro 9015e displaying error 0x610000f6 on touchscreen panel',
    title: 'HP OfficeJet Pro 9015e Error 0x610000f6',
    caption: 'Error 0x610000f6 points to a paper jam sensor mechanism or printhead carriage blockage issue.'
  },
  {
    slug: 'hp-smart-app-cant-find-printer-windows-11',
    imgPath: '/Users/agentkuldeep/.gemini/antigravity/brain/3ac9eeeb-02cb-4176-b1a6-586aed1faecc/hp_smart_cant_find_printer_1785499479527.jpg',
    alt: 'Windows 11 laptop running HP Smart app searching endlessly for printer',
    title: 'HP Smart App Cannot Find Printer on Windows 11',
    caption: 'If HP Smart on Windows 11 searches indefinitely without discovering your printer, background network discovery services like Bonjour or network isolation are often responsible.'
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
