import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const brainDir = "/Users/agentkuldeep/.gemini/antigravity/brain/57b50704-b9a0-48c2-adcb-6f794962c346";
const pubDir = path.join(process.cwd(), "public/images/articles");

const map = [
  { slug: "polaroid-printer-paper-jam-no-jam-visible-blank-fix", prefix: "polaroid_jam" },
  { slug: "polaroid-hi-print-cartridge-door-wont-open-close-fix", prefix: "polaroid_door" },
  { slug: "polaroid-hi-print-app-crashing-permissions-update-fix", prefix: "polaroid_app" },
  { slug: "polaroid-hi-print-wont-connect-bluetooth-pairing-failed", prefix: "polaroid_bluetooth" },
  { slug: "polaroid-hi-print-multiple-phones-pairing-guide", prefix: "polaroid_multiple_phones" },
  { slug: "polaroid-hi-print-faded-dark-grainy-overexposed-fix", prefix: "polaroid_quality" }
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
  
  console.log(`Updated ${updated} Polaroid articles.`);
}

run().then(() => prisma.$disconnect());
