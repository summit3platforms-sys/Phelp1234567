import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const brainDir = "/Users/agentkuldeep/.gemini/antigravity/brain/57b50704-b9a0-48c2-adcb-6f794962c346";
const pubDir = path.join(process.cwd(), "public/images/articles");

const map = [
  { slug: "canon-printer-support-code-306", prefix: "canon_error_306" },
  { slug: "how-to-reset-canon-waste-ink-counter", prefix: "canon_reset_waste_ink" },
  { slug: "canon-printer-error-5200-overheating-fix", prefix: "canon_error_5200" },
  { slug: "canon-pixma-ts6420-error-code", prefix: "canon_ts6420_error" },
  { slug: "canon-printer-error-5700-sheet-feeder-fix", prefix: "canon_error_5700" },
  { slug: "canon-printer-offline-windows-11", prefix: "canon_offline_win11" }
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
  
  console.log(`Updated ${updated} Canon articles.`);
}

run().then(() => prisma.$disconnect());
