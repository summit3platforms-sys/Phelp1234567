import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const brainDir = "/Users/agentkuldeep/.gemini/antigravity/brain/57b50704-b9a0-48c2-adcb-6f794962c346";
const pubDir = path.join(process.cwd(), "public/images/articles");

const map = [
  { slug: "epson-et-8550-foreign-material-error", prefix: "epson_et8550_foreign" },
  { slug: "epson-error-code-000041-fix", prefix: "epson_error_000041" },
  { slug: "epson-controller-error-printer-fix", prefix: "epson_controller_error" },
  { slug: "epson-l3250-red-light-blinking-fix", prefix: "epson_l3250_red_light" },
  { slug: "epson-ink-light-blinking-new-cartridge-installed", prefix: "epson_ink_light_blinking" },
  { slug: "epson-error-code-2000020a-initialization-fault", prefix: "epson_error_2000020a" }
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
