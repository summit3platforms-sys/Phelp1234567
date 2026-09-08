import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const brainDir = "/Users/agentkuldeep/.gemini/antigravity/brain/57b50704-b9a0-48c2-adcb-6f794962c346";
const pubDir = path.join(process.cwd(), "public/images/articles");

const map = [
  { slug: "dascom-printer-skipping-characters-grinding", prefix: "dascom_skipping" },
  { slug: "dascom-printer-offline-usb-not-detected-windows", prefix: "dascom_offline_usb" },
  { slug: "tally-dascom-2800-series-setup-guide", prefix: "dascom_2800_setup" },
  { slug: "dascom-dot-matrix-printer-ribbon-faint-print", prefix: "dascom_ribbon_faint" },
  { slug: "dascom-thermal-printer-paper-feed-error", prefix: "dascom_thermal_feed" },
  { slug: "dascom-1140-not-feeding-paper-error", prefix: "dascom_1140_feed" },
  { slug: "dascom-card-printer-setup-streaky-print", prefix: "dascom_card_printer" }
];

async function run() {
  const files = fs.readdirSync(brainDir);
  let updated = 0;
  
  for (const item of map) {
    const file = files.find(f => f.startsWith(item.prefix) && f.endsWith(".jpg"));
    if (file) {
      const src = path.join(brainDir, file);
      const dest = path.join(pubDir, item.slug + ".jpg");
      fs.copyFileSync(src, dest);
      console.log(`Copied ${file} -> ${item.slug}.jpg`);
      
      const dbPath = `/images/articles/${item.slug}.jpg`;
      await prisma.article.updateMany({
        where: { slug: item.slug },
        data: { featuredImage: dbPath }
      });
      updated++;
    } else {
      console.log(`Missing image for prefix: ${item.prefix}`);
    }
  }
  
  console.log(`Updated ${updated} Dascom articles.`);
}

run().then(() => prisma.$disconnect());
