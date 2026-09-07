import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const brainDir = "/Users/agentkuldeep/.gemini/antigravity/brain/57b50704-b9a0-48c2-adcb-6f794962c346";
const pubDir = path.join(process.cwd(), "public/images/articles");

const map = [
  { slug: "epson-printer-blinking-red-light-no-display", prefix: "epson_blinking_red_no_display" },
  { slug: "epson-power-cleaning-vs-head-cleaning-difference", prefix: "epson_power_cleaning" },
  { slug: "epson-printer-stopped-working-suddenly", prefix: "epson_stopped_working" },
  { slug: "epson-printer-power-light-blinking-wont-print", prefix: "epson_power_blinking" },
  { slug: "epson-printer-beeping-and-blinking", prefix: "epson_beeping" },
  { slug: "epson-et-2760-not-printing-fix", prefix: "epson_et2760" }
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
