import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const brainDir = "/Users/agentkuldeep/.gemini/antigravity/brain/57b50704-b9a0-48c2-adcb-6f794962c346";
const pubDir = path.join(process.cwd(), "public/images/articles");

const map = [
  { slug: "dascom-pos-printer-cash-drawer-not-opening", prefix: "dascom_cash_drawer" },
  { slug: "dascom-printer-serial-parallel-port-setup", prefix: "dascom_ports" },
  { slug: "is-dascom-a-good-printer-brand-vs-printronix", prefix: "dascom_vs_printronix" },
  { slug: "dascom-printer-dec-emulation-setup", prefix: "dascom_dec_emulation" },
  { slug: "dascom-2600-2610-error-not-printing", prefix: "dascom_2600_error" },
  { slug: "dascom-tractor-feed-paper-jam-alignment", prefix: "dascom_tractor_feed" }
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
  
  console.log(`Updated ${updated} Dascom articles.`);
}

run().then(() => prisma.$disconnect());
