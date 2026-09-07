import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const brainDir = "/Users/agentkuldeep/.gemini/antigravity/brain/57b50704-b9a0-48c2-adcb-6f794962c346";
const pubDir = path.join(process.cwd(), "public/images/articles");

const map = [
  { slug: "epson-printer-banding-lines-fix", prefix: "epson_banding_lines" },
  { slug: "epson-ecotank-not-printing-black-ink", prefix: "epson_no_black_ink" },
  { slug: "epson-error-code-list-by-model-master-index", prefix: "epson_error_index" },
  { slug: "epson-printer-error-031002-fix", prefix: "epson_error_031002" },
  { slug: "epson-printer-grainy-print-quality-fix", prefix: "epson_grainy_print" },
  { slug: "epson-maintenance-box-replacement-cost-diy", prefix: "epson_maintenance_box" }
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
