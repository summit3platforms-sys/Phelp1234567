import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const brainDir = "/Users/agentkuldeep/.gemini/antigravity/brain/57b50704-b9a0-48c2-adcb-6f794962c346";
const pubDir = path.join(process.cwd(), "public/images/articles");

const map = [
  { slug: "dascom-dc-2300-kiosk-card-printer-error", prefix: "dascom_dc_2300" },
  { slug: "dascom-thermal-printer-not-cutting-paper-cutter-jam", prefix: "dascom_cutter_jam" },
  { slug: "dascom-print-head-gap-adjustment", prefix: "dascom_gap_adjustment" },
  { slug: "dascom-t2250-error-code-lights", prefix: "dascom_t2250_error" },
  { slug: "tally-dascom-1140-vs-dascom-2600", prefix: "dascom_comparison" },
  { slug: "dascom-pos-printer-offline-esc-pos-driver", prefix: "dascom_pos_offline" }
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
