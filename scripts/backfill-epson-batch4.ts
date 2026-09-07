import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const brainDir = "/Users/agentkuldeep/.gemini/antigravity/brain/57b50704-b9a0-48c2-adcb-6f794962c346";
const pubDir = path.join(process.cwd(), "public/images/articles");

const map = [
  { slug: "epson-printer-error-0110-adf-scanner-fix", prefix: "epson_error_0110" },
  { slug: "epson-ecotank-air-bubbles-in-ink-tubes-syringe-fix", prefix: "epson_air_bubbles" },
  { slug: "epson-scanner-error-0x10-fix", prefix: "epson_error_0x10" },
  { slug: "epson-l3210-not-printing-black", prefix: "epson_l3210_black" },
  { slug: "epson-error-code-0x97-motherboard-printhead-short", prefix: "epson_error_0x97" },
  { slug: "how-to-downgrade-epson-firmware-third-party-ink-unrecognized", prefix: "epson_downgrade_firmware" }
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
