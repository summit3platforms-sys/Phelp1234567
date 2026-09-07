import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const brainDir = "/Users/agentkuldeep/.gemini/antigravity/brain/57b50704-b9a0-48c2-adcb-6f794962c346";
const pubDir = path.join(process.cwd(), "public/images/articles");

const map = [
  { slug: "epson-xp-4100-et-2400-wifi-setup-problems", prefix: "epson_xp4100_wifi" },
  { slug: "epson-workforce-wf-3640-offline-fix", prefix: "epson_wf3640_offline" },
  { slug: "epson-error-e-01-printer-error-fix", prefix: "epson_error_e01" },
  { slug: "epson-waste-ink-pad-counter-reset-wic-utility", prefix: "epson_waste_ink" },
  { slug: "epson-power-ink-light-blinking-together", prefix: "epson_power_ink_blinking" },
  { slug: "epson-printer-colors-printing-wrong-contaminated-ink", prefix: "epson_wrong_colors" },
  { slug: "epson-nozzle-check-failed-gaps-pattern", prefix: "epson_nozzle_gaps" }
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
  
  console.log(`Updated ${updated} Epson articles.`);
}

run().then(() => prisma.$disconnect());
