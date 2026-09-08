import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const brainDir = "/Users/agentkuldeep/.gemini/antigravity/brain/57b50704-b9a0-48c2-adcb-6f794962c346";
const pubDir = path.join(process.cwd(), "public/images/articles");

const map = [
  { slug: "zebra-sd-darkness-mf-label-length-commands-explained", prefix: "zebra_sd_darkness" },
  { slug: "zebra-printer-zpl-command-not-working-ignored-fix", prefix: "zebra_zpl_command" },
  { slug: "zebra-zd420-streaky-lines-inconsistent-quality-ribbon-wrinkle-fix", prefix: "zebra_zd420_streaky" },
  { slug: "zebra-sensor-profile-explained-cleaning-manual-calibration", prefix: "zebra_sensor_profile" },
  { slug: "zebra-zd421-cancel-button-not-working-zd620-error-light", prefix: "zebra_zd421_cancel" },
  { slug: "zebra-zt230-printhead-error-zt410-not-connecting-fix", prefix: "zebra_zt230_printhead" }
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
