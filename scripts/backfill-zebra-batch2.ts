import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const brainDir = "/Users/agentkuldeep/.gemini/antigravity/brain/57b50704-b9a0-48c2-adcb-6f794962c346";
const pubDir = path.join(process.cwd(), "public/images/articles");

const map = [
  { slug: "zebra-setup-utility-not-detecting-printer-driver-install-failed", prefix: "zebra_setup_utility" },
  { slug: "zebradesigner-not-printing-browser-print-not-working-fix", prefix: "zebradesigner" },
  { slug: "zebra-zd220-not-printing-zd888-troubleshooting", prefix: "zebra_zd220" },
  { slug: "zebra-network-factory-reset-diagnostics-test-ups-mode", prefix: "zebra_factory_reset" },
  { slug: "zebra-zpl-label-prints-garbled-text-raw-code-issues", prefix: "zebra_garbled_text" },
  { slug: "zebra-zd410-vs-zd420-gx420d-comparison", prefix: "zebra_comparison" }
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
  
  console.log(`Updated ${updated} Zebra articles.`);
}

run().then(() => prisma.$disconnect());
