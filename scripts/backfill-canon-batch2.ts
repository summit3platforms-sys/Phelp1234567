import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const brainDir = "/Users/agentkuldeep/.gemini/antigravity/brain/57b50704-b9a0-48c2-adcb-6f794962c346";
const pubDir = path.join(process.cwd(), "public/images/articles");

const map = [
  { slug: "canon-printer-error-6a00-cartridge-jam-fix", prefix: "canon_error_6a00" },
  { slug: "canon-printer-error-c000-meaning", prefix: "canon_error_c000" },
  { slug: "canon-printer-error-p07-waste-ink", prefix: "canon_error_p07" },
  { slug: "canon-printer-faded-printing-one-side", prefix: "canon_faded_print" },
  { slug: "canon-error-6c10-ink-absorber-reset", prefix: "canon_error_6c10" },
  { slug: "canon-pixma-g3260-setup-problems", prefix: "canon_g3260_setup" }
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
