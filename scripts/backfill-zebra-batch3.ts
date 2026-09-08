import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const brainDir = "/Users/agentkuldeep/.gemini/antigravity/brain/57b50704-b9a0-48c2-adcb-6f794962c346";
const pubDir = path.join(process.cwd(), "public/images/articles");

const map = [
  { slug: "zebra-zq520-setup-gk420d-driver-windows-11", prefix: "zebra_zq520" },
  { slug: "zebra-label-roll-guides-fanfold-linerless-printing-setup", prefix: "zebra_label_roll" },
  { slug: "zebra-ribbon-not-feeding-top-cover-error-fix", prefix: "zebra_ribbon_feed" },
  { slug: "zebra-zpl-vs-epl-difference-configuration-format-guide", prefix: "zebra_zpl_vs_epl" },
  { slug: "zebra-thermal-transfer-vs-direct-thermal-smudging-fix", prefix: "zebra_smudging" },
  { slug: "zebra-printer-faded-print-darkness-setting-too-light-fix", prefix: "zebra_faded_print" },
  { slug: "zebra-printer-wont-calibrate-labels-gap-not-detected-fix", prefix: "zebra_wont_calibrate" }
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
