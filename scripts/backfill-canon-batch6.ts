import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const brainDir = "/Users/agentkuldeep/.gemini/antigravity/brain/57b50704-b9a0-48c2-adcb-6f794962c346";
const pubDir = path.join(process.cwd(), "public/images/articles");

const map = [
  { slug: "canon-pixma-ts3522-not-printing", prefix: "canon_ts3522" },
  { slug: "canon-g7020-error-1700-megatank-absorber", prefix: "canon_g7020_error" },
  { slug: "canon-printer-error-b200-fix", prefix: "canon_error_b200" },
  { slug: "canon-maxify-gx-ink-not-detected", prefix: "canon_maxify_ink" },
  { slug: "canon-printer-colors-printing-wrong-nozzle-check", prefix: "canon_nozzle_check" },
  { slug: "canon-printer-streaky-prints-horizontal-lines", prefix: "canon_streaky" },
  { slug: "canon-megatank-not-printing-air-in-tubes", prefix: "canon_megatank_air" },
  { slug: "canon-printer-error-e05-fix", prefix: "canon_error_e05" },
  { slug: "canon-printer-error-5400-temperature-fix", prefix: "canon_error_5400" }
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
