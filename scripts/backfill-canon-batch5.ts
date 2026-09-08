import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const brainDir = "/Users/agentkuldeep/.gemini/antigravity/brain/57b50704-b9a0-48c2-adcb-6f794962c346";
const pubDir = path.join(process.cwd(), "public/images/articles");

const map = [
  { slug: "canon-printer-print-head-alignment-failed", prefix: "canon_alignment_failed" },
  { slug: "canon-printer-error-5011-fix", prefix: "canon_error_5011" },
  { slug: "canon-ink-absorber-full-is-it-worth-repairing", prefix: "canon_ink_absorber_repair" },
  { slug: "canon-printer-error-6000-paper-jam-fix", prefix: "canon_error_6000" },
  { slug: "canon-printer-error-e02-cartridge-paper", prefix: "canon_error_e02" },
  { slug: "canon-ink-absorber-almost-full-press-ok", prefix: "canon_absorber_almost_full" }
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
