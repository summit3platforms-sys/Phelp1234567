import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const brainDir = "/Users/agentkuldeep/.gemini/antigravity/brain/57b50704-b9a0-48c2-adcb-6f794962c346";
const pubDir = path.join(process.cwd(), "public/images/articles");

const map = [
  { slug: "canon-ij-scan-utility-not-working", prefix: "canon_ij_scan" },
  { slug: "canon-printer-5b00-vs-1700-difference", prefix: "canon_error_5b00" },
  { slug: "canon-printer-wireless-setup-wps", prefix: "canon_wps_setup" },
  { slug: "canon-pixma-tr4720-wifi-setup", prefix: "canon_tr4720_wifi" },
  { slug: "canon-maxify-mb2720-error", prefix: "canon_mb2720_error" },
  { slug: "canon-pixma-mg3620-offline", prefix: "canon_mg3620_offline" }
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
