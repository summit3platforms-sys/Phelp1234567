import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const brainDir = "/Users/agentkuldeep/.gemini/antigravity/brain/57b50704-b9a0-48c2-adcb-6f794962c346";
const pubDir = path.join(process.cwd(), "public/images/articles");

const map = [
  { slug: "canon-imageclass-mf-toner-error", prefix: "canon_imageclass_mf" },
  { slug: "canon-selphy-printer-error", prefix: "canon_selphy" },
  { slug: "canon-printer-error-1403-meaning", prefix: "canon_error_1403" },
  { slug: "canon-maxify-gx-error-code", prefix: "canon_maxify_gx" },
  { slug: "canon-printer-error-5100-carriage-fix", prefix: "canon_error_5100" },
  { slug: "canon-print-app-not-detecting-printer", prefix: "canon_print_app" }
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
