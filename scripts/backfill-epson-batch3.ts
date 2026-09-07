import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const brainDir = "/Users/agentkuldeep/.gemini/antigravity/brain/57b50704-b9a0-48c2-adcb-6f794962c346";
const pubDir = path.join(process.cwd(), "public/images/articles");

const map = [
  { slug: "epson-all-lights-blinking-at-once-fatal-error", prefix: "epson_all_lights" },
  { slug: "epson-l5290-error-reset-factory-default", prefix: "epson_l5290_reset" },
  { slug: "epson-printer-error-light-stays-on-solid", prefix: "epson_solid_red" },
  { slug: "epson-ecotank-ink-tank-not-detected", prefix: "epson_ink_not_detected" },
  { slug: "epson-error-031006-paper-feed-gear-l3110", prefix: "epson_error_031006" },
  { slug: "epson-error-0x9a-meaning-and-fix", prefix: "epson_error_0x9a" }
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
